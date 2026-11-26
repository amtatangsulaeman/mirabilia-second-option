import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { Photo as PhotoT } from "@/lib/data";
import { C, Half, Scallop, Shape } from "./Shapes";
import { Photo } from "./ui";

/* Building blocks for the revised pages (Nov 2026 sitemap), in this design's style. */

const vars = (o: Record<string, string>) => o as CSSProperties;

/** Photo beside text, inside a section. */
export function InnerSplit({ photo, title, children, flip, cta, mask = "", id }: {
  photo: PhotoT; title: ReactNode; children: ReactNode; flip?: boolean; cta?: [href: string, label: string]; mask?: string; id?: string;
}) {
  return (
    <div className={`split${flip ? " split--rev" : ""} reveal`} id={id}>
      <div className={`split__media ${mask}`}>
        <Photo photo={photo} sizes="(max-width: 820px) 100vw, 45vw" />
      </div>
      <div className="prose">
        <h2 className="h2">{title}</h2>
        {children}
        {cta && <div className="btns"><Link className="btn" href={cta[0]}>{cta[1]}</Link></div>}
      </div>
    </div>
  );
}

/** A plain text card. `color` fills it with a brand colour; `href` makes the whole card a link. */
export function Panel({ title, meta, children, color, href }: {
  title: ReactNode; meta?: string; children?: ReactNode; color?: string; href?: string;
}) {
  const style = color ? vars({ "--c": `var(--${color})`, "--fg": ["lime", "yellow", "green"].includes(color) ? "var(--ink)" : "#fff" }) : undefined;
  const body = (
    <>
      {meta && <span className="panel__meta">{meta}</span>}
      <h3>{title}</h3>
      {children}
      {href && <span className="panel__arrow" aria-hidden="true">↗</span>}
    </>
  );
  return href
    ? <Link className="icard panel reveal" href={href} style={style}>{body}</Link>
    : <article className="icard panel reveal" style={style}>{body}</article>;
}

export function Cols({ n = 2, children }: { n?: 2 | 3; children: ReactNode }) {
  return <div className={`cards cards--${n}`}>{children}</div>;
}

/** Title + description rows separated by lines (rhythm of the day, commitments, sessions). */
export function Rows({ items }: { items: [title: string, body: ReactNode][] }) {
  return (
    <div className="rows2">
      {items.map(([t, b]) => (
        <div className="rows2__row reveal" key={t}>
          <h3>{t}</h3>
          <div>{b}</div>
        </div>
      ))}
    </div>
  );
}

/** Photo tiles with a caption pill (spaces). */
export function SpaceGrid({ items }: { items: [src: string, alt: string, label: string][] }) {
  return (
    <div className="space-grid">
      {items.map(([src, alt, label]) => (
        <figure key={src} className="reveal">
          <Photo photo={[src, alt]} sizes="(max-width: 820px) 50vw, 25vw" />
          <figcaption>{label}</figcaption>
        </figure>
      ))}
    </div>
  );
}

/** Video embed, or a labelled placeholder until the client sends the file. */
export function VideoSlot({ src, title }: { src?: string; title: string }) {
  if (src) {
    return (
      <div className="video-slot">
        {src.endsWith(".mp4")
          ? <video src={src} controls playsInline preload="metadata" aria-label={title} />
          : <iframe src={src} title={title} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen loading="lazy" />}
      </div>
    );
  }
  return (
    <div className="video-slot video-slot--empty" role="img" aria-label={`${title} (coming soon)`}>
      <Shape className="video-slot__s" anim="spin"><Scallop c={C.lime} /></Shape>
      <span className="video-slot__play" aria-hidden="true" />
      <strong>{title}</strong>
      <span>Video coming soon</span>
    </div>
  );
}

/** A reserved area for something the client still has to send (diagram, job board, feed). */
export function EmbedSlot({ title, text }: { title: string; text: string }) {
  return (
    <div className="embed-slot">
      <strong>{title}</strong>
      <span>{text}</span>
    </div>
  );
}

/** Short call to action card inside a section. */
export function CtaStrip({ text, cta = ["/enquire-now", "Make an Enquiry"] }: { text: ReactNode; cta?: [string, string] }) {
  return (
    <div className="cta-strip reveal">
      <Shape className="cta-strip__s" ><Half c={C.purple} rot={200} /></Shape>
      <p>{text}</p>
      <Link className="btn btn--fill" href={cta[0]}>{cta[1]}</Link>
    </div>
  );
}
