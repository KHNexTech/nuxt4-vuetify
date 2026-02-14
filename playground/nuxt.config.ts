export default defineNuxtConfig({
  modules: ['nuxt4-vuetify'],
  ssr: true,
  devtools: { enabled: false },
  compatibilityDate: 'latest',
  vuetify: {
    enabled: true,
    defaultTheme: 'system',
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
        },
      },
      dark: {
        colors: {
          primary: '#2196F3',
          secondary: '#54B4D3',
        },
      },
    },
    icons: 'mdi',
    iconsCdn: false,
    blueprint: 'md3',
    aliases: undefined,
    defaults: {
      VBtn: {
        variant: 'elevated',
        rounded: 'lg',
      },
      VCard: {
        elevation: 2,
        rounded: 'lg',
      },
      VTextField: {
        variant: 'outlined',
        density: 'comfortable',
      },
    },
    display: undefined,
    goTo: undefined,
    locale: {
      locale: 'en',
      fallback: 'en',
      messages: {},
      rtl: {},
    },
    date: undefined,
    ssr: true,
    treeshaking: true,
    labComponents: false,
    ignoreComponents: [],
    ignoreDirectives: [],
    styles: true,
    customVariables: undefined,
    transformAssetUrls: true,
    importComposable: true,
    prefixComposables: false,
  },
})
