import { defineNuxtModule, addPlugin, createResolver, addImports } from '@nuxt/kit'
import type { createVuetify, VuetifyOptions } from 'vuetify'
import type { HookResult } from 'nuxt/schema'
import {
  MODULE_KEY,
  MODULE_NAME,
  MODULE_VERSION,
  DEFAULT_MODULE_OPTIONS, VUETIFY_TRANSFORM_ASSET_URLS, VUETIFY_COMPOSABLES,
} from './constants'
import type { NuxtModuleOptions, NuxtVuetifyRuntimeConfig } from './types.ts'
import { createContext } from './utils'
import defu from 'defu'
import type { Options } from '@vuetify/loader-shared'

// Module options TypeScript interface definition
export interface ModuleOptions extends NuxtModuleOptions {
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
  setup(moduleOptions: ModuleOptions, nuxt) {
    const ctx = createContext(moduleOptions, nuxt)
    ctx.resolver! = createResolver(import.meta.url)

    const { options, logger, resolver } = ctx

    if (!options.enabled) return
    logger.info('Setting up Vuetify module... !')
    // 1. Expose to runtime config so the plugin can read it
    nuxt.options.runtimeConfig.public.vuetify = defu(
      nuxt.options.runtimeConfig.public.vuetify,
      {
        ssr: options.ssr,
        defaultTheme: options.defaultTheme,
        themes: options.themes,
        defaults: options.defaults,
        icons: options.icons,
        iconsCdn: options.iconsCdn,
        locale: options.locale || { locale: 'en', fallback: 'en', messages: {}, rtl: {} },
        date: options.date || undefined,
        aliases: options.aliases || undefined,
        blueprint: options.blueprint || undefined,
        goTo: options.goTo || undefined,
        display: options.display || undefined,
      },
    ) as NuxtVuetifyRuntimeConfig
    // 2. Transpile vuetify ──
    nuxt.options.build.transpile.push('vuetify')

    // ── 3. transformAssetUrls for Vuetify components ──
    if (options.transformAssetUrls !== false) {
      const vuetifyAssetUrlMap: Record<string, string[]> = typeof options.transformAssetUrls === 'object'
        ? options.transformAssetUrls
        : VUETIFY_TRANSFORM_ASSET_URLS

      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // Inject into @vitejs/plugin-vue's template.transformAssetUrls
        const newVueConfig = defu(config.vue || {}, {
          template: {
            transformAssetUrls: vuetifyAssetUrlMap,
          },
        })
        Object.assign(config, { vue: newVueConfig })
      })

      // Also set via nuxt's vue config for SSR/Nitro builds
      nuxt.options.vue = defu(nuxt.options.vue || {}, {
        compilerOptions: {},
      })

      // Nuxt 3/4 supports vue.compileTemplate.transformAssetUrls
      nuxt.hooks.hook('modules:done', () => {
        const vueConfig = nuxt.options.vue || {}
        vueConfig.compilerOptions = vueConfig.compilerOptions || {}
        // Merge into existing transformAssetUrls if any
        const existingMap = vueConfig.transformAssetUrls || {}
        nuxt.options.vue = defu(vueConfig, {
          transformAssetUrls: {
            ...existingMap,
            ...vuetifyAssetUrlMap,
          },
        })
      })
    }

    // 4. Handle styles ──
    if (options.styles === true) {
      nuxt.options.css.push('vuetify/styles')
    }
    else if (options.styles === 'sass') {
      // When using sass, the vite plugin handles it
      // User can provide custom variables via customVariables option
    }
    // 'none' — no styles injected

    // 5. Handle icons ──
    if (options.icons === 'mdi') {
      if (options.iconsCdn) {
        // Inject CDN link in head
        nuxt.options.app.head.link = nuxt.options.app.head.link || []
        nuxt.options.app.head.link.push({
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css',
        })
      }
      else {
        // Import from npm package
        nuxt.options.css.push('@mdi/font/css/materialdesignicons.css')
      }
    }
    else if (options.icons === 'fa') {
      nuxt.options.app.head.link = nuxt.options.app.head.link || []
      nuxt.options.app.head.link.push({
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@latest/css/all.min.css',
      })
    }

    // 6. Treeshaking via vite-plugin-vuetify
    if (options.treeshaking) {
      nuxt.hooks.hook('vite:extendConfig', async (config) => {
        try {
          // Dynamic import to handle optional peer dependency
          const vuetifyPlugin = await import('vite-plugin-vuetify')
          const pluginFn = vuetifyPlugin.default || vuetifyPlugin

          const pluginOptions: Options = {}

          // Configure auto-import
          if (options.labComponents || options.ignoreComponents?.length) {
            pluginOptions.autoImport = {
              labs: options.labComponents,
              ignore: options.ignoreComponents,
            } as Options['autoImport']
          }

          // Configure styles for SASS mode
          if (options.styles === 'sass') {
            pluginOptions.styles = options.customVariables
              ? { configFile: options.customVariables }
              : 'sass'
          }
          else if (options.styles === 'none') {
            pluginOptions.styles = 'none'
          }

          // Create a new config object to avoid mutating read-only property
          const newPlugins = [...(config.plugins || []), pluginFn(pluginOptions)]
          Object.assign(config, { plugins: newPlugins })
        }
        catch {
          console.warn(
            '[nuxt-custom-vuetify] vite-plugin-vuetify not found. Install it for treeshaking:\n'
            + '  npm install -D vite-plugin-vuetify',
          )
        }
      })
    }

    // ── 7. SSR optimization ──
    if (options.ssr) {
      nuxt.options.vite = defu(nuxt.options.vite, {
        ssr: {
          noExternal: ['vuetify'],
        },
      })
    }

    // ── 8. Optimize Vite deps ──
    nuxt.options.vite = defu(nuxt.options.vite, {
      optimizeDeps: {
        include: ['vuetify'],
      },
    })

    // ── 9. Register Vuetify plugin ──
    addPlugin({
      src: resolver.resolve('./runtime/plugins/vuetify.client'),
      mode: 'client',
    })
    if (options.ssr) {
      addPlugin({
        src: resolver.resolve('./runtime/plugins/vuetify.server'),
        mode: 'server',
      })
    }

    // ── 10. Register composables ──
    if (options.importComposables !== false) {
      const prefix = typeof options.prefixComposables === 'string' ? options.prefixComposables : (typeof options.prefixComposables === 'boolean' && options.prefixComposables ? 'V' : '')
      const nativeImports = VUETIFY_COMPOSABLES.map(name => ({
        name,
        as: prefix ? name.replace('use', `use${prefix}`) : name,
        from: 'vuetify',
      }))

      addImports(nativeImports)
    }
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

// Type augmentation for nuxt.config
declare module '@nuxt/schema' {
  interface NuxtConfig {
    vuetify?: ModuleOptions
  }

  interface NuxtOptions {
    vuetify: ModuleOptions
  }

  interface PublicRuntimeConfig {
    vuetify?: NuxtVuetifyRuntimeConfig
  }
}
