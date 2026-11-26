import Link from "next/link";
import type { CSSProperties } from "react";
import { Cols, Panel, SpaceGrid, InnerSplit } from "@/components/Blocks";
import Reviews from "@/components/Reviews";
import { Section, SectionHead } from "@/components/Sections";
import { C, Dot, Half, Loop, Pill, Scallop, Shape, Slash, Tri, onColor } from "@/components/Shapes";
import { Photo } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({
    title: "Mirabilia | Early Learning Centre & Kindergarten in Perth",
    description: "Explore Mirabilia, Perth’s trusted early learning centre and kindergarten, where innovative education meets a caring, homelike environment. Book a tour!",
    path: "/",
  }),
  title: { absolute: "Mirabilia | Early Learning Centre & Kindergarten in Perth" },
};

/**
 * Hero video loop. The client's team is still filming it: drop the file in /public
 * (e.g. /video/hero.mp4) and set it here. Until then the photo shows with a label.
 */
const HERO_VIDEO = "";

// Copy from the Nov 2026 content doc. Pillar logos come from the parent handbook (still to be sent).
const PILLARS: [word: string, prefix: string, color: string, text: string][] = [
  ["Explore", "A Place to", "yellow", "Opening up to new thoughts, knowledge and skills, as children learn alongside their peers and through intentional teaching. As they discover, investigate, imagine and create, children build a deeper understanding of the world around them."],
  ["Nurture", "A Place of", "green", "We help children grow into caring, responsible citizens by building trust, patience, responsibility, empathy and resilience from an early age. When their needs are met and their positive behaviours and talents are recognised, children flourish into confident, nurturing individuals."],
  ["Play", "A Place to", "blue", "We believe play is one of the most powerful ways children learn, and their right to play and to have a voice in their own lives is recognised by the United Nations Convention on the Rights of the Child. Through play, children bring their creativity to life, share their thoughts and build on what they know as they grow in every area of their development."],
  ["Learn and Share Learning", "A Place to", "pink", "Every day brings something new to discover, and at Mirabilia we encourage children to seek out fresh challenges as they gain new knowledge and skills. Each child also brings their own learning with them, which they share with their peers and educators as part of our centre community."],
];

const SPACES: [string, string, string][] = [
  ["caversham-room.jpg", "Light-filled playroom with low timber shelves", "Classrooms"],
  ["home-corner-story.jpg", "An educator reading to children in the home corner", "Homelike environments"],
  ["centre-playground.jpg", "Grassy yard with a climbing tower and garden paths", "Outdoor & playground"],
  ["educator-puzzle.jpg", "An educator doing a puzzle with a toddler", "Child safety"],
];

const JOURNEYS: [age: string, name: string, color: string, photo: string, alt: string, text: string][] = [
  ["0–2 years", "Nursery", "orange", "music-shaker.jpg", "A baby playing with a shaker", "A calm, homelike sanctuary where babies feel safe, cherished and unhurried, with warm bonds that form the foundation for early brain development."],
  ["2–3 years", "Toddlers", "teal", "water-pouring.jpg", "Toddlers pouring water at the outdoor kitchen", "Channelling a growing sense of “I can do it myself!” into purposeful, hands-on play, language and friendship."],
  ["3–5 years", "Kindergarten", "purple", "table-play.jpg", "An educator and children at a small table", "Led by degree-qualified teachers: child-led inquiry, early literacy, numeracy and STEM, and a confident transition to school."],
];

const WHY: [string, string][] = [
  ["One fee, everything included", "Meals, nappies, sunscreen, incursions and excursions are all part of your daily fee."],
  ["Degree-qualified kindy teachers", "Our Kindergarten program is led by Early Childhood Teachers."],
  ["SQUAD enrichment every week", "Specialist sessions like Happy Feet, Planet Soccer and Yoganastics, at no extra cost."],
  ["Child safety, every day", "Vetted educators, active supervision and no personal phones in learning spaces."],
  ["Stay connected with Storypark", "Updates, photos and learning stories from your child’s day, wherever you are."],
  ["Four centres across Perth", "Caversham, Byford, Citiplace and Champion Lakes, each with its own warm community."],
];

