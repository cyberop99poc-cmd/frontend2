<template>
  <main class="p-8 space-y-8">
    <!-- Form Section -->
    <section class="space-y-6">
      <div class="bg-white rounded-2xl shadow-lg border border-rose-100/50 p-8">
        <h2 class="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-700 bg-clip-text text-transparent mb-6">📝
          Butiran Sesi Audit</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Nama Juruaudit</label>
            <input v-model="auditorName" type="text" placeholder="Masukkan nama juruaudit"
              class="w-full px-4 py-3 border border-rose-200/50 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all text-sm bg-white/50 backdrop-blur">
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Tarikh Audit</label>
            <input v-model="auditDate" type="date"
              class="w-full px-4 py-3 border border-rose-200/50 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all text-sm mono bg-white/50 backdrop-blur">
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">ID Audit</label>
            <input type="text" :value="auditId" readonly
              class="w-full px-4 py-3 border border-rose-200/50 rounded-xl bg-rose-50/50 text-gray-600 text-sm mono">
          </div>
        </div>
      </div>

      <!-- Audit Table -->
      <div class="bg-white rounded-2xl shadow-lg border border-rose-100/50 overflow-hidden">
        <div class="bg-gradient-to-r from-rose-600 to-pink-700 px-8 py-6 flex items-center justify-between">
          <div class="flex-1">
            <div class="flex items-center gap-3">
              <h2 class="text-xl font-bold text-white">🔍 Pengurusan JLJ - Senarai Semak Audit</h2>
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
            <p class="text-rose-100 text-sm mt-2">Tandakan setiap item berdasarkan pemeriksaan anda</p>
          </div>
          <div class="flex items-center gap-3">
            <div class="text-lg text-rose-100 font-semibold">Jumlah Markah</div>
            <span
              class="inline-flex items-center px-6 py-3 rounded-xl text-2xl font-bold bg-white/15 text-white shadow-sm">
              {{ achievedPercentage }}%
            </span>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse text-sm">
            <thead>
              <tr class="bg-rose-50 border-b-2 border-rose-200">
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase w-12">Bil</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Perkara</th>
                <th class="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase w-20">Markah Penuh</th>
                <th colspan="6" class="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Skala Markah
                </th>
                <th class="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase w-20">Markah Dapat</th>
                <th class="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase w-24">Penemuan</th>
              </tr>
              <tr class="bg-white border-b border-rose-100">
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
              <template v-for="(item, idx) in flattenedItems" :key="`${item.key}`">
                <tr v-if="!item.isHeader && !item.isSubHeader"
                  :class="['border-b border-rose-50 hover:bg-rose-50/30 transition-colors']">
                  <td class="px-4 py-3">{{ item.bil }}</td>
                  <td class="px-4 py-3 text-gray-700">{{ item.perkara }}</td>
                  <td v-if="shouldShowMarkah(item.key)" class="px-4 py-3 text-center font-mono text-gray-600"
                    :rowspan="getSubItemCount(item.key)">
                    {{ getMarkahPenuhDisplay(item.key) }}
                  </td>
                  <td v-for="score in [0, 1, 2, 3, 4, 5]" :key="score" class="px-2 py-3 text-center">
                    <input v-if="item.markahPenuh" type="radio" :name="`score-${item.key}`" :value="score"
                      @change="setScore(item.key, score)"
                      class="w-4 h-4 cursor-pointer text-rose-600 focus:ring-rose-500">
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
                <tr v-else-if="item.isSubHeader" :class="['bg-gray-50 border-b border-rose-50']">
                  <td class="px-4 py-3 font-bold">{{ item.bil }}</td>
                  <td class="px-4 py-3 text-gray-700 font-bold">{{ item.perkara }}</td>
                  <td colspan="8"></td>
                </tr>
                <tr v-else :class="['bg-gray-100 border-b-2 border-rose-200']">
                  <td colspan="10" class="px-4 py-3 font-bold text-gray-800">{{ item.perkara }}</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>

        <div
          class="px-8 py-4 bg-gradient-to-r from-rose-50 to-pink-50 border-t border-rose-200/50 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="text-sm text-gray-700">
              Selesai: <span class="font-semibold text-rose-600">{{ completedCount }}</span> / <span>{{ totalItems
              }}</span>
              item
            </div>
            <div class="w-48 h-2.5 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-rose-600 to-pink-700 transition-all duration-300"
                :style="{ width: completionPercentage + '%' }"></div>
            </div>
          </div>
          <button @click="submitAudit()" :disabled="completedCount === 0"
            class="px-6 py-3 bg-gradient-to-r from-rose-600 to-pink-700 text-white font-semibold rounded-xl hover:shadow-lg transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
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
        <div class="bg-gradient-to-r from-rose-600 to-pink-700 px-8 py-6 flex-shrink-0">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-2xl font-bold text-white flex items-center gap-3">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Rujukan Audit
              </h3>
              <p class="text-rose-100 mt-1">Dokumen rujukan dan sumber maklumat</p>
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
            <div class="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-6 border border-rose-200">
              <h4 class="text-lg font-bold text-rose-900 mb-4 flex items-center gap-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                Rujukan Dokumen
              </h4>
              <ul class="space-y-2 text-sm max-h-96 overflow-y-auto">
                <li class="flex items-start gap-2">
                  <span class="text-rose-600 font-bold mt-1 flex-shrink-0">A.</span>
                  <p class="text-gray-700">Pekeliling Perbendaharaan 2018 - Pengurusan Aset (AM 2 - Tatacara Pengurusan
                    Aset
                    Alih Kerajaan).</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-rose-600 font-bold mt-1 flex-shrink-0">B.</span>
                  <p class="text-gray-700">SAK Bil 2/2022 - Garis Panduan Pengurusan Aset dan Stor Kerajaan di
                    Kementerian
                    Pertahanan Berdasarkan Pematuhan Kepada Pekeliling Perbendaharaan AM 1.1 Hingga 7.8.</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-rose-600 font-bold mt-1 flex-shrink-0">C.</span>
                  <p class="text-gray-700">SAK Bil 1/2020 - Garis Panduan Pengurusan Aset dan Stor Kerajaan di
                    Kementerian
                    Pertahanan Berdasarkan Pematuhan Kepada Pekeliling Perbendaharaan AM 1.1 Hingga 6.0.</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-rose-600 font-bold mt-1 flex-shrink-0">D.</span>
                  <p class="text-gray-700">PMAT 3/1999 - Tatacara Pembelian Runcit Angkatan Tentera (Pindaan Kedua
                    Kepada
                    PMAT 16/1991).</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-rose-600 font-bold mt-1 flex-shrink-0">E.</span>
                  <p class="text-gray-700">PMAT 9/1994 - Pindaan Kepada PMAT 16/1991 - Tatacara Pembelian Runcit
                    Angkatan
                    Tentera.</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-rose-600 font-bold mt-1 flex-shrink-0">F.</span>
                  <p class="text-gray-700">PMAT 16/1991 - Tatacara Pembelian Runcit dan Darurat Angkatan Tentera.</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-rose-600 font-bold mt-1 flex-shrink-0">G.</span>
                  <p class="text-gray-700">PATM Jil III Edisi 1/2023 - Bhg 2 Bab 2 - Dasar Senggaraan Kenderaan dan
                    Peralatan.</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-rose-600 font-bold mt-1 flex-shrink-0">H.</span>
                  <p class="text-gray-700">PATD 1982 39 - Tanggungjawab Membaiki Alat Elektronik.</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-rose-600 font-bold mt-1 flex-shrink-0">I.</span>
                  <p class="text-gray-700">PATD 1984 61 - Arahan Am Tambahan Untuk Pelaksanaan Laporan Kecacatan ke Atas
                    Kend, Peralatan & Peluru.</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-rose-600 font-bold mt-1 flex-shrink-0">J.</span>
                  <p class="text-gray-700">Peraturan Kejuruteraan Elektrik dan Jentera.</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-rose-600 font-bold mt-1 flex-shrink-0">K.</span>
                  <p class="text-gray-700">MP 13.3.1A TD - Operasi Umum JLJ, 2020.</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-rose-600 font-bold mt-1 flex-shrink-0">L.</span>
                  <p class="text-gray-700">MP 13.2.1A TD - Tatacara Teknikal Woksyop, 2021.</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-rose-600 font-bold mt-1 flex-shrink-0">M.</span>
                  <p class="text-gray-700">MP 13.2.2A TD - Perancangan dan Kawalan Pengeluaran (Sementara), 2009.</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-rose-600 font-bold mt-1 flex-shrink-0">N.</span>
                  <p class="text-gray-700">Arahan Teknikal JLJ.</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-rose-600 font-bold mt-1 flex-shrink-0">O.</span>
                  <p class="text-gray-700">Kenyataan Dasar Pengurusan Logistik (KDPL) Nombor 1, 2, 4 dan 5.</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-rose-600 font-bold mt-1 flex-shrink-0">P.</span>
                  <p class="text-gray-700">MASt - Pengurusan Senggaraan dan Rawatan Kenderaan Jenis A.</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-rose-600 font-bold mt-1 flex-shrink-0">Q.</span>
                  <p class="text-gray-700">MASt - Pengurusan Senggaraan dan Rawatan Kenderaan Jenis B.</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-rose-600 font-bold mt-1 flex-shrink-0">R.</span>
                  <p class="text-gray-700">MASt - Pengurusan Stor Senjata.</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-rose-600 font-bold mt-1 flex-shrink-0">S.</span>
                  <p class="text-gray-700">MK LOG TD.JLJ.(SENJATA).100-5/1/1(01) bertarikh 11 Apr 23 - Arahan Pengurusan
                    Pemeriksaan, Penyelenggaraan, Pembaikan & Dokumentasi Bagi Alat-Alat Instrumen TD.</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-rose-600 font-bold mt-1 flex-shrink-0">T.</span>
                  <p class="text-gray-700">MK LOG TD.JLJ (CIV).300-9/5/12(27) bertarikh 28 Ogos 19 - Arahan
                    Persiapan/Persediaan Pasukan Bagi Menghadapi Pemeriksaan Pakar JLJ.</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-rose-600 font-bold mt-1 flex-shrink-0">U.</span>
                  <p class="text-gray-700">MK LOG TD (PANG) 200-7/1/37 bertarikh 19 Jan 18 - Arahan Pengurusan
                    Pelaksanaan
                    Senggaraan dan Pembaikan Semua Kategori Kenderaan Serta Peralatan TD Tahun 2018.</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-rose-600 font-bold mt-1 flex-shrink-0">V.</span>
                  <p class="text-gray-700">MKTD/G4/5581 Jil. 20 (37) bertarikh 12 Jun 12 - Penggunaan Dokumen Kewangan
                    Pengurusan Aset Kerajaan Semasa Pemeriksaan Pakar.</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-rose-600 font-bold mt-1 flex-shrink-0">W.</span>
                  <p class="text-gray-700">MK TD/G-JLJ/1/UJI/42030 bertarikh 30 Dis 02 - Arahan Tatacara Pemeriksaan
                    Teknikal di Pasukan.</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-rose-600 font-bold mt-1 flex-shrink-0">X.</span>
                  <p class="text-gray-700">MPL/JLJ(PERIKSA)/43020 bertarikh 12 Jan 89 - Arahan Pelaksanaan Pemeriksaan
                    Teknikal Kenderaan Jenis B (Unit Monthly B Vehicle Technical Inspection).</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-end flex-shrink-0">
          <button @click="showRujukanModal = false"
            class="px-6 py-2.5 bg-gradient-to-r from-rose-600 to-pink-700 text-white rounded-xl hover:shadow-lg transition-all font-semibold">
            Tutup
          </button>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div
      :class="['fixed bottom-6 right-6 px-6 py-3 rounded-xl shadow-lg transform transition-all duration-300 flex items-center gap-3 z-50', toastVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0', toastType === 'success' ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white' : 'bg-gradient-to-r from-red-500 to-orange-500 text-white']">
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

