import Link from "next/link";
import { redirect } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";
import JsonLd from "@/components/JsonLd";
import Reviews from "@/components/Reviews";
import { EnquiryForm } from "@/components/forms";
import { FaqSection, FeatureCards, Marquee, PageHero, Section, SectionHead, TeamGrid } from "@/components/Sections";
import { C, Ill, onColor } from "@/components/Shapes";
import { PHONE, PHONE_HREF, offerActive } from "@/lib/data";
import { breadcrumbLd, faqLd, pageMetadata, type Crumb } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Save 25% on Childcare – Limited Time Offer",
  description: "New families save 25% on childcare at Mirabilia in Perth, plus up to 4 free playdates for babies. Offer ends 31 December.",
  path: "/promotion",
  image: "smiling-boy.jpg",
});

const TICKER = ["Get 25% off", "Secure your child’s future", "Enrol at any of our locations", "New Champion Lakes centre included"];

const FAQ: [string, string, ReactNode][] = [
  ["Who is eligible for this offer?",
    "This discount is available to new families who enrol their child at any Mirabilia centre. We care for children from 6 weeks to 5 years old.",
    <>This discount is available to new families who enrol their child at any Mirabilia centre. We care for children from 6 weeks to 5 years old, helping them thrive before starting school.</>],
  ["How do I claim it?",
    "Fill out the form on this page and our team will guide you through enrolment and apply your discount. You can also book a tour at any centre and mention the 25% offer.",
    <>Fill out the form below and our team will guide you through enrolment and apply your discount. You can also <Link className="link-u" href="/book-a-tour">book a tour</Link> at any centre and mention the 25% offer. We’ll handle the rest.</>],
  ["Why are you offering this?",
    "We believe every child deserves the best start in life. This offer lets families experience Mirabilia while making care more affordable.",
    <>We believe every child deserves the best start in life. Finding the right childcare can feel overwhelming, so this offer is our way of letting families experience Mirabilia while making care more affordable.</>],
  ["Can I combine it with the Child Care Subsidy?",
    `Please ask our team on ${PHONE} how the discount works alongside your CCS.`,
    <>Please ask our team on <a className="link-u" href={PHONE_HREF}>{PHONE}</a> how the discount works alongside your <Link className="link-u" href="/ccs-information">CCS</Link>.</>],
];

const OFFERS: [color: string, big: string, small: string, title: string, text: string][] = [
  ["teal", "25%", "off for 25 weeks", "Citiplace, Perth CBD", "Our city centre near Perth Station."],
  ["orange", "25%", "off for 1 month", "Caversham, Byford & Champion Lakes", "Our suburban centres, including the brand new Champion Lakes."],
  ["pink", "4", "free playdates", "For babies 0 to 2", "Let your little one get to know the room and educators before they start."],
];

const CRUMBS: Crumb[] = [["Current Offer", "/promotion"]];

export default function PromotionPage() {
  // Offer switched off or expired (lib/data.ts OFFER): send visitors to the fees page instead.
  if (!offerActive()) redirect("/childcare-subsidy");
  return (
    <>
      <PageHero
        crumbs={CRUMBS}
        title={<>Save <span className="mark-big">25%</span> on childcare</>}
        lead="A limited-time offer for new families at every Mirabilia centre, including our new Champion Lakes centre. Spaces are limited, so secure your child’s spot today!"
        bg="var(--rose)"
        photo={["smiling-boy.jpg", "A smiling boy at the lunch table"]}
        photo2={["music-shaker.jpg", "A baby playing with a shaker"]}
        shapes={[0, "pink", "yellow"]}
        actions={<>
          <a className="btn btn--fill" href="#claim">Claim the offer <span className="arr" aria-hidden="true">→</span></a>
          <Link className="btn btn--white" href="/book-a-tour">Or book a tour first</Link>
        </>}
      />

      <Marquee items={TICKER} variant="marquee--lime" />

      <Section>
        <SectionHead title="What’s the offer?" lead="25% off childcare fees for all new enrolments. Offer ends 31 December." />
        <div className="cards">
          {OFFERS.map(([c, big, small, h, p]) => (
            <article className="icard offer-card reveal" key={h} style={{ "--c": `var(--${c})`, "--fg": onColor(c) } as CSSProperties}>
              <span className="big">{big}<small>{small}</small></span>
              <h3>{h}</h3>
              <p>{p}</p>
            </article>
          ))}
        </div>
      </Section>

      <FaqSection items={FAQ.map(([q, , a]) => [q, a])} heading="About the promotion" intro="Everything you need to know before you enrol." />

      <Section>
        <SectionHead title="Why is Mirabilia the right choice?" />
        <FeatureCards items={[
          ["puzzle", "lime", "Tailored learning", "Personalised programs that nurture your child’s curiosity and growth."],
          ["tick", "purple", "Qualified educators", "Caring, professional staff dedicated to your child’s development."],
          ["house", "orange", "Safe & stimulating", "Purpose-built spaces designed to inspire learning through play."],
          ["people", "pink", "Community-focused", "We partner with families so every child feels supported and valued."],
        ]} />
      </Section>

      <Reviews keys={["gigi", "claire", "shasta", "denisa", "sudarmani", "morwenna"]} heading="What our families are saying" bg="sand" />

      <Section>
        <SectionHead title="Meet the team" lead="Our passionate educators are the heart of Mirabilia, creating a safe, inspiring space where every child thrives." />
        <TeamGrid people={["jaclyn", "naomi", "abbie"]} />
      </Section>

      <Section bg="lilac" id="claim">
        <div className="form-wrap">
          <div className="reveal">
            <h2 className="h2">Secure your child’s spot today!</h2>
            <p className="lead" style={{ marginTop: 20 }}>Fill out the form and our team will contact you to guide you through enrolment and apply your 25% discount.</p>
            <div style={{ width: 170, marginTop: 40, color: C.ink }}><Ill kind={4} /></div>
          </div>
          <EnquiryForm heading="Claim my 25% off" button="Claim the offer" withReferral={false} />
        </div>
      </Section>

      <JsonLd data={[breadcrumbLd(CRUMBS), faqLd(FAQ.map(([q, a]) => [q, a]))]} />
    </>
  );
}
