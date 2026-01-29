export default defineNuxtConfig({
  modules: ['nuxt4-vuetify'],
  devtools: { enabled: true },
  compatibilityDate: 'latest',
  vuetify: {
    logger: {
      defaults: {
        level: 3,
        tag: 'nuxt:vuetify:playground',
        date: new Date(),
      },
    },
  },
})