const sync = useSync()

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

const auditScores = ref<AuditScore>({})

interface PenemuanForm {
  penemuan: string
  cadangan: string
  kategori: string
  files: File[]
}

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
      title: 'Rekod servis kenderaan tidak dikemas kini',
      description: 'Buku log servis kenderaan tidak dikemas kini secara berkala dan terdapat kenderaan yang tidak menjalani servis mengikut jadual.',
      kategori: 'Kritikal'
    },
    {
      title: 'Lesen kenderaan tamat tempoh',
      description: 'Beberapa kenderaan masih digunakan walaupun lesen kenderaan (road tax) telah tamat tempoh lebih 3 bulan.',
      kategori: 'Lazim'
    }
  ],
  'main-2': [
    {
      title: 'Kenderaan rosak tidak dilaporkan',
      description: 'Kenderaan yang mengalami kerosakan tidak dilaporkan kepada pegawai JLJ dan terus digunakan tanpa pembaikan.',
      kategori: 'Kritikal'
    }
  ],
  'main-3': [
    {
      title: 'Pemandu tidak mempunyai lesen memandu khas',
      description: 'Pemandu kenderaan berat tidak memiliki lesen memandu khas (GDL) yang diperlukan untuk mengendalikan kenderaan tersebut.',
      kategori: 'Sederhana'
    }
  ]
}

