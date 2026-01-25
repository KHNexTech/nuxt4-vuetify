import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import type { createVuetify, VuetifyOptions } from 'vuetify'
import type { HookResult } from 'nuxt/schema'
import { MODULE_KEY, MODULE_NAME, MODULE_VERSION, DEFAULT_MODULE_OPTIONS } from './constants'
import type { NuxtVuetifyModuleOptions, NuxtVuetifyRuntimeConfig } from './types.ts'

// Module options TypeScript interface definition
export interface ModuleOptions extends NuxtVuetifyModuleOptions {
  /**
   * Enable/disable the module
   * @default true
   */
  enable?: boolean
}

// Module Hook
export interface ModuleHooks {
  'vuetify:registerModule': (registerModule: (config: ModuleOptions) => void) => HookResult
}

// Module Runtime Hooks
export interface ModuleRuntimeHooks {
  'vuetify:configuration': (options: {
    isDev: boolean
    vuetifyOptions: VuetifyOptions
  }) => HookResult
  'vuetify:before-create': (options: {
    isDev: boolean
    vuetifyOptions: VuetifyOptions
  }) => HookResult
  'vuetify:ready': (vuetify: ReturnType<typeof createVuetify>) => HookResult
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: MODULE_NAME,
    configKey: MODULE_KEY,
    compatibility: {
      nuxt: '>=4.0.0',
    },
    version: MODULE_VERSION,
    bridge: false,
  },
  // Default configuration options of the Nuxt module
  defaults: DEFAULT_MODULE_OPTIONS as ModuleOptions,
  setup(_options: ModuleOptions, _nuxt) {
    const resolver = createResolver(import.meta.url)

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})

/*
 * Runtime config
 */
export interface ModuleRuntimeConfig {
  public: {
    vuetify: NuxtVuetifyRuntimeConfig
  }
}

export interface ModulePublicRuntimeConfig {
  vuetify: NuxtVuetifyRuntimeConfig
}

declare module '#app' {
  interface RuntimeNuxtHooks extends ModuleRuntimeHooks {
  }
}

declare module '@nuxt/schema' {
  interface NuxtConfig {
    ['vuetify']?: Partial<ModuleOptions>
  }

  interface NuxtOptions {
    ['vuetify']: ModuleOptions
  }

  interface NuxtHooks extends ModuleHooks {
  }

  interface PublicRuntimeConfig extends ModulePublicRuntimeConfig {
  }
}
