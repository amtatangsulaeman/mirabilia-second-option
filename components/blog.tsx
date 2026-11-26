import Image from "next/image";
import Link from "next/link";
import { formatDate, type Post } from "@/lib/blog";

/** "8 October 2026 · 4 min read" */
export function PostMeta({ post }: { post: Post }) {
  return (
    <p className="post-meta">
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span aria-hidden="true">·</span>
      <span>{post.minutes} min read</span>
    </p>
  );
}

/** Blog card: the whole card is clickable through the title link. */
export function PostCard({ post, featured, headingLevel = "h3" }: { post: Post; featured?: boolean; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <article className={`post-card reveal${featured ? " post-card--featured" : ""}`}>
      <div className="post-card__photo">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          sizes={featured ? "(max-width: 820px) 90vw, 55vw" : "(max-width: 600px) 90vw, (max-width: 1100px) 45vw, 30vw"}
        />
      </div>
      <div className="post-card__body">
        <H><Link href={`/blog/${post.slug}`}>{post.title}</Link></H>
        <p>{post.description}</p>
        <div className="post-card__foot">
          <PostMeta post={post} />
          <span aria-hidden="true">Read ↗</span>
        </div>
      </div>
    </article>
  );
}
