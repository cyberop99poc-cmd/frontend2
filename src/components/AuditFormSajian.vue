<template>
  <main class="p-8 space-y-8">
    <!-- Form Section -->
    <section class="space-y-6">
      <div class="bg-white rounded-2xl shadow-lg border border-lime-100/50 p-8">
        <h2 class="text-2xl font-bold bg-gradient-to-r from-lime-600 to-green-700 bg-clip-text text-transparent mb-6">📝
          Butiran Sesi Audit</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Nama Juruaudit</label>
            <input v-model="auditorName" type="text" placeholder="Masukkan nama juruaudit"
              class="w-full px-4 py-3 border border-lime-200/50 rounded-xl focus:ring-2 focus:ring-lime-500 focus:border-transparent outline-none transition-all text-sm bg-white/50 backdrop-blur">
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Tarikh Audit</label>
            <input v-model="auditDate" type="date"
              class="w-full px-4 py-3 border border-lime-200/50 rounded-xl focus:ring-2 focus:ring-lime-500 focus:border-transparent outline-none transition-all text-sm mono bg-white/50 backdrop-blur">
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">ID Audit</label>
            <input type="text" :value="auditId" readonly
              class="w-full px-4 py-3 border border-lime-200/50 rounded-xl bg-lime-50/50 text-gray-600 text-sm mono">
          </div>
        </div>
      </div>

      <!-- Audit Table -->
      <div class="bg-white rounded-2xl shadow-lg border border-lime-100/50 overflow-hidden">
        <div class="bg-gradient-to-r from-lime-600 to-green-700 px-8 py-6 flex items-center justify-between">
          <div class="flex-1">
            <div class="flex items-center gap-3">
              <h2 class="text-xl font-bold text-white">🔍 Pengurusan Sajian - Senarai Semak Audit</h2>
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
            <p class="text-lime-100 text-sm mt-2">Tandakan setiap item berdasarkan pemeriksaan anda</p>
          </div>
          <div class="flex items-center gap-3">
            <div class="text-lg text-lime-100 font-semibold">Jumlah Markah</div>
            <span
              class="inline-flex items-center px-6 py-3 rounded-xl text-2xl font-bold bg-white/15 text-white shadow-sm">
              {{ achievedPercentage }}%
            </span>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse text-sm">
            <thead>
              <tr class="bg-lime-50 border-b-2 border-lime-200">
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase w-12">Bil</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Perkara</th>
                <th class="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase w-20">Markah Penuh</th>
                <th colspan="6" class="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Skala Markah
                </th>
                <th class="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase w-20">Markah Dapat</th>
                <th class="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase w-24">Penemuan</th>
              </tr>
              <tr class="bg-white border-b border-lime-100">
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
                  :class="['border-b border-lime-50 hover:bg-lime-50/30 transition-colors']">
                  <td class="px-4 py-3">{{ item.bil }}</td>
                  <td class="px-4 py-3 text-gray-700">{{ item.perkara }}</td>
                  <td v-if="shouldShowMarkah(item.key)" class="px-4 py-3 text-center font-mono text-gray-600"
                    :rowspan="getSubItemCount(item.key)">
                    {{ getMarkahPenuhDisplay(item.key) }}
                  </td>
                  <td v-for="score in [0, 1, 2, 3, 4, 5]" :key="score" class="px-2 py-3 text-center">
                    <input v-if="item.markahPenuh" type="radio" :name="`score-${item.key}`" :value="score"
                      @change="setScore(item.key, score)"
                      class="w-4 h-4 cursor-pointer text-lime-600 focus:ring-lime-500">
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
                <tr v-else-if="item.isSubHeader" :class="['bg-gray-50 border-b border-lime-50']">
                  <td class="px-4 py-3 font-bold">{{ item.bil }}</td>
                  <td class="px-4 py-3 text-gray-700 font-bold">{{ item.perkara }}</td>
                  <td colspan="8"></td>
                </tr>
                <tr v-else :class="['bg-gray-100 border-b-2 border-lime-200']">
                  <td colspan="10" class="px-4 py-3 font-bold text-gray-800">{{ item.perkara }}</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>

        <div
          class="px-8 py-4 bg-gradient-to-r from-lime-50 to-green-50 border-t border-lime-200/50 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="text-sm text-gray-700">
              Selesai: <span class="font-semibold text-lime-600">{{ completedCount }}</span> / <span>{{ totalItems
              }}</span>
              item
            </div>
            <div class="w-48 h-2.5 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-lime-600 to-green-700 transition-all duration-300"
                :style="{ width: completionPercentage + '%' }"></div>
            </div>
          </div>
          <button @click="submitAudit()" :disabled="completedCount === 0"
            class="px-6 py-3 bg-gradient-to-r from-lime-600 to-green-700 text-white font-semibold rounded-xl hover:shadow-lg transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
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
            <div v-for="(example, i) in getExamplesForItem(currentExampleItem?.key)" :key="i"
              class="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <div class="flex items-start gap-3">
                <div
                  class="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {{ i + 1 }}
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
        <div class="bg-gradient-to-r from-lime-600 to-green-700 px-8 py-6 flex-shrink-0">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-2xl font-bold text-white flex items-center gap-3">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Rujukan Audit
              </h3>
              <p class="text-lime-100 mt-1">Dokumen rujukan dan sumber maklumat</p>
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
            <div class="bg-gradient-to-r from-lime-50 to-green-50 rounded-xl p-6 border border-lime-200">
              <h4 class="text-lg font-bold text-lime-900 mb-4 flex items-center gap-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                Rujukan Dokumen
              </h4>
              <ul class="space-y-2 text-sm">
                <li class="flex items-start gap-2">
                  <span class="text-lime-600 font-bold mt-1">A.</span>
                  <p class="text-gray-700">Akta 281 - Akta Makanan 1983 (Pind 2012).</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-lime-600 font-bold mt-1">B.</span>
                  <p class="text-gray-700">PATM Jil III Edisi 1/2023 - Bhg 1 Bab 2 - Dasar Rangsum.</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-lime-600 font-bold mt-1">C.</span>
                  <p class="text-gray-700">PATM Jil III Edisi 1/2023 - Bhg 1 Bab 4 - Peraturan Kewangan dan Perakaunan.
                  </p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-lime-600 font-bold mt-1">D.</span>
                  <p class="text-gray-700">PMAT 7/2003 - Sukatan Rangsum ATM (Membatalkan PMAT 7/1990).</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-lime-600 font-bold mt-1">E.</span>
                  <p class="text-gray-700">PMAT 7/1963 - Issue of Rations in Kind to Officer's Messes.</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-lime-600 font-bold mt-1">F.</span>
                  <p class="text-gray-700">PAAT 9/1990 - Pengurusan Rangsum Segar AT.</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-lime-600 font-bold mt-1">G.</span>
                  <p class="text-gray-700">PAAT 12/1989 - Pengurusan Rangsum AT.</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-lime-600 font-bold mt-1">H.</span>
                  <p class="text-gray-700">PATD 15/1987 - Pengambilan dan Penyimpanan Bahan Rangsum Kering Oleh Pasukan.
                  </p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-lime-600 font-bold mt-1">I.</span>
                  <p class="text-gray-700">Arahan Teknikal Bekalan Makanan Tahun 2023.</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-lime-600 font-bold mt-1">J.</span>
                  <p class="text-gray-700">Arahan Teknikal Katering Tahun 2023.</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-lime-600 font-bold mt-1">K.</span>
                  <p class="text-gray-700">Arahan Teknikal Sajian Tahun 2023.</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-lime-600 font-bold mt-1">L.</span>
                  <p class="text-gray-700">MASt - Pengurusan Pembekalan Rangsum & PMP.</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-lime-600 font-bold mt-1">M.</span>
                  <p class="text-gray-700">MASt - Pengurusan Dewan Makan di Kompleks Sajian TD.</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-lime-600 font-bold mt-1">N.</span>
                  <p class="text-gray-700">MP 11.3A TD - Manual Pengurusan dan Operasi Bekalan.</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-lime-600 font-bold mt-1">O.</span>
                  <p class="text-gray-700">MP 11.5A TD - Manual Katering TD.</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-lime-600 font-bold mt-1">P.</span>
                  <p class="text-gray-700">MP 3-11-3.1A TD - Pengurusan dan Operasi Bekalan TD, 2018.</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-lime-600 font-bold mt-1">Q.</span>
                  <p class="text-gray-700">MP 4-11-5.1A TD - Pengurusan dan Operasi Katering TD, 2018.</p>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-lime-600 font-bold mt-1">R.</span>
                  <p class="text-gray-700">MM 11.3.3A TD - Latihan Bekalan, Petrol, Minyak dan Pelincir KPD (Sementara),
                    2009.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-end flex-shrink-0">
          <button @click="showRujukanModal = false"
            class="px-6 py-2.5 bg-gradient-to-r from-lime-600 to-green-700 text-white rounded-xl hover:shadow-lg transition-all font-semibold">
            Tutup
          </button>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div
      :class="['fixed bottom-6 right-6 px-6 py-3 rounded-xl shadow-lg transform transition-all duration-300 flex items-center gap-3 z-50', toastVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0', toastType === 'success' ? 'bg-gradient-to-r from-lime-500 to-green-600 text-white' : 'bg-gradient-to-r from-red-500 to-orange-500 text-white']">
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
const auditId = computed(() => `AUD-SAJ-${Date.now()}`)
const auditScores = ref<AuditScore>({})
const currentPhase = ref<'self' | 'commander' | 'aptd'>('self')
const toastVisible = ref(false)
const toastMessage = ref('')
const toastType = ref<'success' | 'error'>('success')
const formType = 'Pengurusan Sajian'
const penilaianTypeId = 17

