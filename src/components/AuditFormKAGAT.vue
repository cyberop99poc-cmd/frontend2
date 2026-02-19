<template>
  <main class="p-8 space-y-8">
    <!-- Form Section -->
    <section class="space-y-6">
      <div class="bg-white rounded-2xl shadow-lg border border-slate-100/50 p-8">
        <h2 class="text-2xl font-bold bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent mb-6">
          📝 Butiran Sesi Audit</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Nama Juruaudit</label>
            <input v-model="auditorName" type="text" placeholder="Masukkan nama juruaudit"
              class="w-full px-4 py-3 border border-slate-200/50 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition-all text-sm bg-white/50 backdrop-blur">
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Tarikh Audit</label>
            <input v-model="auditDate" type="date"
              class="w-full px-4 py-3 border border-slate-200/50 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition-all text-sm mono bg-white/50 backdrop-blur">
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">ID Audit</label>
            <input type="text" :value="auditId" readonly
              class="w-full px-4 py-3 border border-slate-200/50 rounded-xl bg-slate-50/50 text-gray-600 text-sm mono">
          </div>
        </div>
      </div>

      <!-- Audit Table -->
      <div class="bg-white rounded-2xl shadow-lg border border-slate-100/50 overflow-hidden">
        <div class="bg-gradient-to-r from-slate-600 to-slate-700 px-8 py-6 flex items-center justify-between">
          <div class="flex-1">
            <div class="flex items-center gap-3">
              <h2 class="text-xl font-bold text-white">🔍 Pengurusan KAGAT - Senarai Semak Audit</h2>
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
            <p class="text-slate-100 text-sm mt-2">Tandakan setiap item berdasarkan pemeriksaan anda</p>
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
              <tr class="bg-slate-50 border-b-2 border-slate-200">
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase w-12">Bil</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Perkara</th>
                <th class="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase w-20">Markah Penuh</th>
                <th colspan="6" class="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Skala Markah
                </th>
                <th class="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase w-20">Markah Dapat</th>
                <th class="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase w-24">Penemuan</th>
              </tr>
              <tr class="bg-white border-b border-slate-100">
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
                  :class="['border-b border-slate-50 hover:bg-slate-50/30 transition-colors']">
                  <td class="px-4 py-3">{{ item.bil }}</td>
                  <td class="px-4 py-3 text-gray-700">{{ item.perkara }}</td>
                  <td v-if="shouldShowMarkah(item.key)" class="px-4 py-3 text-center font-mono text-gray-600"
                    :rowspan="getSubItemCount(item.key)">
                    {{ getMarkahPenuhDisplay(item.key) }}
                  </td>
                  <td v-for="score in [0, 1, 2, 3, 4, 5]" :key="score" class="px-2 py-3 text-center">
                    <input v-if="item.markahPenuh" type="radio" :name="`score-${item.key}`" :value="score"
                      @change="setScore(item.key, score)"
                      class="w-4 h-4 cursor-pointer text-slate-600 focus:ring-slate-500">
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
                <tr v-else-if="item.isSubHeader" :class="['bg-gray-50 border-b border-slate-50']">
                  <td class="px-4 py-3 font-bold">{{ item.bil }}</td>
                  <td class="px-4 py-3 text-gray-700 font-bold">{{ item.perkara }}</td>
                  <td colspan="8"></td>
                </tr>
                <tr v-else :class="['bg-gray-100 border-b-2 border-slate-200']">
                  <td colspan="10" class="px-4 py-3 font-bold text-gray-800">{{ item.perkara }}</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>

        <div
          class="px-8 py-4 bg-gradient-to-r from-slate-50 to-slate-50 border-t border-slate-200/50 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="text-sm text-gray-700">
              Selesai: <span class="font-semibold text-slate-600">{{ completedCount }}</span> / <span>{{ totalItems
              }}</span>
              item
            </div>
            <div class="w-48 h-2.5 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-slate-600 to-slate-700 transition-all duration-300"
                :style="{ width: completionPercentage + '%' }"></div>
            </div>
          </div>
          <button @click="submitAudit()" :disabled="completedCount === 0"
            class="px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white font-semibold rounded-xl hover:shadow-lg transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
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
            <div
              class="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-purple-500 shadow-sm hover:shadow-md transition-shadow">
              <div class="flex items-start gap-4">
                <div class="bg-purple-500 text-white rounded-lg p-2 flex-shrink-0">
                  <span class="font-bold text-lg">A</span>
                </div>
                <div class="flex-1">
                  <p class="text-gray-800 leading-relaxed">PMAT 9/1991 – Dasar Pembinaan Mental dan Kerohanian Dalam
                    ATM.
                  </p>
                </div>
              </div>
            </div>

            <div
              class="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-purple-500 shadow-sm hover:shadow-md transition-shadow">
              <div class="flex items-start gap-4">
                <div class="bg-purple-500 text-white rounded-lg p-2 flex-shrink-0">
                  <span class="font-bold text-lg">B</span>
                </div>
                <div class="flex-1">
                  <p class="text-gray-800 leading-relaxed">PAAT 3/2018 – Perintah Pelaksanaan Dasar Pembinaan Mental dan
                    Kerohanian Islam Dalam ATM (PMAT 9/1991).</p>
                </div>
              </div>
            </div>

            <div
              class="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-purple-500 shadow-sm hover:shadow-md transition-shadow">
              <div class="flex items-start gap-4">
                <div class="bg-purple-500 text-white rounded-lg p-2 flex-shrink-0">
                  <span class="font-bold text-lg">C</span>
                </div>
                <div class="flex-1">
                  <p class="text-gray-800 leading-relaxed">PAAT 4/2012 – Prosedur Nikah, Cerai dan Rujuk Untuk Anggota
                    ATM.
                  </p>
                </div>
              </div>
            </div>

            <div
              class="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-purple-500 shadow-sm hover:shadow-md transition-shadow">
              <div class="flex items-start gap-4">
                <div class="bg-purple-500 text-white rounded-lg p-2 flex-shrink-0">
                  <span class="font-bold text-lg">D</span>
                </div>
                <div class="flex-1">
                  <p class="text-gray-800 leading-relaxed">MP 14.2.1A TD - Doktrin Keagamaan KAGAT Semasa Perang.</p>
                </div>
              </div>
            </div>

            <div
              class="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-purple-500 shadow-sm hover:shadow-md transition-shadow">
              <div class="flex items-start gap-4">
                <div class="bg-purple-500 text-white rounded-lg p-2 flex-shrink-0">
                  <span class="font-bold text-lg">E</span>
                </div>
                <div class="flex-1">
                  <p class="text-gray-800 leading-relaxed">PROTAP Latihan Pemerintahan Medan TD No. 25 A.</p>
                </div>
              </div>
            </div>

            <div
              class="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-purple-500 shadow-sm hover:shadow-md transition-shadow">
              <div class="flex items-start gap-4">
                <div class="bg-purple-500 text-white rounded-lg p-2 flex-shrink-0">
                  <span class="font-bold text-lg">F</span>
                </div>
                <div class="flex-1">
                  <p class="text-gray-800 leading-relaxed">Manual Etika dan Prosedur Pelaksanaan Tugas KAGAT.</p>
                </div>
              </div>
            </div>

            <div
              class="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-purple-500 shadow-sm hover:shadow-md transition-shadow">
              <div class="flex items-start gap-4">
                <div class="bg-purple-500 text-white rounded-lg p-2 flex-shrink-0">
                  <span class="font-bold text-lg">G</span>
                </div>
                <div class="flex-1">
                  <p class="text-gray-800 leading-relaxed">Arahan Pentadbiran KAGAT No 1 - No 17.</p>
                </div>
              </div>
            </div>

            <div
              class="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-purple-500 shadow-sm hover:shadow-md transition-shadow">
              <div class="flex items-start gap-4">
                <div class="bg-purple-500 text-white rounded-lg p-2 flex-shrink-0">
                  <span class="font-bold text-lg">H</span>
                </div>
                <div class="flex-1">
                  <p class="text-gray-800 leading-relaxed">Panduan Nikah, Cerai dan Rujuk ATM.</p>
                </div>
              </div>
            </div>

            <div
              class="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-purple-500 shadow-sm hover:shadow-md transition-shadow">
              <div class="flex items-start gap-4">
                <div class="bg-purple-500 text-white rounded-lg p-2 flex-shrink-0">
                  <span class="font-bold text-lg">I</span>
                </div>
                <div class="flex-1">
                  <p class="text-gray-800 leading-relaxed">Pelan Induk Sistem Pengurusan Strategik Kor Agama Angkatan
                    Tentera (SPS KAGAT).</p>
                </div>
              </div>
            </div>

            <div
              class="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-purple-500 shadow-sm hover:shadow-md transition-shadow">
              <div class="flex items-start gap-4">
                <div class="bg-purple-500 text-white rounded-lg p-2 flex-shrink-0">
                  <span class="font-bold text-lg">J</span>
                </div>
                <div class="flex-1">
                  <p class="text-gray-800 leading-relaxed">MK TD/G-SEK/AGAMA/9 Jil 2 (1) bertarikh 7 Jun 10 - Dasar
                    Pelaksanaan Aktiviti Kerohanian di Bawah Pemerintahan TD.</p>
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
      :class="['fixed bottom-6 right-6 px-6 py-3 rounded-xl shadow-lg transform transition-all duration-300 flex items-center gap-3 z-50', toastVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0', toastType === 'success' ? 'bg-gradient-to-r from-slate-500 to-gray-600 text-white' : 'bg-gradient-to-r from-red-500 to-orange-500 text-white']">
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

