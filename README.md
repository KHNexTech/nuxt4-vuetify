<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: My Module
- Package name: my-module
- Description: My new Nuxt module
-->

# Vuetify Nuxt 4 Module

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Zero-config Vuetify 3 module for Nuxt 4 with optimized treeshaking, lazy loading, SSR support, full TypeScript
integration and zero reliance on the
official `vuetify-nuxt-module`.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)

<!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/my-module?file=playground%2Fapp.vue) -->
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## ✨ Features

<!-- Highlight some of the features your module provide here -->

- 🌳 **Automatic Treeshaking** — Only bundles the Vuetify components you actually use
- ⚡ **SSR Optimized** — Separate client/server plugins for proper hydration
- 🎨 **Theme System** — Light/dark + custom themes with runtime toggling
- 📦 **Auto-import Composables** — `useVuetifyTheme`, `useVuetifyDisplay`, `useVuetifyDefaults`
- 🔧 **Global Defaults** — Configure default props for all Vuetify components
- 🎭 **Icons** — MDI (npm or CDN), FontAwesome, or SVG icons support
- 🧩 **SASS/SCSS Variable Overrides** — Customize Vuetify at the SASS level
- 📱 **Responsive Helpers** — Breakpoint composables for mobile-first design
- 🏗️ **Publishable** — Built with `@nuxt/module-builder`, ready for npm

## 📦 Quick Setup

### 1. Install the module

Install the module to your Nuxt application with one command:

```bash
# nuxt module
npx nuxt module add nuxt-vuetify
```

```bash
# npm
npm install nuxt-custom-vuetify vuetify vite-plugin-vuetify

# pnpm
pnpm add nuxt-custom-vuetify vuetify vite-plugin-vuetify

# yarn
yarn add nuxt-custom-vuetify vuetify vite-plugin-vuetify
```

### 2. Install icon fonts (optional)

```bash
# Material Design Icons (recommended)
npm install @mdi/font

# Or use CDN — set iconsCdn: true in module options
```

### 3. Install SASS (optional, for variable overrides)

```bash
npm install -D sass
```

### 4. Add to your `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: ['nuxt-custom-vuetify'],

  vuetify: {
    // See full options below
    defaultTheme: 'light',
    icons: 'mdi',
  },
})
```

---

## 🔧 Module Options

```ts
export default defineNuxtConfig({
  vuetify: {
    // Enable/disable the module (default: true)
    enabled: true,

    // Automatic treeshaking via vite-plugin-vuetify (default: true)
    treeshaking: true,

    // Include Vuetify labs components (default: false)
    labComponents: false,

    // SSR support (default: true)
    ssr: true,

    // Styles mode: 'precompiled' | 'sass' | 'none' (default: 'precompiled')
    styles: 'precompiled',

    // Icon set: 'mdi' | 'mdi-svg' | 'fa' | false (default: 'mdi')
    icons: 'mdi',

    // Use CDN for icon fonts (default: false)
    iconsCdn: false,

    // Default theme (default: 'light')
    defaultTheme: 'light',

    // Custom theme definitions
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
          accent: '#4CAF50',
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: '#2196F3',
          secondary: '#54B4D3',
        },
      },
      // Add any custom theme
      ocean: {
        dark: false,
        colors: {
          primary: '#006064',
          secondary: '#00838F',
          background: '#E0F7FA',
        },
      },
    },

    // Global component defaults
    defaults: {
      VBtn: {variant: 'elevated', rounded: 'lg'},
      VCard: {elevation: 2, rounded: 'lg'},
      VTextField: {variant: 'outlined', density: 'comfortable'},
    },

    // Exclude specific components/directives from auto-import
    ignoreComponents: [],
    ignoreDirectives: [],

    // Custom SASS variables file (only when styles: 'sass')
    customVariables: './assets/vuetify-variables.scss',
  },
})
```

---

## 🎨 Composables

### `useVuetifyTheme()`

```vue

<script setup>
  const {
    currentTheme,   // Computed<string> — current theme name
    isDark,         // Computed<boolean> — is current theme dark
    toggleTheme,    // () => void — toggle light/dark
    setTheme,       // (name: string) => void — set specific theme
    colors,         // Computed<Record<string, string>> — current colors
    setColor,       // (name: string, value: string) => void
    theme,          // Raw Vuetify theme instance
  } = useVuetifyTheme()
</script>

