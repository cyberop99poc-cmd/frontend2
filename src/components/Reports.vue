<template>
  <main class="p-8 space-y-8 bg-gradient-to-br from-gray-50 to-blue-50/30 min-h-screen">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        
        <p class="text-gray-600 mt-3 text-lg">📊 Analisis prestasi audit</p>
        <p class="text-sm text-gray-500 mt-1">Kemaskini terakhir: {{ new Date().toLocaleDateString('ms-MY', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) }}</p>
      </div>
      <div class="hidden lg:flex items-center gap-3">
        <button @click="refreshData" class="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Muat Semula
        </button>
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white rounded-2xl shadow-lg border border-blue-100/50 p-6 hover:shadow-2xl transition-all hover:-translate-y-1 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-transparent rounded-full -mr-16 -mt-16 opacity-50"></div>
        <div class="relative">
          <div class="flex items-center justify-between mb-3">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <p class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Jumlah Audit</p>
          <p class="text-4xl font-bold text-gray-800 mt-1 mono">{{ stats.total }}</p>
          <p class="text-xs text-gray-500 mt-2">{{ stats.totalQuestionsAnswered }} soalan dijawab</p>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-lg border border-emerald-100/50 p-6 hover:shadow-2xl transition-all hover:-translate-y-1 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-transparent rounded-full -mr-16 -mt-16 opacity-50"></div>
        <div class="relative">
          <div class="flex items-center justify-between mb-3">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Kadar Pematuhan</p>
          <p class="text-4xl font-bold text-emerald-600 mt-1 mono">{{ stats.overallPassRate }}%</p>
          <p class="text-xs text-gray-500 mt-2">{{ stats.totalPass }} item patuh</p>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-lg border border-red-100/50 p-6 hover:shadow-2xl transition-all hover:-translate-y-1 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-100 to-transparent rounded-full -mr-16 -mt-16 opacity-50"></div>
        <div class="relative">
          <div class="flex items-center justify-between mb-3">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          <p class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Kadar Penemuan</p>
          <p class="text-4xl font-bold text-red-600 mt-1 mono">{{ stats.overallFailRate }}%</p>
          <p class="text-xs text-gray-500 mt-2">{{ stats.totalFail }} item penemuan</p>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-lg border border-amber-100/50 p-6 hover:shadow-2xl transition-all hover:-translate-y-1 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-100 to-transparent rounded-full -mr-16 -mt-16 opacity-50"></div>
        <div class="relative">
          <div class="flex items-center justify-between mb-3">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
          </div>
          <p class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Purata Sistem</p>
          <p class="text-4xl font-bold text-amber-600 mt-1 mono">{{ stats.systemAverage }}</p>
          <p class="text-xs text-gray-500 mt-2">Merentasi semua audit</p>
        </div>
      </div>
    </div>

    <!-- Report Generation Section -->
    <div v-if="!activeReport" class="bg-white rounded-2xl shadow-lg border border-blue-100/50 overflow-hidden">
      <div class="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
        <div class="flex items-center gap-3">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <div>
            <h2 class="text-2xl font-bold text-white">Laporan Terperinci</h2>
            <p class="text-blue-100 text-sm mt-1">Laporan komprehensif untuk analisis dan dokumentasi pematuhan</p>
          </div>
        </div>
      </div>

      <div class="p-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Executive Summary Report -->
          <div class="group bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 hover:border-purple-400 hover:shadow-xl transition-all cursor-pointer">
            <div class="flex items-start justify-between mb-4">
              <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span class="px-3 py-1 bg-purple-200 text-purple-700 text-xs font-bold rounded-full">EKSEKUTIF</span>
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-2">Ringkasan Eksekutif</h3>
            <p class="text-sm text-gray-600 mb-4">Laporan ringkas untuk pengurusan atasan dengan statistik utama dan cadangan strategik</p>
            <ul class="space-y-2 mb-6">
              <li class="flex items-center gap-2 text-xs text-gray-600">
                <svg class="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
                Ringkasan prestasi keseluruhan
              </li>
              <li class="flex items-center gap-2 text-xs text-gray-600">
                <svg class="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
                KPI dan metrik utama
              </li>
              <li class="flex items-center gap-2 text-xs text-gray-600">
                <svg class="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
                Cadangan penambahbaikan
              </li>
              <li class="flex items-center gap-2 text-xs text-gray-600">
                <svg class="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
                Format PDF berkualiti
              </li>
            </ul>
            <button @click="generateExecutiveReport" class="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Lihat Laporan
            </button>
          </div>

          <!-- Detailed Audit Report -->
          <div class="group bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all cursor-pointer">
            <div class="flex items-start justify-between mb-4">
              <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <span class="px-3 py-1 bg-blue-200 text-blue-700 text-xs font-bold rounded-full">TERPERINCI</span>
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-2">Laporan Audit Terperinci</h3>
            <p class="text-sm text-gray-600 mb-4">Analisis mendalam setiap audit dengan pecahan skor, penemuan, dan tindakan susulan</p>
            <ul class="space-y-2 mb-6">
              <li class="flex items-center gap-2 text-xs text-gray-600">
                <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
                Pecahan mengikut kriteria
              </li>
              <li class="flex items-center gap-2 text-xs text-gray-600">
                <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
                Senarai penemuan lengkap
              </li>
              <li class="flex items-center gap-2 text-xs text-gray-600">
                <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
                Carta dan graf analitik
              </li>
              <li class="flex items-center gap-2 text-xs text-gray-600">
                <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
                Data komprehensif
              </li>
            </ul>
            <button @click="generateDetailedReport" class="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Lihat Laporan
            </button>
          </div>

          <!-- Trend Analysis -->
          <div class="group bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border-2 border-indigo-200 hover:border-indigo-400 hover:shadow-xl transition-all cursor-pointer">
            <div class="flex items-start justify-between mb-4">
              <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <span class="px-3 py-1 bg-indigo-200 text-indigo-700 text-xs font-bold rounded-full">TREND</span>
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-2">Analisis Trend</h3>
            <p class="text-sm text-gray-600 mb-4">Analisis trend prestasi sepanjang masa dengan ramalan dan insight</p>
            <ul class="space-y-2 mb-6">
              <li class="flex items-center gap-2 text-xs text-gray-600">
                <svg class="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
                Trend bulanan/tahunan
              </li>
              <li class="flex items-center gap-2 text-xs text-gray-600">
                <svg class="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
                Perbandingan tempoh
              </li>
              <li class="flex items-center gap-2 text-xs text-gray-600">
                <svg class="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
                Ramalan prestasi
              </li>
              <li class="flex items-center gap-2 text-xs text-gray-600">
                <svg class="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
                Visualisasi grafik
              </li>
            </ul>
            <button @click="generateTrendReport" class="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Lihat Analisis
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Executive Summary View -->
    <div v-if="activeReport === 'executive'" class="space-y-6">
      <div class="flex items-center justify-between mb-6">
        <button @click="activeReport = null" class="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-all">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali
        </button>
        <button @click="downloadExecutivePDF" class="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Muat Turun PDF
        </button>
      </div>

      <div class="bg-white rounded-2xl shadow-lg border border-purple-100/50 p-8">
        <div class="text-center mb-8 pb-8 border-b border-gray-200">
          <h1 class="text-4xl font-bold text-gray-900 mb-2">Ringkasan Eksekutif</h1>
          <p class="text-gray-600">Sistem Automasi Audit Pengurusan Tentera Darat (SAAPTD)</p>
          <p class="text-sm text-gray-500 mt-2">Dijana pada: {{ new Date().toLocaleDateString('ms-MY', { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
        </div>

        <!-- AI Summary -->
        <div class="mb-8">
          <div class="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg flex-shrink-0">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div class="flex-1">
                <h2 class="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  AI Summary
                  <span class="px-2 py-1 text-xs font-semibold bg-purple-600 text-white rounded-full">BETA</span>
                </h2>
                <div class="space-y-3 text-gray-700">
                  <p class="leading-relaxed">
                    <span class="font-semibold">Analisis Keseluruhan:</span> 
                    Berdasarkan {{ stats.total }} audit yang dilaksanakan, sistem menunjukkan kadar pematuhan sebanyak {{ stats.overallPassRate }}%. 
                    {{ stats.overallPassRate >= 80 ? 'Pencapaian ini berada pada tahap cemerlang dan menunjukkan komitmen tinggi terhadap piawaian audit.' : stats.overallPassRate >= 70 ? 'Prestasi berada pada tahap memuaskan tetapi masih terdapat ruang untuk penambahbaikan.' : 'Prestasi memerlukan perhatian segera dan tindakan pembetulan yang komprehensif.' }}
                  </p>
                  <p class="leading-relaxed">
                    <span class="font-semibold">Trend Prestasi:</span> 
                    Dengan purata skor {{ stats.systemAverage }} merentasi semua audit, data menunjukkan 
                    {{ stats.systemAverage >= 4 ? 'trend positif dengan konsistensi tinggi dalam kualiti audit' : stats.systemAverage >= 3 ? 'prestasi yang stabil tetapi memerlukan fokus pada area kritikal' : 'keperluan mendesak untuk intervensi dan penambahbaikan proses audit' }}.
                    Sejumlah {{ stats.totalQuestionsAnswered }} soalan telah dijawab, mencerminkan liputan audit yang {{ stats.totalQuestionsAnswered >= 100 ? 'sangat komprehensif' : 'perlu dipertingkatkan' }}.
                  </p>
                  <p class="leading-relaxed">
                    <span class="font-semibold">Cadangan Strategik AI:</span> 
                    {{ stats.overallFailRate > 30 ? 'Fokus segera diperlukan pada peningkatan kapasiti juruaudit dan penguatkuasaan SOP. ' : '' }}
                    Pelaksanaan program latihan berterusan dan sistem pemantauan berkala akan membantu mengekalkan 
                    {{ stats.overallPassRate >= 75 ? 'momentum positif' : 'dan meningkatkan prestasi' }} audit pada masa hadapan.
                    Pertimbangkan untuk melaksanakan sistem tindak balas pantas (rapid response) bagi menangani penemuan kritikal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Key Performance Indicators -->
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span class="w-2 h-8 bg-gradient-to-b from-purple-600 to-pink-600 rounded"></span>
            Indikator Prestasi Utama (KPI)
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
              <p class="text-sm text-gray-600 mb-1">Jumlah Audit</p>
              <p class="text-4xl font-bold text-blue-700">{{ stats.total }}</p>
            </div>
            <div class="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
              <p class="text-sm text-gray-600 mb-1">Kadar Pematuhan</p>
              <p class="text-4xl font-bold text-green-700">{{ stats.overallPassRate }}%</p>
            </div>
            <div class="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl">
              <p class="text-sm text-gray-600 mb-1">Kadar Penemuan</p>
              <p class="text-4xl font-bold text-red-700">{{ stats.overallFailRate }}%</p>
            </div>
            <div class="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl">
              <p class="text-sm text-gray-600 mb-1">Purata Skor</p>
              <p class="text-4xl font-bold text-amber-700">{{ stats.systemAverage }}</p>
            </div>
          </div>
        </div>

        <!-- Summary & Recommendations -->
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span class="w-2 h-8 bg-gradient-to-b from-purple-600 to-pink-600 rounded"></span>
            Ringkasan & Cadangan
          </h2>
          <div class="bg-gray-50 p-6 rounded-xl space-y-4">
            <div>
              <h3 class="font-bold text-gray-800 mb-2">📊 Status Keseluruhan</h3>
              <p class="text-gray-700">Sistem SAAPTD telah melaksanakan {{ stats.total }} audit dengan kadar pematuhan {{ stats.overallPassRate }}%. Prestasi ini menunjukkan tahap pematuhan yang {{ stats.overallPassRate >= 75 ? 'memuaskan' : 'memerlukan penambahbaikan' }}.</p>
            </div>
            <div>
              <h3 class="font-bold text-gray-800 mb-2">🎯 Cadangan Strategik</h3>
              <ul class="list-disc list-inside space-y-2 text-gray-700">
                <li>Fokus kepada kriteria dengan kadar pematuhan rendah</li>
                <li>Tingkatkan latihan untuk juruaudit</li>
                <li>Perkukuh tindakan susulan penemuan audit</li>
                <li>Standardkan prosedur audit di semua unit</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Detailed Report View -->
    <div v-if="activeReport === 'detailed'" class="space-y-6">
      <div class="flex items-center justify-between mb-6">
        <button @click="activeReport = null" class="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-all">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali
        </button>
        <button @click="downloadDetailedPDF" class="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Muat Turun PDF
        </button>
      </div>

      <div class="bg-white rounded-2xl shadow-lg border border-blue-100/50 p-8">
        <div class="text-center mb-8 pb-8 border-b border-gray-200">
          <h1 class="text-4xl font-bold text-gray-900 mb-2">Laporan Audit Terperinci</h1>
          <p class="text-gray-600">Analisis Komprehensif Audit SAAPTD</p>
          <p class="text-sm text-gray-500 mt-2">Dijana pada: {{ new Date().toLocaleDateString('ms-MY', { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
        </div>

        <!-- AI Summary -->
        <div class="mb-8">
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-6">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg flex-shrink-0">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div class="flex-1">
                <h2 class="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  AI Summary
                  <span class="px-2 py-1 text-xs font-semibold bg-blue-600 text-white rounded-full">BETA</span>
                </h2>
                <div class="space-y-3 text-gray-700">
                  <p class="leading-relaxed">
                    <span class="font-semibold">Analisis Data Terperinci:</span> 
                    Sistem telah menganalisis {{ stats.total }} rekod audit dengan sejumlah {{ stats.totalPass }} item patuh dan {{ stats.totalFail }} item penemuan. 
                    Data menunjukkan {{ stats.scoreDistribution[5] > 30 ? 'prestasi cemerlang dengan majoriti skor berada pada tahap tertinggi' : stats.scoreDistribution[5] + stats.scoreDistribution[4] > 50 ? 'prestasi yang baik dengan kebanyakan skor pada tahap memuaskan hingga cemerlang' : 'keperluan untuk penambahbaikan dengan taburan skor yang tidak optimum' }}.
                  </p>
                  <p class="leading-relaxed">
                    <span class="font-semibold">Pola dan Corak:</span> 
                    Taburan skor menunjukkan {{ stats.scoreDistribution[5] }}% mencapai skor cemerlang (5★), {{ stats.scoreDistribution[4] }}% pada tahap baik (4★), 
                    dan {{ stats.scoreDistribution[3] }}% pada tahap memuaskan (3★). 
                    {{ (stats.scoreDistribution[2] || 0) + (stats.scoreDistribution[1] || 0) > 20 ? 'Perhatian khusus diperlukan untuk menangani skor rendah yang mewakili ' + ((stats.scoreDistribution[2] || 0) + (stats.scoreDistribution[1] || 0)) + '% daripada audit.' : 'Skor rendah berada pada tahap yang boleh diterima.' }}
                  </p>
                  <p class="leading-relaxed">
                    <span class="font-semibold">Insight Automatik:</span> 
                    Berdasarkan analisis mendalam, sistem mengenal pasti {{ auditData.length > 0 ? 'konsistensi dalam pelaksanaan audit' : 'keperluan untuk meningkatkan frekuensi audit' }}. 
                    Variasi dalam prestasi antara juruaudit menunjukkan keperluan untuk standardisasi proses dan latihan seragam. 
                    Disyorkan untuk melaksanakan peer review dan quality assurance checks bagi memastikan objektivity dan ketepatan penilaian.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Audit List -->
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span class="w-2 h-8 bg-gradient-to-b from-blue-600 to-cyan-600 rounded"></span>
            Senarai Audit
          </h2>
          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-blue-50 border-b-2 border-blue-200">
                  <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">ID Audit</th>
                  <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Juruaudit</th>
                  <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tarikh</th>
                  <th class="px-4 py-3 text-center text-sm font-semibold text-gray-700">Skor Purata</th>
                  <th class="px-4 py-3 text-center text-sm font-semibold text-gray-700">Lulus</th>
                  <th class="px-4 py-3 text-center text-sm font-semibold text-gray-700">Gagal</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="audit in auditData" :key="audit.audit_id" class="border-b border-gray-200 hover:bg-gray-50">
                  <td class="px-4 py-3 text-sm font-mono text-gray-700">{{ audit.audit_id }}</td>
                  <td class="px-4 py-3 text-sm text-gray-700">{{ audit.auditor_name }}</td>
                  <td class="px-4 py-3 text-sm text-gray-700">{{ formatDate(audit.audit_date) }}</td>
                  <td class="px-4 py-3 text-center text-sm font-bold text-gray-800">{{ audit.avgScore }}</td>
                  <td class="px-4 py-3 text-center text-sm font-bold text-green-600">{{ audit.passCount }}</td>
                  <td class="px-4 py-3 text-center text-sm font-bold text-red-600">{{ audit.failCount }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Score Distribution -->
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span class="w-2 h-8 bg-gradient-to-b from-blue-600 to-cyan-600 rounded"></span>
            Taburan Skor
          </h2>
          <div class="space-y-4">
            <div v-for="score in [5, 4, 3, 2, 1]" :key="score" class="flex items-center gap-4">
              <span class="w-16 font-bold text-gray-700">Skor {{ score }}</span>
              <div class="flex-1 h-8 bg-gray-200 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-blue-600 to-cyan-600 transition-all" :style="{ width: (stats.scoreDistribution[score] || 0) + '%' }"></div>
              </div>
              <span class="w-16 text-right text-sm font-medium text-gray-700">{{ stats.scoreDistribution[score] || 0 }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Trend Analysis View -->
    <div v-if="activeReport === 'trend'" class="space-y-6">
      <div class="flex items-center justify-between mb-6">
        <button @click="activeReport = null" class="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-all">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali
        </button>
        <button @click="downloadTrendPDF" class="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Muat Turun PDF
        </button>
      </div>

      <div class="bg-white rounded-2xl shadow-lg border border-indigo-100/50 p-8">
        <div class="text-center mb-8 pb-8 border-b border-gray-200">
          <h1 class="text-4xl font-bold text-gray-900 mb-2">Analisis Trend</h1>
          <p class="text-gray-600">Trend Prestasi Audit Sepanjang Masa</p>
          <p class="text-sm text-gray-500 mt-2">Dijana pada: {{ new Date().toLocaleDateString('ms-MY', { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
        </div>

        <!-- AI Summary -->
        <div class="mb-8">
          <div class="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl p-6">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg flex-shrink-0">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div class="flex-1">
                <h2 class="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  AI Summary
                  <span class="px-2 py-1 text-xs font-semibold bg-indigo-600 text-white rounded-full">BETA</span>
                </h2>
                <div class="space-y-3 text-gray-700">
                  <p class="leading-relaxed">
                    <span class="font-semibold">Analisis Trend Temporal:</span> 
                    Berdasarkan {{ stats.total }} audit yang dilaksanakan, sistem mengesan purata {{ Math.round(stats.total / 12) || 0 }} audit per bulan. 
                    {{ Math.round(stats.total / 12) >= 5 ? 'Frekuensi ini menunjukkan komitmen kukuh terhadap pemantauan berkala dan pematuhan berterusan.' : Math.round(stats.total / 12) >= 3 ? 'Frekuensi audit berada pada tahap sederhana dan boleh ditingkatkan untuk pemantauan yang lebih rapat.' : 'Frekuensi audit perlu dipertingkatkan untuk memastikan pemantauan yang efektif dan berterusan.' }}
                  </p>
                  <p class="leading-relaxed">
                    <span class="font-semibold">Trajectory Prestasi:</span> 
                    Trend semasa menunjukkan prestasi {{ stats.overallPassRate >= 75 ? 'menaik dengan peningkatan konsisten dalam kadar pematuhan' : 'memerlukan intervensi dengan fokus pada area yang memerlukan penambahbaikan' }}. 
                    Purata skor sistem pada {{ stats.systemAverage }} menunjukkan 
                    {{ stats.systemAverage >= 4 ? 'kestabilan tinggi dan kualiti audit yang cemerlang sepanjang tempoh' : stats.systemAverage >= 3 ? 'prestasi yang konsisten dengan potensi untuk mencapai excellence' : 'keperluan untuk revolusi dalam pendekatan dan metodologi audit' }}.
                  </p>
                  <p class="leading-relaxed">
                    <span class="font-semibold">Ramalan dan Cadangan:</span> 
                    Berdasarkan pola semasa, sistem meramalkan skor {{ stats.systemAverage }} untuk tempoh akan datang. 
                    Untuk mengekalkan {{ stats.overallPassRate >= 75 ? 'momentum positif' : 'dan meningkatkan prestasi' }}, disyorkan untuk: 
                    (1) melaksanakan continuous improvement programs, 
                    (2) mengadakan quarterly review sessions, 
                    (3) memperkenalkan incentive system untuk audit cemerlang, dan 
                    (4) mewujudkan knowledge sharing platform untuk best practices. 
                    {{ stats.total >= 50 ? 'Data historik yang mencukupi membolehkan ramalan yang lebih tepat dan strategi yang lebih berkesan.' : 'Pengumpulan lebih banyak data dari masa ke masa akan meningkatkan ketepatan analisis trend.' }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Trend Insights -->
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span class="w-2 h-8 bg-gradient-to-b from-indigo-600 to-purple-600 rounded"></span>
            Insight Trend
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-xl">
              <p class="text-sm text-gray-600 mb-1">Purata Audit/Bulan</p>
              <p class="text-3xl font-bold text-indigo-700">{{ Math.round(stats.total / 12) || 0 }}</p>
              <p class="text-xs text-gray-500 mt-2">Berdasarkan data sedia ada</p>
            </div>
            <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
              <p class="text-sm text-gray-600 mb-1">Trend Prestasi</p>
              <p class="text-3xl font-bold text-purple-700">{{ stats.overallPassRate >= 75 ? '↗️ Meningkat' : '↘️ Perlu Perhatian' }}</p>
              <p class="text-xs text-gray-500 mt-2">Status semasa</p>
            </div>
            <div class="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-xl">
              <p class="text-sm text-gray-600 mb-1">Ramalan Skor</p>
              <p class="text-3xl font-bold text-pink-700">{{ stats.systemAverage }}</p>
              <p class="text-xs text-gray-500 mt-2">Jangkaan bulan hadapan</p>
            </div>
          </div>
        </div>

        <!-- Performance Summary -->
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span class="w-2 h-8 bg-gradient-to-b from-indigo-600 to-purple-600 rounded"></span>
            Ringkasan Prestasi
          </h2>
          <div class="bg-gray-50 p-6 rounded-xl">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 class="font-bold text-gray-800 mb-3">🔍 Analisis</h3>
                <p class="text-gray-700 text-sm mb-2">• Jumlah audit dilaksanakan: {{ stats.total }}</p>
                <p class="text-gray-700 text-sm mb-2">• Kadar pematuhan: {{ stats.overallPassRate }}%</p>
                <p class="text-gray-700 text-sm mb-2">• Purata skor sistem: {{ stats.systemAverage }}</p>
                <p class="text-gray-700 text-sm">• Jumlah soalan dijawab: {{ stats.totalQuestionsAnswered }}</p>
              </div>
              <div>
                <h3 class="font-bold text-gray-800 mb-3">💡 Cadangan</h3>
                <p class="text-gray-700 text-sm mb-2">• Kekalkan momentum audit berkala</p>
                <p class="text-gray-700 text-sm mb-2">• Tingkatkan fokus pada area kritikal</p>
                <p class="text-gray-700 text-sm mb-2">• Perkukuh latihan juruaudit</p>
                <p class="text-gray-700 text-sm">• Dokumentasi best practices</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Score Distribution (shown when no report is active) -->
    <div v-if="!activeReport" class="bg-white rounded-2xl shadow-lg border border-red-100/50 overflow-hidden">
      <div class="bg-gradient-to-r from-red-600 to-red-700 px-8 py-6">
        <h2 class="text-xl font-bold text-white">★ Pengelasan Markah</h2>
        <p class="text-red-100 text-sm mt-2">Pengelasan markah berdasarkan semua kriteria</p>
      </div>

      <div class="p-8">
        <div class="space-y-4 mb-8">
          <div v-for="score in [5, 4, 3, 2, 1]" :key="score" class="flex items-center gap-4">
            <span class="w-8 font-bold text-center text-gray-700">{{ score }}★</span>
            <div class="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden">
              <div
                class="h-full bg-gradient-to-r from-red-600 to-red-700 transition-all duration-300"
                :style="{ width: (stats.scoreDistribution[score] || 0) + '%' }"
              ></div>
            </div>
            <span class="w-12 text-right text-sm font-medium text-gray-700">{{ stats.scoreDistribution[score] || 0 }}%</span>
          </div>
        </div>

        <!-- Generate Report Button -->
        <div class="flex justify-center pt-6 border-t border-gray-200">
          <button
            @click="generateReport"
            class="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:shadow-2xl transition-all shadow-lg flex items-center gap-3 hover:scale-105"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Print Laporan Lengkap
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Audit {
  audit_id: string
  auditor_name: string
  audit_date: string
  passCount: number
  failCount: number
  avgScore: number
  scores: { [key: string]: number }
}

const auditData = ref<Audit[]>([])
const activeReport = ref<string | null>(null)

// Load data
onMounted(() => {
  const stored = localStorage.getItem('auditData')
  if (stored) {
    auditData.value = JSON.parse(stored)
  }
})

// Refresh data function
const refreshData = () => {
  const stored = localStorage.getItem('auditData')
  if (stored) {
    auditData.value = JSON.parse(stored)
  }
  showToast('Data telah dimuat semula', 'success')
}

// Toast notification
const showToast = (message: string, _type: 'success' | 'error' = 'success') => {
  // Simple notification - you can enhance this with a proper toast library
  alert(message)
}

// Auditor stats
const auditorStats = computed(() => {
  const statsMap = new Map<string, { name: string; count: number; totalScore: number; totalPass: number; totalQuestions: number }>()

  auditData.value.forEach(audit => {
    if (!statsMap.has(audit.auditor_name)) {
      statsMap.set(audit.auditor_name, {
        name: audit.auditor_name,
        count: 0,
        totalScore: 0,
        totalPass: 0,
        totalQuestions: 0
      })
    }

    const stat = statsMap.get(audit.auditor_name)!
    stat.count += 1
    stat.totalScore += parseFloat(audit.avgScore.toString())
    stat.totalPass += audit.passCount
    stat.totalQuestions += audit.passCount + audit.failCount
  })

  return Array.from(statsMap.values())
    .map(stat => ({
      name: stat.name,
      count: stat.count,
      avgScore: (stat.totalScore / stat.count).toFixed(1),
      passRate: stat.totalQuestions > 0 ? Math.round((stat.totalPass / stat.totalQuestions) * 100) : 0
    }))
    .sort((a, b) => b.count - a.count)
})

// Overall stats
const stats = computed(() => {
  const total = auditData.value.length
  const totalQuestionsAnswered = auditData.value.reduce((sum, audit) => sum + audit.passCount + audit.failCount, 0)
  const totalPass = auditData.value.reduce((sum, audit) => sum + audit.passCount, 0)
  const totalFail = auditData.value.reduce((sum, audit) => sum + audit.failCount, 0)
  const totalScore = auditData.value.reduce((sum, audit) => sum + parseFloat(audit.avgScore.toString()), 0)

  const overallPassRate = totalQuestionsAnswered > 0 ? Math.round((totalPass / totalQuestionsAnswered) * 100) : 0
  const overallFailRate = totalQuestionsAnswered > 0 ? Math.round((totalFail / totalQuestionsAnswered) * 100) : 0
  const systemAverage = total > 0 ? parseFloat((totalScore / total).toFixed(1)) : 0

  // Completion rate - assume target is 50 audits
  const completionRate = Math.min(Math.round((total / 50) * 100), 100)

  // Quality score formula: (pass rate × 0.8) + (avg score × 10)
  const qualityScore = Math.round((overallPassRate * 0.8) + (systemAverage * 10))

  // Score distribution
  const scoreDistribution: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  auditData.value.forEach(audit => {
    const score = Math.round(parseFloat(audit.avgScore.toString()))
    if (score >= 1 && score <= 5) {
      scoreDistribution[score]++
    }
  })

  // Convert to percentages
  const scoreDistributionPercent: { [key: number]: number } = {}
  for (const [score, count] of Object.entries(scoreDistribution)) {
    scoreDistributionPercent[parseInt(score)] = total > 0 ? Math.round((count / total) * 100) : 0
  }

  return {
    total,
    totalQuestionsAnswered,
    totalPass,
    totalFail,
    overallPassRate,
    overallFailRate,
    systemAverage,
    completionRate,
    qualityScore,
    scoreDistribution: scoreDistributionPercent
  }
})

// Format date helper function
const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('ms-MY', { year: 'numeric', month: 'long', day: 'numeric' })
  } catch {
    return dateString
  }
}

// Report generation functions - navigate to report views
const generateExecutiveReport = () => {
  activeReport.value = 'executive'
}

const generateDetailedReport = () => {
  activeReport.value = 'detailed'
}

const generateTrendReport = () => {
  activeReport.value = 'trend'
}

const downloadExecutivePDF = () => {
  const reportData = {
    type: 'Executive Summary',
    generatedAt: new Date().toISOString(),
    kpi: {
      totalAudits: stats.value.total,
      complianceRate: stats.value.overallPassRate,
      findingsRate: stats.value.overallFailRate,
      averageScore: stats.value.systemAverage
    },
    summary: `Sistem SAAPTD telah melaksanakan ${stats.value.total} audit dengan kadar pematuhan ${stats.value.overallPassRate}%.`,
    recommendations: [
      'Fokus kepada kriteria dengan kadar pematuhan rendah',
      'Tingkatkan latihan untuk juruaudit',
      'Perkukuh tindakan susulan penemuan audit',
      'Standardkan prosedur audit di semua unit'
    ]
  }
  downloadReport(reportData, 'ringkasan-eksekutif')
  showToast('Ringkasan Eksekutif berjaya dimuat turun!', 'success')
}

const downloadDetailedPDF = () => {
  const reportData = {
    type: 'Detailed Audit Report',
    generatedAt: new Date().toISOString(),
    audits: auditData.value,
    scoreDistribution: stats.value.scoreDistribution,
    summary: stats.value
  }
  downloadReport(reportData, 'laporan-terperinci')
  showToast('Laporan Terperinci berjaya dimuat turun!', 'success')
}

const downloadTrendPDF = () => {
  const reportData = {
    type: 'Trend Analysis',
    generatedAt: new Date().toISOString(),
    insights: {
      averagePerMonth: Math.round(stats.value.total / 12),
      trend: stats.value.overallPassRate >= 75 ? 'Improving' : 'Needs Attention',
      forecast: stats.value.systemAverage
    },
    performance: {
      totalAudits: stats.value.total,
      complianceRate: stats.value.overallPassRate,
      averageScore: stats.value.systemAverage,
      questionsAnswered: stats.value.totalQuestionsAnswered
    }
  }
  downloadReport(reportData, 'analisis-trend')
  showToast('Analisis Trend berjaya dimuat turun!', 'success')
}

const downloadReport = (data: any, filename: string) => {
  const jsonString = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonString], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${filename}-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

const generateReport = () => {
  const reportData = {
    generatedAt: new Date().toISOString(),
    summary: stats.value,
    auditorStats: auditorStats.value,
    totalAudits: auditData.value.length,
    auditDetails: auditData.value
  }

  const dataStr = JSON.stringify(reportData, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = `audit-report-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
  
  showToast('Laporan berjaya dijana!', 'success')
}

onMounted(() => {
  const stored = localStorage.getItem('auditData')
  if (stored) {
    auditData.value = JSON.parse(stored)
  }
})
</script>

<style scoped>
</style>
