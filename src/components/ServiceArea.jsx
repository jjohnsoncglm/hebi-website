export default function ServiceArea() {
  const locations = [
    {
      county: 'Madison County',
      city: 'Huntsville, Alabama',
      status: 'Established Service Area',
      active: true,
      description:
        'Hebi has provided transportation services for Madison County DHR since 2014.',
    },
    {
      county: 'Walker County',
      city: 'Alabama',
      status: 'Expanding',
      active: false,
      description:
        'Part of Hebi’s growing service network as we expand transportation support across Alabama.',
    },
    {
      county: 'Lee County',
      city: 'Alabama',
      status: 'Expanding',
      active: false,
      description:
        'Expanding our ability to support agencies, families, providers, and community partners.',
    },
    {
      county: 'Mobile County',
      city: 'Mobile, Alabama',
      status: 'Expanding',
      active: false,
      description:
        'Building new partnerships to extend dependable transportation services into South Alabama.',
    },
  ]

  return (
    <section id="service-area" className="bg-[#f5f8fc] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Service Area
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#102a56] sm:text-4xl">
              Alabama roots. A growing reach.
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              Hebi began serving communities in North Alabama and is
              strategically expanding its transportation network to support
              more agencies, providers, families, and individuals.
            </p>

            <div className="mt-8 rounded-[1.75rem] bg-[#102a56] p-7 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-200">
                Need service somewhere else?
              </p>

              <h3 className="mt-3 text-xl font-semibold">
                Talk with us about your transportation needs.
              </h3>

              <p className="mt-3 text-sm leading-7 text-blue-100">
                Service availability may vary by location and transportation
                need. Contact our team to discuss current coverage and
                partnership opportunities.
              </p>

              <a
                href="#contact"
                className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#102a56] transition hover:bg-blue-50"
              >
                Contact Hebi
              </a>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {locations.map((location) => (
              <article
                key={location.county}
                className="rounded-[1.75rem] border border-[#dce5ef] bg-white p-7 shadow-sm"
              >
                <div className="flex items-center justify-between gap-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      location.active
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-blue-50 text-blue-700'
                    }`}
                  >
                    {location.status}
                  </span>

                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      location.active ? 'bg-emerald-500' : 'bg-blue-500'
                    }`}
                  />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-[#102a56]">
                  {location.county}
                </h3>

                <p className="mt-1 text-sm font-medium text-slate-400">
                  {location.city}
                </p>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {location.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-8">
          <p className="text-center text-sm text-slate-500">
            Serving Alabama with plans for continued regional expansion.
          </p>
        </div>
      </div>
    </section>
  )
}