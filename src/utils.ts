import { createResolver, hasNuxtModule, useLogger } from '@nuxt/kit'
import type { Nuxt } from '@nuxt/schema'
import type { RuntimeConfig } from 'nuxt/schema'
import type { NuxtVuetifyModuleOptions } from './types'
import { MODULE_LOGGER_OPTIONS } from './constants'
import type { createConsola } from 'consola'

type NuxtContextOptions = Omit<NuxtVuetifyModuleOptions, 'enabled' | 'logger'>

export interface VuetifyNuxtContext extends Partial<NuxtContextOptions> {
  options: NuxtContextOptions
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

export function createContext(options: NuxtVuetifyModuleOptions, nuxt: Nuxt): VuetifyNuxtContext {
  const resolver = createResolver(import.meta.url)
  const runtimeDir = resolver.resolve('../runtime')
  const runtimeConfig = nuxt.options.runtimeConfig

  const isI18n = hasNuxtModule('@nuxtjs/i18n', nuxt)
  const loggerOptions = {
    ...MODULE_LOGGER_OPTIONS,
    ...options.logger,
    formatOptions: {
      date: true,
      columns: process.stdout?.columns || 100,
      ...options.logger,
    },
  }
  const logger = useLogger('module', loggerOptions)

  return {
    options,
    nuxt,
    logger,
    resolver,
    runtimeDir,
    runtimeConfig,
    isDev: nuxt.options.dev,
    isProd: !nuxt.options.dev,
    isSSR: nuxt.options.ssr,
    isI18n,
    vuetifyOptions: {},
  }
}
