import Image from "next/image";
import type { ReactNode } from "react";
import type { Photo as PhotoT } from "@/lib/data";
import { IMAGE_SIZES } from "@/lib/images";

/** next/image for a file in public/photos, sized from lib/images.ts. */
export function Photo({
  photo,
  sizes = "(max-width: 820px) 100vw, 50vw",
  priority,
  className,
  decorative,
}: {
  photo: PhotoT;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Empty alt when the photo repeats information already in the text. */
  decorative?: boolean;
}) {
  const [src, alt] = photo;
  const [width, height] = IMAGE_SIZES[src] ?? [1280, 960];
  return (
    <Image
      src={`/photos/${src}`}
      alt={decorative ? "" : alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}

/** A highlighted word in a heading, set in a brand colour. */
export function Mark({ children, color = "purple" }: { children: ReactNode; color?: string }) {
  return <span className="mark" style={{ color: `var(--${color === "yellow" || color === "lime" || color === "green" ? `${color}-ink` : color})` }}>{children}</span>;
}

export const Arrow = () => <span className="arr" aria-hidden="true">→</span>;
