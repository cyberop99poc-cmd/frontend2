<template>
  <main class="p-8 space-y-8">
    <!-- Page Header -->
    <div>
      <h1 class="text-4xl font-bold text-gray-800">Tetapan</h1>
      <p class="text-gray-600 mt-2">Urus akaun dan pilihan sistem anda</p>
    </div>

    <!-- Account Settings -->
    <div class="bg-white rounded-2xl shadow-lg border border-red-100/50 overflow-hidden">
      <div class="bg-gradient-to-r from-red-600 to-red-700 px-8 py-6">
        <h2 class="text-xl font-bold text-white">👤 Tetapan Akaun</h2>
        <p class="text-red-100 text-sm mt-2">Urus maklumat akaun anda</p>
      </div>

      <div class="p-8 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-3">Nama Pengguna Semasa</label>
            <input type="text" :value="currentUser" readonly class="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-600 text-sm">
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-3">Alamat E-mel</label>
            <input type="email" placeholder="pengguna@contoh.com" class="w-full px-4 py-3 border border-red-200/50 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-sm">
          </div>
        </div>

        <div class="border-t border-red-100 pt-6">
          <h3 class="font-semibold text-gray-800 mb-4">Tukar Kata Laluan</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3">Kata Laluan Semasa</label>
              <input type="password" placeholder="Masukkan kata laluan semasa" class="w-full px-4 py-3 border border-red-200/50 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-sm">
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3">Kata Laluan Baharu</label>
              <input type="password" placeholder="Masukkan kata laluan baharu" class="w-full px-4 py-3 border border-red-200/50 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-sm">
            </div>
          </div>

          <div class="mt-6">
            <label class="block text-sm font-semibold text-gray-700 mb-3">Sahkan Kata Laluan Baharu</label>
            <input type="password" placeholder="Sahkan kata laluan baharu" class="w-full px-4 py-3 border border-red-200/50 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-sm">
          </div>
        </div>

        <div class="flex gap-4 pt-6">
          <button class="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl hover:shadow-lg transition-all shadow-md">
            Simpan Perubahan
          </button>
          <button class="px-6 py-3 bg-white border-2 border-red-200 text-red-600 font-semibold rounded-xl hover:bg-red-50 transition-all">
            Batal
          </button>
        </div>
      </div>
    </div>

    <!-- System Preferences -->
    <div class="bg-white rounded-2xl shadow-lg border border-red-100/50 overflow-hidden">
      <div class="bg-gradient-to-r from-red-600 to-red-700 px-8 py-6">
        <h2 class="text-xl font-bold text-white">⚙️ Pilihan Sistem</h2>
        <p class="text-red-100 text-sm mt-2">Konfigurasi tingkah laku sistem dan notifikasi</p>
      </div>

      <div class="p-8 space-y-6">
        <div class="flex items-center justify-between p-4 bg-red-50/50 rounded-xl border border-red-100">
          <div>
            <p class="font-semibold text-gray-800">Notifikasi E-mel</p>
            <p class="text-sm text-gray-600 mt-1">Terima notifikasi e-mel untuk penghantaran audit</p>
          </div>
          <label class="flex items-center cursor-pointer">
            <input type="checkbox" class="w-5 h-5 text-red-600" checked>
            <span class="ml-2 text-sm font-medium text-gray-700">Aktif</span>
          </label>
        </div>

        <div class="flex items-center justify-between p-4 bg-red-50/50 rounded-xl border border-red-100">
          <div>
            <p class="font-semibold text-gray-800">Simpan Draf Automatik</p>
            <p class="text-sm text-gray-600 mt-1">Simpan kemajuan borang audit secara automatik</p>
          </div>
          <label class="flex items-center cursor-pointer">
            <input type="checkbox" class="w-5 h-5 text-red-600" checked>
            <span class="ml-2 text-sm font-medium text-gray-700">Aktif</span>
          </label>
        </div>

        <div class="flex items-center justify-between p-4 bg-red-50/50 rounded-xl border border-red-100">
          <div>
            <p class="font-semibold text-gray-800">Mod Gelap</p>
            <p class="text-sm text-gray-600 mt-1">Aktifkan antara muka tema gelap</p>
          </div>
          <label class="flex items-center cursor-pointer">
            <input type="checkbox" class="w-5 h-5 text-red-600">
            <span class="ml-2 text-sm font-medium text-gray-700">Tidak Aktif</span>
          </label>
        </div>

        <div class="border-t border-red-100 pt-6">
          <label class="block text-sm font-semibold text-gray-700 mb-3">Tarikh Audit Lalai</label>
          <select class="w-full px-4 py-3 border border-red-200/50 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-sm">
            <option>Hari Ini (Lalai)</option>
            <option>Tarikh Tersuai</option>
            <option>Tarikh Audit Terakhir</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Data Management -->
    <div class="bg-white rounded-2xl shadow-lg border border-red-100/50 overflow-hidden">
      <div class="bg-gradient-to-r from-red-600 to-red-700 px-8 py-6">
        <h2 class="text-xl font-bold text-white">💾 Pengurusan Data</h2>
        <p class="text-red-100 text-sm mt-2">Sandarkan dan urus data audit anda</p>
      </div>

      <div class="p-8 space-y-4">
        <div class="p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <p class="text-sm text-blue-800">
            <span class="font-semibold">Total Audits:</span> {{ totalAudits }} records
            <span class="font-semibold ml-4">Last Backup:</span> {{ lastBackup }}
          </p>
        </div>

        <div class="flex gap-4">
          <button
            @click="backupData"
            class="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:shadow-lg transition-all shadow-md flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Backup Data
          </button>
          <button
            @click="clearData"
            class="px-6 py-3 bg-white border-2 border-red-200 text-red-600 font-semibold rounded-xl hover:bg-red-50 transition-all flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear All Data
          </button>
        </div>
      </div>
    </div>

    <!-- System Info -->
    <div class="bg-white rounded-2xl shadow-lg border border-red-100/50 overflow-hidden">
      <div class="bg-gradient-to-r from-red-600 to-red-700 px-8 py-6">
        <h2 class="text-xl font-bold text-white">ℹ️ System Information</h2>
      </div>

      <div class="p-8 space-y-3">
        <div class="flex items-center justify-between py-2 border-b border-red-100">
          <span class="text-gray-700">Application Version</span>
          <span class="font-semibold text-gray-800">1.0.0</span>
        </div>
        <div class="flex items-center justify-between py-2 border-b border-red-100">
          <span class="text-gray-700">Build Date</span>
          <span class="font-semibold text-gray-800">{{ buildDate }}</span>
        </div>
        <div class="flex items-center justify-between py-2">
          <span class="text-gray-700">Last Updated</span>
          <span class="font-semibold text-gray-800">January 17, 2026</span>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const currentUser = ref('')
const totalAudits = ref(0)
const lastBackup = ref('Never')
const buildDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

const backupData = () => {
  const auditData = localStorage.getItem('auditData')
  if (!auditData) {
    alert('No data to backup')
    return
  }

  const backup = {
    timestamp: new Date().toISOString(),
    data: JSON.parse(auditData)
  }

  const dataStr = JSON.stringify(backup, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = `audit-backup-${new Date().toISOString().split('T')[0]}.json`
  link.click()
  URL.revokeObjectURL(url)

  lastBackup.value = new Date().toLocaleDateString()
}

const clearData = () => {
  if (confirm('Are you sure you want to delete all audit data? This action cannot be undone.')) {
    localStorage.removeItem('auditData')
    totalAudits.value = 0
    alert('All data has been cleared')
  }
}

onMounted(() => {
  const user = localStorage.getItem('currentUser')
  currentUser.value = user || 'User'

  const auditData = localStorage.getItem('auditData')
  if (auditData) {
    const audits = JSON.parse(auditData)
    totalAudits.value = audits.length
  }

  const backup = localStorage.getItem('lastBackup')
  if (backup) {
    lastBackup.value = backup
  }
})
</script>

<style scoped>
</style>
