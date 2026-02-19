<template>
  <div class="w-full min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4">
    <!-- Animated background elements -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-200/20 to-red-300/20 rounded-full blur-3xl animate-pulse">
      </div>
      <div
        class="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-red-200/20 to-red-300/20 rounded-full blur-3xl animate-pulse"
        style="animation-delay: 2s"></div>
    </div>

    <div class="relative z-10 w-full max-w-md">
      <div class="bg-white rounded-2xl shadow-2xl border border-red-100/50 overflow-hidden backdrop-blur-xl">
        <!-- Header -->
        <div class="bg-gradient-to-r from-red-600 to-red-700 px-8 py-8 text-center">
          <div
            class="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 class="text-3xl font-bold text-white">SAAPTD</h1>
          <p class="text-red-100 text-sm mt-2">Sistem Automasi Audit Pengurusan Tentera Darat</p>
        </div>

        <!-- Form -->
        <div class="px-8 py-8 space-y-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-3">Username</label>
            <input v-model="form.username" type="text" placeholder="Enter your username"
              class="w-full px-4 py-3 border border-red-200/50 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-white/50 backdrop-blur">
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-3">Password</label>
            <input v-model="form.password" type="password" placeholder="Enter your password" @keyup.enter="handleSubmit"
              class="w-full px-4 py-3 border border-red-200/50 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-white/50 backdrop-blur">
          </div>

          <div v-if="errorMessage" class="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
            {{ errorMessage }}
          </div>

          <div class="flex items-center gap-2">
            <input v-model="rememberMe" type="checkbox" id="remember"
              class="w-4 h-4 cursor-pointer text-red-600 focus:ring-red-500 rounded">
            <label for="remember" class="text-sm text-gray-600 cursor-pointer">Remember me</label>
          </div>

          <button @click="handleSubmit" :disabled="isLoading"
            class="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl hover:shadow-lg transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            <svg v-if="!isLoading" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            <span v-if="isLoading">{{ isLogin ? 'Signing in...' : 'Creating...' }}</span>
            <span v-else>{{ isLogin ? 'Sign In' : 'Sign Up' }}</span>
          </button>

          <div class="relative py-4">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-200"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>

          <button @click="isLogin = !isLogin" :disabled="isLoading"
            class="w-full px-6 py-3 border-2 border-red-600 text-red-600 font-semibold rounded-xl hover:bg-red-50 transition-all flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            <span>{{ isLogin ? 'Create New Account' : 'Back to Login' }}</span>
          </button>

          <p class="text-center text-sm text-gray-600 pt-2">
            Demo credentials: <br>
            <span class="font-medium text-gray-700">Username:</span> admin<br>
            <span class="font-medium text-gray-700">Password:</span> admin123
          </p>
        </div>
      </div>

      <p class="text-center text-xs text-gray-500 mt-6">© 2026 SAAPTD. All rights reserved.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginUser, registerUser } from '../services/api'

const router = useRouter()
const isLogin = ref(true)
const rememberMe = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const form = ref({ username: '', password: '' })

const handleSubmit = async () => {
  if (!form.value.username || !form.value.password) {
    errorMessage.value = 'Sila masukkan username dan password'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    if (isLogin.value) {
      // POST /api/auth/login → { success, data: { token, user }, error }
      const result = await loginUser(form.value.username, form.value.password)

      if (result.success && result.data) {
        const { token, user } = result.data
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('authToken', token)
        localStorage.setItem('currentUser', user.username)
        localStorage.setItem('userRole', user.role)
        localStorage.setItem('userFullName', user.full_name ?? user.username)
        localStorage.setItem('userId', String(user.id))
        router.push('/dashboard')
      } else {
        errorMessage.value = result.error || 'Log masuk gagal'
      }
    } else {
      // POST /api/auth/register
      const result = await registerUser({
        username: form.value.username,
        password: form.value.password,
        role: 'Entity',
      })
      if (result.success) {
        // Auto-login after registration
        const loginResult = await loginUser(form.value.username, form.value.password)
        if (loginResult.success && loginResult.data) {
          const { token, user } = loginResult.data
          localStorage.setItem('isAuthenticated', 'true')
          localStorage.setItem('authToken', token)
          localStorage.setItem('currentUser', user.username)
          localStorage.setItem('userRole', user.role)
          localStorage.setItem('userFullName', user.full_name ?? user.username)
          localStorage.setItem('userId', String(user.id))
          router.push('/dashboard')
        }
      } else {
        errorMessage.value = result.error || 'Pendaftaran gagal'
      }
    }
  } catch (err: any) {
    errorMessage.value = err.message || 'Ralat berlaku'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped></style>
