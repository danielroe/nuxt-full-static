import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils'
import { fileURLToPath } from 'url'

await setup({
  server: true,
  rootDir: fileURLToPath(new URL('../playground', import.meta.url)),
})

describe('full static usage', () => {
  it('adds nitro hints', async () => {
    const html = await $fetch('/')
    expect(html).toContain('<link rel="prefetch" href="/api/_static')
  })
  it('renders payloads', async () => {
    const payload = await $fetch('/api/_static/index.json')
    expect(Object.keys(payload)).toMatchInlineSnapshot(`
      [
        "data",
        "state",
      ]
    `)
    expect(Object.keys(payload.data).length).toEqual(1)
  })
})
