<template>
  <main class="min-h-screen bg-white text-black p-6 space-y-6">

    <!-- ── Stats Cards ── -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div v-for="stat in stats" :key="stat.label"
        class="bg-white border border-gray-200 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
        <div :class="['w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0', stat.iconBg]">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="stat.icon" />
          </svg>
        </div>
        <div>
          <p class="text-xs text-gray-500 font-medium">{{ stat.label }}</p>
          <p :class="['text-2xl font-bold mt-0.5', stat.valueColor]">{{ stat.value }}</p>
        </div>
      </div>
    </div>

    <!-- ── Filter Bar ── -->
    <div class="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col sm:flex-row gap-3 shadow-sm">
      <div class="relative flex-1">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor"
          viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input v-model="searchQuery" type="text" placeholder="Cari penemuan..."
          class="w-full bg-gray-50 border border-gray-300 rounded-xl pl-9 pr-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all" />
      </div>
      <select v-model="filterStatus"
        class="bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all">
        <option value="">Semua Status</option>
        <option value="Kritikal">Kritikal</option>
        <option value="Lazim">Lazim</option>
        <option value="Berulang">Berulang</option>
      </select>
      <button @click="loadFindings" :disabled="isLoading"
        class="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-600 hover:border-orange-500 hover:text-orange-500 transition-all disabled:opacity-50">
        <svg class="w-4 h-4" :class="{ 'animate-spin': isLoading }" fill="none" stroke="currentColor"
          viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Muat Semula
      </button>
    </div>

    <!-- ── Findings Table ── -->
    <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      <!-- Loading -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center py-20 text-gray-500">
        <svg class="animate-spin h-8 w-8 mb-4 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
          </path>
        </svg>
        <p class="text-sm">Memuatkan penemuan...</p>
      </div>

      <!-- Empty -->
      <div v-else-if="filteredFindings.length === 0"
        class="flex flex-col items-center justify-center py-20 text-gray-500">
        <svg class="w-12 h-12 mb-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p class="text-sm font-medium">Tiada penemuan dijumpai</p>
        <p class="text-xs mt-1">Tambah penemuan baharu atau ubah penapis carian</p>
      </div>

      <!-- Table -->
      <table v-else class="w-full text-sm">
        <thead>
          <tr class="border-b border-gray-200 bg-gray-50">
            <th class="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
            <th class="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Penemuan /
              Pemerhatian</th>
            <th class="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Kategori</th>
            <th class="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">CAPA</th>
            <th class="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Bukti</th>
            <th class="px-5 py-3.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Tindakan
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="(finding, idx) in filteredFindings" :key="finding.id"
            class="hover:bg-orange-50/50 transition-colors group">
            <td class="px-5 py-4 text-gray-400 font-mono text-xs">{{ idx + 1 }}</td>
            <td class="px-5 py-4 max-w-sm">
              <p class="text-gray-800 font-medium line-clamp-2 leading-relaxed">{{ finding.observation || '—' }}</p>
              <p v-if="finding.categories" class="text-xs text-orange-400 mt-1">{{ finding.categories.category_name }}
              </p>
              <p class="text-xs text-gray-600 mt-0.5">{{ formatDate(finding.created_at) }}</p>
            </td>
            <td class="px-5 py-4">
              <span :class="getStatusBadge(finding.finding_status)">
                {{ finding.finding_status }}
              </span>
            </td>
            <td class="px-5 py-4">
              <span
                :class="finding.finding_status === 'Kritikal' ? 'text-red-400' : finding.finding_status === 'Lazim' ? 'text-amber-400' : 'text-orange-400'"
                class="text-xs font-medium">
                {{ finding.finding_status === 'Kritikal' ? 'Perlu Tindakan Segera' : finding.finding_status === 'Lazim'
                  ? 'Tindakan Biasa' : 'Dipantau' }}
              </span>
            </td>
            <td class="px-5 py-4">
              <div class="flex items-center gap-1.5">
                <div :class="capaCountBubble(finding)">
                  {{ (finding.capa_actions?.length ?? 0) }}
                </div>
                <span class="text-xs text-gray-500">CAPA</span>
              </div>
            </td>
            <td class="px-5 py-4">
              <div class="flex items-center gap-1.5">
                <div
                  class="w-5 h-5 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-xs font-bold text-gray-500">
                  {{ (finding.evidence?.length ?? 0) }}
                </div>
                <span class="text-xs text-gray-500">fail</span>
              </div>
            </td>
            <td class="px-5 py-4">
              <div class="flex items-center justify-center gap-2">
                <button @click="openDetailModal(finding)"
                  class="px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg text-xs font-semibold transition-all">
                  Lihat
                </button>
                <button @click="openCapaModal(finding)"
                  class="px-3 py-1.5 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-400 rounded-lg text-xs font-semibold transition-all">
                  CAPA
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Footer -->
      <div v-if="!isLoading && filteredFindings.length > 0"
        class="px-5 py-3 border-t border-gray-200 text-xs text-gray-500 bg-gray-50">
        Memaparkan {{ filteredFindings.length }} daripada {{ findings.length }} penemuan
      </div>
    </div>

    <!-- ══════════════════════════════════════════════════════════
         ADD FINDING MODAL
    ══════════════════════════════════════════════════════════ -->
    <Transition name="modal">
      <div v-if="showAddModal" @click.self="showAddModal = false"
        class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-white border border-gray-200 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh]">
          <!-- Header -->
          <div class="px-6 py-5 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
            <div>
              <h3 class="text-lg font-bold text-gray-900">Tambah Penemuan Baharu</h3>
              <p class="text-xs text-gray-500 mt-0.5">Isi maklumat penemuan audit</p>
            </div>
            <button @click="showAddModal = false"
              class="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400 hover:text-gray-700">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div class="p-6 overflow-y-auto flex-1 space-y-5">
            <!-- Observation -->
            <div>
              <label class="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Penemuan /
                Pemerhatian <span class="text-red-500">*</span></label>
              <textarea v-model="newFinding.observation" rows="4"
                placeholder="Nyatakan penemuan audit secara terperinci..."
                class="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none transition-all"></textarea>
            </div>

            <!-- Status -->
            <div>
              <label class="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Status Penemuan
                <span class="text-red-500">*</span></label>
              <div class="grid grid-cols-3 gap-3">
                <label v-for="s in (['Kritikal', 'Lazim', 'Berulang'] as const)" :key="s" :class="[
                  'flex flex-col items-center gap-1.5 p-3 rounded-xl border cursor-pointer transition-all text-center',
                  newFinding.finding_status === s
                    ? statusSelectActive[s]
                    : 'border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-400'
                ]">
                  <input type="radio" :value="s" v-model="newFinding.finding_status" class="sr-only" />
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="statusIcons[s]" />
                  </svg>
                  <span class="text-xs font-semibold leading-tight">{{ s }}</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="px-6 py-4 border-t border-gray-200 flex justify-end gap-3 flex-shrink-0">
            <button @click="showAddModal = false"
              class="px-5 py-2 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-600 font-semibold transition-all">
              Batal
            </button>
            <button @click="submitAddFinding" :disabled="!newFinding.observation || isSaving"
              class="px-5 py-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl text-sm text-white font-semibold transition-all hover:shadow-lg hover:shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
              <svg v-if="isSaving" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              {{ isSaving ? 'Menyimpan...' : 'Simpan Penemuan' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ══════════════════════════════════════════════════════════
         DETAIL MODAL
    ══════════════════════════════════════════════════════════ -->
    <Transition name="modal">
      <div v-if="showDetailModal && selectedFinding" @click.self="showDetailModal = false"
        class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-white border border-gray-200 rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh]">
          <!-- Header -->
          <div class="px-6 py-5 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
            <div>
              <h3 class="text-lg font-bold text-gray-900">Butiran Penemuan #{{ selectedFinding.id }}</h3>
              <p class="text-xs text-gray-500 mt-0.5">{{ formatDate(selectedFinding.created_at) }}</p>
            </div>
            <button @click="showDetailModal = false"
              class="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400 hover:text-gray-700">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="p-6 overflow-y-auto flex-1 space-y-6">
            <!-- Status Badge + Update -->
            <div class="flex items-center gap-3 flex-wrap">
              <span :class="getStatusBadge(selectedFinding.finding_status)" class="text-sm px-4 py-1.5">
                {{ selectedFinding.finding_status }}
              </span>
              <span v-if="selectedFinding.categories"
                class="text-xs text-orange-400 bg-orange-400/10 border border-orange-400/20 px-3 py-1.5 rounded-full">
                {{ selectedFinding.categories.category_name }}
              </span>
            </div>

            <!-- Observation -->
            <div>
              <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Pemerhatian</h4>
              <div class="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-700 leading-relaxed">
                {{ selectedFinding.observation || '—' }}
              </div>
            </div>

            <!-- Update Status -->
            <div>
              <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Kemaskini Status</h4>
              <div class="flex gap-2 flex-wrap">
                <button v-for="s in (['Kritikal', 'Lazim', 'Berulang'] as const)" :key="s"
                  @click="changeStatus(selectedFinding, s)"
                  :disabled="selectedFinding.finding_status === s || isUpdatingStatus" :class="[
                    'px-4 py-2 rounded-xl text-xs font-semibold border transition-all disabled:opacity-40 disabled:cursor-not-allowed',
                    selectedFinding.finding_status === s ? statusSelectActive[s] : 'border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-400 hover:text-gray-700'
                  ]">
                  {{ s }}
                </button>
              </div>
            </div>

            <!-- Evidence Section -->
            <div>
              <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Bukti / Dokumen</h4>
              <!-- Upload -->
              <div class="mb-3">
                <label for="evidenceInput"
                  class="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-orange-400 hover:bg-orange-50 cursor-pointer transition-all">
                  <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <div>
                    <p class="text-sm text-gray-700 font-medium">
                      {{ pendingFile ? pendingFile.name : 'Muat naik bukti' }}
                    </p>
                    <p class="text-xs text-gray-600">PDF, Word, Excel, Imej (maks 10MB)</p>
                  </div>
                </label>
                <input type="file" id="evidenceInput" @change="handleFileSelect"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png" class="hidden" />
              </div>
              <button v-if="pendingFile" @click="uploadPendingFile" :disabled="isUploading"
                class="w-full py-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl text-xs font-semibold text-white transition-all hover:shadow-lg hover:shadow-orange-500/20 disabled:opacity-50 flex items-center justify-center gap-2">
                <svg v-if="isUploading" class="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>
                {{ isUploading ? 'Memuat naik...' : `Muat Naik "${pendingFile.name}"` }}
              </button>
              <!-- Evidence List -->
              <div v-if="(selectedFinding.evidence?.length ?? 0) > 0" class="mt-3 space-y-2">
                <div v-for="ev in selectedFinding.evidence" :key="ev.id"
                  class="flex items-center gap-3 bg-gray-50 border border-gray-200 px-4 py-2.5 rounded-xl text-xs">
                  <svg class="w-4 h-4 text-orange-400 flex-shrink-0" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span class="flex-1 text-gray-700 truncate">{{ ev.file_path?.split('/').pop() ?? `Evidence #${ev.id}`
                  }}</span>
                  <a v-if="ev.file_path" :href="getFileUrl(ev.file_path)" target="_blank" rel="noopener"
                    class="text-blue-400 hover:text-blue-300 font-semibold transition-colors">Lihat</a>
                </div>
              </div>
              <p v-else class="text-xs text-gray-600 mt-2">Tiada bukti dimuat naik lagi.</p>
            </div>
          </div>

          <div class="px-6 py-4 border-t border-gray-200 flex justify-end flex-shrink-0">
            <button @click="showDetailModal = false"
              class="px-5 py-2 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-600 font-semibold transition-all">
              Tutup
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ══════════════════════════════════════════════════════════
         CAPA MODAL
    ══════════════════════════════════════════════════════════ -->
    <Transition name="modal">
      <div v-if="showCapaModal && selectedFinding" @click.self="showCapaModal = false"
        class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-white border border-gray-200 rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh]">
          <!-- Header -->
          <div class="px-6 py-5 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
            <div>
              <h3 class="text-lg font-bold text-gray-900">Tindakan CAPA</h3>
              <p class="text-xs text-gray-500 mt-0.5">Penemuan #{{ selectedFinding.id }}</p>
            </div>
            <button @click="showCapaModal = false"
              class="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400 hover:text-gray-700">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="p-6 overflow-y-auto flex-1 space-y-6">
            <!-- Existing CAPAs -->
            <div v-if="(selectedFinding.capa_actions?.length ?? 0) > 0">
              <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Senarai CAPA</h4>
              <div class="space-y-3">
                <div v-for="capa in selectedFinding.capa_actions" :key="capa.id"
                  class="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div class="flex items-start justify-between gap-3">
                    <div class="flex-1 min-w-0">
                      <p class="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Punca Akar</p>
                      <p class="text-sm text-gray-700">{{ capa.root_cause || '—' }}</p>
                      <p class="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-3 mb-1">Pelan Tindakan
                      </p>
                      <p class="text-sm text-gray-700">{{ capa.action_plan || '—' }}</p>
                      <div class="flex items-center gap-3 mt-3 text-xs text-gray-500">
                        <span v-if="capa.due_date">📅 {{ formatDate(capa.due_date) }}</span>
                      </div>
                    </div>
                    <div class="flex-shrink-0 flex flex-col items-end gap-2">
                      <span :class="getCapaStatusBadge(capa.status)">{{ capa.status }}</span>
                      <div class="flex gap-1">
                        <button v-for="st in (['Open', 'In-Progress', 'Closed'] as const)" :key="st"
                          v-show="capa.status !== st" @click="changeCapaStatus(capa, st)" :disabled="isUpdatingStatus"
                          class="px-2 py-0.5 text-xs rounded-lg border border-gray-300 text-gray-500 hover:border-orange-500 hover:text-orange-500 transition-all disabled:opacity-40">{{
                            st }}</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <p class="text-xs text-gray-600 text-center py-4">Tiada CAPA bagi penemuan ini. Cipta yang baharu di
                bawah.</p>
            </div>

            <!-- New CAPA Form -->
            <div class="border-t border-gray-200 pt-5">
              <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Cipta CAPA Baharu</h4>
              <div class="space-y-4">
                <div>
                  <label class="block text-xs font-semibold text-gray-600 mb-1.5">Punca Akar Masalah</label>
                  <textarea v-model="newCapa.root_cause" rows="2" placeholder="Nyatakan punca akar masalah..."
                    class="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none transition-all"></textarea>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-600 mb-1.5">Pelan Tindakan <span
                      class="text-red-500">*</span></label>
                  <textarea v-model="newCapa.action_plan" rows="3" placeholder="Nyatakan tindakan yang akan diambil..."
                    class="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none transition-all"></textarea>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-600 mb-1.5">Tarikh Akhir</label>
                  <input v-model="newCapa.due_date" type="date"
                    class="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all" />
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="px-6 py-4 border-t border-gray-200 flex justify-end gap-3 flex-shrink-0">
            <button @click="showCapaModal = false"
              class="px-5 py-2 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-600 font-semibold transition-all">
              Tutup
            </button>
            <button @click="submitCapa" :disabled="!newCapa.action_plan || isSaving"
              class="px-5 py-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl text-sm text-white font-semibold transition-all hover:shadow-lg hover:shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
              <svg v-if="isSaving" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              {{ isSaving ? 'Menyimpan...' : 'Simpan CAPA' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ── Toast ── -->
    <Transition name="toast">
      <div v-if="toastVisible" :class="[
        'fixed bottom-6 right-6 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl z-[100] text-sm font-semibold',
        toastType === 'success'
          ? 'bg-emerald-500 text-white shadow-emerald-500/30'
          : 'bg-red-500 text-white shadow-red-500/30'
      ]">
        <svg v-if="toastType === 'success'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        {{ toastMessage }}
      </div>
    </Transition>

  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useSync } from '../composables/useSync'
