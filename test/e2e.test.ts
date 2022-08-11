import { promises as fsp } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, fetch, $fetch, useTestContext } from '@nuxt/test-utils'
import { resolve } from 'pathe'

await setup({
  server: true,
  build: true,
  rootDir: fileURLToPath(new URL('../playground', import.meta.url)),
  nuxtConfig: {
    hooks: {
      'modules:before' (ctx) {
        ctx.nuxt.options.nitro.prerender = { routes: ['/'] }
      },
    },
  },
})

describe('full static usage', () => {
  it('adds nitro hints', async () => {
    const res = await fetch('/')
    expect(res.headers.get('x-nitro-prerender')).toContain('/api/_static')
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

  it('generates static files', async () => {
    const ctx = useTestContext()
    const body = await fsp
      .readFile(
        resolve(ctx.nuxt!.options.nitro.output?.dir || '', 'public/api/_static/index.json'),
        'utf-8'
      )
      .then(r => JSON.parse(r))
    expect(Object.keys(body)).toMatchInlineSnapshot(`
      [
        "data",
        "state",
      ]
    `)
    expect(Object.keys(body.data).length).toEqual(1)
  })
})
