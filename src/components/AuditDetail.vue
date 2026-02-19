<template>
  <main class="p-8 space-y-8">
    <!-- Back Button -->
    <div class="flex items-center gap-2">
      <router-link to="/history" class="text-red-600 hover:text-red-700 font-medium text-sm flex items-center gap-1">
        ← Back to History
      </router-link>
    </div>

    <!-- Page Header -->
    <div v-if="currentAudit">
      <h1 class="text-4xl font-bold text-gray-800">Audit Details</h1>
      <p class="text-gray-600 mt-2">
        <span class="mono font-semibold text-red-600">{{ currentAudit.audit_id }}</span> • {{ formatDate(currentAudit.audit_date) }}
      </p>
    </div>

    <!-- Not Found State -->
    <div v-else class="bg-white rounded-2xl shadow-lg border border-red-100/50 p-12 text-center">
      <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h2 class="text-2xl font-bold text-gray-800 mb-2">Audit Not Found</h2>
      <p class="text-gray-600 mb-6">The audit record you're looking for doesn't exist.</p>
      <router-link to="/history" class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
        Return to History
      </router-link>
    </div>

    <!-- Audit Summary -->
    <div v-if="currentAudit" class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white rounded-2xl shadow-lg border border-red-100/50 p-6">
        <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Auditor Name</p>
        <p class="text-2xl font-bold text-gray-800 mt-2">{{ currentAudit.auditor_name }}</p>
      </div>

      <div class="bg-white rounded-2xl shadow-lg border border-emerald-100/50 p-6">
        <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Pass Count</p>
        <p class="text-2xl font-bold text-emerald-600 mt-2">{{ currentAudit.passCount }}</p>
      </div>

      <div class="bg-white rounded-2xl shadow-lg border border-red-100/50 p-6">
        <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Fail Count</p>
        <p class="text-2xl font-bold text-red-600 mt-2">{{ currentAudit.failCount }}</p>
      </div>

      <div class="bg-white rounded-2xl shadow-lg border border-amber-100/50 p-6">
        <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Average Score</p>
        <p class="text-2xl font-bold text-amber-600 mt-2">{{ currentAudit.avgScore }}/5</p>
      </div>
    </div>

    <!-- Scores Detail -->
    <div v-if="currentAudit" class="bg-white rounded-2xl shadow-lg border border-red-100/50 overflow-hidden">
      <div class="bg-gradient-to-r from-red-600 to-red-700 px-8 py-6">
        <h2 class="text-xl font-bold text-white">📊 Detailed Scores</h2>
        <p class="text-red-100 text-sm mt-2">Complete scoring breakdown</p>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-gray-50 border-b border-red-100">
              <th class="px-8 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Question ID</th>
              <th class="px-8 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Score</th>
              <th class="px-8 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-red-50">
            <tr v-for="(score, questionId) in currentAudit.scores" :key="questionId" class="hover:bg-gray-50">
              <td class="px-8 py-4">
                <span class="mono text-sm font-semibold text-red-600">{{ questionId }}</span>
              </td>
              <td class="px-8 py-4">
                <span class="text-sm font-bold">{{ score }}/5</span>
              </td>
              <td class="px-8 py-4">
                <span v-if="score >= 3" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                  ✓ Pass
                </span>
                <span v-else class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                  ✗ Fail
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Actions -->
    <div v-if="currentAudit" class="flex gap-4">
      <button
        @click="printAudit"
        class="px-6 py-3 bg-white border-2 border-red-200 text-red-600 font-semibold rounded-xl hover:bg-red-50 transition-all flex items-center gap-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
        Print
      </button>
      <button
        @click="downloadAudit"
        class="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl hover:shadow-lg transition-all shadow-md flex items-center gap-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface Audit {
  audit_id: string
  auditor_name: string
  audit_date: string
  passCount: number
  failCount: number
  avgScore: number
  scores: { [key: string]: number }
}

const route = useRoute()
const router = useRouter()
const currentAudit = ref<Audit | null>(null)

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

const printAudit = () => {
  window.print()
}

const downloadAudit = () => {
  if (!currentAudit.value) return
  const dataStr = JSON.stringify(currentAudit.value, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${currentAudit.value.audit_id}.json`
  link.click()
  URL.revokeObjectURL(url)
}

onMounted(() => {
  const auditId = route.params.auditId as string
  const stored = localStorage.getItem('auditData')
  if (stored) {
    const allAudits = JSON.parse(stored)
    const found = allAudits.find((a: Audit) => a.audit_id === auditId)
    currentAudit.value = found || null
  }
})
</script>

<style scoped>
</style>