const vars = (o: Record<string, string>) => o as CSSProperties;

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-h">
        <div className="hero__inner">
          <Shape className="s-tri" anim="float float--slow"><Tri c={C.purple} /></Shape>
          <Shape className="s-flower" anim="spin"><Scallop c={C.blue} /></Shape>
          <Shape className="s-pill"><Pill c={C.pink} /></Shape>
          <Shape className="s-half"><Half c={C.orange} rot={25} /></Shape>
          <Shape className="s-dot"><Dot c={C.ink} /></Shape>
          <Shape className="s-loop"><Loop /></Shape>
          <Shape className="s-slash1"><Slash /></Shape>

          <h1 id="hero-h" className="hero__h1">
            <span className="word display w1">growing</span>{" "}
            <span className="word display w2">tomorrow&apos;s leaders</span>{" "}
            <span className="word display w3">together</span>
          </h1>

          <div className="hero__ph p1 hero__video">
            {HERO_VIDEO
              ? <video src={HERO_VIDEO} poster="/photos/outdoor-discover.jpg" autoPlay muted loop playsInline aria-hidden="true" />
              : <Photo photo={["outdoor-discover.jpg", "Three children in sun hats exploring a discovery tray on the grass"]} sizes="(max-width: 820px) 80vw, 30vw" priority />}
            {!HERO_VIDEO && <span className="hero__video-label">Hero video loop coming soon</span>}
          </div>
          <div className="hero__ph p3"><Photo photo={["little-chef.jpg", "A toddler in a chef’s hat stirring a pan"]} sizes="(max-width: 820px) 50vw, 25vw" /></div>

          <div className="hero__intro">
            <p>A wonderful journey of discovery, friendship and growing confidence, from their very first day to their first day of school.</p>
            <div className="btns">
              <Link className="btn btn--fill" href="/book-a-tour">Book a Tour</Link>
              <Link className="btn btn--white" href="/centres">Find Your Centre</Link>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <SectionHead
          title="A place of wonder, discovery and limitless potential"
          lead="At Mirabilia, we believe early childhood is a time of wonder, discovery and limitless potential. Our approach brings together exceptional educators, thoughtfully designed spaces and a genuine partnership with families, so every child feels known, valued and inspired to thrive."
        />
        <div className="pillars">
          {PILLARS.map(([word, prefix, color, text]) => (
            <article className="pillar reveal" key={word} style={vars({ "--c": `var(--${color})`, "--fg": onColor(color) })}>
              {/* TODO: pillar logos from the parent handbook */}
              <div className="pillar__head">
                <span className="pillar__prefix">{prefix}</span>
                <h3>{word}</h3>
              </div>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section bg="butter">
        <InnerSplit
          photo={["citiplace-room.jpg", "Citiplace room with teal shelves and small wooden tables"]}
          title="Spaces designed to spark curiosity"
          cta={["/our-spaces", "Explore Our Spaces"]}
          mask="mask-arch"
        >
          <p>Our learning environments are carefully created to inspire exploration, creativity and connection. From light-filled indoor rooms to natural outdoor play spaces, every area invites children to discover, imagine and learn through play, all within a safe, secure and nurturing setting.</p>
        </InnerSplit>
        <div className="mt-l"><SpaceGrid items={SPACES} /></div>
      </Section>

      <Section>
        <SectionHead
          title="Growing with your child, every step of the way"
          lead="From their very first days with us to the exciting transition to school, every child’s learning journey at Mirabilia is unique. Our educators nurture each stage of development with programs tailored to every age group, building confidence, independence and a lifelong love of learning along the way."
        />
        <div className="ethos ethos--3">
          {JOURNEYS.map(([age, name, color, src, alt, text]) => (
            <Link key={name} className="ecard reveal" href={`/our-curriculum#${name.toLowerCase()}`} style={vars({ "--c": `var(--${color})`, "--fg": onColor(color) })}>
              <div className="ecard__img"><Photo photo={[src, alt]} sizes="(max-width: 820px) 100vw, 40vw" /></div>
              <div className="ecard__body">
                <span className="ecard__num">{age}</span>
                <span className="ecard__title">{name}<span aria-hidden="true">↗</span></span>
                <span className="ecard__more"><span className="ecard__desc">{text}</span></span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-l">
          <Cols>
            <Panel meta="Squad Programs" title="All-inclusive enrichment every week" href="/squad-programs" color="blue">
              <p>Happy Feet Fitness, Planet Soccer, Yoganastics, Performing Arts, language classes and cooking lessons, 100% included in your daily fees.</p>
            </Panel>
            <Panel meta="A Day at Mirabilia" title="A gentle, responsive rhythm" href="/a-day-at-mirabilia" color="lime">
              <p>A predictable yet flexible day, from warm welcomes and morning gatherings to family-style lunches, rest and calm farewells.</p>
            </Panel>
          </Cols>
        </div>
        <div className="btns"><Link className="btn" href="/our-curriculum">View Our Curriculum &amp; Programs</Link></div>
      </Section>

      <Reviews heading="Loved by our families" lead="Hear from the parents and carers who have made Mirabilia part of their child’s story." bg="sand" />

      <Section>
        <div className="why">
          <div className="why__lead reveal">
            <h2 className="h2">Why families choose Mirabilia</h2>
            <p className="lead">Exceptional care, without the extras. Here is what every family gets, at every one of our centres.</p>
            <div className="why__photo mask-arch"><Photo photo={["home-corner-story.jpg", "An educator reading a picture book to children in the home corner"]} sizes="(max-width: 820px) 90vw, 35vw" /></div>
            <div className="btns"><Link className="btn btn--fill" href="/book-a-tour">Book a Tour</Link></div>
          </div>
          <ul className="why__list">
            {WHY.map(([t, d]) => (
              <li key={t} className="reveal"><h3>{t}</h3><p>{d}</p></li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Optional social feed. Not confirmed yet, so this is a reserved slot. */}
      <Section bg="lilac" id="social">
        <SectionHead
          center
          title="Follow along with us"
          lead="Take a peek into daily life at Mirabilia, from creative projects and outdoor adventures to special celebrations. Follow us for moments of joy, learning and community."
        />
        <div className="social-slot" aria-label="Social media feed (coming soon)">
          {Array.from({ length: 6 }, (_, i) => <span key={i}>Social post</span>)}
        </div>
        {/* TODO: real Instagram / Facebook URL */}
        <div className="btns center"><a className="btn" href="#">Follow Us</a></div>
      </Section>
    </>
  );
}
