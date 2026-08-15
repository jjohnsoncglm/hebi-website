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
  const [reviewLoading, setReviewLoading] = useState(false)
  const [reviewError, setReviewError] = useState('')
  const [internalNoteOpen, setInternalNoteOpen] = useState(false)
  const [internalNote, setInternalNote] = useState('')
  const [caseNotes, setCaseNotes] = useState([])
  const [selectedRider, setSelectedRider] = useState(null)
  const [riderLoading, setRiderLoading] = useState(false)
  const [riderLoadError, setRiderLoadError] = useState('')
  const [caseHistory, setCaseHistory] = useState([])
  const [historyLoading, setHistoryLoading] = useState(false)
  const [historyError, setHistoryError] = useState('')

  const [databaseCases, setDatabaseCases] = useState([])
  const [casesLoading, setCasesLoading] = useState(true)
  const [availableDrivers, setAvailableDrivers] = useState([])
  const [driversLoading, setDriversLoading] = useState(true)
  const [driversLoadError, setDriversLoadError] = useState('')
  const [allDrivers, setAllDrivers] = useState([])
  const [allDriversLoading, setAllDriversLoading] = useState(true)
  const [allDriversError, setAllDriversError] = useState('')
  const [assignDriverLoading, setAssignDriverLoading] = useState(false)
  const [assignDriverError, setAssignDriverError] = useState('')
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
      setDriversLoadError('')

      // public.drivers only has: id, first_name, last_name, status, phone, email, created_at, updated_at.
      const { data, error } = await supabase
        .from('drivers')
        .select('id, first_name, last_name, status, phone, email')
        .eq('status', 'Active')
        .order('first_name', { ascending: true })

      if (error) {
        console.error('Error loading drivers:', error)
        setDriversLoadError('Unable to load available drivers.')
        setDriversLoading(false)
        return
      }

      const formattedDrivers = (data || []).map((driver) => ({
        id: driver.id,
        name: `${driver.first_name || ''} ${driver.last_name || ''}`.trim(),
        status: driver.status || '',
        phone: driver.phone || '',
        email: driver.email || '',
      }))

      setAvailableDrivers(formattedDrivers)
      setDriversLoading(false)
    }

    loadDrivers()
  }, [session])

  async function loadAllDrivers() {
    setAllDriversLoading(true)
    setAllDriversError('')

    const { data, error } = await supabase
      .from('drivers')
      .select('id, first_name, last_name, status, phone, email')
      .order('first_name', { ascending: true })

    if (error) {
      console.error('Error loading driver directory:', error)
      setAllDriversError('Unable to load drivers from the database.')
      setAllDriversLoading(false)
      return
    }

    setAllDrivers(data || [])
    setAllDriversLoading(false)
  }

  useEffect(() => {
    if (session && activeView === 'drivers') {
      loadAllDrivers()
    }
  }, [session, activeView])

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

  // Refresh cases from Supabase whenever leaving the case workspace, so the
  // list reflects the latest status instead of a stale pre-fetch.
  function closeCaseWorkspace(nextView) {
    setSelectedCase(null)
    if (nextView) {
      setActiveView(nextView)
    }
    loadCases()
  }

  useEffect(() => {
    let isMounted = true

    async function loadRider() {
      if (!selectedCase?.rider_id) {
        setSelectedRider(null)
        setRiderLoadError('')
        return
      }

      setRiderLoading(true)
      setRiderLoadError('')

      const { data, error } = await supabase
        .from('riders')
        .select('*')
        .eq('id', selectedCase.rider_id)
        .maybeSingle()

      if (!isMounted) return

      if (error) {
        console.error('Error loading rider:', error)
        setSelectedRider(null)
        setRiderLoadError('Unable to load the rider record for this case.')
      } else {
        setSelectedRider(data)
      }

      setRiderLoading(false)
    }

    loadRider()

    return () => {
      isMounted = false
    }
  }, [selectedCase?.rider_id])

  async function loadCaseHistory(caseId) {
    if (!caseId) {
      setCaseHistory([])
      setHistoryError('')
      return
    }

    setHistoryLoading(true)
    setHistoryError('')

    // Confirm the read runs under an authenticated session, since RLS SELECT
    // policies on case_status_history are scoped to the authenticated role.
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
    const activeSession = sessionData?.session ?? null

    console.log('Case history read auth check:', {
      caseId,
      hasSession: Boolean(activeSession),
      userId: activeSession?.user?.id ?? null,
      userRole: activeSession?.user?.role ?? null,
      sessionError,
    })

    const { data, error, status } = await supabase
      .from('case_status_history')
      .select('*')
      .eq('case_id', caseId)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Error loading case history:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
        status,
        raw: error,
        caseId,
      })

      const historyReadErrorParts = [
        error.message,
        error.code ? `code: ${error.code}` : null,
        error.details ? `details: ${error.details}` : null,
        error.hint ? `hint: ${error.hint}` : null,
      ].filter(Boolean)

      setCaseHistory([])
      setHistoryError(
        `Unable to load the case timeline — ${
          historyReadErrorParts.join(' | ') || 'unknown Supabase error'
        }`
      )
    } else {
      console.log('Case history read result:', {
        caseId,
        rowCount: data?.length ?? 0,
      })
      setCaseHistory(data || [])
    }

    setHistoryLoading(false)
  }

  useEffect(() => {
    loadCaseHistory(selectedCase?.id)
  }, [selectedCase?.id])

  function formatHistoryTimestamp(value) {
    if (!value) return 'Not provided'

    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return 'Not provided'

    return date.toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  }

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

  async function handleSaveReview() {
    // This phase only supports the Pending Review -> Approved transition.
    if (!selectedCase || reviewDecision !== 'Approved') return

    setReviewLoading(true)
    setReviewError('')

    const previousStatus = selectedCase.status

    const { data: updatedCases, error } = await supabase
      .from('cases')
      .update({ status: 'Approved' })
      .eq('id', selectedCase.id)
      .select()

    if (error) {
      console.error('Error saving case review:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
        raw: error,
      })

      setReviewError('Unable to save this review. Please try again.')
      setReviewLoading(false)
      return
    }

    const updatedCase = updatedCases?.[0]

    // An update that matches no rows returns no error, so treat it as a failure.
    if (!updatedCase) {
      console.error('Case review update affected no rows:', {
        caseId: selectedCase.id,
        caseNumber: selectedCase.case_number,
        returnedRows: updatedCases,
      })

      setReviewError(
        'The case status was not saved. You may not have permission to update this case.'
      )
      setReviewLoading(false)
      return
    }

    // Confirm an authenticated session is still present before the history insert,
    // since RLS on case_status_history requires the authenticated role.
    const { data: historySessionData, error: historySessionError } = await supabase.auth.getSession()
    const activeHistorySession = historySessionData?.session ?? null

    console.log('Case review history insert auth check:', {
      hasSession: Boolean(activeHistorySession),
      userId: activeHistorySession?.user?.id ?? null,
      userRole: activeHistorySession?.user?.role ?? null,
      historySessionError,
    })

    const historyRow = {
      case_id: updatedCase.id,
      previous_status: previousStatus,
      new_status: updatedCase.status,
      changed_by: 'Administrator',
      note: reviewNotes.trim() || 'Transportation request approved during case review.',
    }

    const { error: historyError } = await supabase
      .from('case_status_history')
      .insert(historyRow)

    setSelectedCase((previousCase) => ({
      ...previousCase,
      ...updatedCase,
    }))

    await loadCases()
    await loadCaseHistory(updatedCase.id)

    if (historyError) {
      console.error('Error creating status history:', {
        message: historyError.message,
        code: historyError.code,
        details: historyError.details,
        hint: historyError.hint,
        raw: historyError,
        attemptedRow: historyRow,
        hadSession: Boolean(activeHistorySession),
      })

      const historyErrorParts = [
        historyError.message,
        historyError.code ? `code: ${historyError.code}` : null,
        historyError.details ? `details: ${historyError.details}` : null,
        historyError.hint ? `hint: ${historyError.hint}` : null,
      ].filter(Boolean)

      setHistoryError(
        `The case was approved, but the timeline entry failed to save — ${
          historyErrorParts.join(' | ') || 'unknown Supabase error'
        }`
      )
    }

    setReviewLoading(false)
    setReviewOpen(false)
  }

  function resetCreateCaseForm() {    setRiderFirstName('')
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

    // Temporary diagnostics: confirm which Supabase identity the insert runs as.
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
    const activeSession = sessionData?.session ?? null

    console.log('Create Case auth check:', {
      hasSession: Boolean(activeSession),
      userId: activeSession?.user?.id ?? null,
      userEmail: activeSession?.user?.email ?? null,
      userRole: activeSession?.user?.role ?? null,
      appMetadataRole: activeSession?.user?.app_metadata?.role ?? null,
      sessionError,
    })

    if (!activeSession) {
      setCreateCaseError(
        'Your admin session is not authenticated with Supabase. Please sign out and sign back in.'
      )
      setCreateCaseLoading(false)
      return
    }

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
      referral_source: referralSource.trim() || null,
      referring_agency: referringAgency.trim() || null,
      case_worker_name: caseWorkerName.trim() || null,
      case_worker_email: caseWorkerEmail.trim() || null,
      case_worker_phone: caseWorkerPhone.trim() || null,
    })

    if (caseError) {
      console.error('Error creating case:', {
        message: caseError.message,
        code: caseError.code,
        details: caseError.details,
        hint: caseError.hint,
        raw: caseError,
      })

      const caseErrorParts = [
        caseError.message,
        caseError.code ? `code: ${caseError.code}` : null,
        caseError.details ? `details: ${caseError.details}` : null,
        caseError.hint ? `hint: ${caseError.hint}` : null,
      ].filter(Boolean)

      setCreateCaseError(
        `Case insert failed — ${caseErrorParts.join(' | ') || 'unknown Supabase error'}`
      )
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
            onClick={() => closeCaseWorkspace('overview')}
            className="block w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-blue-100 transition hover:bg-white/10"
          >
            Overview
          </button>

          <button
            type="button"
            onClick={() => closeCaseWorkspace()}
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
              onClick={() => closeCaseWorkspace()}
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
                {selectedCase.case_number || 'Not provided'}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                {selectedCase.service_type || 'Not provided'} •{' '}
                {selectedCase.county || 'Not provided'}
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
                      {selectedCase.service_type || 'Not provided'}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                      County
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-700">
                      {selectedCase.county || 'Not provided'}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                      Driver Assignment
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-700">
                      {selectedCase.driver || 'Not assigned'}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                      Case Status
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-700">
                      {selectedCase.status || 'Not provided'}
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
                    Rider record linked to this transportation case.
                  </p>
                </div>

                {riderLoading ? (
                  <p className="mt-6 text-sm text-slate-500">Loading rider information...</p>
                ) : riderLoadError ? (
                  <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                    {riderLoadError}
                  </p>
                ) : !selectedRider ? (
                  <p className="mt-6 text-sm text-slate-500">
                    No rider record is linked to this case.
                  </p>
                ) : (
                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                        Rider
                      </p>
                      <p className="mt-2 text-sm font-semibold text-slate-700">
                        {`${selectedRider.first_name || ''} ${selectedRider.last_name || ''}`.trim() ||
                          'Not provided'}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                        Date of Birth
                      </p>
                      <p className="mt-2 text-sm font-semibold text-slate-700">
                        {selectedRider.date_of_birth || 'Not provided'}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                        Primary Contact
                      </p>
                      <p className="mt-2 text-sm font-semibold text-slate-700">
                        {selectedRider.primary_contact_name || 'Not provided'}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                        Contact Phone
                      </p>
                      <p className="mt-2 text-sm font-semibold text-slate-700">
                        {selectedRider.primary_contact_phone || 'Not provided'}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                        Contact Email
                      </p>
                      <p className="mt-2 text-sm font-semibold text-slate-700">
                        {selectedRider.primary_contact_email || 'Not provided'}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                        Special Needs
                      </p>
                      <p className="mt-2 text-sm font-semibold text-slate-700">
                        {selectedRider.special_needs || 'Not provided'}
                      </p>
                    </div>
                  </div>
                )}
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
                      Not provided
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                      Destination
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-700">
                      Not provided
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                      Trip Date
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-700">
                      Not scheduled
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                      Pickup Time
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-700">
                      Not scheduled
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
                      setReviewError('')
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
                      setAssignDriverError('')
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

                {historyLoading ? (
                  <p className="mt-6 text-sm text-slate-500">Loading case timeline...</p>
                ) : historyError ? (
                  <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                    {historyError}
                  </p>
                ) : caseHistory.length === 0 ? (
                  <p className="mt-6 text-sm text-slate-500">
                    No status history has been recorded for this case yet.
                  </p>
                ) : (
                  <div className="mt-6 space-y-5">
                    {caseHistory.map((event) => (
                      <div key={event.id} className="flex gap-3">
                        <div className="mt-1 h-3 w-3 rounded-full bg-blue-500" />
                        <div>
                          <p className="text-sm font-semibold text-slate-700">
                            {event.previous_status
                              ? `${event.previous_status} → ${event.new_status}`
                              : event.new_status}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {event.note || 'No note provided.'}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {event.changed_by || 'Unknown'} ·{' '}
                            {formatHistoryTimestamp(event.created_at)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
                  Case and rider records are now connected to the Hebi database.
                  Trip, driver, document, and billing records will be connected in
                  upcoming steps.
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
                  {selectedCase.case_number} · {selectedCase.service_type}
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
                      {selectedCase.case_number}
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
                      {selectedCase.service_type}
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
                  <option value="" disabled>
                    Request More Information (coming soon)
                  </option>
                  <option value="" disabled>
                    Reject Request (coming soon)
                  </option>
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

              <div aria-live="polite" className="min-h-6">
                {reviewError && (
                  <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                    {reviewError}
                  </p>
                )}
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
                disabled={!reviewDecision || reviewLoading}
                onClick={handleSaveReview}
                className="rounded-xl bg-[#102a56] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#174c91] disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {reviewLoading ? 'Saving Review...' : 'Save Review'}
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
                  {selectedCase.case_number} · {selectedCase.service_type}
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
                      {selectedCase.case_number}
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
                      {selectedCase.service_type}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                      Current Assignment
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {selectedCase.driver || 'Not assigned'}
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

                {driversLoading ? (
                  <p className="mt-4 text-sm text-slate-500">Loading drivers...</p>
                ) : driversLoadError ? (
                  <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                    {driversLoadError}
                  </p>
                ) : availableDrivers.length === 0 ? (
                  <p className="mt-4 text-sm text-slate-500">
                    No active drivers were found in the database.
                  </p>
                ) : (
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
                              {driver.name || 'Unnamed driver'}
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                              {[driver.phone, driver.email].filter(Boolean).join(' · ') ||
                                'No contact information on file'}
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
                )}
              </section>

              <div aria-live="polite" className="min-h-6">
                {assignDriverError && (
                  <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                    {assignDriverError}
                  </p>
                )}
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
                disabled={!selectedDriver || assignDriverLoading}
                onClick={async () => {
                  const driver = availableDrivers.find(
                    (item) => item.id === selectedDriver
                  )

                  if (!driver || !selectedCase) return

                  setAssignDriverLoading(true)
                  setAssignDriverError('')

                  // public.cases has no driver assignment column; the driver link is
                  // stored on public.trips (case_id, driver_id). Find the existing trip
                  // for this case, if any, since a plain update can silently match 0 rows.
                  const { data: existingTrips, error: existingTripsError } = await supabase
                    .from('trips')
                    .select('id')
                    .eq('case_id', selectedCase.id)
                    .limit(1)

                  if (existingTripsError) {
                    console.error('Error checking existing trip:', existingTripsError)
                    setAssignDriverError(
                      `Unable to assign driver — ${existingTripsError.message || 'unknown Supabase error'}`
                    )
                    setAssignDriverLoading(false)
                    return
                  }

                  const existingTrip = existingTrips?.[0]

                  const { error: tripWriteError } = existingTrip
                    ? await supabase
                        .from('trips')
                        .update({ driver_id: driver.id, status: 'Scheduled' })
                        .eq('id', existingTrip.id)
                    : await supabase
                        .from('trips')
                        .insert({ case_id: selectedCase.id, driver_id: driver.id, status: 'Scheduled' })

                  if (tripWriteError) {
                    console.error('Error assigning driver:', {
                      message: tripWriteError.message,
                      code: tripWriteError.code,
                      details: tripWriteError.details,
                      hint: tripWriteError.hint,
                      raw: tripWriteError,
                    })

                    const tripErrorParts = [
                      tripWriteError.message,
                      tripWriteError.code ? `code: ${tripWriteError.code}` : null,
                      tripWriteError.details ? `details: ${tripWriteError.details}` : null,
                      tripWriteError.hint ? `hint: ${tripWriteError.hint}` : null,
                    ].filter(Boolean)

                    setAssignDriverError(
                      `Unable to assign driver — ${
                        tripErrorParts.join(' | ') || 'unknown Supabase error'
                      }`
                    )
                    setAssignDriverLoading(false)
                    return
                  }

                  const previousStatus = selectedCase.status

                  const { data: updatedCases, error: caseError } = await supabase
                    .from('cases')
                    .update({ status: 'Assigned' })
                    .eq('id', selectedCase.id)
                    .select()

                  if (caseError) {
                    console.error('Error updating case status:', caseError)
                    setAssignDriverError(
                      'Driver was assigned, but the case status could not be updated.'
                    )
                    setAssignDriverLoading(false)
                    return
                  }

                  const updatedCase = updatedCases?.[0]

                  if (!updatedCase) {
                    console.error('Case status update affected no rows:', {
                      caseId: selectedCase.id,
                    })
                    setAssignDriverError(
                      'Driver was assigned, but the case status was not saved. You may not have permission to update this case.'
                    )
                    setAssignDriverLoading(false)
                    return
                  }

                  const { error: historyError } = await supabase
                    .from('case_status_history')
                    .insert({
                      case_id: updatedCase.id,
                      previous_status: previousStatus,
                      new_status: updatedCase.status,
                      changed_by: 'Administrator',
                      note: `Driver ${driver.name} assigned to transportation request.`,
                    })

                  await loadCases()
                  await loadCaseHistory(updatedCase.id)

                  setSelectedCase((previousCase) => ({
                    ...previousCase,
                    ...updatedCase,
                    driver: driver.name,
                  }))

                  if (historyError) {
                    console.error('Error creating status history:', historyError)

                    const historyErrorParts = [
                      historyError.message,
                      historyError.code ? `code: ${historyError.code}` : null,
                      historyError.details ? `details: ${historyError.details}` : null,
                      historyError.hint ? `hint: ${historyError.hint}` : null,
                    ].filter(Boolean)

                    setHistoryError(
                      `The driver was assigned, but the timeline entry failed to save — ${
                        historyErrorParts.join(' | ') || 'unknown Supabase error'
                      }`
                    )
                  }

                  setAssignDriverLoading(false)
                  setAssignDriverError('')
                  setAssignDriverOpen(false)
                }}
                className="rounded-xl bg-[#102a56] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#174c91] disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {assignDriverLoading ? 'Assigning Driver...' : 'Confirm Driver Assignment'}
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

  if (activeView === 'drivers') {
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
              className="block w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-blue-100 transition hover:bg-white/10"
            >
              Cases
            </button>

            <button
              type="button"
              onClick={() => setActiveView('drivers')}
              className="block w-full rounded-xl bg-white/15 px-4 py-3 text-left text-sm font-semibold text-white"
            >
              Drivers
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
                  Driver Management
                </h1>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-7xl space-y-6 px-6 py-8 sm:px-8 lg:px-10">
            <section>
              <p className="text-sm font-medium text-[#174c91]">
                Operations
              </p>

              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#102a56]">
                Drivers
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                Driver directory sourced directly from the Hebi database.
              </p>
            </section>

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-6 py-5">
                <h3 className="font-semibold text-[#102a56]">All Drivers</h3>
                <p className="mt-1 text-xs text-slate-400">
                  Current driver records
                </p>
              </div>

              <div className="divide-y divide-slate-100">
                {allDriversLoading ? (
                  <p className="px-6 py-8 text-sm text-slate-500">Loading drivers...</p>
                ) : allDriversError ? (
                  <p className="px-6 py-8 text-sm text-red-700">{allDriversError}</p>
                ) : allDrivers.length === 0 ? (
                  <p className="px-6 py-8 text-sm text-slate-500">
                    No drivers were found in the database.
                  </p>
                ) : (
                  allDrivers.map((driver) => (
                    <div
                      key={driver.id}
                      className="grid gap-4 px-6 py-5 md:grid-cols-[1.2fr_1fr_auto] md:items-center"
                    >
                      <div>
                        <p className="text-sm font-semibold text-[#102a56]">
                          {`${driver.first_name || ''} ${driver.last_name || ''}`.trim() ||
                            'Unnamed driver'}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {[driver.phone, driver.email].filter(Boolean).join(' · ') ||
                            'No contact information on file'}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-slate-500">
                          {driver.status || 'Not provided'}
                        </p>
                      </div>

                      <span
                        className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                          driver.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {driver.status || 'Unknown'}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        </main>
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

          <button
            type="button"
            onClick={() => setActiveView('drivers')}
            className={`block w-full rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
              activeView === 'drivers'
                ? 'bg-white/15 text-white'
                : 'text-blue-100 hover:bg-white/10'
            }`}
          >
            Drivers
          </button>

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