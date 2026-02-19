<template>
  <main class="p-8 space-y-8">
    <!-- Form Section -->
    <section class="space-y-6">
      <div class="bg-white rounded-2xl shadow-lg border border-yellow-100/50 p-8">
        <h2
          class="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-6">
          📝 Butiran Sesi Audit</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Nama Juruaudit</label>
            <input v-model="auditorName" type="text" placeholder="Masukkan nama juruaudit"
              class="w-full px-4 py-3 border border-yellow-200/50 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all text-sm bg-white/50 backdrop-blur">
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Tarikh Audit</label>
            <input v-model="auditDate" type="date"
              class="w-full px-4 py-3 border border-yellow-200/50 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all text-sm mono bg-white/50 backdrop-blur">
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">ID Audit</label>
            <input type="text" :value="auditId" readonly
              class="w-full px-4 py-3 border border-yellow-200/50 rounded-xl bg-yellow-50/50 text-gray-600 text-sm mono">
          </div>
        </div>
      </div>

      <!-- Audit Table -->
      <div class="bg-white rounded-2xl shadow-lg border border-yellow-100/50 overflow-hidden">
        <div class="bg-gradient-to-r from-yellow-600 to-orange-600 px-8 py-6 flex items-center justify-between">
          <div class="flex-1">
            <div class="flex items-center gap-3">
              <h2 class="text-xl font-bold text-white">🔍 Pengurusan Kebombaan - Senarai Semak Audit</h2>
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
            <p class="text-yellow-100 text-sm mt-2">Tandakan setiap item berdasarkan pemeriksaan anda</p>
          </div>
          <div class="flex items-center gap-3">
            <div class="text-lg text-yellow-100 font-semibold">Jumlah Markah</div>
            <span
              class="inline-flex items-center px-6 py-3 rounded-xl text-2xl font-bold bg-white/15 text-white shadow-sm">
              {{ achievedPercentage }}%
            </span>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse text-sm">
            <thead>
              <tr class="bg-yellow-50 border-b-2 border-yellow-200">
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase w-12">Bil</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Perkara</th>
                <th class="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase w-20">Markah Penuh</th>
                <th colspan="6" class="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Skala Markah
                </th>
                <th class="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase w-20">Markah Dapat</th>
                <th class="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase w-24">Penemuan</th>
              </tr>
              <tr class="bg-white border-b border-yellow-100">
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
                  :class="['border-b border-yellow-50 hover:bg-yellow-50/30 transition-colors']">
                  <td class="px-4 py-3">{{ item.bil }}</td>
                  <td class="px-4 py-3 text-gray-700">{{ item.perkara }}</td>
                  <td v-if="shouldShowMarkah(item.key)" class="px-4 py-3 text-center font-mono text-gray-600"
                    :rowspan="getSubItemCount(item.key)">
                    {{ getMarkahPenuhDisplay(item.key) }}
                  </td>
                  <td v-for="score in [0, 1, 2, 3, 4, 5]" :key="score" class="px-2 py-3 text-center">
                    <input v-if="item.markahPenuh" type="radio" :name="`score-${item.key}`" :value="score"
                      @change="setScore(item.key, score)"
                      class="w-4 h-4 cursor-pointer text-yellow-600 focus:ring-yellow-500">
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
                <tr v-else-if="item.isSubHeader" :class="['bg-gray-50 border-b border-yellow-50']">
                  <td class="px-4 py-3 font-bold">{{ item.bil }}</td>
                  <td class="px-4 py-3 text-gray-700 font-bold">{{ item.perkara }}</td>
                  <td colspan="8"></td>
                </tr>
                <tr v-else :class="['bg-gray-100 border-b-2 border-yellow-200']">
                  <td colspan="10" class="px-4 py-3 font-bold text-gray-800">{{ item.perkara }}</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>

        <div
          class="px-8 py-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-t border-yellow-200/50 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="text-sm text-gray-700">
              Selesai: <span class="font-semibold text-yellow-600">{{ completedCount }}</span> / <span>{{ totalItems
              }}</span>
              item
            </div>
            <div class="w-48 h-2.5 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-yellow-600 to-orange-600 transition-all duration-300"
                :style="{ width: completionPercentage + '%' }"></div>
            </div>
          </div>
          <button @click="submitAudit()" :disabled="completedCount === 0"
            class="px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
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

    <DocumentProofModal :show="showDocumentModal" :item="currentDocumentItem" :form-type="formType"
      :phase="currentPhase" @close="showDocumentModal = false" />

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
        <div class="bg-gradient-to-r from-yellow-600 to-orange-600 px-8 py-6 flex-shrink-0">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-2xl font-bold text-white flex items-center gap-3">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Rujukan Audit
              </h3>
              <p class="text-yellow-100 mt-1">Dokumen rujukan dan sumber maklumat</p>
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
            <div class="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
              <h4 class="text-lg font-bold text-yellow-900 mb-4 flex items-center gap-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                Rujukan Dokumen
              </h4>
              <ul class="space-y-2 text-sm">
                <li class="flex items-start gap-2">
                  <span class="text-yellow-600 font-bold mt-1">A.</span>
                  <p class="text-gray-700">Akta Perkhidmatan Bomba, 1988.</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-yellow-600 font-bold mt-1">B.</span>
                  <p class="text-gray-700">Arahan Teknikal Bomba TD Jil 1 Tahun 2023.</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-yellow-600 font-bold mt-1">C.</span>
                  <p class="text-gray-700">Arahan Teknikal Bomba TD Jil 2 Tahun 2023.</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-yellow-600 font-bold mt-1">D.</span>
                  <p class="text-gray-700">Arahan Teknikal PMP Tahun 2023.</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-yellow-600 font-bold mt-1">E.</span>
                  <p class="text-gray-700">PATD 4/1994 - Arahan Am Peningkatan Penguatkuasaan Langkah-Langkah
                    Keselamatan
                    Depot-depot dan Tempat Simpanan Peluru, Bom dan Bahan Letupan TD.</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-yellow-600 font-bold mt-1">F.</span>
                  <p class="text-gray-700">PATD 21/1994 - Pelaksanaan Langkah Pencegahan Kebakaran di Kem-kem TD.</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-yellow-600 font-bold mt-1">G.</span>
                  <p class="text-gray-700">PATD 1/1988 - Ambil Alih Peranan Bomba Domestik di Kem TD.</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-yellow-600 font-bold mt-1">H.</span>
                  <p class="text-gray-700">MP3.11.7.1A.TD - Manual Pengurusan dan Operasi Bomba TD.</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-yellow-600 font-bold mt-1">I.</span>
                  <p class="text-gray-700">MM 11.3.7A TD - Latihan Bomba TD.</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-yellow-600 font-bold mt-1">J.</span>
                  <p class="text-gray-700">MASt - Pengurusan Keselamatan dan Pencegahan Kebakaran Pasukan TD.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-end flex-shrink-0">
          <button @click="showRujukanModal = false"
            class="px-6 py-2.5 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold">
            Tutup
          </button>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div
      :class="['fixed bottom-6 right-6 px-6 py-3 rounded-xl shadow-lg transform transition-all duration-300 flex items-center gap-3 z-50', toastVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0', toastType === 'success' ? 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white' : 'bg-gradient-to-r from-red-500 to-orange-500 text-white']">
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
const auditId = computed(() => `AUD-BOM-${Date.now()}`)
const auditScores = ref<AuditScore>({})
const currentPhase = ref<'self' | 'commander' | 'aptd'>('self')
const toastVisible = ref(false)
const toastMessage = ref('')
const toastType = ref<'success' | 'error'>('success')