import type { Finding, CapaAction } from '../services/api'
import { getEvidenceFileUrl } from '../services/api'

const sync = useSync()

// ── State ───────────────────────────────────────────────────────
const findings = ref<Finding[]>([])
const isLoading = ref(false)
const isSaving = ref(false)
const isUpdatingStatus = ref(false)
const isUploading = ref(false)

// Modals
const showAddModal = ref(false)
const showDetailModal = ref(false)
const showCapaModal = ref(false)
const selectedFinding = ref<Finding | null>(null)

// Filters
const searchQuery = ref('')
const filterStatus = ref('')

// Toast
const toastVisible = ref(false)
const toastMessage = ref('')
const toastType = ref<'success' | 'error'>('success')

// New Finding Form
const newFinding = ref<{
  observation: string
  finding_status: Finding['finding_status']
}>({
  observation: '',
  finding_status: 'Lazim',
})

// New CAPA Form
const newCapa = ref({
  root_cause: '',
  action_plan: '',
  due_date: '',
})

// Evidence upload
const pendingFile = ref<File | null>(null)

// ── Computed ─────────────────────────────────────────────────────
const filteredFindings = computed(() => {
  let result = findings.value

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(f =>
      (f.observation ?? '').toLowerCase().includes(q) ||
      (f.categories?.category_name ?? '').toLowerCase().includes(q)
    )
  }

  if (filterStatus.value) {
    result = result.filter(f => f.finding_status === filterStatus.value)
  }

  return result
})

