import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ['src/components/'],
    }),
  ],
  server: {
    open: true,
  },
  build: {
    lib: {
      entry: resolve('src', 'components/index.ts'),
      name: 'UmbrielComponents',
      fileName: (format) => `index.${format}.js`,
      formats: ['cjs', 'es', 'umd'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'styled-components'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'styled-components': 'styled',
        },
      },
    },
  },
})
