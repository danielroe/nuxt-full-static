import type { NuxtApp } from '#app'
import type { RouteLocationRaw } from 'vue-router'
import { defineNuxtPlugin, useRouter, useRoute } from '#imports'

type StaticData = Pick<NuxtApp['payload'], 'data' | 'state'>

export default defineNuxtPlugin(nuxtApp => {
  const router = useRouter()
  const route = useRoute()
  const resolve = (route: string | RouteLocationRaw) =>
    typeof route === 'string' ? route : router.resolve(route).path

  const s = {
    prefetched: new Set<string>([route.path]),
    prefetch: async (route: string | RouteLocationRaw) => {
      const path = resolve(route)

      if (!s.prefetched.has(path)) {
        s.prefetched.add(path)

        const name = path === '/' ? '/index' : path
        const { data, state } = await $fetch<StaticData>(`/api/_static${name}.json`)

        // Override data
        Object.assign(nuxtApp.payload.data, data)
        for (const item in state) {
          // ... but only provide initial state values
          nuxtApp.payload.state[item] ??= state[item]
        }
      }
    },
  }

  router.beforeResolve(to => s.prefetch(to.path))

  return {
    provide: { static: s },
  }
})
