import { Cols, CtaStrip, InnerSplit, Panel, Rows } from "@/components/Blocks";
import JsonLd from "@/components/JsonLd";
import { PageHero, Section, SectionHead } from "@/components/Sections";
import { SQUAD_TOPICS } from "@/lib/squad";
import { breadcrumbLd, pageMetadata, type Crumb } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Squad Programs: All-Inclusive Enrichment",
  description: "Happy Feet Fitness, Planet Soccer, Yoganastics, Performing Arts, language classes and cooking lessons, plus weekly Program Officers. 100% included in your daily fees.",
  path: "/squad-programs",
  image: "squad-dance.jpg",
});

const CRUMBS: Crumb[] = [["Curriculum & Programs", "/our-curriculum"], ["Squad Programs", "/squad-programs"]];

const SESSIONS: [string, string][] = [
  ["Happy Feet Fitness", "Energetic, imaginative movement and dance sessions that build coordination, rhythm, balance, and a joyful love of active play."],
  ["Planet Soccer", "Fun, non-competitive ball skills and teamwork games designed to develop gross-motor confidence, spatial awareness, and sportsmanship."],
  ["Yoganastics", "Mindful movement, stretching, breathing techniques, and emotional regulation skills that help children find calm, focus, and body awareness."],
  ["Performing Arts (Music, Drama & Visual Art)", "Led by our dedicated Performing Arts Teacher, children explore expressive storytelling, rhythm, instruments, dramatic play, and creative visual arts."],
  ["Language Classes", "Playful, interactive introductions to new languages and songs that spark cognitive flexibility, cultural curiosity, and respect for our diverse world."],
  ["Internal Cooking Lessons", "Hands-on culinary adventures where children measure, mix, taste, and learn practical nutrition and garden-to-plate skills alongside our educators."],
];
const TOPIC_COLORS = ["green", "orange", "purple", "teal"];

export default function SquadPage() {
  return (
    <>
      <PageHero
        crumbs={CRUMBS}
        title="All-inclusive enrichment every week"
        lead="Every child deserves access to rich, inspiring specialist experiences, which is why our signature SQUAD Enrichment Program is 100% included in your daily fees, with no hidden extras or add-on costs."
        tint="blue"
        photo={["squad-dance.jpg", "Kindergarten children dancing with maracas"]}
        photo2={["squad-board.jpg", "A wall display of Squad program photos"]}
        shapes={[1, "orange", "blue"]}
      />

      <Section>
        <InnerSplit photo={["happyfeet-3.jpg", "Children holding the edge of a colourful parachute"]} title="Specialist partners & educator-led studios" mask="mask-blob">
          <p>Working alongside our emergent curriculum and CIRCLE core values, our SQUAD sessions nurture physical confidence, creativity, cultural awareness, and lifelong curiosity through a weekly rotation of specialist partners and educator-led studios.</p>
        </InnerSplit>
        <div className="mt-l"><Rows items={SESSIONS.map(([t, d]) => [t, <p key={t}>{d}</p>])} /></div>
      </Section>

      <Section bg="blue">
        <h2 className="h2 measure">Championing every area of growth</h2>
        <p className="lead measure shead__lead">We go beyond a “one-size-fits-all” approach by empowering passionate educators to serve as dedicated Program Officers. Every week, our officers weave specialised, purposeful experiences into each room’s program.</p>
        <div className="mt-l">
          <Cols>
            {SQUAD_TOPICS.map((t, i) => (
              <Panel key={t.slug} meta={t.officer} title={t.name} href={`/squad-programs/${t.slug}`} color={TOPIC_COLORS[i % 4]}>
                <p>{t.summary}</p>
              </Panel>
            ))}
          </Cols>
        </div>
      </Section>

      <Section tight>
        <CtaStrip text="Squad Programs are part of every day at all four Mirabilia centres, with no extra cost." cta={["/book-a-tour", "Book a Tour"]} />
      </Section>
      <JsonLd data={breadcrumbLd(CRUMBS)} />
    </>
  );
}
