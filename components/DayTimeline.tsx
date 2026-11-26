"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { Icon } from "./Shapes";

type Step = { icon: string; color: string; title: string; text: string; note: string };

const STEPS: Step[] = [
  { icon: "sun", color: "yellow", title: "Morning hello", text: "A warm welcome, breakfast for early arrivals and time to settle into the room.", note: "good morning!" },
  { icon: "magnifier", color: "blue", title: "Explore & learn", text: "Group time, projects and play, indoors and out, shaped by what children are curious about.", note: "what’s this?" },
  { icon: "lunch", color: "purple", title: "Lunch & rest", text: "Meals together at the table, then a sleep or quiet rest to recharge.", note: "yum… then zzz" },
  { icon: "palette", color: "pink", title: "Create & go home", text: "Art, music and outdoor play until pick-up, with a quick chat about the day.", note: "see you tomorrow!" },
];

/**
 * A day at Mirabilia, as four steps on a vertical line. While scrolling, the line fills
 * with colour and each numbered dot lights up once the line reaches it.
 */
export default function DayTimeline() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>(".tl-item"));
    let frame = 0;
    const update = () => {
      frame = 0;
      const box = root.getBoundingClientRect();
      const centres = items.map((item) => {
        const dot = item.querySelector<HTMLElement>(".tl-dot")!.getBoundingClientRect();
        return dot.top + dot.height / 2 - box.top;
      });
      const top = centres[0];
      const bottom = centres[centres.length - 1];
      const tip = window.innerHeight * 0.6 - box.top;
      const p = Math.min(1, Math.max(0, (tip - top) / (bottom - top)));
      root.style.setProperty("--line-top", `${top}px`);
      root.style.setProperty("--line-bottom", `${box.height - bottom}px`);
      root.style.setProperty("--p", p.toFixed(4));
      items.forEach((item, i) => item.classList.toggle("is-reached", tip >= centres[i] - 1));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const ro = new ResizeObserver(schedule);
    ro.observe(root);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      ro.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="timeline" ref={ref}>
      <span className="timeline__track" aria-hidden="true" />
      <span className="timeline__fill" aria-hidden="true" />
      <ol className="timeline__list">
        {STEPS.map((s, i) => (
          <li key={s.title} className={`tl-item tl-item--${i % 2 ? "right" : "left"}`} style={{ "--c": `var(--${s.color})` } as CSSProperties}>
            <article className="tl-card">
              <Icon name={s.icon} color={s.color} className="tl-card__icon" />
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
            <span className="tl-dot" aria-hidden="true">{i + 1}</span>
            <p className="tl-note" aria-hidden="true">{s.note}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
