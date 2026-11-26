import Link from "next/link";
import CentreMap from "@/components/CentreMap";
import JsonLd from "@/components/JsonLd";
import { EnquiryForm } from "@/components/forms";
import { PageHero, Section, SectionHead } from "@/components/Sections";
import { Icon } from "@/components/Shapes";
import { CENTRES, EMAIL, HOURS, PHONE, PHONE_HREF } from "@/lib/data";
import { breadcrumbLd, pageMetadata, type Crumb } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us",
  description: "Get in touch with Mirabilia Early Learning. Call, email or make an enquiry and our friendly team will be in touch.",
  path: "/contact",
});

const CRUMBS: Crumb[] = [["Contact", "/contact"]];

// Same layout as /enquire-now (form, contact details, map), with the Contact Us copy.
export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={CRUMBS}
        title="Contact us"
        lead="Each Mirabilia centre is a warm, welcoming space where children are known, valued and inspired. Whether you’re exploring early learning for the first time or ready to take the next step, our friendly team is here to help. Reach out with any question, big or small, and we’ll be in touch to support you and your family."
        bg="var(--lime)"
        shapes={[1, "purple", "blue"]}
      />

      <Section>
        <div className="form-wrap form-wrap--aside">
          <EnquiryForm heading="Make an Inquiry" />
          <aside className="contact-aside reveal">
            <h2 className="h3">Talk to a real person</h2>
            <p>Our team is happy to help with enrolments, fees, CCS or anything else.</p>
            <ul className="contact-aside__list">
              <li><Icon name="people" color="pink" /><span><strong><a href={PHONE_HREF}>{PHONE}</a></strong>Call any centre</span></li>
              <li><Icon name="calendar" color="teal" /><span><strong><a href={`mailto:${EMAIL}`}>{EMAIL}</a></strong>We reply within business hours</span></li>
              <li><Icon name="clock" color="yellow" /><span><strong>{HOURS}</strong>Opening hours, all centres</span></li>
            </ul>
            <div className="contact-aside__centres">
              {CENTRES.map((c) => (
                <Link href={`/${c.slug}`} key={c.slug}>
                  <Icon name="pin" color={c.color} />
                  <span><strong>{c.name}</strong>{c.street}, {c.suburb}</span>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </Section>

      <Section id="locations" className="section--flush-top">
        <SectionHead title="Our four centres" lead="Find the one closest to you, get directions, or book a tour there." />
        <CentreMap />
      </Section>
      <JsonLd data={breadcrumbLd(CRUMBS)} />
    </>
  );
}
