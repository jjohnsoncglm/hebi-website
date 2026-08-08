export default function Contact() {

  return (
    <section id="contact" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl lg:grid-cols-[0.85fr_1.15fr]">

          {/* LEFT SIDE */}
          <div className="bg-[#102a56] p-8 text-white sm:p-10 lg:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
              Get Started
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Let’s get you where you need to go.
            </h2>

            <p className="mt-5 leading-8 text-blue-100">
              Whether you represent an agency, healthcare provider,
              organization, or family, Hebi is ready to discuss dependable
              transportation solutions built around the people you serve.
            </p>

            <div className="mt-10 space-y-6">
              <div>
                <p className="text-sm font-semibold text-white">
                  Agency & DHR Transportation
                </p>
                <p className="mt-1 text-sm leading-6 text-blue-200">
                  Transportation support for foster care, child welfare,
                  appointments, family connections, and other essential needs.
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  Medical & Community Transportation
                </p>
                <p className="mt-1 text-sm leading-6 text-blue-200">
                  Discuss transportation partnerships for healthcare,
                  community programs, and other organizations.
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  Private Family Services
                </p>
                <p className="mt-1 text-sm leading-6 text-blue-200">
                  Families may contact Hebi directly to discuss private
                  transportation needs and availability.
                </p>
              </div>
            </div>

            <div className="mt-10 rounded-2xl border border-white/15 bg-white/10 p-5">
              <p className="text-sm font-semibold">
                Need transportation outside our current service area?
              </p>

              <p className="mt-2 text-sm leading-6 text-blue-100">
                Contact us anyway. Hebi is actively expanding its service
                network throughout Alabama.
              </p>
            </div>
          </div>

          {/* FORM */}
          <div className="p-8 sm:p-10 lg:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#174c91]">
              Transportation Inquiry
            </p>

            <h3 className="mt-3 text-2xl font-semibold text-[#102a56]">
              Tell us how we can help.
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Submit a general transportation or partnership inquiry and a
              member of the Hebi team will follow up with you.
            </p>

              <form
                action="https://formsubmit.co/hebilifestyle@gmail.com"
                method="POST"
                className="mt-8 space-y-6"
              >
                <input
                type="hidden"
                name="_subject"
                value="New Hebi Lifestyle Transportation Inquiry"
              />

              <input
                type="hidden"
                name="_template"
                value="table"
              />

              <input
                type="hidden"
                name="_next"
                value="https://hebilifestyle.com/thank-you"
              />
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="text-sm font-semibold text-slate-700"
                    >
                      First Name
                    </label>

                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#174c91] focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Last Name
                    </label>

                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#174c91] focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="email"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#174c91] focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Phone Number
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#174c91] focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="organization"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Organization / Agency
                  </label>

                  <input
                    id="organization"
                    name="organization"
                    type="text"
                    placeholder="Optional for private families"
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#174c91] focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="inquiryType"
                    className="text-sm font-semibold text-slate-700"
                  >
                    How can we help?
                  </label>

                  <select
                    id="inquiryType"
                    name="inquiryType"
                    required
                    defaultValue=""
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-[#174c91] focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option>DHR / Child Welfare Transportation</option>
                    <option>Private Family Transportation</option>
                    <option>Medical Transportation</option>
                    <option>Agency / Organization Partnership</option>
                    <option>School / Educational Transportation</option>
                    <option>Employment Opportunity</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="county"
                    className="text-sm font-semibold text-slate-700"
                  >
                    County / Service Area
                  </label>

                  <input
                    id="county"
                    name="county"
                    type="text"
                    placeholder="Example: Madison County"
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#174c91] focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Tell us about your transportation needs
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                    placeholder="Please provide a general description of the service you are looking for."
                    className="mt-2 w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#174c91] focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* IMPORTANT PRIVACY NOTICE */}
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <p className="text-xs leading-6 text-amber-900">
                    <strong>Privacy Notice:</strong> Please do not include
                    confidential case information, medical information,
                    Social Security numbers, or other sensitive personal
                    information in this form. Hebi will collect any necessary
                    case-specific information through the appropriate process.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#102a56] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#174c91]"
                >
                  Submit Inquiry
                </button>

                <p className="text-center text-xs leading-5 text-slate-400">
                  Submission of this form does not guarantee transportation
                  availability or establish a service agreement.
                </p>
              </form>
          </div>
        </div>
      </div>
    </section>
  )
}