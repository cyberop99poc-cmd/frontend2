<template>
  <div class="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-8">
    <h3 class="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Audit Kategori</h3>
    <div class="flex items-center justify-between gap-4">
      <button
        v-for="phase in phases"
        :key="phase.slug"
        @click="onNavigate(phase.slug)"
        :disabled="!canAccess(phase.slug)"
        :class="[
          'flex-1 px-4 py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2',
          currentPhase === phase.slug
            ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg'
            : isPhaseCompleted(phase.slug)
            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
            : !canAccess(phase.slug)
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
        ]"
        :title="!canAccess(phase.slug) ? 'Complete previous phases first' : ''"
      >
        <svg
          v-if="isPhaseCompleted(phase.slug) && currentPhase !== phase.slug"
          class="w-4 h-4"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
        <span>{{ phase.label }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PhaseSlug } from '../composables/useAuditPhase'
import { computed } from 'vue'

interface Props {
  currentPhase: PhaseSlug
  phaseCompletion: Record<PhaseSlug, boolean>
  phases: Array<{ slug: PhaseSlug; label: string }>
  canAccessPhase: (slug: PhaseSlug) => boolean
  isPhaseCompleted: (slug: PhaseSlug) => boolean
  onNavigate: (slug: PhaseSlug) => void
}

const props = defineProps<Props>()

// Check user role - admin and auditor can access all phases
const userRole = computed(() => localStorage.getItem('userRole') || 'user')
const isAdminOrAuditor = computed(() => userRole.value === 'admin' || userRole.value === 'auditor')

// Override canAccessPhase for admin/auditor
const canAccess = (slug: PhaseSlug) => {
  if (isAdminOrAuditor.value) return true
  return props.canAccessPhase(slug)
}
</script>

<style scoped></style>