const getExamplesForItem = (key?: string): any[] => {
  if (!key) return []
  return exampleFindings[key as keyof typeof exampleFindings] || []
}

const auditorName = ref('')
const auditDate = ref(new Date().toISOString().split('T')[0])
const auditId = computed(() => `AUD-JLJ-${Date.now()}`)
const currentPhase = ref<'self' | 'commander' | 'aptd'>('self')
const toastVisible = ref(false)
const toastMessage = ref('')
const toastType = ref<'success' | 'error'>('success')

// Draft and metadata keys per phase
const draftKeyForPhase = (phaseSlug: string) => `jlj_auditScoresDraft_${phaseSlug}`
const findingsDataKeyForPhase = (phaseSlug: string) => `findingsData_${phaseSlug}`
const auditDataKeyForPhase = (phaseSlug: string) => `auditData_${phaseSlug}`

const showDocumentModal = ref(false)
const currentDocumentItem = ref<any>(null)
const formType = 'Pengurusan JLJ'
const penilaianTypeId = 15

const showPenemuanModal = ref(false)
const currentPenemuanItem = ref<any>(null)
const penemuanForm = ref<PenemuanForm>({
  penemuan: '',
  cadangan: '',
  kategori: '',
  files: []
})
const fileInput = ref<HTMLInputElement | null>(null)
const penemuanList = ref<PenemuanForm[]>([])

