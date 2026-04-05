// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  nitro: {
    preset: 'vercel'
  },
  runtimeConfig: {
    cloudflareAccountId: process.env.CLOUDFLARE_ACCOUNT_ID,
    cloudflareD1DatabaseId: process.env.CLOUDFLARE_D1_DATABASE_ID,
    cloudflareApiToken: process.env.CLOUDFLARE_API_TOKEN,
  }
})