import { Cols, CtaStrip, Panel } from "@/components/Blocks";
import JsonLd from "@/components/JsonLd";
import { PageHero, Section, SectionHead, TickList } from "@/components/Sections";
import { PHONE, PHONE_HREF } from "@/lib/data";
import { breadcrumbLd, faqLd, pageMetadata, type Crumb } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Child Care Subsidy (CCS) & How to Claim",
  description: "Everything about the Child Care Subsidy in one place: eligibility, how much you can receive, the activity test, and how to claim CCS through myGov.",
  path: "/childcare-subsidy",
  image: "educator-puzzle.jpg",
});

const SA_URL = "https://www.servicesaustralia.gov.au/child-care-subsidy";
const CRUMBS: Crumb[] = [["Families", "/childcare-subsidy"], ["Child Care Subsidy", "/childcare-subsidy"]];

const WHO = [
  "Care for a child 13 or younger who isn’t attending secondary school, unless an exemption applies",
  "Use an approved child care service, like Mirabilia",
  "Be responsible for paying the child care fees",
  "Meet residency and immunisation requirements",
];

const ACTIVITY = [
  "Paid work, including self-employment or paid and unpaid parental leave",
  "Unpaid work in the family business",
  "Training to improve work skills or job prospects",
  "An approved course of education or study",
  "Volunteering",
  "Unpaid work experience or internships",
  "Actively setting up a business",
  "Actively looking for work",
];

export default function SubsidyPage() {
  return (
    <>
      <PageHero
        crumbs={CRUMBS}
        title="Quality care, made more accessible"
        lead="The Australian Government’s Child Care Subsidy helps families with the cost of early learning, and our team is here to guide you through it. From understanding your eligibility to setting up your claim through myGov, we’ll help you get the support you’re entitled to, without the stress."
        tint="yellow"
        shapes={[2, "pink", "green"]}
        actions={<>
          <a className="btn btn--fill" href="#claim">How to claim</a>
          <a className="btn btn--white" href={SA_URL} target="_blank" rel="noopener noreferrer">Estimate your subsidy</a>
        </>}
      />

      <Section>
        <div className="split" style={{ alignItems: "start" }}>
          <SectionHead title="Who can get the CCS?" lead="The CCS is paid directly to us and comes off the fees you pay. To get it, you must:" />
          <div className="reveal"><TickList items={WHO} /></div>
        </div>
      </Section>

      <Section bg="sand">
        <SectionHead title="How much can a family receive?" lead="Your subsidy depends on three things." />
        <Cols n={3}>
          <Panel title="Combined family income" color="pink"><p>Both partners’ combined income sets the percentage of the fee that is subsidised, up to the government’s hourly rate cap. The rate gradually decreases as income goes up.</p></Panel>
          <Panel title="Activity level" color="teal"><p>An activity test sets how many hours of subsidised care you can access each fortnight. In two-parent families, the parent with fewer activity hours determines the hours.</p></Panel>
          <Panel title="Type of care" color="orange"><p>The subsidy is based on the type of approved care you use, such as Centre Based Day Care, each with its own hourly rate cap.</p></Panel>
        </Cols>
        <p className="lead mt-l"><strong>Extra support</strong> is available for some families, such as grandparents and families experiencing temporary financial hardship.</p>
      </Section>

      <Section>
        <div className="split" style={{ alignItems: "start" }}>
          <SectionHead title="What counts as activity?" lead="A broad range of activities count, and they can be combined to reach the maximum number of subsidised hours. Travel time between care and your activity counts too." />
          <div className="reveal"><TickList items={ACTIVITY} /></div>
        </div>
      </Section>

      <Section bg="butter" id="claim">
        <SectionHead title="Claiming your CCS in three steps" />
        <Cols n={3}>
          <Panel meta="Step 1" title="Apply online"><p>Apply through your Services Australia account via myGov.</p></Panel>
          <Panel meta="Step 2" title="Check eligibility"><p>Use the Services Australia eligibility tool if you’re unsure what you can receive.</p></Panel>
          <Panel meta="Step 3" title="Tell us"><p>Let us know when you enrol so we can link your CCS to your booking.</p></Panel>
        </Cols>
        <p className="mt-l">
          Subsidy rates and hourly caps are set by the government and change each financial year. For current figures, use the{" "}
          <a className="link-u" href={SA_URL} target="_blank" rel="noopener noreferrer">Services Australia estimator</a>. Having trouble with your CCS? Call Centrelink on{" "}
          <a className="link-u" href="tel:136150"><strong>136 150</strong></a>, or ask our team on <a className="link-u" href={PHONE_HREF}><strong>{PHONE}</strong></a>.
        </p>
      </Section>

      <Section tight>
        <CtaStrip text="Speak with our team and we’ll help you through fees and CCS." />
      </Section>

      <JsonLd data={[
        breadcrumbLd(CRUMBS),
        faqLd([
          ["What is the Child Care Subsidy?", "The CCS is financial help from the Australian Government with the cost of child care. It is paid directly to the provider to reduce the fees you pay."],
          ["Who can get the CCS?", `To get the CCS you must: ${WHO.join("; ")}.`],
          ["How do I claim the CCS?", "Apply online through your Services Australia account via myGov, then tell us when you enrol so we can link your CCS to your booking."],
        ]),
      ]} />
    </>
  );
}
