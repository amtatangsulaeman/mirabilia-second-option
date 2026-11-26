import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CENTRES, PROGRAMS, PROGRAM_DETAIL, centreBySlug, programBySlug } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import CentrePage from "./CentrePage";
import ProgramPage from "./ProgramPage";

// Centre and program pages share the root URL space (/caversham, /cooking-class)
// to keep every URL from the previous site.
export const dynamicParams = false;

export function generateStaticParams() {
  return [...CENTRES, ...PROGRAMS].map(({ slug }) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const centre = centreBySlug(slug);
  if (centre) {
    return pageMetadata({
      title: centre.title,
      description: `Mirabilia ${centre.name}: childcare, early learning and kindy at ${centre.street}, ${centre.suburb}. Open 6:30am to 6:30pm. Book a tour today.`,
      path: `/${slug}`,
      image: centre.hero[0],
    });
  }
  const program = programBySlug(slug);
  if (program) {
    return pageMetadata({
      title: `${program.name} | Squad Programs`,
      description: `${program.name} at Mirabilia: ${PROGRAM_DETAIL[slug].intro[0]}`.slice(0, 158),
      path: `/${slug}`,
      image: program.photo[0],
    });
  }
  return {};
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;
  const centre = centreBySlug(slug);
  if (centre) return <CentrePage centre={centre} />;
  const program = programBySlug(slug);
  if (program) return <ProgramPage program={program} />;
  notFound();
}
