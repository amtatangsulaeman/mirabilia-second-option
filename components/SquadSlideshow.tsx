"use client";

import Link from "next/link";
import { useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import { PROGRAMS, PROGRAM_DETAIL } from "@/lib/data";
import { ArrowL, ArrowR, Icon, onColor } from "./Shapes";
import { Photo } from "./ui";

/**
 * One Squad Program at a time. Tabs along the top (arrow keys move between them, as in
 * the ARIA tabs pattern), prev/next buttons, and a swipe on touch screens.
 */
export default function SquadSlideshow() {
  const [i, setI] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const startX = useRef<number | null>(null);
  const n = PROGRAMS.length;
  const go = (next: number, focusTab = false) => {
    const k = (next + n) % n;
    setI(k);
    if (focusTab) tabs.current[k]?.focus();
  };

  const onKey = (e: KeyboardEvent) => {
    const map: Record<string, number> = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: n - 1 };
    if (e.key in map) { e.preventDefault(); go(map[e.key], true); }
  };
  const onDown = (e: PointerEvent) => { if (e.pointerType !== "mouse") startX.current = e.clientX; };
  const onUp = (e: PointerEvent) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 50) go(dx < 0 ? i + 1 : i - 1);
  };

  const p = PROGRAMS[i];
  const d = PROGRAM_DETAIL[p.slug];

  return (
    <div className="slides reveal" style={{ "--c": `var(--${p.color})`, "--fg": onColor(p.color) } as CSSProperties}>
      <div className="slides__tabs" role="tablist" aria-label="Squad Programs" onKeyDown={onKey}>
        {PROGRAMS.map((x, k) => (
          <button
            key={x.slug}
            ref={(el) => { tabs.current[k] = el; }}
            type="button"
            role="tab"
            id={`squad-tab-${x.slug}`}
            aria-selected={k === i}
            aria-controls="squad-panel"
            tabIndex={k === i ? 0 : -1}
            onClick={() => go(k)}
          >
            {x.name}
          </button>
        ))}
      </div>

      <div className="slides__panel" id="squad-panel" role="tabpanel" aria-labelledby={`squad-tab-${p.slug}`} onPointerDown={onDown} onPointerUp={onUp} key={p.slug}>
        <div className="slides__photo">
          <Photo photo={p.photo} sizes="(max-width: 820px) 100vw, 50vw" />
        </div>
        <div className="slides__text">
          <span className="slides__count">{String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
          <Icon name={p.icon} color={p.color} className="slides__icon" />
          <h2 className="h2">{p.name}</h2>
          <p className="lead">{p.short}</p>
          <p>{d.intro[0]}</p>
          <div className="btns">
            <Link className="btn btn--white" href={`/${p.slug}`}>More about {p.name}</Link>
          </div>
        </div>
      </div>

      <div className="slides__controls">
        <button type="button" className="arrow" onClick={() => go(i - 1)} aria-label="Previous program"><ArrowL /></button>
        <span aria-live="polite" className="sr-only">{p.name}, {i + 1} of {n}</span>
        <button type="button" className="arrow" onClick={() => go(i + 1)} aria-label="Next program"><ArrowR /></button>
      </div>
    </div>
  );
}