<template>
  <v-btn @click="toggleTheme">
    {{ isDark ? '☀️ Light' : '🌙 Dark' }}
  </v-btn>
</template>
```

### `useVuetifyDisplay()`

```vue

<script setup>
  const {
    mobile,      // Computed<boolean>
    width,       // Computed<number>
    height,      // Computed<number>
    name,        // Computed<string> — 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
    xs, sm, md, lg, xl, xxl,
    smAndDown, smAndUp,
    mdAndDown, mdAndUp,
    lgAndDown, lgAndUp,
    xlAndDown, xlAndUp,
    display,     // Raw Vuetify display instance
  } = useVuetifyDisplay()
</script>

<template>
  <v-container>
    <p v-if="mobile">Mobile view</p>
    <p v-if="mdAndUp">Desktop view</p>
  </v-container>
</template>
```

### `useVuetifyDefaults()`

```vue

<script setup lang="ts">
  const {getDefaults, setDefaults} = useVuetifyDefaults()

  // Override defaults at runtime
  setDefaults({
    VBtn: {color: 'secondary', variant: 'tonal'},
  })
</script>
```

---

## 🧪 SASS Variable Overrides

To customize Vuetify at the SASS level:

1. Set `styles: 'sass'` in module options
2. Create a variables file:

```scss
// assets/vuetify-variables.scss
@use 'vuetify/settings' with (
  $body-font-family: 'Inter, sans-serif',
  $heading-font-family: 'Inter, sans-serif',
  $color-pack: false,
  $utilities: false,
  $button-height: 44px,
);
```

3. Point to it:

```ts
vuetify: {
  styles: 'sass',
    customVariables
:
  './assets/vuetify-variables.scss',
}
```

---

## 📁 Local Development (Using from Source)

If you want to use this module locally without publishing:

```bash
# Clone / copy the module
cd nuxt-custom-vuetify
npm install
npm run dev:prepare

# In your Nuxt project, reference it locally:
# nuxt.config.ts
export default defineNuxtConfig({
  modules: ['../path-to/nuxt-custom-vuetify'],
})
```

---

## 🚀 Publishing to npm

```bash
cd nuxt-custom-vuetify

# Build
npm run build

# Publish
npm login
npm publish
```

---

## 📁 Project Structure

```
nuxt-custom-vuetify/
├── src/
│   ├── module.ts                          # Main module definition
│   └── runtime/
│       ├── plugins/
│       │   ├── vuetify.client.ts          # Client-side Vuetify init
│       │   └── vuetify.server.ts          # SSR-safe Vuetify init
│       └── composables/
│           ├── useVuetifyTheme.ts         # Theme toggling
│           ├── useVuetifyDisplay.ts       # Responsive breakpoints
│           └── useVuetifyDefaults.ts      # Global defaults
├── playground/
│   ├── app.vue                            # Test application
│   ├── nuxt.config.ts                     # Playground config
│   └── package.json
├── package.json
├── tsconfig.json
├── build.config.ts
└── README.md
```

---

## ⚡ Performance Optimizations

This module applies several optimizations automatically:

| Optimization              | How                                                                 |
|---------------------------|---------------------------------------------------------------------|
| **Treeshaking**           | `vite-plugin-vuetify` auto-imports only used components             |
| **No full import**        | Never imports `vuetify/components` or `vuetify/directives` globally |
| **SSR split**             | Separate client/server plugins prevent hydration mismatches         |
| **Vite dep optimization** | Pre-bundles Vuetify in `optimizeDeps.include`                       |
| **Transpile**             | Ensures Vuetify is transpiled for compatibility                     |
| **CSS**                   | Uses precompiled CSS by default (fastest); SASS optional            |
| **Icons CDN**             | Optional CDN loading to avoid bundling icon fonts                   |

---

## License

MIT


<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nuxt-vuetify/latest.svg?style=flat&colorA=020420&colorB=00DC82

[npm-version-href]: https://npmjs.com/package/nuxt-vuetifye

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-vuetify.svg?style=flat&colorA=020420&colorB=00DC82

[npm-downloads-href]: https://npm.chart.dev/nuxt-vuetify

[license-src]: https://img.shields.io/npm/l/nuxt-vuetify.svg?style=flat&colorA=020420&colorB=00DC82

[license-href]: https://npmjs.com/package/nuxt-vuetify

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt

[nuxt-href]: https://nuxt.com
