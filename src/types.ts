import type {
  VuetifyOptions,
  ThemeDefinition,
  LocaleMessages,
  DateOptions,
  DisplayBreakpoint,
  DisplayThresholds,
} from 'vuetify'
import type { VUETIFY_ICON, VUETIFY_BLUEPRINT, VUETIFY_DATE_ADAPTER } from './constants'

/*
 * Nuxt Vuetify module options
 */
export interface NuxtModuleOptions extends VuetifyModuleOptions {
  /**
   * Enable/disable the module
   * @default true
   */
  enabled?: boolean
  /**
   * Persistence configuration options
   * @default {
   *   enabled: true,
   *   storage: 'cookie',
   *   key: 'nuxt-vuetify-theme',
   *   cookieOptions: {
   *     maxAge: 60 * 60 * 24 * 365,
   *     path: '/',
   *     sameSite: 'lax'
   *   }
   * }
   */
  persistence?: PersistenceOptions
}

/**
 * Vuetify Module options
 */
export interface VuetifyModuleOptions extends CustomVuetifyOptions {

  /**
   * Enable automatic treeshaking via vite-plugin-vuetify
   * @default true
   */
  treeshaking?: boolean

  /**
   * Import Vuetify labs components
   * @default false
   */
  labComponents?: boolean

  /**
   * Components to explicitly ignore from auto-import
   */
  ignoreComponents?: string[]

  /**
   * Directives to explicitly ignore from auto-import
   */
  ignoreDirectives?: string[]

  /**
   * Vuetify style loading strategy
   * - true: use precompiled CSS (vuetify/styles)
   * - 'sass': load raw SASS styles
   * - 'none': skip loading styles (user manages it)
   * @default true
   */
  styles?: true | 'none' | 'sass'

  /**
   * Custom SASS/SCSS variables file path (relative to project root)
   * Only used when styles is 'sass'
   */
  customVariables?: string

  /**
   * Enable transformAssetUrls for Vuetify components.
   * Allows relative paths in components like v-img, v-card, v-avatar, etc.
   * e.g. <v-img src="~/assets/photo.png" />
   *
   * - true  — apply full default Vuetify asset URL mapping
   * - false — disable (handle manually)
   * - Record<string, string[]> — provide your own custom mapping
   * @default true
   */
  transformAssetUrls?: boolean | Record<string, string[]>

  /**
   * Auto-import Vuetify composables (useDisplay, useTheme, useLocale, etc.)
   * from 'vuetify' so they can be used without manual imports.
   * @default true
   */
  importComposables?: boolean

  /**
   * Prefix Vuetify composables with 'V' to avoid naming collisions.
   * e.g. useDisplay → useVDisplay, useTheme → useVTheme
   * @default false
   */
  prefixComposables?: boolean | string
}

/*
 * Custom Vuetify options
 */
export interface CustomVuetifyOptions {

  /**
   * Default Vuetify theme ('light' | 'dark' | 'system')
   * @default 'system'
   */
  defaultTheme?: 'light' | 'dark' | 'system'

  /**
   * Custom theme definitions
   */
  themes?: Record<string, ThemeDefinition>
  /**
   * Icon set to use: 'mdi', 'mdi-svg', 'fa4', 'fa', 'fa-svg', 'md', 'custom', or false for none
   * @default 'mdi'
   */
  icons: false | typeof VUETIFY_ICON[number]

  /**
   * Load MDI icons via CDN instead of npm package (lighter bundle)
   * @default false
   */
  iconsCdn?: boolean

  /**
   * Vuetify Blueprint preset.
   * Blueprints are pre-configured sets of defaults, icons, and theme.
   * Built-in: 'md1', 'md2', 'md3'
   *
   * You can also pass a custom blueprint object directly.
   *
   * @example
   * ```ts
   * blueprint: 'md3'
   * ```
   * @default 'md3'
   */
  blueprint?: Blueprint

  /**
   * Component aliases — create virtual components from existing Vuetify components.
   * Keys are alias names, values are Vuetify component import paths as strings.
   *
   * NOTE: Because runtime config is serialized, you cannot pass raw component
   * objects here. Instead, provide a mapping of alias name → source component name.
   * The plugin will dynamically import and register them.
   *
   * @example
   * ```ts
   * aliases: {
   *   MyButton: 'VBtn',
   *   MyCard: 'VCard',
   *   IconBtn: 'VBtn',
   * }
   * ```
   * Then use `<my-button>`, `<my-card>`, `<icon-btn>` in templates.
   * Combine with `defaults` to assign default props per alias.
   */
  aliases?: Record<string, string>

