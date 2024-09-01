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
      baseURL: 'https://gorest.co.in/public/v2/',
      token: '2da9c8f058ad74edb5f1a6f7dd7f73ef152279a95f791c8aadd0098d3e679f0d',
      userId: '6941284'
    }
  },
  pinia: {
    storesDirs: ['./stores/**']
  },
  typescript: {
    typeCheck: true
  }
})
