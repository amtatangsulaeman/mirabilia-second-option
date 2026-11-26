import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import {
  CENTRES, CHILD_SAFETY, EMAIL, PHONE, PHONE_HREF, PROGRAMS, REVIEWS, TEAM, centreBySlug, mapUrl,
  type Photo as PhotoT, type ReviewKey, type TeamKey, type Tint,
} from "@/lib/data";
import type { Crumb } from "@/lib/seo";
import { TourForm } from "./forms";
import { C, Dot, Half, Icon, Leaf, Loop, Pill, Scallop, Shape, Slash, Tri, onColor } from "./Shapes";
import { Arrow, Photo } from "./ui";

const vars = (o: Record<string, string>) => o as CSSProperties;
export const TINT_BG: Record<Tint, string> = { purple: "var(--lilac)", blue: "var(--sky)", yellow: "var(--butter)" };

/* ------------------------------------------------------------- breadcrumbs */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const items: Crumb[] = [["Home", "/"], ...trail];
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {items.map(([name, path], i) => (
          <li key={path}>
            {i < items.length - 1 ? <Link href={path}>{name}</Link> : <span aria-current="page">{name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ---------------------------------------------------------------- page hero */
const HERO_SHAPES = [
  (a: string, b: string) => (
    <>
      <Shape className="s-a" anim="float float--slow"><Tri c={a} /></Shape>
      <Shape className="s-b" anim="spin"><Scallop c={b} /></Shape>
      <Shape className="s-c"><Dot c={C.ink} /></Shape>
      <Shape className="s-d"><Loop /></Shape>
    </>
  ),
  (a: string, b: string) => (
    <>
      <Shape className="s-a" anim="spin"><Scallop c={a} n={10} /></Shape>
      <Shape className="s-b"><Half c={b} rot={180} /></Shape>
      <Shape className="s-c"><Slash /></Shape>
      <Shape className="s-d" anim="float"><Pill c={b} /></Shape>
    </>
  ),
  (a: string, b: string) => (
    <>
      <Shape className="s-a"><Half c={a} rot={90} /></Shape>
      <Shape className="s-b" anim="float"><Leaf c={b} /></Shape>
      <Shape className="s-c"><Dot c={C.ink} /></Shape>
      <Shape className="s-d"><Slash /></Shape>
    </>
  ),
  (a: string, b: string) => (
    <>
      <Shape className="s-a" anim="float float--slow"><Leaf c={a} /></Shape>
      <Shape className="s-b"><Tri c={b} /></Shape>
      <Shape className="s-c"><Loop /></Shape>
      <Shape className="s-d"><Dot c={C.ink} /></Shape>
    </>
  ),
];

type HeroProps = {
  title: ReactNode;
  lead?: ReactNode;
  tint?: Tint;
  bg?: string;
  photo?: PhotoT;
  photo2?: PhotoT;
  actions?: ReactNode;
  crumbs?: Crumb[];
  /** Shapes in the background: [variant, first colour, second colour]. */
  shapes?: [number, string, string];
  children?: ReactNode;
};

export function PageHero({ title, lead, tint = "purple", bg, photo, photo2, actions, crumbs, shapes = [0, "purple", "orange"], children }: HeroProps) {
  const [v, a, b] = shapes;
  return (
    <section className={`phero${photo ? "" : " phero--plain"}`} style={vars({ "--bg": bg ?? TINT_BG[tint] })}>
      {HERO_SHAPES[v % 4](C[a as keyof typeof C] ?? a, C[b as keyof typeof C] ?? b)}
      <div className="wrap">
        <div className="phero__grid">
          <div>
            {crumbs && <Breadcrumbs trail={crumbs} />}
            <h1 className="phero__title">{title}</h1>
            {lead && <p className="phero__lead">{lead}</p>}
            {actions && <div className="btns">{actions}</div>}
            {children}
          </div>
          {photo && (
            <div className="phero__media">
              <Photo photo={photo} priority sizes="(max-width: 820px) 100vw, 45vw" className="phero__photo" />
              {photo2 && <Photo photo={photo2} sizes="(max-width: 820px) 40vw, 18vw" className="phero__photo2" />}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- sections */
/** Section backgrounds: soft tints (dark text) or solid brand bands (light text). */
type Bg = "sand" | "white" | "lilac" | "sky" | "butter" | "blue" | "purple" | "deep";

export function Section({ bg, id, className = "", children, tight }: { bg?: Bg; id?: string; className?: string; children: ReactNode; tight?: boolean }) {
  return (
    <section id={id} className={["section", tight && "section--tight", bg && `band band--${bg}`, className].filter(Boolean).join(" ")}>
      <div className="wrap">{children}</div>
    </section>
  );
}

export function SectionHead({ title, lead, center, as: H = "h2", aside }: { title: ReactNode; lead?: ReactNode; center?: boolean; as?: "h1" | "h2"; aside?: ReactNode }) {
  return (
    <div className={`shead${center ? " shead--center" : ""}`}>
      <div>
        <H className="h2 measure">{title}</H>
        {lead && <p className="lead shead__lead">{lead}</p>}
      </div>
      {aside}
    </div>
  );
}

export function TickList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="ticks">
      {items.map((t, i) => (
        <li key={i}>{t}</li>
      ))}
    </ul>
  );
}

/* --------------------------------------------------------------------- split */
const MASKS = ["", "mask-arch", "mask-blob", "mask-leaf"];

export function Split({ photo, photo2, heading, children, flip, mask = 0, deco, id }: {
  photo: PhotoT; photo2?: PhotoT; heading: ReactNode; children: ReactNode; flip?: boolean; mask?: number; deco?: ReactNode; id?: string;
}) {
  return (
    <section className="section" id={id}>
      <div className="wrap">
        <div className={`split${flip ? " split--rev" : ""} reveal`}>
          <div className={`split__media ${MASKS[mask % 4]}`}>
            {deco}
            <Photo photo={photo} sizes="(max-width: 820px) 100vw, 45vw" />
            {photo2 && <Photo photo={photo2} sizes="(max-width: 820px) 40vw, 18vw" className="split__photo2" />}
          </div>
          <div className="prose">
            <h2 className="h2">{heading}</h2>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- feature cards */
export type Feature = [icon: string, color: string, title: string, text: ReactNode];

export function FeatureCards({ items, cols = 4 }: { items: Feature[]; cols?: 3 | 4 }) {
  return (
    <div className={`features features--${cols}`}>
      {items.map(([ic, color, title, text]) => (
        <article className="feature reveal" key={title}>
          <Icon name={ic} color={color} className="feature__icon" />
          <h3>{title}</h3>
          <p>{text}</p>
        </article>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------- gallery */
const GALLERY_SHAPES = ["g-big", "g-circle", "g-tall g-arch", "", "g-wide g-pill", "g-wide", "", "g-tall"];

export function Gallery({ photos }: { photos: PhotoT[] }) {
  // 4 photos: a big one, an arch, a circle and a wide one; more follow the shape cycle.
  const cls = photos.length === 4 ? ["g-big", "g-tall g-arch", "g-circle", ""] : GALLERY_SHAPES;
  return (
    <div className={`gallery${photos.length === 4 ? " gallery--4" : ""}`}>
      {photos.map((p, i) => (
        <figure className={`${cls[i % cls.length]} reveal`} key={p[0] + i}>
          <Photo photo={p} sizes="(max-width: 820px) 100vw, 45vw" />
        </figure>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- pull quote */
/** A parent's one-line quote placed right beside the point it backs up. */
export function PullQuote({ review }: { review?: ReviewKey }) {
  if (!review) return null;
  const r = REVIEWS[review];
  const where = r.centre && centreBySlug(r.centre)?.name;
  return (
    <figure className="pull">
      <blockquote>“{r.pull}”</blockquote>
      <figcaption>
        <strong>{r.name}</strong>, parent{where ? ` at Mirabilia ${where}` : ""}
      </figcaption>
    </figure>
  );
}

/* -------------------------------------------------------------- child safety */
export function ChildSafety({ centre }: { centre?: string }) {
  return (
    <Section id="child-safety">
      <SectionHead
        title="How we keep children safe"
        lead={`What happens every day${centre ? ` at Mirabilia ${centre}` : " at every Mirabilia centre"}. Ask us about any of it on your tour, and we’ll show you our child safe policies.`}
      />
      <ul className="safety">
        {CHILD_SAFETY.map(([ic, color, title, text]) => (
          <li className="safety__item reveal" key={title}>
            <Icon name={ic} color={color} className="safety__icon" />
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ----------------------------------------------------------------------- FAQ */
export function FaqSection({ items, heading = "Questions families ask us", intro }: { items: [q: string, a: ReactNode][]; heading?: string; intro?: ReactNode }) {
  return (
    <section className="section band band--sand" id="faq">
      <div className="wrap faq-wrap">
        <div className="faq-intro">
          <h2 className="h2">{heading}</h2>
          <p className="lead">
            {intro ?? (
              <>Can&apos;t see yours here? Give us a call on <a className="link-u" href={PHONE_HREF}>{PHONE}</a> and we&apos;ll talk it through.</>
            )}
          </p>
          <Shape className="faq-intro__shape" anim="spin"><Scallop c={C.lime} /></Shape>
        </div>
        <div className="faq">
          {items.map(([q, a], i) => (
            <details key={q} open={i === 0}>
              <summary>{q}</summary>
              <div className="faq__a"><p>{a}</p></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ page nav */
export { default as PageNav } from "./PageNav";

/* ---------------------------------------------------------------- info strip */
export function InfoStrip({ items }: { items: [icon: string, color: string, strong: ReactNode, small: ReactNode][] }) {
  return (
    <ul className={`info-strip info-strip--${items.length} reveal`}>
      {items.map(([ic, color, strong, small], i) => (
        <li key={i}>
          <Icon name={ic} color={color} />
          <span><strong>{strong}</strong>{small}</span>
        </li>
      ))}
    </ul>
  );
}

/* -------------------------------------------------------------------- people */
export function QuoteBlock({ person, bg }: { person: TeamKey; bg?: "sand" | "lilac" }) {
  const p = TEAM[person];
  return (
    <section className={`section${bg === "sand" ? " band band--sand" : ""}`} style={bg === "lilac" ? { background: "var(--lilac)" } : undefined}>
      <div className="wrap director reveal">
        <div className="director__img">
          <Shape anim="spin" style={{ width: 110, right: -24, top: -20, zIndex: 2 }}><Scallop c={C.orange} n={10} /></Shape>
          <Photo photo={[p.photo, `Portrait of ${p.name}`]} sizes="340px" />
        </div>
        <div>
          <blockquote>
            {p.quote.map((q, i) => (
              <p key={i}>{i === 0 && "“"}{q}{i === p.quote.length - 1 && "”"}</p>
            ))}
          </blockquote>
          <cite><b>{p.name}</b>{p.role}</cite>
        </div>
      </div>
    </section>
  );
}

const TEAM_COLORS = ["purple", "lime", "orange", "blue"];

export function TeamGrid({ people }: { people: TeamKey[] }) {
  return (
    <div className={`team${people.length === 3 ? " team--3" : ""}`}>
      {people.map((k, i) => {
        const p = TEAM[k];
        const c = TEAM_COLORS[i % 4];
        return (
          <article key={k} className="tcard reveal" style={vars({ "--c": `var(--${c})`, "--fg": onColor(c) })}>
            <div className="tcard__img"><Photo photo={[p.photo, `Portrait of ${p.name}`]} sizes="(max-width: 540px) 100vw, 30vw" /></div>
            <div className="tcard__body">
              <h3>{p.name}</h3>
              <p>{p.role}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------- centre cards */
export function CentreCards() {
  return (
    <div className="centre-grid">
      {CENTRES.map((c) => (
        <article className="ccard reveal" key={c.slug}>
          <div className="ccard__img">
            {c.isNew && <span className="badge">New!</span>}
            <Photo photo={c.card} sizes="(max-width: 820px) 90vw, 25vw" />
          </div>
          <h3><Link href={`/${c.slug}`}>{c.name}</Link></h3>
          <address>{c.street},<br />{c.suburb}</address>
          <div className="btns">
            <Link className="btn" href={`/${c.slug}`}>Visit centre</Link>
            <a className="btn" href={mapUrl(c)} target="_blank" rel="noopener noreferrer">Directions</a>
          </div>
        </article>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------- program cards */
/**
 * Squad Programs as reference-style focus cards: a tall photo with a coloured panel
 * that shows the name, and rises on hover to show the short description.
 */
export function ProgramCards({ exclude, withAll }: { exclude?: string; withAll?: boolean }) {
  const list = PROGRAMS.filter((p) => p.slug !== exclude);
  return (
    <div className={`ethos ethos--${list.length + (withAll ? 1 : 0)}`}>
      {list.map((p, i) => (
        <Link key={p.slug} className="ecard reveal" href={`/${p.slug}`} style={vars({ "--c": `var(--${p.color})`, "--fg": onColor(p.color) })}>
          <div className="ecard__img"><Photo photo={p.photo} sizes="(max-width: 820px) 100vw, 45vw" /></div>
          <div className="ecard__body">
            <span className="ecard__num">{String(i + 1).padStart(2, "0")}</span>
            <span className="ecard__title">{p.name}<span aria-hidden="true">↗</span></span>
            <span className="ecard__more"><span className="ecard__desc">{p.short}</span></span>
          </div>
        </Link>
      ))}
      {withAll && (
        <Link className="ecard ecard--all reveal" href="/squad-programs" style={vars({ "--c": "var(--ink)", "--fg": "#fff" })}>
          <div className="ecard__img ecard__img--art">
            <Shape anim="spin" style={{ width: "70%", left: "15%", top: "18%" }}><Scallop c={C.yellow} /></Shape>
          </div>
          <div className="ecard__body">
            <span className="ecard__num">All</span>
            <span className="ecard__title">All Squad Programs<span aria-hidden="true">↗</span></span>
            <span className="ecard__more"><span className="ecard__desc">How our small-group sessions work, and what each one teaches.</span></span>
          </div>
        </Link>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------- tour */
export function TourSection({
  heading = "Come and say hello!",
  text = "Book a tour with one of Perth’s most trusted childcare centres. We’ll show you around, answer your questions and help you find the right fit.",
  centre,
}: {
  heading?: string;
  text?: string;
  centre?: string;
}) {
  return (
    <section className="section--tight section" id="tour" data-centre={centre}>
      <div className="wrap">
        <div className="tour reveal">
          <Shape className="tour__s1" anim="spin"><Scallop c={C.purple} /></Shape>
          <Shape className="tour__s2"><Half c={C.blue} rot={200} /></Shape>
          <div className="tour__text">
            <h2>{heading}</h2>
            <p>{text}</p>
            <p className="tour__contact">
              <a href={PHONE_HREF}>{PHONE}</a>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </p>
          </div>
          <TourForm centre={centre} />
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------- CTA */
export function CtaBand({ heading, text, primary, secondary, bg = "var(--lime)", fg = "var(--ink)" }: {
  heading: string; text?: string; primary?: [string, string]; secondary?: [string, string]; bg?: string; fg?: string;
}) {
  const light = fg === "var(--ink)";
  return (
    <section className="section--tight section">
      <div className="wrap">
        <div className="cta reveal" style={vars({ "--c": bg, "--fg": fg })}>
          <Shape className="s1" anim="spin"><Scallop c={bg === "var(--purple)" ? C.lime : C.purple} /></Shape>
          <Shape className="s2"><Half c={bg === "var(--blue)" ? C.lime : C.blue} rot={200} /></Shape>
          <Shape className="s3"><Dot c={light ? C.ink : "#fff"} /></Shape>
          <Shape className="s4"><Slash c={light ? C.ink : "#fff"} /></Shape>
          <div className="z">
            <h2>{heading}</h2>
            {text && <p>{text}</p>}
            <div className="btns center">
              {primary && <Link className={`btn ${light ? "btn--fill" : "btn--white"}`} href={primary[0]}>{primary[1]} <Arrow /></Link>}
              {secondary && <Link className={`btn ${light ? "" : "btn--ghost-light"}`} href={secondary[0]}>{secondary[1]}</Link>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- next cards */
export function NextCards({ items }: { items: [href: string, icon: string, color: string, title: string, text: string][] }) {
  return (
    <Section>
      <SectionHead title="More about Mirabilia" />
      <div className="next-grid">
        {items.map(([href, ic, color, title, text]) => (
          <Link className="next-card reveal" href={href} key={href}>
            <Icon name={ic} color={color} />
            <span><strong>{title}</strong>{text}</span>
            <span className="next-card__arrow" aria-hidden="true">↗</span>
          </Link>
        ))}
      </div>
    </Section>
  );
}

/* ----------------------------------------------------------------- marquee */
export function Marquee({ items, variant = "", href }: { items: string[]; variant?: string; href?: string }) {
  const run = items.map((t) => `${t} •`);
  const loop = Array.from({ length: 8 }, () => run).flat();
  const track = (
    <div className="marquee__track" aria-hidden="true">
      {loop.map((t, i) => <span key={i}>{t}</span>)}
    </div>
  );
  return href ? (
    <Link className={`marquee ${variant}`} href={href} aria-label={items.join(" • ")}>{track}</Link>
  ) : (
    <div className={`marquee ${variant}`} role="presentation">{track}</div>
  );
}
