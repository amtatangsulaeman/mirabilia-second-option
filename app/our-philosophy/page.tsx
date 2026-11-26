import type { CSSProperties } from "react";
import { Cols, InnerSplit, Panel } from "@/components/Blocks";
import JsonLd from "@/components/JsonLd";
import { PageHero, Section, SectionHead } from "@/components/Sections";
import { onColor } from "@/components/Shapes";
import { breadcrumbLd, pageMetadata, type Crumb } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Philosophy",
  description: "Grounded in developmental research and the EYLF V2.0, Mirabilia blends an emergent curriculum with a 12-month character building program and our CIRCLE values.",
  path: "/our-philosophy",
  image: "home-corner-story.jpg",
});

const CRUMBS: Crumb[] = [["Curriculum & Programs", "/our-curriculum"], ["Philosophy", "/our-philosophy"]];

const CIRCLE: [letter: string, word: string, color: string][] = [
  ["C", "Caring", "purple"], ["I", "Integrity", "orange"], ["R", "Respect", "lime"], ["C", "Collaboration", "blue"], ["L", "Learn", "pink"], ["E", "Empower", "teal"],
];

export default function PhilosophyPage() {
  return (
    <>
      <PageHero
        crumbs={CRUMBS}
        title="Building the foundation for a lifetime"
        lead="90% of a child’s brain growth happens before age five. At Mirabilia, we don’t just care for your child. We nurture the foundational brain architecture they will rely on for the rest of their lives."
        tint="yellow"
        photo={["philosophy-garden.jpg", "Children holding hands in a circle outdoors"]}
        shapes={[1, "pink", "blue"]}
      />

      <Section>
        <InnerSplit photo={["home-corner-story.jpg", "An educator reading a picture book to children in the home corner"]} title="Warm relationships, purposeful play" mask="mask-arch">
          <p>Grounded in the research of pioneering developmental theorists like <strong>Erik Erikson</strong> and <strong>John Bowlby</strong>, we know that warm, responsive relationships and purposeful play during these crucial years wire the brain for emotional security, language, and critical thinking.</p>
          <p>We bring this science to life by cultivating not only bright minds, but also kind, resilient, and capable hearts. Guided by the <strong>Early Years Learning Framework (EYLF V2.0)</strong>, our program blends a responsive <strong>Emergent Curriculum</strong> with our intentional <strong>12-Month Character Building Program</strong>.</p>
          <p>Rather than teaching skills or values in isolation, we weave early literacy, STEM, culture, and our core CIRCLE values naturally into your child’s daily play and discovery.</p>
        </InnerSplit>
      </Section>

      <Section bg="lilac">
        <SectionHead title="The values woven through every day" />
        <ul className="circle">
          {CIRCLE.map(([l, w, c]) => (
            <li key={w} className="circle__item reveal" style={{ "--c": `var(--${c})`, "--fg": onColor(c) } as CSSProperties}>
              <span aria-hidden="true">{l}</span>
              <h3>{w}</h3>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHead title="An emergent curriculum" lead="An emergent curriculum moves beyond rigid, pre-planned lesson charts. Instead, our educators observe, listen, and co-construct learning alongside your child so every experience feels meaningful and alive." />
        <Cols n={3}>
          <Panel title="Led by children’s curiosity"><p>Whether a group becomes fascinated by native wildlife, construction, or storytelling, we use their real-time interests as a launchpad for literacy, STEM, and social connection.</p></Panel>
          <Panel title="Partnering with families" color="blue"><p>You are your child’s first and most important teacher. We work closely with you to understand your child’s home life, cultural background, and developing strengths, creating genuine continuity between home and Mirabilia.</p></Panel>
          <Panel title="Extended with intent"><p>We take what children already know and love, thoughtfully scaffolding their play to achieve EYLF learning outcomes and bring our monthly character traits to life.</p></Panel>
        </Cols>
      </Section>
      <JsonLd data={breadcrumbLd(CRUMBS)} />
    </>
  );
}
