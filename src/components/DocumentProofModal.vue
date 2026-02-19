<template>
  <div v-if="show"
    class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300"
    @click.self="handleClose">
    <div
      class="bg-white rounded-3xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 scale-100 flex flex-col max-h-[90vh]">
      <!-- Header -->
      <div
        class="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 px-8 py-6 rounded-t-3xl flex items-center justify-between sticky top-0 z-10 shadow-md">
        <div class="flex items-center gap-4">
          <div class="bg-white/20 p-2.5 rounded-2xl backdrop-blur-md shadow-inner">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h3 class="text-xl font-bold text-white tracking-tight">
              Dokumen & Penemuan
            </h3>
            <p v-if="item" class="text-blue-100 text-sm font-medium opacity-90 truncate max-w-md">
              {{ item.bil }}. {{ item.perkara }}
            </p>
          </div>
        </div>
        <button @click="handleClose"
          class="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Step Indicator -->
      <div class="px-8 py-4 bg-gray-50 border-b border-gray-100 flex items-center justify-center gap-4">
        <div class="flex items-center gap-2">
          <div :class="['w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 shadow-sm',
            currentStep === 1 ? 'bg-blue-600 text-white ring-4 ring-blue-100' : 'bg-emerald-500 text-white']">
            1
          </div>
          <span
            :class="['text-xs font-semibold uppercase tracking-wider', currentStep === 1 ? 'text-blue-600' : 'text-emerald-600']">Dokumen</span>
        </div>
        <div class="w-12 h-1 bg-gray-200 rounded-full">
          <div class="h-full bg-blue-600 transition-all duration-500 rounded-full"
            :style="{ width: currentStep === 2 ? '100%' : '0%' }"></div>
        </div>
        <div class="flex items-center gap-2">
          <div :class="['w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 shadow-sm',
            currentStep === 2 ? 'bg-blue-600 text-white ring-4 ring-blue-100' : 'bg-gray-200 text-gray-500']">
            2
          </div>
          <span
            :class="['text-xs font-semibold uppercase tracking-wider', currentStep === 2 ? 'text-blue-600' : 'text-gray-400']">Penemuan</span>
        </div>
      </div>

      <!-- Content -->
      <div class="p-8 overflow-y-auto flex-1 custom-scrollbar">
        <!-- Step 1: Documents -->
        <div v-show="currentStep === 1" class="space-y-6 animate-fadeIn">
          <div v-if="message"
            :class="['px-5 py-4 rounded-2xl text-sm font-medium flex items-center gap-3 border shadow-sm',
              message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100']">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="message.type === 'success'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M5 13l4 4L19 7" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ message.text }}
          </div>

          <!-- Existing Documents Viewer -->
          <div class="space-y-3">
            <label class="block text-sm font-bold text-gray-700 mb-2 ml-1 flex items-center gap-2">
              <span class="w-1.5 h-4 bg-emerald-500 rounded-full"></span>
              Dokumen Sokongan Sedia Ada
            </label>
            <div v-if="isLoadingExisting"
              class="flex items-center justify-center p-8 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
              <div class="flex flex-col items-center gap-2">
                <svg class="animate-spin h-6 w-6 text-emerald-500" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>
                <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">Memuat Dokumen...</span>
              </div>
            </div>
            <div v-else-if="existingFiles.length === 0"
              class="p-8 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
              <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">Tiada dokumen sokongan sedia ada</p>
            </div>
            <div v-else class="grid grid-cols-1 gap-2">
              <div v-for="file in existingFiles" :key="file.id || file.url"
                class="flex items-center justify-between bg-emerald-50/50 px-5 py-3 rounded-2xl border border-emerald-100 hover:border-emerald-300 transition-all duration-200 group">
                <div class="flex items-center gap-3 flex-1 min-w-0">
                  <div :class="['p-2 rounded-xl text-white shadow-sm', getFileIconBg(file.name || 'document')]">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-bold text-gray-700 truncate">{{ file.name }}</p>
                    <p class="text-[10px] font-bold text-emerald-600 uppercase tracking-tight">Dimuat naik pada {{
                      formatDate(file.uploadedAt) }}</p>
                  </div>
                </div>
                <button @click="downloadFile(file)"
                  class="p-2.5 bg-white text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-xl shadow-sm border border-emerald-100 transition-all duration-200"
                  title="Lihat / Muat Turun">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div class="group pt-4 border-t border-gray-100">
            <label class="block text-sm font-bold text-gray-700 mb-3 ml-1 flex items-center gap-2">
              <span class="w-1.5 h-4 bg-blue-600 rounded-full"></span>
              Muat Naik Dokumen Baharu
            </label>
            <div
              class="relative border-4 border-dashed border-blue-50 bg-blue-50/20 rounded-3xl p-10 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300 cursor-pointer group-hover:shadow-inner"
              @dragover.prevent @drop.prevent="handleFileDrop" @click="triggerFile">
              <input type="file" @change="handleDocumentUpload" ref="fileInput"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png" multiple class="hidden">
              <div class="flex flex-col items-center">
                <div
                  class="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                  <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h4 class="text-blue-800 font-bold">Pilih Fail atau Seret Sini</h4>
                <p class="text-xs text-blue-500 font-medium mt-1">PDF, Word, Excel atau Imej (Maks 10MB)</p>
              </div>
            </div>
          </div>

          <div v-if="documentForm.files.length > 0" class="space-y-3">
            <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Fail Dipilih ({{
              documentForm.files.length }})</label>
            <div class="grid grid-cols-1 gap-2">
              <div v-for="(file, idx) in documentForm.files" :key="idx"
                class="flex items-center justify-between bg-white px-5 py-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200">
                <div class="flex items-center gap-3 flex-1 min-w-0">
                  <div :class="['p-2 rounded-xl', getFileIconBg(file.name)]">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-bold text-gray-700 truncate">{{ file.name }}</p>
                    <p class="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{{ formatFileSize(file.size)
                    }}</p>
                  </div>
                </div>
                <button @click="removeDocumentFile(idx)"
                  class="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all duration-200"
                  title="Buang fail">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-3 ml-1 flex items-center gap-2">
                <span class="w-1.5 h-4 bg-indigo-600 rounded-full"></span>
                Huraian Dokumen Sokongan
              </label>
              <textarea v-model="documentForm.description" rows="4"
                placeholder="Terangkan bagaimana dokumen ini membuktikan pematuhan audit..."
                class="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-100 focus:bg-white outline-none transition-all text-sm font-medium shadow-inner placeholder:text-gray-400 leading-relaxed"></textarea>
            </div>
          </div>
        </div>

        <!-- Step 2: Findings -->
        <div v-show="currentStep === 2" class="space-y-6 animate-fadeIn">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-3 ml-1 flex items-center gap-2">
              <span class="w-1.5 h-4 bg-amber-500 rounded-full"></span>
              Penemuan Audit (Jika Ada)
            </label>
            <textarea v-model="findingForm.penemuan" rows="5"
              placeholder="Huraikan penemuan audit yang dikesan berdasarkan dokumen sokongan ini..."
              class="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-amber-100 focus:bg-white outline-none transition-all text-sm font-medium shadow-inner placeholder:text-gray-400 leading-relaxed"></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-3 ml-1">Kategori Penemuan</label>
              <select v-model="findingForm.kategori"
                class="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-amber-100 focus:bg-white outline-none transition-all text-sm font-bold shadow-inner">
                <option value="">Tiada Penemuan</option>
                <option value="Kritikal">🔴 Kritikal</option>
                <option value="Lazim">🟡 Lazim</option>
                <option value="Berulang">🟠 Berulang</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-3 ml-1">Cadangan Penambahbaikan</label>
              <textarea v-model="findingForm.cadangan" rows="1" placeholder="Langkah pembetulan..."
                class="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-amber-100 focus:bg-white outline-none transition-all text-sm font-medium shadow-inner resize-none"></textarea>
            </div>
          </div>

          <div class="bg-blue-50/50 p-6 rounded-3xl border border-blue-100 shadow-sm">
            <h4 class="text-xs font-bold text-blue-800 uppercase tracking-widest mb-4 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Standardisasi
            </h4>
            <p class="text-[13px] text-blue-700 font-medium leading-relaxed">
              Data penemuan akan diselaraskan secara automatik ke modul <b>Penemuan (Audit Finding)</b>. Pastikan
              huraian padat dan jelas untuk memudahkan tindakan pembetulan (CAPA).
            </p>
          </div>
        </div>
      </div>

      <!-- Footer Buttons -->
      <div class="px-8 py-6 bg-white border-t border-gray-100 flex items-center justify-between rounded-b-3xl">
        <button v-if="currentStep === 2" @click="currentStep = 1"
          class="px-6 py-3 text-blue-600 font-bold hover:bg-blue-50 rounded-2xl transition-all duration-200 flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Kembali Ke Dokumen
        </button>
        <div v-else></div>

        <div class="flex items-center gap-3">
          <button @click="handleClose"
            class="px-6 py-3 font-bold text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-2xl transition-all duration-200">
            Batal
          </button>

          <button v-if="currentStep === 1" @click="currentStep = 2"
            class="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-2xl transform hover:translate-y-[-2px] hover:shadow-xl active:translate-y-0 active:shadow-md transition-all duration-200 flex items-center gap-2">
            Teruskan Ke Penemuan
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button v-else @click="saveEverything" :disabled="isSaving"
            class="px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-700 text-white font-bold rounded-2xl transform hover:translate-y-[-2px] hover:shadow-xl active:translate-y-0 active:shadow-md transition-all duration-200 disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none flex items-center gap-2">
            <svg v-if="isSaving" class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
            <span v-if="isSaving">Menyimpan...</span>
            <span v-else>Simpan Semua</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useSync } from '../composables/useSync'

