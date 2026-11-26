import Link from "next/link";
import CentreMap from "@/components/CentreMap";
import JsonLd from "@/components/JsonLd";
import { EnquiryForm } from "@/components/forms";
import { PageHero, Section, SectionHead } from "@/components/Sections";
import { Icon } from "@/components/Shapes";
import { Mark } from "@/components/ui";
import { CENTRES, EMAIL, HOURS, PHONE, PHONE_HREF } from "@/lib/data";
import { breadcrumbLd, pageMetadata, type Crumb } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Enquire Now",
  description: "Have a question about Mirabilia childcare? Send an enquiry about enrolments, fees or CCS and our team will get back to you.",
  path: "/enquire-now",
});

const CRUMBS: Crumb[] = [["Contact Us", "/enquire-now"]];

export default function EnquirePage() {
  return (
    <>
      <PageHero
        crumbs={CRUMBS}
        title={<>Have any <Mark color="orange">questions?</Mark></>}
        lead="Contact us here and our team will get back to you. Tell us a little about your family and the care you need."
        bg="var(--lime)"
        shapes={[1, "purple", "blue"]}
      />

      <Section>
        <div className="form-wrap form-wrap--aside">
          <EnquiryForm />
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
