export default function AdminPortal() {
  const stats = [
    { label: 'Active Cases', value: '12', detail: 'Across current service areas' },
    { label: 'Available Cases', value: '4', detail: 'Waiting for driver claim' },
    { label: 'Drivers Working Today', value: '7', detail: 'Currently scheduled' },
    { label: 'Pending Documents', value: '3', detail: 'Need review' },
  ]

  const recentCases = [
    {
      id: 'HB-2026-1048',
      county: 'Madison County',
      service: 'School Transportation',
      driver: 'Assigned',
      status: 'Active',
    },
    {
      id: 'HB-2026-1051',
      county: 'Madison County',
      service: 'Family Visitation',
      driver: 'Unassigned',
      status: 'Available',
    },
    {
      id: 'HB-2026-1054',
      county: 'Morgan County',
      service: 'Medical Appointment',
      driver: 'Pending Approval',
      status: 'Claimed',
    },
  ]

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-800">
      <aside className="fixed left-0 top-0 hidden h-screen w-64 flex-col bg-[#102a56] px-5 py-7 text-white lg:flex">
        <a href="/" className="mb-8 block">
          <img
            src="/hebi-logo.png"
            alt="Hebi Lifestyle"
            className="h-20 w-auto brightness-0 invert"
          />
        </a>

        <p className="mb-4 px-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-200">
          Admin Portal
        </p>

        <nav className="space-y-2">
          <a
            href="#overview"
            className="block rounded-xl bg-white/15 px-4 py-3 text-sm font-semibold"
          >
            Overview
          </a>

          <a
            href="#cases"
            className="block rounded-xl px-4 py-3 text-sm text-blue-100 transition hover:bg-white/10"
          >
            Cases
          </a>

          <a
            href="#schedule"
            className="block rounded-xl px-4 py-3 text-sm text-blue-100 transition hover:bg-white/10"
          >
            Schedule
          </a>

          <a
            href="#drivers"
            className="block rounded-xl px-4 py-3 text-sm text-blue-100 transition hover:bg-white/10"
          >
            Drivers
          </a>

          <a
            href="#documents"
            className="block rounded-xl px-4 py-3 text-sm text-blue-100 transition hover:bg-white/10"
          >
            Documents
          </a>

          <a
            href="#billing"
            className="block rounded-xl px-4 py-3 text-sm text-blue-100 transition hover:bg-white/10"
          >
            Billing
          </a>

          <a
            href="#counties"
            className="block rounded-xl px-4 py-3 text-sm text-blue-100 transition hover:bg-white/10"
          >
            Counties
          </a>

          <a
            href="#reports"
            className="block rounded-xl px-4 py-3 text-sm text-blue-100 transition hover:bg-white/10"
          >
            Reports
          </a>
        </nav>

        <div className="mt-auto border-t border-white/10 pt-5">
          <p className="px-3 text-xs text-blue-200">Hebi Lifestyle</p>
          <p className="mt-1 px-3 text-sm font-semibold text-white">
            Operations Center
          </p>
        </div>
      </aside>

      <main className="lg:ml-64">
        <header className="border-b border-slate-200 bg-white px-6 py-5 sm:px-8 lg:px-10">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#174c91]">
                Hebi Lifestyle
              </p>
              <h1 className="mt-1 text-xl font-semibold text-[#102a56]">
                Admin Portal
              </h1>
            </div>

            <div className="text-right">
              <p className="text-sm font-semibold text-slate-700">Welcome back</p>
              <p className="text-xs text-slate-400">Owner / Administrator</p>
            </div>
          </div>
        </header>

        <div
          id="overview"
          className="mx-auto max-w-7xl space-y-8 px-6 py-8 sm:px-8 lg:px-10"
        >
          <section className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium text-[#174c91]">
                Operations Dashboard
              </p>

              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#102a56] sm:text-4xl">
                Hebi Operations Center
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                Manage active cases, driver coverage, schedules, documentation,
                and daily transportation operations from one place.
              </p>
            </div>

            <button
              type="button"
              className="rounded-xl bg-[#102a56] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#174c91]"
            >
              + Create New Case
            </button>
          </section>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                  {item.label}
                </p>

                <p className="mt-3 text-3xl font-bold text-[#102a56]">
                  {item.value}
                </p>

                <p className="mt-1 text-xs text-slate-400">{item.detail}</p>
              </div>
            ))}
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.6fr_0.8fr]">
            <div
              id="cases"
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                <div>
                  <h3 className="font-semibold text-[#102a56]">
                    Recent Cases
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Latest case activity across Hebi operations
                  </p>
                </div>

                <button className="text-sm font-semibold text-[#174c91]">
                  View all
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {recentCases.map((caseItem) => (
                  <div
                    key={caseItem.id}
                    className="grid gap-3 px-6 py-5 sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-center"
                  >
                    <div>
                      <p className="text-sm font-semibold text-[#102a56]">
                        {caseItem.id}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {caseItem.county}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-700">
                        {caseItem.service}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-slate-500">
                        {caseItem.driver}
                      </p>
                    </div>

                    <span
                      className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                        caseItem.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700'
                          : caseItem.status === 'Available'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {caseItem.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <section className="rounded-2xl bg-[#102a56] p-6 text-white shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
                  Daily Operations
                </p>

                <h3 className="mt-3 text-2xl font-semibold">
                  7 drivers working today
                </h3>

                <p className="mt-3 text-sm leading-6 text-blue-100">
                  Monitor active transportation, driver start times, case
                  coverage, and operational alerts.
                </p>

                <button
                  type="button"
                  className="mt-6 w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#102a56]"
                >
                  View Today&apos;s Schedule
                </button>
              </section>

              <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
                  Attention Needed
                </p>

                <h3 className="mt-3 text-lg font-semibold text-amber-900">
                  3 items need review
                </h3>

                <p className="mt-2 text-sm leading-6 text-amber-700">
                  Pending driver documents, case approvals, or incomplete
                  transportation records will appear here.
                </p>
              </section>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="font-semibold text-[#102a56]">
                  Phase 1 Operations Preview
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  This dashboard currently uses sample data. Case records,
                  drivers, schedules, permissions, and alerts will be connected
                  to the Hebi database during the next implementation steps.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}