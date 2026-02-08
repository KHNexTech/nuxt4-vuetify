# nuxt4-vuetify

[![CI](https://github.com/KHNexTech/nuxt4-vuetify/actions/workflows/ci.yml/badge.svg)](https://github.com/KHNexTech/nuxt4-vuetify/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/nuxt4-vuetify.svg)](https://www.npmjs.com/package/nuxt4-vuetify)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Zero-config **Vuetify 3** module for **Nuxt 4** with automatic treeshaking, SSR optimization, and full TypeScript
support.

## Features

- **Automatic Treeshaking** — Only bundles the Vuetify components you use
- **SSR Optimized** — Separate client/server plugins for proper hydration
- **Theme System** — Light/dark + custom themes with runtime toggling
- **Auto-import Composables** — Vuetify native (`useDisplay`, `useTheme`, etc.) + extended wrappers
- **Locale / i18n** — Full internationalization with RTL support
- **Date Adapter** — Pluggable date library (vuetify, date-fns, luxon, dayjs, moment)
- **Component Aliases** — Virtual components with custom defaults
- **Blueprints** — Pre-configured design presets (md1, md2, md3, mso)
- **Programmatic Scrolling** — goTo service with easing support
- **Custom Breakpoints** — Override display thresholds and mobile detection
- **Asset URL Transform** — Use relative paths in `<v-img>`, `<v-card>`, etc.
- **Global Defaults** — Configure default props for all Vuetify components
- **Icons** — MDI (npm or CDN), FontAwesome, or SVG
- **SASS Overrides** — Customize Vuetify at the SASS variable level

---

## Installation

```bash
# npm
npm install nuxt4-vuetify vuetify vite-plugin-vuetify

# pnpm
pnpm add nuxt4-vuetify vuetify vite-plugin-vuetify

# yarn
yarn add nuxt4-vuetify vuetify vite-plugin-vuetify
```

### Icon fonts (optional)

```bash
npm install @mdi/font          # Material Design Icons
# Or set iconsCdn: true to load from CDN
```

### SASS support (optional)

```bash
npm install -D sass
```

### Date adapter (optional)

```bash
# Pick one:
npm install date-fns @date-io/date-fns
npm install luxon @date-io/luxon
npm install dayjs @date-io/dayjs
```

---

## Quick Start

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt4-vuetify'],

  vuetify: {
    defaultTheme: 'light',
    icons: 'mdi',
  },
})
```

That's it — Vuetify components, directives, and composables are auto-imported.

---

## Configuration

### Full Options Reference

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt4-vuetify'],

  vuetify: {
    // ── Core ──
    enabled: true,                    // Enable/disable module
    treeshaking: true,                // Auto-import only used components
    labComponents: false,             // Include Vuetify labs components
    ssr: true,                        // SSR support

    // ── Composables ──
    importComposables: true,          // Auto-import Vuetify composables
    prefixComposables: false,         // Prefix with 'V' (useDisplay → useVDisplay)

    // ── Styles ──
    styles: 'precompiled',            // 'precompiled' | 'sass' | 'none'
    customVariables: './assets/vuetify-variables.scss',

    // ── Icons ──
    icons: 'mdi',                     // 'mdi' | 'mdi-svg' | 'fa' | false
    iconsCdn: false,                  // Load icons via CDN

    // ── Theme ──
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: '#2196F3',
          secondary: '#54B4D3',
        },
      },
    },

    // ── Global Defaults ──
    defaults: {
      VBtn: {variant: 'elevated', rounded: 'lg'},
      VCard: {elevation: 2, rounded: 'lg'},
      VTextField: {variant: 'outlined', density: 'comfortable'},
    },

    // ── Aliases (Virtual Components) ──
    aliases: {
      MyButton: 'VBtn',
      PrimaryBtn: 'VBtn',
      MyCard: 'VCard',
    },

    // ── Blueprint ──
    blueprint: 'md3',                // 'md1' | 'md2' | 'md3' | 'mso' | custom object

    // ── Display / Breakpoints ──
    display: {
      mobileBreakpoint: 'sm',
      thresholds: {
        xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920, xxl: 2560,
      },
    },

    // ── goTo (Programmatic Scrolling) ──
    goTo: {
      duration: 300,
      easing: 'easeInOutCubic',
      offset: 0,
    },

    // ── Locale / i18n ──
    locale: {
      locale: 'en',
      fallback: 'en',
      messages: {},                   // import from 'vuetify/locale'
      rtl: {ar: true, he: true},
    },

    // ── Date Adapter ──
    date: {
      adapter: 'vuetify',            // 'vuetify' | 'date-fns' | 'luxon' | 'dayjs' | 'moment' | 'custom'
    },

    // ── Asset URLs ──
    transformAssetUrls: true,         // true | false | custom Record<string, string[]>

    // ── Exclusions ──
    ignoreComponents: [],
    ignoreDirectives: [],
  },
})
```

