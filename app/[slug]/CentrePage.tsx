import Link from "next/link";
import type { ReactNode } from "react";
import CentreMap from "@/components/CentreMap";
import JsonLd from "@/components/JsonLd";
import Reviews from "@/components/Reviews";
import { CtaStrip, VideoSlot } from "@/components/Blocks";
import {
  ChildSafety, FaqSection, Gallery, InfoStrip, PageHero, PageNav, PullQuote, Section, SectionHead, Split, TourSection,
} from "@/components/Sections";
import { C, Dot, Half, Icon, Pill, Scallop } from "@/components/Shapes";
import { AGES, CENTRES, EMAIL, HOURS, PHONE, PHONE_HREF, centreFaq, directionsUrl, pullQuoteFor, type Centre } from "@/lib/data";
import { breadcrumbLd, childCareLd, faqLd, type Crumb } from "@/lib/seo";

const BRING: [string, ReactNode][] = [
  ["Breast milk or formula", <Dot key="a" c={C.pink} />],
  ["A sterilised bottle from home", <Pill key="b" c={C.blue} />],
  ["A bucket hat", <Half key="c" c={C.yellow} rot={180} />],
  ["A bag of spare clothes", <Scallop key="d" c={C.green} />],
];

export default function CentrePage({ centre: c }: { centre: Centre }) {
  const faq = centreFaq(c);
  const pull = pullQuoteFor("educators", c.slug);
  const [g1, ...rest] = c.gallery;
  const crumbs: Crumb[] = [["Centres", "/centres"], [`Mirabilia ${c.name}`, `/${c.slug}`]];
  const index = CENTRES.findIndex((x) => x.slug === c.slug);

  return (
    <>
      <PageHero
        crumbs={crumbs}
        title={<>{c.welcome}{c.isNew && <span className="badge badge--inline">New!</span>}</>}
        lead={c.intro}
        tint={c.tint}
        photo={c.hero}
        photo2={g1}
        shapes={[index, c.color, "yellow"]}
        actions={<>
          <a className="btn btn--fill" href="#tour">Book a Tour</a>
          <a className="btn btn--white" href="#video-tour">Video Tour</a>
          <a className="btn btn--white" href={directionsUrl(c)} target="_blank" rel="noopener noreferrer">Get directions</a>
        </>}
      />

      <PageNav items={[["video-tour", "Video Tour"], ["overview", "Overview"], ["child-safety", "Safety"], ["location", "Location"], ["reviews", "Reviews"], ["faq", "FAQ"]]} />

      <Section id="video-tour" tight>
        <VideoSlot src={c.videoTour} title={`Video tour of Mirabilia ${c.name}`} />
      </Section>

      <Section id="overview" tight>
        <InfoStrip items={[
          ["pin", c.color, c.street, c.suburb],
          ["clock", "yellow", HOURS, "Monday to Friday"],
          ["sprout", "green", AGES, c.rating
            ? <a href={c.rating.url} target="_blank" rel="noopener noreferrer">{c.rating.score.toFixed(1)} stars on Google ({c.rating.count})</a>
            : "Long Day Care & kindy"],
          ["people", "pink", <a key="p" href={PHONE_HREF}>{PHONE}</a>, <a key="e" href={`mailto:${EMAIL}`}>{EMAIL}</a>],
        ]} />
      </Section>

      <Split photo={rest[0] ?? c.hero} photo2={rest[1]} heading={`Our ${c.name} educators`} mask={1}>
        <p>Our team of educators are committed and passionate about making sure your child is safe, nurtured and cared for every day.</p>
        <p>Children are encouraged to engage in interest-led play that creates learning and meaningful experiences. Our educators seek out diverse learning opportunities and implement the curriculum as framed by the Early Years Learning Framework.</p>
        <PullQuote review={pull} />
        <div className="btns"><Link className="btn" href="/our-curriculum">How our curriculum works</Link></div>
      </Split>

      <Section bg={c.tint === "yellow" ? "sky" : "butter"}>
        <div className="family-info">
          <article className="storypark reveal">
            <Icon name="camera" color="teal" className="storypark__icon" />
            <h2 className="h3">You and your child</h2>
            <p>We use <strong>Storypark</strong>, a centre-to-family platform where you can follow your child’s day through photos, stories and learning outcomes.</p>
            <p>Every family gets a secure login to use on a computer, mobile or the app.</p>
          </article>
          <div className="reveal">
            <h2 className="h3" style={{ marginBottom: 20 }}>What to bring</h2>
            <div className="bring">
              {BRING.map(([label, icon]) => (
                <div className="bring__item" key={label}>{icon}<span>{label}</span></div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {rest.length > 2 && (
        <Section>
          <SectionHead title="A peek inside" />
          <Gallery photos={c.gallery} />
        </Section>
      )}

      <Section tight>
        <CtaStrip text={`Squad Programs, meals, nappies and sunscreen are all included in your daily fee at Mirabilia ${c.name}.`} cta={["/inclusive-care", "One fee, everything included"]} />
      </Section>

      <ChildSafety centre={c.name} />

      <Section id="location">
        <SectionHead title={`Finding Mirabilia ${c.name}`} lead={`${c.street}, ${c.suburb}. Not the closest centre to you? Find your nearest one on the map.`} />
        <CentreMap focus={c.slug} />
      </Section>

      <Reviews centre={c} exclude={pull} />
      <FaqSection items={faq} heading={`${c.name} questions`} />
      <TourSection
        heading={`Book a tour at Mirabilia ${c.name}`}
        text={`Discover the nurturing environment at Mirabilia ${c.name}. Explore our facilities, meet our educators, and see how we inspire your child’s growth and development.`}
        centre={c.name}
      />
      <JsonLd data={[childCareLd(c), breadcrumbLd(crumbs), faqLd(faq)]} />
    </>
  );
}
