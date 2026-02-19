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
              <h2 class="text-xl font-bold text-white">🔍 Pengurusan Peluru & Bahan Letupan - Senarai Semak Audit</h2>
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
                      title="Tambah Dokumen Sokongan">
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

    <!-- Penemuan Modal -->
    <div v-if="showPenemuanModal" @click.self="closePenemuanModal"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div class="bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-6 flex-shrink-0">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-2xl font-bold text-white flex items-center gap-3">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Penemuan Audit
              </h3>
              <p class="text-orange-100 mt-1" v-if="currentPenemuanItem">{{ currentPenemuanItem.bil }}. {{
                currentPenemuanItem.perkara }}</p>
            </div>
            <button @click="closePenemuanModal"
              class="text-white/80 hover:text-white hover:bg-white/20 rounded-xl p-2 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div class="p-8 overflow-y-auto flex-1">
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Penemuan *</label>
              <textarea v-model="penemuanForm.penemuan" rows="4" placeholder="Nyatakan penemuan..."
                class="w-full px-4 py-3 border border-orange-200/50 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm resize-none"></textarea>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Cadangan</label>
              <textarea v-model="penemuanForm.cadangan" rows="3" placeholder="Cadangan penambahbaikan..."
                class="w-full px-4 py-3 border border-orange-200/50 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm resize-none"></textarea>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Kategori *</label>
              <select v-model="penemuanForm.kategori"
                class="w-full px-4 py-3 border border-orange-200/50 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm">
                <option value="">Pilih kategori</option>
                <option value="Kritikal">Kritikal</option>
                <option value="Lazim">Lazim</option>
                <option value="Berulang">Berulang</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Lampiran</label>
              <div
                class="border-2 border-dashed border-orange-200 rounded-xl p-4 text-center hover:border-orange-400 transition-colors cursor-pointer">
                <input type="file" @change="handleFileUpload" multiple accept="image/*,.pdf" class="hidden"
                  ref="fileInput">
                <button @click="($refs.fileInput as HTMLInputElement)?.click()" type="button"
                  class="text-orange-600 hover:text-orange-700 font-medium text-sm">
                  <svg class="w-8 h-8 mx-auto mb-2 text-orange-400" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Pilih Fail
                </button>
              </div>
              <div v-if="penemuanForm.files.length > 0" class="mt-3 space-y-2">
                <div v-for="(file, index) in penemuanForm.files" :key="index"
                  class="flex items-center justify-between p-2 bg-orange-50 rounded-lg">
                  <span class="text-sm text-gray-700">{{ file.name }}</span>
                  <button @click="removeFile(index)" class="text-red-600 hover:text-red-700">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3 flex-shrink-0">
          <button @click="closePenemuanModal"
            class="px-6 py-2.5 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-semibold">
            Batal
          </button>
          <button @click="savePenemuan()" :disabled="!penemuanForm.penemuan || !penemuanForm.kategori"
            class="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
            Simpan Penemuan
          </button>
        </div>
      </div>
    </div>

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

    <DocumentProofModal :show="showDocumentModal" :item="currentDocumentItem" :form-type="formType"
      :phase="currentPhase" @close="showDocumentModal = false" />

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
          <div class="grid sm:grid-cols-2 gap-4">
            <div v-for="rujukan in rujukanList" :key="rujukan.label"
              class="border border-blue-100 rounded-xl p-4 bg-blue-50/60">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center">{{
                  rujukan.label }}</div>
                <div>
                  <p class="font-semibold text-gray-800">{{ rujukan.title }}</p>
                </div>
              </div>
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
import { ref, computed, onMounted, watch } from 'vue'
import DocumentProofModal from './DocumentProofModal.vue'
import { useSync } from '../composables/useSync'

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

interface PenemuanForm {
  penemuan: string
  cadangan: string
  kategori: string
  files: File[]
}

const auditorName = ref('')
const auditDate = ref(new Date().toISOString().split('T')[0])
const auditId = computed(() => `AUD-PELURU-${Date.now()}`)
const currentPhase = ref<'self' | 'commander' | 'aptd'>('self')
const auditScores = ref<AuditScore>({})
const toastVisible = ref(false)
const toastMessage = ref('')
const toastType = ref<'success' | 'error'>('success')
const formType = 'Pengurusan Peluru'
const penilaianTypeId = 4

