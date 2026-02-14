import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

describe('demo-test', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/demo', import.meta.url)),
    browser: false
  })

  it('renders the demo index page', async () => {
    const html = await $fetch('/')
    expect(html).toContain('id="demo"')
    expect(html).toContain('demo-page')
  })
})
