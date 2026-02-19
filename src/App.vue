<template>
  <div class="w-full min-h-screen bg-white">
    <!-- Main Header -->
    <header v-if="showNavigation"
      class="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-red-600 via-red-700 to-black text-white px-6 py-3 shadow-lg backdrop-blur-md border-b border-red-400/30">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img src="/td-logo.png" alt="TD Logo" class="h-[70px] w-auto object-contain">
          <div>
            <h1 class="text-2xl font-bold tracking-tight">Sistem Automasi Audit Pengurusan Tentera Darat</h1>
            <p class="text-red-100 text-xs mt-1">SAAPTD</p>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <div class="text-right">
            <p class="text-xs text-red-100">Tarikh Hari Ini</p>
            <p class="mono text-sm font-medium">{{ currentDate }}</p>
          </div>
          <div
            class="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
    </header>

    <Navigation v-if="showNavigation" :currentUser="currentUser" @logout="logout" />
    <div v-if="showNavigation" class="ml-64 pt-20 min-h-screen overflow-y-auto">
      <router-view />
    </div>
    <div v-else class="w-full">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref, computed, onMounted, watch } from 'vue'
import Navigation from './components/Navigation.vue'
// import { listAudits } from './services/api'

const router = useRouter()
const route = useRoute()
const isAuthenticated = ref(false)
const currentUser = ref('')
const currentDate = ref('')

// --- DATABASE STATE ---
const auditData = ref<any[]>([])
const isLoading = ref(false)

onMounted(() => {
  checkAuth()
  updateDate()
  // fetchDatabase() // Load your Google Sheets data on start
  // Update date every minute
  setInterval(updateDate, 60000)
})

watch(() => route.path, () => {
  checkAuth()
})

// --- DATABASE LOGIC ---
// const fetchDatabase = async () => {
//   isLoading.value = true
//   try {
//     const data = await listAudits()
//     auditData.value = data
//   } catch (error) {
//     console.error("Error fetching from Backend API:", error)
//   } finally {
//     isLoading.value = false
//   }
// }

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

const checkAuth = () => {
  const auth = localStorage.getItem('isAuthenticated')
  const user = localStorage.getItem('currentUser')
  isAuthenticated.value = !!auth
  currentUser.value = user || ''
}

const showNavigation = computed(() => {
  return isAuthenticated.value && route.path !== '/login'
})

const logout = () => {
  localStorage.removeItem('isAuthenticated')
  localStorage.removeItem('currentUser')
  isAuthenticated.value = false
  router.push('/login')
}
</script>

<style scoped></style>
