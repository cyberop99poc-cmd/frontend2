<template>
  <main class="p-8 space-y-8 bg-gradient-to-br from-gray-50 to-red-50/30 min-h-screen">

    <!-- Main Statistics Grid -->
    <div class="bg-white rounded-2xl shadow-lg border border-red-100/50 overflow-hidden">
      <div class="p-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Progress Card -->
          <div
            class="lg:col-span-2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-300 hover:shadow-xl transition-all">
            <div class="flex items-center justify-between mb-8">
              <div>
                <h3 class="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <span
                    class="w-10 h-10 rounded-xl bg-gray-700 text-white flex items-center justify-center text-lg font-bold shadow-lg">📊</span>
                  Progres
                </h3>
              </div>
            </div>

            <div class="space-y-3">
              <div v-for="phase in phaseOverview" :key="phase.slug" @click="selectCriteriaPhase(phase.slug)" :class="[
                'rounded-xl p-3 border transition-all hover:shadow-md cursor-pointer',
                { 'bg-red-50': phase.status === 'belum mula', 'bg-blue-50': phase.status === 'dalam proses', 'bg-emerald-50': phase.status === 'selesai' },
                selectedCriteriaPhase === phase.slug ? 'ring-2 ring-emerald-400' : ''
              ]"
                :style="{ borderColor: phase.status === 'belum mula' ? '#fee2e2' : phase.status === 'dalam proses' ? '#dbeafe' : '#d1fae5' }">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">{{ phase.label }}</p>
                  <span :class="[phase.textColor, 'text-sm font-bold mono']">{{ phase.progressPercent }}%</span>
                </div>
                <div :class="[phase.bgColor, 'rounded-full h-1.5 overflow-hidden']">
                  <div :class="[phase.progressColor, 'h-full rounded-full']"
                    :style="{ width: phase.progressPercent + '%' }"></div>
                </div>
                <div class="flex items-center justify-between mt-2 text-xs text-gray-600">
                  <span>Tarikh Audit</span>
                  <span class="font-semibold">{{ phase.date || '-' }}</span>
                </div>
              </div>
            </div>

            <div class="mt-4 pt-4 border-t-2 border-emerald-300">
              <div class="flex items-center justify-between">
                <span class="text-sm font-bold text-emerald-700"></span>
                <div class="flex items-center gap-2">
                  <div class="w-16 h-2 bg-emerald-200 rounded-full overflow-hidden">
                    <div class="h-full bg-emerald-600 rounded-full" :style="{ width: dashboardStats.progress + '%' }">
                    </div>
                  </div>
                  <span class="text-lg font-bold text-emerald-700 mono">{{ dashboardStats.progress }}%</span>
                </div>
              </div>
            </div>
            <!-- Legend/Note -->
            <div class="mt-6 pt-4 border-t border-gray-300">
              <p class="text-xs text-gray-600 font-semibold mb-3">📌 Penjelasan Warna Status:</p>
              <div class="grid grid-cols-3 gap-3">
                <div class="flex items-center gap-2">
                  <div class="w-4 h-4 rounded-full bg-red-600"></div>
                  <span class="text-xs text-gray-700">Belum Mula</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-4 h-4 rounded-full bg-blue-600"></div>
                  <span class="text-xs text-gray-700">Dalam Proses</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-4 h-4 rounded-full bg-emerald-600"></div>
                  <span class="text-xs text-gray-700">Selesai</span>
                </div>
              </div>
            </div>
          </div>
          <!-- Skor Card -->
          <!-- ── Skor Bintang ── TEMPORARY HARDCODED -->
          <div class="bg-white rounded-2xl shadow-lg border border-yellow-100/60 overflow-hidden">
            <div class="bg-gradient-to-r from-yellow-500 to-amber-500 px-8 py-5 flex items-center gap-3">
              <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <div>
                <h2 class="text-xl font-bold text-white">Skor Bintang Audit</h2>
                <p class="text-yellow-100 text-xs mt-0.5">Penilaian keseluruhan mengikut fasa — sementara</p>
              </div>
            </div>
            <div class="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div v-for="item in auditScores" :key="item.name"
                class="bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-2xl p-5 flex flex-col items-center gap-3">
                <p class="text-sm font-bold text-gray-700">{{ item.name }}</p>
                <!-- Stars -->
                <div class="flex items-center gap-1">
                  <template v-for="n in 5" :key="n">
                    <svg :class="n <= item.value ? 'text-yellow-400' : 'text-gray-200'"
                      class="w-7 h-7 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </template>
                </div>
                <!-- Score badge -->
                <span
                  class="px-4 py-1 bg-yellow-400/20 border border-yellow-400/40 rounded-full text-yellow-700 text-sm font-extrabold mono">
                  {{ item.value }} / 5
                </span>
              </div>
            </div>
          </div>
          <!-- <div
            class="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border-2 border-amber-300 hover:shadow-xl transition-all">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h3 class="text-xl font-bold text-amber-700 flex items-center gap-2">
                  <span
                    class="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center text-lg font-bold shadow-lg">⭐</span>
                  Skor
                </h3>
              </div>
            </div>

            <div class="space-y-3">
              <div v-for="phase in phaseOverview" :key="phase.slug"
                class="bg-white rounded-xl p-3 border border-amber-100 hover:border-amber-300 transition-all">
                <div class="flex items-center justify-between mb-3">
                  <p class="text-sm font-semibold text-gray-800">{{ phase.label }}</p>
                </div>
                <div class="flex items-center gap-2 mb-1">
                  <svg v-for="i in 5" :key="i" class="w-6 h-6"
                    :class="i <= phase.stars ? 'text-amber-400' : 'text-gray-300'" fill="currentColor"
                    viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
            </div>

            <div class="mt-4 pt-4 border-t-2 border-amber-300">
              <div class="flex items-center justify-between">
                <span class="text-sm font-bold text-amber-700"></span>
                <div class="flex items-center gap-2">
                  <div class="flex items-center gap-1">
                    <svg v-for="i in 5" :key="i" class="w-5 h-5"
                      :class="i <= getStarsFromPercentage(jumlahKeseluruhan) ? 'text-amber-400' : 'text-gray-300'"
                      fill="currentColor" viewBox="0 0 20 20">
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span class="text-lg font-bold text-amber-700 mono">{{ jumlahKeseluruhan }}%</span>
                </div>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>

    <!-- Phase Comparison Bar Graph -->
    <div class="bg-white rounded-2xl shadow-lg border border-blue-200/50 overflow-hidden mb-8">
      <div class="p-8">
        <PhaseComparisonBar :phases="phaseBarData" />
      </div>
    </div>

    <!-- Audit Criteria Breakdown - Self Audit -->
    <div v-if="selectedCriteriaPhase === 'self'"
      class="bg-white rounded-2xl shadow-lg border border-blue-100/50 overflow-hidden" ref="criteriaSectionRef">
      <div class="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
        <div class="flex items-center gap-3">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          <div>
            <h2 class="text-2xl font-bold text-white">17 Kriteria Audit SAAPTD</h2>
            <p class="text-white/90 text-sm mt-1">Audit: <span class="font-semibold">Self Audit</span></p>
          </div>
        </div>
      </div>

      <div class="p-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Perkara Gerak (G) -->
          <div
            class="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-orange-300 hover:shadow-xl transition-all">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h3 class="text-xl font-bold text-orange-700 flex items-center gap-2">
                  <span
                    class="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center text-lg font-bold shadow-lg">G</span>
                  Perkara Gerak
                </h3>
                <p class="text-sm text-orange-600 mt-1 font-semibold">Operasi & Latihan</p>
              </div>
              <div class="text-right">
                <p class="text-4xl font-bold text-orange-700 mono">{{ perkaraGTotal }}%</p>
                <p class="text-xs text-orange-600 font-semibold uppercase">Total</p>
              </div>
            </div>

            <div class="space-y-3">
              <div
                class="bg-white rounded-xl p-3 border border-orange-200 hover:border-orange-400 transition-all cursor-pointer"
                @click="goToLatihanForm('self')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">Latihan</p>
                  <span class="text-sm font-bold text-orange-600 mono">{{ perkaraGScores.pengurusanLatihan }}%</span>
                </div>
                <div class="bg-orange-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                    :style="{ width: (perkaraGScores.pengurusanLatihan / perkaraGTotal * 100) + '%' }"></div>
                </div>
              </div>

              <div
                class="bg-white rounded-xl p-3 border border-orange-200 hover:border-orange-400 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-keselamatan-am', 'self')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">Keselamatan Am</p>
                  <span class="text-sm font-bold text-orange-600 mono">{{ perkaraGScores.keselamatanAm }}%</span>
                </div>
                <div class="bg-orange-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                    :style="{ width: (perkaraGScores.keselamatanAm / perkaraGTotal * 100) + '%' }"></div>
                </div>
              </div>

              <div
                class="bg-white rounded-xl p-3 border border-orange-200 hover:border-orange-400 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-kkp', 'self')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">K&KP</p>
                  <span class="text-sm font-bold text-orange-600 mono">{{ perkaraGScores.kkp }}%</span>
                </div>
                <div class="bg-orange-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                    :style="{ width: (perkaraGScores.kkp / perkaraGTotal * 100) + '%' }"></div>
                </div>
              </div>

              <div
                class="bg-white rounded-xl p-3 border border-orange-200 hover:border-orange-400 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-peluru', 'self')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">Peluru & Bahan Letupan</p>
                  <span class="text-sm font-bold text-orange-600 mono">{{ perkaraGScores.peluruBahanLetupan }}%</span>
                </div>
                <div class="bg-orange-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                    :style="{ width: (perkaraGScores.peluruBahanLetupan / perkaraGTotal * 100) + '%' }"></div>
                </div>
              </div>

              <div
                class="bg-white rounded-xl p-3 border border-orange-200 hover:border-orange-400 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-semboyan', 'self')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">Semboyan</p>
                  <span class="text-sm font-bold text-orange-600 mono">{{ perkaraGScores.semboyan }}%</span>
                </div>
                <div class="bg-orange-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                    :style="{ width: (perkaraGScores.semboyan / perkaraGTotal * 100) + '%' }"></div>
                </div>
              </div>
            </div>

            <div class="mt-4 pt-4 border-t-2 border-orange-300">
              <div class="flex items-center justify-between">
                <span class="text-sm font-bold text-orange-700"></span>
                <div class="flex items-center gap-2">
                  <div class="w-16 h-2 bg-orange-200 rounded-full overflow-hidden">
                    <div class="h-full bg-orange-600 rounded-full" :style="{ width: perkaraGTotal + '%' }"></div>
                  </div>
                  <span class="text-lg font-bold text-orange-700 mono">{{ perkaraGTotal }}%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Perkara Tadbir (A) -->
          <div
            class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200 hover:shadow-xl transition-all">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h3 class="text-xl font-bold text-blue-700 flex items-center gap-2">
                  <span
                    class="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center text-lg font-bold shadow-lg">A</span>
                  Perkara Tadbir
                </h3>
                <p class="text-sm text-blue-600 mt-1 font-semibold">Pentadbiran & Pengurusan</p>
              </div>
              <div class="text-right">
                <p class="text-4xl font-bold text-blue-700 mono">{{ perkaraATotal }}%</p>
                <p class="text-xs text-blue-600 font-semibold uppercase">Total</p>
              </div>
            </div>

            <div class="space-y-3">
              <div
                class="bg-white rounded-xl p-3 border border-blue-100 hover:border-blue-300 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-pentadbiran', 'self')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">Pentadbiran Sumber Manusia</p>
                  <span class="text-sm font-bold text-blue-600 mono">{{ perkaraAScores.pentadbiranSumberManusia
                  }}%</span>
                </div>
                <div class="bg-blue-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                    :style="{ width: (perkaraAScores.pentadbiranSumberManusia / perkaraATotal * 100) + '%' }"></div>
                </div>
              </div>

              <div
                class="bg-white rounded-xl p-3 border border-blue-100 hover:border-blue-300 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-dokumen', 'self')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">Dokumen</p>
                  <span class="text-sm font-bold text-blue-600 mono">{{ perkaraAScores.dokumen }}%</span>
                </div>
                <div class="bg-blue-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                    :style="{ width: (perkaraAScores.dokumen / perkaraATotal * 100) + '%' }"></div>
                </div>
              </div>

              <div
                class="bg-white rounded-xl p-3 border border-blue-100 hover:border-blue-300 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-kewangan', 'self')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">Kewangan</p>
                  <span class="text-sm font-bold text-blue-600 mono">{{ perkaraAScores.kewangan }}%</span>
                </div>
                <div class="bg-blue-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                    :style="{ width: (perkaraAScores.kewangan / perkaraATotal * 100) + '%' }"></div>
                </div>
              </div>

              <div
                class="bg-white rounded-xl p-3 border border-blue-100 hover:border-blue-300 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-kagat', 'self')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">KAGAT</p>
                  <span class="text-sm font-bold text-blue-600 mono">{{ perkaraAScores.kagat }}%</span>
                </div>
                <div class="bg-blue-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                    :style="{ width: (perkaraAScores.kagat / perkaraATotal * 100) + '%' }"></div>
                </div>
              </div>

              <div
                class="bg-white rounded-xl p-3 border border-blue-100 hover:border-blue-300 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-pendidikan', 'self')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">Pendidikan</p>
                  <span class="text-sm font-bold text-blue-600 mono">{{ perkaraAScores.pendidikan }}%</span>
                </div>
                <div class="bg-blue-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                    :style="{ width: (perkaraAScores.pendidikan / perkaraATotal * 100) + '%' }"></div>
                </div>
              </div>

              <div
                class="bg-white rounded-xl p-3 border border-blue-100 hover:border-blue-300 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-ict', 'self')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">ICT</p>
                  <span class="text-sm font-bold text-blue-600 mono">{{ perkaraAScores.ict }}%</span>
                </div>
                <div class="bg-blue-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                    :style="{ width: (perkaraAScores.ict / perkaraATotal * 100) + '%' }"></div>
                </div>
              </div>

              <div
                class="bg-white rounded-xl p-3 border border-blue-100 hover:border-blue-300 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-kesihatan', 'self')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">Kesihatan</p>
                  <span class="text-sm font-bold text-blue-600 mono">{{ perkaraAScores.kesihatan }}%</span>
                </div>
                <div class="bg-blue-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                    :style="{ width: (perkaraAScores.kesihatan / perkaraATotal * 100) + '%' }"></div>
                </div>
              </div>
            </div>

            <div class="mt-4 pt-4 border-t-2 border-blue-200">
              <div class="flex items-center justify-between">
                <span class="text-sm font-bold text-blue-700"></span>
                <div class="flex items-center gap-2">
                  <div class="w-16 h-2 bg-blue-200 rounded-full overflow-hidden">
                    <div class="h-full bg-blue-600 rounded-full" :style="{ width: perkaraATotal + '%' }"></div>
                  </div>
                  <span class="text-lg font-bold text-blue-700 mono">{{ perkaraATotal }}%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Perkara Logistik (Q) -->
          <div
            class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 hover:shadow-xl transition-all">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h3 class="text-xl font-bold text-green-700 flex items-center gap-2">
                  <span
                    class="w-10 h-10 rounded-xl bg-green-600 text-white flex items-center justify-center text-lg font-bold shadow-lg">Q</span>
                  Perkara Logistik
                </h3>
                <p class="text-sm text-green-600 mt-1 font-semibold">Sokongan & Perkhidmatan</p>
              </div>
              <div class="text-right">
                <p class="text-4xl font-bold text-green-700 mono">{{ perkaraQTotal }}%</p>
                <p class="text-xs text-green-600 font-semibold uppercase">Total</p>
              </div>
            </div>

            <div class="space-y-3">
              <div
                class="bg-white rounded-xl p-3 border border-green-100 hover:border-green-300 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-logistik', 'self')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">Logistik</p>
                  <span class="text-sm font-bold text-green-600 mono">{{ perkaraQScores.logistik }}%</span>
                </div>
                <div class="bg-green-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                    :style="{ width: (perkaraQScores.logistik / perkaraQTotal * 100) + '%' }"></div>
                </div>
              </div>

              <div
                class="bg-white rounded-xl p-3 border border-green-100 hover:border-green-300 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-aset', 'self')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">Aset & Stor Kerajaan</p>
                  <span class="text-sm font-bold text-green-600 mono">{{ perkaraQScores.aset }}%</span>
                </div>
                <div class="bg-green-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                    :style="{ width: (perkaraQScores.aset / perkaraQTotal * 100) + '%' }"></div>
                </div>
              </div>

              <div
                class="bg-white rounded-xl p-3 border border-green-100 hover:border-green-300 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-jlj', 'self')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">JLJ</p>
                  <span class="text-sm font-bold text-green-600 mono">{{ perkaraQScores.jlj }}%</span>
                </div>
                <div class="bg-green-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                    :style="{ width: (perkaraQScores.jlj / perkaraQTotal * 100) + '%' }"></div>
                </div>
              </div>

              <div
                class="bg-white rounded-xl p-3 border border-green-100 hover:border-green-300 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-kebombaan', 'self')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">Kebombaan</p>
                  <span class="text-sm font-bold text-green-600 mono">{{ perkaraQScores.kebombaan }}%</span>
                </div>
                <div class="bg-green-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                    :style="{ width: (perkaraQScores.kebombaan / perkaraQTotal * 100) + '%' }"></div>
                </div>
              </div>

              <div
                class="bg-white rounded-xl p-3 border border-green-100 hover:border-green-300 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-sajian', 'self')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">Sajian</p>
                  <span class="text-sm font-bold text-green-600 mono">{{ perkaraQScores.sajian }}%</span>
                </div>
                <div class="bg-green-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                    :style="{ width: (perkaraQScores.sajian / perkaraQTotal * 100) + '%' }"></div>
                </div>
              </div>
            </div>

            <div class="mt-4 pt-4 border-t-2 border-green-200">
              <div class="flex items-center justify-between">
                <span class="text-sm font-bold text-green-700"></span>
                <div class="flex items-center gap-2">
                  <div class="w-16 h-2 bg-green-200 rounded-full overflow-hidden">
                    <div class="h-full bg-green-600 rounded-full" :style="{ width: perkaraQTotal + '%' }"></div>
                  </div>
                  <span class="text-lg font-bold text-green-700 mono">{{ perkaraQTotal }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Total Summary -->
        <div class="mt-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-300">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div
                class="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-xl">
                <svg class="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <p class="text-sm text-gray-600 font-semibold uppercase tracking-wide">Jumlah Keseluruhan</p>
                <p class="text-2xl font-bold text-gray-800">Kriteria Audit SAAPTD</p>
              </div>
            </div>
            <div class="flex items-center gap-6">
              <div class="text-center px-4">
                <p class="text-sm text-gray-600 font-semibold mb-1">Perkara G</p>
                <p class="text-3xl font-bold text-orange-600 mono">{{ perkaraGTotal }}%</p>
              </div>
              <div class="w-px h-12 bg-gray-300"></div>
              <div class="text-center px-4">
                <p class="text-sm text-gray-600 font-semibold mb-1">Perkara A</p>
                <p class="text-3xl font-bold text-blue-600 mono">{{ perkaraATotal }}%</p>
              </div>
              <div class="w-px h-12 bg-gray-300"></div>
              <div class="text-center px-4">
                <p class="text-sm text-gray-600 font-semibold mb-1">Perkara Q</p>
                <p class="text-3xl font-bold text-green-600 mono">{{ perkaraQTotal }}%</p>
              </div>
              <div class="w-px h-12 bg-gray-300"></div>
              <div class="text-center px-6">
                <p class="text-sm text-gray-600 font-semibold mb-1">Keseluruhan</p>
                <p
                  class="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mono">
                  {{ perkaraGTotal + perkaraATotal + perkaraQTotal }}%</p>
              </div>
            </div>
          </div>

          <div class="mt-6 bg-white rounded-xl p-4">
            <div class="flex gap-2 h-4 rounded-full overflow-hidden">
              <div
                class="bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center text-white text-xs font-bold"
                :style="{ width: perkaraGTotal + '%' }">
                G: {{ perkaraGTotal }}%
              </div>
              <div
                class="bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold"
                :style="{ width: perkaraATotal + '%' }">
                A: {{ perkaraATotal }}%
              </div>
              <div
                class="bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white text-xs font-bold"
                :style="{ width: perkaraQTotal + '%' }">
                Q: {{ perkaraQTotal }}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Audit Criteria Breakdown - Commander's Audit -->
    <div v-if="selectedCriteriaPhase === 'commander'"
      class="bg-white rounded-2xl shadow-lg border border-purple-100/50 overflow-hidden" ref="criteriaSectionRef">
      <div class="bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-6">
        <div class="flex items-center gap-3">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          <div>
            <h2 class="text-2xl font-bold text-white">17 Kriteria Audit SAAPTD</h2>
            <p class="text-white/90 text-sm mt-1">Audit: <span class="font-semibold">Commander's Audit</span></p>
          </div>
        </div>
      </div>

      <div class="p-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Perkara Gerak (G) -->
          <div
            class="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-orange-300 hover:shadow-xl transition-all">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h3 class="text-xl font-bold text-orange-700 flex items-center gap-2">
                  <span
                    class="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center text-lg font-bold shadow-lg">G</span>
                  Perkara Gerak
                </h3>
                <p class="text-sm text-orange-600 mt-1 font-semibold">Operasi & Latihan</p>
              </div>
              <div class="text-right">
                <p class="text-4xl font-bold text-orange-700 mono">{{ perkaraGTotal }}%</p>
                <p class="text-xs text-orange-600 font-semibold uppercase">Total</p>
              </div>
            </div>

            <div class="space-y-3">
              <div
                class="bg-white rounded-xl p-3 border border-orange-200 hover:border-orange-400 transition-all cursor-pointer"
                @click="goToLatihanForm('commander')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">Latihan</p>
                  <span class="text-sm font-bold text-orange-600 mono">{{ perkaraGScores.pengurusanLatihan }}%</span>
                </div>
                <div class="bg-orange-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                    :style="{ width: (perkaraGScores.pengurusanLatihan / perkaraGTotal * 100) + '%' }"></div>
                </div>
              </div>

              <div
                class="bg-white rounded-xl p-3 border border-orange-200 hover:border-orange-400 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-keselamatan-am', 'commander')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">Keselamatan Am</p>
                  <span class="text-sm font-bold text-orange-600 mono">{{ perkaraGScores.keselamatanAm }}%</span>
                </div>
                <div class="bg-orange-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                    :style="{ width: (perkaraGScores.keselamatanAm / perkaraGTotal * 100) + '%' }"></div>
                </div>
              </div>

              <div
                class="bg-white rounded-xl p-3 border border-orange-200 hover:border-orange-400 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-kkp', 'commander')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">K&KP</p>
                  <span class="text-sm font-bold text-orange-600 mono">{{ perkaraGScores.kkp }}%</span>
                </div>
                <div class="bg-orange-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                    :style="{ width: (perkaraGScores.kkp / perkaraGTotal * 100) + '%' }"></div>
                </div>
              </div>

              <div
                class="bg-white rounded-xl p-3 border border-orange-200 hover:border-orange-400 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-peluru', 'commander')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">Peluru & Bahan Letupan</p>
                  <span class="text-sm font-bold text-orange-600 mono">{{ perkaraGScores.peluruBahanLetupan }}%</span>
                </div>
                <div class="bg-orange-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                    :style="{ width: (perkaraGScores.peluruBahanLetupan / perkaraGTotal * 100) + '%' }"></div>
                </div>
              </div>

              <div
                class="bg-white rounded-xl p-3 border border-orange-200 hover:border-orange-400 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-semboyan', 'commander')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">Semboyan</p>
                  <span class="text-sm font-bold text-orange-600 mono">{{ perkaraGScores.semboyan }}%</span>
                </div>
                <div class="bg-orange-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                    :style="{ width: (perkaraGScores.semboyan / perkaraGTotal * 100) + '%' }"></div>
                </div>
              </div>
            </div>

            <div class="mt-4 pt-4 border-t-2 border-orange-300">
              <div class="flex items-center justify-between">
                <span class="text-sm font-bold text-orange-700"></span>
                <div class="flex items-center gap-2">
                  <div class="w-16 h-2 bg-orange-200 rounded-full overflow-hidden">
                    <div class="h-full bg-orange-600 rounded-full" :style="{ width: perkaraGTotal + '%' }"></div>
                  </div>
                  <span class="text-lg font-bold text-orange-700 mono">{{ perkaraGTotal }}%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Perkara Tadbir (A) -->
          <div
            class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200 hover:shadow-xl transition-all">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h3 class="text-xl font-bold text-blue-700 flex items-center gap-2">
                  <span
                    class="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center text-lg font-bold shadow-lg">A</span>
                  Perkara Tadbir
                </h3>
                <p class="text-sm text-blue-600 mt-1 font-semibold">Pentadbiran & Pengurusan</p>
              </div>
              <div class="text-right">
                <p class="text-4xl font-bold text-blue-700 mono">{{ perkaraATotal }}%</p>
                <p class="text-xs text-blue-600 font-semibold uppercase">Total</p>
              </div>
            </div>

            <div class="space-y-3">
              <div
                class="bg-white rounded-xl p-3 border border-blue-100 hover:border-blue-300 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-pentadbiran', 'commander')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">Pentadbiran Sumber Manusia</p>
                  <span class="text-sm font-bold text-blue-600 mono">{{ perkaraAScores.pentadbiranSumberManusia
                  }}%</span>
                </div>
                <div class="bg-blue-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                    :style="{ width: (perkaraAScores.pentadbiranSumberManusia / perkaraATotal * 100) + '%' }"></div>
                </div>
              </div>

              <div
                class="bg-white rounded-xl p-3 border border-blue-100 hover:border-blue-300 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-dokumen', 'commander')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">Dokumen</p>
                  <span class="text-sm font-bold text-blue-600 mono">{{ perkaraAScores.dokumen }}%</span>
                </div>
                <div class="bg-blue-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                    :style="{ width: (perkaraAScores.dokumen / perkaraATotal * 100) + '%' }"></div>
                </div>
              </div>

              <div
                class="bg-white rounded-xl p-3 border border-blue-100 hover:border-blue-300 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-kewangan', 'commander')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">Kewangan</p>
                  <span class="text-sm font-bold text-blue-600 mono">{{ perkaraAScores.kewangan }}%</span>
                </div>
                <div class="bg-blue-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                    :style="{ width: (perkaraAScores.kewangan / perkaraATotal * 100) + '%' }"></div>
                </div>
              </div>

              <div
                class="bg-white rounded-xl p-3 border border-blue-100 hover:border-blue-300 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-kagat', 'commander')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">KAGAT</p>
                  <span class="text-sm font-bold text-blue-600 mono">{{ perkaraAScores.kagat }}%</span>
                </div>
                <div class="bg-blue-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                    :style="{ width: (perkaraAScores.kagat / perkaraATotal * 100) + '%' }"></div>
                </div>
              </div>

              <div
                class="bg-white rounded-xl p-3 border border-blue-100 hover:border-blue-300 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-pendidikan', 'commander')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">Pendidikan</p>
                  <span class="text-sm font-bold text-blue-600 mono">{{ perkaraAScores.pendidikan }}%</span>
                </div>
                <div class="bg-blue-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                    :style="{ width: (perkaraAScores.pendidikan / perkaraATotal * 100) + '%' }"></div>
                </div>
              </div>

              <div
                class="bg-white rounded-xl p-3 border border-blue-100 hover:border-blue-300 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-ict', 'commander')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">ICT</p>
                  <span class="text-sm font-bold text-blue-600 mono">{{ perkaraAScores.ict }}%</span>
                </div>
                <div class="bg-blue-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                    :style="{ width: (perkaraAScores.ict / perkaraATotal * 100) + '%' }"></div>
                </div>
              </div>

              <div
                class="bg-white rounded-xl p-3 border border-blue-100 hover:border-blue-300 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-kesihatan', 'commander')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">Kesihatan</p>
                  <span class="text-sm font-bold text-blue-600 mono">{{ perkaraAScores.kesihatan }}%</span>
                </div>
                <div class="bg-blue-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                    :style="{ width: (perkaraAScores.kesihatan / perkaraATotal * 100) + '%' }"></div>
                </div>
              </div>
            </div>

            <div class="mt-4 pt-4 border-t-2 border-blue-200">
              <div class="flex items-center justify-between">
                <span class="text-sm font-bold text-blue-700"></span>
                <div class="flex items-center gap-2">
                  <div class="w-16 h-2 bg-blue-200 rounded-full overflow-hidden">
                    <div class="h-full bg-blue-600 rounded-full" :style="{ width: perkaraATotal + '%' }"></div>
                  </div>
                  <span class="text-lg font-bold text-blue-700 mono">{{ perkaraATotal }}%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Perkara Logistik (Q) -->
          <div
            class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 hover:shadow-xl transition-all">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h3 class="text-xl font-bold text-green-700 flex items-center gap-2">
                  <span
                    class="w-10 h-10 rounded-xl bg-green-600 text-white flex items-center justify-center text-lg font-bold shadow-lg">Q</span>
                  Perkara Logistik
                </h3>
                <p class="text-sm text-green-600 mt-1 font-semibold">Sokongan & Perkhidmatan</p>
              </div>
              <div class="text-right">
                <p class="text-4xl font-bold text-green-700 mono">{{ perkaraQTotal }}%</p>
                <p class="text-xs text-green-600 font-semibold uppercase">Total</p>
              </div>
            </div>

            <div class="space-y-3">
              <div
                class="bg-white rounded-xl p-3 border border-green-100 hover:border-green-300 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-logistik', 'commander')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">Logistik</p>
                  <span class="text-sm font-bold text-green-600 mono">{{ perkaraQScores.logistik }}%</span>
                </div>
                <div class="bg-green-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                    :style="{ width: (perkaraQScores.logistik / perkaraQTotal * 100) + '%' }"></div>
                </div>
              </div>

              <div
                class="bg-white rounded-xl p-3 border border-green-100 hover:border-green-300 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-aset', 'commander')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">Aset & Stor Kerajaan</p>
                  <span class="text-sm font-bold text-green-600 mono">{{ perkaraQScores.aset }}%</span>
                </div>
                <div class="bg-green-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                    :style="{ width: (perkaraQScores.aset / perkaraQTotal * 100) + '%' }"></div>
                </div>
              </div>

              <div
                class="bg-white rounded-xl p-3 border border-green-100 hover:border-green-300 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-jlj', 'commander')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">JLJ</p>
                  <span class="text-sm font-bold text-green-600 mono">{{ perkaraQScores.jlj }}%</span>
                </div>
                <div class="bg-green-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                    :style="{ width: (perkaraQScores.jlj / perkaraQTotal * 100) + '%' }"></div>
                </div>
              </div>

              <div
                class="bg-white rounded-xl p-3 border border-green-100 hover:border-green-300 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-kebombaan', 'commander')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">Kebombaan</p>
                  <span class="text-sm font-bold text-green-600 mono">{{ perkaraQScores.kebombaan }}%</span>
                </div>
                <div class="bg-green-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                    :style="{ width: (perkaraQScores.kebombaan / perkaraQTotal * 100) + '%' }"></div>
                </div>
              </div>

              <div
                class="bg-white rounded-xl p-3 border border-green-100 hover:border-green-300 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-sajian', 'commander')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">Sajian</p>
                  <span class="text-sm font-bold text-green-600 mono">{{ perkaraQScores.sajian }}%</span>
                </div>
                <div class="bg-green-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                    :style="{ width: (perkaraQScores.sajian / perkaraQTotal * 100) + '%' }"></div>
                </div>
              </div>
            </div>

            <div class="mt-4 pt-4 border-t-2 border-green-200">
              <div class="flex items-center justify-between">
                <span class="text-sm font-bold text-green-700"></span>
                <div class="flex items-center gap-2">
                  <div class="w-16 h-2 bg-green-200 rounded-full overflow-hidden">
                    <div class="h-full bg-green-600 rounded-full" :style="{ width: perkaraQTotal + '%' }"></div>
                  </div>
                  <span class="text-lg font-bold text-green-700 mono">{{ perkaraQTotal }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Total Summary -->
        <div class="mt-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-300">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div
                class="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-xl">
                <svg class="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <p class="text-sm text-gray-600 font-semibold uppercase tracking-wide">Jumlah Keseluruhan</p>
                <p class="text-2xl font-bold text-gray-800">Kriteria Audit SAAPTD</p>
              </div>
            </div>
            <div class="flex items-center gap-6">
              <div class="text-center px-4">
                <p class="text-sm text-gray-600 font-semibold mb-1">Perkara G</p>
                <p class="text-3xl font-bold text-orange-600 mono">{{ perkaraGTotal }}%</p>
              </div>
              <div class="w-px h-12 bg-gray-300"></div>
              <div class="text-center px-4">
                <p class="text-sm text-gray-600 font-semibold mb-1">Perkara A</p>
                <p class="text-3xl font-bold text-blue-600 mono">{{ perkaraATotal }}%</p>
              </div>
              <div class="w-px h-12 bg-gray-300"></div>
              <div class="text-center px-4">
                <p class="text-sm text-gray-600 font-semibold mb-1">Perkara Q</p>
                <p class="text-3xl font-bold text-green-600 mono">{{ perkaraQTotal }}%</p>
              </div>
              <div class="w-px h-12 bg-gray-300"></div>
              <div class="text-center px-6">
                <p class="text-sm text-gray-600 font-semibold mb-1">Keseluruhan</p>
                <p
                  class="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mono">
                  {{ perkaraGTotal + perkaraATotal + perkaraQTotal }}%</p>
              </div>
            </div>
          </div>

          <div class="mt-6 bg-white rounded-xl p-4">
            <div class="flex gap-2 h-4 rounded-full overflow-hidden">
              <div
                class="bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center text-white text-xs font-bold"
                :style="{ width: perkaraGTotal + '%' }">
                G: {{ perkaraGTotal }}%
              </div>
              <div
                class="bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold"
                :style="{ width: perkaraATotal + '%' }">
                A: {{ perkaraATotal }}%
              </div>
              <div
                class="bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white text-xs font-bold"
                :style="{ width: perkaraQTotal + '%' }">
                Q: {{ perkaraQTotal }}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Audit Criteria Breakdown - APTD -->
    <div v-if="selectedCriteriaPhase === 'aptd'"
      class="bg-white rounded-2xl shadow-lg border border-red-100/50 overflow-hidden" ref="criteriaSectionRef">
      <div class="bg-gradient-to-r from-red-600 to-red-700 px-8 py-6">
        <div class="flex items-center gap-3">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          <div>
            <h2 class="text-2xl font-bold text-white">17 Kriteria Audit SAAPTD</h2>
            <p class="text-white/90 text-sm mt-1">Audit: <span class="font-semibold">APTD</span></p>
          </div>
        </div>
      </div>

      <div class="p-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Perkara Gerak (G) -->
          <div
            class="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-orange-300 hover:shadow-xl transition-all">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h3 class="text-xl font-bold text-orange-700 flex items-center gap-2">
                  <span
                    class="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center text-lg font-bold shadow-lg">G</span>
                  Perkara Gerak
                </h3>
                <p class="text-sm text-orange-600 mt-1 font-semibold">Operasi & Latihan</p>
              </div>
              <div class="text-right">
                <p class="text-4xl font-bold text-orange-700 mono">{{ perkaraGTotal }}%</p>
                <p class="text-xs text-orange-600 font-semibold uppercase">Total</p>
              </div>
            </div>

            <div class="space-y-3">
              <div
                class="bg-white rounded-xl p-3 border border-orange-200 hover:border-orange-400 transition-all cursor-pointer"
                @click="goToLatihanForm('aptd')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">Latihan</p>
                  <span class="text-sm font-bold text-orange-600 mono">{{ perkaraGScores.pengurusanLatihan }}%</span>
                </div>
                <div class="bg-orange-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                    :style="{ width: (perkaraGScores.pengurusanLatihan / perkaraGTotal * 100) + '%' }"></div>
                </div>
              </div>

              <div
                class="bg-white rounded-xl p-3 border border-orange-200 hover:border-orange-400 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-keselamatan-am', 'aptd')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">Keselamatan Am</p>
                  <span class="text-sm font-bold text-orange-600 mono">{{ perkaraGScores.keselamatanAm }}%</span>
                </div>
                <div class="bg-orange-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                    :style="{ width: (perkaraGScores.keselamatanAm / perkaraGTotal * 100) + '%' }"></div>
                </div>
              </div>

              <div
                class="bg-white rounded-xl p-3 border border-orange-200 hover:border-orange-400 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-kkp', 'aptd')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">K&KP</p>
                  <span class="text-sm font-bold text-orange-600 mono">{{ perkaraGScores.kkp }}%</span>
                </div>
                <div class="bg-orange-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                    :style="{ width: (perkaraGScores.kkp / perkaraGTotal * 100) + '%' }"></div>
                </div>
              </div>

              <div
                class="bg-white rounded-xl p-3 border border-orange-200 hover:border-orange-400 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-peluru', 'aptd')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">Peluru & Bahan Letupan</p>
                  <span class="text-sm font-bold text-orange-600 mono">{{ perkaraGScores.peluruBahanLetupan }}%</span>
                </div>
                <div class="bg-orange-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                    :style="{ width: (perkaraGScores.peluruBahanLetupan / perkaraGTotal * 100) + '%' }"></div>
                </div>
              </div>

              <div
                class="bg-white rounded-xl p-3 border border-orange-200 hover:border-orange-400 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-semboyan', 'aptd')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">Semboyan</p>
                  <span class="text-sm font-bold text-orange-600 mono">{{ perkaraGScores.semboyan }}%</span>
                </div>
                <div class="bg-orange-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                    :style="{ width: (perkaraGScores.semboyan / perkaraGTotal * 100) + '%' }"></div>
                </div>
              </div>
            </div>

            <div class="mt-4 pt-4 border-t-2 border-orange-300">
              <div class="flex items-center justify-between">
                <span class="text-sm font-bold text-orange-700"></span>
                <div class="flex items-center gap-2">
                  <div class="w-16 h-2 bg-orange-200 rounded-full overflow-hidden">
                    <div class="h-full bg-orange-600 rounded-full" :style="{ width: perkaraGTotal + '%' }"></div>
                  </div>
                  <span class="text-lg font-bold text-orange-700 mono">{{ perkaraGTotal }}%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Perkara Tadbir (A) -->
          <div
            class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200 hover:shadow-xl transition-all">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h3 class="text-xl font-bold text-blue-700 flex items-center gap-2">
                  <span
                    class="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center text-lg font-bold shadow-lg">A</span>
                  Perkara Tadbir
                </h3>
                <p class="text-sm text-blue-600 mt-1 font-semibold">Pentadbiran & Pengurusan</p>
              </div>
              <div class="text-right">
                <p class="text-4xl font-bold text-blue-700 mono">{{ perkaraATotal }}%</p>
                <p class="text-xs text-blue-600 font-semibold uppercase">Total</p>
              </div>
            </div>

            <div class="space-y-3">
              <div
                class="bg-white rounded-xl p-3 border border-blue-100 hover:border-blue-300 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-pentadbiran', 'aptd')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">Pentadbiran Sumber Manusia</p>
                  <span class="text-sm font-bold text-blue-600 mono">{{ perkaraAScores.pentadbiranSumberManusia
                  }}%</span>
                </div>
                <div class="bg-blue-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                    :style="{ width: (perkaraAScores.pentadbiranSumberManusia / perkaraATotal * 100) + '%' }"></div>
                </div>
              </div>

              <div
                class="bg-white rounded-xl p-3 border border-blue-100 hover:border-blue-300 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-dokumen', 'aptd')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">Dokumen</p>
                  <span class="text-sm font-bold text-blue-600 mono">{{ perkaraAScores.dokumen }}%</span>
                </div>
                <div class="bg-blue-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                    :style="{ width: (perkaraAScores.dokumen / perkaraATotal * 100) + '%' }"></div>
                </div>
              </div>

              <div
                class="bg-white rounded-xl p-3 border border-blue-100 hover:border-blue-300 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-kewangan', 'aptd')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">Kewangan</p>
                  <span class="text-sm font-bold text-blue-600 mono">{{ perkaraAScores.kewangan }}%</span>
                </div>
                <div class="bg-blue-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                    :style="{ width: (perkaraAScores.kewangan / perkaraATotal * 100) + '%' }"></div>
                </div>
              </div>

              <div
                class="bg-white rounded-xl p-3 border border-blue-100 hover:border-blue-300 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-kagat', 'aptd')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">KAGAT</p>
                  <span class="text-sm font-bold text-blue-600 mono">{{ perkaraAScores.kagat }}%</span>
                </div>
                <div class="bg-blue-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                    :style="{ width: (perkaraAScores.kagat / perkaraATotal * 100) + '%' }"></div>
                </div>
              </div>

              <div
                class="bg-white rounded-xl p-3 border border-blue-100 hover:border-blue-300 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-pendidikan', 'aptd')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">Pendidikan</p>
                  <span class="text-sm font-bold text-blue-600 mono">{{ perkaraAScores.pendidikan }}%</span>
                </div>
                <div class="bg-blue-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                    :style="{ width: (perkaraAScores.pendidikan / perkaraATotal * 100) + '%' }"></div>
                </div>
              </div>

              <div
                class="bg-white rounded-xl p-3 border border-blue-100 hover:border-blue-300 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-ict', 'aptd')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">ICT</p>
                  <span class="text-sm font-bold text-blue-600 mono">{{ perkaraAScores.ict }}%</span>
                </div>
                <div class="bg-blue-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                    :style="{ width: (perkaraAScores.ict / perkaraATotal * 100) + '%' }"></div>
                </div>
              </div>

              <div
                class="bg-white rounded-xl p-3 border border-blue-100 hover:border-blue-300 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-kesihatan', 'aptd')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">Kesihatan</p>
                  <span class="text-sm font-bold text-blue-600 mono">{{ perkaraAScores.kesihatan }}%</span>
                </div>
                <div class="bg-blue-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                    :style="{ width: (perkaraAScores.kesihatan / perkaraATotal * 100) + '%' }"></div>
                </div>
              </div>
            </div>

            <div class="mt-4 pt-4 border-t-2 border-blue-200">
              <div class="flex items-center justify-between">
                <span class="text-sm font-bold text-blue-700"></span>
                <div class="flex items-center gap-2">
                  <div class="w-16 h-2 bg-blue-200 rounded-full overflow-hidden">
                    <div class="h-full bg-blue-600 rounded-full" :style="{ width: perkaraATotal + '%' }"></div>
                  </div>
                  <span class="text-lg font-bold text-blue-700 mono">{{ perkaraATotal }}%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Perkara Logistik (Q) -->
          <div
            class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 hover:shadow-xl transition-all">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h3 class="text-xl font-bold text-green-700 flex items-center gap-2">
                  <span
                    class="w-10 h-10 rounded-xl bg-green-600 text-white flex items-center justify-center text-lg font-bold shadow-lg">Q</span>
                  Perkara Logistik
                </h3>
                <p class="text-sm text-green-600 mt-1 font-semibold">Sokongan & Perkhidmatan</p>
              </div>
              <div class="text-right">
                <p class="text-4xl font-bold text-green-700 mono">{{ perkaraQTotal }}%</p>
                <p class="text-xs text-green-600 font-semibold uppercase">Total</p>
              </div>
            </div>

            <div class="space-y-3">
              <div
                class="bg-white rounded-xl p-3 border border-green-100 hover:border-green-300 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-logistik', 'aptd')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">Logistik</p>
                  <span class="text-sm font-bold text-green-600 mono">{{ perkaraQScores.logistik }}%</span>
                </div>
                <div class="bg-green-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                    :style="{ width: (perkaraQScores.logistik / perkaraQTotal * 100) + '%' }"></div>
                </div>
              </div>

              <div
                class="bg-white rounded-xl p-3 border border-green-100 hover:border-green-300 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-aset', 'aptd')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">Aset & Stor Kerajaan</p>
                  <span class="text-sm font-bold text-green-600 mono">{{ perkaraQScores.aset }}%</span>
                </div>
                <div class="bg-green-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                    :style="{ width: (perkaraQScores.aset / perkaraQTotal * 100) + '%' }"></div>
                </div>
              </div>

              <div
                class="bg-white rounded-xl p-3 border border-green-100 hover:border-green-300 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-jlj', 'aptd')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">JLJ</p>
                  <span class="text-sm font-bold text-green-600 mono">{{ perkaraQScores.jlj }}%</span>
                </div>
                <div class="bg-green-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                    :style="{ width: (perkaraQScores.jlj / perkaraQTotal * 100) + '%' }"></div>
                </div>
              </div>

              <div
                class="bg-white rounded-xl p-3 border border-green-100 hover:border-green-300 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-kebombaan', 'aptd')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">Kebombaan</p>
                  <span class="text-sm font-bold text-green-600 mono">{{ perkaraQScores.kebombaan }}%</span>
                </div>
                <div class="bg-green-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                    :style="{ width: (perkaraQScores.kebombaan / perkaraQTotal * 100) + '%' }"></div>
                </div>
              </div>

              <div
                class="bg-white rounded-xl p-3 border border-green-100 hover:border-green-300 transition-all cursor-pointer"
                @click="goToAuditForm('/audit-sajian', 'aptd')">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-800">Sajian</p>
                  <span class="text-sm font-bold text-green-600 mono">{{ perkaraQScores.sajian }}%</span>
                </div>
                <div class="bg-green-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                    :style="{ width: (perkaraQScores.sajian / perkaraQTotal * 100) + '%' }"></div>
                </div>
              </div>
            </div>

            <div class="mt-4 pt-4 border-t-2 border-green-200">
              <div class="flex items-center justify-between">
                <span class="text-sm font-bold text-green-700"></span>
                <div class="flex items-center gap-2">
                  <div class="w-16 h-2 bg-green-200 rounded-full overflow-hidden">
                    <div class="h-full bg-green-600 rounded-full" :style="{ width: perkaraQTotal + '%' }"></div>
                  </div>
                  <span class="text-lg font-bold text-green-700 mono">{{ perkaraQTotal }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Total Summary -->
        <div class="mt-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-300">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div
                class="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-xl">
                <svg class="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <p class="text-sm text-gray-600 font-semibold uppercase tracking-wide">Jumlah Keseluruhan</p>
                <p class="text-2xl font-bold text-gray-800">Kriteria Audit SAAPTD</p>
              </div>
            </div>
            <div class="flex items-center gap-6">
              <div class="text-center px-4">
                <p class="text-sm text-gray-600 font-semibold mb-1">Perkara G</p>
                <p class="text-3xl font-bold text-orange-600 mono">{{ perkaraGTotal }}%</p>
              </div>
              <div class="w-px h-12 bg-gray-300"></div>
              <div class="text-center px-4">
                <p class="text-sm text-gray-600 font-semibold mb-1">Perkara A</p>
                <p class="text-3xl font-bold text-blue-600 mono">{{ perkaraATotal }}%</p>
              </div>
              <div class="w-px h-12 bg-gray-300"></div>
              <div class="text-center px-4">
                <p class="text-sm text-gray-600 font-semibold mb-1">Perkara Q</p>
                <p class="text-3xl font-bold text-green-600 mono">{{ perkaraQTotal }}%</p>
              </div>
              <div class="w-px h-12 bg-gray-300"></div>
              <div class="text-center px-6">
                <p class="text-sm text-gray-600 font-semibold mb-1">Keseluruhan</p>
                <p
                  class="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mono">
                  {{ perkaraGTotal + perkaraATotal + perkaraQTotal }}%</p>
              </div>
            </div>
          </div>

          <div class="mt-6 bg-white rounded-xl p-4">
            <div class="flex gap-2 h-4 rounded-full overflow-hidden">
              <div
                class="bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center text-white text-xs font-bold"
                :style="{ width: perkaraGTotal + '%' }">
                G: {{ perkaraGTotal }}%
              </div>
              <div
                class="bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold"
                :style="{ width: perkaraATotal + '%' }">
                A: {{ perkaraATotal }}%
              </div>
              <div
                class="bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white text-xs font-bold"
                :style="{ width: perkaraQTotal + '%' }">
                Q: {{ perkaraQTotal }}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Findings Analytics Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Findings Summary -->
      <div class="bg-white rounded-2xl shadow-lg border border-orange-100/50 p-6 hover:shadow-xl transition-all">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-bold text-gray-800">📋 Ringkasan Penemuan</h3>
          <router-link to="/history" class="text-orange-600 hover:text-orange-700 text-sm font-semibold">Lihat
            →</router-link>
        </div>
        <div class="space-y-4">
          <div class="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-100">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-semibold text-gray-700">Kritikal</p>
                <p class="text-xs text-gray-500">Perlu tindakan segera</p>
              </div>
            </div>
            <p class="text-2xl font-bold text-red-600 mono">{{ findingsStats.critical }}</p>
          </div>

          <div class="flex items-center justify-between p-4 bg-yellow-50 rounded-xl border border-yellow-100">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-semibold text-gray-700">Lazim</p>
                <p class="text-xs text-gray-500">Pemantauan biasa</p>
              </div>
            </div>
            <p class="text-2xl font-bold text-yellow-600 mono">{{ findingsStats.common }}</p>
          </div>

          <div class="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-100">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-semibold text-gray-700">Berulang</p>
                <p class="text-xs text-gray-500">Isu berulang kali</p>
              </div>
            </div>
            <p class="text-2xl font-bold text-orange-600 mono">{{ findingsStats.recurring }}</p>
          </div>
        </div>
      </div>

      <!-- Status Breakdown -->
      <div
        class="bg-white rounded-2xl shadow-lg border border-blue-100/50 p-6 hover:shadow-xl transition-all cursor-pointer"
        @click="showActionStatusModal = true">
        <h3 class="text-lg font-bold text-gray-800 mb-6">🎯 Status Tindakan Ke Atas Penemuan</h3>
        <div class="space-y-4">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-semibold text-gray-700">Baharu</span>
              <span class="text-sm font-bold text-gray-800 mono">{{ findingsStats.new }}</span>
            </div>
            <div class="bg-gray-100 rounded-full h-2.5 overflow-hidden">
              <div class="h-full bg-gradient-to-r from-gray-400 to-gray-500 rounded-full"
                :style="{ width: getPercentage(findingsStats.new, findingsStats.total) + '%' }"></div>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-semibold text-gray-700">Dalam Tindakan</span>
              <span class="text-sm font-bold text-blue-600 mono">{{ findingsStats.inProgress }}</span>
            </div>
            <div class="bg-gray-100 rounded-full h-2.5 overflow-hidden">
              <div class="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                :style="{ width: getPercentage(findingsStats.inProgress, findingsStats.total) + '%' }"></div>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-semibold text-gray-700">Selesai</span>
              <span class="text-sm font-bold text-green-600 mono">{{ findingsStats.resolved }}</span>
            </div>
            <div class="bg-gray-100 rounded-full h-2.5 overflow-hidden">
              <div class="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                :style="{ width: getPercentage(findingsStats.resolved, findingsStats.total) + '%' }"></div>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-semibold text-gray-700">Ditutup</span>
              <span class="text-sm font-bold text-slate-600 mono">{{ findingsStats.closed }}</span>
            </div>
            <div class="bg-gray-100 rounded-full h-2.5 overflow-hidden">
              <div class="h-full bg-gradient-to-r from-slate-400 to-slate-600 rounded-full"
                :style="{ width: getPercentage(findingsStats.closed, findingsStats.total) + '%' }"></div>
            </div>
          </div>

          <div class="pt-4 border-t border-gray-200">
            <div class="flex items-center justify-between">
              <span class="text-sm font-bold text-gray-800">Jumlah Penemuan</span>
              <span class="text-xl font-bold text-gray-800 mono">{{ findingsStats.total }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Response Status -->
      <div
        class="bg-white rounded-2xl shadow-lg border border-purple-100/50 p-6 hover:shadow-xl transition-all cursor-pointer"
        @click="showResponseStatusModal = true">
        <h3 class="text-lg font-bold text-gray-800 mb-6">💬 Status Maklum Balas Ke Atas Penemuan</h3>
        <div class="space-y-4">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-semibold text-gray-700">Menjawab Soalan</span>
              <span class="text-sm font-bold text-emerald-600 mono">{{ responseStats.answered }}</span>
            </div>
            <div class="bg-gray-100 rounded-full h-2.5 overflow-hidden">
              <div class="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"
                :style="{ width: getPercentage(responseStats.answered, responseStats.total) + '%' }"></div>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-semibold text-gray-700">Tidak Menjawab Soalan</span>
              <span class="text-sm font-bold text-red-600 mono">{{ responseStats.unanswered }}</span>
            </div>
            <div class="bg-gray-100 rounded-full h-2.5 overflow-hidden">
              <div class="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full"
                :style="{ width: getPercentage(responseStats.unanswered, responseStats.total) + '%' }"></div>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-semibold text-gray-700">Tidak Berkenaan</span>
              <span class="text-sm font-bold text-gray-600 mono">{{ responseStats.notApplicable }}</span>
            </div>
            <div class="bg-gray-100 rounded-full h-2.5 overflow-hidden">
              <div class="h-full bg-gradient-to-r from-gray-400 to-gray-600 rounded-full"
                :style="{ width: getPercentage(responseStats.notApplicable, responseStats.total) + '%' }"></div>
            </div>
          </div>

          <div class="pt-4 border-t border-gray-200">
            <div class="flex items-center justify-between">
              <span class="text-sm font-bold text-gray-800">Jumlah Item</span>
              <span class="text-xl font-bold text-gray-800 mono">{{ responseStats.total }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Boss Verification Status Section -->
    <div class="bg-white rounded-2xl shadow-lg border border-purple-100/50 overflow-hidden">
      <div class="bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-6">
        <div class="flex items-center gap-3">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12l2 2 4-4m7 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h2 class="text-2xl font-bold text-white">Status Pengesahan</h2>
            <p class="text-purple-100 text-sm mt-1">Pengesahan dan persetujuan untuk setiap fasa audit</p>
          </div>
        </div>
      </div>

      <div class="p-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div v-for="phase in phaseOverview" :key="phase.slug"
            class="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border-2 border-purple-300 hover:shadow-xl transition-all">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h3 class="text-xl font-bold text-purple-700">{{ phase.label }}</h3>
              </div>
            </div>

            <div class="space-y-4">
              <!-- Approval Status Badge -->
              <div class="bg-white rounded-xl p-4 border-2 border-purple-100">
                <p class="text-xs text-gray-500 font-semibold uppercase mb-2">Status Persetujuan</p>
                <div class="flex items-center gap-2 mb-3">
                  <span v-if="getVerificationStatus(phase.slug) === 'Approved'"
                    class="px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full flex items-center gap-1">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd" />
                    </svg>
                    ✓ Diluluskan
                  </span>
                  <span v-else-if="getVerificationStatus(phase.slug) === 'Pending'"
                    class="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm font-bold rounded-full flex items-center gap-1">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                        clip-rule="evenodd" />
                    </svg>
                    ⏳ Menunggu
                  </span>
                  <span v-else-if="getVerificationStatus(phase.slug) === 'Rejected'"
                    class="px-3 py-1 bg-red-100 text-red-700 text-sm font-bold rounded-full flex items-center gap-1">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clip-rule="evenodd" />
                    </svg>
                    ✗ Ditolak
                  </span>
                </div>
              </div>

              <!-- Boss Information -->
              <div class="bg-white rounded-xl p-4 border border-purple-100">
                <p class="text-xs text-gray-500 font-semibold uppercase mb-2">Nama Pemerintah</p>
                <p class="text-sm font-bold text-gray-800">{{ getVerificationData(phase.slug)?.bossName || '-' }}</p>
              </div>

              <!-- Verification Date -->
              <div class="bg-white rounded-xl p-4 border border-purple-100">
                <p class="text-xs text-gray-500 font-semibold uppercase mb-2">Tarikh Pengesahan</p>
                <p class="text-sm font-bold text-gray-800">{{ getVerificationData(phase.slug)?.verificationDate || '-'
                }}</p>
              </div>

              <!-- Verification Comments -->
              <div v-if="getVerificationData(phase.slug)?.comments"
                class="bg-white rounded-xl p-4 border border-purple-100">
                <p class="text-xs text-gray-500 font-semibold uppercase mb-2">Catatan</p>
                <p class="text-sm text-gray-700">{{ getVerificationData(phase.slug)?.comments }}</p>
              </div>

              <!-- Verification Button for Boss -->
              <button @click="openVerificationModal(phase.slug)"
                class="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Buat Pengesahan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Boss Verification Modal -->
    <div v-if="showVerificationModal" @click.self="showVerificationModal = false"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div class="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-6 flex-shrink-0">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-2xl font-bold text-white">Pengesahan Audit - {{ getPhaseLabel(selectedVerificationPhase)
              }}</h3>
              <p class="text-purple-100 text-sm mt-1">Lengkapkan maklumat pengesahan oleh pemerintah</p>
            </div>
            <button @click="showVerificationModal = false"
              class="text-white/80 hover:text-white hover:bg-white/20 rounded-xl p-2 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div class="p-8 overflow-y-auto flex-1 space-y-6">
          <!-- Boss Name -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Nama Pemerintah *</label>
            <input v-model="verificationForm.bossName" type="text" placeholder="Masukkan nama pemerintah"
              class="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-sm">
          </div>

          <!-- Verification Date -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Tarikh Pengesahan *</label>
            <input v-model="verificationForm.verificationDate" type="date"
              class="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-sm">
          </div>

          <!-- Approval Status -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Status Persetujuan *</label>
            <select v-model="verificationForm.status"
              class="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-sm">
              <option value="Pending">Menunggu</option>
              <option value="Approved">Diluluskan</option>
              <option value="Rejected">Ditolak</option>
            </select>
          </div>

          <!-- Comments -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Catatan/Ulasan</label>
            <textarea v-model="verificationForm.comments" rows="4" placeholder="Masukkan catatan atau ulasan..."
              class="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-sm resize-none"></textarea>
          </div>
        </div>

        <div class="px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3 flex-shrink-0">
          <button @click="showVerificationModal = false"
            class="px-6 py-2.5 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-semibold">
            Batal
          </button>
          <button @click="submitVerification"
            :disabled="!verificationForm.bossName || !verificationForm.verificationDate || !verificationForm.status"
            class="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Simpan Pengesahan
          </button>
        </div>
      </div>
    </div>

    <!-- Action Status Modal -->
    <ActionStatusModal :isOpen="showActionStatusModal" :findingsData="transformedFindingsForAction"
      @close="showActionStatusModal = false" />

    <!-- Response Status Modal -->
    <ResponseStatusModal :isOpen="showResponseStatusModal" :findingsData="transformedFindingsForResponse"
      @close="showResponseStatusModal = false" />
  </main>
</template>

<script setup lang="ts">
import PhaseComparisonBar from './PhaseComparisonBar.vue';
// Prepare data for the bar chart (audit scores by phase)
// TEMPORARY: Hardcoded scores for demo/analysis
const phaseBarData = computed(() => [
  { name: 'Self Audit', value: 79.5 },
  { name: "Commander's Audit", value: 85.5 },
  { name: 'APTD', value: 90.8 }
]);

// TEMPORARY: Star scores per audit phase
const auditScores = [
  { name: 'Self Audit', value: 5 },
  { name: "Commander's Audit", value: 2.5 },
  { name: 'APTD', value: 0 },
]
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import type { PhaseSlug } from '../composables/useAuditPhase'
import ActionStatusModal from './ActionStatusModal.vue'
import ResponseStatusModal from './ResponseStatusModal.vue'
// import { listAudits, listFindings } from '../services/api'

interface Audit {
  audit_id: string
  auditor_name: string
  audit_date: string
  passCount: number
  failCount: number
  avgScore: number
}

interface Finding {
  id: string
  audit_id?: string
  formType?: string
  itemBil?: string
  itemPerkara: string
  penemuan: string
  cadangan: string
  kategori: 'Kritikal' | 'Lazim' | 'Berulang'
  status: 'Baharu' | 'Dalam Tindakan' | 'Selesai' | 'Ditutup'
  priority: 'Tinggi' | 'Sederhana' | 'Rendah'
  pic: string
  createdDate: string
  dueDate: string
  actions?: Array<{
    date: string
    user: string
    note: string
  }>
}

const auditData = ref<Audit[]>([])
const findingsData = ref<Finding[]>([])
const currentDateTime = ref('')
const showActionStatusModal = ref(false)
const showResponseStatusModal = ref(false)
const router = useRouter()

// Transform findings data for ActionStatusModal
const transformedFindingsForAction = computed(() => {
  return findingsData.value.map(f => ({
    id: f.id,
    title: f.itemPerkara,
    description: f.penemuan,
    kategori: f.kategori,
    kriteria: f.formType || '-',
    date: f.createdDate,
    dueDate: f.dueDate,
    status: f.status,
    remarks: f.cadangan
  }))
})

// Transform findings data for ResponseStatusModal
const transformedFindingsForResponse = computed(() => {
  return findingsData.value.map(f => ({
    id: f.id,
    title: f.itemPerkara,
    description: f.penemuan,
    kategori: f.kategori,
    kriteria: f.formType || '-',
    date: f.createdDate,
    responseDate: f.dueDate,
    responseStatus: 'Menjawab Soalan' as const, // Default, you can add logic to determine actual status
    responseRemarks: f.cadangan
  }))
})

// Phase overview (Self / Commander / APTD)
const phaseCompletionDashboard = ref<Record<PhaseSlug, boolean>>({ self: false, commander: false, aptd: false })
const phaseMetaDashboard = ref<Record<PhaseSlug, { auditDate?: string }>>({
  self: {},
  commander: {},
  aptd: {}
})
const phaseStatusDashboard = ref<Record<PhaseSlug, 'belum mula' | 'dalam proses' | 'selesai'>>({
  self: 'selesai',
  commander: 'dalam proses',
  aptd: 'belum mula'
})
const selectedCriteriaPhase = ref<PhaseSlug>('self')
const criteriaSectionRef = ref<HTMLElement | null>(null)

// Verification Modal State
const showVerificationModal = ref(false)
const selectedVerificationPhase = ref<PhaseSlug>('self')
const verificationForm = ref({
  bossName: '',
  verificationDate: '',
  status: 'Pending' as 'Approved' | 'Pending' | 'Rejected',
  comments: ''
})

// Boss Verification Data
const verificationData = ref<Record<PhaseSlug, {
  bossName: string
  verificationDate: string
  status: 'Approved' | 'Pending' | 'Rejected'
  comments?: string
}>>({
  self: {
    bossName: '-',
    verificationDate: '-',
    status: 'Pending',
    comments: ''
  },
  commander: {
    bossName: '-',
    verificationDate: '-',
    status: 'Pending',
    comments: ''
  },
  aptd: {
    bossName: '-',
    verificationDate: '-',
    status: 'Pending',
    comments: ''
  }
})

const phaseOverview = computed(() => {
  const phases: Array<{ slug: PhaseSlug; label: string }> = [
    { slug: 'self', label: 'Self Audit' },
    { slug: 'commander', label: "Commander's Audit" },
    { slug: 'aptd', label: 'APTD' }
  ]
  return phases.map(p => {
    const status = phaseStatusDashboard.value[p.slug]
    let progressPercent = 0
    let progressColor = 'bg-red-600'
    let bgColor = 'bg-red-100'
    let textColor = 'text-red-600'

    if (status === 'belum mula') {
      progressPercent = 0
      progressColor = 'bg-red-600'
      bgColor = 'bg-red-100'
      textColor = 'text-red-600'
    } else if (status === 'dalam proses') {
      progressPercent = 50
      progressColor = 'bg-blue-600'
      bgColor = 'bg-blue-100'
      textColor = 'text-blue-600'
    } else if (status === 'selesai') {
      progressPercent = 100
      progressColor = 'bg-emerald-600'
      bgColor = 'bg-emerald-100'
      textColor = 'text-emerald-600'
    }

    return {
      ...p,
      completed: !!phaseCompletionDashboard.value[p.slug],
      status,
      progressPercent,
      progressColor,
      bgColor,
      textColor,
      date: phaseMetaDashboard.value[p.slug]?.auditDate || '-',
      score: jumlahKeseluruhan.value.toString(),
      stars: getStarsFromPercentage(jumlahKeseluruhan.value)
    }
  })
})

// phaseLabel is for potential future use or external visibility

const selectCriteriaPhase = async (slug: PhaseSlug) => {
  selectedCriteriaPhase.value = slug
  await nextTick()
  criteriaSectionRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const goToLatihanForm = (phase: PhaseSlug) => {
  router.push({ path: '/audit-form', query: { phase } })
}

const goToAuditForm = (formPath: string, phase: PhaseSlug) => {
  router.push({ path: formPath, query: { phase } })
}

// Perkara G Scores (from audit forms)
const perkaraGScores = ref({
  pengurusanLatihan: 0,
  keselamatanAm: 0,
  kkp: 0,
  peluruBahanLetupan: 0,
  semboyan: 0
})

// Perkara A Scores (from audit forms)
const perkaraAScores = ref({
  pentadbiranSumberManusia: 0,
  dokumen: 0,
  kewangan: 0,
  kagat: 0,
  pendidikan: 0,
  ict: 0,
  kesihatan: 0
})

// Perkara Q Scores (from audit forms)
const perkaraQScores = ref({
  logistik: 0,
  aset: 0,
  jlj: 0,
  kebombaan: 0,
  sajian: 0
})

// Update current date/time
const updateDateTime = () => {
  const now = new Date()
  currentDateTime.value = now.toLocaleDateString('ms-MY', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Calculate percentage from scores
const calculatePercentage = (score: number, maxScore: number = 5) => {
  if (maxScore === 0) return 0
  return Math.round((score / maxScore) * 100)
}

// Audit Statistics
const dashboardStats = computed(() => {
  // Get the latest progress based on APTD phase status
  const aptdStatus = phaseStatusDashboard.value['aptd']
  let latestProgress = 0

  if (aptdStatus === 'belum mula') {
    latestProgress = 0
  } else if (aptdStatus === 'dalam proses') {
    latestProgress = 50
  } else if (aptdStatus === 'selesai') {
    latestProgress = 100
  }

  if (auditData.value.length === 0) {
    return {
      total: 0,
      progress: latestProgress,
      failRate: 0,
      avgScore: '0.0'
    }
  }

  const total = auditData.value.length
  const totalPass = auditData.value.reduce((sum, audit) => sum + audit.passCount, 0)
  const totalFail = auditData.value.reduce((sum, audit) => sum + audit.failCount, 0)
  const totalItems = totalPass + totalFail

  const failRate = totalItems > 0 ? Math.round((totalFail / totalItems) * 100) : 0
  const avgScore = total > 0
    ? (auditData.value.reduce((sum, audit) => sum + parseFloat(audit.avgScore.toString()), 0) / total).toFixed(1)
    : '0.0'

  return { total, progress: latestProgress, failRate, avgScore }
})

// Perkara G Total Percentage
const perkaraGTotal = computed(() => {
  return Math.min(
    perkaraGScores.value.pengurusanLatihan +
    perkaraGScores.value.keselamatanAm +
    perkaraGScores.value.kkp +
    perkaraGScores.value.peluruBahanLetupan +
    perkaraGScores.value.semboyan,
    30
  )
})

// Perkara A Total Percentage
const perkaraATotal = computed(() => {
  return Math.min(
    perkaraAScores.value.pentadbiranSumberManusia +
    perkaraAScores.value.dokumen +
    perkaraAScores.value.kewangan +
    perkaraAScores.value.kagat +
    perkaraAScores.value.pendidikan +
    perkaraAScores.value.ict +
    perkaraAScores.value.kesihatan,
    36
  )
})

// Perkara Q Total Percentage
const perkaraQTotal = computed(() => {
  return Math.min(
    perkaraQScores.value.logistik +
    perkaraQScores.value.aset +
    perkaraQScores.value.jlj +
    perkaraQScores.value.kebombaan +
    perkaraQScores.value.sajian,
    34
  )
})

// Jumlah Keseluruhan (Total of all criteria)
const jumlahKeseluruhan = computed(() => {
  return perkaraGTotal.value + perkaraATotal.value + perkaraQTotal.value
})

// Convert percentage to stars based on grading scale
const getStarsFromPercentage = (percentage: number): number => {
  if (percentage >= 90) return 5
  if (percentage >= 80) return 4
  if (percentage >= 70) return 3
  if (percentage >= 60) return 2
  return 0
}

// Findings Statistics
const findingsStats = computed(() => {
  const total = findingsData.value.length

  return {
    total,
    critical: findingsData.value.filter(f => f.kategori === 'Kritikal').length,
    common: findingsData.value.filter(f => f.kategori === 'Lazim').length,
    recurring: findingsData.value.filter(f => f.kategori === 'Berulang').length,
    new: findingsData.value.filter(f => f.status === 'Baharu').length,
    inProgress: findingsData.value.filter(f => f.status === 'Dalam Tindakan').length,
    resolved: findingsData.value.filter(f => f.status === 'Selesai').length,
    closed: findingsData.value.filter(f => f.status === 'Ditutup').length
  }
})

// Resolution Rate
// const resolutionRate = computed(() => {
//   const total = findingsStats.value.total
//   if (total === 0) return 0
//   const resolved = findingsStats.value.resolved + findingsStats.value.closed
//   return Math.round((resolved / total) * 100)
// })

// Critical Pending (Critical findings not yet resolved)
// const criticalPending = computed(() => {
//   return findingsData.value.filter(
//     f => f.kategori === 'Kritikal' && f.status !== 'Selesai' && f.status !== 'Ditutup'
//   ).length
// })

// Response Statistics
const responseStats = computed(() => {
  // Mock data - replace with actual API data
  const answered = 45
  const unanswered = 12
  const notApplicable = 8

  return {
    answered,
    unanswered,
    notApplicable,
    total: answered + unanswered + notApplicable
  }
})

// Utility Functions

const getPercentage = (value: number, total: number) => {
  if (total === 0) return 0
  return Math.round((value / total) * 100)
}

// onMounted(async () => {
//   try {
//     // Map API response docs to Audit type
//     const auditsRaw = await listAudits()
//     auditData.value = auditsRaw.map((doc: any) => ({
//       audit_id: doc.audit_id || doc.$id,
//       auditor_name: doc.auditor_name || '-',
//       audit_date: doc.audit_date || '-',
//       passCount: doc.passCount || 0,
//       failCount: doc.failCount || 0,
//       avgScore: doc.avgScore || 0
//     }))
//     const findingsRaw = await listFindings()
//     findingsData.value = findingsRaw.map((doc: any) => ({
//       id: doc.id || doc.$id,
//       audit_id: doc.audit_id,
//       formType: doc.formType,
//       itemBil: doc.itemBil,
//       itemPerkara: doc.itemPerkara || '-',
//       penemuan: doc.penemuan || '-',
//       cadangan: doc.cadangan || '-',
//       kategori: doc.kategori || 'Lazim',
//       status: doc.status || 'Baharu',
//       priority: doc.priority || 'Sederhana',
//       pic: doc.pic || '-',
//       createdDate: doc.createdDate || new Date().toISOString(),
//       dueDate: doc.dueDate || '',
//       actions: Array.isArray(doc.actions) ? doc.actions : []
//     }))
//   } catch (error) {
//     console.error('Dashboard: Failed to load audits/findings:', error)
//   }
//   updateDateTime()
//   setInterval(updateDateTime, 60000)
// })

// Calculate Perkara G scores from all audits
const calculatePerkaraGScores = () => {
  if (auditData.value.length === 0) return

  // Initialize scores
  const scoresG = {
    pengurusanLatihan: 0,
    keselamatanAm: 0,
    kkp: 0,
    peluruBahanLetupan: 0,
    semboyan: 0
  }

  const scoresA = {
    pentadbiranSumberManusia: 0,
    dokumen: 0,
    kewangan: 0,
    kagat: 0,
    pendidikan: 0,
    ict: 0,
    kesihatan: 0
  }

  const scoresQ = {
    logistik: 0,
    aset: 0,
    jlj: 0,
    kebombaan: 0,
    sajian: 0
  }

  let auditCount = 0

  // Iterate through all audits and aggregate scores
  auditData.value.forEach((audit: any) => {
    if (audit.scores) {
      // Map audit form keys to Perkara categories
      Object.entries(audit.scores).forEach(([key, score]: [string, any]) => {
        // Perkara G mappings
        if (key.includes('latihan') || key.includes('Latihan')) {
          scoresG.pengurusanLatihan += score || 0
        } else if (key.includes('keselamatan_am') || key.includes('KeselamatanAm')) {
          scoresG.keselamatanAm += score || 0
        } else if (key.includes('kkp') || key.includes('KKP')) {
          scoresG.kkp += score || 0
        } else if (key.includes('peluru') || key.includes('Peluru') || key.includes('letupan')) {
          scoresG.peluruBahanLetupan += score || 0
        } else if (key.includes('semboyan') || key.includes('Semboyan')) {
          scoresG.semboyan += score || 0
        }
        // Perkara A mappings
        else if (key.includes('pentadbiran') || key.includes('Pentadbiran') || key.includes('manusia')) {
          scoresA.pentadbiranSumberManusia += score || 0
        } else if (key.includes('dokumen') || key.includes('Dokumen')) {
          scoresA.dokumen += score || 0
        } else if (key.includes('kewangan') || key.includes('Kewangan')) {
          scoresA.kewangan += score || 0
        } else if (key.includes('kagat') || key.includes('KAGAT')) {
          scoresA.kagat += score || 0
        } else if (key.includes('pendidikan') || key.includes('Pendidikan')) {
          scoresA.pendidikan += score || 0
        } else if (key.includes('ict') || key.includes('ICT')) {
          scoresA.ict += score || 0
        } else if (key.includes('kesihatan') || key.includes('Kesihatan')) {
          scoresA.kesihatan += score || 0
        }
        // Perkara Q mappings
        else if (key.includes('logistik') || key.includes('Logistik')) {
          scoresQ.logistik += score || 0
        } else if (key.includes('aset') || key.includes('Aset')) {
          scoresQ.aset += score || 0
        } else if (key.includes('jlj') || key.includes('JLJ')) {
          scoresQ.jlj += score || 0
        } else if (key.includes('kebombaan') || key.includes('Kebombaan')) {
          scoresQ.kebombaan += score || 0
        } else if (key.includes('sajian') || key.includes('Sajian')) {
          scoresQ.sajian += score || 0
        }
      })
      auditCount++
    }
  })

  // Calculate averages as percentages
  if (auditCount > 0) {
    const maxScore = 5
    perkaraGScores.value = {
      pengurusanLatihan: calculatePercentage(scoresG.pengurusanLatihan / auditCount, maxScore),
      keselamatanAm: calculatePercentage(scoresG.keselamatanAm / auditCount, maxScore),
      kkp: calculatePercentage(scoresG.kkp / auditCount, maxScore),
      peluruBahanLetupan: calculatePercentage(scoresG.peluruBahanLetupan / auditCount, maxScore),
      semboyan: calculatePercentage(scoresG.semboyan / auditCount, maxScore)
    }

    perkaraAScores.value = {
      pentadbiranSumberManusia: calculatePercentage(scoresA.pentadbiranSumberManusia / auditCount, maxScore),
      dokumen: calculatePercentage(scoresA.dokumen / auditCount, maxScore),
      kewangan: calculatePercentage(scoresA.kewangan / auditCount, maxScore),
      kagat: calculatePercentage(scoresA.kagat / auditCount, maxScore),
      pendidikan: calculatePercentage(scoresA.pendidikan / auditCount, maxScore),
      ict: calculatePercentage(scoresA.ict / auditCount, maxScore),
      kesihatan: calculatePercentage(scoresA.kesihatan / auditCount, maxScore)
    }

    perkaraQScores.value = {
      logistik: calculatePercentage(scoresQ.logistik / auditCount, maxScore),
      aset: calculatePercentage(scoresQ.aset / auditCount, maxScore),
      jlj: calculatePercentage(scoresQ.jlj / auditCount, maxScore),
      kebombaan: calculatePercentage(scoresQ.kebombaan / auditCount, maxScore),
      sajian: calculatePercentage(scoresQ.sajian / auditCount, maxScore)
    }
  }
}

// Helper functions for verification
const getVerificationStatus = (slug: PhaseSlug): string => {
  return verificationData.value[slug]?.status || 'Pending'
}

const getVerificationData = (slug: PhaseSlug) => {
  return verificationData.value[slug]
}

const getPhaseLabel = (slug: PhaseSlug): string => {
  const phaseMap: Record<PhaseSlug, string> = {
    self: 'Audit Kendiri',
    commander: 'Audit Ketua Unit',
    aptd: 'Audit APTD'
  }
  return phaseMap[slug] || slug
}

const openVerificationModal = (slug: PhaseSlug) => {
  selectedVerificationPhase.value = slug
  const data = verificationData.value[slug]
  verificationForm.value = {
    bossName: data?.bossName || '',
    verificationDate: data?.verificationDate || new Date().toISOString().split('T')[0],
    status: data?.status || 'Pending',
    comments: data?.comments || ''
  }
  showVerificationModal.value = true
}

const submitVerification = () => {
  const slug = selectedVerificationPhase.value
  verificationData.value[slug] = {
    bossName: verificationForm.value.bossName,
    verificationDate: verificationForm.value.verificationDate,
    status: verificationForm.value.status,
    comments: verificationForm.value.comments
  }

  // Save to localStorage
  try {
    localStorage.setItem('verificationData', JSON.stringify(verificationData.value))
  } catch (e) {
    console.error('Error saving verification data:', e)
  }

  showVerificationModal.value = false
  // Optional: Show toast notification
  console.log(`Pengesahan untuk ${getPhaseLabel(slug)} telah disimpan`)
}
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

main>* {
  animation: fadeInUp 0.6s ease-out backwards;
}

main>*:nth-child(1) {
  animation-delay: 0.1s;
}

main>*:nth-child(2) {
  animation-delay: 0.2s;
}

main>*:nth-child(3) {
  animation-delay: 0.3s;
}

main>*:nth-child(4) {
  animation-delay: 0.4s;
}

main>*:nth-child(5) {
  animation-delay: 0.5s;
}
</style>
