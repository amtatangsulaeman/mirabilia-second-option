import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { PostCard, PostMeta } from "@/components/blog";
import { Breadcrumbs, CtaBand, Section, SectionHead } from "@/components/Sections";
import { formatDate, getPost, getPosts, relatedPosts } from "@/lib/blog";
import { HOURS, PHONE, PHONE_HREF } from "@/lib/data";
import { blogPostingLd, breadcrumbLd, pageMetadata, type Crumb } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    image: post.image,
    article: { publishedTime: post.date, modifiedTime: post.updated, section: post.category },
  });
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const crumbs: Crumb[] = [["Blog", "/blog"], [post.title, `/blog/${post.slug}`]];
  const related = relatedPosts(post);

  return (
    <>
      <article className="post">
        <header className="phero phero--plain" style={{ "--bg": "var(--butter)" } as React.CSSProperties}>
          <div className="wrap">
            <Breadcrumbs trail={crumbs} />
            <h1 className="post__title">{post.title}</h1>
            <p className="phero__lead">{post.description}</p>
            <div className="post__byline">
              <span>By {post.author}</span>
              <PostMeta post={post} />
              {post.updated && <span>Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time></span>}
            </div>
          </div>
        </header>

        <div className="wrap">
          <figure className="post__cover">
            <Image src={post.image} alt={post.imageAlt} fill priority sizes="(max-width: 1200px) 92vw, 1100px" />
          </figure>
          <div className={`post__layout${post.toc.length > 1 ? "" : " post__layout--single"}`}>
            {post.toc.length > 1 && (
              <aside className="post__toc">
                <details open>
                  <summary>In this article</summary>
                  <ol>
                    {post.toc.map((h) => <li key={h.id}><a href={`#${h.id}`}>{h.text}</a></li>)}
                  </ol>
                </details>
              </aside>
            )}
            <div className="post__main">
              <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
              <aside className="post__help">
                <h2 className="h3">Want to talk it through?</h2>
                <p>Call our friendly team on <a className="link-u" href={PHONE_HREF}><strong>{PHONE}</strong></a>, or come and see our rooms in person.</p>
                <Link className="btn btn--fill" href="/book-a-tour">Book a tour <span className="arr" aria-hidden="true">→</span></Link>
              </aside>
              <p><Link className="link-u" href="/blog">Back to all articles</Link></p>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <Section bg="sand">
          <SectionHead title="Keep reading" />
          <div className="post-grid">
            {related.map((p) => <PostCard post={p} key={p.slug} />)}
          </div>
        </Section>
      )}

      <CtaBand
        heading="Come and see Mirabilia for yourself"
        text={`Four centres across Perth, open ${HOURS}. Meet the educators and ask anything.`}
        primary={["/book-a-tour", "Book a tour"]}
        secondary={["/centres", "Find a centre"]}
      />
      <JsonLd data={[blogPostingLd(post), breadcrumbLd(crumbs)]} />
    </>
  );
}
