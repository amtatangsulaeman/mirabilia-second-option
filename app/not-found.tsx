import Link from "next/link";
import { PageHero } from "@/components/Sections";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <PageHero
      title="Oops, this page went out to play!"
      lead="We couldn't find the page you were looking for. Let's get you back somewhere fun."
      bg="var(--lime)"
      actions={<>
        <Link className="btn btn--fill" href="/">Back to home <span className="arr" aria-hidden="true">→</span></Link>
        <Link className="btn btn--white" href="/centres">Find a centre</Link>
      </>}
    />
  );
}