const stats = computed(() => [
  {
    label: 'Jumlah Penemuan',
    value: findings.value.length,
    valueColor: 'text-white',
    iconBg: 'bg-gradient-to-br from-gray-600 to-gray-700',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  },
  {
    label: 'Kritikal',
    value: findings.value.filter(f => f.finding_status === 'Kritikal').length,
    valueColor: 'text-red-400',
    iconBg: 'bg-gradient-to-br from-red-600 to-red-700',
    icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  },
  {
    label: 'Lazim',
    value: findings.value.filter(f => f.finding_status === 'Lazim').length,
    valueColor: 'text-amber-400',
    iconBg: 'bg-gradient-to-br from-amber-500 to-amber-600',
    icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
  },
  {
    label: 'Berulang',
    value: findings.value.filter(f => f.finding_status === 'Berulang').length,
    valueColor: 'text-orange-400',
    iconBg: 'bg-gradient-to-br from-orange-500 to-orange-600',
    icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
  },
])

// ── Style Helpers ────────────────────────────────────────────────
const statusIcons: Record<Finding['finding_status'], string> = {
  'Kritikal': 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  'Lazim': 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  'Berulang': 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
}

const statusSelectActive: Record<Finding['finding_status'], string> = {
  'Kritikal': 'border-red-500 bg-red-500/10 text-red-400',
  'Lazim': 'border-amber-500 bg-amber-500/10 text-amber-400',
  'Berulang': 'border-orange-500 bg-orange-500/10 text-orange-400',
}