### Options Table

| Option               | Type                | Default         | Description                             |
|----------------------|---------------------|-----------------|-----------------------------------------|
| `enabled`            | `boolean`           | `true`          | Enable/disable module                   |
| `importComposables`  | `boolean`           | `true`          | Auto-import Vuetify composables         |
| `prefixComposables`  | `boolean`           | `false`         | Prefix composables with `V`             |
| `treeshaking`        | `boolean`           | `true`          | Treeshake via vite-plugin-vuetify       |
| `labComponents`      | `boolean`           | `false`         | Include Vuetify labs                    |
| `ssr`                | `boolean`           | `true`          | SSR support                             |
| `styles`             | `string`            | `'precompiled'` | `'precompiled'` \| `'sass'` \| `'none'` |
| `icons`              | `string \| false`   | `'mdi'`         | Icon set                                |
| `iconsCdn`           | `boolean`           | `false`         | Load icons from CDN                     |
| `defaultTheme`       | `string`            | `'light'`       | Default theme name                      |
| `themes`             | `Record`            | `{}`            | Custom theme definitions                |
| `defaults`           | `Record`            | `{}`            | Global component defaults               |
| `aliases`            | `Record`            | `undefined`     | Component aliases                       |
| `blueprint`          | `string \| object`  | `undefined`     | Vuetify blueprint preset                |
| `display`            | `object`            | `undefined`     | Breakpoint configuration                |
| `goTo`               | `object`            | `undefined`     | Scroll service config                   |
| `locale`             | `object`            | `{locale:'en'}` | Locale / i18n / RTL                     |
| `date`               | `object`            | `undefined`     | Date adapter config                     |
| `transformAssetUrls` | `boolean \| Record` | `true`          | Asset URL resolution                    |
| `customVariables`    | `string`            | `undefined`     | SASS variables file                     |
| `ignoreComponents`   | `string[]`          | `[]`            | Exclude components                      |
| `ignoreDirectives`   | `string[]`          | `[]`            | Exclude directives                      |

---

## Composables

### Vuetify Native (auto-imported from `vuetify`)

These work without any `import` statement:

```vue

<script setup>
  const {mobile, mdAndUp, width, name} = useDisplay()
  const theme = useTheme()
  const {current, t} = useLocale()
  const {isRtl} = useRtl()
  const goTo = useGoTo()
  const date = useDate()
  const layout = useLayout()
</script>
```

With `prefixComposables: true`:

| Original      | Prefixed       |
|---------------|----------------|
| `useDisplay`  | `useVDisplay`  |
| `useTheme`    | `useVTheme`    |
| `useLocale`   | `useVLocale`   |
| `useRtl`      | `useVRtl`      |
| `useGoTo`     | `useVGoTo`     |
| `useDate`     | `useVDate`     |
| `useDefaults` | `useVDefaults` |
| `useLayout`   | `useVLayout`   |

### Extended Wrappers (always available)

#### `useVuetifyTheme()`

```vue

<script setup>
  const {
    currentTheme,   // Computed<string>
    isDark,         // Computed<boolean>
    toggleTheme,    // () => void
    setTheme,       // (name: string) => void
    colors,         // Computed<Record<string, string>>
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

#### `useVuetifyDisplay()`

```vue

<script setup>
  const {
    mobile, width, height, name,
    xs, sm, md, lg, xl, xxl,
    smAndDown, smAndUp, mdAndDown, mdAndUp,
    lgAndDown, lgAndUp, xlAndDown, xlAndUp,
  } = useVuetifyDisplay()
</script>
```

#### `useVuetifyLocale()`

```vue

<script setup>
  const {current, isRtl, setLocale, t, locales} = useVuetifyLocale()

  // Switch to Arabic (RTL auto-enabled)
  setLocale('ar')
</script>
```

#### `useVuetifyDate()`

```vue

<script setup>
  const {adapter, format, isValid, now} = useVuetifyDate()

  const today = now()
  const formatted = format(today, 'fullDateWithWeekday')
</script>
```

#### `useVuetifyGoTo()`

```vue

<script setup>
  const {goTo, scrollToTop} = useVuetifyGoTo()

  // Scroll to element
  goTo('#contact-section')

  // With options
  goTo('#footer', {duration: 500, offset: -60})

  // Back to top
  scrollToTop()
</script>
```

#### `useVuetifyDefaults()`

```vue

<script setup>
  const {getDefaults, setDefaults} = useVuetifyDefaults()

  setDefaults({
    VBtn: {color: 'secondary', variant: 'tonal'},
  })
</script>
```

---

## Aliases (Virtual Components)

Create design-system components backed by Vuetify:

```ts
// nuxt.config.ts
vuetify: {
  aliases: {
    MyButton: 'VBtn',
      PrimaryBtn
  :
    'VBtn',
  }
,
  defaults: {
    MyButton: {
      variant: 'tonal', color
    :
      'primary'
    }
  ,
    PrimaryBtn: {
      variant: 'flat', color
    :
      'primary', rounded
    :
      'pill'
    }
  ,
  }
,
}
```

```vue

