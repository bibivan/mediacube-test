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
      token: 'e2d5cfa579085b15e165f7a33dfebaa313ddd9d8'
    }
  },
  pinia: {
    storesDirs: ['./stores/**']
  },
  typescript: {
    typeCheck: true
  }
})
