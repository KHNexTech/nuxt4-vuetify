<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar
      color="primary"
      prominent
    >
      <v-app-bar-title>nuxt4-vuetify Playground</v-app-bar-title>
      <v-spacer />
      <v-btn
        icon
        @click="toggleTheme"
      >
        <v-icon>{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <!-- Status Cards -->
        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <v-card>
              <v-card-title>
                <v-icon start>
                  mdi-palette
                </v-icon>
                Theme
              </v-card-title>
              <v-card-text>
                <p>Current: <strong>{{ currentTheme }}</strong></p>
                <p>Dark mode: <strong>{{ isDark }}</strong></p>
                <v-btn-group class="mt-2">
                  <v-btn
                    size="small"
                    @click="setTheme('light')"
                  >
                    Light
                  </v-btn>
                  <v-btn
                    size="small"
                    @click="setTheme('dark')"
                  >
                    Dark
                  </v-btn>
                  <v-btn
                    size="small"
                    @click="setTheme('ocean')"
                  >
                    Ocean
                  </v-btn>
                </v-btn-group>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col
            cols="12"
            md="4"
          >
            <v-card>
              <v-card-title>
                <v-icon start>
                  mdi-cellphone
                </v-icon>
                Display
              </v-card-title>
              <v-card-text>
                <p>Breakpoint: <strong>{{ breakpointName }}</strong></p>
                <p>Mobile: <strong>{{ mobile }}</strong></p>
                <p>Width: <strong>{{ width }}px</strong></p>
                <p>md and up: <strong>{{ mdAndUp }}</strong></p>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col
            cols="12"
            md="4"
          >
            <v-card>
              <v-card-title>
                <v-icon start>
                  mdi-translate
                </v-icon>
                Locale
              </v-card-title>
              <v-card-text>
                <p>Current: <strong>{{ localeCurrent }}</strong></p>
                <p>RTL: <strong>{{ isRtl }}</strong></p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Components Section -->
        <v-row class="mt-4">
          <v-col
            cols="12"
            md="6"
          >
            <v-card>
              <v-card-title>
                <v-icon start>
                  mdi-puzzle
                </v-icon>
                Components
              </v-card-title>
              <v-card-text>
                <v-text-field
                  label="Text Field"
                  class="mb-2"
                />
                <v-select
                  label="Select"
                  :items="['Option 1', 'Option 2', 'Option 3']"
                  class="mb-2"
                />
                <v-btn
                  color="primary"
                  class="mr-2"
                >
                  Primary
                </v-btn>
                <v-btn
                  color="secondary"
                  class="mr-2"
                >
                  Secondary
                </v-btn>
                <v-btn color="error">
                  Error
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-card>
              <v-card-title>
                <v-icon start>
                  mdi-check-circle
                </v-icon>
                Feature Status
              </v-card-title>
              <v-card-text>
                <v-alert
                  type="success"
                  variant="tonal"
                  class="mb-2"
                  density="compact"
                >
                  Treeshaking active
                </v-alert>
                <v-alert
                  type="success"
                  variant="tonal"
                  class="mb-2"
                  density="compact"
                >
                  SSR enabled
                </v-alert>
                <v-alert
                  type="success"
                  variant="tonal"
                  class="mb-2"
                  density="compact"
                >
                  Auto-import composables
                </v-alert>
                <v-alert
                  type="success"
                  variant="tonal"
                  class="mb-2"
                  density="compact"
                >
                  transformAssetUrls configured
                </v-alert>
                <v-chip
                  color="primary"
                  class="mr-2"
                >
                  Chip 1
                </v-chip>
                <v-chip
                  color="secondary"
                  class="mr-2"
                >
                  Chip 2
                </v-chip>
                <v-chip color="accent">
                  Chip 3
                </v-chip>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- goTo Section -->
        <v-row class="mt-4">
          <v-col cols="12">
            <v-card id="scroll-section">
              <v-card-title>
                <v-icon start>
                  mdi-arrow-down
                </v-icon>
                goTo (Scroll)
              </v-card-title>
              <v-card-text>
                <v-btn
                  color="primary"
                  class="mr-2"
                  @click="scrollToTop"
                >
                  Scroll to Top
                </v-btn>
                <v-btn
                  color="secondary"
                  @click="scrollToSection"
                >
                  Scroll to Bottom
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Bottom anchor -->
        <div
          id="bottom-anchor"
          class="mt-16 pa-8 text-center text-medium-emphasis"
        >
          You scrolled here!
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
// Extended composables (auto-imported)
const { currentTheme, isDark, toggleTheme, setTheme } = useVuetifyTheme()
const { mobile, width, name: breakpointName, mdAndUp } = useVuetifyDisplay()
const { goTo, scrollToTop } = useVuetifyGoTo()

// Locale
const { current: localeCurrent, isRtl } = useVuetifyLocale()

// goTo demo
function scrollToSection() {
  goTo('#bottom-anchor', { duration: 500 })
}
</script>
