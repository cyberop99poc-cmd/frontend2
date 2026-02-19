<template>
  <main class="p-8 space-y-8">
    <!-- Form Section -->
    <section class="space-y-6">
      <div class="bg-white rounded-2xl shadow-lg border border-red-100/50 p-8">
        <h2 class="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent mb-6">📝
          Butiran Sesi Audit</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Nama Juruaudit</label>
            <input v-model="auditorName" type="text" placeholder="Masukkan nama juruaudit"
              class="w-full px-4 py-3 border border-red-200/50 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-sm bg-white/50 backdrop-blur">
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Tarikh Audit</label>
            <input v-model="auditDate" type="date"
              class="w-full px-4 py-3 border border-red-200/50 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-sm mono bg-white/50 backdrop-blur">
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">ID Audit</label>
            <input type="text" :value="auditId" readonly
              class="w-full px-4 py-3 border border-red-200/50 rounded-xl bg-red-50/50 text-gray-600 text-sm mono">
          </div>
        </div>
      </div>

      <!-- Audit Table -->
      <div class="bg-white rounded-2xl shadow-lg border border-red-100/50 overflow-hidden">
        <div class="bg-gradient-to-r from-red-600 to-red-700 px-8 py-6 flex items-center justify-between">
          <div class="flex-1">
            <div class="flex items-center gap-3">
              <h2 class="text-xl font-bold text-white">🔍 Pengurusan Latihan - Senarai Semak Audit</h2>
              <button @click="showRujukanModal = true"
                class="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold rounded-lg transition-all backdrop-blur">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Rujuk
              </button>
              <button @click="handleManualSave"
                class="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold rounded-lg transition-all backdrop-blur">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                Simpan
              </button>
            </div>
            <p class="text-red-100 text-sm mt-2">Tandakan setiap item berdasarkan pemeriksaan anda</p>
          </div>
          <div class="flex items-center gap-3">
            <div class="text-lg text-red-100 font-semibold">Jumlah Markah</div>
            <span
              class="inline-flex items-center px-6 py-3 rounded-xl text-2xl font-bold bg-white/15 text-white shadow-sm">
              {{ achievedPercentage }}%
            </span>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse text-sm">
            <thead>
              <tr class="bg-red-50 border-b-2 border-red-200">
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase w-12">Bil</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Perkara</th>
                <th class="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase w-20">Markah Penuh</th>
                <th colspan="6" class="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Skala Markah
                </th>
                <th class="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase w-20">Markah Dapat</th>
                <th class="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase w-24">Penemuan</th>
              </tr>
              <tr class="bg-white border-b border-red-100">
                <th colspan="3"></th>
                <th class="px-2 py-2 text-center text-xs text-gray-600 font-medium">0</th>
                <th class="px-2 py-2 text-center text-xs text-gray-600 font-medium">1</th>
                <th class="px-2 py-2 text-center text-xs text-gray-600 font-medium">2</th>
                <th class="px-2 py-2 text-center text-xs text-gray-600 font-medium">3</th>
                <th class="px-2 py-2 text-center text-xs text-gray-600 font-medium">4</th>
                <th class="px-2 py-2 text-center text-xs text-gray-600 font-medium">5</th>
                <th colspan="2"></th>
              </tr>
            </thead>
            <tbody>
              <template v-for="item in flattenedItems" :key="`${item.key}`">
                <tr v-if="!item.isHeader && !item.isSubHeader"
                  :class="['border-b border-red-50 hover:bg-red-50/30 transition-colors']">
                  <td class="px-4 py-3">{{ item.bil }}</td>
                  <td class="px-4 py-3 text-gray-700">{{ item.perkara }}</td>
                  <td v-if="shouldShowMarkah(item.key)" class="px-4 py-3 text-center font-mono text-gray-600"
                    :rowspan="getSubItemCount(item.key)">
                    {{ getMarkahPenuhDisplay(item.key) }}
                  </td>
                  <td v-for="score in [0, 1, 2, 3, 4, 5]" :key="score" class="px-2 py-3 text-center">
                    <input v-if="item.markahPenuh" type="radio" :name="`score-${item.key}`" :value="score"
                      @change="setScore(item.key, score)"
                      class="w-4 h-4 cursor-pointer text-red-600 focus:ring-red-500">
                  </td>
                  <td v-if="shouldShowMarkahDapat(item.key)"
                    class="px-4 py-3 text-center font-mono font-bold text-gray-700"
                    :rowspan="getSubItemCount(item.key)">
                    {{ getGroupSumDisplay(item.key) !== '' ? getGroupSumDisplay(item.key) : '-' }}
                  </td>
                  <td class="px-2 py-3 text-center space-x-1.5 flex items-center justify-center">
                    <button @click="openDocumentModal(item)"
                      class="inline-flex items-center justify-center w-8 h-8 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                      title="Tambah Dokumen & Penemuan">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <button @click="openExampleModal(item)"
                      class="inline-flex items-center justify-center w-8 h-8 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                      title="Contoh Penemuan">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 8h.01m-.01 4v4m0 4a8 8 0 110-16 8 8 0 010 16z" />
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr v-else-if="item.isSubHeader" :class="['bg-gray-50 border-b border-red-50']">
                  <td class="px-4 py-3 font-bold">{{ item.bil }}</td>
                  <td class="px-4 py-3 text-gray-700 font-bold">{{ item.perkara }}</td>
                  <td colspan="8"></td>
                </tr>
                <tr v-else :class="['bg-gray-100 border-b-2 border-red-200']">
                  <td colspan="10" class="px-4 py-3 font-bold text-gray-800">{{ item.perkara }}</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <div
          class="px-8 py-4 bg-gradient-to-r from-red-50 to-red-50 border-t border-red-200/50 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="text-sm text-gray-700">
              Selesai: <span class="font-semibold text-red-600">{{ completedCount }}</span> / <span>{{ totalItems
              }}</span> item
            </div>
            <div class="w-48 h-2.5 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-red-600 to-red-700 transition-all duration-300"
                :style="{ width: completionPercentage + '%' }"></div>
            </div>
          </div>
          <button @click="submitAudit()" :disabled="completedCount === 0"
            class="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl hover:shadow-lg transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Hantar Audit
          </button>
        </div>
      </div>
    </section>

    <DocumentProofModal :show="showDocumentModal" :item="currentDocumentItem" :formType="formType" :phase="currentPhase"
      @close="showDocumentModal = false" />

    <!-- Contoh Penemuan Modal -->
    <div v-if="showExampleModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      @click.self="closeExampleModal()">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div class="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 class="text-xl font-bold text-white">💡 Contoh Penemuan</h3>
            <p v-if="currentExampleItem" class="text-purple-100 text-sm mt-1">{{ currentExampleItem.bil }}. {{
              currentExampleItem.perkara }}</p>
          </div>
          <button @click="closeExampleModal()" class="text-white hover:bg-white/20 rounded-lg p-1 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="p-6 space-y-4">
          <div class="space-y-3">
            <div v-for="(example, idx) in getExamplesForItem(currentExampleItem?.key)" :key="idx"
              class="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <div class="flex items-start gap-3">
                <div
                  class="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {{ idx + 1 }}
                </div>
                <div class="flex-1">
                  <p class="text-sm font-semibold text-gray-800 mb-2">{{ example.title }}</p>
                  <p class="text-xs text-gray-700 leading-relaxed">{{ example.description }}</p>
                  <div v-if="example.kategori" class="mt-2">
                    <span :class="['text-xs font-semibold px-2 py-1 rounded-full',
                      example.kategori === 'Kritikal' ? 'bg-red-100 text-red-700' :
                        example.kategori === 'Lazim' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-orange-100 text-orange-700'
                    ]">
                      {{ example.kategori }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <p v-if="getExamplesForItem(currentExampleItem?.key).length === 0"
              class="text-center text-gray-500 text-sm py-4">
              Tiada contoh penemuan untuk item ini
            </p>
          </div>
        </div>
        <div class="px-6 py-4 bg-gray-50 border-t flex justify-end">
          <button @click="closeExampleModal()"
            class="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold">
            Tutup
          </button>
        </div>
      </div>
    </div>

    <!-- Rujukan Modal -->
    <div v-if="showRujukanModal" @click.self="showRujukanModal = false"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div class="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 flex-shrink-0">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-2xl font-bold text-white flex items-center gap-3">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Rujukan Audit
              </h3>
              <p class="text-blue-100 mt-1">Dokumen rujukan dan sumber maklumat</p>
            </div>
            <button @click="showRujukanModal = false"
              class="text-white/80 hover:text-white hover:bg-white/20 rounded-xl p-2 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div class="p-8 overflow-y-auto flex-1">
          <div class="space-y-6">
            <!-- Reference Category 1 -->
            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <h4 class="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                Perintah & Arahan
              </h4>
              <ul class="space-y-3">
                <li class="flex items-start gap-3">
                  <span class="text-blue-600 font-bold">•</span>
                  <div>
                    <p class="font-semibold text-gray-800">Direktif Ketua Pertahanan</p>
                    <p class="text-sm text-gray-600">Arahan dan polisi berkaitan pengurusan latihan</p>
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-blue-600 font-bold">•</span>
                  <div>
                    <p class="font-semibold text-gray-800">PROTAP (Prosedur Tetap Operasi)</p>
                    <p class="text-sm text-gray-600">Prosedur standard operasi unit</p>
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-blue-600 font-bold">•</span>
                  <div>
                    <p class="font-semibold text-gray-800">Manual Asas Tentang (MASt)</p>
                    <p class="text-sm text-gray-600">Panduan asas latihan dan operasi</p>
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-blue-600 font-bold">•</span>
                  <div>
                    <p class="font-semibold text-gray-800">Manual Latihan (MM 0.3.15A)</p>
                    <p class="text-sm text-gray-600">Garis panduan pelaksanaan latihan</p>
                  </div>
                </li>
              </ul>
            </div>

            <!-- Reference Category 2 -->
            <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <h4 class="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                    clip-rule="evenodd" />
                </svg>
                Standard & Penilaian
              </h4>
              <ul class="space-y-3">
                <li class="flex items-start gap-3">
                  <span class="text-green-600 font-bold">•</span>
                  <div>
                    <p class="font-semibold text-gray-800">ARTEP (Army Training and Evaluation Program)</p>
                    <p class="text-sm text-gray-600">Program penilaian dan latihan standard</p>
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-green-600 font-bold">•</span>
                  <div>
                    <p class="font-semibold text-gray-800">Kriteria Penilaian Kompetensi</p>
                    <p class="text-sm text-gray-600">Standard dan rubrik penilaian</p>
                  </div>
                </li>
              </ul>
            </div>

            <!-- Reference Category 3 -->
            <div class="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
              <h4 class="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                    clip-rule="evenodd" />
                </svg>
                Rekod & Laporan
              </h4>
              <ul class="space-y-3">
                <li class="flex items-start gap-3">
                  <span class="text-amber-600 font-bold">•</span>
                  <div>
                    <p class="font-semibold text-gray-800">Buku Rekod Latihan (BRL)</p>
                    <p class="text-sm text-gray-600">Dokumentasi lengkap aktiviti latihan</p>
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-amber-600 font-bold">•</span>
                  <div>
                    <p class="font-semibold text-gray-800">Laporan Pasca Eksesais</p>
                    <p class="text-sm text-gray-600">Analisis dan kajian selepas latihan</p>
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-amber-600 font-bold">•</span>
                  <div>
                    <p class="font-semibold text-gray-800">Minit Mesyuarat Latihan</p>
                    <p class="text-sm text-gray-600">Keputusan dan tindakan susulan</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-end flex-shrink-0">
          <button @click="showRujukanModal = false"
            class="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transition-all font-semibold">
            Tutup
          </button>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div
      :class="['fixed bottom-6 right-6 px-6 py-3 rounded-xl shadow-lg transform transition-all duration-300 flex items-center gap-3 z-50', toastVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0', toastType === 'success' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white' : 'bg-gradient-to-r from-red-500 to-orange-500 text-white']">
      <svg v-if="toastType === 'success'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
      {{ toastMessage }}
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useSync } from '../composables/useSync'
import DocumentProofModal from './DocumentProofModal.vue'

