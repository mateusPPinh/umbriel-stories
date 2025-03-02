import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts';
import packageJson from './package.json' assert { type: 'json' };
import postcss from 'rollup-plugin-postcss';
import url from '@rollup/plugin-url';
import { fileURLToPath } from 'url';
import path from 'path';
// eslint-disable-next-line @typescript-eslint/naming-convention
const __filename = fileURLToPath(import.meta.url);
global.__filename = __filename;

// Extrair os diretórios dos arquivos de saída
const cjsDir = path.dirname(packageJson.main);
const esmDir = path.dirname(packageJson.module);
const cjsFilename = path.basename(packageJson.main);
const esmFilename = path.basename(packageJson.module);

export default [
  {
    input: 'src/components/index.ts',
    output: [
      {
        dir: cjsDir,
        entryFileNames: cjsFilename,
        format: 'cjs',
        sourcemap: true,
        interop: 'compat',
        exports: 'named',
        preserveModules: false,
        chunkFileNames: 'chunks/[name]-[hash].js'
      },
      {
        dir: esmDir,
        entryFileNames: esmFilename,
        format: 'esm',
        sourcemap: true,
        interop: 'compat',
        exports: 'named',
        preserveModules: false,
        chunkFileNames: 'chunks/[name]-[hash].js'
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        exclude: ['**/*.stories.tsx', '**/mocks/*.mock.*', '**/mocks/**/*.ts', '**/mock.d.ts']
      }),
      postcss({
        extensions: ['.css'],
        extract: false,
        minimize: true,
        use: [
          [
            'sass',
            {
              includePaths: ['./src/styles']
            }
          ]
        ]
      }),
      url({
        include: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.gif'],
        limit: 8192, // Inline files smaller than 8k, copy files larger than 8k
        emitFiles: true // Ensures that the files are copied to the output directory
      }),
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        output: {
          comments: false
        }
      })
    ],
    external: ['react', 'react-dom', 'styled-components']
  },
  {
    input: 'src/components/index.ts',
    output: {
      dir: 'dist',
      entryFileNames: 'index.d.ts',
      format: 'es'
    },
    plugins: [dts({
      exclude: ['**/*.stories.tsx', '**/mocks/*.mock.*', '**/mocks/**/*.ts']
    })],
    external: [/\.css$/]
  }
];
