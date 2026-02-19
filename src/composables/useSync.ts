import {
  startAuditSession,
  getAuditSessions,
  getAuditSession,
  getSessionResults,
  submitAuditItem,
  getFindings,
  getFindingById,
  createFinding,
  updateFindingStatus,
  createCapaAction,
  getCapaActions,
  updateCapaStatus,
  uploadEvidence,
  getEvidence,
  type StartSessionPayload,
  type SubmitItemPayload,
  type CreateCapaPayload,
  type CreateFindingPayload,
  type Finding,
  type CapaAction,
} from '../services/api'

/**
 * useSync — composable that wraps all backend API calls.
 * Phase state (currentPhase, phaseCompletion) is kept localStorage-only
 * because the backend has no /user/state endpoint.
 */
export function useSync() {
  // ── Audit Sessions ──────────────────────────────────────────

  const startSession = (payload: StartSessionPayload) => startAuditSession(payload)

  const getSessions = () => getAuditSessions()

  const getSession = (id: number) => getAuditSession(id)

  const getResults = (sessionId: number) => getSessionResults(sessionId)

  const submitItem = (payload: SubmitItemPayload) => submitAuditItem(payload)

  // ── Findings ────────────────────────────────────────────────

  const getFindings_ = () => getFindings()

  const getFinding = (id: number) => getFindingById(id)

  const addFinding = (payload: CreateFindingPayload) => createFinding(payload)

  const setFindingStatus = (id: number, status: Finding['finding_status']) =>
    updateFindingStatus(id, status)

  // ── CAPA ────────────────────────────────────────────────────

  const createCapa = (payload: CreateCapaPayload) => createCapaAction(payload)

  const getCapa = () => getCapaActions()

  const setCapaStatus = (id: number, status: CapaAction['status']) => updateCapaStatus(id, status)

  // ── Evidence ────────────────────────────────────────────────

  const uploadFile = (file: File) => uploadEvidence(file)

  const getEvidenceById = (id: number) => getEvidence(id)

  return {
    // Sessions
    startSession,
    getSessions,
    getSession,
    getResults,
    submitItem,
    // Findings
    getFindings: getFindings_,
    getFinding,
    addFinding,
    setFindingStatus,
    // CAPA
    createCapa,
    getCapa,
    setCapaStatus,
    // Evidence
    uploadFile,
    getEvidenceById,
  }
}
