import type { DateOptions, IconAliases, JSXComponent, VuetifyOptions } from 'vuetify/framework'
import type { VUETIFY_ICON_SET, VUETIFY_BLUEPRINT_NAMES, VUETIFY_DATE_ADAPTER_NAMES } from './constants'
import type { ConsolaOptions } from 'consola'

/*
 * Nuxt Vuetify module options
 */
export interface NuxtVuetifyModuleOptions extends NuxtVuetifyOptions {
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
  /**
   * Preload configuration options
   * @default {
   *   fonts: false,
   *   criticalCSS: true
   * }
   */
  preload?: PreloadOptions
  /**
   * Logger configuration options
   */
  logger?: LoggerOptions
}

/*
 * Nuxt Vuetify options
 */
export interface NuxtVuetifyOptions {
  /**
   * Vuetify options
   * @default {
   *   aliases: {}
   *   blueprints: md3,
   *   components: [], if treeShakeable: true | {},
   *   date: {
   *     adapter: 'vuetify'
   *   },
   *   directives: [], if treeShakeable: true | {},
   *   defaults: {}
   *   theme: {
   *     defaultTheme: 'light'
   *     themes: {
   *        light: {
   *         dark: false,
   *         colors: {
   *           primary: '#1867C0',
   *           secondary: '#5CBBF6',
   *           accent: '#82B1FF'
   *         }
   *        },
   *        dark: {
   *         dark: true,
   *         colors: {
   *           primary: '#2196F3',
   *           secondary: '#424242',
   *           accent: '#FF4081'
   *         }
   *       }
   *     }
   *   }
   *   icons:{
   *     defaultSet: 'mdi'
   *   },
   *   locale: {
   *     locale: 'en',
   *     fallback: 'en'
   *   },
   *   ssr: false
   * }
   */
  vuetifyOptions?: CustomVuetifyOptions
  /**
   * Enable tree shaking for Vuetify components and directives
   * set false to disable tree shaking; You set components and directives, or labs with VuetifyOptions
   * @default true
   */
  treeShake?: boolean | {
    /**
     * Enable Vuetify Labs components & directives
     * @default false
     */
    labs?: boolean
    /**
     * Ignore components & directives, also labs
     */
    ignore?: string[]
  }
  /**
   * Styles configuration options
   * @default true
   * true: use default styles
   * 'none': disable styles
   * 'sass': use sass styles
   */
  styles?: true | 'none' | 'sass' | {
    configFile: string
  }
  /**
   * Transform asset URLs to resolve relative asset URLs
   * @default true
   */
  transformAssetUrls?: boolean | Record<string, string[]>

  /**
   * Enable composable vuetify
   * @default false
   */
  composable?: boolean | {
    prefix?: string
  }
  /**
   * Enable rules for vuetify
   * @see https://vuetifyjs.com/en/features/rules/#custom-rules
   * @default false
   */
  rules: boolean | {
    labs?: boolean
  }
}

/* ----Vuetify - Blueprint---- */
export type Blueprint = typeof VUETIFY_BLUEPRINT_NAMES[number]

/* ----Vuetify - Components---- */
export type Components = keyof typeof import('vuetify/components')

/* ----Vuetify - Directives---- */
export type Directives = keyof typeof import('vuetify/directives')

/* ----Vuetify - LabComponents---- */
export type LabComponents = keyof typeof import('vuetify/labs/components')

export type VuetifyComponents = Components & LabComponents

/* ----Date---- */
type DateAdapter = typeof VUETIFY_DATE_ADAPTER_NAMES[number]

/* ----Theme---- */
export type ThemeOptions = Exclude<VuetifyOptions['theme'], false>

/* ----Icons---- */
type IconValue = string | (string | [path: string, opacity: number])[] | JSXComponent

interface IconProps {
  tag: string | JSXComponent
  icon?: IconValue
  disabled?: boolean
}

type IconComponent = JSXComponent<IconProps>

interface IconSet {
  component: IconComponent
}

export interface IconOptions {
  defaultSet?: typeof VUETIFY_ICON_SET[number]
  aliases?: Partial<IconAliases>
  sets?: Record<string, IconSet>
  svg?: {
    mdi?: {
      aliases?: Record<string, string>
    }
    fa?: {
      libraries?: string[]
    }
  }
}

/*
 * LocaleOptions
 * @see https://vuetifyjs.com/en/features/internationalization/#internationalization/
 */
export type LocaleOptions = VuetifyOptions['locale']

/*
 * Custom Vuetify options
 */
export interface CustomVuetifyOptions extends Partial<Omit<VuetifyOptions, 'aliases' | 'blueprint' | 'components' | 'date' | 'directives' | 'theme' | 'icons' | 'locale'>> {
  /**
   * Vuetify aliases
   */
  aliases?: Record<string, string>
  /**
   * Vuetify blueprint
   */
  blueprint?: Blueprint
  /**
   * Vuetify components
   */
  components?: VuetifyComponents | VuetifyComponents[]
  /**
   * Vuetify date adapter
   */
  date?: Omit<DateOptions, 'adapter'> & {
    adapter: DateAdapter
  }
  /**
   * Vuetify directives
   */
  directives?: Directives | Directives[]
  /**
   * Vuetify theme
   */
  theme?: ThemeOptions
  /**
   * Vuetify icons
   */
  icons?: IconOptions
  /**
   * Vuetify locale
   */
  locale?: LocaleOptions
}

/*
 * Logger options
 */
export interface LoggerOptions extends Partial<ConsolaOptions> {
  defaults: {
    level: number
    tag: string
    date: Date
  }
  formatOptions: {
    date: boolean
    colors: boolean
    compact: boolean
  }
}

/* ----Preload---- */
export interface PreloadOptions {
  fonts?: boolean
  criticalCSS?: boolean
}

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

export type VuetifyRuntimeConfig = NuxtVuetifyOptions

export interface NuxtVuetifyRuntimeConfig extends VuetifyRuntimeConfig {
  options: NuxtVuetifyModuleOptions
  persistence?: PersistenceOptions
  logger?: LoggerOptions
}

// // Module Hook
// export interface ModuleHooks {
//   'vuetify:registerModule': (registerModule: (config: ModuleOptions) => void) => HookResult
// }
//
// // Module Runtime Hooks
// export interface ModuleRuntimeHooks {
//   'vuetify:configuration': (options: {
//     isDev: boolean
//     vuetifyOptions: VuetifyOptions
//   }) => HookResult
//   'vuetify:before-create': (options: {
//     isDev: boolean
//     vuetifyOptions: VuetifyOptions
//   }) => HookResult
//   'vuetify:ready': (vuetify: ReturnType<typeof createVuetify>) => HookResult
// }
