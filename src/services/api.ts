import axios from 'axios'

/**
 * SAAPTD Backend API Service
 * All endpoints map to the Express/Prisma backend at /api/*
 */

const API_URL = import.meta.env.VITE_API_URL // e.g. http://localhost:3000/api

// ── Axios instance ────────────────────────────────────────────
const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT token on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ============================================================
// Types
// ============================================================

export interface User {
  id: number
  username: string
  full_name: string | null
  role: 'Superadmin' | 'Admin' | 'Auditor' | 'Entity'
  entity_name: string | null
}

export interface LoginResponse {
  message: string
  token: string
  user: User
}

export interface RegisterPayload {
  username: string
  password: string
  full_name?: string
  role: 'Superadmin' | 'Admin' | 'Auditor' | 'Entity'
  entity_name?: string
}

export interface AuditSession {
  id: number
  entity_id: number | null
  auditor_id: number | null
  category_id: number | null
  audit_date: string | null
  final_score_percent: number | null
  status: 'Draft' | 'Submitted' | 'Verified'
}

export interface StartSessionPayload {
  entity_id?: number
  auditor_id?: number
  category_id?: number
  audit_date?: string // ISO date string
}

export interface AuditResult {
  id: number
  session_id: number | null
  item_id: number | null
  score_given: number | null
  markah_dapat: number | null
  comment: string | null
}

export interface SubmitItemPayload {
  session_id: number
  item_id: number
  score_given?: number
  markah_dapat?: number
  comment?: string
}

export interface Finding {
  id: number
  category_id: number | null
  auditor_id: number | null
  entity_id: number | null
  observation: string | null
  finding_status: 'Kritikal' | 'Lazim' | 'Berulang'
  created_at: string | null
  // Relations (included by backend in getAllFindings / getFindingById)
  categories?: { id: number; category_name: string } | null
  capa_actions?: CapaAction[]
  evidence?: Evidence[]
}

export interface CreateFindingPayload {
  category_id?: number
  auditor_id?: number
  entity_id?: number
  observation: string
  finding_status?: 'Kritikal' | 'Lazim' | 'Berulang'
}

export interface CapaAction {
  id: number
  finding_id: number | null
  root_cause: string | null
  action_plan: string | null
  due_date: string | null
  status: 'Open' | 'In-Progress' | 'Closed'
}

export interface CreateCapaPayload {
  finding_id: number
  root_cause?: string
  action_plan?: string
  due_date?: string
}

export interface ChecklistItem {
  id: number
  category_id: number | null
  parent_id: number | null
  item_code: string | null
  description: string
  full_marks: number | null
  level: number | null
}

export interface Category {
  id: number
  category_name: string
  group_type: 'Gerak' | 'Admin' | 'Logistik' | null
}

export interface AuditCategory {
  category_id: number
  category_name: string
  weightage_percent: number
}

export interface AuditPhase {
  phase_id: number
  phase_name: string
}

export interface Evidence {
  id: number
  finding_id: number | null
  file_path: string | null
  uploaded_at: string | null
}

// ============================================================
// Auth
// ============================================================

/**
 * POST /api/auth/login
 * Returns JWT token and user object on success.
 */
export const loginUser = async (
  username: string,
  password: string,
): Promise<{ success: boolean; data?: LoginResponse; error?: string }> => {
  try {
    const response = await api.post<LoginResponse>('/auth/login', { username, password })
    return { success: true, data: response.data }
  } catch (error: any) {
    const message = error.response?.data?.error || error.message || 'Gagal log masuk.'
    return { success: false, error: message }
  }
}

/**
 * POST /api/auth/register
 */
export const registerUser = async (
  payload: RegisterPayload,
): Promise<{ success: boolean; error?: string }> => {
  try {
    await api.post('/auth/register', payload)
    return { success: true }
  } catch (error: any) {
    const message = error.response?.data?.error || error.message || 'Gagal mendaftar.'
    return { success: false, error: message }
  }
}

// ============================================================
// Users  (Admin only for list/update/delete)
// ============================================================

/** GET /api/users */
export const getUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>('/users')
  return response.data
}

/** GET /api/users/:id */
export const getUserById = async (id: number): Promise<User> => {
  const response = await api.get<User>(`/users/${id}`)
  return response.data
}

/** PUT /api/users/:id */
export const updateUser = async (id: number, payload: Partial<RegisterPayload>): Promise<User> => {
  const response = await api.put<User>(`/users/${id}`, payload)
  return response.data
}

