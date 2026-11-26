# Mirabilia — redesign, second option (Next.js)

The final content from `Website/Mirabilia` (including the Nov 2026 revision: new sitemap, Our Story, Learning Journeys, A Day at Mirabilia, Learning Spaces & Child Safety, Inclusive Care, Family Benefits, Contact, SEO-only Squad topic pages) (copy, photos, blog, SEO, forms,
map, switches), shown in a design based on meplace.co and recoloured with Mirabilia's palette.

## Run

    npm install
    npm run dev        # http://localhost:3000
    npm run build && npm start

Next.js 16 (App Router) + React 19 + TypeScript. Every page is pre-rendered to static HTML.

## Where things live

| What | Where |
| --- | --- |
| Content shared across pages: centres, programs, team, reviews, nav, offer, child safety, FAQ | `lib/data.ts` (same file as the main project) |
| SEO: metadata, JSON-LD, sitemap, robots | `lib/seo.ts`, `app/sitemap.ts`, `app/robots.ts` |
| Blog posts (Markdown) | `content/blog/` |
| Page copy | `app/**/page.tsx`, centre + program pages in `app/[slug]/` |
| Sections (hero, split, focus cards, FAQ, tour form card…) | `components/Sections.tsx` |
| Shapes, icons and small illustrations | `components/Shapes.tsx` |
| Forms, map, Squad slideshow, day timeline, reviews slider | `components/forms.tsx`, `CentreMap.tsx`, `SquadSlideshow.tsx`, `DayTimeline.tsx`, `Reviews.tsx` |
| Styles | `app/globals.css` |
| Photos | `public/photos/` (sizes for next/image in `lib/images.ts`) |
| First static HTML draft | `legacy-static/` (not part of the build) |

If you add a photo, also add its size to `lib/images.ts`.

## Switches (`lib/data.ts`)

Same as the main project: `OFFER` (hide or change the 25% offer everywhere),
`SETTINGS.reviews` (`per-centre` / `generic`), `SETTINGS.squadLayout` (`slideshow` / `grid` / `list`),
`rating` and `geo` on each centre, `CHILD_SAFETY`.

## Before launch

- Forms show a thank-you message but do not send anything yet. Connect them in
  `components/forms.tsx` (CRM or a Route Handler).
- Social links, Privacy Policy page, careers role list, and the items in the revision report's
  "confirm with client" list (child safety copy, map pins, Google ratings, offer for 2027).
- Font: the reference uses Mabry Pro (commercial). DM Sans is the free stand-in; with a licence,
  load Mabry with `next/font/local` in `app/layout.tsx` using `variable: "--font-mabry"`.