const showRujukanModal = ref(false)

const openPenemuanModal = (item?: any) => {
  currentPenemuanItem.value = item || null
  showPenemuanModal.value = true
}

const openDocumentModal = (item?: any) => {
  currentDocumentItem.value = item || null
  showDocumentModal.value = true
}

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
    formType: 'JLJ',
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
          { bil: '(1)', perkara: 'Pekeliling Perbendaharaan 2018 – Pengurusan Aset (AM 2 – Tatacara Pengurusan Aset Alih Kerajaan).' },
          { bil: '(2)', perkara: 'PATM Jil III Edisi 1/2023.' },
          { bil: '(3)', perkara: 'MP 13.3.1A TD - Operasi Umum JLJ, 2020.' },
          { bil: '(4)', perkara: 'MP 13.2.1A TD - Tatacara Teknikal Woksyop, 2021.' },
          { bil: '(6)', perkara: 'Kenyataan Dasar Pengurusan Lojistik (KDPL) Nombor 1, 2, 4 dan 5.' },
          { bil: '(7)', perkara: 'MASt - Pengurusan Senggaraan dan Rawatan Kenderaan Jenis A (jika berkaitan).' },
          { bil: '(8)', perkara: 'MASt - Pengurusan Senggaraan dan Rawatan Kenderaan Jenis B.' },
          { bil: '(9)', perkara: 'MASt - Pengurusan Stor Senjata.' },
          { bil: '(10)', perkara: 'JPTD/JPSS.' }
        ]
      }
    ]
  },
  {
    bil: '2',
    perkara: 'Pemeriksaan Pakar JLJ',
    isHeader: true,
    subItems: [
      {
        bil: 'a',
        perkara: 'Pemeriksaan dan Maklum Balas:',
        markahPenuh: 0.20,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Pemeriksaan dilaksanakan dalam kitaran tempoh 18 bulan dari pemeriksaan terdahulu/sebelum.' },
          { bil: '(2)', perkara: 'Laporan Pemeriksaan Pakar JLJ difailkan.' },
          { bil: '(3)', perkara: 'Maklum balas dibuat dalam masa 30 hari dan difailkan.' },
          { bil: '(4)', perkara: 'Semua teguran telah diambil tindakan.' }
        ]
      }
    ]
  },
  {
    bil: '3',
    perkara: 'Pengurusan Kenderaan Jenis A (jika berkaitan)',
    isHeader: true,
    subItems: [
      {
        bil: 'a',
        perkara: 'Pemeriksaan dokumen:',
        markahPenuh: 0.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Daftar Kenderaan Pasukan (BAT N 2).' },
          { bil: '(2)', perkara: 'Keadaan Harian Kenderaan/Peralatan Serta Perancangan Senggaraan dan Pemeriksaan (BAT M 100).' },
          { bil: '(3)', perkara: 'Buku Daftar Kerosakan.' },
          { bil: '(4)', perkara: 'Buku Permohonan Alat Ganti/Alat Rawatan.' },
          { bil: '(5)', perkara: 'Buku Rekod Kenderaan Jenis A (BAT M 88).' },
          { bil: '(6)', perkara: 'Borang Aduan Kerosakan Aset Alih Kerajaan (KEW.PA-10).' },
          { bil: '(7)', perkara: 'Laporan Pemeriksaan Kenderaan A Beroda (BAT M 32).' },
          { bil: '(8)', perkara: 'Akaun Petrol, Minyak dan Pelincir (BAT L 554) / Baucar Pengeluaran Petrol, Minyak dan Pelincir (BAT L 556).' },
          { bil: '(9)', perkara: 'Baucar Permohonan Untuk Stor (BAT L 139).' },
          { bil: '(10)', perkara: 'Senarai Aset Alih Kerajaan Yang Memerlukan Penyelenggaraan Berjadual (KEW.PA-14).' },
          { bil: '(11)', perkara: 'Borang Pengesahan Tindakan (Kemb A Kepada Rujuk X).' },
          { bil: '(12)', perkara: 'Buku Jadual Rawatan Kenderaan' }
        ]
      },
      {
        bil: 'b',
        perkara: 'Pemeriksaan fizikal kenderaan:',
        markahPenuh: 0.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Kebersihan kenderaan.' },
          { bil: '(2)', perkara: 'Tool kit yang dibekalkan bersama kenderaan.' },
          { bil: '(3)', perkara: 'Buku Pemeriksaan Tool Kit diwujudkan.' }
        ]
      },
      {
        bil: 'c',
        perkara: 'Peratusan pegangan dan servisibiliti:',
        markahPenuh: 0.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Peratus Pegangan = ' },
          { bil: '(2)', perkara: 'Peratus Servisibiliti =' }
        ]
      },
      {
        bil: 'd',
        perkara: 'Prestasi pembaikan:',
        markahPenuh: 0.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Jumlah Hari Dalam Wksp (JHDW).' },
          { bil: '(2)', perkara: 'Jumlah Hari Tunggu Alat Ganti (JHTA).' }
        ]
      }
    ]
  },
  {
    bil: '4',
    perkara: 'Pengurusan Kenderaan Jenis B',
    isHeader: true,
    subItems: [
      {
        bil: 'a',
        perkara: 'Pemeriksaan dokumen kenderaan:',
        markahPenuh: 1.30,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Daftar Kenderaan Pasukan (BAT N 2).' },
          { bil: '(2)', perkara: 'BAT M 100.' },
          { bil: '(3)', perkara: 'Buku Daftar Kerosakan.' },
          { bil: '(4)', perkara: 'Buku Permohonan Alat Ganti/Alat Rawatan.' },
          { bil: '(5)', perkara: 'Buku Rekod Kenderaan B (BAT M 59).' },
          { bil: '(6)', perkara: 'KEW.PA-10.' },
          { bil: '(7)', perkara: 'Penyata Pemeriksaan Kenderaan B (BAT M 35).' },
          { bil: '(8)', perkara: 'Sijil Pemeriksaan Kenderaan B (BAT M 60).' },
          { bil: '(9)', perkara: 'Laporan Pemeriksaan Teknikal Kenderaan Jenis B (BAT M 61).' },
          { bil: '(10)', perkara: 'BAT L 554 / BAT L 556.' },
          { bil: '(11)', perkara: 'BAT L 139.' },
          { bil: '(12)', perkara: 'KEW.PA-14.' },
          { bil: '(13)', perkara: 'Borang Pengesahan Tindakan (Kemb A Kepada Rujuk X).' },
          { bil: '(14)', perkara: 'Buku Jadual Rawatan Kenderaan' }
        ]
      },
      {
        bil: 'b',
        perkara: 'Pemeriksaan fizikal kenderaan:',
        markahPenuh: 1.30,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Kebersihan kenderaan.' },
          { bil: '(2)', perkara: 'Tool kit yang dibekalkan bersama kenderaan.' },
          { bil: '(3)', perkara: 'Buku Pemeriksaan Tool Kit diwujudkan.' }
        ]
      },
      {
        bil: 'c',
        perkara: 'Peratusan pegangan dan servisibiliti:',
        markahPenuh: 1.30,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Peratus Pegangan = ' },
          { bil: '(2)', perkara: 'Peratus Servisibiliti =' }
        ]
      },
      {
        bil: 'd',
        perkara: 'Prestasi Pembaikan:',
        markahPenuh: 1.30,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'JHDW.' },
          { bil: '(2)', perkara: 'JHTA.' }
        ]
      }
    ]
  },
  {
    bil: '5',
    perkara: 'Pengurusan Senjata Kecil dan Senjata Bantuan',
    isHeader: true,
    subItems: [
      {
        bil: 'a',
        perkara: 'Pemeriksaan dokumen senjata:',
        markahPenuh: 1.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Buku Rekod Alat-Alat Pelbagai (BAT M 430).' },
          { bil: '(2)', perkara: 'KEW.PA-10 dan Buku Daftar KEW.PA-10.' },
          { bil: '(3)', perkara: 'Laporan Pemeriksaan Senjata dan Instrumen (BAT M 58).' },
          { bil: '(4)', perkara: 'Sejarah Laras Mortar 81mm (BAT M 177).' },
          { bil: '(5)', perkara: 'Sejarah Laras Carl Gustav (BAT M 179).' },
          { bil: '(6)', perkara: 'Buku Pemeriksaan Senjata Mingguan dan Bulanan.' },
          { bil: '(7)', perkara: 'Buku Rekod Cuci Senjata.' }
        ]
      },
      {
        bil: 'b',
        perkara: 'Pemeriksaan fizikal:',
        markahPenuh: 1.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Kebersihan senjata dan rekod cuci senjata.' },
          { bil: '(2)', perkara: 'Alat bekerja, alat tambahan dan aksesori.' },
          { bil: '(3)', perkara: 'Alat-alat perenggu khas (jika ada).' },
          { bil: '(4)', perkara: 'Buku Pemeriksaan Alat-alat Perenggu Khas/Tool Kit.' }
        ]
      },
      {
        bil: 'c',
        perkara: 'Peratusan pegangan dan servisibiliti:',
        markahPenuh: 1.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Peratus Pegangan = ' },
          { bil: '(2)', perkara: 'Peratus Servisibiliti =' }
        ]
      },
      {
        bil: 'd',
        perkara: 'Prestasi pembaikan:',
        markahPenuh: 1.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'JHDW.' },
          { bil: '(2)', perkara: 'JHTA.' }
        ]
      }
    ]
  },
  {
    bil: '6',
    perkara: 'Pengurusan Meriam (jika berkaitan)',
    isHeader: true,
    subItems: [
      {
        bil: 'a',
        perkara: 'Pemeriksaan dokumen meriam:',
        markahPenuh: 0.80,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Laporan Pemeriksaan Pasukan Artileri (BAT M 20).' },
          { bil: '(2)', perkara: 'Laporan Pemeriksaan Harian-Meriam (BAT M 258).' },
          { bil: '(3)', perkara: 'Permohonan Untuk Pembaikan dan Laporan Terhadap Meriam (BAT M 56).' },
          { bil: '(4)', perkara: 'KEW. PA-10 dan Buku daftar KEW.PA-10.' },
          { bil: '(5)', perkara: 'Buku Sejarah Meriam (BAT M 69).' },
          { bil: '(6)', perkara: 'Buku Rekod Meriam (BAT M 89).' },
          { bil: '(7)', perkara: 'Rekod Harian Untuk Butir Tembakan (BAT M 90).' },
          { bil: '(8)', perkara: 'Breech Ring/Jacket History (BAT M 91).' },
          { bil: '(9)', perkara: 'Riwayat Sistem Bingkas (BAT M 92).' },
          { bil: '(10)', perkara: 'Carriage or Mounting History (BAT M 93).' },
          { bil: '(11)', perkara: 'Buku Pemeriksaan Mingguan dan Bulanan Meriam.' }
        ]
      },
      {
        bil: 'b',
        perkara: 'Pemeriksaan fizikal meriam:',
        markahPenuh: 0.80,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Kebersihan dan senggaraan.' },
          { bil: '(2)', perkara: 'Alat bekerja, alat tambahan dan aksesori (jika ada).' },
          { bil: '(3)', perkara: 'Alat-alat perenggu khas (jika ada).' },
          { bil: '(4)', perkara: 'Buku Pemeriksaan Alat-Alat Kelengkapan Meriam.' }
        ]
      },
      {
        bil: 'c',
        perkara: 'Peratusan pegangan dan servisibiliti:',
        markahPenuh: 0.80,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Peratus Pegangan = ' },
          { bil: '(2)', perkara: 'Peratus Servisibiliti =' }
        ]
      }
    ]
  },
  {
    bil: '7',
    perkara: 'Pengurusan Peralatan Pelbagai Kategori A dan B',
    isHeader: true,
    subItems: [
      {
        bil: 'a',
        perkara: 'Pemeriksaan dokumen:',
        markahPenuh: 1.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'BAT M 100.' },
          { bil: '(2)', perkara: 'BAT M 430.' },
          { bil: '(3)', perkara: 'Kad Kerja Jentera (BAT M 229).' },
          { bil: '(4)', perkara: 'Laporan Pemeriksaan Alat Pelbagai Kategori A (BAT M 28).' },
          { bil: '(5)', perkara: 'KEW. PA-10 dan Buku daftar KEW.PA-10.' },
          { bil: '(6)', perkara: 'Buku Rekod Jentera (BAT M 112) bagi Kategori A.' },
          { bil: '(7)', perkara: 'Rekod Pemeriksaan Bulanan Pasukan Terhadap Jentera (BAT M 113) bagi Kategori A.' },
          { bil: '(8)', perkara: 'BAT L 554 / BAT L 556.' },
          { bil: '(9)', perkara: 'Baucar Permohonan Untuk Stor (BAT L 139) bagi Kategori A.' },
          { bil: '(10)', perkara: 'Buku Jadual Rawatan.' }
        ]
      },
      {
        bil: 'b',
        perkara: 'Pemeriksaan nombor daftar dan fizikal peralatan.',
        markahPenuh: 1.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Pemeriksaan nombor daftar dan fizikal peralatan.' }
        ]
      },
      {
        bil: 'c',
        perkara: 'Peratusan pegangan dan servisibiliti:',
        markahPenuh: 1.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Peratus Pegangan = ' },
          { bil: '(2)', perkara: 'Peratus Servisibiliti =' }
        ]
      }
    ]
  },
  {
    bil: '8',
    perkara: 'Pengurusan Peralatan Instrumen',
    isHeader: true,
    subItems: [
      {
        bil: 'a',
        perkara: 'Pemeriksaan dokumen:',
        markahPenuh: 1.30,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'BAT M 100.' },
          { bil: '(2)', perkara: 'BAT M 430.' },
          { bil: '(3)', perkara: 'BAT M 58.' },
          { bil: '(4)', perkara: 'KEW. PA-10 dan Buku Daftar KEW.PA-10.' },
          { bil: '(5)', perkara: 'Buku Rawatan dan Pemanasan Gel Silika.' }
        ]
      },
      {
        bil: 'b',
        perkara: 'Pemeriksaan fizikal:',
        markahPenuh: 1.30,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Tempat penyimpanan bersesuaian.' },
          { bil: '(2)', perkara: 'Pemeriksaan nombor daftar dan fizikal peralatan.' },
          { bil: '(3)', perkara: 'Buku Pemeriksaan Peralatan Terkawal.' }
        ]
      },
      {
        bil: 'c',
        perkara: 'Peratusan pegangan dan servisibiliti:',
        markahPenuh: 1.30,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Peratus Pegangan = ' },
          { bil: '(2)', perkara: 'Peratus Servisibiliti =' }
        ]
      }
    ]
  },
  {
    bil: '9',
    perkara: 'Pengurusan Peralatan Elektronik',
    isHeader: true,
    subItems: [
      {
        bil: 'a',
        perkara: 'Pemeriksaan dokumen:',
        markahPenuh: 0.80,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'BAT M 100.' },
          { bil: '(2)', perkara: 'Buku Rekod Alatan Elektronik (BAT M 488).' },
          { bil: '(3)', perkara: 'KEW. PA-10 dan Buku Daftar KEW.PA-10.' }
        ]
      },
      {
        bil: 'b',
        perkara: 'Pemeriksaan fizikal:',
        markahPenuh: 0.80,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Tempat penyimpanan bersesuaian.' },
          { bil: '(2)', perkara: 'Pemeriksaan nombor daftar dan fizikal peralatan.' }
        ]
      },
      {
        bil: 'c',
        perkara: 'Peratusan pegangan dan servisibiliti:',
        markahPenuh: 0.80,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Peratus Pegangan = ' },
          { bil: '(2)', perkara: 'Peratus Servisibiliti =' }
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