const getStatusBadge = (status: Finding['finding_status']) => {
  const base = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold'
  switch (status) {
    case 'Kritikal': return `${base} bg-red-500/15 text-red-400 border border-red-500/30`
    case 'Lazim': return `${base} bg-amber-500/15 text-amber-400 border border-amber-500/30`
    case 'Berulang': return `${base} bg-orange-500/15 text-orange-400 border border-orange-500/30`
    default: return `${base} bg-gray-700 text-gray-400`
  }
}

const getCapaStatusBadge = (status: CapaAction['status']) => {
  const base = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold'
  switch (status) {
    case 'Open': return `${base} bg-blue-500/15 text-blue-400 border border-blue-500/30`
    case 'In-Progress': return `${base} bg-amber-500/15 text-amber-400 border border-amber-500/30`
    case 'Closed': return `${base} bg-emerald-500/15 text-emerald-400 border border-emerald-500/30`
    default: return `${base} bg-gray-700 text-gray-400`
  }
}

const capaCountBubble = (finding: Finding) => {
  const count = finding.capa_actions?.length ?? 0
  const base = 'w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold border'
  if (count === 0) return `${base} bg-gray-800 border-gray-700 text-gray-500`
  const hasOpen = finding.capa_actions?.some(c => c.status !== 'Closed')
  return `${base} ${hasOpen ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'}`
}