interface AuditItem {
  bil: string
  perkara: string
  markahPenuh?: string | number
  isHeader?: boolean
  isSubHeader?: boolean
  subItems?: AuditItem[]
  parentMarkahPenuh?: number
  parentLeafCount?: number
  showMarkahPenuh?: boolean
  showMarkahDapat?: boolean
  parentKey?: string
}

interface AuditScore {
  [key: string]: number | null
}

const sync = useSync()

// Core State
const auditorName = ref('')
const auditDate = ref(new Date().toISOString().split('T')[0])
const auditId = computed(() => `AUD-${Date.now()}`)
const auditScores = ref<AuditScore>({})
const currentPhase = ref<'self' | 'commander' | 'aptd'>('self')

// UI State
const showRujukanModal = ref(false)
const showExampleModal = ref(false)
const exampleItem = ref<AuditItem | null>(null)
const toastVisible = ref(false)
const toastMessage = ref('')
const toastType = ref<'success' | 'error'>('success')

// Document Proof Modal State
const showDocumentModal = ref(false)
const currentDocumentItem = ref<AuditItem | null>(null)

// Draft and metadata keys per phase
const draftKeyForPhase = (phaseSlug: string) => `training_auditScoresDraft_${phaseSlug}`
const findingsDataKeyForPhase = (phaseSlug: string) => `findingsData_${phaseSlug}`
const auditDataKeyForPhase = (phaseSlug: string) => `auditData_${phaseSlug}`

