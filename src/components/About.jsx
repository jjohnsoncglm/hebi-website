export default function About() {
  const commitments = [
    'Safety-first service',
    'Reliable scheduling',
    'Professional communication',
    'Respect for every client',
  ]

  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            About Hebi
          </div>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#102a56] sm:text-4xl">
            Transportation that supports stability, dignity, and trust.
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Hebi Lifestyle Foster Care Services was created to address a
            critical gap in the foster care system: dependable transportation.
            Behind every missed appointment or delayed visit is a larger impact
            on a child’s routine, support system, and overall stability.
          </p>

          <p className="mt-4 leading-8 text-slate-600">
            Hebi has proudly provided transportation services for Madison County
            DHR since 2014 and is expanding into Walker County, Lee County, and
            Mobile, Alabama. We believe transportation is more than movement. It
            is access to education, family, health, and continuity.
          </p>
        </div>

        <div className="rounded-[2rem] border border-[#dbe3ef] bg-white p-8 shadow-xl shadow-slate-900/5">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Our Mission
          </div>

          <p className="mt-4 text-xl leading-8 text-slate-800">
            To provide safe, reliable transportation that supports the
            well-being, stability, and success of the people and communities we
            serve.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
            {commitments.map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-[#eef4fb] p-4 text-[#102a56]"
              >
                ✓ {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}