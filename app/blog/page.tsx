import JsonLd from "@/components/JsonLd";
import { PostCard } from "@/components/blog";
import { CtaBand, PageHero, Section } from "@/components/Sections";
import { Mark } from "@/components/ui";
import { getPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/data";
import { breadcrumbLd, pageMetadata, type Crumb } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Blog: Childcare Tips for Perth Families",
  description: "Practical tips from Mirabilia educators on starting childcare, settling in, the Child Care Subsidy, early learning and family life in Perth.",
  path: "/blog",
  image: "home-corner-story.jpg",
});

const CRUMBS: Crumb[] = [["Blog", "/blog"]];

export default function BlogPage() {
  const posts = getPosts();
  const [first, ...rest] = posts;
  return (
    <>
      <PageHero
        crumbs={CRUMBS}
        title={<>Tips &amp; stories for <Mark color="pink">families</Mark></>}
        lead="Practical advice from our educators on starting childcare, settling in, subsidies and everyday learning at home."
        tint="yellow"
        shapes={[3, "blue", "pink"]}
      />
      <Section>
        {first ? (
          <>
            <PostCard post={first} featured headingLevel="h2" />
            {rest.length > 0 && (
              <div className="post-grid">
                {rest.map((p) => <PostCard post={p} key={p.slug} headingLevel="h2" />)}
              </div>
            )}
          </>
        ) : (
          <p className="lead">New articles are on their way. Check back soon!</p>
        )}
      </Section>
      <CtaBand
        heading="Have a question we haven’t covered?"
        text="Our team is happy to talk it through, whether it’s settling in, fees or the Child Care Subsidy."
        primary={["/book-a-tour", "Book a tour"]}
        secondary={["/enquire-now", "Contact us"]}
      />
      <JsonLd data={[
        breadcrumbLd(CRUMBS),
        {
          "@context": "https://schema.org",
          "@type": "Blog",
          "@id": `${SITE_URL}/blog#blog`,
          name: "Mirabilia Blog",
          url: `${SITE_URL}/blog`,
          inLanguage: "en-AU",
          blogPost: posts.map((p) => ({ "@id": `${SITE_URL}/blog/${p.slug}#article` })),
        },
      ]} />
    </>
  );
}