const formType = 'Pengurusan Latihan'
const penilaianTypeId = 1

const openDocumentModal = (item: AuditItem) => {
  currentDocumentItem.value = item
  showDocumentModal.value = true
}

const openExampleModal = (item: AuditItem) => {
  exampleItem.value = item
  showExampleModal.value = true
}

const closeExampleModal = () => {
  showExampleModal.value = false
  exampleItem.value = null
}

// Persisted drafts - Using Backend API
const saveScoresDraft = async () => {
  try {
    const draftData = {
      scores: auditScores.value,
      auditorName: auditorName.value,
      auditDate: auditDate.value
    }
    localStorage.setItem(draftKeyForPhase(currentPhase.value), JSON.stringify(draftData))
    await sync.pushDraft(currentPhase.value, draftData)
  } catch (error) {
    console.error('Error saving draft:', error)
  }
}

const handleManualSave = async () => {
  if (!auditorName.value) {
    showToast('Sila masukkan nama juruaudit', 'error')
    return
  }
  await saveScoresDraft()
  try {
    await sync.prepareAudit({
      NamaPenilai: auditorName.value,
      NoPenilaian: auditId.value,
      Tarikh: auditDate.value,
      JenisPenilaian: {
        JenisPenilaianID: penilaianTypeId,
        JenisPenilaianName: "Pengurusan Latihan"
      }
    })
    showToast('Sesi audit berjaya disimpan ke pangkalan data', 'success')
  } catch (err: any) {
    console.error('Manual save failed:', err)
    showToast(err.message || 'Gagal menyimpan ke pangkalan data', 'error')
  }
}

