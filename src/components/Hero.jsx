const heroImage =
  'https://images.pexels.com/photos/7551754/pexels-photo-7551754.jpeg?auto=compress&cs=tinysrgb&w=1600'

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-slate-200 bg-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(14,47,102,0.11),transparent_28%),radial-gradient(circle_at_90%_80%,rgba(198,165,105,0.14),transparent_30%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-24">
        <div className="flex flex-col justify-center">
          <div className="mb-5 inline-flex w-fit rounded-full border border-[#cfdaeb] bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#0e2f66] shadow-sm">
            Serving Alabama since 2014
          </div>

          <h1 className="max-w-2xl text-4xl font-semibold leading-[1.05] tracking-tight text-[#102a56] sm:text-5xl lg:text-6xl">
            Compassionate transportation. Trusted partnerships. Reliable service.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Hebi Lifestyle provides safe, dependable transportation for foster
            care, medical appointments, family visitation, court appearances,
            and community services across Alabama.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="rounded-2xl bg-[#0e2f66] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-950/15 transition hover:-translate-y-0.5 hover:bg-[#174c91]"
            >
              Request Transportation
            </a>

            <a
              href="#work"
              className="rounded-2xl border border-[#cfdaeb] bg-white px-6 py-3.5 text-sm font-semibold text-[#102a56] transition hover:bg-[#eef4fb]"
            >
              Become a Partner
            </a>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-slate-200 pt-6 text-sm">
            <div>
              <div className="text-2xl font-semibold text-[#0e2f66]">2014</div>
              <div className="mt-1 text-slate-500">
                Serving Madison County DHR
              </div>
            </div>

            <div>
              <div className="text-2xl font-semibold text-[#0e2f66]">4</div>
              <div className="mt-1 text-slate-500">Core service areas</div>
            </div>

            <div>
              <div className="text-2xl font-semibold text-[#0e2f66]">5</div>
              <div className="mt-1 text-slate-500">Partner categories</div>
            </div>
          </div>
        </div>

        <div className="relative min-h-[480px] overflow-hidden rounded-[2rem] shadow-2xl shadow-slate-900/15">
          <img
            src={heroImage}
            alt="Professional caregiver offering safe transportation support"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0b2348]/85 via-[#0b2348]/10 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-7 text-white sm:p-9">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
              Safety. Dignity. Consistency.
            </div>

            <p className="mt-3 max-w-lg text-xl font-medium leading-8">
              Every ride represents access to education, healthcare, family
              connection, and stability.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}