const props = defineProps<{ show: boolean; item: any; formType: string; phase: string }>()
const emit = defineEmits<{ (e: 'close'): void; (e: 'saved'): void }>()

const sync = useSync()
const currentStep = ref(1)
const isSaving = ref(false)
const isLoadingExisting = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)
const message = ref<{ text: string; type: 'success' | 'error' } | null>(null)

const documentForm = ref({
  files: [] as File[],
  description: ''
})

const existingFiles = ref<any[]>([])

const findingForm = ref({
  penemuan: '',
  cadangan: '',
  kategori: '' as 'Kritikal' | 'Lazim' | 'Berulang' | ''
})

watch(() => props.show, (val) => {
  if (val) {
    currentStep.value = 1
    resetForms()
    loadExistingFiles()
  }
})

const loadExistingFiles = async () => {
  if (!props.item?.key) return

  isLoadingExisting.value = true
  try {
    const files = await sync.getDocumentFiles(props.phase || 'self', props.item.key)
    existingFiles.value = Array.isArray(files) ? files : []
  } catch (err) {
    console.error('Failed to load existing files:', err)
  } finally {
    isLoadingExisting.value = false
  }
}

const downloadFile = (file: any) => {
  if (file.url) {
    window.open(file.url, '_blank')
  } else if (file.id) {
    const url = sync.getDownloadUrl(file.id)
    window.open(url, '_blank')
  }
}