// Draft and metadata keys per phase
const draftKeyForPhase = (phaseSlug: string) => `peluru_auditScoresDraft_${phaseSlug}`
const findingsDataKeyForPhase = (phaseSlug: string) => `findingsData_${phaseSlug}`
const auditDataKeyForPhase = (phaseSlug: string) => `auditData_${phaseSlug}`

const sync = useSync()
const showDocumentModal = ref(false)
const currentDocumentItem = ref<any>(null)

// Penemuan Modal State
const showPenemuanModal = ref(false)
const currentPenemuanItem = ref<any>(null)
const penemuanForm = ref<PenemuanForm>({
  penemuan: '',
  cadangan: '',
  kategori: '',
  files: []
})
const penemuanList = ref<PenemuanForm[]>([])

// Contoh Penemuan Modal State
const showExampleModal = ref(false)
const currentExampleItem = ref<any>(null)

const openExampleModal = (item?: any) => {
  currentExampleItem.value = item || null
  showExampleModal.value = true
}

const closeExampleModal = () => {
  showExampleModal.value = false
  currentExampleItem.value = null
}

// Rujukan Modal State
const showRujukanModal = ref(false)
const rujukanList = [
  { label: 'A.', title: 'Perintah Keselamatan ATM, 2019.' },
  { label: 'B.', title: 'PATM Jil III Edisi 1/2023 - Bhg 1 Bab 1 - Dasar Peluru dan Bahan Letupan.' },
  { label: 'C.', title: 'PATM Jil III Edisi 1/2023 - Bhg 2 Bab 5 - Arahan Tatacara Pengurusan Stor.' },
  { label: 'D.', title: 'PATD 21/2009 - Semak Stok dan Penyesuaian.' },
  { label: 'E.', title: 'PATD 1/1994 - Arahan Penguatkuasaan Langkah-langkah Keselamatan dan Kawalan Senjata Api, Peluru, Bahan Letupan dan Pairoteknik TD.' },
  { label: 'F.', title: 'PATD 3/1994 - Arahan Penguatkuasaan Semula Kawalan Pengeluaran Peluru, Bom dan Bahan Letupan TD Yang Kritikal.' },
  { label: 'G.', title: 'PATD 4/1994 - Arahan Am Peningkatan Penguatkuasaan Langkah-langkah Keselamatan Depot-depot dan Tempat Simpanan Peluru, Bom dan Bahan Letupan TD.' },
  { label: 'H.', title: 'PATD 7/1994 - Keselamatan Senjata Api dan Peluru.' },
  { label: 'I.', title: 'PATD 1/1990 - Perintah Tetap Pengendalian Peluru/Bom/Bahan Letupan/Phyrotechnics.' },
  { label: 'J.', title: 'PATD 3/1990 - Arahan Keselamatan Gudang Peluru.' },
  { label: 'K.', title: 'PATD 12/1986 - Semakan Stok Peluru dan Senjata Kecil.' },
  { label: 'L.', title: 'MP 9.2.3A TD - Keselamatan Fizikal.' },
  { label: 'M.', title: 'MKP/SE-1/700-1/8/5 (1 Nov 19) - Arahan Teknikal KPT Peluru Bil 20/2019 (Pasukan Tumpangan BSP dan Perintah Tetap Pasukan Tumpangan di Depot/Platun Peluru TD).' },
  { label: 'N.', title: 'MK TD/G3/OP BTN (A)/1.100-1/9/60 (4) (30 Okt 19) - Kelulusan Penyimpanan Peluru/Bhn Letupan yang tiada hak dalam JPTD/JPSS.' },
  { label: 'O.', title: 'MK TD/G3/OP BTN (A)/1.300-4/1 (18 Mac 19) - Tatacara Permohonan Kelulusan Penggunaan Peluru/Bahan Letupan TD.' },
  { label: 'P.', title: 'MK TD/G3/4817 (17 Mei 01) - Konsep Skala Peluru TD.' }
]

