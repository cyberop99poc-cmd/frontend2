<template>
  <main class="p-8 space-y-8">
    <!-- Form Section -->
    <section class="space-y-6">
      <div class="bg-white rounded-2xl shadow-lg border border-indigo-100/50 p-8">
        <h2
          class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-700 bg-clip-text text-transparent mb-6">
          📝 Butiran Sesi Audit</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Nama Juruaudit</label>
            <input v-model="auditorName" type="text" placeholder="Masukkan nama juruaudit"
              class="w-full px-4 py-3 border border-indigo-200/50 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm bg-white/50 backdrop-blur">
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Tarikh Audit</label>
            <input v-model="auditDate" type="date"
              class="w-full px-4 py-3 border border-indigo-200/50 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm mono bg-white/50 backdrop-blur">
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">ID Audit</label>
            <input type="text" :value="auditId" readonly
              class="w-full px-4 py-3 border border-indigo-200/50 rounded-xl bg-indigo-50/50 text-gray-600 text-sm mono">
          </div>
        </div>
      </div>

      <!-- Audit Table -->
      <div class="bg-white rounded-2xl shadow-lg border border-indigo-100/50 overflow-hidden">
        <div class="bg-gradient-to-r from-indigo-600 to-indigo-700 px-8 py-6 flex items-center justify-between">
          <div class="flex-1">
            <div class="flex items-center gap-3">
              <h2 class="text-xl font-bold text-white">🔍 Pengurusan Pentadbiran & Sumber Manusia - Senarai Semak Audit
              </h2>
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
            <p class="text-indigo-100 text-sm mt-2">Tandakan setiap item berdasarkan pemeriksaan anda</p>
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
              <tr class="bg-indigo-50 border-b-2 border-indigo-200">
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase w-12">Bil</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Perkara</th>
                <th class="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase w-20">Markah Penuh</th>
                <th colspan="6" class="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Skala Markah
                </th>
                <th class="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase w-20">Markah Dapat</th>
                <th class="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase w-24">Penemuan</th>
              </tr>
              <tr class="bg-white border-b border-indigo-100">
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
                  :class="['border-b border-indigo-50 hover:bg-indigo-50/30 transition-colors']">
                  <td class="px-4 py-3">{{ item.bil }}</td>
                  <td class="px-4 py-3 text-gray-700">{{ item.perkara }}</td>
                  <td v-if="shouldShowMarkah(item.key)" class="px-4 py-3 text-center font-mono text-gray-600"
                    :rowspan="getSubItemCount(item.key)">
                    {{ getMarkahPenuhDisplay(item.key) }}
                  </td>
                  <td v-for="score in [0, 1, 2, 3, 4, 5]" :key="score" class="px-2 py-3 text-center">
                    <input v-if="item.markahPenuh" type="radio" :name="`score-${item.key}`" :value="score"
                      @change="setScore(item.key, score)"
                      class="w-4 h-4 cursor-pointer text-indigo-600 focus:ring-indigo-500">
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
                <tr v-else-if="item.isSubHeader" :class="['bg-gray-50 border-b border-indigo-50']">
                  <td class="px-4 py-3 font-bold">{{ item.bil }}</td>
                  <td class="px-4 py-3 text-gray-700 font-bold">{{ item.perkara }}</td>
                  <td colspan="8"></td>
                </tr>
                <tr v-else :class="['bg-gray-100 border-b-2 border-indigo-200']">
                  <td colspan="10" class="px-4 py-3 font-bold text-gray-800">{{ item.perkara }}</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>

        <div
          class="px-8 py-4 bg-gradient-to-r from-indigo-50 to-indigo-50 border-t border-indigo-200/50 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="text-sm text-gray-700">
              Selesai: <span class="font-semibold text-indigo-600">{{ completedCount }}</span> / <span>{{ totalItems
              }}</span>
              item
            </div>
            <div class="w-48 h-2.5 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-indigo-600 to-indigo-700 transition-all duration-300"
                :style="{ width: completionPercentage + '%' }"></div>
            </div>
          </div>
          <button @click="submitAudit()" :disabled="completedCount === 0"
            class="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold rounded-xl hover:shadow-lg transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
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
          <div class="space-y-4">
            <div v-for="refItem in rujukanList" :key="refItem.code"
              class="bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 rounded-xl p-5 border-l-4 border-indigo-500 shadow-sm hover:shadow-md transition-shadow">
              <div class="flex items-start gap-4">
                <div class="bg-indigo-500 text-white rounded-lg px-3 py-2 flex-shrink-0"><span class="font-bold">{{
                  refItem.code }}</span></div>
                <div class="flex-1">
                  <p class="text-gray-800 leading-relaxed">{{ refItem.title }}</p>
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
const auditId = computed(() => `AUD-PTDB-${Date.now()}`)
const auditScores = ref<AuditScore>({})
const currentPhase = ref<'self' | 'commander' | 'aptd'>('self')
const toastVisible = ref(false)
const toastMessage = ref('')
const toastType = ref<'success' | 'error'>('success')
const formType = 'Pengurusan Pentadbiran'
const penilaianTypeId = 6

