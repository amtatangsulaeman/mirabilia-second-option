import Link from "next/link";
import { Cols, CtaStrip, EmbedSlot, InnerSplit, Panel } from "@/components/Blocks";
import JsonLd from "@/components/JsonLd";
import { PageHero, Section, SectionHead } from "@/components/Sections";
import type { Photo } from "@/lib/data";
import { breadcrumbLd, pageMetadata, type Crumb } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Learning Journeys: Nursery, Toddlers & Kindergarten",
  description: "Growing heart, mind and character. Mirabilia’s EYLF V2.0 program for Nursery (0–2), Toddlers (2–3) and Kindergarten (3–5), with incursions, excursions and character building.",
  path: "/our-curriculum",
  image: "table-play.jpg",
});

const CRUMBS: Crumb[] = [["Curriculum & Programs", "/our-curriculum"], ["Learning Journeys", "/our-curriculum"]];

const STAGES: { id: string; age: string; title: string; photo: Photo; text: string; focus: string }[] = [
  {
    id: "nursery", age: "Nursery · 0–2 years", title: "Nurturing trust, wonder & secure beginnings",
    photo: ["music-shaker.jpg", "A baby playing with a shaker"],
    text: "Our Nursery is a calm, homelike sanctuary where babies and young toddlers feel deeply safe, cherished, and unhurried. Guided by primary caregiving principles and individual home sleep and feeding routines, our educators build warm, trusting bonds that form the foundation for early brain development. Through gentle, respectful care routines, sensory exploration, music, tummy time, and responsive “serve-and-return” interactions, we nurture your baby’s curiosity, early communication, and physical confidence at their own pace.",
    focus: "Secure attachment, sensory play, early language, gross-motor milestones, and gentle, consent-led care routines.",
  },
  {
    id: "toddlers", age: "Toddlers · 2–3 years", title: "Growing independence, language & big emotions",
    photo: ["water-pouring.jpg", "Toddlers pouring water at the outdoor kitchen"],
    text: "Bursting with energy and discovery, our Toddler program channels your child’s growing sense of “I can do it myself!” into purposeful, hands-on play. As toddlers test boundaries, build friendships, and find their voice, our educators scaffold emerging language, turn-taking, and emotional regulation through stories, creative arts, outdoor nature play, and collaborative projects. Anchored in our CIRCLE values, children learn to make meaningful choices, care for one another, and build confidence in a safe, supportive space.",
    focus: "Growing independence, social connection, expressive language, emotional coaching, and active physical play.",
  },
  {
    id: "kindergarten", age: "Kindergarten · 3–5 years", title: "Curious thinkers, kind hearts & school readiness",
    photo: ["table-play.jpg", "An educator and children at a small table"],
    text: "Led by degree-qualified Early Childhood Teachers, our Kindergarten program prepares children not just for the first day of school, but for a lifelong love of learning. Through deep, child-led inquiry projects, hands-on STEM, early literacy and numeracy, physical literacy, and our 12-Month Character Building Program, children develop critical thinking, resilience, and leadership. We foster a strong sense of active citizenship and cultural pride, empowering confident, empathetic learners ready to take on primary school and the wider world.",
    focus: "Child-led inquiry, literacy and numeracy foundations, STEM, character leadership, protective behaviours, and holistic transition to school.",
  },
];
const MASKS = ["mask-arch", "", "mask-blob"];

