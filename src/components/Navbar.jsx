export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-1 lg:px-8">
        <a href="#top" aria-label="Hebi Lifestyle home">
          <img
            src="/hebi-logo.png"
            alt="Hebi Lifestyle"
            className="h-24 w-auto sm:h-28"
          />
        </a>

        <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
          <a href="#about" className="transition hover:text-[#123b7b]">
            About
          </a>

          <a href="#services" className="transition hover:text-[#123b7b]">
            Services
          </a>

          <a href="#serve" className="transition hover:text-[#123b7b]">
            Who We Serve
          </a>

          <a href="#work" className="transition hover:text-[#123b7b]">
            Work With Us
          </a>

          <a
            href="#contact"
            className="rounded-xl bg-[#0e2f66] px-5 py-2.5 text-white shadow-sm transition hover:bg-[#174c91]"
          >
            Request Transportation
          </a>
        </nav>

        <a
          href="#contact"
          className="rounded-xl bg-[#0e2f66] px-4 py-2 text-xs font-semibold text-white md:hidden"
        >
          Contact
        </a>
      </div>
    </header>
  )
}