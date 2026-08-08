export default function WhyHebi() {
  const reasons = [
    {
      number: '01',
      title: 'Safety Comes First',
      description:
        'Every trip is approached with care, professionalism, and a commitment to creating a safe transportation experience.',
    },
    {
      number: '02',
      title: 'Reliability Matters',
      description:
        'Our partners depend on us to show up. We prioritize punctuality, communication, and dependable service from pickup through drop-off.',
    },
    {
      number: '03',
      title: 'Built Around People',
      description:
        'We understand that every client, family, and case is different. Our approach is structured while remaining responsive to individual needs.',
    },
    {
      number: '04',
      title: 'Experienced Since 2014',
      description:
        'Our experience working with Madison County DHR has given us an understanding of the responsibility, trust, and consistency this work requires.',
    },
    {
      number: '05',
      title: 'Professional Communication',
      description:
        'Clear communication with agencies, care teams, families, and transportation partners helps everyone stay informed throughout the process.',
    },
    {
      number: '06',
      title: 'Growing With Our Communities',
      description:
        'As Hebi expands into additional counties and services, our focus remains the same: dependable support that helps people access what they need.',
    },
  ]

  return (
    <section id="why-hebi" className="bg-[#102a56] py-20 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
              Why Hebi
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              More than a ride. A responsibility.
            </h2>

            <p className="mt-5 max-w-xl leading-8 text-blue-100">
              Transportation can determine whether someone makes it to school,
              receives medical care, maintains a family connection, or accesses
              an essential service. We take that responsibility seriously.
            </p>

            <div className="mt-8 rounded-[1.75rem] border border-white/15 bg-white/10 p-6">
              <p className="text-4xl font-semibold">2014</p>
              <p className="mt-2 text-sm leading-6 text-blue-100">
                Providing transportation services for Madison County DHR and
                building trusted relationships within the communities we serve.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {reasons.map((reason) => (
              <article
                key={reason.title}
                className="rounded-[1.5rem] border border-white/15 bg-white/[0.07] p-6 transition duration-300 hover:bg-white/[0.12]"
              >
                <div className="text-xs font-semibold tracking-[0.15em] text-blue-300">
                  {reason.number}
                </div>

                <h3 className="mt-4 text-lg font-semibold">
                  {reason.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-blue-100">
                  {reason.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}