<template>
  <!-- Renders as <v-btn variant="tonal" color="primary"> -->
  <my-button>Click me</my-button>

  <!-- Renders as <v-btn variant="flat" color="primary" rounded="pill"> -->
  <primary-btn>Save</primary-btn>
</template>
```

---

## Blueprints

Apply pre-configured design presets:

```ts
vuetify: {
  blueprint: 'md3',   // Material Design 3
  // Available: 'md1', 'md2', 'md3', 'mso'
}
```

Or a custom blueprint:

```ts
vuetify: {
  blueprint: {
    defaults: {
      VBtn: {
        variant: 'flat', rounded
      :
        'pill'
      }
    ,
      VCard: {
        rounded: 'xl', elevation
      :
        0
      }
    ,
    }
  ,
    theme: {
      defaultTheme: 'dark'
    }
  ,
  }
,
}
```

---

## Locale / i18n

```ts
import {zhHans, ar, ja} from 'vuetify/locale'

vuetify: {
  locale: {
    locale: 'en',
      fallback
  :
    'en',
      messages
  :
    {
      zhHans, ar, ja
    }
  ,
    rtl: {
      ar: true, he
    :
      true, fa
    :
      true
    }
  ,
  }
,
}
```

---

## Date Adapter

```ts
vuetify: {
  date: {
    adapter: 'vuetify',  // Built-in, zero extra deps
  }
,
}
```

External adapters:

| Adapter    | Install                                |
|------------|----------------------------------------|
| `date-fns` | `npm i date-fns @date-io/date-fns`     |
| `luxon`    | `npm i luxon @date-io/luxon`           |
| `dayjs`    | `npm i dayjs @date-io/dayjs`           |
| `moment`   | `npm i moment @date-io/moment`         |
| `js-joda`  | `npm i @js-joda/core @date-io/js-joda` |
| `custom`   | Provide your own via a Nuxt plugin     |

---

## SASS Variable Overrides

```ts
vuetify: {
  styles: 'sass',
    customVariables
:
  './assets/vuetify-variables.scss',
}
```

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

---

## Asset URL Transform

Enabled by default. Allows relative paths in Vuetify components:

```vue

<v-img src="~/assets/photo.png"/>
<v-card image="~/assets/hero.jpg"/>
<v-avatar image="~/assets/avatar.png"/>
```

Supports: `v-img`, `v-card`, `v-avatar`, `v-parallax`, `v-app-bar`, `v-toolbar`, `v-navigation-drawer`,
`v-carousel-item`, `v-list-item`, `v-chip`, `v-banner`, `v-responsive`.

---

## Project Structure

```
nuxt4-vuetify/
├── src/
│   ├── module.ts                              # Main module (650 lines)
│   └── runtime/
│       ├── plugins/
│       │   ├── vuetify.client.ts              # Client plugin
│       │   └── vuetify.server.ts              # Server plugin (SSR)
│       └── composables/
│           ├── useVuetifyTheme.ts             # Theme helpers
│           ├── useVuetifyDisplay.ts           # Breakpoint helpers
│           ├── useVuetifyDefaults.ts          # Defaults helpers
│           ├── useVuetifyLocale.ts            # Locale / RTL helpers
│           ├── useVuetifyDate.ts              # Date adapter helpers
│           └── useVuetifyGoTo.ts              # Scroll helpers
├── playground/
│   ├── app.vue                                # Demo application
│   ├── nuxt.config.ts                         # Playground config
│   └── package.json
├── .github/workflows/ci.yml                   # CI pipeline
├── package.json
├── tsconfig.json
├── build.config.ts
├── CHANGELOG.md
└── README.md
```

---

## Performance Optimizations

| Optimization      | How                                                     |
|-------------------|---------------------------------------------------------|
| Treeshaking       | `vite-plugin-vuetify` auto-imports only used components |
| No full import    | Never imports `vuetify/components` globally             |
| SSR split         | Separate client/server plugins                          |
| Vite optimization | Pre-bundles Vuetify in `optimizeDeps.include`           |
| Transpile         | Ensures compatibility via `build.transpile`             |
| Precompiled CSS   | Default mode (fastest); SASS optional                   |
| CDN icons         | Optional to avoid bundling icon fonts                   |
| Asset URLs        | Build-time path resolution                              |

---

## Development

```bash
# Install dependencies
npm install

# Stub module and prepare playground
npm run dev:prepare

# Start playground dev server
npm run dev

# Build module
npm run build

# Run type checks
npm run typecheck

# Lint
npm run lint

# Run tests
npm run test
```

---

## Publishing

```bash
npm run build
npm login
npm publish
```

---

## License

[MIT](./LICENSE)
