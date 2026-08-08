export default function WhoWeServe() {
  const audiences = [
    {
      title: 'Departments of Human Resources',
      description:
        'Reliable transportation support for children and youth involved in foster care and child welfare services.',
      icon: '01',
    },
    {
      title: 'Child Welfare Agencies',
      description:
        'Transportation coordination that helps agencies and care teams keep essential appointments, visits, and services on schedule.',
      icon: '02',
    },
    {
      title: 'Institutional Partners',
      description:
        'Dependable transportation support for organizations serving children, families, and vulnerable populations.',
      icon: '03',
    },
    {
      title: 'Medical Providers',
      description:
        'Transportation assistance that helps clients access medical appointments, behavioral health services, and other essential care.',
      icon: '04',
    },
    {
      title: 'Families & Private Clients',
      description:
        'Direct transportation services for families who need safe, structured, and dependable support outside of agency referrals.',
      icon: '05',
    },
  ]

  return (
    <section id="who-we-serve" className="bg-[#f5f8fc] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Who We Serve
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#102a56] sm:text-4xl">
            Supporting the people and organizations responsible for care.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Hebi works with agencies, providers, organizations, and families
            that need reliable transportation to keep people connected to
            essential services and support.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {audiences.map((audience) => (
            <article
              key={audience.title}
              className="group rounded-[1.75rem] border border-[#dce5ef] bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#102a56] text-xs font-semibold text-white">
                {audience.icon}
              </div>

              <h3 className="mt-6 text-xl font-semibold text-[#102a56]">
                {audience.title}
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                {audience.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-[1.75rem] bg-[#102a56] px-7 py-8 text-white md:flex md:items-center md:justify-between md:px-10">
          <div className="max-w-2xl">
            <h3 className="text-xl font-semibold">
              Need dependable transportation support?
            </h3>

            <p className="mt-2 text-sm leading-6 text-blue-100">
              Tell us about your transportation needs and our team will follow
              up to discuss how Hebi can support your organization or family.
            </p>
          </div>

          <a
            href="#contact"
            className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#102a56] transition hover:bg-blue-50 md:mt-0"
          >
            Request Transportation
          </a>
        </div>
      </div>
    </section>
  )
}