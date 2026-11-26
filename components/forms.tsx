"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode, type RefObject } from "react";
import { CENTRES } from "@/lib/data";
import { C, Scallop } from "./Shapes";

const CENTRE_NAMES = CENTRES.map((c) => c.name);
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

/**
 * Shared submit behaviour: native validation, then a thank-you state.
 * TODO before launch: send `new FormData(form)` to the CRM / form endpoint
 * (e.g. a Route Handler at app/api/enquiry/route.ts). Nothing is sent yet.
 */
function useSubmit() {
  const [sent, setSent] = useState(false);
  const thanksRef = useRef<HTMLDivElement>(null);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      const invalid = Array.from(form.elements).find(
        (el) => (el as HTMLInputElement).willValidate && !(el as HTMLInputElement).checkValidity(),
      ) as HTMLElement | undefined;
      invalid?.focus();
      form.reportValidity();
      return;
    }
    setSent(true);
    requestAnimationFrame(() => thanksRef.current?.focus());
  };
  return { sent, onSubmit, thanksRef };
}

function Thanks({ refEl, title, children }: { refEl: RefObject<HTMLDivElement | null>; title: string; children: ReactNode }) {
  return (
    <div className="form__thanks" ref={refEl} tabIndex={-1}>
      <div className="form__thanks-shape"><Scallop c={C.lime} /></div>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}

function CentreSelect({ id, required, defaultValue, anyLabel = "Choose one" }: { id: string; required?: boolean; defaultValue?: string; anyLabel?: string }) {
  return (
    <select id={id} name="centre" required={required} defaultValue={defaultValue ?? ""}>
      <option value="">{anyLabel}</option>
      {CENTRE_NAMES.map((n) => <option key={n}>{n}</option>)}
    </select>
  );
}

const Optional = () => <span className="optional">(optional)</span>;

/** Today in Perth as YYYY-MM-DD, so the start date can't be in the past. */
const todayPerth = () => new Date().toLocaleDateString("en-CA", { timeZone: "Australia/Perth" });

/* ------------------------------------------------------------------ tour */
export function TourForm({ centre }: { centre?: string }) {
  const { sent, onSubmit, thanksRef } = useSubmit();
  const [minDate, setMinDate] = useState<string>();
  useEffect(() => setMinDate(todayPerth()), []);
  return (
    <form className="form" noValidate onSubmit={onSubmit}>
      {sent ? (
        <Thanks refEl={thanksRef} title="Thank you!">We&apos;ve got your request and will be in touch soon to find a time that suits.</Thanks>
      ) : (
        <>
          <div className="form__head"><h3 className="h3">Book a tour</h3></div>
          <div className="field"><label htmlFor="t-name">Your name</label><input id="t-name" name="name" autoComplete="name" required /></div>
          <div className="field"><label htmlFor="t-phone">Phone</label><input id="t-phone" name="phone" type="tel" autoComplete="tel" required /></div>
          <div className="field field--full"><label htmlFor="t-email">Email</label><input id="t-email" name="email" type="email" autoComplete="email" required /></div>
          <div className="field"><label htmlFor="t-centre">Centre</label><CentreSelect id="t-centre" required defaultValue={centre} /></div>
          <div className="field">
            <label htmlFor="t-age">Child&apos;s age</label>
            <select id="t-age" name="age" defaultValue="">
              <option value="">Choose one</option>
              <option>0 to 1 years</option><option>1 to 2 years</option><option>2 to 3 years</option><option>3 to 5 years</option><option>School age</option>
            </select>
          </div>
          <div className="field field--full">
            <span className="field__label" id="t-days-label">Days of care wanted <span className="optional">(choose any)</span></span>
            <div className="chips" role="group" aria-labelledby="t-days-label">
              {DAYS.map((d) => (
                <label className="chip" key={d}><input type="checkbox" name="care_days" value={d} /><span>{d.slice(0, 3)}</span></label>
              ))}
              <label className="chip"><input type="checkbox" name="care_days" value="Flexible" /><span>Not sure yet</span></label>
            </div>
          </div>
          <div className="field"><label htmlFor="t-start">Preferred start date <Optional /></label><input id="t-start" name="start_date" type="date" min={minDate} /></div>
          <div className="field"><label htmlFor="t-msg">Anything we should know? <Optional /></label><input id="t-msg" name="message" /></div>
          <button className="btn btn--fill" type="submit">Send my tour request <span className="arr" aria-hidden="true">→</span></button>
        </>
      )}
    </form>
  );
}

/* --------------------------------------------------------------- enquiry */
export function EnquiryForm({ heading = "Send us an enquiry", button = "Submit enquiry", withReferral = true }: { heading?: string; button?: string; withReferral?: boolean }) {
  const { sent, onSubmit, thanksRef } = useSubmit();
  return (
    <form className="form reveal" noValidate onSubmit={onSubmit}>
      {sent ? (
        <Thanks refEl={thanksRef} title="Thank you!">We&apos;ve received your details. Our friendly team will be in touch soon.</Thanks>
      ) : (
        <>
          <div className="form__head"><h2 className="h3">{heading}</h2></div>
          <fieldset className="form__group">
            <legend>About you</legend>
            <div className="field"><label htmlFor="e-first">First name</label><input id="e-first" name="first_name" autoComplete="given-name" required /></div>
            <div className="field"><label htmlFor="e-last">Last name</label><input id="e-last" name="last_name" autoComplete="family-name" required /></div>
            <div className="field"><label htmlFor="e-email">Email</label><input id="e-email" name="email" type="email" autoComplete="email" required /></div>
            <div className="field"><label htmlFor="e-phone">Phone</label><input id="e-phone" name="phone" type="tel" autoComplete="tel" required /></div>
          </fieldset>
          <fieldset className="form__group">
            <legend>About your child</legend>
            <div className="field"><label htmlFor="e-dob">Child&apos;s date of birth</label><input id="e-dob" name="child_dob" type="date" /></div>
            <div className="field">
              <label htmlFor="e-age">Age range</label>
              <select id="e-age" name="age_range" defaultValue="">
                <option value="">Choose one</option><option>0 to 1 years</option><option>1 to 2 years</option><option>2 to 3 years</option><option>3 to 5 years</option>
              </select>
            </div>
          </fieldset>
          <fieldset className="form__group">
            <legend>Care you need</legend>
            <div className="field"><label htmlFor="e-centre">Centre</label><CentreSelect id="e-centre" required /></div>
            <div className="field"><label htmlFor="e-start">Required care date</label><input id="e-start" name="care_date" type="date" /></div>
            <div className="field field--full">
              <span className="field__label" id="e-days-label">Required care days <span className="optional">(choose any)</span></span>
              <div className="chips" role="group" aria-labelledby="e-days-label">
                {DAYS.map((d) => (
                  <label className="chip" key={d}><input type="checkbox" name="care_days" value={d} /><span>{d.slice(0, 3)}</span></label>
                ))}
              </div>
            </div>
            <div className="field">
              <label htmlFor="e-total">Total days per week</label>
              <select id="e-total" name="days_per_week" defaultValue="">
                <option value="">Choose one</option>{[1, 2, 3, 4, 5].map((n) => <option key={n}>{n}</option>)}
              </select>
            </div>
            {withReferral && (
              <div className="field">
                <label htmlFor="e-ref">Where did you hear about us?</label>
                <select id="e-ref" name="referral" defaultValue="">
                  <option value="">Choose one</option><option>Google search</option><option>Facebook or Instagram</option><option>Friend or family</option><option>Drove past</option><option>Other</option>
                </select>
              </div>
            )}
            <div className="field field--full"><label htmlFor="e-msg">Message <Optional /></label><textarea id="e-msg" name="message" /></div>
          </fieldset>
          <label className="check field--full">
            <input type="checkbox" name="sms_consent" />
            <span>I consent to receive SMS notifications, alerts and occasional marketing communication from Mirabilia. Message frequency varies. Message and data rates may apply.</span>
          </label>
          <button className="btn btn--fill" type="submit">{button} <span className="arr" aria-hidden="true">→</span></button>
        </>
      )}
    </form>
  );
}

/* --------------------------------------------------------------- careers */
export function CareersForm() {
  const { sent, onSubmit, thanksRef } = useSubmit();
  return (
    <form className="form reveal" noValidate onSubmit={onSubmit}>
      {sent ? (
        <Thanks refEl={thanksRef} title="Thanks for applying!">We&apos;ve received your application and will be in touch soon.</Thanks>
      ) : (
        <>
          <div className="form__head"><h2 className="h3">Apply now</h2></div>
          <div className="field"><label htmlFor="c-first">First name</label><input id="c-first" name="first_name" autoComplete="given-name" required /></div>
          <div className="field"><label htmlFor="c-last">Last name</label><input id="c-last" name="last_name" autoComplete="family-name" required /></div>
          <div className="field"><label htmlFor="c-email">Email</label><input id="c-email" name="email" type="email" autoComplete="email" required /></div>
          <div className="field"><label htmlFor="c-phone">Phone</label><input id="c-phone" name="phone" type="tel" autoComplete="tel" required /></div>
          <div className="field">
            <label htmlFor="c-role">Role you&apos;re interested in</label>
            {/* TODO: confirm role list with Mirabilia */}
            <select id="c-role" name="role" required defaultValue="">
              <option value="">Choose one</option><option>Early Childhood Teacher</option><option>Diploma Educator</option><option>Certificate III Educator</option><option>Cook</option><option>Trainee</option><option>Other</option>
            </select>
          </div>
          <div className="field"><label htmlFor="c-centre">Preferred centre</label><CentreSelect id="c-centre" anyLabel="Any centre" /></div>
          <div className="field field--full"><label htmlFor="c-cv">Resume</label><input id="c-cv" name="resume" type="file" accept=".pdf,.doc,.docx" /></div>
          <div className="field field--full"><label htmlFor="c-msg">Tell us about yourself <Optional /></label><textarea id="c-msg" name="message" /></div>
          <button className="btn btn--fill" type="submit">Send application <span className="arr" aria-hidden="true">→</span></button>
        </>
      )}
    </form>
  );
}
