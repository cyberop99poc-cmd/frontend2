<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div 
      class="fixed inset-0 bg-black/50 backdrop-blur-sm" 
      @click="closeModal"
    ></div>
    
    <!-- Modal -->
    <div class="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="sticky top-0 bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-6 border-b border-purple-800">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h2 class="text-2xl font-bold text-white">Status Maklum Balas Ke Atas Penemuan</h2>
              <p class="text-purple-100 text-sm mt-1">Semua status maklum balas penemuan audit</p>
            </div>
          </div>
          <button 
            @click="closeModal"
            class="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Summary Stats -->
      <div class="bg-gradient-to-r from-gray-50 to-purple-50 px-8 py-4 border-b border-gray-200 flex gap-6">
        <div class="flex items-center gap-2">
          <span class="text-2xl font-bold text-gray-800">{{ findingsData.length }}</span>
          <span class="text-sm text-gray-600">Jumlah Penemuan</span>
        </div>
        <div class="w-px bg-gray-300"></div>
        <div class="flex items-center gap-2">
          <span class="text-2xl font-bold text-emerald-600">{{ byResponseType.answered }}</span>
          <span class="text-sm text-gray-600">Menjawab Soalan</span>
        </div>
        <div class="w-px bg-gray-300"></div>
        <div class="flex items-center gap-2">
          <span class="text-2xl font-bold text-red-600">{{ byResponseType.unanswered }}</span>
          <span class="text-sm text-gray-600">Tidak Menjawab</span>
        </div>
        <div class="w-px bg-gray-300"></div>
        <div class="flex items-center gap-2">
          <span class="text-2xl font-bold text-gray-600">{{ byResponseType.notApplicable }}</span>
          <span class="text-sm text-gray-600">Tidak Berkenaan</span>
        </div>
      </div>

      <!-- Content -->
      <div class="p-8">
        <div v-if="findingsData.length === 0" class="text-center py-12">
          <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p class="text-gray-500 text-lg font-semibold">Tiada penemuan ditemui</p>
          <p class="text-gray-400 text-sm mt-2">Mulai membuat penemuan untuk melihatnya di sini</p>
        </div>

        <div v-else class="space-y-4">
          <!-- Findings grouped by response type -->
          <div v-for="responseGroup in groupedFindings" :key="responseGroup.responseType" class="mb-8">
            <div class="flex items-center gap-3 mb-4">
              <div :class="getResponseColorClass(responseGroup.responseType)" class="px-3 py-1 rounded-full text-sm font-bold">
                {{ getResponseLabel(responseGroup.responseType) }}
              </div>
              <span class="text-sm text-gray-600 font-semibold">{{ responseGroup.findings.length }} item</span>
            </div>

            <div class="space-y-3">
              <div 
                v-for="finding in responseGroup.findings" 
                :key="finding.id"
                :class="[
                  'p-4 rounded-xl border-2 transition-all hover:shadow-md',
                  getResponseBorderClass(finding.responseStatus)
                ]"
              >
                <!-- Finding Header -->
                <div class="flex items-start justify-between gap-4 mb-3">
                  <div class="flex-1">
                    <h4 class="font-bold text-gray-900 text-sm">{{ finding.title }}</h4>
                    <p class="text-xs text-gray-600 mt-1">{{ finding.description }}</p>
                  </div>
                  <div :class="getResponseBadgeClass(finding.responseStatus)" class="px-2 py-1 rounded text-xs font-semibold whitespace-nowrap">
                    {{ getResponseLabel(finding.responseStatus) }}
                  </div>
                </div>

                <!-- Finding Details -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3 py-3 border-t border-gray-100 mt-3">
                  <div>
                    <p class="text-xs text-gray-500 font-semibold uppercase">Kategori</p>
                    <p class="text-sm font-bold text-gray-800 mt-1">{{ finding.kategori }}</p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500 font-semibold uppercase">Kriteria</p>
                    <p class="text-sm font-bold text-gray-800 mt-1">{{ finding.kriteria }}</p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500 font-semibold uppercase">Tarikh</p>
                    <p class="text-sm font-bold text-gray-800 mt-1">{{ formatDate(finding.date) }}</p>
                  </div>
                  <div v-if="finding.responseDate">
                    <p class="text-xs text-gray-500 font-semibold uppercase">Tarikh Maklum Balas</p>
                    <p class="text-sm font-bold text-gray-800 mt-1">{{ formatDate(finding.responseDate) }}</p>
                  </div>
                </div>

                <!-- Response Remarks if exists -->
                <div v-if="finding.responseRemarks" class="mt-3 pt-3 border-t border-gray-100">
                  <p class="text-xs text-gray-500 font-semibold uppercase mb-1">Maklum Balas</p>
                  <p class="text-sm text-gray-700">{{ finding.responseRemarks }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="sticky bottom-0 bg-gray-50 px-8 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
        <button 
          @click="closeModal"
          class="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
        >
          Tutup
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Finding {
  id: string
  title: string
  description: string
  kategori: string
  kriteria: string
  date: string
  responseDate?: string
  responseStatus: 'Menjawab Soalan' | 'Tidak Menjawab Soalan' | 'Tidak Berkenaan'
  responseRemarks?: string
}

interface Props {
  isOpen: boolean
  findingsData: Finding[]
}

interface Emits {
  (e: 'close'): void
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  findingsData: () => []
})

