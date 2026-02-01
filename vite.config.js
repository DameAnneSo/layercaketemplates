import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import dsv from '@rollup/plugin-dsv'
import path from 'path'

export default defineConfig({
  build: { outDir: 'public' },
  base: './',
  plugins: [dsv(), svelte({})],
  resolve: {
    alias: {
      "$components": path.resolve('./src/components'),
      "$data": path.resolve("./src/data"),
      "$routes": path.resolve("./src/routes"),
    }
  },
  server: {
    port: 5000
  },
  
})