// ── Utility ──────────────────────────────────────────────────────
const formatDate = (dateStr: string | null) => {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('ms-MY', {
    year: 'numeric', month: 'short', day: 'numeric',
  })
}

const getFileUrl = (filePath: string) => getEvidenceFileUrl(filePath)

// ── Toast ────────────────────────────────────────────────────────
const showToast = (message: string, type: 'success' | 'error' = 'success') => {
  toastMessage.value = message
  toastType.value = type
  toastVisible.value = true
  setTimeout(() => { toastVisible.value = false }, 3500)
}

// ── API Actions ──────────────────────────────────────────────────

const loadFindings = async () => {
  isLoading.value = true
  try {
    findings.value = await sync.getFindings()
  } catch (err) {
    console.error('loadFindings:', err)
    showToast('Gagal memuatkan penemuan', 'error')
  } finally {
    isLoading.value = false
  }
}

const openAddModal = () => {
  newFinding.value = { observation: '', finding_status: 'Lazim' }
  showAddModal.value = true
}

const submitAddFinding = async () => {
  if (!newFinding.value.observation.trim()) {
    showToast('Sila isi penemuan / pemerhatian', 'error')
    return
  }
  isSaving.value = true
  try {
    await sync.addFinding({
      observation: newFinding.value.observation.trim(),
      finding_status: newFinding.value.finding_status,
    })
    showToast('Penemuan berjaya disimpan!')
    showAddModal.value = false
    await loadFindings()
  } catch (err: any) {
    console.error('addFinding:', err)
    showToast(err?.response?.data?.error || 'Gagal menyimpan penemuan', 'error')
  } finally {
    isSaving.value = false
  }
}