// Draft and metadata keys per phase
const draftKeyForPhase = (phaseSlug: string) => `kebombaan_auditScoresDraft_${phaseSlug}`
const findingsDataKeyForPhase = (phaseSlug: string) => `findingsData_${phaseSlug}`
const auditDataKeyForPhase = (phaseSlug: string) => `auditData_${phaseSlug}`

const formType = 'Pengurusan Kebombaan'
const penilaianTypeId = 16
const sync = useSync()
const showDocumentModal = ref(false)
const currentDocumentItem = ref<any>(null)

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

const exampleFindings = {
  'main-1': [
    {
      title: 'Prosedur EOD tidak dikemas kini',
      description: 'Prosedur pelupusan bom dan bahan letupan (EOD) tidak mengikut piawaian terkini dan tidak dikemas kini mengikut arahan ketua pasukan.',
      kategori: 'Kritikal'
    },
    {
      title: 'Peralatan keselamatan tidak lengkap',
      description: 'Peralatan keselamatan seperti suit EOD dan helmet tidak mencukupi untuk semua anggota pasukan kebombaan.',
      kategori: 'Lazim'
    }
  ],
  'main-2': [
    {
      title: 'Rekod pengendalian bahan letupan tidak teratur',
      description: 'Rekod penerimaan dan penggunaan bahan letupan tidak dikemas kini secara berkala dan terdapat ketidakselarasan dalam catatan.',
      kategori: 'Kritikal'
    }
  ],
  'main-3': [
    {
      title: 'Latihan EOD tidak mencukupi',
      description: 'Anggota baharu tidak menerima latihan EOD yang mencukupi sebelum ditugaskan untuk operasi sebenar.',
      kategori: 'Sederhana'
    }
  ]
}