const sync = useSync()

// Draft and metadata keys per phase
const draftKeyForPhase = (phaseSlug: string) => `pentadbiran_auditScoresDraft_${phaseSlug}`
const findingsDataKeyForPhase = (phaseSlug: string) => `findingsData_${phaseSlug}`
const auditDataKeyForPhase = (phaseSlug: string) => `auditData_${phaseSlug}`

const showDocumentModal = ref(false)
const currentDocumentItem = ref<any>(null)

const rujukanList = [
  { code: 'A', title: 'Akta Angkatan Tentera, 1972.' },
  { code: 'B', title: 'Kaedah-kaedah Angkatan Tentera (Lembaga Siasatan) 1976.' },
  { code: 'C', title: 'Dasar Sumber Manusia ATM, 2007.' },
  { code: 'D', title: 'Pelan Pengurusan Strategik Sumber Manusia ATM.' },
  { code: 'E', title: 'Profil Ketenteraan, 2000.' },
  { code: 'F', title: 'Pelan AntiRasuah TD (PAR TD).' },
  { code: 'G', title: 'Buku Panduan Lembaga Siasatan.' },
  { code: 'H', title: 'PMAT 9/2003 - Garis Panduan Pemberian Anugerah Perkhidmatan Cemerlang ATM di Bawah SSM (Membatalkan PMAT 7/1998, 8/1994 dan 16/1993).' },
  { code: 'I', title: 'PAAT 18/1989 - Ketegasan dan Keadilan.' },
  { code: 'J', title: 'PAAT 19/1989 - Disiplin Tentera.' },
  { code: 'K', title: 'PAAT 21/1989 - Kebajikan.' },
  { code: 'L', title: 'PATD 6/2011 - Perintah Tetap Amalan Kaunseling TD.' },
  { code: 'M', title: 'PATD 7/2011 - Arahan Pelaksanaan Perkhidmatan Psikologi dan Kaunseling TD.' },
  { code: 'N', title: 'PATD 24/1994 - Pelanggaran Tatatertib Yang Mencemarkan Imej TD.' },
  { code: 'O', title: 'PATD 37/1994 - Motivasi di Kalangan Anggota TD.' },
  { code: 'P', title: 'PATD 40/1984 - Melengah-lengahkan Penyiasatan ke Atas Sesuatu Pertuduhan.' },
  { code: 'Q', title: 'PATD 10/1983 - Arahan Pemeriksaan Tadbiran Tahunan.' },
  { code: 'R', title: 'PATD 28/1982 - Melaporkan Kes-kes Dadah.' },
  { code: 'S', title: 'PATD 14/1981 - Kemerosotan Disiplin.' },
  { code: 'T', title: 'M 1 TD - The Army.' },
  { code: 'U', title: 'MM 0.1.3A TD - Manual Konsep Pengurusan Kerjaya TD.' },
  { code: 'V', title: 'MM 0.1.18 TD - Army Mentoring.' },
  { code: 'W', title: 'MATM-BIJ.100-13/4/1-(6) bertarikh 17 Dis 18 - Arahan Perlaksanaan Penyediaan myPortfolio Bagi Setiap Perkhidmatan (ATM).' },
  { code: 'X', title: 'MK TD/BITD.100.13/8/3 bertarikh 14 Jan 19 - Arahan Pelaksanaan Penyediaan myPortfolio TD.' },
  { code: 'Y', title: 'MK TD/G1/P&K.500-6/1/1 (01) bertarikh 11 Jan 21 - Arahan Pelaksanaan Aktiviti Perkhidmatan Psikologi dan Kaunseling.' },
  { code: 'Z', title: 'MK TD/G1/P&K.500-4/4/5 bertarikh 8 Mei 19 - Arahan Pelaksanaan Pementoran.' },
  { code: 'AA', title: 'MK TD/G1/P&K.500-6/1/1 bertarikh 28 Feb 19 - Arahan Pelaksanaan SisPA TD.' },
  { code: 'AB', title: 'MK TD/G1/100-11/2/3 bertarikh 2 Sep 21 - Pengemaskinian Data Rekod Peribadi di Dalam HRMIS ATM di Peringkat TD.' },
  { code: 'AC', title: 'MK TD/G1/A/2058/(PY) Jil 2 bertarikh 2 Feb 10 - Arahan Pelaksanaan Human Resource Management Information System TD.' },
  { code: 'AD', title: 'MK TD/G-KS/71 bertarikh 12 Ogos 10 - Dasar Buddy Buddy System Dalam Sistem Pengurusan Warga TD.' },
  { code: 'AE', title: 'MK TD/G1/3315/POLISI(UG) bertarikh 25 Jun 01 - Tatacara Pengisytiharan Perintah Tetap.' },
  { code: 'AF', title: 'MK TD/G1/3370/(UG) bertarikh 22 Dis 2000 - Rekod Prosiding Lembaga Penyiasatan.' }
]

