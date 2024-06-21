import { fileURLToPath } from 'node:url'
import { addPlugin, addServerHandler, defineNuxtModule, logger } from '@nuxt/kit'
import { join } from 'pathe'

export default defineNuxtModule({
  meta: {
    name: 'nuxt-full-static',
    configKey: 'static',
    compatibility: {
      nuxt: '>=3.0.0-rc.6-27648600.f58aa81',
    },
  },
  setup(_options, nuxt) {
    if (!nuxt.options.ssr) {
      logger.error('`nuxt-full-static` requires ssr to be enabled.')
      return
    }

    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    addPlugin({ src: join(runtimeDir, 'plugin.server'), mode: 'server' })
    addPlugin({ src: join(runtimeDir, 'plugin.client'), mode: 'client' })

    addServerHandler({ route: '/api/_static/**', handler: join(runtimeDir, 'api') })
  },
})
