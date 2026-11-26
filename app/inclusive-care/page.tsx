import { CtaStrip, InnerSplit } from "@/components/Blocks";
import JsonLd from "@/components/JsonLd";
import { PageHero, Section, SectionHead, TickList } from "@/components/Sections";
import { breadcrumbLd, pageMetadata, type Crumb } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Inclusive Care: One Fee, Everything Included",
  description: "Mirabilia’s all-inclusive daily fee covers meals, nappies, sunscreen, incursions, excursions and every learning experience. No hidden extras.",
  path: "/inclusive-care",
  image: "outdoor-discover.jpg",
});

const CRUMBS: Crumb[] = [["Families", "/childcare-subsidy"], ["Inclusive Care", "/inclusive-care"]];

const INCLUDES = [
  "Freshly prepared, nutritious meals and snacks",
  "Nappies",
  "Sunscreen",
  "Engaging incursions that bring new experiences into the centre",
  "Excursions that extend learning into the wider community",
  "Every learning resource and experience in our program",
];

export default function InclusiveCarePage() {
  return (
    <>
      <PageHero
        crumbs={CRUMBS}
        title="One fee. Everything included."
        lead="We believe exceptional care should come without hidden extras. Our all-inclusive fee covers everything your child needs for a full, enriching day, so there are no surprise costs and no lists to pack."
        tint="blue"
        photo={["outdoor-sandpit.jpg", "Educators and toddlers playing in the outdoor sandpit"]}
        shapes={[0, "teal", "orange"]}
      />

      <Section>
        <div className="split" style={{ alignItems: "start" }}>
          <SectionHead title="Nothing extra to pay, nothing extra to pack" />
          <div className="reveal"><TickList items={INCLUDES} /></div>
        </div>
      </Section>

      <Section bg="butter">
        <InnerSplit photo={["outdoor-discover.jpg", "Three children in sun hats exploring a discovery tray on the grass"]} title="Flexible care options" mask="mask-arch">
          <p>Family life doesn’t always run to a set timetable. That’s why we offer flexible care options designed around your family’s needs, giving you confidence and peace of mind as your routine changes.</p>
        </InnerSplit>
      </Section>

      {/* Storypark placement is not final (brief §10). Also shown on A Day at Mirabilia. */}
      <Section>
        <SectionHead title="Stay connected with Storypark" lead="Your child’s day doesn’t have to be a mystery. Through Storypark, our secure family communication platform, you’ll receive updates, photos and learning stories that capture their discoveries and milestones. It’s a window into their world, and a simple way to share in their learning journey wherever you are." />
        <CtaStrip text={<em>Speak with our team to find out how our family benefits can support you.</em>} />
      </Section>
      <JsonLd data={breadcrumbLd(CRUMBS)} />
    </>
  );
}