const loadScoresDraft = async (phaseSlug: string) => {
  try {
    const raw = localStorage.getItem(draftKeyForPhase(phaseSlug))
    if (raw) {
      const data = JSON.parse(raw)
      auditScores.value = data.scores || {}
      auditorName.value = data.auditorName || ''
      auditDate.value = data.auditDate || new Date().toISOString().split('T')[0]
      return
    }
  } catch (e) {
    console.error('Error loading draft:', e)
  }
  auditScores.value = {}
}

const loadMetaForPhase = async (phaseSlug: string) => {
  try {
    const raw = localStorage.getItem(auditDataKeyForPhase(phaseSlug))
    if (raw) {
      const records = JSON.parse(raw)
      const last = records[records.length - 1]
      if (last) {
        auditorName.value = last.auditor_name || ''
        auditDate.value = last.audit_date || new Date().toISOString().split('T')[0]
      }
    }
  } catch (e) {
    console.error('Error loading metadata:', e)
  }
}

const exampleFindings = {
  'item-1-a-(1)': [
    {
      title: 'Arahan diterima dan difahami',
      description: 'Tim latihan telah menerima arahan bertulis dan semua ahli memahami apa yang dikehendaki.',
      kategori: 'Lazim'
    }
  ]
}

const getExamplesForItem = (key?: string): any[] => {
  if (!key) return []
  return exampleFindings[key as keyof typeof exampleFindings] || []
}

// Lifecycle and Watchers
onMounted(async () => {
  sync.initSync()
  await loadScoresDraft(currentPhase.value)
  await loadMetaForPhase(currentPhase.value)
})

watch(auditScores, () => saveScoresDraft(), { deep: true })
watch([auditorName, auditDate, currentPhase], async () => {
  try {
    await sync.pushMeta(currentPhase.value, { auditorName: auditorName.value, auditDate: auditDate.value })
  } catch (e) {
    console.error('Error saving meta:', e)
  }
})

