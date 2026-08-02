import { useState } from 'react';

export default function App() {
  const [formStatus, setFormStatus] = useState('idle');

  async function handleSubmit(event) {
    event.preventDefault();
    setFormStatus('submitting');

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch('https://formsubmit.co/ajax/hebilifestyle@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Submission failed');

      form.reset();
      setFormStatus('success');
    } catch {
      setFormStatus('error');
    }
  }

  const services = [
    ['School Transportation', 'Helping foster youth get to school safely, consistently, and on time so educational routines remain stable.'],
    ['Family Visit Transportation', 'Supporting meaningful family connection through dependable transportation for scheduled visits.'],
    ['Medical Appointment Transportation', 'Providing reliable transportation to medical and therapeutic appointments with professionalism and care.'],
    ['Court-Related Transportation', 'Ensuring timely transportation for hearings and legal obligations with structure and clear coordination.'],
  ];

  const values = [
    ['Reliability & Punctuality', 'Every ride matters. We show up consistently, on time, communicate clearly, and follow through.'],
    ['Professionalism', 'We operate with structure, accountability, and respect for every agency and family we serve.'],
    ['Care', 'Our work is human-centered and grounded in dignity, trust, and responsibility.'],
    ['Consistency', 'Stable transportation helps support stable outcomes for youth in foster care.'],
  ];

  const faqs = [
    ['Who can request transportation?', 'Hebi works with DHR, child welfare agencies, institutional partners, medical providers, and families seeking private transportation support.'],
    ['Which areas does Hebi serve?', 'Hebi currently serves Madison County and is expanding into Walker County, Lee County, and Mobile, Alabama.'],
    ['What transportation is available?', 'Services include school, family visit, medical and therapeutic appointment, and court-related transportation.'],
    ['How do I get started?', 'Submit the inquiry form or contact Hebi by phone or email. A team member will follow up regarding your needs and next steps.'],
  ];

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#f7f4ef_45%,#ffffff_100%)] text-slate-800">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2 lg:px-8">
          <a href="#top"><img src="/hebi-logo.png" alt="Hebi Lifestyle Foster Care Services" className="h-14 w-auto sm:h-16" /></a>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            <a href="#about" className="hover:text-[#0e2f66]">About</a>
            <a href="#services" className="hover:text-[#0e2f66]">Services</a>
            <a href="#work" className="hover:text-[#0e2f66]">Work With Us</a>
            <a href="#impact" className="hover:text-[#0e2f66]">Community</a>
            <a href="#contact" className="rounded-xl bg-[#0e2f66] px-4 py-2 font-medium text-white hover:bg-[#123b7b]">Request Transportation</a>
          </nav>
          <a href="#contact" className="rounded-xl bg-[#0e2f66] px-4 py-2 text-xs font-medium text-white md:hidden">Contact</a>
        </div>
      </header>

      <main id="top">
        <section className="border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,rgba(14,47,102,0.10),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f8fbff_55%,#f4efe7_100%)]">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
            <div className="flex flex-col justify-center">
              <div className="mb-4 inline-flex w-fit rounded-full border border-[#cfd9ea] bg-white/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-[#0e2f66] shadow-sm">Trusted Transportation Support</div>
              <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-[#102a56] sm:text-5xl lg:text-6xl">Reliable transportation for foster youth. Built on care, consistency, and trust.</h1>
              <p className="mt-4 max-w-xl text-lg leading-7 text-slate-600">Hebi ensures youth in foster care make it to school, family visits, and essential appointments safely, reliably, and on time.</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#contact" className="rounded-2xl bg-[#0e2f66] px-6 py-3 text-sm font-medium text-white shadow-lg hover:bg-[#123b7b]">Request Transportation</a>
                <a href="#work" className="rounded-2xl border border-[#d5deeb] bg-white/80 px-6 py-3 text-sm font-medium text-[#102a56] hover:bg-[#eef4fb]">Join Our Team</a>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-3xl border border-[#dbe3ef] bg-white/95 p-6 shadow-lg sm:col-span-2">
                <div className="text-sm uppercase tracking-[0.18em] text-slate-500">What We Do</div>
                <p className="mt-3 leading-7 text-slate-700">We provide transportation to youth in foster care that is reliable, safe, and structured. We assist agencies and care teams by removing barriers to education, family connection, healthcare, and legal obligations. We also work directly with families privately in addition to agency partnerships.</p>
              </div>
              <div className="rounded-3xl border border-[#dbe3ef] bg-white/95 p-6 shadow-lg"><div className="text-3xl font-semibold text-[#0e2f66]">4</div><div className="mt-2 text-sm uppercase tracking-[0.18em] text-slate-500">Core Service Areas</div></div>
              <div className="rounded-3xl border border-[#dbe3ef] bg-white/95 p-6 shadow-lg"><div className="text-3xl font-semibold text-[#0e2f66]">2014</div><div className="mt-2 text-sm uppercase tracking-[0.18em] text-slate-500">Serving Madison County DHR Since</div></div>
              <div className="rounded-3xl border border-[#dbe3ef] bg-white p-6 shadow-sm sm:col-span-2">
                <div className="text-sm uppercase tracking-[0.18em] text-slate-500">Who We Partner With</div>
                <div className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2"><div className="flex items-start gap-2"><span className="mt-0.5 text-[#0e2f66]">✓</span><span>Department of Human Resources</span></div><div className="flex items-start gap-2"><span className="mt-0.5 text-[#0e2f66]">✓</span><span>Child Welfare Agencies</span></div><div className="flex items-start gap-2"><span className="mt-0.5 text-[#0e2f66]">✓</span><span>Institutional Partners</span></div><div className="flex items-start gap-2"><span className="mt-0.5 text-[#0e2f66]">✓</span><span>Medical Providers</span></div><div className="flex items-start gap-2"><span className="mt-0.5 text-[#0e2f66]">✓</span><span>Families Seeking Private Transportation Support</span></div></div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="text-sm uppercase tracking-[0.18em] text-slate-500">About Hebi</div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#102a56] sm:text-4xl">Transportation that supports stability, dignity, and trust.</h2>
              <p className="mt-4 leading-7 text-slate-600">Hebi Lifestyle Foster Care Services was created to address a critical gap in the foster care system: dependable transportation. Behind every missed appointment or delayed visit is a larger impact on a child’s routine, support system, and overall stability.</p>
              <p className="mt-4 leading-7 text-slate-600">Hebi has proudly provided transportation services for Madison County DHR since 2014 and is currently expanding into Walker County, Lee County, and Mobile, Alabama. We believe transportation is more than movement. It is access to education, family, health, and continuity.</p>
            </div>
            <div className="rounded-3xl border border-[#dbe3ef] bg-white/95 p-8 shadow-lg">
              <div className="text-sm uppercase tracking-[0.18em] text-slate-500">Mission</div>
              <p className="mt-3 text-lg leading-7">To provide safe, reliable transportation that supports the well-being, stability, and success of youth in foster care.</p>
              <div className="mt-8 text-sm uppercase tracking-[0.18em] text-slate-500">Service Area</div>
              <p className="mt-3 leading-7 text-slate-600">Currently serving Madison County and expanding into Walker County, Lee County, and Mobile, Alabama.</p>
            </div>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">{values.map(([title, description]) => <div key={title} className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><h3 className="text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{description}</p></div>)}</div>
        </section>

        <section id="services" className="border-y border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)]">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="max-w-2xl"><div className="text-sm uppercase tracking-[0.18em] text-slate-500">Services</div><h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#102a56] sm:text-4xl">Clear, structured transportation services designed for foster care support.</h2><p className="mt-4 leading-7 text-slate-600">Our services meet the needs of agencies, caseworkers, families, and support systems with dependable execution and professional coordination.</p></div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">{services.map(([title, description]) => <div key={title} className="rounded-3xl border border-[#dbe3ef] bg-white/95 p-8 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"><h3 className="text-2xl font-semibold">{title}</h3><p className="mt-4 leading-7 text-slate-600">{description}</p></div>)}</div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="rounded-[2rem] bg-[linear-gradient(135deg,#0b2348_0%,#154680_100%)] p-8 text-white shadow-xl lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
              <div><div className="text-sm uppercase tracking-[0.18em] text-blue-200">Private Family Transportation</div><h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Support is available beyond agency referrals.</h2><p className="mt-4 max-w-2xl leading-7 text-blue-100">Families may contact Hebi directly to discuss private transportation needs related to education, family connection, healthcare, and required appointments.</p></div>
              <div className="flex flex-wrap gap-4 lg:justify-end"><a href="tel:3012040270" className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-[#0e2f66]">Call 301-204-0270</a><a href="#contact" className="rounded-2xl border border-white/30 px-6 py-3 text-sm font-semibold">Send an Inquiry</a></div>
            </div>
          </div>
        </section>

        <section id="work" className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-[#dbe3ef] bg-white p-8 shadow-lg"><div className="text-sm uppercase tracking-[0.18em] text-slate-500">For Drivers</div><h2 className="mt-3 text-3xl font-semibold">Do purpose-driven work with Hebi.</h2><p className="mt-5 leading-7 text-slate-600">Every ride contributes to stability, care, and consistency for youth in foster care.</p><div className="mt-4 space-y-3 text-sm text-slate-700"><div>• Flexible opportunities</div><div>• Structured scheduling</div><div>• Clear expectations and support</div><div>• Meaningful work that directly impacts families</div></div><a href="#contact" className="mt-8 inline-flex rounded-2xl bg-[#0e2f66] px-5 py-3 text-sm font-medium text-white">Apply to Join Our Team</a></div>
            <div className="rounded-3xl border border-[#dbe3ef] bg-[#eef4fb] p-8 shadow-lg"><div className="text-sm uppercase tracking-[0.18em] text-slate-500">For Students & Partners</div><h2 className="mt-3 text-3xl font-semibold">Fellowship, scholarship, and partnership opportunities.</h2><p className="mt-5 leading-7 text-slate-600">Hebi supports future leaders, students, and institutions that want to contribute to meaningful community impact.</p><div className="mt-4 space-y-3 text-sm text-slate-700"><div>• Fellowship opportunities</div><div>• Scholarship initiatives</div><div>• Institutional partnerships</div><div>• Community engagement opportunities</div></div><a href="#contact" className="mt-8 inline-flex rounded-2xl border border-[#d5deeb] bg-white px-5 py-3 text-sm font-medium text-[#102a56]">Express Interest</a></div>
          </div>
        </section>

        <section id="impact" className="border-y border-slate-200 bg-[linear-gradient(135deg,#0b2348_0%,#123e7b_58%,#667085_150%)] text-white">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8"><div className="grid gap-8 lg:grid-cols-2"><div><div className="text-sm uppercase tracking-[0.18em] text-slate-300">Community & Impact</div><h2 className="mt-3 text-3xl font-semibold sm:text-4xl">More than transportation. Part of a broader support system.</h2><p className="mt-4 leading-7 text-slate-300">Hebi strengthens the ecosystem around foster youth through partnerships, scholarship programs, student fellowships, and long-term community initiatives.</p></div><div className="grid gap-4 sm:grid-cols-2">{['Consistent school attendance','Stronger family connection','Timely access to healthcare','Better support for court and case requirements'].map(item => <div key={item} className="rounded-3xl border border-white/10 bg-white/10 p-6"><div className="text-lg font-medium">{item}</div></div>)}</div></div></div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8"><div className="text-center"><div className="text-sm uppercase tracking-[0.18em] text-slate-500">Frequently Asked Questions</div><h2 className="mt-3 text-3xl font-semibold text-[#102a56] sm:text-4xl">Helpful information before you reach out.</h2></div><div className="mt-10 grid gap-4">{faqs.map(([q,a]) => <details key={q} className="rounded-2xl border border-[#dbe3ef] bg-white p-6 shadow-sm"><summary className="cursor-pointer text-lg font-semibold">{q}</summary><p className="mt-3 leading-7 text-slate-600">{a}</p></details>)}</div></section>

        <section id="contact" className="border-t border-slate-200 bg-white/70">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div><div className="text-sm uppercase tracking-[0.18em] text-slate-500">Contact</div><h2 className="mt-3 text-3xl font-semibold text-[#102a56] sm:text-4xl">Let’s connect.</h2><p className="mt-4 leading-7 text-slate-600">Whether you are an agency, applicant, student, family, or community partner, we would love to learn how Hebi can support your needs.</p><div className="mt-8 space-y-4"><div><strong>Email:</strong> <a className="text-[#0e2f66]" href="mailto:hebilifestyle@gmail.com">hebilifestyle@gmail.com</a></div><div><strong>Phone:</strong> <a className="text-[#0e2f66]" href="tel:3012040270">301-204-0270</a></div><div><strong>Current service area:</strong> Madison County</div><div><strong>Expanding to:</strong> Walker County, Lee County, and Mobile, Alabama</div></div></div>

            <form onSubmit={handleSubmit} className="rounded-3xl border border-[#dbe3ef] bg-white p-8 shadow-lg">
              <input type="hidden" name="_subject" value="New Hebi Lifestyle Website Inquiry" />
              <div className="grid gap-4 sm:grid-cols-2">
                <input required name="name" className="rounded-2xl border border-[#d6dfeb] bg-[#fcfdff] px-4 py-3" placeholder="Name" />
                <input name="organization" className="rounded-2xl border border-[#d6dfeb] bg-[#fcfdff] px-4 py-3" placeholder="Organization (if applicable)" />
                <input required type="email" name="email" className="rounded-2xl border border-[#d6dfeb] bg-[#fcfdff] px-4 py-3" placeholder="Email" />
                <input type="tel" name="phone" className="rounded-2xl border border-[#d6dfeb] bg-[#fcfdff] px-4 py-3" placeholder="Phone" />
                <select required name="inquiryType" defaultValue="" className="rounded-2xl border border-[#d6dfeb] bg-[#fcfdff] px-4 py-3 sm:col-span-2"><option value="" disabled>Inquiry Type</option><option>Agency Partnership</option><option>Request Transportation</option><option>Private Family Transportation</option><option>Driver Application</option><option>Student or Fellowship Interest</option><option>General Inquiry</option></select>
                <textarea required name="message" className="min-h-[150px] rounded-2xl border border-[#d6dfeb] bg-[#fcfdff] px-4 py-3 sm:col-span-2" placeholder="Tell us how we can support you" />
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="rounded-2xl bg-[#0e2f66] px-6 py-3 text-sm font-medium text-white shadow-[0_12px_30px_rgba(14,47,102,0.16)] transition hover:-translate-y-0.5 hover:bg-[#123b7b] disabled:cursor-not-allowed disabled:opacity-70 sm:col-span-2"
                >
                  {formStatus === 'submitting' ? 'Sending…' : 'Send Inquiry'}
                </button>

                {formStatus === 'success' && (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 sm:col-span-2">
                    Thank you. Your inquiry was sent successfully. A Hebi team member will follow up soon.
                  </div>
                )}

                {formStatus === 'error' && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 sm:col-span-2">
                    We could not send your inquiry. Please email hebilifestyle@gmail.com or call 301-204-0270.
                  </div>
                )}
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white"><div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 text-sm text-slate-500 lg:flex-row lg:items-center lg:justify-between lg:px-8"><img src="/hebi-logo.png" alt="Hebi Lifestyle Foster Care Services" className="h-16 w-auto" /><div className="text-center lg:text-right"><div>Reliable transportation. Care-centered support. Trust-driven partnership.</div><div className="mt-1">Madison County • Expanding across Alabama</div></div></div></footer>
    </div>
  );
}
