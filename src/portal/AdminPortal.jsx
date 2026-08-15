import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

export default function AdminPortal() {
  const [session, setSession] = useState(null)
  const [authChecking, setAuthChecking] = useState(true)
  const [authLoading, setAuthLoading] = useState(false)
  const [signOutLoading, setSignOutLoading] = useState(false)
  const [authError, setAuthError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  

  useEffect(() => {
    let isMounted = true

    async function loadSession() {
      const { data, error } = await supabase.auth.getSession()

      if (!isMounted) return

      if (error) {
        setAuthError('Unable to verify the current session. Please try again.')
      }

      setSession(data.session)
      setAuthChecking(false)
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!isMounted) return

      setSession(nextSession)
      setAuthChecking(false)

      if (nextSession) {
        setAuthError('')
      }
    })

    loadSession()

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  async function handleSignIn(event) {
    event.preventDefault()
    setAuthLoading(true)
    setAuthError('')

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    if (error) {
      setAuthError('Incorrect email or password. Please try again.')
    } else {
      setPassword('')
    }

    setAuthLoading(false)
  }

  async function handleSignOut() {
    setSignOutLoading(true)
    setAuthError('')

    const { error } = await supabase.auth.signOut()

    if (error) {
      setAuthError('Unable to sign out. Please try again.')
      setSignOutLoading(false)
      return
    }

    setEmail('')
    setPassword('')
    setSignOutLoading(false)
  }

  const [activeView, setActiveView] = useState('overview')
  const [selectedCase, setSelectedCase] = useState(null)
  const [updateStatusOpen, setUpdateStatusOpen] = useState(false)
  const [newStatus, setNewStatus] = useState('')
  const [assignDriverOpen, setAssignDriverOpen] = useState(false)
  const [selectedDriver, setSelectedDriver] = useState('')
  const [reviewOpen, setReviewOpen] = useState(false)
  const [reviewDecision, setReviewDecision] = useState('')
  const [reviewNotes, setReviewNotes] = useState('')
  const [internalNoteOpen, setInternalNoteOpen] = useState(false)
  const [internalNote, setInternalNote] = useState('')
  const [caseNotes, setCaseNotes] = useState([])

  const [databaseCases, setDatabaseCases] = useState([])
  const [casesLoading, setCasesLoading] = useState(true)
  const [availableDrivers, setAvailableDrivers] = useState([])
  const [driversLoading, setDriversLoading] = useState(true)
  const [caseSearchTerm, setCaseSearchTerm] = useState('')
  const [caseStatusFilter, setCaseStatusFilter] = useState('')

  const [createCaseOpen, setCreateCaseOpen] = useState(false)
  const [createCaseLoading, setCreateCaseLoading] = useState(false)
  const [createCaseError, setCreateCaseError] = useState('')
  const [createCaseSuccess, setCreateCaseSuccess] = useState('')
  const [riderFirstName, setRiderFirstName] = useState('')
  const [riderLastName, setRiderLastName] = useState('')
  const [riderPhone, setRiderPhone] = useState('')
  const [riderEmail, setRiderEmail] = useState('')
  const [newCaseServiceType, setNewCaseServiceType] = useState('')
  const [newCaseCounty, setNewCaseCounty] = useState('')
  const [referralSource, setReferralSource] = useState('')
  const [referringAgency, setReferringAgency] = useState('')
  const [caseWorkerName, setCaseWorkerName] = useState('')
  const [caseWorkerEmail, setCaseWorkerEmail] = useState('')
  const [caseWorkerPhone, setCaseWorkerPhone] = useState('')

  useEffect(() => {
    async function loadDrivers() {
      setDriversLoading(true)

      const { data, error } = await supabase
        .from('drivers')
        .select('*')
        .eq('status', 'Active')
        .order('first_name', { ascending: true })

      if (error) {
        console.error('Error loading drivers:', error)
        setDriversLoading(false)
        return
      }

      const formattedDrivers = (data || []).map((driver) => ({
        id: driver.id,
        name: `${driver.first_name || ''} ${driver.last_name || ''}`.trim(),
        county: driver.county || '',
        status: driver.status || '',
        vehicle: driver.vehicle || '',
        phone: driver.phone || '',
        email: driver.email || '',
      }))

      setAvailableDrivers(formattedDrivers)
      setDriversLoading(false)
    }

    loadDrivers()
  }, [session])

  async function loadCases() {
    setCasesLoading(true)

    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error loading cases:', error)
      setCasesLoading(false)
      return
    }

    setDatabaseCases(data || [])
    setCasesLoading(false)
  }

  useEffect(() => {
    if (session) {
      loadCases()
    }
  }, [session])

  async function generateCaseNumber() {
    const year = new Date().getFullYear()
    const prefix = `HB-${year}-`

    const { data, error } = await supabase
      .from('cases')
      .select('case_number')
      .ilike('case_number', `${prefix}%`)
      .order('case_number', { ascending: false })
      .limit(1)

    let nextSequence = 1

    if (!error && data && data.length > 0) {
      const match = data[0].case_number?.match(/(\d+)$/)
      if (match) {
        nextSequence = parseInt(match[1], 10) + 1
      }
    }

    return `${prefix}${String(nextSequence).padStart(4, '0')}`
  }

  function resetCreateCaseForm() {
    setRiderFirstName('')
    setRiderLastName('')
    setRiderPhone('')
    setRiderEmail('')
    setNewCaseServiceType('')
    setNewCaseCounty('')
    setReferralSource('')
    setReferringAgency('')
    setCaseWorkerName('')
    setCaseWorkerEmail('')
    setCaseWorkerPhone('')
    setCreateCaseError('')
    setCreateCaseSuccess('')
  }

  async function handleCreateCase(event) {
    event.preventDefault()

    if (!riderFirstName.trim() || !riderLastName.trim() || !newCaseServiceType.trim() || !newCaseCounty.trim()) {
      setCreateCaseError('Please fill in the required rider, service, and county fields.')
      return
    }

    setCreateCaseLoading(true)
    setCreateCaseError('')
    setCreateCaseSuccess('')

    const { data: riderData, error: riderError } = await supabase
      .from('riders')
      .insert({
        first_name: riderFirstName.trim(),
        last_name: riderLastName.trim(),
        primary_contact_phone: riderPhone.trim() || null,
        primary_contact_email: riderEmail.trim() || null,
      })
      .select()
      .single()

    if (riderError) {
      console.error('Error creating rider:', {
        message: riderError.message,
        code: riderError.code,
        details: riderError.details,
        hint: riderError.hint,
        raw: riderError,
      })

      const errorParts = [
        riderError.message,
        riderError.code ? `code: ${riderError.code}` : null,
        riderError.details ? `details: ${riderError.details}` : null,
        riderError.hint ? `hint: ${riderError.hint}` : null,
      ].filter(Boolean)

      setCreateCaseError(
        `Rider insert failed — ${errorParts.join(' | ') || 'unknown Supabase error'}`
      )
      setCreateCaseLoading(false)
      return
    }

    const caseNumber = await generateCaseNumber()

    const { error: caseError } = await supabase.from('cases').insert({
      case_number: caseNumber,
      rider_id: riderData.id,
      service_type: newCaseServiceType.trim(),
      county: newCaseCounty.trim(),
      status: 'New Request',
      referral_source: referralSource.trim() || null,
      referring_agency: referringAgency.trim() || null,
      case_worker_name: caseWorkerName.trim() || null,
      case_worker_email: caseWorkerEmail.trim() || null,
      case_worker_phone: caseWorkerPhone.trim() || null,
    })

    if (caseError) {
      console.error('Error creating case:', caseError)
      setCreateCaseError('Unable to create the case. Please try again.')
      setCreateCaseLoading(false)
      return
    }

    await loadCases()

    setCreateCaseLoading(false)
    resetCreateCaseForm()
    setCreateCaseSuccess(`Case ${caseNumber} was created successfully.`)
  }

  const stats = [
    { label: 'Active Cases', value: '12', detail: 'Across current service areas' },
    { label: 'Available Cases', value: '4', detail: 'Waiting for driver claim' },
    { label: 'Drivers Working Today', value: '7', detail: 'Currently scheduled' },
    { label: 'Pending Documents', value: '3', detail: 'Need review' },
  ]

  const newRequestsCount = databaseCases.filter(
    (caseItem) => caseItem.status === 'Pending Review'
  ).length
  const availableCasesCount = databaseCases.filter(
    (caseItem) => caseItem.status === 'Available'
  ).length
  const assignedCasesCount = databaseCases.filter(
    (caseItem) => caseItem.status === 'Assigned' || caseItem.status === 'Active'
  ).length
  const completedCasesCount = databaseCases.filter(
    (caseItem) => caseItem.status === 'Completed'
  ).length

  const filteredCases = databaseCases.filter((caseItem) => {
    const term = caseSearchTerm.trim().toLowerCase()

    const matchesSearch =
      !term ||
      [caseItem.case_number, caseItem.county, caseItem.service_type, caseItem.status]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(term))

    const matchesStatus = !caseStatusFilter || caseItem.status === caseStatusFilter

    return matchesSearch && matchesStatus
  })

  const createCaseModal = createCaseOpen && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5 sm:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#174c91]">
              Case Intake
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-[#102a56]">
              Create New Case
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Enter rider and referral details to open a new transportation case.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setCreateCaseOpen(false)}
            className="rounded-lg px-3 py-2 text-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleCreateCase}>
          <div className="space-y-6 px-6 py-6 sm:px-8">
            <section>
              <h3 className="font-semibold text-[#102a56]">Rider Information</h3>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-slate-700">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={riderFirstName}
                    onChange={(event) => setRiderFirstName(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-[#174c91]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={riderLastName}
                    onChange={(event) => setRiderLastName(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-[#174c91]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={riderPhone}
                    onChange={(event) => setRiderPhone(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-[#174c91]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={riderEmail}
                    onChange={(event) => setRiderEmail(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-[#174c91]"
                  />
                </div>
              </div>
            </section>

            <section>
              <h3 className="font-semibold text-[#102a56]">Case Details</h3>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-slate-700">
                    Service Type *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Non-Emergency Medical Transport"
                    value={newCaseServiceType}
                    onChange={(event) => setNewCaseServiceType(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-[#174c91]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700">
                    County *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCaseCounty}
                    onChange={(event) => setNewCaseCounty(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-[#174c91]"
                  />
                </div>
              </div>
            </section>

            <section>
              <h3 className="font-semibold text-[#102a56]">Referral Information</h3>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-slate-700">
                    Referral Source
                  </label>
                  <input
                    type="text"
                    value={referralSource}
                    onChange={(event) => setReferralSource(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-[#174c91]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700">
                    Referring Agency
                  </label>
                  <input
                    type="text"
                    value={referringAgency}
                    onChange={(event) => setReferringAgency(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-[#174c91]"
                  />
                </div>
              </div>
            </section>

            <section>
              <h3 className="font-semibold text-[#102a56]">Case Worker</h3>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-slate-700">
                    Name
                  </label>
                  <input
                    type="text"
                    value={caseWorkerName}
                    onChange={(event) => setCaseWorkerName(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-[#174c91]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={caseWorkerPhone}
                    onChange={(event) => setCaseWorkerPhone(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-[#174c91]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={caseWorkerEmail}
                    onChange={(event) => setCaseWorkerEmail(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-[#174c91]"
                  />
                </div>
              </div>
            </section>

            <div aria-live="polite" className="min-h-6">
              {createCaseError && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                  {createCaseError}
                </p>
              )}

              {createCaseSuccess && (
                <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {createCaseSuccess}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-6 py-5 sm:flex-row sm:justify-end sm:px-8">
            <button
              type="button"
              onClick={() => setCreateCaseOpen(false)}
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={createCaseLoading}
              className="rounded-xl bg-[#102a56] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#174c91] disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {createCaseLoading ? 'Creating Case...' : 'Create Case'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )

  if (authChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#102a56] px-6 text-white">
        <div className="text-center">
          <img
            src="/hebi-logo.png"
            alt="Hebi Lifestyle"
            className="mx-auto h-24 w-auto brightness-0 invert"
          />
          <div className="mx-auto mt-8 h-8 w-8 animate-spin rounded-full border-2 border-blue-200 border-t-white" />
          <p className="mt-4 text-sm text-blue-100">Loading Admin Portal...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f7fb] px-5 py-10">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-[0.9fr_1.1fr]">
          <section className="flex flex-col justify-between bg-[#102a56] p-8 text-white sm:p-12">
            <img
              src="/hebi-logo.png"
              alt="Hebi Lifestyle"
              className="h-24 w-auto brightness-0 invert"
            />

            <div className="mt-16">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
                Hebi Lifestyle
              </p>
              <h2 className="mt-4 text-3xl font-semibold">
                Operations Management
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-6 text-blue-100">
                Secure administrative access for managing transportation
                operations.
              </p>
            </div>
          </section>

          <section className="p-8 sm:p-12 lg:p-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#174c91]">
              Secure Access
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-[#102a56]">
              Admin Portal
            </h1>
            <p className="mt-3 text-sm text-slate-500">
              Sign in to manage Hebi Lifestyle operations.
            </p>

            <form onSubmit={handleSignIn} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="admin-email"
                  className="block text-sm font-semibold text-slate-700"
                >
                  Email
                </label>
                <input
                  id="admin-email"
                  type="email"
                  autoComplete="email"
                  required
                  disabled={authLoading}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#174c91] focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
                />
              </div>

              <div>
                <label
                  htmlFor="admin-password"
                  className="block text-sm font-semibold text-slate-700"
                >
                  Password
                </label>
                <input
                  id="admin-password"
                  type="password"
                  autoComplete="current-password"
                  required
                  disabled={authLoading}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#174c91] focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
                />
              </div>

              <div aria-live="polite" className="min-h-6">
                {authError && (
                  <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                    {authError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full rounded-xl bg-[#102a56] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#174c91] disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {authLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
          </section>
        </div>
      </div>
    )
  }

  if (selectedCase) {
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
          <button
            type="button"
            onClick={() => {
              setSelectedCase(null)
              setActiveView('overview')
            }}
            className="block w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-blue-100 transition hover:bg-white/10"
          >
            Overview
          </button>

          <button
            type="button"
            onClick={() => setSelectedCase(null)}
            className="block w-full rounded-xl bg-white/15 px-4 py-3 text-left text-sm font-semibold text-white"
          >
            Cases
          </button>
        </nav>
      </aside>

      <main className="lg:ml-64">
        <header className="border-b border-slate-200 bg-white px-6 py-5 sm:px-8 lg:px-10">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#174c91]">
                Hebi Lifestyle
              </p>
              <h1 className="mt-1 text-xl font-semibold text-[#102a56]">
                Case Workspace
              </h1>
            </div>

            <button
              type="button"
              onClick={() => setSelectedCase(null)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-[#102a56]"
            >
              ← Back to Cases
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-7xl space-y-6 px-6 py-8 sm:px-8 lg:px-10">
          <section className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-sm font-medium text-[#174c91]">
                Case Record
              </p>

              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#102a56]">
                {selectedCase.id}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                {selectedCase.service} • {selectedCase.county}
              </p>
            </div>

            <span
              className={`w-fit rounded-full px-4 py-2 text-sm font-semibold ${
                selectedCase.status === 'Active'
                  ? 'bg-emerald-50 text-emerald-700'
                  : selectedCase.status === 'Available'
                  ? 'bg-blue-50 text-blue-700'
                  : 'bg-amber-50 text-amber-700'
              }`}
            >
              {selectedCase.status}
            </span>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-lg font-semibold text-[#102a56]">
                    Transportation Request
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Core case and trip information.
                  </p>
                </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                      Service Type
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-700">
                      {selectedCase.service}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                      County
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-700">
                      {selectedCase.county}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                      Driver Assignment
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-700">
                      {selectedCase.driver}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                      Case Status
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-700">
                      {selectedCase.status}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-lg font-semibold text-[#102a56]">
                    Rider Information
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Sample rider information for the case workspace.
                  </p>
                </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                      Rider
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-700">
                      Sample Rider
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                      Date of Birth
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-700">
                      Sample Data
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                      Primary Contact
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-700">
                      Sample Contact
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                      Special Needs
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-700">
                      None listed
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-lg font-semibold text-[#102a56]">
                    Trip Details
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Pickup, destination, timing, and coordination details.
                  </p>
                </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                      Pickup
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-700">
                      Sample pickup address
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                      Destination
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-700">
                      Sample destination
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                      Trip Date
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-700">
                      To be connected
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                      Pickup Time
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-700">
                      To be connected
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl bg-[#102a56] p-6 text-white shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
                  Case Actions
                </p>

                <h3 className="mt-3 text-xl font-semibold">
                  Manage this case
                </h3>

                <div className="mt-6 space-y-3">
                  <button
                    type="button"
                    onClick={() => {
                      setReviewDecision('')
                      setReviewNotes('')
                      setReviewOpen(true)
                    }}
                    className="w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#102a56] transition hover:bg-blue-50"
                  >
                    Review Request
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDriver('')
                      setAssignDriverOpen(true)
                    }}
                    className="w-full rounded-xl border border-white/20 px-4 py-3 text-sm font-semibold text-white"
                  >
                    Assign Driver
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setNewStatus(selectedCase.status)
                      setUpdateStatusOpen(true)
                    }}
                    className="w-full rounded-xl border border-white/20 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Update Status
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setInternalNote('')
                      setInternalNoteOpen(true)
                    }}
                    className="w-full rounded-xl border border-white/20 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Add Internal Note
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-[#102a56]">
                  Case Timeline
                </h3>

                <div className="mt-6 space-y-5">
                  <div className="flex gap-3">
                    <div className="mt-1 h-3 w-3 rounded-full bg-emerald-500" />
                    <div>
                      <p className="text-sm font-semibold text-slate-700">
                        Request received
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        Transportation request entered into Hebi.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="mt-1 h-3 w-3 rounded-full bg-blue-500" />
                    <div>
                      <p className="text-sm font-semibold text-slate-700">
                        Current status
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {selectedCase.status}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="mt-1 h-3 w-3 rounded-full bg-slate-200" />
                    <div>
                      <p className="text-sm font-semibold text-slate-500">
                        Completion
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        Waiting for remaining workflow steps.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-[#102a56]">
                      Internal Notes
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Private notes for Hebi operations and administrative staff.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setInternalNote('')
                      setInternalNoteOpen(true)
                    }}
                    className="text-sm font-semibold text-[#174c91]"
                  >
                    + Add Note
                  </button>
                </div>

                <div className="mt-5 space-y-4">
                  {caseNotes.length === 0 ? (
                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-sm text-slate-500">
                        No internal notes have been added to this case.
                      </p>
                    </div>
                  ) : (
                    caseNotes.map((note) => (
                      <div
                        key={note.id}
                        className="rounded-xl border border-slate-200 p-4"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <p className="text-sm font-semibold text-[#102a56]">
                            {note.author}
                          </p>

                          <p className="text-xs text-slate-400">
                            {note.createdAt}
                          </p>
                        </div>

                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {note.text}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </section>

              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
                  Development Preview
                </p>
                <p className="mt-2 text-sm leading-6 text-amber-800">
                  This workspace currently uses sample information. Real rider,
                  trip, driver, document, and billing records will be connected
                  during the database phase.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {reviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5 sm:px-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#174c91]">
                  Case Review
                </p>

                <h2 className="mt-2 text-2xl font-semibold text-[#102a56]">
                  Review Transportation Request
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {selectedCase.id} · {selectedCase.service}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setReviewOpen(false)}
                className="rounded-lg px-3 py-2 text-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                ×
              </button>
            </div>

            <div className="space-y-6 px-6 py-6 sm:px-8">
              <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="font-semibold text-[#102a56]">
                  Request Summary
                </h3>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                      Case
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {selectedCase.id}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                      County
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {selectedCase.county}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                      Service
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {selectedCase.service}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                      Current Status
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {selectedCase.status}
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <label className="block text-sm font-semibold text-slate-700">
                  Review Decision
                </label>

                <select
                  value={reviewDecision}
                  onChange={(event) => setReviewDecision(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#174c91]"
                >
                  <option value="">Select a decision</option>
                  <option value="Approved">Approve Request</option>
                  <option value="Needs Information">
                    Request More Information
                  </option>
                  <option value="Rejected">Reject Request</option>
                </select>
              </section>

              <section>
                <label className="block text-sm font-semibold text-slate-700">
                  Review Notes
                </label>

                <textarea
                  rows="4"
                  value={reviewNotes}
                  onChange={(event) => setReviewNotes(event.target.value)}
                  placeholder="Add any internal notes about this review..."
                  className="mt-2 w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#174c91]"
                />
              </section>

              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                <p className="text-sm leading-6 text-blue-800">
                  This review is currently a development preview. The decision
                  will become a permanent case record once the Hebi database is connected.
                </p>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-6 py-5 sm:flex-row sm:justify-end sm:px-8">
              <button
                type="button"
                onClick={() => setReviewOpen(false)}
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={!reviewDecision}
                onClick={() => {
                  setSelectedCase({
                    ...selectedCase,
                    status: reviewDecision,
                  })
                  setReviewOpen(false)
                }}
                className="rounded-xl bg-[#102a56] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#174c91] disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Save Review
              </button>
            </div>
          </div>
        </div>
      )}

      {assignDriverOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5 sm:px-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#174c91]">
                  Driver Assignment
                </p>

                <h2 className="mt-2 text-2xl font-semibold text-[#102a56]">
                  Assign Driver
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {selectedCase.id} · {selectedCase.service}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setAssignDriverOpen(false)}
                className="rounded-lg px-3 py-2 text-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                ×
              </button>
            </div>

            <div className="space-y-6 px-6 py-6 sm:px-8">

              <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="font-semibold text-[#102a56]">
                  Case Summary
                </h3>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                      Case
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {selectedCase.id}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                      County
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {selectedCase.county}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                      Service
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {selectedCase.service}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                      Current Assignment
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {selectedCase.driver}
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="font-semibold text-[#102a56]">
                  Available Drivers
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Select the driver who should receive this transportation assignment.
                </p>

                <div className="mt-4 space-y-3">
                  {availableDrivers.map((driver) => (
                    <button
                      key={driver.id}
                      type="button"
                      onClick={() => setSelectedDriver(driver.id)}
                      className={`w-full rounded-2xl border p-4 text-left transition ${
                        selectedDriver === driver.id
                          ? 'border-[#174c91] bg-blue-50'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold text-[#102a56]">
                            {driver.name}
                          </p>

                          <p className="mt-1 text-sm text-slate-500">
                            {driver.county} · {driver.vehicle}
                          </p>

                          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-600">
                            {driver.status}
                          </p>
                        </div>

                        <div
                          className={`mt-1 h-5 w-5 rounded-full border-2 ${
                            selectedDriver === driver.id
                              ? 'border-[#174c91] bg-[#174c91]'
                              : 'border-slate-300'
                          }`}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                <p className="text-sm leading-6 text-blue-800">
                  This assignment is currently a development preview. Driver availability,
                  schedules, counties, and case assignments will be connected to the Hebi
                  database during the database phase.
                </p>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-6 py-5 sm:flex-row sm:justify-end sm:px-8">

              <button
                type="button"
                onClick={() => setAssignDriverOpen(false)}
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={!selectedDriver}
                onClick={async () => {
                const driver = availableDrivers.find(
                  (item) => item.id === selectedDriver
                )

                if (!driver || !selectedCase) return

                const { error } = await supabase
                  .from('trips')
                  .update({
                    driver_id: driver.id,
                    status: 'Scheduled',
                  })
                  .eq('case_id', selectedCase.id)

                if (error) {
                  console.error('Error assigning driver:', error)
                  alert('Unable to assign driver. Please try again.')
                  return
                }

                const { error: caseError } = await supabase
                  .from('cases')
                  .update({
                    status: 'Active',
                  })
                  .eq('id', selectedCase.id)

                if (caseError) {
                  console.error('Error updating case status:', caseError)
                  alert('Driver was assigned, but the case status could not be updated.')
                  return
                }

                const { error: historyError } = await supabase
                  .from('case_status_history')
                  .insert({
                    case_id: selectedCase.id,
                    previous_status: selectedCase.status,
                    new_status: 'Active',
                    changed_by: 'Administrator',
                    note: `Driver ${driver.name} assigned to transportation request.`,
                  })

                if (historyError) {
                  console.error('Error creating status history:', historyError)
                }
                
                setSelectedCase({
                  ...selectedCase,
                  driver: driver.name,
                  status: 'Active',
                })

                setAssignDriverOpen(false)
              }}
                className="rounded-xl bg-[#102a56] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#174c91] disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Confirm Driver Assignment
              </button>

            </div>
          </div>
        </div>
      )}

      {updateStatusOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl">

            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5 sm:px-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#174c91]">
                  Case Management
                </p>

                <h2 className="mt-2 text-2xl font-semibold text-[#102a56]">
                  Update Case Status
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {selectedCase.id} · {selectedCase.service}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setUpdateStatusOpen(false)}
                className="rounded-lg px-3 py-2 text-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                ×
              </button>
            </div>

            <div className="space-y-6 px-6 py-6 sm:px-8">

              <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="font-semibold text-[#102a56]">
                  Case Summary
                </h3>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                      Case
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {selectedCase.id}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                      County
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {selectedCase.county}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                      Service
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {selectedCase.service}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                      Current Status
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {selectedCase.status}
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <label
                  htmlFor="case-status"
                  className="text-sm font-semibold text-[#102a56]"
                >
                  New Status
                </label>

                <p className="mt-1 text-sm text-slate-500">
                  Select the new operational status for this case.
                </p>

                <select
                  id="case-status"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="mt-3 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-[#174c91] focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select a status</option>
                  <option value="Pending Review">Pending Review</option>
                  <option value="Approved">Approved</option>
                  <option value="Assigned">Driver Assigned</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </section>

              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                <p className="text-sm leading-6 text-blue-800">
                  This status update is currently a development preview. Status
                  history and permanent case records will be connected to the Hebi
                  database during the database phase.
                </p>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-6 py-5 sm:flex-row sm:justify-end sm:px-8">
              <button
                type="button"
                onClick={() => setUpdateStatusOpen(false)}
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={!newStatus || newStatus === selectedCase.status}
                onClick={() => {
                  setSelectedCase({
                    ...selectedCase,
                    status: newStatus,
                  })
                  setUpdateStatusOpen(false)
                }}
                className="rounded-xl bg-[#102a56] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#174c91] disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Save Status
              </button>
            </div>

          </div>
        </div>
      )}

      {internalNoteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            
            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5 sm:px-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#174c91]">
                  Case Management
                </p>

                <h2 className="mt-2 text-2xl font-semibold text-[#102a56]">
                  Add Internal Note
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {selectedCase.id} · {selectedCase.service}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setInternalNoteOpen(false)}
                className="rounded-lg px-3 py-2 text-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                ×
              </button>
            </div>

            <div className="space-y-6 px-6 py-6 sm:px-8">
              
              <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="font-semibold text-[#102a56]">
                  Case Summary
                </h3>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                      Case
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {selectedCase.id}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                      County
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {selectedCase.county}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                      Service
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {selectedCase.service}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                      Current Status
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {selectedCase.status}
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <label className="block text-sm font-semibold text-slate-700">
                  Internal Note
                </label>

                <p className="mt-1 text-sm text-slate-500">
                  Add information that should be visible to Hebi administrators and operations staff.
                </p>

                <textarea
                  rows="6"
                  value={internalNote}
                  onChange={(event) => setInternalNote(event.target.value)}
                  placeholder="Enter case note..."
                  className="mt-3 w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#174c91]"
                />
              </section>

              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                <p className="text-sm leading-6 text-blue-800">
                  Internal notes are intended for Hebi operations and administrative use. Notes will become permanent case history once the Hebi database is connected.
                </p>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-6 py-5 sm:flex-row sm:justify-end sm:px-8">
              <button
                type="button"
                onClick={() => setInternalNoteOpen(false)}
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={!internalNote.trim()}
                onClick={() => {
                  const newNote = {
                    id: Date.now(),
                    text: internalNote.trim(),
                    author: 'Administrator',
                    createdAt: new Date().toLocaleString(),
                  }

                  setCaseNotes((previousNotes) => [newNote, ...previousNotes])
                  setInternalNote('')
                  setInternalNoteOpen(false)
                }}
                className="rounded-xl bg-[#102a56] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#174c91] disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}


  if (activeView === 'cases') {
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
            <button
              type="button"
              onClick={() => setActiveView('overview')}
              className="block w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-blue-100 transition hover:bg-white/10"
            >
              Overview
            </button>

            <button
              type="button"
              onClick={() => setActiveView('cases')}
              className="block w-full rounded-xl bg-white/15 px-4 py-3 text-left text-sm font-semibold text-white"
            >
              Cases
            </button>
          </nav>
        </aside>

        <main className="lg:ml-64">
          <header className="border-b border-slate-200 bg-white px-6 py-5 sm:px-8 lg:px-10">
            <div className="mx-auto flex max-w-7xl items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#174c91]">
                  Hebi Lifestyle
                </p>
                <h1 className="mt-1 text-xl font-semibold text-[#102a56]">
                  Case Management
                </h1>
              </div>

              <button
                type="button"
                onClick={() => {
                  resetCreateCaseForm()
                  setCreateCaseOpen(true)
                }}
                className="rounded-xl bg-[#102a56] px-5 py-3 text-sm font-semibold text-white"
              >
                + Create New Case
              </button>
            </div>
          </header>

          <div className="mx-auto max-w-7xl space-y-6 px-6 py-8 sm:px-8 lg:px-10">
            <section>
              <p className="text-sm font-medium text-[#174c91]">
                Operations
              </p>

              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#102a56]">
                Cases
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                Review transportation requests, manage case assignments, and track each case through completion.
              </p>
            </section>

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                  New Requests
                </p>
                <p className="mt-3 text-3xl font-bold text-[#102a56]">{newRequestsCount}</p>
                <p className="mt-1 text-xs text-slate-400">Awaiting review</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                  Available
                </p>
                <p className="mt-3 text-3xl font-bold text-[#102a56]">{availableCasesCount}</p>
                <p className="mt-1 text-xs text-slate-400">Open for driver claim</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                  Assigned
                </p>
                <p className="mt-3 text-3xl font-bold text-[#102a56]">{assignedCasesCount}</p>
                <p className="mt-1 text-xs text-slate-400">Driver assigned</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                  Completed
                </p>
                <p className="mt-3 text-3xl font-bold text-[#102a56]">{completedCasesCount}</p>
                <p className="mt-1 text-xs text-slate-400">Completed transportation</p>
              </div>
            </section>

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col gap-4 border-b border-slate-100 px-6 py-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-semibold text-[#102a56]">All Cases</h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Current transportation case activity
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="text"
                    placeholder="Search cases..."
                    value={caseSearchTerm}
                    onChange={(event) => setCaseSearchTerm(event.target.value)}
                    className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-[#174c91]"
                  />

                  <select
                    value={caseStatusFilter}
                    onChange={(event) => setCaseStatusFilter(event.target.value)}
                    className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none"
                  >
                    <option value="">All Statuses</option>
                    <option value="Pending Review">New Request</option>
                    <option value="Available">Available</option>
                    <option value="Claimed">Claimed</option>
                    <option value="Assigned">Assigned</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {casesLoading ? (
                  <p className="px-6 py-8 text-sm text-slate-500">Loading cases...</p>
                ) : filteredCases.length === 0 ? (
                  <p className="px-6 py-8 text-sm text-slate-500">
                    No cases match your search or filter.
                  </p>
                ) : (
                  filteredCases.map((caseItem) => (
                    <div
                      key={caseItem.id}
                      className="grid gap-4 px-6 py-5 md:grid-cols-[1.1fr_1.1fr_1fr_auto_auto] md:items-center"
                    >
                      <div>
                        <p className="text-sm font-semibold text-[#102a56]">
                          {caseItem.case_number}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {caseItem.county}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-slate-700">
                          {caseItem.service_type}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-slate-500">
                          {caseItem.status}
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

                      <button
                        type="button"
                        onClick={() => setSelectedCase(caseItem)}
                        className="text-sm font-semibold text-[#174c91] hover:text-[#102a56]"
                      >
                        View Case
                      </button>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        </main>

        {createCaseModal}
      </div>
    )
  }
  
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
          <button
            type="button"
            onClick={() => setActiveView('overview')}
            className={`block w-full rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                activeView === 'overview'
                    ? 'bg-white/15 text-white'
                    : 'text-blue-100 hover:bg-white/10'
            }`}
        >
            Overview
        </button>

          <button
            type="button"
            onClick={() => setActiveView('cases')}
            className={`block w-full rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                activeView === 'cases'
                ? 'bg-white/15 text-white'
                : 'text-blue-100 hover:bg-white/10'
            }`}
           >
            Cases
           </button>

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

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-700">Welcome back</p>
                <p className="text-xs text-slate-400">Owner / Administrator</p>
              </div>

              <button
                type="button"
                onClick={handleSignOut}
                disabled={signOutLoading}
                className="text-xs font-semibold text-slate-500 transition hover:text-[#174c91] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {signOutLoading ? 'Signing Out...' : 'Sign Out'}
              </button>
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
              onClick={() => {
                resetCreateCaseForm()
                setCreateCaseOpen(true)
              }}
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
                {databaseCases.map((caseItem) => (
                  <div
                    key={caseItem.id}
                    className="grid gap-3 px-6 py-5 sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-center"
                  >
                    <div>
                      <p className="text-sm font-semibold text-[#102a56]">
                        {caseItem.case_number}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {caseItem.county}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-700">
                        {caseItem.service_type}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-slate-500">
                        {caseItem.status}
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

      {createCaseModal}
    </div>
  )
}