/** DELETE /api/users/:id */
export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`)
}

// ============================================================
// Categories & Phases
// ============================================================

/** GET /api/categories */
export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get<Category[]>('/categories')
  return response.data
}

/** GET /api/categories/audit */
export const getAuditCategories = async (): Promise<AuditCategory[]> => {
  const response = await api.get<AuditCategory[]>('/categories/audit')
  return response.data
}

/** GET /api/categories/phases */
export const getPhases = async (): Promise<AuditPhase[]> => {
  const response = await api.get<AuditPhase[]>('/categories/phases')
  return response.data
}

// ============================================================
// Checklist Items
// ============================================================

/** GET /api/checklist?category_id=N */
export const getChecklist = async (category_id?: number): Promise<ChecklistItem[]> => {
  const response = await api.get<ChecklistItem[]>('/checklist', {
    params: category_id !== undefined ? { category_id } : undefined,
  })
  return response.data
}

/** POST /api/checklist  (Admin only) */
export const createChecklistItem = async (
  payload: Omit<ChecklistItem, 'id'>,
): Promise<ChecklistItem> => {
  const response = await api.post<ChecklistItem>('/checklist', payload)
  return response.data
}

/** DELETE /api/checklist/:id  (Admin only) */
export const deleteChecklistItem = async (id: number): Promise<void> => {
  await api.delete(`/checklist/${id}`)
}

// ============================================================
// Audit Sessions
// ============================================================

/** POST /api/audit/start */
export const startAuditSession = async (payload: StartSessionPayload): Promise<AuditSession> => {
  const response = await api.post<AuditSession>('/audit/start', payload)
  return response.data
}

/** GET /api/audit/sessions */
export const getAuditSessions = async (): Promise<AuditSession[]> => {
  const response = await api.get<AuditSession[]>('/audit/sessions')
  return response.data
}

/** GET /api/audit/session/:id */
export const getAuditSession = async (id: number): Promise<AuditSession> => {
  const response = await api.get<AuditSession>(`/audit/session/${id}`)
  return response.data
}

/** GET /api/audit/session/:id/results */
export const getSessionResults = async (sessionId: number): Promise<AuditResult[]> => {
  const response = await api.get<AuditResult[]>(`/audit/session/${sessionId}/results`)
  return response.data
}

/** POST /api/audit/submit-item */
export const submitAuditItem = async (
  payload: SubmitItemPayload,
): Promise<{ message: string; result: AuditResult }> => {
  const response = await api.post<{ message: string; result: AuditResult }>(
    '/audit/submit-item',
    payload,
  )
  return response.data
}

// ============================================================
// Findings
// ============================================================

/** GET /api/findings */
export const getFindings = async (): Promise<Finding[]> => {
  const response = await api.get<Finding[]>('/findings')
  return response.data
}

/** GET /api/findings/:id */
export const getFindingById = async (id: number): Promise<Finding> => {
  const response = await api.get<Finding>(`/findings/${id}`)
  return response.data
}

/** POST /api/findings */
export const createFinding = async (payload: CreateFindingPayload): Promise<Finding> => {
  const response = await api.post<Finding>('/findings', payload)
  return response.data
}

/** PATCH /api/findings/:id/status */
export const updateFindingStatus = async (
  id: number,
  finding_status: Finding['finding_status'],
): Promise<Finding> => {
  const response = await api.patch<Finding>(`/findings/${id}/status`, { finding_status })
  return response.data
}

// ============================================================
// CAPA Actions
// ============================================================

/** POST /api/capa */
export const createCapaAction = async (payload: CreateCapaPayload): Promise<CapaAction> => {
  const response = await api.post<CapaAction>('/capa', payload)
  return response.data
}

/** GET /api/capa */
export const getCapaActions = async (): Promise<CapaAction[]> => {
  const response = await api.get<CapaAction[]>('/capa')
  return response.data
}

/** PATCH /api/capa/:id/status */
export const updateCapaStatus = async (
  id: number,
  status: CapaAction['status'],
): Promise<CapaAction> => {
  const response = await api.patch<CapaAction>(`/capa/${id}/status`, { status })
  return response.data
}

// ============================================================
// Evidence / File Upload
// ============================================================

/**
 * POST /api/evidence/upload
 * Uploads a single file as multipart/form-data (field name: "evidence").
 */
export const uploadEvidence = async (file: File): Promise<{ evidenceId: number; url: string }> => {
  const formData = new FormData()
  formData.append('evidence', file)
  const response = await api.post<{ evidenceId: number; url: string }>(
    '/evidence/upload',
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  )
  return response.data
}

/** GET /api/evidence/:id */
export const getEvidence = async (id: number): Promise<Evidence> => {
  const response = await api.get<Evidence>(`/evidence/${id}`)
  return response.data
}

/**
 * Build a direct URL to a static uploaded file.
 * Files are served at http://localhost:3000/uploads/...
 */
export const getEvidenceFileUrl = (filePath: string): string => {
  const base = API_URL.replace('/api', '')
  return `${base}${filePath}`
}
