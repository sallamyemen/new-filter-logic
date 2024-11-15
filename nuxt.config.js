export default defineNuxtConfig({

  modules: ["@pinia/nuxt"],

  devtools: { enabled: true },

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  compatibilityDate: '2024-09-19',
})