import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaStrip } from "@/components/Blocks";
import JsonLd from "@/components/JsonLd";
import { PageHero, Section } from "@/components/Sections";
import { SQUAD_TOPICS, squadTopicBySlug } from "@/lib/squad";
import { breadcrumbLd, pageMetadata, type Crumb } from "@/lib/seo";

// SEO-only pages: reachable from /squad-programs and the sitemap, not from the main menu.
export const dynamicParams = false;
export const generateStaticParams = () => SQUAD_TOPICS.map(({ slug }) => ({ topic: slug }));

type Props = { params: Promise<{ topic: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = squadTopicBySlug((await params).topic);
  if (!t) return {};
  return pageMetadata({
    title: `${t.name} | Squad Programs`,
    description: `${t.name} at Mirabilia Early Learning: ${t.summary}`.slice(0, 158),
    path: `/squad-programs/${t.slug}`,
    image: t.photo[0],
  });
}

export default async function SquadTopicPage({ params }: Props) {
  const t = squadTopicBySlug((await params).topic);
  if (!t) notFound();
  const crumbs: Crumb[] = [["Curriculum & Programs", "/our-curriculum"], ["Squad Programs", "/squad-programs"], [t.name, `/squad-programs/${t.slug}`]];
  return (
    <>
      <PageHero crumbs={crumbs} title={t.name} lead={t.summary} tint="blue" photo={t.photo} shapes={[SQUAD_TOPICS.indexOf(t), "orange", "lime"]} />
      <Section>
        <div className="prose measure">
          <h2 className="h3">{t.officer}</h2>
          {t.body.map((p) => <p key={p} className="lead">{p}</p>)}
          <p><Link className="link-u" href="/squad-programs">See all Squad Programs</Link></p>
        </div>
        <div className="mt-l"><CtaStrip text="Included in your daily fees at every Mirabilia centre." cta={["/book-a-tour", "Book a Tour"]} /></div>
      </Section>
      <JsonLd data={breadcrumbLd(crumbs)} />
    </>
  );
}
