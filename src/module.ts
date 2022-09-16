import { fileURLToPath } from 'node:url'
import { addPlugin, addServerHandler, defineNuxtModule, logger, tryResolveModule } from '@nuxt/kit'
import { join } from 'pathe'
import { readPackageJSON } from 'pkg-types'
import { satisfies } from 'semver'

export default defineNuxtModule({
  meta: {
    name: 'nuxt-full-static',
    configKey: 'static',
    compatibility: {
      nuxt: '^3.0.0-rc.6',
    },
  },
  async setup(_options, nuxt) {
    const nuxtPath = tryResolveModule('nuxt')
    const { version = '' } = nuxtPath ? await readPackageJSON(nuxtPath) : {}
    if (version && satisfies(version.replace(/-(?!rc)[^-]*$/, ''), '^3.0.0-rc.10')) {
      logger.warn(
        `Nuxt 3 RC 10 now includes built-in full static support (enabled by default). You can safely remove \`nuxt-full-static\` if you are running RC 10 or higher.`
      )
    }

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
