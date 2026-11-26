"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Sticky jump links for long pages (centre pages). The link for the section on screen is
 * highlighted and, on narrow screens, scrolled into view inside the strip.
 * No "Book a tour" here: the header button already jumps to this page's tour form.
 */
export default function PageNav({ items }: { items: [id: string, label: string][] }) {
  const [active, setActive] = useState<string>(items[0]?.[0]);
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const sections = items.map(([id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // a band across the upper-middle of the screen counts as "here"
      { rootMargin: "-30% 0px -60% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items]);

  useEffect(() => {
    const ul = list.current;
    const a = ul?.querySelector<HTMLElement>(`a[href="#${active}"]`);
    if (!ul || !a) return;
    const left = a.offsetLeft - (ul.clientWidth - a.offsetWidth) / 2;
    ul.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  return (
    <nav className="page-nav" aria-label="On this page">
      <ul ref={list}>
        {items.map(([id, label]) => (
          <li key={id}>
            <a href={`#${id}`} aria-current={active === id ? "true" : undefined} onClick={() => setActive(id)}>{label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