const auditScores = ref<AuditScore>({})
const sync = useSync()

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
      title: 'Laporan KAGAT tidak dikemukakan tepat masa',
      description: 'Laporan kesiapsiagaan unit (KAGAT) tidak dikemukakan mengikut tarikh yang ditetapkan dan terdapat kelewatan lebih 2 minggu.',
      kategori: 'Kritikal'
    },
    {
      title: 'Data kesiapsiagaan tidak lengkap',
      description: 'Maklumat mengenai personel, peralatan dan logistik dalam laporan KAGAT tidak lengkap dan tidak terkini.',
      kategori: 'Lazim'
    }
  ],
  'main-2': [
    {
      title: 'Peralatan tidak berfungsi tidak dilaporkan',
      description: 'Peralatan yang rosak atau tidak berfungsi tidak dilaporkan dalam sistem KAGAT dan masih direkodkan sebagai operasi.',
      kategori: 'Kritikal'
    }
  ],
  'main-3': [
    {
      title: 'Personel tidak terlatih dalam KAGAT',
      description: 'Pegawai yang bertanggungjawab mengemas kini KAGAT tidak menerima latihan yang sesuai tentang sistem pelaporan.',
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
const auditId = computed(() => `AUD-KAGAT-${Date.now()}`)
const currentPhase = ref<'self' | 'commander' | 'aptd'>('self')
const toastVisible = ref(false)
const toastMessage = ref('')
const toastType = ref<'success' | 'error'>('success')

// Draft and metadata keys per phase
const draftKeyForPhase = (phaseSlug: string) => `kagat_auditScoresDraft_${phaseSlug}`
const findingsDataKeyForPhase = (phaseSlug: string) => `findingsData_${phaseSlug}`
const auditDataKeyForPhase = (phaseSlug: string) => `auditData_${phaseSlug}`
const formType = 'Pengurusan KAGAT'
const penilaianTypeId = 9

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
    formType: 'KAGAT',
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
        markahPenuh: 0.20,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'PMAT 9/1991.' },
          { bil: '(2)', perkara: 'PAAT 4/2012 dan 3/2018.' },
          { bil: '(3)', perkara: 'MP 14.2.1A TD - Doktrin Keagamaan KAGAT Semasa Perang.' },
          { bil: '(4)', perkara: 'Manual Etika dan Prosedur Pelaksanaan Tugas KAGAT.' },
          { bil: '(5)', perkara: 'Arahan Pentadbiran KAGAT No 1 - No 17.' },
          { bil: '(6)', perkara: 'Panduan Nikah, Cerai dan Rujuk ATM.' },
          { bil: '(7)', perkara: 'Pelan Induk Sistem Pengurusan Strategik Kor Agama Angkatan Tentera (SPS KAGAT).' },
          { bil: '(8)', perkara: 'Peraturan/Enakmen Undang-Undang Keluarga Islam Negeri.' }
        ]
      }
    ]
  },
  {
    bil: '2',
    perkara: 'Pengurusan Organisasi:',
    isHeader: true,
    subItems: [
      {
        bil: 'a',
        perkara: 'Pentadbiran:',
        markahPenuh: 0.80,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Perancangan strategik/integriti (SPS KAGAT).' },
          { bil: '(2)', perkara: 'Penyataan arah (Perintah Ulung KP KAGAT, visi, misi dan objektif) dipamerkan.' },
          { bil: '(3)', perkara: 'Papan kenyataan. (visi, misi, carta organisasi, dll dipamerkan)' },
          { bil: '(4)', perkara: 'Sistem persuratan fail dan rekod adalah kemas dan teratur.' },
          { bil: '(5)', perkara: 'Buku rekod diwujudkan dan kemas kini.' },
          { bil: '(6)', perkara: 'Kemudahan asas bagi pejabat adalah mencukupi.' },
          { bil: '(7)', perkara: 'Kebersihan/keceriaan pejabat adalah memuaskan.' },
          { bil: '(8)', perkara: 'Sasaran Kerja Tahunan (SKT) anggota KAGAT disediakan.' },
          { bil: '(9)', perkara: 'MyPortfolio anggota KAGAT disediakan dan kemas kini.' },
          { bil: '(10)', perkara: 'Peranan dan tugas anggota KAGAT diwujudkan dalam Perintah Tetap dan dipamerkan.' },
          { bil: '(11)', perkara: 'Maklum balas terhadap audit/pemeriksaan lepas diambil tindakan.' },
          { bil: '(12)', perkara: 'Aduan/laporan berkaitan diuruskan dengan baik.' },
          { bil: '(13)', perkara: 'Pengarahan atasan dibuat penghebahan.' },
          { bil: '(14)', perkara: 'Rancangan penambahbaikan terhadap pengarahan semasa dibuat.' },
          { bil: '(15)', perkara: 'Perancangan tahunan/takwim pasukan disediakan.' }
        ]
      },
      {
        bil: 'b',
        perkara: 'Kewangan:',
        markahPenuh: 0.10,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Peruntukan tetap ABM diuruskan dengan baik dan direkodkan.' },
          { bil: '(2)', perkara: 'Sumbangan luar (TZ ATM, KSSKA, Tabung Agama, pasukan dll) diuruskan dengan baik dan direkodkan.' },
          { bil: '(3)', perkara: 'Penyata kewangan disediakan.' },
          { bil: '(4)', perkara: 'Buku lejar diwujudkan.' },
          { bil: '(5)', perkara: 'Buku subsidiari diwujudkan.' },
          { bil: '(6)', perkara: 'Fail rekod diwujudkan.' }
        ]
      }
    ]
  },
  {
    bil: '3',
    perkara: 'Pengoperasian (Perkhidmatan Teras):',
    isHeader: true,
    subItems: [
      {
        bil: 'a',
        perkara: 'Program/aktiviti pendidikan keagamaan (pelaksanaan/penglibatan):',
        markahPenuh: 0.80,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Kursus Karismatik Kepimpinan Islam Pegawai (KKKI).' },
          { bil: '(2)', perkara: 'Pendidikan Islam dan Fardu Ain (PIFA).' },
          { bil: '(3)', perkara: 'Pendidikan Al-Quran (CBQ/Tahsin/Sifar Buta Al-Quran (SIBUQ))' },
          { bil: '(4)', perkara: 'Pendidikan Tasawur/Tamadun Islam/ Kepimpinan.' },
          { bil: '(5)', perkara: 'Pendidikan Aqidah, Syariat dan Akhlak.' },
          { bil: '(6)', perkara: 'Kelas Pengajian Tambahan (Formal).' },
          { bil: '(7)', perkara: 'Program Pemulihan (JERI, Syifa\'ul Insan dll).' },
          { bil: '(8)', perkara: 'Program pencegahan/menangani ancaman (OP Perisai Aqidah dll).' },
          { bil: '(9)', perkara: 'Program Dakwah Kawasan Operasi (PRODAKSI).' },
          { bil: '(10)', perkara: 'UKKI Fardu Ain.' }
        ]
      },
      {
        bil: 'b',
        perkara: 'Dasar/program/aktiviti peribadatan, amalan, penghayatan dan syiar Islam:',
        markahPenuh: 0.50,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Solat fardhu berjemaah/ solat sunat.' },
          { bil: '(2)', perkara: 'Qiamullail.' },
          { bil: '(3)', perkara: 'Bacaan Al-Ma\'thurat.' },
          { bil: '(4)', perkara: 'Halaqat Zikir/Tahlil.' },
          { bil: '(5)', perkara: 'Bacaan Al-Quran. (Tilawah,Tadarrus Ramadan dan selepas solat, Khatam Al-Quran)' },
          { bil: '(6)', perkara: 'Ihya\' Ramadan. (Solat Tarawikh, Tadarus dan Nuzul Quran, Khatam Quran)' },
          { bil: '(7)', perkara: 'Ceramah Hari Kebesaran Islam.' },
          { bil: '(8)', perkara: 'Khutbah Jumaat (masjid/surau Jumaat sahaja).' },
          { bil: '(9)', perkara: 'Khutbah dan takbir Hari Raya.' },
          { bil: '(10)', perkara: 'Aktiviti tetap malam Jumaat.' },
          { bil: '(11)', perkara: 'Kelas pengajian di masjid/surau (selepas Maghrib).' },
          { bil: '(12)', perkara: 'Khemah Ibadat.' },
          { bil: '(13)', perkara: 'Bacaan risalah agama.' }
        ]
      },
      {
        bil: 'c',
        perkara: 'Pengurusan pembangunan syakhsiah anggota, keluarga dan warga ATM:',
        markahPenuh: 0.80,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Prosedur/carta aliran NCAR dan Poligami disedia dan dipamerkan.' },
          { bil: '(2)', perkara: 'Aduan direkodkan dan kes fail individu diwujudkan.' },
          { bil: '(3)', perkara: 'Pengurusan khidmat nasihat/kaunseling disediakan.' },
          { bil: '(4)', perkara: 'Pengurusan Jenayah Syarak diuruskan dengan baik.' },
          { bil: '(5)', perkara: 'Pengurusan Saudara Muslim ditadbir dengan baik.' },
          { bil: '(6)', perkara: 'Kelas/Kursus Kekeluargaaan.' },
          { bil: '(7)', perkara: 'Kelas/Kursus Saudara Muslim.' },
          { bil: '(8)', perkara: 'Kelas/Kursus BAKAT.' },
          { bil: '(9)', perkara: 'Kelas/kursus motivasi anak-anak.' },
          { bil: '(10)', perkara: 'Kebajikan/ziarah/kematian.' },
          { bil: '(11)', perkara: 'Zakat fitrah/derma.' },
          { bil: '(12)', perkara: 'Majlis keraian. (tahnik, khatan, memeluk Islam, dll).' },
          { bil: '(13)', perkara: 'Kelas SAR/SRA/KAFA dalam seliaan pasukan ditadbir dengan baik.' }
        ]
      },
      {
        bil: 'd',
        perkara: 'Pengurusan masjid dan surau ATM:',
        markahPenuh: 0.80,
        isSubHeader: true,
        subItems: [
          { bil: '(1)', perkara: 'Perlembagaan/peraturan masjid/surau diwujudkan.' },
          { bil: '(2)', perkara: 'Kerohanian harian dilaksanakan.' },
          { bil: '(3)', perkara: 'Kerohanian mingguan/bulanan/tahunan dilaksanakan.' },
          { bil: '(4)', perkara: 'Kelas pengajian/kuliah/ceramah dilaksanakan.' },
          { bil: '(5)', perkara: 'Sambutan hari kebesaran Islam dilaksanakan.' },
          { bil: '(6)', perkara: 'Ihya\' Ramadhan dilaksanakan.' },
          { bil: '(7)', perkara: 'Majlis Qurban/Aqiqah dilaksanakan.' },
          { bil: '(8)', perkara: 'Kempen Bulan Ibadah/Malam Sejuta Kesyukuran dilaksanakan.' },
          { bil: '(9)', perkara: 'One Stop Center (gerobok rezeki, pusat kaunseling, pusat sumber, pusat rawatan Islam, dll) dilaksanakan.' },
          { bil: '(10)', perkara: 'Karnival/pameran/dll dilaksanakan.' },
          { bil: '(11)', perkara: 'Kebersihan/keceriaan masjid/surau.' },
          { bil: '(12)', perkara: 'Peralatan/harta masjid/surau/pejabat direkodkan.' },
          { bil: '(13)', perkara: 'Carta organisasi dipamerkan.' },
          { bil: '(14)', perkara: 'Jadual Staf Agama Bertugas Harian (SABEH) dipamerkan.' },
          { bil: '(15)', perkara: 'Jadual pengajian dipamerkan.' },
          { bil: '(16)', perkara: 'Penyata kutipan Tabung Jumaat dipamerkan.' },
          { bil: '(17)', perkara: 'Renungan/tazkirah/informasi dipamerkan.' }
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
