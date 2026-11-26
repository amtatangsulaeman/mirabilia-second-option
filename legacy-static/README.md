# Mirabilia — redesign (second option)

Static website. Content, photos and videos come from mirabilia.com.au; the layout, type,
shapes and illustration style follow meplace.co, recoloured in Mirabilia's palette.

## Open it
Open `index.html` in a browser. No build step is needed to view it.

## Edit content
All pages are generated from `_build/build.py` (copy, image choices, page structure).
After editing it, run:

    python _build/build.py

Styles live in `assets/css/style.css`, behaviour in `assets/js/main.js`.

## Before going live
- **Forms** (Enquire, Book a Tour, 25% promo, tour feedback) are styled markup with `action="#"`.
  Point them at the GoHighLevel form endpoints, or swap in the GHL embeds.
- **Font**: the reference uses Mabry Pro (commercial). DM Sans is the free stand-in.
  With a licence, put `MabryPro-Light/Regular/Medium.woff2` into `assets/fonts/` and it is used automatically.
- **Privacy Policy** link in the footer points to `#`.
- Two pieces of copy are duplicated on the live site and kept as-is: "Building Partnerships with
  Families and Community" (About Us) repeats the "Empowering Children…" paragraph, and
  "What is a Squad Program?" uses the Happy Feet description.

## Palette
Purple #812990 · Orange #ED5E26 · Lime #ACD03B · Blue #2484C5 · Pink #C8225C · Linen #F4EEE6
