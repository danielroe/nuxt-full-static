# Nuxt Full Static (experimental)

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions][github-actions-src]][github-actions-href]
[![Codecov][codecov-src]][codecov-href]

> Full static implementation for [Nuxt 3](https://v3.nuxtjs.org)

- [✨ &nbsp;Changelog](https://github.com/danielroe/nuxt-full-static/blob/main/CHANGELOG.md)
- [▶️ &nbsp;Online playground](https://stackblitz.com/github/danielroe/nuxt-full-static/tree/main/playground)

## Features

**⚠️ `nuxt-full-static` is a proof of concept. ⚠️**

👉 Roadmap and progress for nuxt 3 payload extraction support: [nuxt/framework#6411](https://github.com/nuxt/framework/issues/6411)

- Generates static payloads at build time if routes are prerendered
- Also works in hybrid mode, rendering payloads on the server

## Usage

```js
import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: ['nuxt-full-static'],
})
```

Automatically, all your `useAsyncData` and `useFetch` calls will be _prefilled_ with static payloads. As long as you haven't set `initialCache` or `server` to false, you should not see these functions running on client-side at all. You can even stub them out by prefixing them with `process.server &&`:

```js
const { data } = useAsyncData(() => process.server && $fetch('https://my.api.com/data'))
```

_However_, you also retain the ability to opt-out, by manually calling `refresh`. This will result in running the data fetching function again.

## 💻 Development

- Clone this repository
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable` (use `npm i -g corepack` for Node.js < 16.10)
- Install dependencies using `pnpm install`
- Stub module with `pnpm dev:prepare`
- Run `pnpm dev` to start [playground](./playground) in development mode

## License

Made with ❤️

Published under the [MIT License](./LICENCE).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nuxt-full-static?style=flat-square
[npm-version-href]: https://npmjs.com/package/nuxt-full-static
[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-full-static?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/nuxt-full-static
[github-actions-src]: https://img.shields.io/github/workflow/status/danielroe/nuxt-full-static/ci/main?style=flat-square
[github-actions-href]: https://github.com/danielroe/nuxt-full-static/actions?query=workflow%3Aci
[codecov-src]: https://img.shields.io/codecov/c/gh/danielroe/nuxt-full-static/main?style=flat-square
[codecov-href]: https://codecov.io/gh/danielroe/nuxt-full-static
