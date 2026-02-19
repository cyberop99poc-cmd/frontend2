import { ref, computed, watch, Ref } from 'vue'
import { useRoute } from 'vue-router'

export type PhaseSlug = 'self' | 'commander' | 'aptd'

export interface PhaseState {
  currentPhase: Ref<PhaseSlug>
  phaseCompletion: Ref<Record<PhaseSlug, boolean>>
  phaseLabel: ReturnType<typeof computed>
  phases: Array<{ slug: PhaseSlug; label: string }>
  canAccessPhase: (slug: PhaseSlug) => boolean
  isPhaseCompleted: (slug: PhaseSlug) => boolean
  navigatePhase: (slug: PhaseSlug) => void
  markPhaseComplete: (slug: PhaseSlug) => void
  showToast: (msg: string, type: 'success' | 'error') => void
}

export function useAuditPhase(domain: string): PhaseState {
  const route = useRoute()
  const phases: Array<{ slug: PhaseSlug; label: string }> = [
    { slug: 'self', label: 'Self Audit' },
    { slug: 'commander', label: "Commander's Audit" },
    { slug: 'aptd', label: 'APTD' }
  ]
  const currentPhase = ref<PhaseSlug>('self')
  const phaseCompletion = ref<Record<PhaseSlug, boolean>>({ self: false, commander: false, aptd: false })
  const toastVisible = ref(false)
  const toastMessage = ref('')
  const toastType = ref<'success' | 'error'>('success')

  const phaseLabel = computed(() => phases.find(p => p.slug === currentPhase.value)?.label ?? '')

  const phaseCompletionKey = `${domain}_auditPhaseCompletion`
  const phaseSelectionKey = `${domain}_auditCurrentPhase`

  const savePhaseCompletion = () => {
    try {
      localStorage.setItem(phaseCompletionKey, JSON.stringify(phaseCompletion.value))
    } catch { }
  }

  const loadPhaseCompletion = () => {
    try {
      const raw = localStorage.getItem(phaseCompletionKey)
      if (!raw) return
      const obj = JSON.parse(raw)
      phaseCompletion.value = {
        self: !!obj?.self,
        commander: !!obj?.commander,
        aptd: !!obj?.aptd
      }
    } catch { }
  }

  const canAccessPhase = (slug: PhaseSlug) => {
    if (slug === 'self') return true
    if (slug === 'commander') return phaseCompletion.value.self
    if (slug === 'aptd') return phaseCompletion.value.self && phaseCompletion.value.commander
    return false
  }

  const isPhaseCompleted = (slug: PhaseSlug) => phaseCompletion.value[slug]

  const navigatePhase = (slug: PhaseSlug) => {
    if (!canAccessPhase(slug)) {
      showToast('Sila lengkapkan audit sebelumnya dahulu', 'error')
      return
    }
    currentPhase.value = slug
    try { localStorage.setItem(phaseSelectionKey, slug) } catch { }
  }

  const markPhaseComplete = (slug: PhaseSlug) => {
    if (slug === 'self') phaseCompletion.value.self = true
    if (slug === 'commander') phaseCompletion.value.commander = true
    if (slug === 'aptd') phaseCompletion.value.aptd = true
    savePhaseCompletion()
  }

  const showToast = (message: string, type: 'success' | 'error') => {
    toastMessage.value = message
    toastType.value = type
    toastVisible.value = true
    setTimeout(() => {
      toastVisible.value = false
    }, 3000)
  }

  watch(currentPhase, (p) => {
    try { localStorage.setItem(phaseSelectionKey, p) } catch { }
  })

  watch(phaseCompletion, () => {
    savePhaseCompletion()
  }, { deep: true })

  // Load on init
  loadPhaseCompletion()

  // Check for phase query parameter first
  const queryPhase = route.query.phase as PhaseSlug | undefined
  if (queryPhase && ['self', 'commander', 'aptd'].includes(queryPhase) && canAccessPhase(queryPhase)) {
    currentPhase.value = queryPhase
  } else {
    // Fall back to saved phase or default
    const savedPhase = (localStorage.getItem(phaseSelectionKey) as PhaseSlug | null)
    const nextPhase: PhaseSlug = savedPhase && canAccessPhase(savedPhase) ? savedPhase : 'self'
    currentPhase.value = nextPhase
  }

  return {
    currentPhase,
    phaseCompletion,
    phaseLabel: phaseLabel as any,
    phases,
    canAccessPhase,
    isPhaseCompleted,
    navigatePhase,
    markPhaseComplete,
    showToast
  }
}
