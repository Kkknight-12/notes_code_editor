import * as esbuild from 'esbuild-wasm'

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      // Handle root entry file of 'index.js'
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return { path: 'index.js', namespace: 'a' }
      })

      // Handle relative paths in module
      build.onResolve({ filter: /^\.+\// }, async (args: any) => {
        const href = new URL(
          args.path,
          'https://unpkg.com' + args.resolveDir + '/',
        ).href

        return {
          namespace: 'a',
          path: href,
        }
      })

      // Handle main file of a module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`,
        }
      })
    },
  }
}