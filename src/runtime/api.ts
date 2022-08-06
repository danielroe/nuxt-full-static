// @ts-expect-error
import { defineCachedEventHandler } from '#imports'

export default defineCachedEventHandler(event => {
  const url = event.req.url.replace(/^\/api\/_static\/(index\.json)?/, '/').replace(/\.json$/, '')
  return $fetch(url, {
    responseType: 'json',
    headers: {
      ...event.req.headers,
      'x-nuxt-full-static': 'true',
    },
  })
})
