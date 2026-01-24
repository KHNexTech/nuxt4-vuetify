import {ModuleOptions, ModuleHooks, ModuleRuntimeHooks, ModulePublicRuntimeConfig} from "./module";

export * from './types'

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