const openDetailModal = (finding: Finding) => {
  selectedFinding.value = { ...finding, capa_actions: finding.capa_actions, evidence: finding.evidence }
  pendingFile.value = null
  showDetailModal.value = true
}

const openCapaModal = (finding: Finding) => {
  selectedFinding.value = { ...finding, capa_actions: finding.capa_actions, evidence: finding.evidence }
  newCapa.value = { root_cause: '', action_plan: '', due_date: '' }
  showCapaModal.value = true
}

const changeStatus = async (finding: Finding, status: Finding['finding_status']) => {
  isUpdatingStatus.value = true
  try {
    await sync.setFindingStatus(finding.id, status)
    showToast('Status penemuan dikemaskini!')
    // Update local
    const f = findings.value.find(x => x.id === finding.id)
    if (f) f.finding_status = status
    if (selectedFinding.value?.id === finding.id) selectedFinding.value!.finding_status = status
  } catch (err: any) {
    console.error('changeStatus:', err)
    showToast(err?.response?.data?.error || 'Gagal kemaskini status', 'error')
  } finally {
    isUpdatingStatus.value = false
  }
}

const submitCapa = async () => {
  if (!newCapa.value.action_plan.trim() || !selectedFinding.value) {
    showToast('Sila isi pelan tindakan', 'error')
    return
  }
  isSaving.value = true
  try {
    const created = await sync.createCapa({
      finding_id: selectedFinding.value.id,
      root_cause: newCapa.value.root_cause || undefined,
      action_plan: newCapa.value.action_plan.trim(),
      due_date: newCapa.value.due_date || undefined,
    })
    showToast('CAPA berjaya disimpan!')
    newCapa.value = { root_cause: '', action_plan: '', due_date: '' }
    // Refresh the finding to get updated capa_actions list
    await loadFindings()
    // Re-open selected finding with fresh data
    const fresh = findings.value.find(f => f.id === selectedFinding.value!.id)
    if (fresh) selectedFinding.value = { ...fresh }
  } catch (err: any) {
    console.error('createCapa:', err)
    showToast(err?.response?.data?.error || 'Gagal menyimpan CAPA', 'error')
  } finally {
    isSaving.value = false
  }
}

const changeCapaStatus = async (capa: CapaAction, status: CapaAction['status']) => {
  isUpdatingStatus.value = true
  try {
    await sync.setCapaStatus(capa.id, status)
    showToast('Status CAPA dikemaskini!')
    // Refresh
    await loadFindings()
    const fresh = findings.value.find(f => f.id === selectedFinding.value!.id)
    if (fresh) selectedFinding.value = { ...fresh }
  } catch (err: any) {
    console.error('changeCapaStatus:', err)
    showToast(err?.response?.data?.error || 'Gagal kemaskini status CAPA', 'error')
  } finally {
    isUpdatingStatus.value = false
  }
}

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  if (file.size > 10 * 1024 * 1024) {
    showToast('Saiz fail melebihi had 10MB', 'error')
    return
  }
  pendingFile.value = file
}

const uploadPendingFile = async () => {
  if (!pendingFile.value || !selectedFinding.value) return
  isUploading.value = true
  try {
    await sync.uploadFile(pendingFile.value)
    showToast('Fail berjaya dimuat naik!')
    pendingFile.value = null
    // Refresh finding data to get updated evidence list
    await loadFindings()
    const fresh = findings.value.find(f => f.id === selectedFinding.value!.id)
    if (fresh) selectedFinding.value = { ...fresh }
  } catch (err: any) {
    console.error('uploadFile:', err)
    showToast(err?.response?.data?.error || 'Gagal memuat naik fail', 'error')
  } finally {
    isUploading.value = false
  }
}

// ── Mount ─────────────────────────────────────────────────────────
onMounted(loadFindings)
</script>

<style scoped>
/* Modal enter/leave transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-active .bg-gray-900,
.modal-leave-active .bg-gray-900 {
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .bg-gray-900 {
  transform: scale(0.95) translateY(12px);
}

.modal-leave-to .bg-gray-900 {
  transform: scale(0.95) translateY(12px);
}

/* Toast transitions */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(16px) scale(0.95);
}

/* Clamp */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
