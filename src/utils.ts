import { createResolver, hasNuxtModule, useLogger } from '@nuxt/kit'
import type { Nuxt } from '@nuxt/schema'
import type { RuntimeConfig } from 'nuxt/schema'
import type { NuxtModuleOptions } from './types'
import { DEFAULT_MODULE_OPTIONS, MODULE_LOGGER_OPTIONS } from './constants'
import type { createConsola } from 'consola'
import defu from 'defu'

type NuxtContextOptions = Omit<NuxtModuleOptions, 'enabled'>

export interface VuetifyNuxtContext extends Partial<NuxtContextOptions> {
  options: NuxtModuleOptions
  nuxt: Nuxt
  logger: ReturnType<typeof createConsola>
  resolver: ReturnType<typeof createResolver>
  runtimeConfig: RuntimeConfig
  runtimeDir: string
  isDev: boolean
  isProd: boolean
  isSSR: boolean
  isI18n: boolean
}

export function createContext(options: NuxtModuleOptions, nuxt: Nuxt): VuetifyNuxtContext {
  const resolver = createResolver(import.meta.url)
  const runtimeDir = resolver.resolve('../runtime')
  const runtimeConfig = nuxt.options.runtimeConfig
  const isI18n = hasNuxtModule('@nuxtjs/i18n', nuxt)
  const logger = useLogger('module', MODULE_LOGGER_OPTIONS)
  options.ssr = nuxt.options.ssr !== false
  const moduleOptions = defu(options, DEFAULT_MODULE_OPTIONS) as NuxtModuleOptions

  return {
    options: moduleOptions,
    nuxt,
    logger,
    resolver,
    runtimeDir,
    runtimeConfig,
    isDev: nuxt.options.dev,
    isProd: !nuxt.options.dev,
    isSSR: nuxt.options.ssr || moduleOptions.ssr,
    isI18n,
  }
}

export function addCSS(css: string, nuxt: Nuxt) {
  nuxt.options.css.push(css)
}