const emit = defineEmits<Emits>()

const closeModal = () => {
  emit('close')
}

const groupedFindings = computed(() => {
  const groups: Record<string, Finding[]> = {
    'Menjawab Soalan': [],
    'Tidak Menjawab Soalan': [],
    'Tidak Berkenaan': []
  }

  props.findingsData.forEach(finding => {
    if (finding.responseStatus in groups) {
      groups[finding.responseStatus].push(finding)
    }
  })

  // Return only non-empty groups in order
  const responseOrder = ['Menjawab Soalan', 'Tidak Menjawab Soalan', 'Tidak Berkenaan']
  return responseOrder
    .filter(type => groups[type].length > 0)
    .map(type => ({
      responseType: type,
      findings: groups[type]
    }))
})

const byResponseType = computed(() => ({
  answered: props.findingsData.filter(f => f.responseStatus === 'Menjawab Soalan').length,
  unanswered: props.findingsData.filter(f => f.responseStatus === 'Tidak Menjawab Soalan').length,
  notApplicable: props.findingsData.filter(f => f.responseStatus === 'Tidak Berkenaan').length
}))

const getResponseLabel = (responseStatus: string): string => {
  const labels: Record<string, string> = {
    'Menjawab Soalan': '✅ Menjawab Soalan',
    'Tidak Menjawab Soalan': '❌ Tidak Menjawab Soalan',
    'Tidak Berkenaan': '⊘ Tidak Berkenaan'
  }
  return labels[responseStatus] || responseStatus
}

const getResponseColorClass = (responseStatus: string): string => {
  const colors: Record<string, string> = {
    'Menjawab Soalan': 'bg-emerald-100 text-emerald-700',
    'Tidak Menjawab Soalan': 'bg-red-100 text-red-700',
    'Tidak Berkenaan': 'bg-gray-100 text-gray-700'
  }
  return colors[responseStatus] || 'bg-gray-100 text-gray-700'
}

const getResponseBadgeClass = (responseStatus: string): string => {
  const colors: Record<string, string> = {
    'Menjawab Soalan': 'bg-emerald-200 text-emerald-800',
    'Tidak Menjawab Soalan': 'bg-red-200 text-red-800',
    'Tidak Berkenaan': 'bg-gray-200 text-gray-800'
  }
  return colors[responseStatus] || 'bg-gray-200 text-gray-800'
}

const getResponseBorderClass = (responseStatus: string): string => {
  const colors: Record<string, string> = {
    'Menjawab Soalan': 'border-emerald-200 bg-emerald-50/30',
    'Tidak Menjawab Soalan': 'border-red-200 bg-red-50/30',
    'Tidak Berkenaan': 'border-gray-200 bg-gray-50/30'
  }
  return colors[responseStatus] || 'border-gray-200'
}

const formatDate = (date: string): string => {
  if (!date) return '-'
  const d = new Date(date)
  return d.toLocaleDateString('ms-MY', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<style scoped>
/* Smooth scrolling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
