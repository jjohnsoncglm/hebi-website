export default function App() {
  const services = [
    {
      title: 'School Transportation',
      description:
        'Helping foster youth get to school safely, consistently, and on time so educational routines remain stable.',
    },
    {
      title: 'Family Visit Transportation',
      description:
        'Supporting meaningful family connection through dependable transportation for scheduled visits.',
    },
    {
      title: 'Medical Appointment Transportation',
      description:
        'Providing reliable transportation to medical and therapeutic appointments with professionalism and care.',
    },
    {
      title: 'Court-Related Transportation',
      description:
        'Ensuring timely transportation for hearings and legal obligations with structure and clear coordination.',
    },
  ];

  const values = [
    {
      title: 'Reliability & Punctuality',
      description: 'Every ride matters. We show up consistently, on time, communicate clearly, and follow through.',
    },
    {
      title: 'Professionalism',
      description: 'We operate with structure, accountability, and respect for every agency and family we serve.',
    },
    {
      title: 'Care',
      description: 'Our work is human-centered and grounded in dignity, trust, and responsibility.',
    },
    {
      title: 'Consistency',
      description: 'Stable transportation helps support stable outcomes for youth in foster care.',
    },
  ];

  const impact = [
    'Consistent school attendance',
    'Stronger family connection',
    'Timely access to healthcare',
    'Better support for court and case requirements',
  ];

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#f7f4ef_45%,#ffffff_100%)] text-slate-800">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <img src="/hebi-logo.png" alt="Hebi Lifestyle Foster Care Services" className="h-12 w-auto" />
          </div>
          <nav className="hidden gap-6 text-sm md:flex">
            <a href="#about" className="transition hover:text-slate-950">About</a>
            <a href="#services" className="transition hover:text-slate-950">Services</a>
            <a href="#work" className="transition hover:text-slate-950">Work With Us</a>
            <a href="#impact" className="transition hover:text-slate-950">Community</a>
            <a href="#contact" className="transition hover:text-slate-950">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,rgba(14,47,102,0.08),transparent_30%),linear-gradient(180deg,#ffffff_0%,#f8fbff_55%,#f4efe7_100%)]">
          <div className="mx-auto grid max-w-7xl gap-6 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
            <div className="flex flex-col justify-center">
              <div className="mb-4 inline-flex w-fit rounded-full border border-[#cfd9ea] bg-white/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-[#0e2f66] shadow-sm">
                Trusted Transportation Support
              </div>
              <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-[#102a56] sm:text-5xl lg:text-6xl">
                Reliable transportation for foster youth. Built on care, consistency, and trust.
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-7 text-slate-600">
                Hebi ensures children in foster care make it to school, family visits, and essential appointments safely,
                reliably, and on time.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#contact" className="rounded-2xl bg-[#0e2f66] px-6 py-3 text-sm font-medium text-white shadow-[0_12px_30px_rgba(14,47,102,0.18)] transition hover:-translate-y-0.5 hover:bg-[#123b7b]">
                  Partner With Us
                </a>
                <a href="#work" className="rounded-2xl border border-[#d5deeb] bg-white/80 px-6 py-3 text-sm font-medium text-[#102a56] transition hover:bg-[#eef4fb]">
                  Join Our Team
                </a>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-3xl border border-[#dbe3ef] bg-white/92 p-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)] sm:col-span-2">
                <div className="text-sm uppercase tracking-[0.18em] text-slate-500">What We Do</div>
                <p className="mt-3 text-base leading-7 text-slate-700">
                  We provide transportation to youth in foster care that is reliable, safe, and structured. We assist agencies and care teams by removing barriers to education, family connection, healthcare, and legal obligations. We also work directly with families privately in addition to agency partnerships.
                </p>
              </div>
              <div className="rounded-3xl border border-[#dbe3ef] bg-white/92 p-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
                <div className="text-3xl font-semibold text-[#0e2f66]">4</div>
                <div className="mt-2 text-sm uppercase tracking-[0.18em] text-slate-500">Core Service Areas</div>
              </div>
              <div className="rounded-3xl border border-[#dbe3ef] bg-white/92 p-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
                <div className="text-3xl font-semibold text-[#0e2f66]">2014</div>
                <div className="mt-2 text-sm uppercase tracking-[0.18em] text-slate-500">Serving Madison County DHR Since</div>
              </div>
              <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:col-span-2">
                <div className="text-sm uppercase tracking-[0.18em] text-slate-500">Who We Partner With</div>
                <div className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
                  <div>Department of Human Resources</div>
                  <div>Child Welfare Agencies</div>
                  <div>Institutional Partners</div>
                  <div>Medical Providers</div>
                  <div>Families Seeking Private Transportation Support</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="text-sm uppercase tracking-[0.18em] text-slate-500">About Hebi</div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#102a56] sm:text-4xl">
                Transportation that supports stability, dignity, and trust.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                Hebi Lifestyle Foster Care Services was created to address a critical gap in the foster care system:
                dependable transportation. Behind every missed appointment or delayed visit is a larger impact on a child’s
                routine, support system, and overall stability.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                Hebi exists to help protect those moments through reliability, professionalism, and care. Hebi has proudly provided transportation services for Madison County DHR since 2014 and is currently expanding into additional counties throughout Alabama. We believe transportation is more than movement. It is access to education, family, health, and continuity.
              </p>
            </div>

            <div className="rounded-3xl border border-[#dbe3ef] bg-white/95 p-8 shadow-[0_14px_35px_rgba(15,23,42,0.07)]">
              <div className="text-sm uppercase tracking-[0.18em] text-slate-500">Mission</div>
              <p className="mt-3 text-lg leading-7 text-slate-800">
                To provide safe, reliable transportation that supports the well-being, stability, and success of youth in foster care.
              </p>
              <div className="mt-8 text-sm uppercase tracking-[0.18em] text-slate-500">Why It Matters</div>
              <p className="mt-3 text-base leading-7 text-slate-600">
                When transportation is dependable, youth are better able to stay connected to school, family visits, healthcare, and required case commitments.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900">{value.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="services" className="border-y border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)]">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="max-w-2xl">
              <div className="text-sm uppercase tracking-[0.18em] text-slate-500">Services</div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#102a56] sm:text-4xl">
                Clear, structured transportation services designed for foster care support.
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Our services are designed to meet the needs of agencies, caseworkers, families, and support systems with dependable execution and professional coordination.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {services.map((service) => (
                <div key={service.title} className="rounded-3xl border border-[#dbe3ef] bg-white/95 p-8 shadow-[0_14px_35px_rgba(15,23,42,0.06)]">
                  <h3 className="text-2xl font-semibold text-slate-900">{service.title}</h3>
                  <p className="mt-4 text-base leading-7 text-slate-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-[#dbe3ef] bg-white/95 p-8 shadow-[0_14px_35px_rgba(15,23,42,0.07)]">
              <div className="text-sm uppercase tracking-[0.18em] text-slate-500">For Drivers</div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Do purpose-driven work with Hebi.</h2>
              <p className="mt-5 text-base leading-7 text-slate-600">
                As a Hebi driver, every ride contributes to stability, care, and consistency for youth in foster care.
              </p>
              <div className="mt-4 space-y-3 text-sm text-slate-700">
                <div>• Flexible opportunities</div>
                <div>• Structured scheduling</div>
                <div>• Clear expectations and support</div>
                <div>• Meaningful work that directly impacts families</div>
              </div>
              <a href="#contact" className="mt-8 inline-flex rounded-2xl bg-[#0e2f66] px-5 py-3 text-sm font-medium text-white shadow-[0_12px_30px_rgba(14,47,102,0.16)] transition hover:-translate-y-0.5 hover:bg-[#123b7b]">
                Apply to Join Our Team
              </a>
            </div>

            <div className="rounded-3xl border border-[#dbe3ef] bg-[linear-gradient(180deg,#f8fbff_0%,#eef4fb_100%)] p-8 shadow-[0_14px_35px_rgba(15,23,42,0.07)]">
              <div className="text-sm uppercase tracking-[0.18em] text-slate-500">For Students & Partners</div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                Fellowship, scholarship, and partnership opportunities.
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-600">
                Hebi is committed to supporting future leaders, students, and institutions that want to contribute to meaningful community impact.
              </p>
              <div className="mt-4 space-y-3 text-sm text-slate-700">
                <div>• Fellowship opportunities</div>
                <div>• Scholarship initiatives</div>
                <div>• Institutional partnerships</div>
                <div>• Community engagement opportunities</div>
              </div>
              <a href="#contact" className="mt-8 inline-flex rounded-2xl border border-[#d5deeb] bg-white px-5 py-3 text-sm font-medium text-[#102a56] transition hover:bg-[#eef4fb]">
                Express Interest
              </a>
            </div>
          </div>
        </section>

        <section id="impact" className="border-y border-slate-200 bg-[linear-gradient(135deg,#0b2348_0%,#123e7b_58%,#b48a52_150%)] text-white">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <div className="text-sm uppercase tracking-[0.18em] text-slate-300">Community & Impact</div>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  More than transportation. Part of a broader support system.
                </h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
                  Hebi is committed to strengthening the ecosystem around foster youth through partnerships, scholarship programs, student fellowships, and long-term community initiatives.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {impact.map((item) => (
                  <div key={item} className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-sm">
                    <div className="text-lg font-medium">{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <div className="text-sm uppercase tracking-[0.18em] text-slate-500">Contact</div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#102a56] sm:text-4xl">
                Let’s connect.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
                Whether you are an agency, applicant, student, family, or community partner, we would love to learn how Hebi can support your needs.
              </p>
              <div className="mt-8 space-y-4 text-sm text-slate-700">
                <div><span className="font-semibold text-slate-900">Email:</span> info@hebilifestyle.com</div>
                <div><span className="font-semibold text-slate-900">Phone:</span> (000) 000-0000</div>
              </div>
            </div>

            <form className="rounded-3xl border border-[#dbe3ef] bg-white/95 p-8 shadow-[0_14px_35px_rgba(15,23,42,0.07)]">
              <div className="grid gap-4">
                <input className="rounded-2xl border border-[#d6dfeb] bg-[#fcfdff] px-4 py-3 outline-none" placeholder="Name" />
                <input className="rounded-2xl border border-[#d6dfeb] bg-[#fcfdff] px-4 py-3 outline-none" placeholder="Organization (if applicable)" />
                <input className="rounded-2xl border border-[#d6dfeb] bg-[#fcfdff] px-4 py-3 outline-none" placeholder="Email" />
                <input className="rounded-2xl border border-[#d6dfeb] bg-[#fcfdff] px-4 py-3 outline-none" placeholder="Phone" />
                <select className="rounded-2xl border border-[#d6dfeb] bg-[#fcfdff] px-4 py-3 outline-none">
                  <option>Inquiry Type</option>
                  <option>Agency</option>
                  <option>Driver</option>
                  <option>Student</option>
                  <option>Private Family</option>
                  <option>General</option>
                </select>
                <textarea className="min-h-[140px] rounded-2xl border border-[#d6dfeb] bg-[#fcfdff] px-4 py-3 outline-none" placeholder="Tell us how we can support you" />
                <button type="button" className="rounded-2xl bg-[#0e2f66] px-6 py-3 text-sm font-medium text-white shadow-[0_12px_30px_rgba(14,47,102,0.16)] transition hover:-translate-y-0.5 hover:bg-[#123b7b]">
                  Send Inquiry
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-500 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <img src="/hebi-logo.png" alt="Hebi Lifestyle Foster Care Services" className="h-12 w-auto" />
          <div>Reliable transportation. Care-centered support. Trust-driven partnership.</div>
        </div>
      </footer>
    </div>
  );
}
