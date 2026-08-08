export default function ThankYou() {
  return (
    <section className="min-h-screen bg-[#f7f8fb] px-6 py-20 flex items-center justify-center">
      <div className="w-full max-w-2xl rounded-[2rem] border border-emerald-200 bg-white p-10 text-center shadow-xl sm:p-14">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-700">
          ✓
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#174c91]">
          Inquiry Submitted
        </p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#102a56] sm:text-4xl">
          Thank you for contacting Hebi.
        </h1>

        <p className="mt-5 text-base leading-7 text-slate-600">
          Your inquiry has been submitted successfully. A member of our team
          will follow up with you regarding your transportation needs.
        </p>

        <a
          href="/"
          className="mt-8 inline-flex rounded-xl bg-[#102a56] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#174c91]"
        >
          Return to Home
        </a>
      </div>
    </section>
  )
}