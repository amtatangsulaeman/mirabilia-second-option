'use client';

import 'leaflet/dist/leaflet.css';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { Map as LMap, Marker } from 'leaflet';
import { CENTRES, directionsUrl, type Centre } from '@/lib/data';
import { Icon } from './Shapes';

// OpenStreetMap's own tiles: free with attribution, fine for a small site's traffic.
// For heavy traffic switch to a keyed provider (MapTiler, Stadia) by changing these two lines.
const TILES = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

type Status = 'idle' | 'locating' | 'found' | 'denied' | 'unsupported';

/** Straight-line distance in km between two points (haversine). */
function km(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(h));
}

const pinHtml = (c: Centre, active: boolean) =>
  `<span class="map-pin${active ? ' is-active' : ''}" style="--c: var(--${c.color})"><span class="map-pin__dot"></span><span class="map-pin__label">${c.name}</span></span>`;

const popupHtml = (c: Centre) =>
  `<strong>Mirabilia ${c.name}</strong><br>${c.street}, ${c.suburb}<br>` +
  `<a href="/${c.slug}">Visit centre</a> · <a href="${directionsUrl(c)}" target="_blank" rel="noopener">Directions</a>`;

/**
 * All four centres on one map, with a "find my nearest centre" button that uses the
 * visitor's location (asked only when they press it). The list beside the map works
 * without JavaScript and without the map, so nothing depends on location access.
 * On a centre page, pass `focus` to start zoomed on that centre.
 */
export default function CentreMap({ focus }: { focus?: string }) {
  const mapEl = useRef<HTMLDivElement>(null);
  const map = useRef<LMap | null>(null);
  const markers = useRef<Record<string, Marker>>({});
  const L = useRef<typeof import('leaflet') | null>(null);
  const [active, setActive] = useState<string | undefined>(focus);
  const [status, setStatus] = useState<Status>('idle');
  const [dist, setDist] = useState<Record<string, number>>({});

  const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Load Leaflet only when the map scrolls near the viewport.
  useEffect(() => {
    const el = mapEl.current;
    if (!el) return;
    let cancelled = false;
    const io = new IntersectionObserver(async ([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const leaflet = await import('leaflet');
      if (cancelled || map.current) return;
      L.current = leaflet;
      const m = leaflet.map(el, { scrollWheelZoom: false, zoomControl: true, attributionControl: true });
      leaflet.tileLayer(TILES, { attribution: ATTRIBUTION, maxZoom: 19 }).addTo(m);
      CENTRES.forEach((c) => {
        markers.current[c.slug] = leaflet
          .marker([c.geo.lat, c.geo.lng], {
            icon: leaflet.divIcon({ className: '', html: pinHtml(c, c.slug === focus), iconSize: [0, 0] }),
            title: `Mirabilia ${c.name}`,
            alt: `Mirabilia ${c.name}`,
          })
          .bindPopup(popupHtml(c))
          .on('click', () => setActive(c.slug))
          .addTo(m);
      });
      const f = CENTRES.find((c) => c.slug === focus);
      if (f) m.setView([f.geo.lat, f.geo.lng], 13);
      else m.fitBounds(CENTRES.map((c) => [c.geo.lat, c.geo.lng]), { padding: [40, 40] });
      map.current = m;
      // The block fades/slides in on scroll; re-measure once it has settled.
      setTimeout(() => m.invalidateSize(), 600);
    }, { rootMargin: '300px' });
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
      map.current?.remove();
      map.current = null;
    };
  }, [focus]);

  // Keep the highlighted pin in sync with the list.
  useEffect(() => {
    if (!L.current) return;
    CENTRES.forEach((c) => {
      markers.current[c.slug]?.setIcon(L.current!.divIcon({ className: '', html: pinHtml(c, c.slug === active), iconSize: [0, 0] }));
    });
  }, [active]);

  const show = (c: Centre) => {
    setActive(c.slug);
    const m = map.current;
    if (!m) return;
    if (reduced()) m.setView([c.geo.lat, c.geo.lng], 14);
    else m.flyTo([c.geo.lat, c.geo.lng], 14, { duration: 0.8 });
    markers.current[c.slug]?.openPopup();
  };

  const locate = () => {
    if (!('geolocation' in navigator)) { setStatus('unsupported'); return; }
    setStatus('locating');
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const me = { lat: coords.latitude, lng: coords.longitude };
        const d = Object.fromEntries(CENTRES.map((c) => [c.slug, km(me, c.geo)]));
        const nearest = [...CENTRES].sort((a, b) => d[a.slug] - d[b.slug])[0];
        setDist(d);
        setActive(nearest.slug);
        setStatus('found');
        const m = map.current;
        const lf = L.current;
        if (m && lf) {
          lf.circleMarker([me.lat, me.lng], { radius: 8, color: '#2b2140', weight: 2, fillColor: '#c8225c', fillOpacity: 1 })
            .bindTooltip('You are here').addTo(m);
          m.fitBounds([[me.lat, me.lng], [nearest.geo.lat, nearest.geo.lng]], { padding: [60, 60], maxZoom: 14, animate: !reduced() });
          markers.current[nearest.slug]?.openPopup();
        }
      },
      () => setStatus('denied'),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 600000 },
    );
  };

  const sorted = status === 'found' ? [...CENTRES].sort((a, b) => dist[a.slug] - dist[b.slug]) : CENTRES;
  const nearest = status === 'found' ? sorted[0] : undefined;

  return (
    <div className="centre-map reveal">
      <div className="centre-map__side">
        <button type="button" className="btn btn--fill" onClick={locate} disabled={status === 'locating'}>
          <Icon name="pin" color="lime" />{status === 'locating' ? 'Finding you…' : 'Find my nearest centre'}
        </button>
        <p className="centre-map__status" aria-live="polite">
          {status === 'found' && nearest && <>Closest to you: <strong>Mirabilia {nearest.name}</strong>, about {Math.round(dist[nearest.slug])} km away.</>}
          {status === 'denied' && 'We couldn’t get your location. Pick the centre closest to you below.'}
          {status === 'unsupported' && 'Your browser can’t share its location. Pick a centre below.'}
          {status === 'idle' && 'We only use your location to work out which centre is closest. It isn’t saved.'}
        </p>
        <ul className="centre-map__list">
          {sorted.map((c) => (
            <li key={c.slug} className={c.slug === active ? 'is-active' : undefined}>
              <button type="button" onClick={() => show(c)} aria-pressed={c.slug === active}>
                <Icon name="pin" color={c.color} />
                <span>
                  <strong>{c.name}{nearest?.slug === c.slug && <em className="centre-map__tag">Closest</em>}</strong>
                  {c.street}, {c.suburb}
                  {status === 'found' && <small>{dist[c.slug] < 10 ? dist[c.slug].toFixed(1) : Math.round(dist[c.slug])} km away</small>}
                </span>
              </button>
              {c.slug === active && (
                <div className="centre-map__links">
                  <Link className="btn btn--sm btn--fill" href={c.slug === focus ? '#tour' : `/${c.slug}#tour`}>Book a tour</Link>
                  {c.slug !== focus && <Link className="btn btn--sm" href={`/${c.slug}`}>Visit centre</Link>}
                  <a className="btn btn--sm" href={directionsUrl(c)} target="_blank" rel="noopener">Directions</a>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="centre-map__map" ref={mapEl} role="region" aria-label="Map of Mirabilia centres" />
    </div>
  );
}