const openDocumentModal = (item?: any) => {
  currentDocumentItem.value = item || null
  showDocumentModal.value = true
}

// openPenemuanModal is no longer used

const closePenemuanModal = () => {
  showPenemuanModal.value = false
  currentPenemuanItem.value = null
  penemuanForm.value = {
    penemuan: '',
    cadangan: '',
    kategori: '',
    files: []
  }
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    penemuanForm.value.files.push(...Array.from(target.files))
  }
}

const saveScoresDraft = () => {
  try {
    const draftData = {
      scores: auditScores.value,
      auditorName: auditorName.value,
      auditDate: auditDate.value
    }
    localStorage.setItem(draftKeyForPhase(currentPhase.value), JSON.stringify(draftData))
    sync.pushDraft(currentPhase.value, draftData)
  } catch (e) {
    /* ignore */
  }
}

const handleManualSave = async () => {
  if (!auditorName.value) {
    showToast('Sila masukkan nama juruaudit', 'error')
    return
  }

  saveScoresDraft()

  try {
    await sync.prepareAudit({
      NamaPenilai: auditorName.value,
      NoPenilaian: auditId.value,
      Tarikh: auditDate.value,
      JenisPenilaian: {
        JenisPenilaianID: penilaianTypeId,
        JenisPenilaianName: ""
      }
    })
    showToast('Sesi audit berjaya disimpan ke pangkalan data', 'success')
  } catch (err: any) {
    console.error('Manual save failed:', err)
    showToast(err.message || 'Gagal menyimpan ke pangkalan data', 'error')
  }
}

const loadScoresDraft = (p: typeof currentPhase.value) => {
  try {
    const raw = localStorage.getItem(draftKeyForPhase(p))
    if (raw) {
      const data = JSON.parse(raw)
      auditScores.value = data.scores || {}
      auditorName.value = data.auditorName || ''
      auditDate.value = data.auditDate || new Date().toISOString().split('T')[0]
    } else {
      auditScores.value = {}
    }
  } catch {
    auditScores.value = {}
  }
}

const removeFile = (index: number) => {
  penemuanForm.value.files.splice(index, 1)
}

