import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.hook('app:rendered', ({ ssrContext }) => {
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
    const url = ssrContext.url === '/' ? '/index' : ssrContext.url
    ssrContext.event.res.setHeader('x-nitro-prerender', `/api/_static${url}.json`)
  })
})

const keysToIgnore = ['$scolor-mode', '$serror']
