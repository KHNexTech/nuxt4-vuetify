import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import type { ThemeDefinition } from 'vuetify'
import { createVuetify } from 'vuetify'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig().public.vuetify

  // ── Build theme config (same as the client but SSR-aware) ──
  const themes: Record<string, ThemeDefinition> = {}

  themes.light = {
    dark: false,
    colors: {
      background: '#FFFFFF',
      surface: '#FFFFFF',
      primary: '#1867C0',
      secondary: '#5CBBF6',
      accent: '#4CAF50',
      error: '#FF5252',
      info: '#2196F3',
      success: '#4CAF50',
      warning: '#FB8C00',
    },
  }

  themes.dark = {
    dark: true,
    colors: {
      background: '#121212',
      surface: '#212121',
      primary: '#2196F3',
      secondary: '#54B4D3',
      accent: '#FF4081',
      error: '#FF5252',
      info: '#2196F3',
      success: '#4CAF50',
      warning: '#FB8C00',
    },
  }

  if (config && config.themes && typeof config.themes === 'object') {
    for (const [name, theme] of Object.entries(config.themes)) {
      themes[name] = {
        ...themes[name],
        ...theme,
        colors: {
          ...(themes[name]?.colors || {}),
          ...(theme as ThemeDefinition)?.colors,
        },
      }
    }
  }

  let iconConfig: Record<string, unknown> = {}
  if (config?.icons === 'mdi' || config?.icons === 'mdi-svg') {
    iconConfig = { defaultSet: 'mdi' }
  }
  else if (config?.icons === 'fa') {
    iconConfig = { defaultSet: 'fa' }
  }

  // ── Build locale config ──
  const localeConfig: Record<string, unknown> = {}
  const localeOpts = config?.locale

  if (localeOpts) {
    if (localeOpts.locale) localeConfig.locale = localeOpts.locale
    if (localeOpts.fallback) localeConfig.fallback = localeOpts.fallback
    if (localeOpts.messages && Object.keys(localeOpts.messages).length > 0) {
      localeConfig.messages = localeOpts.messages
    }
    if (localeOpts.rtl && Object.keys(localeOpts.rtl).length > 0) {
      localeConfig.rtl = localeOpts.rtl
    }
  }

  // ── Build date adapter config ──
  let dateConfig: Record<string, unknown> | undefined
  const dateOpts = config?.date

  if (dateOpts?.adapter && dateOpts?.adapter !== 'custom') {
    dateConfig = {}

    switch (dateOpts.adapter) {
      case 'vuetify': {
        try {
          const { VuetifyDateAdapter } = await import('vuetify/date/adapters/vuetify')
          dateConfig.adapter = VuetifyDateAdapter
        }
        catch {
          dateConfig.adapter = 'vuetify'
        }
        break
      }
      case 'date-fns': {
        try {
          const mod = await import('@date-io/date-fns')
          dateConfig.adapter = mod.default || mod
        }
        catch {
          console.warn(
            '[nuxt-custom-vuetify] date-fns adapter requires:\n'
            + '  npm install date-fns @date-io/date-fns',
          )
          dateConfig = undefined
        }
        break
      }
      case 'luxon': {
        try {
          const mod = await import('@date-io/luxon')
          dateConfig.adapter = mod.default || mod
        }
        catch {
          console.warn(
            '[nuxt-custom-vuetify] luxon adapter requires:\n'
            + '  npm install luxon @date-io/luxon',
          )
          dateConfig = undefined
        }
        break
      }
      case 'dayjs': {
        try {
          const mod = await import('@date-io/dayjs')
          dateConfig.adapter = mod.default || mod
        }
        catch {
          console.warn(
            '[nuxt-custom-vuetify] dayjs adapter requires:\n'
            + '  npm install dayjs @date-io/dayjs',
          )
          dateConfig = undefined
        }
        break
      }
      case 'moment': {
        try {
          const mod = await import('@date-io/moment')
          dateConfig.adapter = mod.default || mod
        }
        catch {
          console.warn(
            '[nuxt-custom-vuetify] moment adapter requires:\n'
            + '  npm install moment @date-io/moment',
          )
          dateConfig = undefined
        }
        break
      }
      case 'js-joda': {
        try {
          const mod = await import('@date-io/js-joda')
          dateConfig.adapter = mod.default || mod
        }
        catch {
          console.warn(
            '[nuxt-custom-vuetify] js-joda adapter requires:\n'
            + '  npm install @js-joda/core @date-io/js-joda',
          )
          dateConfig = undefined
        }
        break
      }
      default:
        console.warn(`[nuxt-custom-vuetify] Unknown date adapter: "${dateOpts.adapter}"`)
        dateConfig = undefined
    }

    if (dateConfig) {
      if (dateOpts.locale) dateConfig.locale = dateOpts.locale
      if (dateOpts.formats) dateConfig.formats = dateOpts.formats
    }
  }

  // ── Create SSR-aware Vuetify instance ──
  const vuetifyOptions: Record<string, unknown> = {
    ssr: true, // Always true on server
    directives,
    theme: {
      defaultTheme: (config?.defaultTheme as string) || 'light',
      themes,
    },
    icons: iconConfig,
    defaults: config?.defaults || {},
  }

  if (Object.keys(localeConfig).length > 0) {
    vuetifyOptions.locale = localeConfig
  }

  if (dateConfig) {
    vuetifyOptions.date = dateConfig
  }

  // ── Aliases ──
  const aliasOpts = config?.aliases
  if (aliasOpts && typeof aliasOpts === 'object') {
    const resolvedAliases: Record<string, unknown> = {}
    for (const [alias, componentName] of Object.entries(aliasOpts)) {
      try {
        const mod = await import(/* @vite-ignore */ `vuetify/components/${componentName}`)
        resolvedAliases[alias] = mod[componentName as string] || mod.default
      }
      catch {
        console.warn(`[nuxt-custom-vuetify] Could not resolve alias "${alias}" → "${componentName}"`)
      }
    }
    if (Object.keys(resolvedAliases).length > 0) {
      vuetifyOptions.aliases = resolvedAliases
    }
  }

  // ── Blueprint ──
  const blueprintOpt = config?.blueprint
  if (blueprintOpt) {
    // Resolve built-in blueprints by name
    try {
      const blueprints = await import('vuetify/blueprints')
      vuetifyOptions.blueprint = blueprints[blueprintOpt as keyof typeof blueprints]
    }
    catch {
      console.warn(`[nuxt-custom-vuetify] Unknown blueprint: "${blueprintOpt}". Available: md1, md2, md3, mso`)
    }
  }

  // ── goTo ──
  const goToOpts = config?.goTo
  if (goToOpts && typeof goToOpts === 'object') {
    vuetifyOptions.goTo = { ...goToOpts }
  }

  // ── Display / breakpoints ──
  const displayOpts = config?.display
  if (displayOpts && typeof displayOpts === 'object') {
    vuetifyOptions.display = { ...displayOpts }
  }

  const vuetify = createVuetify(vuetifyOptions)

  nuxtApp.vueApp.use(vuetify)

  return {
    provide: {
      vuetify,
    },
  }
})