const savePenemuan = async () => {
  if (!penemuanForm.value.penemuan || !penemuanForm.value.kategori) {
    showToast('Sila lengkapkan penemuan dan kategori', 'error')
    return
  }

  const penemuanData = {
    ...penemuanForm.value,
    itemBil: currentPenemuanItem.value?.bil || '',
    itemPerkara: currentPenemuanItem.value?.perkara || '',
    timestamp: new Date().toISOString()
  }

  penemuanList.value.push(penemuanData)

  // Save to localStorage for AuditHistory component
  const findingForHistory = {
    id: `finding-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    audit_id: auditId.value,
    formType: 'Peluru & Bahan Letupan',
    phase: currentPhase.value,
    itemBil: currentPenemuanItem.value?.bil || '',
    itemPerkara: currentPenemuanItem.value?.perkara || '',
    penemuan: penemuanForm.value.penemuan,
    cadangan: penemuanForm.value.cadangan,
    kategori: penemuanForm.value.kategori as 'Kritikal' | 'Lazim' | 'Berulang',
    status: 'Baharu' as const,
    priority: penemuanForm.value.kategori === 'Kritikal' ? 'Tinggi' as const : 'Sederhana' as const,
    pic: auditorName.value || '-',
    createdDate: new Date().toISOString(),
    dueDate: '',
    actions: []
  }

  try {
    // Load existing findings from localStorage
    const existingFindings = JSON.parse(localStorage.getItem(findingsDataKeyForPhase(currentPhase.value)) || '[]')
    existingFindings.push(findingForHistory)
    localStorage.setItem(findingsDataKeyForPhase(currentPhase.value), JSON.stringify(existingFindings))

    // Sync to backend using useSync
    await sync.pushFinding(currentPhase.value, findingForHistory)

    showToast(`Penemuan ${penemuanForm.value.kategori} telah disimpan`, 'success')
  } catch (err) {
    console.error('Failed to sync finding:', err)
    showToast('Penemuan disimpan secara lokal sahaja', 'error')
  }

  closePenemuanModal()
}

const exampleFindings = {
  'main-1': [
    {
      title: 'Arahan diterima dan difahami',
      description: 'Tim latihan telah menerima arahan bertulis dan semua ahli memahami apa yang dikehendaki daripada sesi latihan tersebut.',
      kategori: 'Lazim'
    },
    {
      title: 'Timetable dan tempat latihan ditentukan',
      description: 'Sesi latihan telah dijadualkan dengan jelas dan lokasi telah ditetapkan sebelumnya.',
      kategori: 'Lazim'
    }
  ],
  'main-2': [
    {
      title: 'Tiada catatan latihan yang terkini',
      description: 'Buku Rekod Latihan tidak dikemaskini dalam masa enam bulan terakhir.',
      kategori: 'Kritikal'
    },
    {
      title: 'Catatan perlatihan tidak lengkap',
      description: 'Informasi mengenai nama peserta dan markah ujian tidak tercatat dengan jelas.',
      kategori: 'Lazim'
    },
    {
      title: 'Jadual latihan ditangguhkan berulang kali',
      description: 'Latihan mingguan telah ditangguhkan selama tiga minggu berturut-turut tanpa alasan yang sah.',
      kategori: 'Berulang'
    }
  ],
  'main-3': [
    {
      title: 'Fasiliti latihan berfungsi dengan baik',
      description: 'Semua alatan dan fasiliti latihan dalam keadaan sempurna dan siap digunakan.',
      kategori: 'Lazim'
    },
    {
      title: 'Fasiliti latihan kurang terawat',
      description: 'Alat-alat latihan menunjukkan tanda-tanda kerosakan dan perlukan pembaikan segera.',
      kategori: 'Lazim'
    }
  ],
  'main-4': [
    {
      title: 'Peserta menunjukkan penambahan kemahiran',
      description: 'Hasil ujian menunjukkan peserta telah mencapai tahap kompetensi yang diharapkan dengan peningkatan 30% daripada sesi sebelumnya.',
      kategori: 'Lazim'
    }
  ],
  'main-5': [
    {
      title: 'Laporan tidak dihantar ke formasi atasan',
      description: 'Pelaporan latihan pasukan telah ditangguhkan lebih daripada dua bulan daripada tarikh yang ditetapkan.',
      kategori: 'Kritikal'
    },
    {
      title: 'Mesyuarat latihan dilaksanakan mengikut jadual',
      description: 'Semua mesyuarat telah dilaksanakan mengikut penggal yang ditetapkan dengan dokumentasi lengkap.',
      kategori: 'Lazim'
    }
  ],
  'main-6': [
    {
      title: 'Jawatankuasa latihan berfungsi aktif',
      description: 'Jawatankuasa telah mengadakan mesyuarat dan membuat keputusan berkenaan penganjuran latihan.',
      kategori: 'Lazim'
    }
  ]
}

const getExamplesForItem = (key?: string): any[] => {
  if (!key) return []
  return exampleFindings[key as keyof typeof exampleFindings] || []
}

const auditItems: AuditItem[] = [
  {
    bil: '1',
    perkara: 'Perintah/Dasar/Arahan dan Peraturan:',
    isHeader: true,
    subItems: [
      {
        bil: 'a',
        perkara: 'Pasukan mempunyai dokumen berikut dalam simpanan sebagai rujukan:',
        markahPenuh: 0.10,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Perintah Keselamatan ATM 2019.' },
          { bil: '(2)', perkara: 'PATM Jil III Edisi 1/2023.' },
          { bil: '(3)', perkara: 'PATD 12/1986, 1/1990, 3/1990, 1/1994, 3/1994, 4/1994, 7/1994 dan 21/2009.' },
          { bil: '(4)', perkara: 'MP 9.2.3A TD - Keselamatan Fizikal.' },
          { bil: '(5)', perkara: 'Arahan-arahan yang berkuatkuasa.' }
        ]
      }
    ]
  },
  {
    bil: '2',
    perkara: 'Pentadbiran:',
    isHeader: true,
    subItems: [
      {
        bil: 'a',
        perkara: 'Pentadbiran pengurusan stor peluru:',
        markahPenuh: 0.40,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Penjaga Stor adalah terlatih dan tidak ditugaskan di cawangan yang lain.' },
          { bil: '(2)', perkara: 'Perintah Tetap Penjaga Stor Peluru/Perintah Tetap Melawan Kebakaran dan tumpangan yang sah, dikemaskini dan dipamerkan di stor.' },
          { bil: '(3)', perkara: 'Teguran Pemeriksaan Pakar yang lepas telah diambil tindakan dan maklum balas dimajukan mengikut keperluan.' }
        ]
      }
    ]
  },
  {
    bil: '3',
    perkara: 'Tempat Simpanan Peluru (TSP) dan Bahan Letupan:',
    isHeader: true,
    subItems: [
      {
        bil: 'a',
        perkara: 'Keadaan dan keselamatan TSP:',
        markahPenuh: 2.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'TSP dipasang dengan alat pengalir kilat (lightning conductor).' },
          { bil: '(2)', perkara: 'Sistem pendawaian mengikut piawaian dan Suis Utama ditempatkan di luar TSP.' },
          { bil: '(3)', perkara: 'Struktur binaan (lantai, dinding, bumbung dan pintu) tidak mengalami kecacatan.' },
          { bil: '(4)', perkara: 'Sistem pengudaraan di semua ruangan stor adalah dalam keadaan baik.' },
          { bil: '(5)', perkara: 'Benteng (travers) memenuhi spesifikasi yang ditetapkan dan dalam keadaan baik.' },
          { bil: '(6)', perkara: 'Sistem perparitan/saliran air disenggara dan dalam keadaan baik.' },
          { bil: '(7)', perkara: 'Rumput dalam jarak 15m sekeliling TSP dipotong dan dibersihkan dalam jarak 50m sekeliling TSP.' },
          { bil: '(8)', perkara: 'Semua lampu dalam/luar stor TSP dalam keadaan baik dan berfungsi.' },
          { bil: '(9)', perkara: 'Pengambilan kunci TSP direkodkan dalam Buku Keluar/Masuk dan disimpan di Balai Pengawal selepas waktu kerja.' },
          { bil: '(10)', perkara: 'Papan tanda Simbol Melawan Kebakaran (SMK) dipamerkan di pintu pagar masuk TSP dan setiap pintu stor mengikut kesesuaian.' },
          { bil: '(11)', perkara: 'Papan tanda Barang-Barang Larangan dan Dilarang Merokok dipamerkan di pintu TSP.' },
          { bil: '(12)', perkara: 'Pagar Keselamatan TSP dalam yang sesuai dan dalam keadaan baik.' },
          { bil: '(13)', perkara: 'Peti Contra Band disediakan di pintu masuk ke kawasan TSP.' }
        ]
      }
    ]
  },
  {
    bil: '4',
    perkara: 'Penyimpanan dan Senggaraan:',
    isHeader: true,
    subItems: [
      {
        bil: 'a',
        perkara: 'Penyimpanan dan senggaraan peluru/bahan letupan:',
        markahPenuh: 2.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Kuasa Penyimpanan (Dispensation Authority) diluluskan dan masih sah.' },
          { bil: '(2)', perkara: 'Peluru/bahan letupan yang tiada dalam senarai JPTD/JPSS mempunyai kelulusan serta kuasa tempoh penyimpanan yang sah.' },
          { bil: '(3)', perkara: 'Penyimpanan semua jenis peluru/bahan letupan mengikut jenis dan nombor lot yang betul dan tepat.' },
          { bil: '(4)', perkara: 'Permohonan penggunaan semua jenis peluru/bahan letupan dibuat dalam tempoh masa yang ditetapkan.' },
          { bil: '(5)', perkara: 'Stok pegangan semua jenis peluru/bahan letupan mengikut sukatan yang dibenarkan.' },
          { bil: '(6)', perkara: 'Semua peluru termasuk latihan/pembelajaran mempunyai Kad Stok Peluru (BAT L 54) dengan butir yang tepat dan lengkap.' },
          { bil: '(7)', perkara: 'Pemeriksaan Stok (Semak Stok) dilaksanakan dengan telus dan mengikut penggal ditetapkan.' },
          { bil: '(8)', perkara: 'Penerimaan dan pengeluaran peluru/bahan letupan mengikut prosedur dan kelulusan.' },
          { bil: '(9)', perkara: 'Rekod penerimaan/pengeluaran disokong dokumen lengkap (Kembaran A/B/C PATD 1/90, BAT L 5, dll).' },
          { bil: '(10)', perkara: 'Semua pegangan peluru/bahan letupan direkodkan dalam lejar dengan tepat mengikut jenis termasuk latihan/pembelajaran.' },
          { bil: '(11)', perkara: 'Lejar bagi operasi (G 1098), latihan, pembelajaran dan kartus/tong kosong adalah berasingan.' },
          { bil: '(12)', perkara: 'Semua kartus kosong/tong besi kosong direkodkan dalam lejar dan mematuhi prosedur.' },
          { bil: '(13)', perkara: 'Semua lejar disenggara dengan baik dan dikemaskini.' }
        ]
      }
    ]
  },
  {
    bil: '5',
    perkara: 'Keselamatan:',
    isHeader: true,
    subItems: [
      {
        bil: 'a',
        perkara: 'Keselamatan peluru dan bahan letupan:',
        markahPenuh: 2.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Penandaan (permanent marking) ke atas semua peti peluru/bahan letupan adalah sama dengan kandungannya.' },
          { bil: '(2)', perkara: 'Semua peti peluru/bahan letupan adalah dimateri (seal)/binding.' },
          { bil: '(3)', perkara: 'Semua peluru/bahan letupan disimpan mengikut Compatibility Group (CG) yang betul.' },
          { bil: '(4a)', perkara: 'Penyimpanan peluru/bahan letupan CG "H" (White Phosphorus) mempunyai tong air mencukupi.' },
          { bil: '(4b)', perkara: 'Penyimpanan CG "H" mempunyai Perintah Tetap Rawatan yang sah dan dipamerkan.' },
          { bil: '(4c)', perkara: 'Penyimpanan CG "H" menyediakan air bersih (min 1 ltr) dan First Aid Kit.' },
          { bil: '(4d)', perkara: 'Penyimpanan CG "H" menyediakan kain bersih (gauze) dan alat binding cutter.' },
          { bil: '(5a)', perkara: 'Pemeriksaan Bulanan (Pegawai Mem/Pem) dilaksanakan dengan betul dan telus.' },
          { bil: '(5b)', perkara: 'Pemeriksaan Mingguan (Pegawai Medan) dilaksanakan dengan betul dan telus.' },
          { bil: '(5c)', perkara: 'Pemeriksaan Harian (Pegawai Bertugas) dilaksanakan dengan betul dan telus.' },
          { bil: '(6)', perkara: 'Pengendalian dan kawalan penggunaan Peluru Keselamatan bagi pengawal/pengiring mengikut prosedur.' }
        ]
      }
    ]
  }
]

// Flatten the hierarchical structure
const flattenedItems = computed(() => {
  const result: any[] = []

  const flatten = (items: AuditItem[], parentKey = '', level = 0, parentMarkahPenuh = 0) => {
    items.forEach((item, index) => {
      const key = parentKey ? `${parentKey}-${index}` : `${index}`
      const currentItem = {
        ...item,
        key,
        level,
        parentMarkahPenuh: item.isSubHeader ? (typeof item.markahPenuh === 'number' ? item.markahPenuh : 0) : parentMarkahPenuh
      }

      if (item.isSubHeader && item.subItems) {
        const leafCount = item.subItems.length
        currentItem.parentLeafCount = leafCount

        item.subItems.forEach((subItem, subIndex) => {
          const subKey = `${key}-${subIndex}`
          result.push({
            ...subItem,
            key: subKey,
            level: level + 2,
            parentKey: key,
            parentMarkahPenuh: typeof item.markahPenuh === 'number' ? item.markahPenuh : 0,
            parentLeafCount: leafCount,
            markahPenuh: typeof item.markahPenuh === 'number' ? item.markahPenuh : 0,
            showMarkahPenuh: subIndex === 0,
            showMarkahDapat: subIndex === 0
          })
        })
      }

      if (!item.isSubHeader || !item.subItems) {
        result.push(currentItem)
      } else {
        result.push(currentItem)
      }

      if (item.subItems && !item.isSubHeader) {
        flatten(item.subItems, key, level + 1, parentMarkahPenuh)
      }
    })
  }

  flatten(auditItems)
  return result
})

const shouldShowMarkah = (key: string) => {
  const item = flattenedItems.value.find(i => i.key === key)
  return item?.showMarkahPenuh === true
}

const getSubItemCount = (key: string) => {
  const item = flattenedItems.value.find(i => i.key === key)
  return item?.parentLeafCount || 1
}

const getMarkahPenuhDisplay = (key: string) => {
  const item = flattenedItems.value.find(i => i.key === key)
  if (!item) return ''

  const markah = item.parentMarkahPenuh || item.markahPenuh
  return typeof markah === 'number' ? markah.toFixed(2) : ''
}

const shouldShowMarkahDapat = (key: string) => {
  const item = flattenedItems.value.find(i => i.key === key)
  return item?.showMarkahDapat === true
}

const computeMarkahValue = (key: string) => {
  const item = flattenedItems.value.find(i => i.key === key)
  if (!item || !item.parentKey) return 0

  const score = auditScores.value[key as any]
  if (score === undefined || score === null) return 0

  const baseMarkah = item.parentMarkahPenuh || 0
  const maxTotal = (item.parentLeafCount || 1) * 5

  return (score / maxTotal) * baseMarkah
}

const getGroupSumDisplay = (key: string) => {
  const item = flattenedItems.value.find(i => i.key === key)
  if (!item || !item.parentKey) return ''

  const siblings = flattenedItems.value.filter(i => i.parentKey === item.parentKey)
  const sum = siblings.reduce((acc, sibling) => {
    return acc + computeMarkahValue(sibling.key)
  }, 0)

  return sum.toFixed(2)
}

const getGroupSumValue = (key: string) => {
  const item = flattenedItems.value.find(i => i.key === key)
  if (!item || !item.parentKey) return 0

  const siblings = flattenedItems.value.filter(i => i.parentKey === item.parentKey)
  return siblings.reduce((acc, sibling) => {
    return acc + computeMarkahValue(sibling.key)
  }, 0)
}

const totalPossibleMarkah = computed(() => {
  const groups = flattenedItems.value.filter(item => item.showMarkahPenuh === true)
  return groups.reduce((sum, item) => {
    const markah = item.parentMarkahPenuh || item.markahPenuh
    return sum + (typeof markah === 'number' ? markah : 0)
  }, 0)
})

const totalAchievedMarkah = computed(() => {
  const groups = flattenedItems.value.filter(item => item.showMarkahDapat === true)
  return groups.reduce((sum, item) => {
    return sum + getGroupSumValue(item.key)
  }, 0)
})

const achievedPercentage = computed(() => {
  if (totalPossibleMarkah.value === 0) return '0.00'
  return ((totalAchievedMarkah.value / totalPossibleMarkah.value) * 100).toFixed(2)
})

const totalItems = computed(() => {
  return flattenedItems.value.filter(item => !item.isHeader && !item.isSubHeader && item.markahPenuh).length
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

  try {
    // Save to localStorage
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
  } catch (err) {
    console.error('Failed to save audit:', err)
    showToast('Audit disimpan secara lokal sahaja', 'error')
  }

  // Reset form
  setTimeout(() => {
    auditorName.value = ''
    auditScores.value = {}
    auditDate.value = new Date().toISOString().split('T')[0]
  }, 1500)
}

watch(auditScores, () => saveScoresDraft(), { deep: true })

onMounted(() => {
  sync.initSync()
  loadScoresDraft(currentPhase.value)
})

watch(() => currentPhase.value, (newPhase) => {
  loadScoresDraft(newPhase)
})

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