const showPenemuanModal = ref(false)
const currentPenemuanItem = ref<any>(null)
const penemuanForm = ref<PenemuanForm>({
  penemuan: '',
  cadangan: '',
  kategori: '',
  files: []
})
const penemuanList = ref<PenemuanForm[]>([])

// Example and Rujukan modals
const showExampleModal = ref(false)
const currentExampleItem = ref<any>(null)
const showRujukanModal = ref(false)

const openDocumentModal = (item?: any) => {
  currentDocumentItem.value = item || null
  showDocumentModal.value = true
}

// openPenemuanModal is no longer used; DocumentProofModal is directly invoked from template

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

const openExampleModal = (item?: any) => {
  currentExampleItem.value = item || null
  showExampleModal.value = true
}

const closeExampleModal = () => {
  showExampleModal.value = false
  currentExampleItem.value = null
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    penemuanForm.value.files.push(...Array.from(target.files))
  }
}

const removeFile = (index: number) => {
  penemuanForm.value.files.splice(index, 1)
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
    formType: 'Pentadbiran & Sumber Manusia',
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
      title: 'Dokumen rujukan tidak lengkap',
      description: 'Pasukan tidak mempunyai naskhah fizikal atau digital bagi Akta Angkatan Tentera 1972 yang terkini.',
      kategori: 'Lazim'
    },
    {
      title: 'Direktif PTD tidak dikemaskini',
      description: 'Salinan Direktif Panglima Tentera Darat yang disimpan adalah versi lama dan belum dikemaskini dengan edisi terbaru.',
      kategori: 'Lazim'
    }
  ],
  'main-2': [
    {
      title: 'Carta Organisasi tidak dipamerkan',
      description: 'Carta organisasi pasukan tidak dipamerkan di papan kenyataan utama Pejabat Tadbir.',
      kategori: 'Lazim'
    },
    {
      title: 'Perintah Tetap belum disahkan',
      description: 'Perintah Tetap Pasukan (PTP) tidak mempunyai tandatangan pengesahan daripada Pegawai Memerintah.',
      kategori: 'Kritikal'
    }
  ],
  'main-3': [
    {
      title: 'Sistem pemfailan tidak teratur',
      description: 'Beberapa fail sulit tidak disimpan dalam kabinet besi berkunci dan tidak mengikut sistem klasifikasi yang ditetapkan.',
      kategori: 'Kritikal'
    },
    {
      title: 'Minit mesyuarat tidak lengkap',
      description: 'Minit Mesyuarat Pegawai Memerintah bagi suku tahun kedua tidak dijumpai dalam fail berkenaan.',
      kategori: 'Lazim'
    }
  ],
  'main-4': [
    {
      title: 'Data HRMIS tidak tepat',
      description: 'Maklumat alamat dan tanggungan bagi 15% anggota tidak dikemaskini dalam sistem HRMIS ATM.',
      kategori: 'Kritikal'
    },
    {
      title: 'MyPortfolio belum disiapkan',
      description: 'Sebanyak 10 jawatan penting dalam pasukan masih belum mempunyai dokumen MyPortfolio yang lengkap.',
      kategori: 'Lazim'
    }
  ],
  'main-5': [
    {
      title: 'Rekod cuti tidak dikemaskini',
      description: 'Buku Rekod Cuti (BAT D 45) bagi beberapa anggota tidak mencerminkan baki cuti sebenar dalam HRMIS.',
      kategori: 'Lazim'
    },
    {
      title: 'Pusingan kerja tidak dilaksanakan',
      description: 'Terdapat anggota yang telah memegang jawatan yang sama melebihi tempoh 5 tahun tanpa pusingan kerja.',
      kategori: 'Lazim'
    }
  ],
  'main-6': [
    {
      title: 'Lembaga Siasatan tertunggak',
      description: 'Terdapat 2 kes Lembaga Siasatan (LS) yang telah melebihi tempoh 30 hari tanpa sebarang pelaporan kemajuan.',
      kategori: 'Kritikal'
    },
    {
      title: 'Kes tatatertib tidak direkodkan',
      description: 'Rekod hukuman perbicaraan terus bagi bulan lepas belum dimasukkan ke dalam sistem HRMIS.',
      kategori: 'Kritikal'
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
        markahPenuh: 0.20,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Akta Angkatan Tentera, 1972.' },
          { bil: '(2)', perkara: 'Kaedah-kaedah Angkatan Tentera (Lembaga Siasatan), 1976.' },
          { bil: '(3)', perkara: 'Dasar Sumber Manusia ATM, 2007.' },
          { bil: '(4)', perkara: 'Pelan Pengurusan Strategik Sumber Manusia ATM.' },
          { bil: '(5)', perkara: 'Pelan AntiRasuah TD (PAR TD).' },
          { bil: '(6)', perkara: 'Profil Ketenteraan, 2000.' },
          { bil: '(7)', perkara: 'Buku Panduan Lembaga Siasatan.' },
          { bil: '(8)', perkara: 'PMAT 9/2003.' },
          { bil: '(9)', perkara: 'PAAT 18, 19 dan 21/1989.' },
          { bil: '(10)', perkara: 'PATD 14/1981, 28/1982, 10/1983, 40/1984, 24/1994, 37/1994 dan 7/2011.' },
          { bil: '(11)', perkara: 'Direktif Panglima Formasi.' },
          { bil: '(12)', perkara: 'Arahan Pentadbiran Pasukan (semasa).' }
        ]
      }
    ]
  },
  {
    bil: '2',
    perkara: 'Kelangsungan Misi dan Kesiagaan:',
    isHeader: true,
    subItems: [
      {
        bil: 'a',
        perkara: 'Kelangsungan misi dan kesiagaan pasukan:',
        markahPenuh: 0.40,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Penyataan Misi dan Visi pasukan dipamerkan.' },
          { bil: '(2)', perkara: 'Carta organisasi pasukan dipamer dan dikemaskinikan.' },
          { bil: '(3a)', perkara: 'Perintah Tetap adalah kemaskini.' },
          { bil: '(3b)', perkara: 'Perintah Tetap dipamerkan di lokaliti tertentu.' },
          { bil: '(3c)', perkara: 'Perintah Tetap yang dipamerkan adalah sama dengan Perintah Tetap utama/induk di Pejabat Tadbir.' }
        ]
      }
    ]
  },
  {
    bil: '3',
    perkara: 'Kutuhan Organisasi:',
    isHeader: true,
    subItems: [
      {
        bil: 'a',
        perkara: 'Kutuhan organisasi pasukan:',
        markahPenuh: 0.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Pemeriksaan Tadbir Tahunan oleh formasi atasan dilaksana berpandukan takwim.' },
          { bil: '(2)', perkara: 'Mesyuarat Pegawai Memerintah/Pemerintah dilaksanakan mengikut pengarahan.' },
          { bil: '(3)', perkara: 'Sistem pemfailan pasukan adalah kemas dan teratur.' },
          { bil: '(4)', perkara: 'Aktiviti-aktiviti rejimental dilaksanakan dari semasa ke semasa.' }
        ]
      }
    ]
  },
  {
    bil: '4',
    perkara: 'Kesejahteraan Warga:',
    isHeader: true,
    subItems: [
      {
        bil: 'a',
        perkara: 'Perjawatan dan pegangan anggota:',
        markahPenuh: 0.80,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Peratus pegangan semasa berbanding dengan perjawatan melebihi 60%.' },
          { bil: '(2)', perkara: 'Perjawatan Sandaran dan Bawah Implimentasi dikemaskini.' },
          { bil: '(3)', perkara: 'Permohonan pengisian kekosongan jawatan penting dibuat.' },
          { bil: '(4)', perkara: 'Semua perjawatan anggota mempunyai MyPortfolio dan dikemaskini.' }
        ]
      },
      {
        bil: 'b',
        perkara: 'Penempatan anggota:',
        markahPenuh: 0.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Penempatan anggota adalah mengikut kelayakan dan kepakaran.' },
          { bil: '(2)', perkara: 'Pusingan kerja (job rotation) dilakukan mengikut keperluan dan kesesuaian.' }
        ]
      }
    ]
  },
  {
    bil: '5',
    perkara: 'Sistem Maklumat Pengurusan Sumber Manusia ATM (HRMIS ATM):',
    isHeader: true,
    subItems: [
      {
        bil: 'a',
        perkara: 'Pengurusan HRMIS ATM:',
        markahPenuh: 0.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1a)', perkara: 'Pengemaskinian data adalah di tahap tidak kurang daripada 99%.' },
          { bil: '(1b)', perkara: 'Maklumat dalam HRMIS ATM adalah tepat dan sama seperti dalam BAT D 1A/BAT D 45/ BAT D 55.' },
          { bil: '(1c)', perkara: 'Setiap data dalam HRMIS ATM yang dikemaskini telah disemak dan disahkan betul oleh Pegawai Rekod Pasukan / Pegawai Tadbir.' },
          { bil: '(2)', perkara: 'Perjawatan dan pegangan anggota dalam HRMIS ATM dibuat semakan dan diambil tindakan supaya sama dengan perjawatan dan pegangan terkini anggota.' },
          { bil: '(3)', perkara: 'Penugasan pegawai dan LLP dalam Op PENAWAR direkodkan.' },
          { bil: '(4)', perkara: 'Semakan pilihanraya dilaksanakan melalui HRMIS ATM.' },
          { bil: '(5)', perkara: 'Sasaran Kerja Tahunan (SKT) dan Laporan Nilaian Prestasi Tahunan (LNPT) dibuat melalui HRMIS ATM.' },
          { bil: '(6)', perkara: 'Kes-kes tatatertib, Lembaga Siasatan dan Mahkamah Tentera (MAHTERA) direkod dan dikendalikan melalui HRMIS ATM.' }
        ]
      }
    ]
  },
  {
    bil: '6',
    perkara: 'Kebajikan/Pengiktirafan dan Ganjaran:',
    isHeader: true,
    subItems: [
      {
        bil: 'a',
        perkara: 'Pengurusan kebajikan dan pengiktirafan:',
        markahPenuh: 0.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Mesyuarat Kebajikan dilaksanakan mengikut pengarahan formasi atasan.' },
          { bil: '(2)', perkara: 'Aktiviti bagi meningkatkan moral anggota pasukan dilaksanakan.' },
          { bil: '(3)', perkara: 'Perancangan bagi peningkatan kemajuan kerjaya anggota dibuat.' },
          { bil: '(4)', perkara: 'Ganjaran diberikan kepada anggota samada APC, insentif khas, sijil, anugerah atau surat kepujian.' },
          { bil: '(5a)', perkara: 'Penginapan anggota bujang adalah cukup dan selesa.' },
          { bil: '(5b)', perkara: 'Penginapan anggota kelamin (RKAT) adalah selesa dan selamat.' }
        ]
      }
    ]
  },
  {
    bil: '7',
    perkara: 'Pengurusan Psikologi dan Kaunseling:',
    isHeader: true,
    subItems: [
      {
        bil: 'a',
        perkara: 'Pengurusan psikologi dan kaunseling pasukan:',
        markahPenuh: 1.00,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Pegawai Psikologi dan Kaunseling dibuat pelantikan rasmi.' },
          { bil: '(2a)', perkara: 'Arahan pelaksanaan Sistem Pengurusan Psikologi Anggota (SisPA) dipatuhi.' },
          { bil: '(2b)', perkara: 'Borang Laporan Psikologi Individu disediakan dan disimpan.' },
          { bil: '(2c)', perkara: 'Laporan Psikologi Organisasi dimajukan kepada formasi atasan mengikut tempoh.' },
          { bil: '(3a)', perkara: 'Arahan pelaksanaan Program Pementoran dipatuhi.' },
          { bil: '(3b)', perkara: 'Jawatankuasa pementoran ditubuhkan.' },
          { bil: '(3c)', perkara: 'Persetujuan Mentor dan Mantee telah ditetapkan.' },
          { bil: '(3d)', perkara: 'Borang Pelantikan dan Persetujuan Mentor-Mentee disediakan.' },
          { bil: '(3e)', perkara: 'Program Pementoran dilaksanakan mengikut pengarahan.' },
          { bil: '(3f)', perkara: 'Pelaporan pementoran dimajukan ke formasi atasan mengikut tempoh.' }
        ]
      }
    ]
  },
  {
    bil: '8',
    perkara: 'Pengurusan Perundangan:',
    isHeader: true,
    subItems: [
      {
        bil: 'a',
        perkara: 'Pengurusan perundangan pasukan:',
        markahPenuh: 0.60,
        isSubHeader: true,
        subItems: [
          { bil: '(1a)', perkara: 'Tiada kes Perbicaraan Terus yang tertunggak.' },
          { bil: '(1b)', perkara: 'Tiada kes MAHTERA (dalam kawalan) yang tertunggak.' },
          { bil: '(2)', perkara: 'Dokumentasi pemberhentian anggota tamat menjalani hukuman diuruskan dengan betul.' },
          { bil: '(3)', perkara: 'Perbicaraan dan kelulusan hukuman oleh Pihak Berkuasa Lulusan/PBAYB direkodkan dan disimpan dengan baik.' },
          { bil: '(4a)', perkara: 'Pengisytiharan berkaitan kes-kes tatatertib diulang siar dari semasa ke semasa dalam PERBAH Satu.' },
          { bil: '(4b)', perkara: 'Program pencegahan/kesedaran berkaitan tatertib dilaksanakan dari semasa ke semasa.' },
          { bil: '(5)', perkara: 'Lembaga Siasatan disidang dan dilaksanakan mengikut tempoh masa yang ditetapkan.' }
        ]
      }
    ]
  }
]

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

const showToast = (message: string, type: 'success' | 'error') => {
  toastMessage.value = message
  toastType.value = type
  toastVisible.value = true
  setTimeout(() => {
    toastVisible.value = false
  }, 3000)
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
</script>

<style scoped></style>
