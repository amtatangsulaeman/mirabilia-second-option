import Link from "next/link";
import { Cols, EmbedSlot, Panel } from "@/components/Blocks";
import JsonLd from "@/components/JsonLd";
import { PageHero, Section, SectionHead } from "@/components/Sections";
import { breadcrumbLd, pageMetadata, type Crumb } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Careers in Early Childhood Education",
  description: "Inspire the next generation. Grow your career with Mirabilia, a supportive early learning team in Perth with ongoing training and room to grow.",
  path: "/careers",
  image: "table-play.jpg",
});

const CRUMBS: Crumb[] = [["Careers", "/careers"]];

/**
 * Recruitment platform embed (Redy job portal, still to be confirmed).
 * Paste the embed URL here once known; until then the area shows a placeholder.
 */
const JOBS_EMBED = "";

export default function CareersPage() {
  return (
    <>
      <PageHero
        crumbs={CRUMBS}
        title="Inspire the next generation. Grow your career with Mirabilia."
        lead="At Mirabilia, our educators are at the heart of everything we do. We’re always looking for passionate, caring people who share our belief that every child deserves an extraordinary start in life. Join a team where your work is valued, your growth is supported and every day makes a difference."
        tint="blue"
        photo={["table-play.jpg", "An educator playing with children at a small table"]}
        shapes={[0, "green", "pink"]}
        actions={<a className="btn btn--fill" href="#roles">View open roles</a>}
      />

      <Section>
        <SectionHead title="A place to grow, with purpose" />
        <Cols n={3}>
          <Panel title="A culture that cares" color="purple"><p>We believe great care starts with a great team. Our supportive, positive workplace culture is built on respect, collaboration and genuine care for one another, so you’ll feel welcomed, valued and part of something special from day one.</p></Panel>
          <Panel title="Grow with us" color="lime"><p>Your development matters to us. Through ongoing training, mentoring and professional learning opportunities, we help you build your skills, reach your goals and take your career further.</p></Panel>
          <Panel title="Purpose in every day" color="orange"><p>Few careers are as rewarding as shaping a child’s earliest years. At Mirabilia, you’ll help children discover, play, learn and thrive, and watch the difference you make unfold every day.</p></Panel>
        </Cols>
      </Section>

      <Section bg="sand" id="roles">
        <SectionHead title="Current opportunities" />
        {JOBS_EMBED
          ? <iframe src={JOBS_EMBED} title="Mirabilia job listings" style={{ width: "100%", minHeight: 640, border: 0, borderRadius: 20 }} loading="lazy" />
          : <EmbedSlot title="Job listings" text="The recruitment platform will be embedded here." />}
        <p className="mt-l">Can&apos;t see the right role? <Link className="link-u" href="/contact">Contact us</Link> and tell us about yourself.</p>
      </Section>
      <JsonLd data={breadcrumbLd(CRUMBS)} />
    </>
  );
}
