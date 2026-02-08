import { version } from '../package.json'

export const VUETIFY_THEMES = {
  light: {
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
  },
  dark: {
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
  },
}
export const VUETIFY_BLUEPRINT = ['md1', 'md2', 'md3'] as const
export const VUETIFY_DATE_ADAPTER = ['vuetify', 'date-fns', 'date-fns-jalali', 'dayjs', 'jalaali', 'js-joda', 'hijri', 'luxon', 'moment'] as const
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
  'v-app-bar': ['image'],
  'v-avatar': ['image'],
  'v-banner': ['avatar'],
  'v-card': ['image', 'prepend-avatar', 'append-avatar'],
  'v-card-item': ['prepend-avatar', 'append-avatar'],
  'v-chip': ['prepend-avatar', 'append-avatar'],
  'v-img': ['src', 'lazy-src', 'srcset'],
  'v-list-item': ['prepend-avatar', 'append-avatar'],
  'v-navigation-drawer': ['image'],
  'v-parallax': ['src', 'lazy-src', 'srcset'],
  'v-toolbar': ['image'],
  'VAppBar': ['image'],
  'VAvatar': ['image'],
  'VBanner': ['avatar'],
  'VCard': ['image', 'prependAvatar', 'appendAvatar'],
  'VCardItem': ['prependAvatar', 'appendAvatar'],
  'VChip': ['prependAvatar', 'appendAvatar'],
  'VImg': ['src', 'lazySrc', 'srcset'],
  'VListItem': ['prependAvatar', 'appendAvatar'],
  'VNavigationDrawer': ['image'],
  'VParallax': ['src', 'lazySrc', 'srcset'],
  'VToolbar': ['image'],
} as const

export const MODULE_NAME = 'nuxt4-vuetify'
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
    columns: process.stdout?.columns || 100,
  },
}

export const DEFAULT_MODULE_OPTIONS = {
  enabled: true,
  defaultTheme: 'system',
  themes: VUETIFY_THEMES,
  icons: 'mdi',
  iconsCdn: false,
  blueprint: 'md3',
  aliases: undefined,
  defaults: {},
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
  importComposable: false,
  prefixComposables: false,
  persistence: MODULE_PERSISTENCE,
}
