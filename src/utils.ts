import defu from 'defu'
import { createResolver, useLogger, hasNuxtModule } from '@nuxt/kit'
import type { Nuxt } from '@nuxt/schema'
import type { RuntimeConfig } from 'nuxt/schema'
import type { ConsolaInstance } from 'consola'
import type { NuxtVuetifyModuleOptions } from './types'
import { MODULE_LOGGER_OPTIONS } from './constants'

type NuxtContextOptions = Omit<NuxtVuetifyModuleOptions, 'enabled' | 'logger'>

export interface VuetifyNuxtContext extends Partial<NuxtContextOptions> {
  options: NuxtContextOptions
  nuxt: Nuxt
  logger: ConsolaInstance | ReturnType<typeof useLogger>
  resolver: ReturnType<typeof createResolver>
  runtimeConfig: RuntimeConfig
  runtimeDir: string
  isDev: boolean
  isProd: boolean
  isSSR: boolean
  isI18n: boolean
}

export function createContext(options: NuxtVuetifyModuleOptions, nuxt: Nuxt): VuetifyNuxtContext {
  const loggerOptions = defu(options.logger, MODULE_LOGGER_OPTIONS)
  const logger = useLogger('module', loggerOptions)

  const resolver = createResolver(import.meta.url)
  const runtimeDir = resolver.resolve('../runtime')
  const runtimeConfig = nuxt.options.runtimeConfig

  const isI18n = hasNuxtModule('@nuxtjs/i18n', nuxt)

  return {
    options,
    nuxt,
    logger: logger,
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