const getExamplesForItem = (key?: string): any[] => {
  if (!key) return []
  return exampleFindings[key as keyof typeof exampleFindings] || []
}

const showRujukanModal = ref(false)

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
    formType: 'Kebombaan',
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
          { bil: '(1)', perkara: 'Arahan Teknikal Bomba TD Jil 1 Tahun 2023.' },
          { bil: '(2)', perkara: 'Arahan Teknikal Bomba TD Jil 2 Tahun 2023.' },
          { bil: '(3)', perkara: 'PATD 4/1994 dan 21/1994.' },
          { bil: '(4)', perkara: 'MP3.11.7.1A.TD - Manual Pengurusan dan Operasi Bomba TD.' },
          { bil: '(5)', perkara: 'MM 11.3.7A TD - Latihan Bomba TD.' },
          { bil: '(6)', perkara: 'MASt - Pengurusan Keselamatan dan Pencegahan Kebakaran Pasukan TD.' },
          { bil: '(7)', perkara: 'Sukatan Berek Tentera Darat Malaysia (SBTDM).' }
        ]
      },
      {
        bil: 'b',
        perkara: 'Perintah Tetap Kebakaran:',
        markahPenuh: 0.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Perintah Tetap diwujudkan dan kemaskini.' },
          { bil: '(2)', perkara: 'Perintah Tetap ditandatangani oleh Pegawai Memerintah/Pegawai Pemerintah.' },
          { bil: '(3)', perkara: 'Perintah Tetap dipamerkan di Balai Pengawal dan Papan kenyataan MK Pasukan, Kom, Pl dan Cwg.' }
        ]
      }
    ]
  },
  {
    bil: '2',
    perkara: 'Pengurusan Am',
    isHeader: true,
    subItems: [
      {
        bil: 'a',
        perkara: 'Tim Keselamatan Kebakaran Pasukan:',
        markahPenuh: 0.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Seorang Pegawai Bertauliah dilantik secara rasmi sebagai Pegawai Api Pasukan.' },
          { bil: '(2)', perkara: 'Pegawai Api Pasukan adalah yang bekelayakan dalam keselamatan kebakaran.' },
          { bil: '(3)', perkara: 'Seorang PTT Kanan dilantik sebagai Penolong Pegawai Api Pasukan.' },
          { bil: '(4)', perkara: 'Penolong Pegawai Api Pasukan adalah berkelayakan dalam keselamatan kebakaran.' },
          { bil: '(5)', perkara: 'Anggota PTT Rendah sebagai Piket Api dihantar mengikuti Seminar Piket Api pasukan.' },
          { bil: '(6)', perkara: 'Pasukan mempunyai Kumpulan Piket Api yang akan bertugas siap sedia selama 24 jam sehari dan disiarkan dalam PERBAH Satu.' },
          { bil: '(7)', perkara: 'Piket Api Pasukan bertugas mengikut Perintah Tetap yang dikeluarkan.' }
        ]
      },
      {
        bil: 'b',
        perkara: 'Pemeriksaan Pakar Bomba:',
        markahPenuh: 0.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Laporan pemeriksaan yang lepas telah diterima dan diambil tindakan.' },
          { bil: '(2)', perkara: 'Laporan pemeriksaan pakar yang lepas direkod dan disimpan.' },
          { bil: '(3)', perkara: 'Maklum balas laporan telah dimajukan ke MPL TD – Kump KP dalam tempoh 30 hari.' }
        ]
      },
      {
        bil: 'c',
        perkara: 'Buku-buku rekod disediakan dan kemas kini:',
        markahPenuh: 0.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Buku Rekod Selenggara Alat Pemadam Api Kecil (APAK) dan Penggera Kebakaran.' },
          { bil: '(2)', perkara: 'Buku Rekod Pemeriksaan Pili Bomba dan Bekalan Air Kecemasan (Emergency Water Supply - EWS).' },
          { bil: '(3)', perkara: 'Buku Rekod Latihan Tindakan Kebakaran Pasukan.' },
          { bil: '(4)', perkara: 'Buku Rekod Latihan Pencegahan Kebakaran.' },
          { bil: '(5)', perkara: 'Buku Rekod Kerjasama dengan Bomba TD atau Jabatan Bomba dan Penyelamat Malaysia (JBPM).' }
        ]
      }
    ]
  },
  {
    bil: '3',
    perkara: 'Pengurusan Peralatan Bomba',
    isHeader: true,
    subItems: [
      {
        bil: 'a',
        perkara: 'Peralatan Pili Bomba:',
        markahPenuh: 0.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Peralatan Pili Bomba yang ada di pasukan adalah mencukupi berpandukan SB TDM.' },
          { bil: '(2)', perkara: 'Semua penerimaan peralatan Pili Bomba pasukan direkodkan.' },
          { bil: '(3)', perkara: 'Pili Bomba termasuk peralatannya diselenggara setiap tiga bulan sekali dan juga selepas digunakan.' },
          { bil: '(4)', perkara: 'Peralatan Pili Bomba yang telah rosak dan tidak boleh digunakan dibuat pelupusan.' },
          { bil: '(5)', perkara: 'Peralatan didaftarkan sebagai Aset Alih Bernilai Rendah.' }
        ]
      },
      {
        bil: 'b',
        perkara: 'APAK:',
        markahPenuh: 0.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'APAK yang ada di pasukan adalah mencukupi berpandukan di dalam SB TDM.' },
          { bil: '(2)', perkara: 'Semua penerimaan APAK yang ada di pasukan direkodkan.' },
          { bil: '(3)', perkara: 'APAK ditempatkan di tempat-tempat yang sesuai mengikut jenis dan kawasan.' },
          { bil: '(4)', perkara: 'Semua APAK yang ada boleh digunakan pada sebilang masa.' },
          { bil: '(5)', perkara: 'APAK dibuat selenggara pada setiap bulan dan direkodkan ke dalam Buku Rekod Selenggara APAK.' },
          { bil: '(6)', perkara: 'APAK yang telah didarjahkan TEB dibuat pelupusan.' },
          { bil: '(7)', perkara: 'APAK didaftarkan sebagai Aset Alih Bernilai Rendah.' }
        ]
      },
      {
        bil: 'c',
        perkara: 'Sistem Perlindungan Kebakaran:',
        markahPenuh: 0.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Peralatan Sistem Perlindungan Kebakaran yang ada disenaraikan.' },
          { bil: '(2)', perkara: 'Sistem perlindungan kebakaran dalam keadaan baik dan berfungsi.' },
          { bil: '(3)', perkara: 'Laporan terhadap sistem perlindungan yang rosak/tidak berfungsi telah dibuat dan dimajukan ke formasi atasan.' },
          { bil: '(4)', perkara: 'Peralatan didaftarkan dalam Aset Tak Alih.' }
        ]
      },
      {
        bil: 'd',
        perkara: 'Pili Bomba/EWS:',
        markahPenuh: 0.20,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Pili bomba boleh digunakan sebilang masa.' },
          { bil: '(2)', perkara: 'Pili bomba diselenggara pada setiap tiga bulan sekali dan direkodkan ke dalam Buku Rekod Pemeriksaan Pili Bomba.' },
          { bil: '(3)', perkara: 'Kerosakan terhadap atas pili bomba dilaporkan kepada agensi yang berkaitan untuk tindakan pembaikan.' },
          { bil: '(4)', perkara: 'EWS dibuat penandaan dengan betul mengikut piawaian yang dikehendaki.' },
          { bil: '(5)', perkara: 'EWS dijaga dengan baik dan boleh digunakan sebilang masa.' }
        ]
      },
      {
        bil: 'e',
        perkara: 'Alat Penggera Kebakaran:',
        markahPenuh: 0.20,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Pasukan mempunyai alat penggera kebakaran berpandukan SB TDM.' },
          { bil: '(2)', perkara: 'Alat penggera kebakaran boleh memberikan isyarat ke seluruh kawasan pasukan.' },
          { bil: '(3)', perkara: 'Penggera kebakaran yang dimansuhkan telah dibuat pelupusan.' },
          { bil: '(4)', perkara: 'Alat penggera kebakaran berfungsi dan boleh digunakan.' },
          { bil: '(5)', perkara: 'Peralatan didaftarkan sebagai Aset Tak Alih Nilai Rendah.' }
        ]
      }
    ]
  },
  {
    bil: '4',
    perkara: 'Pengurusan Latihan Kebombaan',
    isHeader: true,
    subItems: [
      {
        bil: 'a',
        perkara: 'Latihan Tindakan Kebakaran:',
        markahPenuh: 0.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Latihan dilaksanakan empat (4) kali setahun.' },
          { bil: '(2)', perkara: 'Latihan direkodkan di dalam Buku Rekod Latihan Tindakan Kebakaran pasukan.' },
          { bil: '(3)', perkara: 'Latihan di RKAT dilaksanakan (bagi yang mempunyai pegangan RKAT).' }
        ]
      },
      {
        bil: 'b',
        perkara: 'Latihan Pencegahan Kebakaran:',
        markahPenuh: 0.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Latihan dilaksanakan dua (2) kali setahun.' },
          { bil: '(2)', perkara: 'Latihan direkodkan dalam Buku Rekod Latihan Pencegahan Kebakaran pasukan.' },
          { bil: '(3)', perkara: 'Latihan pengosongan bangunan/stor/garaj kenderaan dilaksana dan direkodkan.' },
          { bil: '(4)', perkara: 'Anggota berkeupayaan untuk melaksanakan kawad pili bomba (kawad hydrant).' },
          { bil: '(5)', perkara: 'Anggota berkeupayaan untuk memadam kebakaran kecil menggunakan APAK.' },
          { bil: '(6)', perkara: 'Anggota berkeupayaan untuk mengendalikan peralatan memadam kebakaran menggunakan hose reel.' },
          { bil: '(7)', perkara: 'Anggota berkeupayaan mengendalikan lain-lain peralatan memadam kebakaran yang ada di pasukan.' }
        ]
      },
      {
        bil: 'c',
        perkara: 'Kerjasama Dengan Pihak Bomba Tentera/JBPM:',
        markahPenuh: 0.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Kerjasama dengan pihak Bomba Tentera/JBPM dilaksanakan sekurang-kurangnya dua (2) kali setahun.' },
          { bil: '(2)', perkara: 'Kerjasama yang dilakukan bersama Bomba Tentera/JBPM direkodkan dalam buku.' }
        ]
      }
    ]
  },
  {
    bil: '5',
    perkara: 'Pengurusan Pencegahan Kebakaran',
    isHeader: true,
    subItems: [
      {
        bil: 'a',
        perkara: 'Rajah Pelan Keselamatan Kebakaran Pasukan:',
        markahPenuh: 0.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Pelan dipamerkan di laluan yang mudah dilihat.' },
          { bil: '(2)', perkara: 'Pelan memaparkan semua kedudukan APAK.' },
          { bil: '(3)', perkara: 'Kedudukan Pili Bomba dan EWS dipaparkan dalam pelan.' },
          { bil: '(4)', perkara: 'Lokasi Sistem Perlindungan Kebakaran dipaparkan dalam pelan.' },
          { bil: '(5)', perkara: 'Lokasi Tempat Berkumpul apabila berlaku kebakaran dipaparkan dalam pelan.' }
        ]
      },
      {
        bil: 'b',
        perkara: 'Keselamatan Elektrik:',
        markahPenuh: 0.20,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Peralatan elektrik yang digunakan adalah selamat dan diluluskan.' },
          { bil: '(2)', perkara: 'Tiada pendawaian elektrik yang tidak diluluskan di pasukan.' },
          { bil: '(3)', perkara: 'Tiada peralatan yang menjadi punca kepada bebanan elektrik digunakan.' },
          { bil: '(4)', perkara: 'Semua perkakas elektrik dimatikan sebelum meninggalkan bilik, pejabat dan stor.' },
          { bil: '(5)', perkara: 'Lampu parameter dan lampu limpah (floodlight) dimatikan pada siang hari.' },
          { bil: '(6)', perkara: 'Kerosakan terhadap peralatan dan sambungan elektrik diambil tindakan dan dilaporkan dengan segera.' },
          { bil: '(7)', perkara: 'Suis pemutus litar kendalian arus diperiksa bagi menentukan ianya berfungsi sebilang masa.' },
          { bil: '(8)', perkara: 'Tiada sebarang peralatan diletakan di suis utama elektrik yang boleh menghalang pergerakan anggota.' }
        ]
      },
      {
        bil: 'c',
        perkara: 'Keselamatan Kebakaran Stesen PMP (pasukan yang mempunyai Stesen PMP):',
        markahPenuh: 0.20,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Langkah-langkah keselamatan pencegahan kebakaran dilaksanakan.' },
          { bil: '(2)', perkara: 'Pemeriksaan dilaksanakan dengan kerap oleh Pemerintah atau Pegawai Bertugas bagi menentukan keselamatan kebakaran.' },
          { bil: '(3)', perkara: "Notis berikut dipamerkan: 'KAWASAN MERBAHAYA'." },
          { bil: '(4)', perkara: "Notis berikut dipamerkan: 'DILARANG MEROKOK'." },
          { bil: '(5)', perkara: "Notis berikut dipamerkan: 'MATIKAN ENJIN'." },
          { bil: '(6)', perkara: "Notis berikut dipamerkan: 'MATIKAN TELEFON BIMBIT'." },
          { bil: '(7)', perkara: "Notis berikut dipamerkan: 'DILARANG MEROKOK DI SEKITAR 15 METER KELILING'." }
        ]
      },
      {
        bil: 'd',
        perkara: 'Keselamatan Kebakaran Tempat Simpan Peluru (TSP) (pasukan yang mempunyai TSP):',
        markahPenuh: 0.10,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Simbol melawan kebakaran dipamerkan pagar masuk TSP.' },
          { bil: '(2)', perkara: 'Simbol melawan kebakaran dipamerkan di pintu stor mengikut jenis peluru/bahan letupan.' },
          { bil: '(3)', perkara: "Notis 'DILARANG MEROKOK' dipamerkan." },
          { bil: '(4)', perkara: 'Mempunyai APAK yang mencukupi.' }
        ]
      },
      {
        bil: 'e',
        perkara: 'Notis Peringatan dan Larangan:',
        markahPenuh: 0.10,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: "Notis 'TINDAKAN APABILA BERLAKU KEBAKARAN' dipamerkan di tempat yang mudah dilihat." },
          { bil: '(2)', perkara: "Notis 'SUIS UTAMA DI DALAM' dipamerkan di luar bangunan semua suis utama ditempatkan." },
          { bil: '(3)', perkara: "Notis 'TUTUP INJAP SELEPAS DIGUNAKAN' dipamerkan di tempat-tempat terdapatnya penggunaan gas." },
          { bil: '(4)', perkara: "Notis 'DILARANG MEROKOK' dipamerkan di semua bangunan pejabat dan stor." },
          { bil: '(5)', perkara: "Notis 'DILARANG MEROKOK DI SEKITAR 15 METER KELILING' dipamerkan di tempat penyimpanan Stor Bahan PMP dan Stor Gas." }
        ]
      },
      {
        bil: 'f',
        perkara: 'Keselamatan Am:',
        markahPenuh: 0.40,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Tidak merokok di tempat yang dilarang.' },
          { bil: '(2)', perkara: 'Menggunakan bekas habuk rokok yang bersesuaian.' },
          { bil: '(3)', perkara: 'Tidak memasak di tempat yang dilarang.' },
          { bil: '(4)', perkara: 'Menggunakan alas yang tidak mudah terbakar ketika memasak.' },
          { bil: '(5)', perkara: 'Menyediakan tempat khas untuk pembakaran sampah dan dalam jarak 15 meter dari bangunan.' },
          { bil: '(6)', perkara: 'Pemeriksaan pencegahan kebakaran dilaksanakan di RKAT/bilik bujang/pejabat/stor-stor.' },
          { bil: '(7)', perkara: 'Penyimpanan tong gas kosong dan berisi di Kompleks Sajian, Wisma Perwira dan Bintara mematuhi prosedur.' },
          { bil: '(8)', perkara: 'Tatacara penyimpanan di dalam stor mematuhi arahan pencegahan kebakaran.' },
          { bil: '(9)', perkara: 'Bahan mudah terbakar diasingkan pada tempat yang dikhaskan.' },
          { bil: '(10)', perkara: 'Bahan Letupan disimpan tempat yang dikhaskan.' },
          { bil: '(11)', perkara: 'Tong gas yang kosong dan berisi disusun secara berasingan di tempat simpanan.' },
          { bil: '(12)', perkara: 'Memeriksa saluran gas dari tong gas yang berisi ke bahagian dapur.' },
          { bil: '(13)', perkara: 'Mengawasi penggunaan lingkaran nyamuk dan lilin oleh anggota pasukan.' },
          { bil: '(14)', perkara: 'Peralatan stor tidak disusun sehingga mencecah siling.' },
          { bil: '(15)', perkara: 'Susunan peralatan di dalam stor mengikut tata cara pengurusan stor.' },
          { bil: '(16)', perkara: 'Tiada halangan di pintu keluar masuk stor.' },
          { bil: '(17)', perkara: 'Kenderaan awam/tentera ditempatkan di kawasan pakir yang telah disediakan.' },
          { bil: '(18)', perkara: 'Kenderaan awam tidak diletakkan di tempat-tempat yang dilarang.' },
          { bil: '(19)', perkara: 'Stor dilengkapi dengan peralatan memadam kebakaran.' }
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
    console.error('Failed to sync audit:', err)
    showToast('Audit disimpan secara lokal sahaja', 'error')
  }

  // Reset form
  setTimeout(() => {
    auditorName.value = ''
    auditScores.value = {}
    auditDate.value = new Date().toISOString().split('T')[0]
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