const auditItems: AuditItem[] = [
  {
    bil: '1',
    perkara: 'Perintah/Dasar/Arahan dan Peraturan',
    isHeader: true,
    subItems: [
      {
        bil: 'a',
        perkara: 'Pasukan mempunyai dokumen berikut dalam simpanan sebagai rujukan:',
        markahPenuh: 0.10,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Direktif Latihan Panglima Formasi.' },
          { bil: '(2)', perkara: 'PROTAP Latihan yang berkait.' },
          { bil: '(3)', perkara: 'MASt – Ujian Kemahiran Menembak TD.' },
          { bil: '(4)', perkara: 'MM 0.3.15A TD - Buku Panduan LMIT TD.' }
        ]
      },
      {
        bil: 'b',
        perkara: 'Pematuhan Arahan dan Dasar Latihan:',
        markahPenuh: 0.30,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Arahan latihan tahunan disediakan mengikut format ditetapkan.' },
          { bil: '(2)', perkara: 'Laporan latihan tahunan pasukan mempunyai maklumat berikut:' },
          { bil: '(a)', perkara: 'Penyata latihan.' },
          { bil: '(b)', perkara: 'Objektif.' },
          { bil: '(c)', perkara: 'Analisa pencapaian (Plan, Do, Check, Act)' },
          { bil: '(d)', perkara: 'Pelan/tindakan susulan.' }
        ]
      }
    ]
  },
  {
    bil: '2',
    perkara: 'Latihan Individu',
    isHeader: true,
    subItems: [
      {
        bil: 'a',
        perkara: 'Ujian Kecergasan Asas (UKA) Penggal Pertama - setiap tahun:',
        markahPenuh: 0.35,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Arahan pelaksanaan ujian dikeluarkan.' },
          { bil: '(2)', perkara: 'Laporan dan penyata ujian disediakan.' },
          { bil: '(3)', perkara: 'Pengesahan ujian dilaksanakan.' }
        ]
      },
      {
        bil: 'b',
        perkara: 'Ujian Kecergasan Asas (UKA) Penggal Kedua - setiap tahun:',
        markahPenuh: 0.35,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Arahan pelaksanaan ujian dikeluarkan.' },
          { bil: '(2)', perkara: 'Laporan dan penyata ujian disediakan.' },
          { bil: '(3)', perkara: 'Pengesahan ujian dilaksanakan.' }
        ]
      },
      {
        bil: 'c',
        perkara: 'Ujian Kecergasan Tempur (UKT) - setiap tahun:',
        markahPenuh: 0.35,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Arahan pelaksanaan ujian dikeluarkan.' },
          { bil: '(2)', perkara: 'Laporan dan penyata ujian disediakan.' },
          { bil: '(3)', perkara: 'Pengesahan ujian dilaksanakan.' }
        ]
      },
      {
        bil: 'd',
        perkara: 'Ujian Kelayakan dan Kemahiran Individu (UKKI):',
        markahPenuh: 0.35,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Arahan pelaksanaan ujian dikeluarkan.' },
          { bil: '(2)', perkara: 'Laporan dan penyata ujian disediakan.' },
          { bil: '(3)', perkara: 'Pengesahan ujian dilaksanakan.' }
        ]
      },
      {
        bil: 'e',
        perkara: 'Latihan Menembak Individu dan Tim (LMIT) - kitaran 24 bulan:',
        markahPenuh: 0.35,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Arahan pelaksanaan latihan dikeluarkan.' },
          { bil: '(2)', perkara: 'Laporan latihan disediakan.' },
          { bil: '(3)', perkara: 'Pengesahan latihan dilaksanakan.' }
        ]
      },
      {
        bil: 'f',
        perkara: 'Ujian Jalan Laju (UJL) 5, 8, 12 dan 15 km - setiap tahun:',
        markahPenuh: 0.35,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Arahan pelaksanaan ujian dikeluarkan.' },
          { bil: '(2)', perkara: 'Laporan dan penyata ujian disediakan.' },
          { bil: '(3)', perkara: 'Pengesahan ujian dilaksanakan.' }
        ]
      },
      {
        bil: 'g',
        perkara: 'Latihan Jasmani - mengikut arahan latihan:',
        markahPenuh: 0.30,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Arahan pelaksanaan dikeluarkan.' },
          { bil: '(2)', perkara: 'Pengesahan pelaksanaan mengikut pengarahan formasi.' }
        ]
      },
      {
        bil: 'h',
        perkara: 'Latihan Sukan - mengikut arahan latihan:',
        markahPenuh: 0.30,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Arahan pelaksanaan dikeluarkan.' },
          { bil: '(2)', perkara: 'Pelaksanaan dan penyata latihan disediakan.' }
        ]
      }
    ]
  },
  {
    bil: '3',
    perkara: 'Latihan Kolektif',
    isHeader: true,
    subItems: [
      {
        bil: 'a',
        perkara: 'Eksesais Pasukan:',
        markahPenuh: 0.30,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Arahan pelaksanaan dikeluarkan.' },
          { bil: '(2)', perkara: 'Laporan dan penyata latihan disediakan.' },
          { bil: '(3)', perkara: 'Pengesahan dilaksanakan.' }
        ]
      },
      {
        bil: 'b',
        perkara: 'Operasi Pasukan (jika ada):',
        markahPenuh: 0.30,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Arahan pelaksanaan dikeluarkan.' },
          { bil: '(2)', perkara: 'Laporan operasi disediakan.' }
        ]
      },
      {
        bil: 'c',
        perkara: 'Eksesais/Latihan Gabungan/Latihan Bersama (jika ada):',
        markahPenuh: 0.30,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Arahan pelaksanaan dikeluarkan.' },
          { bil: '(2)', perkara: 'Laporan dan penyata latihan disediakan.' }
        ]
      },
      {
        bil: 'd',
        perkara: 'Eksesais Pasak Bumi (EPB):',
        markahPenuh: 0.30,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Arahan pelaksanaan dikeluarkan.' },
          { bil: '(2)', perkara: 'Laporan dan penyata latihan disediakan.' },
          { bil: '(3)', perkara: 'Pengesahan dilaksanakan.' }
        ]
      },
      {
        bil: 'e',
        perkara: 'Latihan Kepakaran:',
        markahPenuh: 0.30,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Arahan pelaksanaan dikeluarkan.' },
          { bil: '(2)', perkara: 'Laporan dan penyata latihan disediakan.' },
          { bil: '(3)', perkara: 'Pengesahan dilaksanakan.' }
        ]
      },
      {
        bil: 'f',
        perkara: 'Ujian ARTEP (kepakaran Kor):',
        markahPenuh: 0.30,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Arahan pelaksanaan dikeluarkan.' },
          { bil: '(2)', perkara: 'Laporan dan penyata ujian disediakan.' },
          { bil: '(3)', perkara: 'Pengesahan dilaksanakan.' }
        ]
      },
      {
        bil: 'g',
        perkara: 'Kem Kemahiran Senjata (KKS)/Latihan Peningkatan Tempur (LPT):',
        markahPenuh: 0.30,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Arahan pelaksanaan dikeluarkan.' },
          { bil: '(2)', perkara: 'Laporan dan penyata latihan.' },
          { bil: '(3)', perkara: 'Pengesahan ujian dilaksanakan.' }
        ]
      },
      {
        bil: 'h',
        perkara: 'Latihan Operasi di Kawasan Terbina (Operation in Built-Up Area - OBUA):',
        markahPenuh: 0.30,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Arahan pelaksanaan dikeluarkan.' },
          { bil: '(2)', perkara: 'Laporan dan penyata latihan disediakan.' },
          { bil: '(3)', perkara: 'Pengesahan ujian dilaksanakan.' }
        ]
      },
      {
        bil: 'i',
        perkara: 'Latihan Ketenteraman Awam (KA):',
        markahPenuh: 0.30,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Arahan pelaksanaan dikeluarkan.' },
          { bil: '(2)', perkara: 'Laporan dan penyata latihan disediakan.' }
        ]
      },
      {
        bil: 'j',
        perkara: 'Latihan Taktikal Tanpa Trup (LTTT):',
        markahPenuh: 0.30,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Arahan pelaksanaan dikeluarkan.' },
          { bil: '(2)', perkara: 'Laporan dan penyata latihan disediakan.' }
        ]
      },
      {
        bil: 'k',
        perkara: 'Latihan Persatuan Kadet Bersatu Malaysia (PKBM) - pasukan berkaitan sahaja :',
        markahPenuh: 0.30,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Latihan Mingguan.' },
          { bil: '(2)', perkara: 'Perkhemahan Tahunan.' }
        ]
      },
      {
        bil: 'l',
        perkara: 'Latihan Askar Wataniah (AW) - pasukan AW sahaja :',
        markahPenuh: 0.30,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Aktiviti/promosi/hebahan pengambilan dilaksanakan.' },
          { bil: '(2)', perkara: 'Latihan Tempatan dilaksanakan.' },
          { bil: '(3)', perkara: 'Latihan Berterusan dilaksanakan.' },
          { bil: '(4)', perkara: 'Latihan Kem Tahunan dilaksanakan.' },
          { bil: '(5)', perkara: 'Penglibatan eksesais/operasi/latihan bersama Angkatan Tetap dilaksanakan.' }
        ]
      }
    ]
  },
  {
    bil: '4',
    perkara: 'Hari Pengajian PEG/PTTK/PTTR/Seminar/Bengkel',
    isHeader: true,
    subItems: [
      {
        bil: 'a',
        perkara: 'Arahan pelaksanaan dikeluarkan',
        markahPenuh: 0.30
      },
      {
        bil: 'b',
        perkara: 'Laporan dan Penyata penglibatan anggota',
        markahPenuh: 0.30
      },
      {
        bil: 'c',
        perkara: 'Kekerapan penganjuran mengikut pengarahan',
        markahPenuh: 0.30
      }
    ]
  },
  {
    bil: '5',
    perkara: 'Pengurusan Latihan Pasukan',
    isHeader: true,
    subItems: [
      {
        bil: 'a',
        perkara: 'Organisasi latihan:',
        markahPenuh: 0.30,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Jawatankuasa latihan pasukan ditubuhkan.' },
          { bil: '(2)', perkara: 'Mesyuarat latihan dilaksanakan secara berpenggal setiap tahun.' },
          { bil: '(3)', perkara: 'Pemantauan latihan dilaksanakan oleh Tim Pemantauan.' }
        ]
      },
      {
        bil: 'b',
        perkara: 'Pelaporan dan penyata latihan dimajukan mengikut penggal ke formasi atasan.',
        markahPenuh: 0.30
      },
      {
        bil: 'c',
        perkara: 'Buku Rekod Latihan (BAT B 118 A):',
        markahPenuh: 0.30,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Pegangan adalah mencukupi.' },
          { bil: '(2)', perkara: 'Butir-butir perlatihan/ujian direkodkan dan kemaskini.' }
        ]
      },
      {
        bil: 'd',
        perkara: 'Penilaian tahap kompetensi (pasukan penganjur kursus sahaja):',
        markahPenuh: 0.20,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Validasi dalaman dilaksanakan.' },
          { bil: '(2)', perkara: 'Validasi luaran dilaksanakan.' }
        ]
      }
    ]
  },
  {
    bil: '6',
    perkara: 'Fasilitas/Kemudahan Latihan (sokongan Latihan)',
    isHeader: true,
    subItems: [
      {
        bil: 'a',
        perkara: 'Penambahbaikan dibuat terhadap fasilitas latihan sedia ada',
        markahPenuh: 0.20
      },
      {
        bil: 'b',
        perkara: 'Fasilitas latihan dibuat senggaran.',
        markahPenuh: 0.20
      }
    ]
  }
]

