import Link from "next/link";
import CentreMap from "@/components/CentreMap";
import JsonLd from "@/components/JsonLd";
import Reviews from "@/components/Reviews";
import { CentreCards, Gallery, InfoStrip, PageHero, Section, SectionHead, TourSection } from "@/components/Sections";
import { Mark } from "@/components/ui";
import { CENTRES, HOURS, PHONE, PHONE_HREF } from "@/lib/data";
import { breadcrumbLd, childCareLd, pageMetadata, type Crumb } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Childcare Centres in Perth",
  description: "Explore Mirabilia childcare centres in Caversham, Byford, Citiplace (Perth CBD) and Champion Lakes. Open 6:30am to 6:30pm. Book a tour.",
  path: "/centres",
  image: "yard-slide.jpg",
});

const CRUMBS: Crumb[] = [["Centres", "/centres"]];

export default function CentresPage() {
  return (
    <>
      <PageHero
        crumbs={CRUMBS}
        title={<>Four homes <Mark color="orange">across Perth</Mark></>}
        lead="Each Mirabilia centre offers a safe, nurturing environment for your child’s growth. With unique programs and dedicated staff, every location provides exceptional care and learning opportunities."
        bg="var(--lime)"
        photo={["yard-slide.jpg", "Outdoor play yard with a curly orange slide and timber decking"]}
        photo2={["kitchen.jpg", "Bright centre kitchen and children’s bathroom area"]}
        shapes={[0, "purple", "blue"]}
      />

      <Section>
        <InfoStrip items={[
          ["clock", "yellow", `Open ${HOURS}`, "Same hours at every centre"],
          ["people", "pink", <a key="p" href={PHONE_HREF}>{PHONE}</a>, "One number for all centres"],
          ["calendar", "teal", <Link key="t" href="/book-a-tour">Book a tour</Link>, "See the rooms and meet the team"],
        ]} />
        <div className="mt-l"><CentreCards /></div>
      </Section>

      <Section id="map" className="section--flush-top">
        <SectionHead title="Which centre is closest?" lead="Tap the button and we’ll work out the nearest Mirabilia centre to where you are now." />
        <CentreMap />
      </Section>

      <Section bg="lilac">
        <SectionHead title="Spaces made for playing" lead="Sandpits, cubby houses, shady decks and calm indoor rooms, all designed to feel like a second home." />
        <Gallery photos={[
          ["yard-sandpit.jpg", "Big sandpit with a red slide and timber fence"],
          ["centre-playground.jpg", "Grassy yard with a climbing tower and garden paths"],
          ["caversham-room.jpg", "Bright playroom with low shelves"],
          ["byford-pergola.jpg", "Timber pergola over a sandpit"],
        ]} />
      </Section>

      <Reviews keys={["claire", "gigi", "shasta"]} />
      <TourSection />
      <JsonLd data={[breadcrumbLd(CRUMBS), ...CENTRES.map(childCareLd)]} />
    </>
  );
}