const sync = useSync()

// Draft and metadata keys per phase
const draftKeyForPhase = (phaseSlug: string) => `sajian_auditScoresDraft_${phaseSlug}`
const findingsDataKeyForPhase = (phaseSlug: string) => `findingsData_${phaseSlug}`
const auditDataKeyForPhase = (phaseSlug: string) => `auditData_${phaseSlug}`

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
    formType: 'Sajian',
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
      title: 'Sukatan rangsum tidak dipatuhi',
      description: 'Penyajian makanan tidak mengikut sukatan rangsum (PMAT 7/2003) yang ditetapkan bagi anggota bertugas 24 jam.',
      kategori: 'Kritikal'
    },
    {
      title: 'Dokumen rujukan tidak dikemaskini',
      description: 'Salinan PATM Jil III Edisi 1/2023 yang disimpan adalah naskhah lama dan belum dikemaskini.',
      kategori: 'Lazim'
    }
  ],
  'main-2': [
    {
      title: 'Pegawai Makanan belum berkursus',
      description: 'Pegawai Makanan Pasukan yang dilantik belum menghadiri Kursus Pegawai Penyelaras Katering di PULMAT.',
      kategori: 'Lazim'
    },
    {
      title: 'Mesyuarat Pemakanan tidak diminitkan',
      description: 'Mesyuarat Pemakanan suku tahunan telah dilaksanakan tetapi minit mesyuarat tidak disediakan dengan lengkap.',
      kategori: 'Lazim'
    }
  ],
  'main-3': [
    {
      title: 'Peralatan memasak rosak',
      description: 'Beberapa kuali besar dan periuk nasi di dapur utama mengalami kerosakan dan perlukan penggantian segera.',
      kategori: 'Lazim'
    },
    {
      title: 'Kebersihan dewan makan tidak memuaskan',
      description: 'Terdapat kesan minyak dan kotoran pada lantai serta bawah meja makan yang tidak dibersihkan dengan sempurna.',
      kategori: 'Kritikal'
    }
  ],
  'main-4': [
    {
      title: 'Prosedur penerimaan tidak dipatuhi',
      description: 'Penerimaan rangsum segar dilakukan tanpa kehadiran PTT Kanan Bertugas untuk pengesahan kualiti.',
      kategori: 'Kritikal'
    },
    {
      title: 'Rekod BAT L 96 tidak lengkap',
      description: 'Terdapat beberapa helaian BAT L 96 yang tidak ditandatangani oleh pembekal atau saksi penerimaan.',
      kategori: 'Kritikal'
    }
  ],
  'main-5': [
    {
      title: 'Suhu Chiller tidak mengikut piawaian',
      description: 'Suhu di dalam tempat penyimpanan sayur-sayuran (chiller) melebihi 5 darjah Celsius, berisiko merosakkan bahan mentah.',
      kategori: 'Kritikal'
    },
    {
      title: 'Penyusunan stok tidak teratur',
      description: 'Bahan rangsum kering di dalam stor tidak disusun mengikut sistem FIFO (First In First Out).',
      kategori: 'Lazim'
    }
  ],
  'main-6': [
    {
      title: 'Penyata rangsum tidak tepat',
      description: 'Kuantiti pengeluaran rangsum harian yang direkodkan tidak sama dengan jumlah anggota yang makan di dewan makan.',
      kategori: 'Kritikal'
    },
    {
      title: 'Buku akaun tidak dikemaskini',
      description: 'Buku Akaun Makanan Pasukan (BAT L 523) tidak dikemaskini bagi tempoh dua minggu terakhir.',
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
    perkara: 'Perintah/Dasar/Arahan dan Peraturan',
    isHeader: true,
    subItems: [
      {
        bil: 'a',
        perkara: 'Pasukan mempunyai dokumen berikut dalam simpanan sebagai rujukan:',
        markahPenuh: 0.20,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'PATM Jil III Edisi 1/2023.' },
          { bil: '(2)', perkara: 'PMAT 7/2003 - Sukatan Rangsum ATM (Membatalkan PMAT 7/1990).' },
          { bil: '(3)', perkara: 'PAAT 12/1989 dan 9/1990.' },
          { bil: '(4)', perkara: 'PATD 15/1987 – Pengambilan dan Penyimpanan Bahan Rangsum Kering Oleh Pasukan.' },
          { bil: '(5)', perkara: 'Arahan Teknikal Bekalan Makanan Tahun 2023.' },
          { bil: '(6)', perkara: 'Arahan Teknikal Katering Tahun 2023 (bagi pasukan yang terlibat pengswastaan).' },
          { bil: '(7)', perkara: 'Arahan Teknikal Sajian Tahun 2023.' },
          { bil: '(8)', perkara: 'MASt - Pengurusan Dewan Makan di Kompleks Sajian TD.' },
          { bil: '(9)', perkara: 'MP 11.3A TD - Manual Pengurusan dan Operasi Bekalan.' },
          { bil: '(10)', perkara: 'MP 3-11-3.1A TD - Pengurusan dan Operasi Bekalan TD, 2018.' },
          { bil: '(11)', perkara: 'MP 4-11-5.1A TD - Pengurusan dan Operasi Katering TD, 2018.' },
          { bil: '(12)', perkara: 'MM 11.3.3A TD - Latihan Bekalan, Petrol, Minyak dan Pelincir KPD (Sementara), 2009.' },
          { bil: '(13)', perkara: 'Direktif PTD 2013-2016.' },
          { bil: '(14)', perkara: 'Direktif Panglima Formasi.' },
          { bil: '(15)', perkara: 'JPTD/JPSS.' }
        ]
      }
    ]
  },
  {
    bil: '2',
    perkara: 'Pengawasan Khidmat Sajian di Pasukan',
    isHeader: true,
    subItems: [
      {
        bil: 'a',
        perkara: 'Pegawai Makanan Pasukan:',
        markahPenuh: 0.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Pegawai Makanan Pasukan dibuat pelantikan secara rasmi.' },
          { bil: '(2)', perkara: 'Pegawai yang dilantik adalah berkelayakan serta mempunyai Kursus Pegawai Penyelaras Katering dari PULMAT.' },
          { bil: '(3)', perkara: 'Pegawai Makanan Pasukan melaksanakan peranan dan tanggungjawab dengan betul.' },
          { bil: '(4)', perkara: 'Pegawai Makanan melaksanakan MASt - Pengurusan Dewan Makan di Kompleks Sajian TD.' }
        ]
      },
      {
        bil: 'b',
        perkara: 'Mesyuarat Pemakanan Pasukan:',
        markahPenuh: 0.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Mesyuarat dilaksanakan setiap tiga (3) bulan sekali atau sekurang-kurangnya tiga (3) kali setahun dan diminitkan.' },
          { bil: '(2)', perkara: 'Agenda Mesyuarat Pemakanan meliputi perkara berikut: Mutu hidangan yang disajikan.' },
          { bil: '(3)', perkara: 'Agenda Mesyuarat Pemakanan meliputi perkara berikut: Menu sajian.' },
          { bil: '(4)', perkara: 'Agenda Mesyuarat Pemakanan meliputi perkara berikut: Sukatan rangsum.' },
          { bil: '(5)', perkara: 'Agenda Mesyuarat Pemakanan meliputi perkara berikut: Mutu rangsum yang diterima.' }
        ]
      },
      {
        bil: 'c',
        perkara: 'Peralatan Kompleks Sajian:',
        markahPenuh: 0.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Peralatan-peralatan yang berpandukan kepada Jadual Peralatan Tentera Darat (JPTD) dan Sukatan Berek TDM (SBTDM).' },
          { bil: '(2)', perkara: 'Kerusi dan meja makan di Dewan Makan adalah mencukupi.' },
          { bil: '(3)', perkara: 'Bekas-bekas untuk persiapan awal adalah mencukupi dan bersesuaian.' },
          { bil: '(4)', perkara: 'Peralatan memasak (pisau, papan memotong, kuali dll) adalah mencukupi.' },
          { bil: '(5)', perkara: 'Peralatan untuk menghidang makanan (bain marrie) dan minuman adalah bersesuaian.' },
          { bil: '(6)', perkara: 'Alat mencuci seperti sabun, penyapu dan mop diperuntukan oleh Kuartermaster untuk mengekalkan taraf kebersihan yang tinggi.' }
        ]
      }
    ]
  },
  {
    bil: '3',
    perkara: 'Pengendalian Rangsum Segar dan Kering',
    isHeader: true,
    subItems: [
      {
        bil: 'a',
        perkara: 'Penerimaan Rangsum Segar, Kering dan Pukal Dari Pasukan Bekalan/Pembekal:',
        markahPenuh: 0.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'PTT Kanan Bertugas hadir bersama-sama ketika penerimaan rangsum Pasukan Bekalan KPD/Hantaran Terus).' },
          { bil: '(2)', perkara: 'Permohonan rangsum berdasarkan kepada hak anggota (Anggota Bertugas 24 Jam/Anggota Bujang/Kahwin Tinggal Bujang/Latihan/Tambahan).' },
          { bil: '(3)', perkara: 'Pengambilan rangsum di pasukan Bekalan KPD menggunakan kenderaan dan bekas yang bersesuaian.' },
          { bil: '(4)', perkara: 'Penolakan dibuat jika bahan yang diterima tidak cukup atau tidak memuaskan.' },
          { bil: '(5)', perkara: 'Catatan dibuat pada Borang Tempahan Rangsum Angkatan Tentera (BAT L 96) dan Borang Pesanan Bahan-Bahan Makanan (BAT L 165) terhadap bahan yang diterima tidak cukup atau tidak memuaskan.' },
          { bil: '(6)', perkara: 'Akuan Penerimaan ditandatangani di ketiga-tiga salinan BAT L 96 selepas penerimaan rangsum.' },
          { bil: '(7)', perkara: 'Penerimaan rangsum direkodkan dalam Buku Akaun Makanan Pasukan (BAT L 523) berpandukan BAT L 96.' }
        ]
      },
      {
        bil: 'b',
        perkara: 'Penyimpanan Rangsum:',
        markahPenuh: 0.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Rangsum segar diserahkan terus kepada Stor 24 Jam pada hari yang sama bersama salinan BAT L 96.' },
          { bil: '(2)', perkara: 'Rangsum Segar disimpan di tempat penyimpanan yang sepatutnya (Chiller/Freezer).' },
          { bil: '(3)', perkara: 'Rangsum Kering/Pukal disusun kemas dalam Stor Rangsum Pasukan dan Stor 24 Jam.' },
          { bil: '(4)', perkara: 'Bekas-bekas yang bersesuaian disediakan di Stor Rangsum Kering, Stor Rangsum Segar dan Stor 24 Jam.' },
          { bil: '(5)', perkara: 'Kuantiti stok fizikal adalah sama dengan kuantiti yang dinyatakan dalam Kad Stok (BAT L 20) dan BAT L 523.' },
          { bil: '(6)', perkara: 'Lebihan Stok Rangsum direkodkan dalam Buku Akaun Makanan Pasukan dan BAT L 523 menggunakan Baucar Pengeluaran dan Penerimaan (BAT L 5).' }
        ]
      },
      {
        bil: 'c',
        perkara: 'Pengeluaran Rangsum:',
        markahPenuh: 0.40,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Pengeluaran adalah berpandukan kepada Penyata Rangsum Pasukan.' },
          { bil: '(2)', perkara: 'PTT Bertugas Stor 24 Jam memastikan kuantiti rangsum yang dikeluarkan oleh Penjaga Stor Rangsum adalah mencukupi seperti dalam BAT L 96.' },
          { bil: '(3)', perkara: 'Pengeluaran rangsum kepada Stor 24 Jam menggunakan Borang Pengeluaran Rangsum Harian.' },
          { bil: '(4)', perkara: 'Pengeluaran rangsum kepada pasukan PALAPES menggunakan BAT L 5 (jika berkaitan).' }
        ]
      },
      {
        bil: 'd',
        perkara: 'Dokumen-dokumen rangsum berikut ada dalam simpanan:',
        markahPenuh: 0.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Penyata Kekuatan Sajian.' },
          { bil: '(2)', perkara: 'BAT L 96.' },
          { bil: '(3)', perkara: 'BAT L 523.' },
          { bil: '(4)', perkara: 'BAT L 5.' },
          { bil: '(5)', perkara: 'Penyata Kehilangan, Kerosakan atau Kemusnahan (BAT L 73).' },
          { bil: '(6)', perkara: 'Borang Pengeluaran Rangsum kepada Stor 24 jam.' },
          { bil: '(7)', perkara: 'Jadual Pengeluaran Rangsum Segar (JPRS).' }
        ]
      },
      {
        bil: 'e',
        perkara: 'Pembelian dari punca-punca lain:',
        markahPenuh: 0.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Pembelian dari punca-punca lain adalah mematuhi PATM Jil III.' }
        ]
      },
      {
        bil: 'f',
        perkara: 'Pengauditan:',
        markahPenuh: 0.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Pegawai Staf KPD dari formasi membuat pengauditan terhadap perakaunan rangsum.' }
        ]
      },
      {
        bil: 'g',
        perkara: 'Tindakan Susulan:',
        markahPenuh: 0.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Teguran daripada Pemeriksaan Teknikal Sajian yang lepas telah diambil tindakan.' }
        ]
      }
    ]
  },
  {
    bil: '4',
    perkara: 'Penyediaan dan Penyajian Makanan',
    isHeader: true,
    subItems: [
      {
        bil: 'a',
        perkara: 'Penyajian dan Penyediaan:',
        markahPenuh: 0.10,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Penyajian makanan adalah mengikut masa dan menu yang ditetapkan sepertimana yang dipamerkan.' },
          { bil: '(2)', perkara: 'Penyediaan makanan dilakukan berpandukan Jadual Pengeluaran Rangsum Segar/Kering (JPRS)/(JPRK).' },
          { bil: '(3)', perkara: 'Makanan dihidangkan oleh anggota sajian yang bertugas pada masa yang ditetapkan.' }
        ]
      }
    ]
  },
  {
    bil: '5',
    perkara: 'Kebersihan',
    isHeader: true,
    subItems: [
      {
        bil: 'a',
        perkara: 'Anggota Sajian/Penyedia Makanan:',
        markahPenuh: 0.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Anggota Sajian/Penyedia Makanan mempunyai kuku tangan yang sentiasa bersih dan pendek.' },
          { bil: '(2)', perkara: 'Anggota Sajian/Penyedia Makanan sentiasa berpakaian bersih.' },
          { bil: '(3)', perkara: 'Anggota Sajian/Penyedia Makanan tidak merokok semasa mengendalikan makanan.' },
          { bil: '(4)', perkara: 'Anggota Sajian/Penyedia Makanan sentiasa mencuci tangan selepas ke tandas.' }
        ]
      },
      {
        bil: 'b',
        perkara: 'Peralatan:',
        markahPenuh: 0.10,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Semua peralatan sajian dibersihkan selepas digunakan.' },
          { bil: '(2)', perkara: 'Peti sejuk (chiller dan freezer) hendaklah dalam keadaan bersih luar/dalam pada sebilang masa.' }
        ]
      },
      {
        bil: 'c',
        perkara: 'Kompleks Sajian:',
        markahPenuh: 0.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Tugas-tugas kebersihan Dewan Makan diselaraskan oleh Kuartermaster dan diawasi oleh Pegawai Bertugas.' },
          { bil: '(2)', perkara: 'Lantai adalah sentiasa bersih serta selamat dan segala kerosakan dibuat pembaikan segera.' },
          { bil: '(3)', perkara: 'Pengurus Sajian bertanggungjawab kepada kebersihan baine marie dan Stor Rangsum 24 Jam.' },
          { bil: '(4)', perkara: 'Dinding dan siling sentiasa bersih dan kering.' },
          { bil: '(5)', perkara: 'Lampu-lampu dibersihkan seminggu sekali dan kerosakan dibuat penggantian segera.' },
          { bil: '(6)', perkara: 'Saluran air dalam keadaan baik, bersih dan tidak tersumbat.' }
        ]
      }
    ]
  },
  {
    bil: '6',
    perkara: 'Sistem Penjagaan Peralatan Memasak dan Menghidang',
    isHeader: true,
    subItems: [
      {
        bil: 'a',
        perkara: 'Penjagaan Peralatan:',
        markahPenuh: 0.20,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Semua peralatan elektrik di Kompleks Sajian berfungsi dengan baik.' },
          { bil: '(2)', perkara: 'Chiller dan freezer dikendalikan dengan baik (reach in atau walk in atau kedua-duanya sekali).' },
          { bil: '(3)', perkara: 'Dapur Kompleks Sajian dilaksanakan pemeriksaan setiap bulan oleh pasukan.' },
          { bil: '(4)', perkara: 'Semua peralatan diselenggara dan diwujudkan Buku Rekod Alat-Alat Pelbagai (BAT M 430).' }
        ]
      }
    ]
  },
  {
    bil: '7',
    perkara: 'Penswastaan Perkhidmatan Katering (PPK) - Pemantauan oleh Unit Pengurusan Perkhidmatan Katering (UPPK)',
    isHeader: true,
    subItems: [
      {
        bil: 'a',
        perkara: 'Pemantauan Perkhidmatan Katering:',
        markahPenuh: 0.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Pemeriksaan stok fizikal rangsum kering/pukal dan lejar BAT L 523 dibuat.' },
          { bil: '(2)', perkara: 'Pindah alih Stok Rangsum ke Wisma Perwira/Bintara dibuat.' },
          { bil: '(3)', perkara: 'Publikasi bagi anggota yang layak menerima PPK dibuat/disemak.' },
          { bil: '(4)', perkara: 'Permohonan sajian tambahan katering dibuat mengikut peraturan.' },
          { bil: '(5)', perkara: 'Prosedur pemantauan kualiti perkhidmatan katering yang disediakan oleh kontraktor telah dirancang dan dilaksanakan.' },
          { bil: '(6)', perkara: 'Pemeriksaan terhadap Sijil Perakuan Halal produk yang digunakan untuk penyediaan makanan dilaksanakan.' },
          { bil: '(7)', perkara: 'Pemeriksaan dilaksanakan terhadap peralatan di Kompleks Sajian dan stor penyimpanan stok bahan makanan termasuk aspek kebersihan dilaksanakan.' },
          { bil: '(8)', perkara: 'Menu-menu yang disediakan berpandukan kepada PMAT atau klausa-klausa kontrak yang telah ditetapkan dan dipatuhi sebilang masa.' },
          { bil: '(9)', perkara: 'Pemeriksaan dilaksanakan terhadap staf dan pekerja syarikat konsesi perkhidmatan katering dilaksanakan meliputi tatacara pemakaian, sijil kesihatan, rupa cara, budi pekerti dan kemahiran.' },
          { bil: '(10)', perkara: 'Pemeriksaan terhadap pembekalan yang dilaksanakan meliputi kuantiti dan kualiti.' }
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

// Local storage and draft syncing
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