const flattenedItems = computed(() => {
  const flattened: any[] = []

  auditItems.forEach(mainItem => {
    flattened.push({
      ...mainItem,
      key: `main-${mainItem.bil}`,
      isHeader: true
    })

    if (mainItem.subItems) {
      mainItem.subItems.forEach(subItem => {
        if (subItem.subItems) {
          const leafCount = subItem.subItems.length
          const parentKey = `sub-${mainItem.bil}-${subItem.bil}`

          // Sub-header row
          flattened.push({
            ...subItem,
            key: parentKey,
            isSubHeader: true
          })

          // Leaf rows inherit parent markah and know how many siblings for rowspan/normalization
          subItem.subItems.forEach((subSubItem, idx) => {
            flattened.push({
              ...subSubItem,
              key: `item-${mainItem.bil}-${subItem.bil}-${subSubItem.bil}`,
              markahPenuh: subItem.markahPenuh,
              parentMarkahPenuh: typeof subItem.markahPenuh === 'number' ? subItem.markahPenuh : undefined,
              parentLeafCount: leafCount,
              showMarkahPenuh: idx === 0,
              showMarkahDapat: idx === 0,
              parentKey
            })
          })
        } else {
          // Leaf rows without nested children
          const leafKey = `item-${mainItem.bil}-${subItem.bil}`
          flattened.push({
            ...subItem,
            key: leafKey,
            markahPenuh: subItem.markahPenuh,
            parentMarkahPenuh: typeof subItem.markahPenuh === 'number' ? subItem.markahPenuh : undefined,
            parentLeafCount: 1,
            showMarkahPenuh: true,
            showMarkahDapat: true,
            parentKey: leafKey
          })
        }
      })
    }
  })

  return flattened
})

