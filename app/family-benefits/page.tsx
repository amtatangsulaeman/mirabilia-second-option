import { CtaStrip, InnerSplit } from "@/components/Blocks";
import JsonLd from "@/components/JsonLd";
import { PageHero, Section } from "@/components/Sections";
import { breadcrumbLd, pageMetadata, type Crumb } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Family Benefits: Sibling Discount & Flexible Care",
  description: "Sibling discounts and flexible care options that fit your family’s routine. Speak with the Mirabilia team to find out how our family benefits can support you.",
  path: "/family-benefits",
  image: "educator-puzzle.jpg",
});

const CRUMBS: Crumb[] = [["Families", "/childcare-subsidy"], ["Family Benefits", "/family-benefits"]];

// Kept deliberately light on detail so families contact their centre (brief §6).
export default function FamilyBenefitsPage() {
  return (
    <>
      <PageHero
        crumbs={CRUMBS}
        title="Because family matters to us"
        lead="We’re here to help make early learning work for your whole family."
        tint="yellow"
        photo={["smiling-boy.jpg", "A smiling boy at the lunch table"]}
        shapes={[3, "pink", "yellow"]}
      />
      <Section>
        <InnerSplit photo={["educator-puzzle.jpg", "An educator doing a peg puzzle with a toddler"]} title="Supporting you as your family grows" mask="mask-arch">
          <p className="stage-age">Sibling discount</p>
          <p>Families with more than one child enrolled at Mirabilia enjoy our sibling discount, our way of supporting you as your family grows and making quality care more achievable.</p>
        </InnerSplit>
      </Section>
      <Section bg="butter">
        <InnerSplit flip photo={["table-play.jpg", "An educator playing with children at a small table"]} title="Flexible care that fits your life" mask="mask-blob">
          <p className="stage-age">Flexi care</p>
          <p>Family life doesn’t always follow a set timetable. That’s why we offer flexible care options designed around your family’s needs and routine. As your work, schedule or circumstances change, we’ll work with you to find care that suits, giving you confidence and peace of mind.</p>
        </InnerSplit>
      </Section>
      <Section tight>
        <CtaStrip text={<em>Speak with our team to find out how our family benefits can support you.</em>} />
      </Section>
      <JsonLd data={breadcrumbLd(CRUMBS)} />
    </>
  );
}
