import type { VuetifyOptions } from 'vuetify/framework'

export interface NuxtVuetifyModuleOptions extends NuxtVuetifyOptions {
  /**
   * Enable/disable the module
   * @default true
   */
  enabled?: boolean
}

export interface NuxtVuetifyOptions {
  VuetifyOptions?: VuetifyOptions
}
