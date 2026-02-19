import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../components/Login.vue'
import Dashboard from '../components/Dashboard.vue'
import AuditForm from '../components/AuditFormLatihan.vue'
import AuditFormKeselamatanAm from '../components/AuditFormKeselamatanAm.vue'
import AuditFormKKP from '../components/AuditFormKKP.vue'
import AuditFormPeluru from '../components/AuditFormPeluru.vue'
import AuditFormSemboyan from '../components/AuditFormSemboyan.vue'
import AuditFormPentadbiran from '../components/AuditFormPentadbiran.vue'
import AuditFormDokumen from '../components/AuditFormDokumen.vue'
import AuditFormKewangan from '../components/AuditFormKewangan.vue'
import AuditFormKAGAT from '../components/AuditFormKAGAT.vue'
import AuditFormICT from '../components/AuditFormICT.vue'
import AuditFormPendidikan from '../components/AuditFormPendidikan.vue'
import AuditFormKesihatan from '../components/AuditFormKesihatan.vue'
import AuditFormLogistik from '../components/AuditFormLogistik.vue'
import AuditFormAset from '../components/AuditFormAset.vue'
import AuditFormJLJ from '../components/AuditFormJLJ.vue'
import AuditFormKebombaan from '../components/AuditFormKebombaan.vue'
import AuditFormSajian from '../components/AuditFormSajian.vue'
import AuditFinding from '../components/AuditFinding.vue'
import AuditDetail from '../components/AuditDetail.vue'
import Reports from '../components/Reports.vue'
import Settings from '../components/Settings.vue'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/audit-form',
    name: 'AuditForm',
    component: AuditForm,
    meta: { requiresAuth: true }
  },
  {
    path: '/audit-keselamatan-am',
    name: 'AuditFormKeselamatanAm',
    component: AuditFormKeselamatanAm,
    meta: { requiresAuth: true }
  },
  {
    path: '/audit-kkp',
    name: 'AuditFormKKP',
    component: AuditFormKKP,
    meta: { requiresAuth: true }
  },
  {
    path: '/audit-peluru',
    name: 'AuditFormPeluru',
    component: AuditFormPeluru,
    meta: { requiresAuth: true }
  },
  {
    path: '/audit-semboyan',
    name: 'AuditFormSemboyan',
    component: AuditFormSemboyan,
    meta: { requiresAuth: true }
  },
  {
    path: '/audit-pentadbiran',
    name: 'AuditFormPentadbiran',
    component: AuditFormPentadbiran,
    meta: { requiresAuth: true }
  },
  {
    path: '/audit-dokumen',
    name: 'AuditFormDokumen',
    component: AuditFormDokumen,
    meta: { requiresAuth: true }
  },
  {
    path: '/audit-kewangan',
    name: 'AuditFormKewangan',
    component: AuditFormKewangan,
    meta: { requiresAuth: true }
  },
  {
    path: '/audit-kagat',
    name: 'AuditFormKAGAT',
    component: AuditFormKAGAT,
    meta: { requiresAuth: true }
  },
  {
    path: '/audit-ict',
    name: 'AuditICT',
    component: AuditFormICT,
    meta: { requiresAuth: true }
  },
  {
    path: '/audit-pendidikan',
    name: 'AuditPendidikan',
    component: AuditFormPendidikan,
    meta: { requiresAuth: true }
  },
  {
    path: '/audit-kesihatan',
    name: 'AuditKesihatan',
    component: AuditFormKesihatan,
    meta: { requiresAuth: true }
  },
  {
    path: '/audit-logistik',
    name: 'AuditLogistik',
    component: AuditFormLogistik,
    meta: { requiresAuth: true }
  },
  {
    path: '/audit-aset',
    name: 'AuditAset',
    component: AuditFormAset,
    meta: { requiresAuth: true }
  },
  {
    path: '/audit-jlj',
    name: 'AuditJLJ',
    component: AuditFormJLJ,
    meta: { requiresAuth: true }
  },
  {
    path: '/audit-kebombaan',
    name: 'AuditKebombaan',
    component: AuditFormKebombaan,
    meta: { requiresAuth: true }
  },
  {
    path: '/audit-sajian',
    name: 'AuditSajian',
    component: AuditFormSajian,
    meta: { requiresAuth: true }
  },
  {
    path: '/audit-form/:checkpointId',
    name: 'AuditFormByCheckpoint',
    component: AuditForm,
    meta: { requiresAuth: true }
  },
  {
    path: '/history',
    name: 'AuditHistory',
    component: AuditFinding,
    meta: { requiresAuth: true }
  },
  {
    path: '/findings',
    name: 'AuditFindings',
    component: AuditFinding,
    meta: { requiresAuth: true }
  },
  {
    path: '/audit/:auditId',
    name: 'AuditDetail',
    component: AuditDetail,
    meta: { requiresAuth: true }
  },
  {
    path: '/reports',
    name: 'Reports',
    component: Reports,
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated')
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && isAuthenticated) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
