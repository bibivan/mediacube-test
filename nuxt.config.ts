// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }]
    }
  },
  modules: ['@pinia/nuxt', 'vue3-perfect-scrollbar/nuxt'],
  devtools: { enabled: true },
  css: ['~/assets/scss/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/core" as *;'
        }
      }
    }
  },
  runtimeConfig: {
    public: {
      baseURL: 'https://api.todoist.com/sync/v9/',
      token: '0154a2eadbfccff5a288a9a5aeb7aeebca13e635'
    }
  },
  pinia: {
    storesDirs: ['./stores/**']
  },
  typescript: {
    typeCheck: true
  },
  imports: {
    dirs: ['utils/typeguards']
  }
})