const formatDate = (dateString?: string) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleString('ms-MY', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const resetForms = () => {
  documentForm.value = { files: [], description: '' }
  findingForm.value = { penemuan: '', cadangan: '', kategori: '' }
  message.value = null
  existingFiles.value = []
}

const triggerFile = () => fileInput.value?.click()

const handleDocumentUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) addFiles(Array.from(target.files))
  target.value = ''
}

const handleFileDrop = (event: DragEvent) => {
  if (event.dataTransfer?.files) addFiles(Array.from(event.dataTransfer.files))
}

const addFiles = (newFiles: File[]) => {
  const validFiles = newFiles.filter(file => {
    if (file.size > 10 * 1024 * 1024) {
      message.value = { text: `${file.name} melebihi saiz 10MB`, type: 'error' }
      return false
    }
    return true
  })
  documentForm.value.files.push(...validFiles)
}

const removeDocumentFile = (index: number) => documentForm.value.files.splice(index, 1)

const saveEverything = async () => {
  if (documentForm.value.files.length === 0 && !findingForm.value.penemuan) {
    message.value = { text: 'Sila muat naik sekurang-kurangnya satu dokumen atau nyatakan penemuan', type: 'error' }
    return
  }

  isSaving.value = true
  try {
    const findingId = `AUDITS-${Date.now()}`

    // 1. Upload Documents if any
    if (documentForm.value.files.length > 0) {
      await sync.uploadFiles(
        documentForm.value.files,
        props.phase || 'self',
        props.item?.key || '',
        findingId
      )
    }

    // 2. Push Finding if any OR always push as a metadata record
    const findingPayload = {
      id: findingId,
      auditId: props.item?.key, // Link to audit item
      formType: props.formType,
      phase: props.phase,
      itemBil: props.item?.bil,
      itemPerkara: props.item?.perkara,
      penemuan: findingForm.value.penemuan || 'Tiada penemuan (Dokumen sokongan dimuat naik)',
      cadangan: findingForm.value.cadangan,
      kategori: findingForm.value.kategori || 'Lazim',
      description: documentForm.value.description,
      status: 'Baharu',
      pic: localStorage.getItem('currentUser') || 'Juruaudit',
      createdDate: new Date().toISOString()
    }

    await sync.pushFinding(props.phase, findingPayload)

    message.value = { text: 'Semua rekod berjaya disimpan!', type: 'success' }
    setTimeout(() => {
      emit('saved')
      handleClose()
    }, 1200)
  } catch (err: any) {
    message.value = { text: `Gagal menyimpan: ${err.message}`, type: 'error' }
  } finally {
    isSaving.value = false
  }
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return (bytes / Math.pow(k, i)).toFixed(1) + ' ' + ['Bytes', 'KB', 'MB'][i]
}

const getFileIconBg = (name: string) => {
  const ext = name.split('.').pop()?.toLowerCase()
  if (ext === 'pdf') return 'bg-rose-500'
  if (['doc', 'docx'].includes(ext!)) return 'bg-blue-500'
  if (['xls', 'xlsx'].includes(ext!)) return 'bg-emerald-500'
  if (['jpg', 'jpeg', 'png'].includes(ext!)) return 'bg-indigo-500'
  return 'bg-gray-500'
}

const handleClose = () => {
  if (isSaving.value) return
  emit('close')
}
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}
</style>
