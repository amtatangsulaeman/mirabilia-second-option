import type { CSSProperties } from "react";
import JsonLd from "@/components/JsonLd";
import { CtaBand, FeatureCards, Gallery, PageHero, ProgramCards, Section, SectionHead } from "@/components/Sections";
import { Icon, onColor } from "@/components/Shapes";
import { Mark } from "@/components/ui";
import { PROGRAMS, PROGRAM_DETAIL, type Program } from "@/lib/data";
import { breadcrumbLd, programLd, type Crumb } from "@/lib/seo";

export default function ProgramPage({ program: p }: { program: Program }) {
  const d = PROGRAM_DETAIL[p.slug];
  const [before, mark, after = ""] = d.tagline;
  const crumbs: Crumb[] = [["Squad Programs", "/squad-programs"], [p.name, `/${p.slug}`]];
  const index = PROGRAMS.findIndex((x) => x.slug === p.slug);

  return (
    <>
      <PageHero
        crumbs={crumbs}
        title={<>{before}<Mark color={p.color}>{mark}</Mark>{after}</>}
        tint={d.tint}
        photo={d.photos[0]}
        photo2={d.photos[1]}
        shapes={[index, p.color, "yellow"]}
      >
        <span className="program-label" style={{ "--c": `var(--${p.color})`, "--fg": onColor(p.color) } as CSSProperties}>
          <Icon name={p.icon} color="ink" />{p.name}
        </span>
      </PageHero>

      <Section>
        <div className="program-intro reveal">
          {d.intro.map((x, i) => <p key={i} className={i === 0 ? "h3" : "lead"}>{x}</p>)}
        </div>
        <div className="blocks">
          {d.blocks.map(([h, txt], i) => (
            <article className="icard reveal" key={h} style={{ "--c": i === 1 ? `var(--${p.color})` : "#fff", "--fg": i === 1 ? onColor(p.color) : "var(--ink)" } as CSSProperties}>
              <span className="icard__num">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="h3">{h}</h2>
              <p>{txt}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section bg="sand">
        <SectionHead title={`Why families love ${p.name}`} />
        <FeatureCards items={d.why} cols={4} />
      </Section>

      <Section>
        <SectionHead title={`Moments from ${p.name}`} />
        <Gallery photos={d.gallery} />
      </Section>

      <CtaBand heading="Join us!" text={d.join} primary={["/enquire-now", "Enquire now"]} secondary={["/book-a-tour", "Book a tour"]} />

      <Section bg="blue">
        <h2 className="h2">More Squad Programs</h2>
        <div className="mt-l"><ProgramCards exclude={p.slug} /></div>
      </Section>

      <JsonLd data={[programLd(p, d.intro[0]), breadcrumbLd(crumbs)]} />
    </>
  );
}
