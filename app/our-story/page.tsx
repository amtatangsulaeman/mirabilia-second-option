import JsonLd from "@/components/JsonLd";
import { CtaStrip } from "@/components/Blocks";
import { PageHero, Section } from "@/components/Sections";
import { Photo } from "@/components/ui";
import { LEADERSHIP } from "@/lib/data";
import { breadcrumbLd, pageMetadata, type Crumb } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Story: Leadership Team",
  description: "Meet the people behind Mirabilia: our Senior Management Team, Centre Managers and Shared Services Team.",
  path: "/our-story",
});

const CRUMBS: Crumb[] = [["Our Story", "/our-story"]];
const COLORS = ["purple", "orange", "teal"];

export default function OurStoryPage() {
  return (
    <>
      <PageHero
        crumbs={CRUMBS}
        title="The people behind our purpose"
        lead="Behind every Mirabilia centre is a dedicated leadership team who bring experience, vision and heart to everything we do. Together, they guide our philosophy, support our educators and make sure every family receives the exceptional care and education we’re known for."
        bg="var(--peach)"
        shapes={[3, "pink", "orange"]}
      />
      <Section>
        {LEADERSHIP.map((g, gi) => (
          <div className="leader-group" key={g.key}>
            <div className="leader-group__head">
              <h2 className="h2">{g.title}</h2>
              <p className="lead">{g.text}</p>
            </div>
            <div className="team team--3">
              {g.people.map((p) => (
                <article className="tcard reveal" key={p.name} style={{ ["--c" as string]: `var(--${COLORS[gi % 3]})`, ["--fg" as string]: "#fff" }}>
                  {/* New staff photos are being taken; until then a neutral placeholder. Do not reuse the old team photos. */}
                  <div className="tcard__img">
                    {p.photo
                      ? <Photo photo={[p.photo, p.name]} sizes="(max-width: 540px) 100vw, 30vw" />
                      : <div className="tcard__placeholder" aria-hidden="true">Photo coming soon</div>}
                  </div>
                  <div className="tcard__body">
                    <h3>{p.name}</h3>
                    <p>{p.role}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </Section>
      <Section tight>
        <CtaStrip text="Want to be part of the team behind Mirabilia?" cta={["/careers", "View Careers"]} />
      </Section>
      <JsonLd data={breadcrumbLd(CRUMBS)} />
    </>
  );
}
