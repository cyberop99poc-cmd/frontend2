<template>
  <aside
    class="fixed left-0 top-20 bottom-0 w-64 bg-gradient-to-b from-red-100/80 to-red-50/80 backdrop-blur-xl border-r border-red-200/50 overflow-y-auto shadow-xl">

    <!-- User Info -->
    <div class="px-6 py-4 bg-white/50 border-b border-red-100 m-4 rounded-xl">
      <p class="text-xs text-gray-500 uppercase tracking-wide">Log masuk sebagai</p>
      <p class="font-semibold text-gray-800 mt-1">{{ currentUser }}</p>
    </div>

    <!-- Navigation -->
    <nav class="p-4 space-y-2">
      <router-link to="/"
        :class="['w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all', route.path === '/' ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg' : 'text-gray-700 hover:bg-red-900/20']">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        Dashboard
      </router-link>

      <!-- Borang Audit Dropdown -->
      <div class="relative">
        <button @click="toggleAuditDropdown"
          :class="['w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all', isAuditRoute ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg' : 'text-gray-700 hover:bg-red-900/20']">
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Senarai Audit
          </div>
          <svg :class="['w-4 h-4 transition-transform', auditDropdownOpen ? 'rotate-180' : '']" fill="none"
            stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div v-show="auditDropdownOpen" class="mt-2 ml-4 space-y-1 bg-white/50 rounded-xl p-2 border border-red-100">
          <router-link v-for="criteria in auditCriteria" :key="criteria.path" :to="criteria.path"
            :class="['block px-4 py-2 text-xs font-medium rounded-lg transition-all', route.path === criteria.path ? 'bg-red-600 text-white' : 'text-gray-700 hover:bg-red-100']">
            {{ criteria.name }}
          </router-link>
        </div>
      </div>

      <router-link to="/history"
        :class="['w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all', route.path === '/history' ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg' : 'text-gray-700 hover:bg-red-900/20']">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Penemuan
      </router-link>

      <router-link to="/reports"
        :class="['w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all', route.path === '/reports' ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg' : 'text-gray-700 hover:bg-red-900/20']">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Laporan
      </router-link>

      <router-link to="/settings"
        :class="['w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all', route.path === '/settings' ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg' : 'text-gray-700 hover:bg-red-900/20']">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Tetapan
      </router-link>
    </nav>

    <!-- Divider -->
    <div class="my-4 mx-4 border-t border-red-200/50"></div>

    <!-- Logout -->
    <button @click="logout"
      class="w-full mx-4 px-4 py-3 text-sm font-medium rounded-xl text-gray-700 hover:bg-red-100/50 transition-all flex items-center gap-3">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      Log Keluar
    </button>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

defineProps<{
  currentUser: string
}>()

const emit = defineEmits<{
  logout: []
}>()

const route = useRoute()
const auditDropdownOpen = ref(false)
const currentDate = ref('')

onMounted(() => {
  updateDate()
  // Update date every minute
  setInterval(updateDate, 60000)
})

const updateDate = () => {
  const now = new Date()
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  currentDate.value = now.toLocaleDateString('ms-MY', options)
}

const auditCriteria = [
  { name: 'Pengurusan Latihan', path: '/audit-form' },
  { name: 'Pengurusan Keselamatan Am', path: '/audit-keselamatan-am' },
  { name: 'Pengurusan Keselamatan & Kesihatan Pekerjaan (K&KP)', path: '/audit-kkp' },
  { name: 'Pengurusan Peluru & Bahan Letupan', path: '/audit-peluru' },
  { name: 'Pengurusan Semboyan', path: '/audit-semboyan' },
  { name: 'Pengurusan Pentadbiran & Sumber Manusia', path: '/audit-pentadbiran' },
  { name: 'Pengurusan Dokumen', path: '/audit-dokumen' },
  { name: 'Pengurusan Kewangan', path: '/audit-kewangan' },
  { name: 'Pengurusan KAGAT', path: '/audit-kagat' },
  { name: 'Pengurusan Pendidikan', path: '/audit-pendidikan' },
  { name: 'Pengurusan Teknologi Maklumat & Komunikasi (ICT)', path: '/audit-ict' },
  { name: 'Pengurusan Kesihatan', path: '/audit-kesihatan' },
  { name: 'Pengurusan Logistik', path: '/audit-logistik' },
  { name: 'Pengurusan Aset & Stor Kerajaan', path: '/audit-aset' },
  { name: 'Pengurusan JLJ', path: '/audit-jlj' },
  { name: 'Pengurusan Kebombaan', path: '/audit-kebombaan' },
  { name: 'Pengurusan Sajian', path: '/audit-sajian' }
]

const isAuditRoute = computed(() => {
  return auditCriteria.some(criteria => route.path === criteria.path)
})

const toggleAuditDropdown = () => {
  auditDropdownOpen.value = !auditDropdownOpen.value
}

const logout = () => {
  emit('logout')
}
</script>

<style scoped></style>
