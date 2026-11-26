import CentreMap from "@/components/CentreMap";
import JsonLd from "@/components/JsonLd";
import { FeatureCards, PageHero, Section, SectionHead, TourSection } from "@/components/Sections";
import { Mark } from "@/components/ui";
import { breadcrumbLd, pageMetadata, type Crumb } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Book a Tour",
  description: "Book a tour at one of our Mirabilia childcare centres in Perth: Caversham, Byford, Citiplace or Champion Lakes.",
  path: "/book-a-tour",
  image: "outdoor-sandpit.jpg",
});

const CRUMBS: Crumb[] = [["Book a Tour", "/book-a-tour"]];

export default function BookTourPage() {
  return (
    <>
      <PageHero
        crumbs={CRUMBS}
        title={<>Book a <Mark color="pink">tour!</Mark></>}
        lead="Book a tour at one of our Mirabilia centres in Perth. Come and see the rooms, meet the educators and bring your little one along."
        bg="var(--peach)"
        photo={["outdoor-sandpit.jpg", "Educators and toddlers playing in the outdoor sandpit"]}
        shapes={[2, "teal", "yellow"]}
      />

      <Section>
        <SectionHead title="What happens on a tour?" />
        <FeatureCards items={[
          ["house", "orange", "Look around", "Walk through the rooms, outdoor spaces and kitchen at your own pace."],
          ["people", "pink", "Meet the team", "Say hello to the Centre Director and the educators in your child’s room."],
          ["pencil", "blue", "Ask anything", "Routines, meals, fees, CCS, settling in. No question is too small."],
          ["heart", "green", "No pressure", "Take your time to decide. We’re happy to answer follow-up questions."],
        ]} />
      </Section>

      <TourSection heading="Pick a centre and a time" text="Send us your details and we’ll call you to find a time that suits. Prefer to talk now? Give us a ring." />

      <Section className="section--flush-top">
        <SectionHead title="Not sure which centre?" lead="Find the Mirabilia centre closest to you, then pick it in the form above." />
        <CentreMap />
      </Section>
      <JsonLd data={breadcrumbLd(CRUMBS)} />
    </>
  );
}
