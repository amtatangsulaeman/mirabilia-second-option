"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CTA_LINKS, EMAIL, NAV, OFFER, PHONE, PHONE_HREF, navLinks, offerActive, type NavEntry } from "@/lib/data";
import { Chev } from "./Shapes";

const LOGO = "/logo.png";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [tourHref, setTourHref] = useState("/book-a-tour");

  useEffect(() => {
    // Jump to this page's own tour form only where it already has the centre chosen
    // (centre pages) or on the Book a Tour page itself; everywhere else go to /book-a-tour.
    const ownForm = document.querySelector("#tour[data-centre]") || pathname === "/book-a-tour";
    setTourHref(ownForm ? "#tour" : "/book-a-tour");
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    // A page opened at #anchor is scrolled by the browser before this runs, sometimes
    // without a later scroll event, so check again once the page has settled.
    const t = window.setTimeout(onScroll, 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onScroll);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isCurrent = (g: NavEntry) => g.href === pathname || navLinks(g).some(([href]) => href === pathname);
  const link = ([href, label]: [string, string]) => (
    <li key={href}>
      <Link href={href} aria-current={pathname === href ? "page" : undefined} onClick={() => setOpen(false)}>{label}</Link>
    </li>
  );
  const offer = offerActive();

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      {offer && (
        <Link className="topbar" href="/promotion">
          <span>{OFFER.bar}</span>
          <span className="topbar__more" aria-hidden="true">See the offer →</span>
        </Link>
      )}
      <header className={`header${scrolled ? " is-scrolled" : ""}${offer ? " has-topbar" : ""}`}>
        <div className="nav">
          <Link className="nav__logo" href="/" aria-label="Mirabilia home">
            <Image src={LOGO} alt="Mirabilia" width={150} height={35} priority />
          </Link>
          <nav aria-label="Main">
            <ul className="nav__menu">
              {NAV.map((g) =>
                g.href ? (
                  <li className="nav__item" key={g.key}>
                    <Link className="nav__link" href={g.href} aria-current={pathname === g.href ? "page" : undefined}>{g.label}</Link>
                  </li>
                ) : (
                  <li className={`nav__item${isCurrent(g) ? " is-current" : ""}`} key={g.key}>
                    <button className="nav__link" type="button" aria-haspopup="true">{g.label}<Chev /></button>
                    <div className={`dropdown${g.groups ? " dropdown--grouped" : ""}`}>
                      {g.groups ? (
                        g.groups.map((grp) => (
                          <div className="dropdown__group" key={grp.heading}>
                            <span className="dropdown__heading">{grp.heading}</span>
                            <ul>{grp.items.map(link)}</ul>
                          </div>
                        ))
                      ) : (
                        <ul>{g.items?.map(link)}</ul>
                      )}
                    </div>
                  </li>
                ),
              )}
            </ul>
          </nav>
          <div className="nav__cta">
            {/* "Explore Now": the two main actions, agreed in the Nov 2026 revision. */}
            <div className="cta-menu">
              <button className="btn btn--fill" type="button" aria-haspopup="true">Explore Now<Chev /></button>
              <ul className="dropdown cta-menu__list">
                {CTA_LINKS.map(([href, label]) => (
                  <li key={href}><Link href={href === "/book-a-tour" ? tourHref : href}>{label}</Link></li>
                ))}
              </ul>
            </div>
            <button className="menu-toggle" type="button" aria-controls="mnav" aria-expanded={open} onClick={() => setOpen(true)}>Menu</button>
          </div>
        </div>
      </header>

      <div className={`mnav${open ? " is-open" : ""}`} id="mnav" aria-hidden={!open}>
        <div className="mnav__top">
          <Link href="/" onClick={() => setOpen(false)}><Image src={LOGO} alt="Mirabilia" width={136} height={32} /></Link>
          <button ref={closeRef} className="menu-toggle" style={{ display: "inline-flex" }} type="button" onClick={() => setOpen(false)}>Close</button>
        </div>
        <nav aria-label="Mobile">
          {NAV.map((g) =>
            g.href ? (
              <Link key={g.key} href={g.href} onClick={() => setOpen(false)}>{g.label}</Link>
            ) : (
              <details key={g.key}>
                <summary>{g.label}</summary>
                <div>
                  {g.groups
                    ? g.groups.map((grp) => (
                        <div key={grp.heading}>
                          <span className="dropdown__heading">{grp.heading}</span>
                          {grp.items.map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
                        </div>
                      ))
                    : g.items?.map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
                </div>
              </details>
            ),
          )}
        </nav>
        <div className="btns">
          {CTA_LINKS.map(([href, label], i) => (
            <Link key={href} className={`btn${i ? "" : " btn--fill"}`} href={href === "/book-a-tour" ? tourHref : href} onClick={() => setOpen(false)}>{label}</Link>
          ))}
          <a className="btn" href={PHONE_HREF}>{PHONE}</a>
        </div>
        <p className="mnav__mail"><a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
      </div>
    </>
  );
}
