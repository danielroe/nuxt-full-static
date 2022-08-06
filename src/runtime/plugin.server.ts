import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.hook('app:rendered', ({ ssrContext, html }) => {
    if (ssrContext.event.req.headers['x-nuxt-full-static']) {
      ssrContext.event.res.setHeader('Content-Type', 'application/json')
      ssrContext.event.res.end(
        JSON.stringify({
          data: nuxtApp.payload.data,
          state: {
            ...nuxtApp.payload.state,
            ...Object.fromEntries(keysToIgnore.map(k => [k, undefined])),
          },
        })
      )
      return
    }
    // Add hint to Nitro prerenderer to prerender the .json file corresponding to this route
    // TODO: use header to expose this to the prerenderer
    const url = ssrContext.url === '/' ? '/index' : ssrContext.url
    html.head.push(`<!-- <link rel="prefetch" href="/api/_static${url}.json"> -->`)
  })
})

const keysToIgnore = ['$scolor-mode', '$serror']
