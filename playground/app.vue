<template>
  <v-app>
    <v-app-bar
      color="primary"
      prominent
    >
      <v-app-bar-title>Nuxt Custom Vuetify Module</v-app-bar-title>
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
        <v-row>
          <v-col cols="12">
            <v-card class="mb-4">
              <v-card-title>🎉 Module Working!</v-card-title>
              <v-card-text>
                <p>Current theme: <strong>{{ currentTheme }}</strong></p>
                <p>Is dark: <strong>{{ isDark }}</strong></p>
                <p>Is mobile: <strong>{{ mobile }}</strong></p>
                <p>Breakpoint: <strong>{{ breakpointName }}</strong></p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-card>
              <v-card-title>Components Test</v-card-title>
              <v-card-text>
                <v-text-field label="Text Field" />
                <v-select
                  label="Select"
                  :items="['Option 1', 'Option 2', 'Option 3']"
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
              <v-card-title>More Components</v-card-title>
              <v-card-text>
                <v-alert
                  type="success"
                  class="mb-2"
                >
                  Treeshaking is active!
                </v-alert>
                <v-alert
                  type="info"
                  class="mb-2"
                >
                  SSR support enabled.
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
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
const { currentTheme, isDark, toggleTheme } = useVuetifyTheme()
const { mobile, name: breakpointName } = useVuetifyDisplay()
</script>