  /**
   * Global Vuetify defaults for components
   */
  defaults?: VuetifyOptions['defaults']

  /**
   * Custom display / breakpoint configuration.
   *
   * @example
   * ```ts
   * display: {
   *   mobileBreakpoint: 'sm', // 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | number
   *   thresholds: {
   *     xs: 0,
   *     sm: 600,
   *     md: 960,
   *     lg: 1280,
   *     xl: 1920,
   *     xxl: 2560,
   *   },
   * }
   * ```
   * @default undefined (uses Vuetify defaults)
   */
  display?: {
    mobileBreakpoint?: number | DisplayBreakpoint
    thresholds?: Partial<DisplayThresholds>
  }

  /**
   * Configuration for the goTo (programmatic scrolling) service.
   *
   * @example
   * ```ts
   * goTo: {
   *   container: undefined, // CSS selector or element
   *   duration: 300, // scroll duration in ms
   *   easing: 'easeInOutCubic',
   *   offset: 0, // pixel offset from target
   * }
   * ```
   * @default undefined
   */
  goTo?: {
    container?: string
    duration?: number
    easing?: string
    offset?: number
  }

  /**
   * Locale / i18n configuration for Vuetify components.
   *
   * @example
   * ```ts
   * locale: {
   *   locale: 'en',
   *   fallback: 'en',
   *   messages: { en, zhHans, ar },
   *   rtl: { ar: true, he: true },
   * }
   * ```
   */
  locale?: {
    /**
     * Default locale code
     * @default 'en'
     */
    locale?: string

    /**
     * Fallback locale when translation key is missing
     * @default 'en'
     */
    fallback?: string

    /**
     * Locale messages keyed by language code.
     * Import from 'vuetify/locale' e.g. `import { zhHans, pl } from 'vuetify/locale'`
     * @default {}
     */
    messages?: LocaleMessages

    /**
     * RTL configuration per locale.
     * Keys are locale codes, values indicate RTL direction.
     * @example { ar: true, he: true, fa: true }
     * @default {}
     */
    rtl?: Record<string, boolean>
  }

  /**
   * Date adapter configuration for date-related Vuetify components
   * (v-date-picker, v-date-input, v-calendar, etc.)
   *
   * @example
   * ```ts
   * date: {
   *   adapter: 'vuetify',       // built-in adapter, no extra deps
   * }
   * // or with external library:
   * date: {
   *   adapter: 'date-fns',      // requires date-fns + @date-io/date-fns
   *   locale: { en: enUS },     // date-fns locale objects
   *   formats: { ... },         // custom format strings
   * }
   * ```
   */
  date?: {
    /**
     * Which date adapter to use.
     * - 'vuetify'   — built-in adapter (no extra deps)
     * - 'date-fns'  — requires date-fns + @date-io/date-fns
     * - 'luxon'     — requires luxon + @date-io/luxon
     * - 'dayjs'     — requires dayjs + @date-io/dayjs
     * - 'moment'    — requires moment + @date-io/moment
     * - 'js-joda'   — requires @js-joda/core + @date-io/js-joda
     * - 'custom'    — provide your own adapter instance via plugin
     * @default 'vuetify'
     */
    adapter: 'vuetify' | DateAdapter | 'custom'

    /**
     * Locale mapping for the date adapter.
     * Keys are Vuetify locale codes, values are the adapter's locale objects.
     * @example { en: enUS, fr: fr }  // date-fns locale objects
     */
    locale?: DateOptions['locale']

    /**
     * Custom date format strings for the adapter.
     */
    formats?: DateOptions['formats']
  }

  /**
   * SSR support
   * auto-detected from Nuxt config.
   * @default true
   */
  ssr: boolean
}

/* ----Vuetify - Blueprint---- */
export type Blueprint = typeof VUETIFY_BLUEPRINT[number]

/* ----Date---- */
export type DateAdapter = typeof VUETIFY_DATE_ADAPTER[number]

/* ----Persistence---- */
export interface CookieOptions {
  maxAge?: number
  path?: string
  sameSite?: 'lax' | 'strict' | 'none'
}

export interface PersistenceOptions {
  enabled?: boolean
  key?: string
  storage?: 'cookie' | 'localStorage' | 'sessionStorage'
  cookieOptions?: CookieOptions
}

/* ----Runtime---- */
export type VuetifyRuntimeConfig = CustomVuetifyOptions

export interface NuxtVuetifyRuntimeConfig extends VuetifyRuntimeConfig {
  persistence?: PersistenceOptions
}
