export default function Services() {
  const services = [
    {
      number: '01',
      title: 'Foster Care Transportation',
      description:
        'Safe, structured transportation for children and youth in foster care, coordinated with DHR, social workers, foster families, and care teams.',
      examples: [
        'Placement transportation',
        'Family & sibling visits',
        'School transportation',
        'Agency appointments',
      ],
    },
    {
      number: '02',
      title: 'Medical Transportation',
      description:
        'Dependable non-emergency transportation that helps clients access healthcare and essential services while reducing transportation barriers.',
      examples: [
        'Medical appointments',
        'Behavioral health visits',
        'Therapy appointments',
        'Follow-up care',
      ],
    },
    {
      number: '03',
      title: 'Family & Private Transportation',
      description:
        'Professional transportation support available directly to families and private clients who need a trusted transportation partner.',
      examples: [
        'Scheduled transportation',
        'Youth transportation',
        'Recurring transportation',
        'Individual family needs',
      ],
    },
    {
      number: '04',
      title: 'Agency Transportation Support',
      description:
        'Flexible transportation capacity for agencies, providers, and organizations that need dependable support for the people they serve.',
      examples: [
        'Recurring routes',
        'Overflow transportation',
        'Scheduled case support',
        'Organizational partnerships',
      ],
    },
  ]

  return (
    <section id="services" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              What We Do
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#102a56] sm:text-4xl">
              Transportation built around the needs of the people we serve.
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              We provide transportation that is reliable, safe, and structured.
              We assist agencies, care teams, providers, and families by
              removing transportation barriers to education, family connection,
              healthcare, and other essential obligations.
            </p>

            <a
              href="#contact"
              className="mt-8 inline-flex rounded-xl bg-[#0e2f66] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#174c91]"
            >
              Request Transportation
            </a>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {services.map((service) => (
              <article
                key={service.title}
                className="rounded-[1.75rem] border border-[#dce5ef] bg-[#f8fafc] p-7 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-slate-900/5"
              >
                <div className="text-sm font-semibold text-blue-600">
                  {service.number}
                </div>

                <h3 className="mt-4 text-xl font-semibold text-[#102a56]">
                  {service.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {service.description}
                </p>

                <div className="mt-6 border-t border-slate-200 pt-5">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                    Includes
                  </p>

                  <ul className="space-y-2">
                    {service.examples.map((example) => (
                      <li
                        key={example}
                        className="flex items-center gap-2 text-sm text-slate-600"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}