export default function CurriculumPage() {
  return (
    <>
      <PageHero
        crumbs={CRUMBS}
        title="Growing heart, mind & character"
        lead="At Mirabilia Early Learning, we believe early childhood is the foundation for nurturing not just bright minds, but also kind, resilient, and capable hearts."
        tint="blue"
        photo={["curriculum-outdoor.jpg", "Children sitting together outdoors with an educator"]}
        photo2={["curriculum-drawing.jpg", "Children drawing at a table"]}
        shapes={[2, "orange", "lime"]}
        actions={STAGES.map((s) => <a key={s.id} className="btn btn--white" href={`#${s.id}`}>{s.age.split(" · ")[0]}</a>)}
      />

      <Section>
        <div className="prose measure lead-block">
          <p className="lead">Guided by the <strong>Early Years Learning Framework (EYLF V2.0)</strong> and anchored in our <strong>CIRCLE</strong> core values (<em>Caring, Integrity, Respect, Collaboration, Learn, Empower</em>), our program is a dynamic blend of a responsive <strong>Emergent Curriculum</strong> and our intentional <strong>12-Month Character Building Program</strong>. Rather than teaching skills or values in isolation, we weave literacy, STEM, culture, and active citizenship naturally into your child’s daily play and discovery.</p>
          <p>Read more about the thinking behind it in <Link className="link-u" href="/our-philosophy">our philosophy</Link>.</p>
        </div>
      </Section>

      <Section bg="butter">
        <SectionHead title="Tailored for every stage" />
        <div className="stack-l">
          {STAGES.map((s, i) => (
            <InnerSplit key={s.id} id={s.id} photo={s.photo} title={s.title} flip={i % 2 === 1} mask={MASKS[i]}>
              <p className="stage-age">{s.age}</p>
              <p>{s.text}</p>
              <p><strong>Program focus:</strong> {s.focus}</p>
            </InnerSplit>
          ))}
        </div>
      </Section>

      <Section>
        <Cols>
          <Panel meta="Calendar of Events" title="Active citizenship & living in Australia">
            <p>Our Calendar of Events is far more than a list of special days. It is how we nurture active citizenship and help children understand what it means to belong to a caring, connected Australian community.</p>
            <ul className="ticks">
              <li><strong>Honouring First Nations heritage:</strong> daily Acknowledgement of Country, Dreaming stories, NAIDOC Week, and National Reconciliation Week.</li>
              <li><strong>Embracing Australian life &amp; traditions:</strong> ANZAC Day, Book Week, Harmony Week, and local community initiatives.</li>
              <li><strong>Celebrating multicultural diversity:</strong> family traditions, festivals, and languages from around the world.</li>
            </ul>
          </Panel>
          <Panel meta="Character building" title="How we interweave character across the year">
            <p>As children follow their curiosity and take part in community life, our educators intentionally weave our CIRCLE values and EYLF learning outcomes through <strong>12 monthly character focuses</strong>, helping children practise kindness, courage, honesty, and responsibility every single day.</p>
            {/* TODO: character-building diagram from the client deck */}
            <EmbedSlot title="Diagram" text="12-month character building wheel (from client deck)" />
          </Panel>
        </Cols>
      </Section>

      <Section bg="sky">
        <SectionHead title="Bringing the community in & exploring beyond our doors" lead="Learning comes alive when children connect what they discover in our rooms with the wider world around them." />
        <Cols>
          <Panel title="Monthly incursions, with families warmly invited"><p>Every month, we welcome inspiring educators, artists, wildlife handlers, storytellers, and community helpers into our centres for hands-on learning experiences. Best of all, we warmly invite all Mirabilia families to come along and join in, turning each monthly incursion into a shared celebration of curiosity, connection, and learning side by side with your child.</p></Panel>
          <Panel title="Local excursions & community exploration"><p>When children’s interests lead beyond our gates, we venture out on carefully planned, risk-assessed excursions across our local Western Australian neighbourhoods and cultural landmarks. Whether exploring nearby parks, libraries, museums, or community spaces, children practise road safety, active citizenship, and genuine belonging in their community.</p></Panel>
        </Cols>
      </Section>

      <Section>
        <Cols n={3}>
          <Panel meta="Squad Programs" title="All-inclusive enrichment every week" href="/squad-programs" color="blue" />
          <Panel meta="A Day at Mirabilia" title="Daily rhythm & mealtimes" href="/a-day-at-mirabilia" color="lime" />
          <Panel meta="Learning Spaces" title="Designed as the “third teacher”" href="/our-spaces" color="orange" />
        </Cols>
        <div className="mt-l"><CtaStrip text="See our learning journeys in action. Come and visit one of our centres." cta={["/book-a-tour", "Book a Tour"]} /></div>
      </Section>
      <JsonLd data={breadcrumbLd(CRUMBS)} />
    </>
  );
}
