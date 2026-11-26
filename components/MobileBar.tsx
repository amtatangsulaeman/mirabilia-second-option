'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PHONE, PHONE_HREF } from '@/lib/data';

const TYPING = 'input:not([type="checkbox"]):not([type="radio"]):not([type="file"]), textarea, select';

/**
 * Phone-only bar pinned to the bottom of the screen: one tap to call, one tap to book.
 * Pages that already have the tour form (#tour) jump straight to it, so a centre page
 * keeps its centre pre-selected. The bar slides away while scrolling down (so it never
 * gets in the way of reading) and while typing in a form (so it never covers the field).
 */
export default function MobileBar() {
  const pathname = usePathname();
  const [tourHref, setTourHref] = useState('/book-a-tour');
  const [typing, setTyping] = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false);

  useEffect(() => {
    // Jump to this page's own tour form only where it already has the centre chosen
    // (centre pages) or on the Book a Tour page itself; everywhere else go to /book-a-tour.
    const ownForm = document.querySelector('#tour[data-centre]') || pathname === '/book-a-tour';
    setTourHref(ownForm ? '#tour' : '/book-a-tour');
  }, [pathname]);

  // Out of the way while reading down the page; back as soon as they scroll up or reach the top.
  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      if (Math.abs(y - last) < 12) return; // ignore tiny jitters from touch scrolling
      setScrollingDown(y > last && y > 120);
      last = y;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const onIn = (e: FocusEvent) => setTyping((e.target as Element).matches?.(TYPING) ?? false);
    const onOut = () => setTyping(false);
    document.addEventListener('focusin', onIn);
    document.addEventListener('focusout', onOut);
    return () => {
      document.removeEventListener('focusin', onIn);
      document.removeEventListener('focusout', onOut);
    };
  }, []);

  return (
    <div className={`mobile-bar${typing || scrollingDown ? ' is-hidden' : ''}`}>
      <a className="btn btn--white" href={PHONE_HREF} aria-label={`Call us on ${PHONE}`}>Call us</a>
      <Link className="btn btn--fill" href={tourHref}>Book a Tour</Link>
    </div>
  );
}