const totalItems = computed(() => {
  return flattenedItems.value.filter(item => !item.isHeader && !item.isSubHeader && item.markahPenuh).length
})

const shouldShowMarkah = (key: string) => {
  const item = flattenedItems.value.find(i => i.key === key)
  return item?.showMarkahPenuh === true
}

const getSubItemCount = (key: string) => {
  const item = flattenedItems.value.find(i => i.key === key)
  if (!item) return 1
  return item.parentLeafCount && item.parentLeafCount > 1 ? item.parentLeafCount : 1
}

const getMarkahPenuhDisplay = (key: string) => {
  const item = flattenedItems.value.find(i => i.key === key)
  if (!item) return ''
  const base = typeof item.parentMarkahPenuh === 'number'
    ? item.parentMarkahPenuh
    : typeof item.markahPenuh === 'number'
      ? item.markahPenuh
      : null
  return base !== null ? base.toFixed(2) : ''
}

const shouldShowMarkahDapat = (key: string) => {
  const item = flattenedItems.value.find(i => i.key === key)
  return item?.showMarkahDapat === true
}

const computeMarkahValue = (key: string): number | null => {
  const score = auditScores.value[key]
  if (score === undefined || score === null) return null

  const item = flattenedItems.value.find(i => i.key === key)
  if (!item) return null

  const baseMarkah = typeof item.parentMarkahPenuh === 'number'
    ? item.parentMarkahPenuh
    : typeof item.markahPenuh === 'number'
      ? item.markahPenuh
      : null

  if (baseMarkah === null) return null

  const maxTotal = item.parentLeafCount && item.parentLeafCount > 0
    ? item.parentLeafCount * 5
    : 5

  return (score / maxTotal) * baseMarkah
}

