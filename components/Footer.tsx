import Image from "next/image";
import Link from "next/link";
import { CENTRES, EMAIL, HOURS, PHONE, PHONE_HREF } from "@/lib/data";
import { C, Half, Leaf, Scallop, Shape } from "./Shapes";

export function Acknowledgement() {
  return (
    <section className="ack section--tight section" aria-labelledby="ack-h">
      <div className="wrap ack__grid">
        <div className="ack__art" aria-hidden="true">
          <Shape style={{ width: "46%", left: "4%", top: "8%" }}><Half c={C.orange} rot={180} /></Shape>
          <Shape style={{ width: "40%", right: "6%", top: "20%" }} anim="spin"><Scallop c={C.yellow} /></Shape>
          <Shape style={{ width: "44%", left: "26%", bottom: "4%" }}><Leaf c={C.green} /></Shape>
        </div>
        <div>
          <h2 className="h3 ack__title" id="ack-h">Acknowledgement of Country</h2>
          <p>
            Mirabilia acknowledges the traditional owners of all lands across Australia. We recognise and celebrate the contributions of
            Aboriginal and Torres Strait Islander people as the First Australians, including their role in the education and care of
            children. We acknowledge and pay our respects to the Elders of the past, present and emerging. We thank you for sharing and
            caring for the land we learn and play on. We endeavour to continue to respect, share and care for this beautiful land.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <Shape className="s-f1" anim="spin"><Scallop c={C.orange} /></Shape>
      <div className="wrap">
        <div className="footer__top">
          <div className="footer__brand">
            <Image src="/logo.png" alt="Mirabilia" width={196} height={46} />
            <p>Early Learning Education Centre &amp; Kindergarten. A caring, homelike place for Perth&apos;s little wonders.</p>
            <div className="btns">
              <Link className="btn btn--white" href="/book-a-tour">Book a Tour</Link>
              <Link className="btn btn--ghost-light" href="/enquire-now">Make an Enquiry</Link>
            </div>
            {/* TODO: add the real Facebook / Instagram links once Mirabilia confirms them */}
          </div>
          <div>
            <h4>Curriculum &amp; Programs</h4>
            <ul>
              <li><Link href="/our-philosophy">Philosophy</Link></li>
              <li><Link href="/our-curriculum">Learning Journeys</Link></li>
              <li><Link href="/squad-programs">Squad Programs</Link></li>
              <li><Link href="/a-day-at-mirabilia">A Day at Mirabilia</Link></li>
              <li><Link href="/our-spaces">Learning Spaces &amp; Child Safety</Link></li>
            </ul>
          </div>
          <div>
            <h4>Centres</h4>
            <ul className="footer__loc">
              {CENTRES.map((c) => (
                <li key={c.slug}>
                  <Link href={`/${c.slug}`}>{c.name}</Link>
                  <address>{c.street}, {c.suburb}</address>
                </li>
              ))}
            </ul>
            <p className="footer__hours">Open {HOURS}</p>
          </div>
          <div>
            <h4>Get in touch</h4>
            <ul>
              <li><a href={PHONE_HREF}>{PHONE}</a></li>
              <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
              <li><Link href="/childcare-subsidy">Child Care Subsidy</Link></li>
              <li><Link href="/inclusive-care">Inclusive Care</Link></li>
              <li><Link href="/family-benefits">Family Benefits</Link></li>
              <li><Link href="/our-story">Our Story</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/blog">Blog &amp; Parent Tips</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer__word" aria-hidden="true">mirabilia</div>
        <div className="footer__bottom">
          <span>&copy; {new Date().getFullYear()} Cherub and Co | Mirabilia</span>
          {/* TODO: privacy policy page */}
          <a href="#">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
