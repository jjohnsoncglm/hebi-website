import { useState } from 'react'

const upcomingTrips = [
  {
    id: "HB-1048",
    date: "Aug 12",
    time: "9:30 AM",
    destination: "Medical Appointment",
    location: "Huntsville, AL",
    status: "Confirmed",
  },
  {
    id: "HB-1051",
    date: "Aug 15",
    time: "1:00 PM",
    destination: "Family Visitation",
    location: "Madison County",
    status: "Scheduled",
  },
]

const recentActivity = [
  {
    title: "Transportation completed",
    detail: "Court appearance transportation",
    date: "Aug 5",
  },
  {
    title: "Request confirmed",
    detail: "Medical appointment transportation",
    date: "Aug 3",
  },
  {
    title: "Transportation completed",
    detail: "Family visitation transportation",
    date: "Jul 29",
  },
]

export default function ClientPortal() {
  const [activeView, setActiveView] = useState('dashboard')

  if (activeView === 'request') {
    return (
      <div className="min-h-screen bg-[#f5f7fb] text-slate-800">
        <div className="mx-auto max-w-5xl px-6 py-10 sm:px-8 lg:px-10">
          <button
            type="button"
            onClick={() => setActiveView('dashboard')}
            className="mb-8 text-sm font-semibold text-[#174c91] transition hover:text-[#102a56]"
          >
            ← Back to Dashboard
          </button>

          <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#174c91]">
                 Client Portal
              </p>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#102a56] sm:text-4xl">
                 Request Transportation
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                 Submit the details for a new transportation request. The Hebi team will review your request before confirming service.
              </p>
           </div>

           <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="border-b border-slate-200 pb-5">
              <h2 className="text-xl font-semibold text-[#102a56]">
                 Trip Details
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                 Tell us when and why transportation is needed.
              </p>
            </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Transportation Type
                    </label>
                    <select className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#174c91]">
                        <option>Select transportation type</option>
                        <option>Medical Appointment</option>
                        <option>Family Visitation</option>
                        <option>Court Appearance</option>
                        <option>School / Education</option>
                        <option>Other</option>
                    </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                     Trip Date
                  </label>
                  <input
                    type="date"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#174c91]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                     Pickup Time
                  </label>
                  <input
                    type="time"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#174c91]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                     Return Trip?
                  </label>
                  <select className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#174c91]">
                     <option>Select an option</option>
                     <option>Yes</option>
                     <option>No</option>
                  </select>
                </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="border-b border-slate-200 pb-5">
              <h2 className="text-xl font-semibold text-[#102a56]">
                  Pickup & Destination
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                  Tell us where transportation should begin and where the rider is going.
              </p>
            </div>

            <div className="mt-6 grid gap-8 lg:grid-cols-2">
              <div>
                <h3 className="text-base font-semibold text-[#102a56]">
                    Pickup Information
                </h3>

                <div className="mt-4 space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Pickup Address
                    </label>
                    <input
                      type="text"
                      placeholder="Street address"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#174c91]"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        City
                      </label>
                      <input
                        type="text"
                        placeholder="City"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#174c91]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        State
                      </label>
                      <input
                        type="text"
                        defaultValue="AL"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#174c91]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        placeholder="35801"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#174c91]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-[#102a56]">
                  Destination Information
                </h3>

                <div className="mt-4 space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Destination / Facility Name
                    </label>
                    <input
                      type="text"
                      placeholder="Hospital, courthouse, school, residence, etc."
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#174c91]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Destination Address
                    </label>
                    <input
                      type="text"
                      placeholder="Street address"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#174c91]"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        City
                      </label>
                      <input
                        type="text"
                        placeholder="City"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#174c91]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        State
                      </label>
                      <input
                        type="text"
                        defaultValue="AL"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#174c91]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        placeholder="35801"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#174c91]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rider Information */}
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="border-b border-slate-200 pb-5">
              <h2 className="text-xl font-semibold text-[#102a56]">
                Rider Information
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Tell us who will be receiving transportation services.
              </p>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Rider First Name
                </label>
                <input
                  type="text"
                  placeholder="First name"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#174c91]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Rider Last Name
                </label>
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#174c91]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#174c91]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Case / Client ID
                  <span className="ml-1 font-normal text-slate-400">(optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Case or client ID"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#174c91]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Primary Contact Name
                </label>
                <input
                  type="text"
                  placeholder="Contact name"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#174c91]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Primary Contact Phone
                </label>
                <input
                  type="tel"
                  placeholder="(256) 555-0123"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#174c91]"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Special Transportation Needs
              </label>
              <textarea
                rows="4"
                placeholder="Wheelchair, car seat, mobility assistance, behavioral considerations, or other transportation needs."
                className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#174c91]"
              />
              <p className="mt-2 text-xs text-slate-400">
                Include any information the Hebi team should know to provide safe and appropriate transportation.
              </p>
            </div>
          </div>

                    {/* Trip Contact & Instructions */}
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="border-b border-slate-200 pb-5">
              <h2 className="text-xl font-semibold text-[#102a56]">
                Trip Contact & Instructions
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Provide the contact and timing details needed to coordinate the trip.
              </p>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Required Arrival / Appointment Time
                </label>
                <input
                  type="time"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#174c91]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Pickup Contact Name
                </label>
                <input
                  type="text"
                  placeholder="Pickup contact"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#174c91]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Pickup Contact Phone
                </label>
                <input
                  type="tel"
                  placeholder="(256) 555-0123"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#174c91]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Destination Contact Name
                </label>
                <input
                  type="text"
                  placeholder="Destination contact"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#174c91]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Destination Contact Phone
                </label>
                <input
                  type="tel"
                  placeholder="(256) 555-0123"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#174c91]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Authorized Release / Receiving Person
                  <span className="ml-1 font-normal text-slate-400">(optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Name of authorized person"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#174c91]"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Additional Trip Instructions
              </label>
              <textarea
                rows="4"
                placeholder="Check-in instructions, entrance or building details, gate codes, pickup notes, release instructions, or anything else the Hebi team should know."
                className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#174c91]"
              />
              <p className="mt-2 text-xs text-slate-400">
                Do not include unnecessary sensitive information. Only provide details needed to coordinate transportation safely.
              </p>
            </div>
          </div>

          {/* Review & Submit */}
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="border-b border-slate-200 pb-5">
              <h2 className="text-xl font-semibold text-[#102a56]">
                Review & Submit Request
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Review the transportation details above before submitting your request.
              </p>
            </div>

            <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-5">
              <p className="text-sm font-semibold text-[#102a56]">
                What happens after you submit?
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Your transportation request will be sent to the Hebi team for review.
                Submission does not automatically confirm transportation. You will be
                notified once the request has been reviewed and scheduled.
              </p>
            </div>

            <label className="mt-6 flex items-start gap-3">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-slate-300 text-[#102a56] focus:ring-[#174c91]"
              />

              <span className="text-sm leading-6 text-slate-600">
                I confirm that the information provided in this transportation request
                is accurate to the best of my knowledge and that I am authorized to
                submit this request.
              </span>
            </label>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-5 text-slate-400">
                Requests are subject to availability and confirmation by the Hebi team.
              </p>

              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl bg-[#102a56] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#174c91]"
              >
                Submit Transportation Request
              </button>
            </div>
          </div>

        </div>
       </div>
      )
  }  

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-800">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-screen w-64 flex-col bg-[#102a56] px-5 py-7 text-white lg:flex">
        <a href="/" className="mb-10 block">
          <img
            src="/hebi-logo.png"
            alt="Hebi Lifestyle"
            className="h-20 w-auto brightness-0 invert"
          />
        </a>

        <p className="mb-4 px-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-200">
          Client Portal
        </p>

        <nav className="space-y-2">
          <a
            href="#dashboard"
            className="block rounded-xl bg-white/15 px-4 py-3 text-sm font-semibold"
          >
            Dashboard
          </a>

          <a
            href="#request"
            onClick={() => setActiveView('request')}
            className="block rounded-xl px-4 py-3 text-sm text-blue-100 transition hover:bg-white/10"
          >
            Request Transportation
          </a>

          <a
            href="#trips"
            className="block rounded-xl px-4 py-3 text-sm text-blue-100 transition hover:bg-white/10"
          >
            My Trips
          </a>

          <a
            href="#history"
            className="block rounded-xl px-4 py-3 text-sm text-blue-100 transition hover:bg-white/10"
          >
            Trip History
          </a>

          <a
            href="#profile"
            className="block rounded-xl px-4 py-3 text-sm text-blue-100 transition hover:bg-white/10"
          >
            Account
          </a>
        </nav>

        <div className="mt-auto border-t border-white/10 pt-5">
          <p className="px-3 text-xs text-blue-200">Need assistance?</p>
          <a
            href="/#contact"
            className="mt-2 block px-3 text-sm font-semibold text-white"
          >
            Contact Hebi
          </a>
        </div>
      </aside>

      {/* Main */}
      <main className="lg:ml-64">
        {/* Header */}
        <header className="border-b border-slate-200 bg-white px-6 py-5 sm:px-8 lg:px-10">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#174c91]">
                Hebi Lifestyle
              </p>
              <h1 className="mt-1 text-xl font-semibold text-[#102a56]">
                Client Portal
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-slate-700">
                  Welcome back
                </p>
                <p className="text-xs text-slate-400">Client Account</p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#102a56] text-sm font-bold text-white">
                C
              </div>
            </div>
          </div>
        </header>

        <div
          id="dashboard"
          className="mx-auto max-w-7xl space-y-8 px-6 py-8 sm:px-8 lg:px-10 lg:py-10"
        >
          {/* Welcome */}
          <section>
            <p className="text-sm font-medium text-[#174c91]">
              Transportation Dashboard
            </p>

            <div className="mt-2 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-[#102a56] sm:text-4xl">
                  Welcome to Hebi.
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                  Manage transportation requests, view upcoming trips, and stay
                  informed about your transportation services.
                </p>
              </div>

              <a
                href="#request"
                onClick={() => setActiveView('request')}
                className="inline-flex items-center justify-center rounded-xl bg-[#102a56] px-5 py-3 text-sm font-semibold text-white ..."
              >
                + Request Transportation
              </a>
            </div>
          </section>

          {/* Summary Cards */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <DashboardCard
              label="Upcoming Trips"
              value="2"
              detail="Next trip Aug 12"
            />

            <DashboardCard
              label="Completed Trips"
              value="18"
              detail="Transportation history"
            />

            <DashboardCard
              label="Pending Requests"
              value="1"
              detail="Awaiting confirmation"
            />

            <DashboardCard
              label="Service Status"
              value="Active"
              detail="Account in good standing"
              accent
            />
          </section>

          {/* Upcoming Trips + Request */}
          <section className="grid gap-6 xl:grid-cols-[1.5fr_0.8fr]">
            <div
              id="trips"
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                <div>
                  <h3 className="font-semibold text-[#102a56]">
                    Upcoming Transportation
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Your currently scheduled trips
                  </p>
                </div>

                <button className="text-sm font-semibold text-[#174c91]">
                  View all
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {upcomingTrips.map((trip) => (
                  <div
                    key={trip.id}
                    className="grid gap-4 px-6 py-5 sm:grid-cols-[90px_1fr_auto] sm:items-center"
                  >
                    <div>
                      <p className="text-lg font-bold text-[#102a56]">
                        {trip.date}
                      </p>
                      <p className="text-xs text-slate-400">{trip.time}</p>
                    </div>

                    <div>
                      <p className="font-semibold text-slate-700">
                        {trip.destination}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {trip.location} • {trip.id}
                      </p>
                    </div>

                    <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {trip.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div
              id="request"
              className="rounded-2xl bg-[#102a56] p-7 text-white shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-200">
                Quick Action
              </p>

              <h3 className="mt-3 text-2xl font-semibold">
                Need transportation?
              </h3>

              <p className="mt-3 text-sm leading-6 text-blue-100">
                Submit a new transportation request directly through your
                client portal.
              </p>

              <button
                onClick={() => setActiveView('request')}
                className="mt-7 w-full rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-[#102a56] transition hover:bg-blue-50"
              >
                Start New Request
              </button>

              <p className="mt-4 text-xs leading-5 text-blue-200">
                Requests are reviewed by the Hebi team before transportation is
                confirmed.
              </p>
            </div>
          </section>

          {/* Activity */}
          <section
            id="history"
            className="rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="border-b border-slate-100 px-6 py-5">
              <h3 className="font-semibold text-[#102a56]">Recent Activity</h3>
              <p className="mt-1 text-xs text-slate-400">
                Recent updates to your transportation account
              </p>
            </div>

            <div className="divide-y divide-slate-100">
              {recentActivity.map((item) => (
                <div
                  key={`${item.title}-${item.date}`}
                  className="flex items-start justify-between gap-4 px-6 py-5"
                >
                  <div className="flex gap-4">
                    <div className="mt-1 h-2.5 w-2.5 rounded-full bg-[#174c91]" />

                    <div>
                      <p className="text-sm font-semibold text-slate-700">
                        {item.title}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {item.detail}
                      </p>
                    </div>
                  </div>

                  <p className="whitespace-nowrap text-xs text-slate-400">
                    {item.date}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Privacy Notice */}
          <section className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5">
            <p className="text-sm font-semibold text-amber-900">
              Development Preview
            </p>

            <p className="mt-1 text-xs leading-5 text-amber-700">
              The information shown on this dashboard is sample data. Real
              client information will not be used until secure authentication,
              database permissions, and privacy controls are configured.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}

function DashboardCard({ label, value, detail, accent = false }) {
  return (
    <div
      className={`rounded-2xl border p-5 shadow-sm ${
        accent
          ? "border-blue-100 bg-[#edf4ff]"
          : "border-slate-200 bg-white"
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
        {label}
      </p>

      <p className="mt-3 text-2xl font-bold text-[#102a56]">{value}</p>

      <p className="mt-1 text-xs text-slate-400">{detail}</p>
    </div>
  )
}