const getGroupSumDisplay = (key: string) => {
  const item = flattenedItems.value.find(i => i.key === key)
  if (!item) return ''

  const parentKey = item.parentKey || item.key
  const groupItems = flattenedItems.value.filter(i => !i.isHeader && !i.isSubHeader && (i.parentKey === parentKey))

  const total = groupItems.reduce((sum, g) => {
    const val = computeMarkahValue(g.key)
    return val !== null ? sum + val : sum
  }, 0)

  return total > 0 ? total.toFixed(2) : ''
}

const getGroupSumValue = (key: string): number => {
  const item = flattenedItems.value.find(i => i.key === key)
  if (!item) return 0

  const parentKey = item.parentKey || item.key
  const groupItems = flattenedItems.value.filter(i => !i.isHeader && !i.isSubHeader && (i.parentKey === parentKey))

  return groupItems.reduce((sum, g) => {
    const val = computeMarkahValue(g.key)
    return val !== null ? sum + val : sum
  }, 0)
}

const totalPossibleMarkah = computed(() => {
  return flattenedItems.value.reduce((sum, item) => {
    if (item.showMarkahPenuh) {
      const base = typeof item.parentMarkahPenuh === 'number'
        ? item.parentMarkahPenuh
        : typeof item.markahPenuh === 'number'
          ? item.markahPenuh
          : 0
      return sum + base
    }
    return sum
  }, 0)
})

const totalAchievedMarkah = computed(() => {
  return flattenedItems.value.reduce((sum, item) => {
    if (item.showMarkahDapat) {
      return sum + getGroupSumValue(item.key)
    }
    return sum
  }, 0)
})

const achievedPercentage = computed(() => {
  if (totalPossibleMarkah.value === 0) return '0.00'
  const pct = (totalAchievedMarkah.value / totalPossibleMarkah.value) * 100
  return pct.toFixed(2)
})

const completedCount = computed(() => {
  let count = 0
  flattenedItems.value.forEach(item => {
    if (!item.isHeader && !item.isSubHeader && item.markahPenuh) {
      if (auditScores.value[item.key] !== undefined && auditScores.value[item.key] !== null) {
        count++
      }
    }
  })
  return count
})

const completionPercentage = computed(() => {
  return totalItems.value > 0 ? Math.round((completedCount.value / totalItems.value) * 100) : 0
})

// (removed) getScore was unused; calculations are handled per-group via computeMarkahValue/getGroupSumDisplay

const setScore = (key: string, value: number) => {
  auditScores.value[key] = value
}

const submitAudit = async () => {
  if (!auditorName.value) {
    showToast('Sila masukkan nama juruaudit', 'error')
    return
  }
  if (!auditDate.value) {
    showToast('Sila pilih tarikh audit', 'error')
    return
  }
  if (completedCount.value === 0) {
    showToast('Sila beri markah sekurang-kurangnya satu item', 'error')
    return
  }

  // Calculate statistics
  const scores = Object.values(auditScores.value).filter(s => s !== null && s !== undefined) as number[]
  const passCount = scores.filter(s => s >= 3).length
  const failCount = scores.filter(s => s < 3).length
  const avgScore = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : 0

  const auditRecord = {
    audit_id: auditId.value,
    auditor_name: auditorName.value,
    audit_date: auditDate.value,
    penilaian_type_id: penilaianTypeId,
    phase: currentPhase.value,
    passCount,
    failCount,
    avgScore,
    scores: auditScores.value
  }

  // Save to localStorage
  try {
    const existing = JSON.parse(localStorage.getItem(auditDataKeyForPhase(currentPhase.value)) || '[]')
    existing.push(auditRecord)
    localStorage.setItem(auditDataKeyForPhase(currentPhase.value), JSON.stringify(existing))

    // 1. Save scores to the specific scores endpoint
    const markahPayload = {
      NoPenilaian: auditId.value,
      Markah: Object.entries(auditScores.value)
        .filter(([_, score]) => score !== null && score !== undefined)
        .map(([key, score]) => ({
          CriteriaKey: key,
          Score: score as number
        }))
    }

    try {
      await sync.saveScores(markahPayload)
      showToast(`Audit "${auditId.value}" berjaya dihantar!`, 'success')
    } catch (err: any) {
      console.error('Failed to save scores to database:', err)
      showToast('Gagal menyimpan markah ke pangkalan data', 'error')
    }
  } catch (error) {
    console.error('Error saving audit:', error)
    showToast('Audit disimpan secara lokal sahaja', 'error')
  }

  // Reset form
  setTimeout(() => {
    auditScores.value = {}
    auditDate.value = new Date().toISOString().split('T')[0]
    // Flush queue after user action
    sync.flushQueue()
  }, 1500)
}

const showToast = (message: string, type: 'success' | 'error') => {
  toastMessage.value = message
  toastType.value = type
  toastVisible.value = true
  setTimeout(() => {
    toastVisible.value = false
  }, 3000)
}

</script>

<style scoped></style>
