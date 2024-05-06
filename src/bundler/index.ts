import * as esbuild from 'esbuild-wasm'
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin'
import { fetchPlugin } from './plugins/fetch-plugin'

let initialize: boolean = false

export default async function bundle(rawCode: string) {
  if (!initialize) {
    await esbuild.initialize({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.20.2/esbuild.wasm',
    })
    initialize = true
  }

  try {
    const result = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
      jsxFactory: '_React.createElement',
      jsxFragment: '_React.Fragment',
    })

    // return result.outputFiles[0].text
    return {
      code: result.outputFiles[0].text,
      err: '',
    }
  } catch (err) {
    if (err instanceof Error) {
      return {
        code: '',
        err: err.message,
      }
    } else {
      throw err
    }
  }
}
