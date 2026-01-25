import { version } from '../package.json'

export const MODULE_NAME = 'nuxt-vuetify'
export const MODULE_KEY = 'vuetify'
export const MODULE_VERSION = version

export const MODULE_PERSISTENCE_KEY = `nuxt-${MODULE_KEY}-theme` as string
export const MODULE_PERSISTENCE_MAX_AGE = 60 * 60 * 24 * 365 as number
export const MODULE_PERSISTENCE = {
  enabled: true,
  storage: 'cookie',
  key: MODULE_PERSISTENCE_KEY,
  cookieOptions: {
    maxAge: MODULE_PERSISTENCE_MAX_AGE,
    path: '/',
    sameSite: 'lax',
  },
} as const

export const MODULE_LOGGER_TAG = `nuxt:${MODULE_KEY}` as string
export const MODULE_LOGGER_LEVEL_PRODUCTION = 3 as number
export const MODULE_LOGGER_LEVEL_DEVELOPMENT = 5 as number
export const MODULE_LOGGER_OPTIONS = {
  defaults: {
    level: import.meta.env.PROD ? MODULE_LOGGER_LEVEL_PRODUCTION : MODULE_LOGGER_LEVEL_DEVELOPMENT,
    tag: MODULE_LOGGER_TAG,
    date: new Date(),
  },
  formatOptions: {
    date: true,
    colors: true,
    compact: true,
  },
}

export const VUETIFY_THEME_OPTION = {
  theme: {
    defaultTheme: 'system',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: '#2196F3',
          secondary: '#424242',
          accent: '#FF4081',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
        },
      },
    },
  },
}

export const VUETIFY_BLUEPRINT = ['md1', 'md2', 'md3'] as const
export const VUETIFY_DATE_ADAPTER = ['vuetify', 'date-fns', 'dayjs', 'luxon', 'moment'] as const
export const VUETIFY_ICON = ['mdi', 'mdi-svg', 'fa4', 'fa', 'fa-svg', 'md', 'custom'] as const
export const VUETIFY_COMPOSABLES: string[] = [
  'useDate',
  'useDefaults',
  'useDisplay',
  'useLayout',
  'useLocale',
  'useRtl',
  'useTheme',
  'useGoTo',
  'useHotkey',
  'useRules',
  'useMask',
] as const
export const VUETIFY_TRANSFORM_ASSET_URLS: Record<string, string[]> = {
  'v-img': ['src', 'lazy-src'],
  'v-card': ['image'],
  'v-card-item': ['prependAvatar', 'appendAvatar'],
  'v-avatar': ['image'],
  'v-parallax': ['src'],
  'v-toolbar': ['image'],
  'v-app-bar': ['image'],
  'v-banner': ['avatar'],
  'v-list-item': ['prependAvatar', 'appendAvatar'],
  'v-chip': ['prependAvatar', 'appendAvatar'],
} as const

export const DEFAULT_MODULE_OPTIONS = {
  enabled: true,
  vuetifyOptions: {
    aliases: {},
    blueprint: 'md3',
    components: [],
    date: {
      adapter: 'vuetify',
    },
    directives: [],
    defaults: {},
    theme: VUETIFY_THEME_OPTION,
    icons: {
      defaultSet: 'mdi',
    },
    locale: {
      locale: 'en',
      fallback: 'en',
    },
    ssr: true,
  },
  treeShake: true,
  styles: true,
  transformAssetUrls: true,
  composable: false,
  persistence: MODULE_PERSISTENCE,
  preload: {
    fonts: false,
    criticalCSS: true,
  },
  logger: MODULE_LOGGER_OPTIONS,
}
