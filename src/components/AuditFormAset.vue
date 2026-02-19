<template>
  <main class="p-8 space-y-8">
    <!-- Form Section -->
    <section class="space-y-6">
      <div class="bg-white rounded-2xl shadow-lg border border-amber-100/50 p-8">
        <h2 class="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-700 bg-clip-text text-transparent mb-6">
          📝 Butiran Sesi Audit</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Nama Juruaudit</label>
            <input v-model="auditorName" type="text" placeholder="Masukkan nama juruaudit"
              class="w-full px-4 py-3 border border-amber-200/50 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all text-sm bg-white/50 backdrop-blur">
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Tarikh Audit</label>
            <input v-model="auditDate" type="date"
              class="w-full px-4 py-3 border border-amber-200/50 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all text-sm mono bg-white/50 backdrop-blur">
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">ID Audit</label>
            <input type="text" :value="auditId" readonly
              class="w-full px-4 py-3 border border-amber-200/50 rounded-xl bg-amber-50/50 text-gray-600 text-sm mono">
          </div>
        </div>
      </div>

      <!-- Audit Table -->
      <div class="bg-white rounded-2xl shadow-lg border border-amber-100/50 overflow-hidden">
        <div class="bg-gradient-to-r from-amber-600 to-orange-700 px-8 py-6 flex items-center justify-between">
          <div class="flex-1">
            <div class="flex items-center gap-3">
              <h2 class="text-xl font-bold text-white">🔍 Pengurusan Aset & Stor Kerajaan - Senarai Semak Audit</h2>
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
            <p class="text-amber-100 text-sm mt-2">Tandakan setiap item berdasarkan pemeriksaan anda</p>
          </div>
          <div class="flex items-center gap-3">
            <div class="text-lg text-amber-100 font-semibold">Jumlah Markah</div>
            <span
              class="inline-flex items-center px-6 py-3 rounded-xl text-2xl font-bold bg-white/15 text-white shadow-sm">
              {{ achievedPercentage }}%
            </span>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse text-sm">
            <thead>
              <tr class="bg-amber-50 border-b-2 border-amber-200">
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase w-12">Bil</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Perkara</th>
                <th class="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase w-20">Markah Penuh</th>
                <th colspan="6" class="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Skala Markah
                </th>
                <th class="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase w-20">Markah Dapat</th>
                <th class="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase w-24">Penemuan</th>
              </tr>
              <tr class="bg-white border-b border-amber-100">
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
                  :class="['border-b border-amber-50 hover:bg-amber-50/30 transition-colors']">
                  <td class="px-4 py-3">{{ item.bil }}</td>
                  <td class="px-4 py-3 text-gray-700">{{ item.perkara }}</td>
                  <td v-if="shouldShowMarkah(item.key)" class="px-4 py-3 text-center font-mono text-gray-600"
                    :rowspan="getSubItemCount(item.key)">
                    {{ getMarkahPenuhDisplay(item.key) }}
                  </td>
                  <td v-for="score in [0, 1, 2, 3, 4, 5]" :key="score" class="px-2 py-3 text-center">
                    <input v-if="item.markahPenuh" type="radio" :name="`score-${item.key}`" :value="score"
                      @change="setScore(item.key, score)"
                      class="w-4 h-4 cursor-pointer text-amber-600 focus:ring-amber-500">
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
                <tr v-else-if="item.isSubHeader" :class="['bg-gray-50 border-b border-amber-50']">
                  <td class="px-4 py-3 font-bold">{{ item.bil }}</td>
                  <td class="px-4 py-3 text-gray-700 font-bold">{{ item.perkara }}</td>
                  <td colspan="8"></td>
                </tr>
                <tr v-else :class="['bg-gray-100 border-b-2 border-amber-200']">
                  <td colspan="10" class="px-4 py-3 font-bold text-gray-800">{{ item.perkara }}</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>

        <div
          class="px-8 py-4 bg-gradient-to-r from-amber-50 to-orange-50 border-t border-amber-200/50 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="text-sm text-gray-700">
              Selesai: <span class="font-semibold text-amber-600">{{ completedCount }}</span> / <span>{{ totalItems
              }}</span>
              item
            </div>
            <div class="w-48 h-2.5 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-amber-600 to-orange-700 transition-all duration-300"
                :style="{ width: completionPercentage + '%' }"></div>
            </div>
          </div>
          <button @click="submitAudit()" :disabled="completedCount === 0"
            class="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-700 text-white font-semibold rounded-xl hover:shadow-lg transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
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
        <div class="bg-gradient-to-r from-amber-600 to-orange-700 px-8 py-6 flex-shrink-0">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-2xl font-bold text-white flex items-center gap-3">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Rujukan Audit
              </h3>
              <p class="text-amber-100 mt-1">Dokumen rujukan dan sumber maklumat</p>
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
            <div class="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
              <h4 class="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                Rujukan Pengurusan Aset dan Stor Kerajaan
              </h4>
              <ul class="space-y-3 text-sm">
                <li class="flex items-start gap-3">
                  <span class="text-amber-600 font-bold min-w-[24px]">A.</span>
                  <p class="text-gray-700">Pekeliling Perbendaharaan 2018 – Pengurusan Aset (AM 1.1 hingga AM 7.8).</p>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-amber-600 font-bold min-w-[24px]">B.</span>
                  <p class="text-gray-700">SAK Bil 2/2022 – Garis Panduan Pengurusan Aset dan Stor Kerajaan di
                    Kementerian
                    Pertahanan Berdasarkan Pematuhan Kepada Pekeliling Perbendaharaan AM 1.1 Hingga 7.8.</p>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-amber-600 font-bold min-w-[24px]">C.</span>
                  <p class="text-gray-700">SAK Bil 1/2020 – Garis Panduan Pengurusan Aset dan Stor Kerajaan di
                    Kementerian
                    Pertahanan Berdasarkan Pematuhan Kepada Pekeliling Perbendaharaan AM 1.1 Hingga 6.0.</p>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-amber-600 font-bold min-w-[24px]">D.</span>
                  <p class="text-gray-700">PATM Jil III Edisi 1/2023.</p>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-amber-600 font-bold min-w-[24px]">E.</span>
                  <p class="text-gray-700">PAAT 1/1991 – Pelupusan Barang-Barang Yang Tidak Berguna Lagi/Telah Usang
                    atau
                    Berlebihan.</p>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-amber-600 font-bold min-w-[24px]">F.</span>
                  <p class="text-gray-700">PAAT 11/1989 – Pengurusan Stor Angkatan Tentera.</p>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-amber-600 font-bold min-w-[24px]">G.</span>
                  <p class="text-gray-700">MKTD/G4.100-1/9/44 bertarikh 2 Okt 18 - Arahan Pelaksanaan Tatacara
                    Pengurusan
                    Aset Alih Kerajaan.</p>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-amber-600 font-bold min-w-[24px]">H.</span>
                  <p class="text-gray-700">MKTD/G4/5561 JIL. 20 (37) bertarikh 12 Jun 12 - Penggunaan Dokumen Kewangan
                    Pengurusan Aset Kerajaan Semasa Pemeriksaan Pakar.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-end flex-shrink-0">
          <button @click="showRujukanModal = false"
            class="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-orange-700 text-white rounded-xl hover:shadow-lg transition-all font-semibold">
            Tutup
          </button>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div
      :class="['fixed bottom-6 right-6 px-6 py-3 rounded-xl shadow-lg transform transition-all duration-300 flex items-center gap-3 z-50', toastVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0', toastType === 'success' ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white' : 'bg-gradient-to-r from-red-500 to-orange-500 text-white']">
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
      title: 'Inventori aset tidak dikemas kini',
      description: 'Senarai inventori aset tidak dikemas kini dan terdapat peralatan baharu yang tidak direkodkan dalam sistem HRMIS.',
      kategori: 'Kritikal'
    },
    {
      title: 'Label aset hilang atau rosak',
      description: 'Label pengenalan aset (tag) pada peralatan hilang atau tidak boleh dibaca menyebabkan kesukaran semasa pengesahan fizikal.',
      kategori: 'Lazim'
    }
  ],
  'main-2': [
    {
      title: 'Aset lupus tidak dilaporkan',
      description: 'Peralatan yang telah rosak atau tidak boleh digunakan tidak dilaporkan untuk proses pelupusan (write-off).',
      kategori: 'Kritikal'
    }
  ],
  'main-3': [
    {
      title: 'Stor tidak teratur dan tidak selamat',
      description: 'Stor penyimpanan aset tidak tersusun dengan baik dan tidak mempunyai sistem keselamatan yang mencukupi.',
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
const auditId = computed(() => `AUD-AST-${Date.now()}`)
const currentPhase = ref<'self' | 'commander' | 'aptd'>('self')
const toastVisible = ref(false)
const toastMessage = ref('')
const toastType = ref<'success' | 'error'>('success')

// Draft and metadata keys per phase
const draftKeyForPhase = (phaseSlug: string) => `aset_auditScoresDraft_${phaseSlug}`
const findingsDataKeyForPhase = (phaseSlug: string) => `findingsData_${phaseSlug}`
const auditDataKeyForPhase = (phaseSlug: string) => `auditData_${phaseSlug}`

const showDocumentModal = ref(false)
const currentDocumentItem = ref<any>(null)
const formType = 'Pengurusan Aset & Stor Kerajaan'
const penilaianTypeId = 14

const showPenemuanModal = ref(false)
const currentPenemuanItem = ref<any>(null)
const penemuanForm = ref<PenemuanForm>({
  penemuan: '',
  cadangan: '',
  kategori: '',
  files: []
})
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
    formType: 'Aset & Stor Kerajaan',
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
    perkara: 'Perintah/Dasar/Arahan dan Peraturan:',
    isHeader: true,
    subItems: [
      {
        bil: 'a',
        perkara: 'Pasukan mempunyai dokumen berikut dalam simpanan sebagai rujukan:',
        markahPenuh: 0.10,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Pekeliling Perbendaharaan 2018 – Tatacara Pengurusan Aset Alih Kerajaan (AM 1.1 hingga AM 7.8).' },
          { bil: '(2)', perkara: 'SAK Bil 2/2022 – Garis Panduan Pengurusan Aset dan Stor Kerajaan di Kementerian Pertahanan Berdasarkan Pematuhan Kepada Pekeliling Perbendaharaan AM 1.1 Hingga 7.8.' },
          { bil: '(3)', perkara: 'PATM Jil III Edisi 1/2023.' },
          { bil: '(4)', perkara: 'PAAT 11/1989 dan 1/1991.' },
          { bil: '(5)', perkara: 'Direktif Panglima Formasi.' }
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
        perkara: 'Pelantikan Pegawai Aset:',
        markahPenuh: 1.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Pegawai Aset dilantik secara bertulis.' },
          { bil: '(2)', perkara: 'Pegawai Aset yang dilantik terdiri daripada Pegawai Bertauliah.' }
        ]
      },
      {
        bil: 'b',
        perkara: 'Unit Pengurusan Aset (UPA):',
        markahPenuh: 1.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'UPA ditubuhkan di peringkat pasukan.' },
          { bil: '(2)', perkara: 'UPA bertanggungjawab untuk menguruskan semua Aset Alih, Aset Hidup dan Stor meliputi penerimaan, pendaftaran, penggunaan, penyimpanan, pemeriksaan, penyelenggaraan, pelupusan serta kehilangan dan hapus kira.' }
        ]
      },
      {
        bil: 'c',
        perkara: 'Jawatankuasa Pengurusan Aset Kerajaan (JKPAK):',
        markahPenuh: 1.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'JKPAK peringkat pasukan diwujudkan dan keanggotaannya dipatuhi.' },
          { bil: '(2)', perkara: 'JKPAK melantik sekurang-kurangnya dua (2) orang Pegawai Pemeriksa atas nama jawatan dan tempoh lantikan tidak melebihi dua (2) tahun.' },
          { bil: '(3)', perkara: 'Mesyuarat JKPAK diadakan pada setiap 3 bulan sekali selepas tamat tempoh sesuatu suku tahun.' },
          { bil: '(4)', perkara: 'Laporan Suku Tahun diselaraskan untuk dibentang dalam mesyuarat JKPAK.' },
          { bil: '(5)', perkara: 'Hasil mesyuarat JKPAK dilaporkan kepada Jawatankuasa Pengurusan Kewangan dan Akaun (JPKA) PTJ.' }
        ]
      }
    ]
  },
  {
    bil: '3',
    perkara: 'Aset Alih Kerajaan:',
    isHeader: true,
    subItems: [
      {
        bil: 'a',
        perkara: 'Penerimaan:',
        markahPenuh: 2.40,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Pegawai Penerima dibuat pelantikan secara bertulis oleh Ketua Jabatan untuk menerima dan memeriksa aset alih.' },
          { bil: '(2)', perkara: 'Tugas dan tanggungjawab sebagai Pegawai Penerima dinyatakan dalam Senarai Tugas.' },
          { bil: '(3)', perkara: 'Pengesahan penerimaan menggunakan Borang Penerimaan Aset Alih (KEW.PA-1).' },
          { bil: '(4)', perkara: 'Butiran dalam dokumen yang sah disemak bagi memastikan aset yang diterima adalah betul.' },
          { bil: '(5)', perkara: 'Borang Penolakan Aset Alih (KEW.PA-2) disediakan serta-merta oleh Pegawai Penerima jika terdapat kerosakan, kuantiti kurang atau lebih dan tidak mematuhi spesifikasi.' },
          { bil: '(6)', perkara: 'Aset yang diterima disertakan dengan manual penggunaan dan penyelenggaraan (jika ada).' },
          { bil: '(7)', perkara: 'Aset yang diterima melalui kontrak pusat, sesalinan dokumen-dokumen seperti Pesanan Rasmi Kerajaan, Nota Serahan, Invois, Surat Jaminan dan dokumen-dokumen lain yang berkaitan diterima untuk tujuan pengesahan.' }
        ]
      },
      {
        bil: 'b',
        perkara: 'Pendaftaran:',
        markahPenuh: 2.40,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Aset yang diterima telah didaftarkan dalam Daftar Harta Modal (KEW.PA-3)/Daftar Aset Alih Bernilai Rendah (KEW.PA-4) dalam tempoh dua (2) minggu dari tarikh pengesahan penerimaan.' },
          { bil: '(2)', perkara: 'Aset Alih yang dibekalkan bersekali dengan bangunan telah didaftarkan.' },
          { bil: '(3)', perkara: 'Senarai aset yang disewa/sewa beli disediakan bagi tujuan rekod.' },
          { bil: '(4)', perkara: 'Aset yang dipindahkan antara PTJ/pasukan dengan PTJ/pasukan  lain telah mendapat kelulusan dan mengikut peraturan yang ditetapkan.' },
          { bil: '(5)', perkara: 'KEW.PA-3 dan KEW.PA-4 diwujudkan dan diselenggara dengan lengkap dan tepat.' },
          { bil: '(6)', perkara: 'Anggaran nilai semasa dikemaskini di KEW.PA-3 dan KEW.PA-4 pada setiap akhir tahun mengikut garis panduan yang ditetapkan.' },
          { bil: '(7)', perkara: 'Senarai Daftar Harta Modal (KEW.PA-5) dan Senarai Daftar Aset Alih Bernilai Rendah (KEW.PA-6) dwujudkan mengikut peraturan yang ditetapkan.' },
          { bil: '(8)', perkara: 'KEW.PA-5 dan KEW.PA-6 dikemaskini apabila terdapat Aset Alih Baharu, Aset Alih Dilupus atau Aset Alih Dihapus Kira.' },
          { bil: '(9)', perkara: 'No. Siri Pendaftaran yang seragam dicatatkan pada daftar Aset Alih dan pengesanan mengikut susunan.' },
          { bil: '(10)', perkara: 'Aset Alih diberi tanda pengenalan dengan cara melabel.' },
          { bil: '(11)', perkara: 'Senarai Aset Alih (KEW.PA-7) bagi Aset Alih yang ditempatkan di lokasi dipamerkan.' },
          { bil: '(12)', perkara: 'KEW.PA-7 adalah kemaskini.' },
          { bil: '(13)', perkara: 'Laporan Kedudukan Semasa Aset Alih (KEW. PA-8) disediakan dengan tepat dan mengikut format serta dibuat pengesahan Ketua Jabatan.' }
        ]
      },
      {
        bil: 'c',
        perkara: 'Penggunaan, Penyimpanan dan Pemeriksaan:',
        markahPenuh: 2.40,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Pinjaman dan pergerakan Aset Alih mendapat kebenaran bertulis dan direkod menggunakan Borang Permohonan Pinjaman dan Pergerakan Aset Alih (KEW.PA-9).' },
          { bil: '(2)', perkara: 'Kerosakan Aset Alih dilaporkan menggunakan Borang Aduan Kerosakan Aset Alih (KEW.PA-10).' },
          { bil: '(3)', perkara: 'Aset Alih yang menarik perhatian atau bernilai tinggi yang terdedah kepada risiko kehilangan disimpan di tempat yang selamat dan sentiasa di bawah kawalan pegawai yang bertanggungjawab.' },
          { bil: '(4)', perkara: 'Pemeriksaan terperinci oleh Pegawai Pemeriksa ke atas semua semua Aset Alih dilaksanakan sekurang-kurangnya sekali setahun.' },
          { bil: '(5)', perkara: 'Laporan  pemeriksaan menggunakan Borang Pemeriksaan Aset Alih (KEW.PA-11) dan Laporan Pemeriksaan Aset Alih (KEW.PA-12)dikemukakan kepada Ketua Jabatan dalam tempoh satu (1) bulan dari tarikh pemeriksaan.' },
          { bil: '(6)', perkara: 'Ketua Jabatan mengambil tindakan ke atas hasil penemuan yang dilaporkan.' },
          { bil: '(7)', perkara: 'Sijil Tahunan Pemeriksaan Aset Alih (KEW.PA-13) disediakan setelah pemeriksaan selesai dilaksanakan pada tahun semasa.' }
        ]
      },
      {
        bil: 'd',
        perkara: 'Penyelenggaraan:',
        markahPenuh: 2.40,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Harta Modal yang memerlukan penyelenggaraan dikenal pasti dan disenaraikan dalam Senarai Aset Alih Yang Memerlukan Penyelenggaraan Berjadual (KEW.PA-14).' },
          { bil: '(2)', perkara: 'Penyelenggaraan Aset Alih direkodkan dalam Rekod Penyelenggaraan Aset Alih (KEW.PA-15).' },
          { bil: '(3)', perkara: 'Jadual penyelenggaraan disediakan dan penyelenggaraan dilaksanakan mengikut jadual yang ditetapkan.' },
          { bil: '(3)', perkara: 'Aset Alih yang dibawa keluar untuk tujuan penyelenggaraan mendapat kelulusan bertulis daripada Ketua Jabatan/ Pegawai Aset dan direkodkan dalam KEW.PA-9/BAT L 5.' },
          { bil: '(4)', perkara: 'Penggantian Aset Alih melalui perjanjian/konsesi dilaksanakan selepas kelulusan Ketua Jabatan dengan menggunakan KEW.PA-10.' },
          { bil: '(5)', perkara: 'Laporan Penyelenggaraan Aset Alih (KEW.PA-16) disedia dan dikemukakan.' }
        ]
      },
      {
        bil: 'e',
        perkara: 'Pindahan:',
        markahPenuh: 2.40,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Pindahan Aset Alih adalah atas pertimbangan Ketua Jabatan dengan menggunakan Borang Pindahan Aset Alih (KEW.PA-17).' },
          { bil: '(2)', perkara: 'Laporan Pindahan Aset Alih (KEW.PA-18) disedia dan dikemukakan.' }
        ]
      },
      {
        bil: 'f',
        perkara: 'Pelupusan:',
        markahPenuh: 2.40,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Fail pelupusan disediakan dengan lengkap dan kemaskini.' },
          { bil: '(2)', perkara: 'Perakuan Pelupusan (KEW.PA-19) disediakan mengikut peraturan yang ditetapkan.' },
          { bil: '(3)', perkara: 'Borang Pelupusan Aset Alih (KEW.PA-21) disediakan bagi semua Aset Alih yang hendak dicadang untuk pelupusan.' },
          { bil: '(4)', perkara: 'Lembaga Pemeriksa Pelupusan (LPP) dilantik atas nama jawatan dan tempoh pelantikan tidak melebihi dua (2) tahun.' },
          { bil: '(5)', perkara: 'KEW.PA-3 dan KEW.PA-4 Aset Alih yang dilupus dikemaskini.' },
          { bil: '(6)', perkara: 'Pelupusan mengikut kaedah yang diluluskan dan dilaksanakan dalam tempoh enam (6) bulan dari tarikh kelulusan.' },
          { bil: '(7)', perkara: 'Tindakan sewajarnya diambil setelah Aset Alih dibuat pelupusan.' }
        ]
      },
      {
        bil: 'g',
        perkara: 'Kehilangan dan Hapus Kira:',
        markahPenuh: 2.40,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Pegawai yang mengetahui kehilangan bertanggungjawab melaporkan kehilangan kepada Ketua Jabatan dengan serta-merta dan membuat Laporan Polis dalam masa 24 jam.' },
          { bil: '(2)', perkara: 'Laporan Awal Kehilangan Aset Alih Kerajaan (KEW.PA-33) disedia dan dikemukakan beserta Laporan Polis (jika perlu) kepada Pegawai Pengawal.' },
          { bil: '(3)', perkara: 'UPA mengemukakan Sijil Hapus Kira Aset Alih (KEW.PA-36) dalam tempoh satu (1) bulan dari tarikh kelulusan dengan dokumen sokongan yang lengkap ke Bahagian Kewangan-Urusetia Kehilangan dan Hapuskira.' },
          { bil: '(4)', perkara: 'Laporan Hapus Kira Aset Alih (KEW.PA-37) disediakan oleh pasukan jika tindakan surcaj dikenakan ke atas individu yang terlibat dalam kehilangan.' }
        ]
      }
    ]
  },
  {
    bil: '4',
    perkara: 'Aset Hidup Kerajaan:',
    isHeader: true,
    subItems: [
      {
        bil: 'a',
        perkara: 'Aset Hidup (Haiwan) (jika berkaitan):',
        markahPenuh: 1.00,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Penerimaan: Borang Penerimaan Haiwan (KEW.AH-1) adalah lengkap dan tepat.' },
          { bil: '(a)', perkara: 'Dokumen-dokumen sokongan penerimaan disertakan.' },
          { bil: '(b)', perkara: 'Borang Penolakan Haiwan (KEW.AH-2) disediakan serta merta apabila haiwan yang diterima tidak menepati spesifikasi, kualiti dan kuantiti.' },
          { bil: '(2)', perkara: 'Pendaftaran: Daftar Haiwan Kategori A (KEW.AH-3) dan Senarai Daftar Haiwan (KEW.AH-5) disediakan dengan lengkap dan tepat.' },
          { bil: '(a)', perkara: 'Laporan Kedudukan Semasa Haiwan (KEW.AH-6) disedia dan dikemukakan kepada pihak atasan dalam tempoh ditetapkan.' },
          { bil: '(3)', perkara: 'Penggunaan, Penjagaan dan Pemeriksaan: Rekod Penjagaan dan Rawatan Haiwan (KEW.AH-7) disediakan dengan lengkap dan tepat.' },
          { bil: '(a)', perkara: 'Laporan Kekurangan/Sakit/Cedera/ Mati (KEW.AH-9) disediakan dengan lengkap dan tepat.' },
          { bil: '(b)', perkara: 'Laporan Penjagaan dan Hasil Jualan Haiwan (KEW.AH-10) disediakan dengan lengkap dan tepat.' },
          { bil: '(c)', perkara: 'Laporan Pemeriksaan Haiwan (KEW.AH-12) disediakan oleh Pegawai Aset dan dilaporkan dalam Mesyuarat JKPAK.' },
          { bil: '(d)', perkara: 'Sijil Tahunan Pemeriksaan Haiwan (KEW.AH-13) disahkan oleh Ketua Jabatan.' },
          { bil: '(4)', perkara: 'Pelupusan: Perakuan Pelupusan Haiwan (KEW.AH-16) disediakan bagi setiap Haiwan Kategori A yang hendak dilupuskan.' },
          { bil: '(a)', perkara: 'Borang Pelupusan Haiwan (KEW.AH-18) disediakan dan dilengkapkan oleh Lembaga Pemeriksa.' },
          { bil: '(b)', perkara: 'Sijil Penyaksian Pelepasan/ Pemusnahan Haiwan (KEW.AH-19) disediakan bagi haiwan yang dilupus melalui kaedah musnah.' },
          { bil: '(c)', perkara: 'Sijil Pelupusan Haiwan (KEW.AH-20) disedia dan dimajukan kepada UPA Program Darat semasa laporan tahunan.' },
          { bil: '(5)', perkara: 'Kehilangan dan Hapus Kira: Laporan Awal Kehilangan Haiwan Kerajaan (KEW.AH-27) disediakan.' },
          { bil: '(a)', perkara: 'Pelantikan Jawatankuasa  Penyiasat Kehilangan Haiwan (KEW.AH-28) disediakan dalam tempoh dua (2) minggu dari tarikh Laporan Awal ditandatangani.' },
          { bil: '(b)', perkara: 'Laporan Akhir Kehilangan Haiwan (KEW.AH-29) disediakan lengkap, tepat dan dimajukan kepada pihak atasan dalam tempoh ditetapkan.' },
          { bil: '(c)', perkara: 'Sijil Hapus Kira Haiwan (KEW.AH-30) disediakan dalam tempoh 1 bulan dari tarikh kelulusan dan dimajukan kepada Kuasa Melulus.' }
        ]
      },
      {
        bil: 'b',
        perkara: 'Aset Hidup (Tumbuhan) (jika berkaitan):',
        markahPenuh: 1.00,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Penerimaan: Pegawai Penerima Aset Hidup Tumbuhan Pasukan dilantik secara bertulis.' },
          { bil: '(a)', perkara: 'Borang Penerimaan Tumbuhan (KEW.AT-1) disediakan.' },
          { bil: '(b)', perkara: 'Dokumen-dokumen sokongan penerimaan disediakan.' },
          { bil: '(c)', perkara: 'Borang Penolakan Tumbuhan (KEW.AT-2) disediakan apabila tumbuhan yang diterima tidak menepati spesifikasi biologi, kualiti dan kuantiti sebagaimana yang dipesan.' },
          { bil: '(2)', perkara: 'Pendaftaran: Pendaftaran tumbuhan dilaksanakan dalam tempoh dua (2) minggu dari tarikh pengesahan penerimaan.' },
          { bil: '(a)', perkara: 'Daftar Tumbuhan (KEW.AT-3) disediakan mengikut Kelas Tumbuhan.' },
          { bil: '(b)', perkara: 'Daftar Bahan Tanaman (KEW.AT-4) disediakan lengkap dan tepat.' },
          { bil: '(c)', perkara: 'Senarai Daftar Tumbuhan (KEW.AT-5) disediakan mengikut tahun semasa.' },
          { bil: '(3)', perkara: 'Pengendalian dan Penggunaan: Rekod Penjagaan Tumbuhan (KEW.AT-7) disediakan dengan lengkap dan tepat.' },
          { bil: '(a)', perkara: 'Borang Laporan Kekurangan/ Kerosakan/Kemusnahan/Kematian (KEW.AT-9) disediakan apabila berlaku kes berkenaan.' },
          { bil: '(b)', perkara: 'Laporan Penjagaan dan Rawatan Tumbuhan (KEW.AT-10) disediakan dengan lengkap dan tepat.' },
          { bil: '(4)', perkara: 'Pemeriksaan: Borang Pemeriksaan Tumbuhan (KEW.AT-11) digunakan semasa pemeriksaan.' },
          { bil: '(a)', perkara: 'Laporan Pemeriksaan Tumbuhan (KEW.AT-12) disediakan oleh Pegawai Aset dan dilaporkan dalam Mesyuarat JKPAK.' },
          { bil: '(b)', perkara: 'Sijil Pemeriksaan Tumbuhan (KEW.AT-13) disedia dan disahkan oleh Ketua Jabatan.' },
          { bil: '(5)', perkara: 'Pindahan: Borang Pindahan Tumbuhan (KEW.AT-14) disediakan lengkap, tepat dan diselenggarakan.' },
          { bil: '(a)', perkara: 'Laporan Pindahan Tumbuhan (KEW. AT-15) disediakan lengkap dan tepat.' },
          { bil: '(6)', perkara: 'Pelupusan: Perakuan Pelupusan Tumbuhan (KEW.AT-16) disediakan bagi setiap Tanaman Kekal dan Tanaman Bukan Kekal yang hendak dilupuskan.' },
          { bil: '(a)', perkara: 'Sijil Penyaksian Pemusnahan Tumbuhan (KEW.AT-19) disediakan bagi tumbuhan yang dilupus melalui kaedah musnah.' },
          { bil: '(7)', perkara: 'Kehilangan dan Hapus Kira: Laporan Awal Kehilangan Aset Tumbuhan Kerajaan (KEW. AT-28) dan Laporan Polis disedia serta dimajukan kepada Pegawai Pengawal.' },
          { bil: '(a)', perkara: 'Laporan Akhir Kehilangan Aset Tumbuhan (KEW. AT-30) disediakan oleh Jawatankuasa Penyiasat dalam tempoh 2 bulan dari tarikh perlantikan.' },
          { bil: '(b)', perkara: 'Sijil Hapus Kira Aset Tumbuhan Kerajaan (KEW. AT-31) disediakan setelah kelulusan hapus kira diperolehi.' },
          { bil: '(c)', perkara: 'Laporan Hapus Kira Tumbuhan (KEW. AT-32) disediakan.' }
        ]
      }
    ]
  },
  {
    bil: '5',
    perkara: 'Stor Kerajaan:',
    isHeader: true,
    subItems: [
      {
        bil: 'a',
        perkara: 'Penerimaan:',
        markahPenuh: 2.00,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Pegawai Penerima Barang-Barang Stor dibuat lantikan rasmi.' },
          { bil: '(2)', perkara: 'Barang-Barang Stor yang diterima dibuat pemeriksaan dengan teliti.' },
          { bil: '(3)', perkara: 'Barang yang diterima daripada pembekal direkodkan dalam Borang Terimaan Barang-Barang (KEW.PS-1).' },
          { bil: '(4)', perkara: 'Penerimaan barang-barang daripada pembekal dibekalkan salinan dokumen berkaitan.' },
          { bil: '(5)', perkara: 'KEW.PS-1 dibuat pengesahan oleh Pegawai Penerima.' },
          { bil: '(6)', perkara: 'Borang Penolakan Barang-Barang (KEW. PS-2) disediakan oleh Pegawai Penerima sekiranya terdapat kerosakan, kuantiti kurang/lebih atau tidak memenuhi spesifikasi.' }
        ]
      },
      {
        bil: 'b',
        perkara: 'Merekod Stok:',
        markahPenuh: 2.00,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Setiap stok direkodkan dalam tempoh dua (2) minggu dari tarikh pengesahan penerimaan.' },
          { bil: '(2)', perkara: 'Semua stok yang diterima oleh stor direkodkan dalam Kad Daftar Stok (KEW. PS-3).' },
          { bil: '(3)', perkara: 'KEW. PS-3 diisi dengan lengkap dan tepat.' },
          { bil: '(4)', perkara: 'Setiap penerimaan direkodkan dalam KEW. PS-3 direkod dengan pen dakwat merah dan pengeluaran direkod dengan pen dakwat hitam atau biru.' },
          { bil: '(5)', perkara: 'Senarai Kad Daftar Stok (KEW. PS-4) disediakan.' },
          { bil: '(6)', perkara: 'Borang Penentuan Kumpulan Stok (KEW. PS-5) digunakan untuk menyenaraikan stok mengikut nilai pembelian bagi tempoh dua (2) tahun lepas.' },
          { bil: '(7)', perkara: 'Komponen atau alat ganti cannibalize disimpan dalam stor dan direkodkan secara berasingan.' }
        ]
      },
      {
        bil: 'c',
        perkara: 'Penyimpanan:',
        markahPenuh: 2.00,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Ruang stor digunakan sepenuhnya dengan mengambil kira faktor keselamatan, kemudahan pengeluaran, verifikasi, pemeriksaan, penyelenggaraan dan kekemasan stor.' },
          { bil: '(2)', perkara: 'Susun atur stok dipraktikkan dalam stor.' },
          { bil: '(3)', perkara: 'Tarikh luput stok dicatatkan pada setiap kotak, bekas atau bungkusan.' },
          { bil: '(4)', perkara: 'Senarai Stok Bertarikh Luput (KEW. PS-6) disediakan oleh Pegawai Stor merekodkan kuantiti stok bertarikh luput dalam bulan yang sama.' }
        ]
      },
      {
        bil: 'd',
        perkara: 'Pengeluaran:',
        markahPenuh: 2.00,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Borang Permohonan Stok (Antara Stor) (KEW. PS-7)/Borang Permohonan Stok (Individu Kepada Stor) (KEW. PS-8) digunakan.' },
          { bil: '(2)', perkara: 'Borang Pembungkusan (KEW. PS-9) disediakan oleh Bahagian Bungkusan dan Penghantaran.' }
        ]
      },
      {
        bil: 'e',
        perkara: 'Pemeriksaan:',
        markahPenuh: 2.00,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Verifikasi Stor dilaksanakan mengikut program/jadual yang ditetapkan.' },
          { bil: '(2)', perkara: 'Pemeriksaan dilakukan ke atas semua jenis stor secara seratus peratus.' },
          { bil: '(3)', perkara: 'Borang Verifikasi Stor (KEW. PS-10) disedia dan dilengkapkan.' },
          { bil: '(4)', perkara: 'Borang Penilaian Prestasi Pengurusan Stor (KEW. PS-11) disedia dan dilengkapkan untuk melaporkan prestasi pengurusan stor secara keseluruhan.' },
          { bil: '(5)', perkara: 'Sijil Verifikasi Stor (KEW. PS-12) disediakan.' },
          { bil: '(6)', perkara: 'Laporan Verifikasi Stor (KEW. PS-13) disediakan.' },
          { bil: '(7)', perkara: 'Laporan Kedudukan Stok (KEW. PS-14) disediakan setiap suku tahun bagi semua kategori stor.' },
          { bil: '(8)', perkara: 'Penyata Pelarasan Stok (KEW. PS-15) disedia dan dikemukakan kepada Ketua Jabatan untuk kelulusan.' },
          { bil: '(9)', perkara: 'Perakuan Ambil Alih (KEW. PS-16) disediakan dalam tempoh 2 minggu dari tarikh mengambil alih stor.' }
        ]
      },
      {
        bil: 'f',
        perkara: 'Keselamatan dan Kebersihan:',
        markahPenuh: 2.00,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Tahap keselamatan dan kebersihan peralatan dan stor diberi perhatian, memuaskan dan mematuhi Arahan Keselamatan Kerajaan.' },
          { bil: '(2)', perkara: 'Penyelenggaraan stor dan stok dilaksanakan dari semasa ke semasa.' }
        ]
      },
      {
        bil: 'g',
        perkara: 'Pindahan:',
        markahPenuh: 2.00,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Stok yang dipindah alih didaftarkan dalam tempoh 2 minggu dari tarikh pengesahan penerimaan.' },
          { bil: '(2)', perkara: 'Borang Pindahan Stok (KEW. PS-17) digunakan.' },
          { bil: '(3)', perkara: 'Laporan Pindahan Stok (KEW. PS-18) disedia dan dikemukakan kepada pihak atasan dalam tempoh ditetapkan.' }
        ]
      },
      {
        bil: 'h',
        perkara: 'Pelupusan:',
        markahPenuh: 2.00,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Surat Lantikan Lembaga Pemeriksa Pelupusan Stok (KEW. PS-19) digunakan.' },
          { bil: '(2)', perkara: 'Borang Pelupusan Stok (KEW. PS-20) disediakan dengan lengkap dan tepat.' },
          { bil: '(3)', perkara: 'Sijil Pelupusan Stok (KEW. PS-22) disedia dan dikemukakan kepada Kuasa Melulus.' }
        ]
      },
      {
        bil: 'i',
        perkara: 'Kehilangan dan Hapus Kira:',
        markahPenuh: 2.00,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Laporan Awal Kehilangan Stok Kerajaan (KEW.PS-32) dan sertakan Laporan Polis (jika perlu) disediakan kepada Pegawai Pengawal.' },
          { bil: '(2)', perkara: 'Laporan Akhir Kehilangan Stok Kerajaan (KEW. PS-34) disertakan dengan dokumen sokongan KEW. PS-3 atau gambar dan Laporan Penyiasatan Polis (jika ada).' },
          { bil: '(3)', perkara: 'Sijil Hapus Kira Stok (KEW. PS-35) dikemukakan dalam tempoh satu (1) bulan dari tarikh kelulusan dengan dokumen sokongan yang lengkap ke Bahagian Kewangan-Urusetia Kehilangan dan Hapus kira.' },
          { bil: '(4)', perkara: 'Laporan Hapus Kira Stok (KEW. PS-36) disedia dan dikemukakan kepada pihak atasan dalam tempoh yang ditetapkan.' },
          { bil: '(5)', perkara: 'Laporan Hapus Kira Aset Alih (KEW. PA-37) disediakan oleh pasukan jika tindakan surcaj dikenakan ke atas individu yang terlibat dalam kehilangan.' }
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
