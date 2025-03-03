import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';
import packageJson from './package.json' assert { type: 'json' };
import postcss from 'rollup-plugin-postcss';
import url from '@rollup/plugin-url';
import { fileURLToPath } from 'url';
import path from 'path';
import esbuild from 'rollup-plugin-esbuild';

const __filename = fileURLToPath(import.meta.url);
global.__filename = __filename;

// Extrair os diretórios dos arquivos de saída
const cjsDir = path.dirname(packageJson.main);
const esmDir = path.dirname(packageJson.module);
const cjsFilename = path.basename(packageJson.main);
const esmFilename = path.basename(packageJson.module);

// List of font packages to be treated as external
const fontPackages = [
  '@fontsource/roboto',
  '@fontsource-variable/roboto-condensed',
  '@fontsource-variable/noto-sans',
  '@fontsource-variable/rubik',
  '@fontsource-variable/lora',
  '@fontsource-variable/inter',
  '@fontsource-variable/dm-sans',
];

const external = [
  'react', 
  'react-dom', 
  'styled-components',
  'react-modal',
  ...fontPackages,
  '@radix-ui/react-dialog',
  'lucide-react',
  '@hello-pangea/dnd',
  'class-variance-authority',
  'clsx',
  'tailwind-merge',
  'react-intersection-observer',
  'yet-another-react-lightbox',
  'embla-carousel-react',
  'embla-carousel-autoplay',
  'react-photo-album',
  'react-image',
  'react-spinners',
  'date-fns',
  'axios',
  'lodash',
  '@headlessui/react'
];

export default [
  {
    input: 'src/components/index.ts',
    output: [
      {
        dir: cjsDir,
        entryFileNames: cjsFilename,
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
        interop: 'auto',
        preserveModules: true,
        preserveModulesRoot: 'src'
      },
      {
        dir: esmDir,
        entryFileNames: esmFilename,
        format: 'esm',
        sourcemap: true,
        exports: 'named',
        preserveModules: true,
        preserveModulesRoot: 'src'
      }
    ],
    plugins: [
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        dedupe: ['react', 'react-dom'],
        preferBuiltins: true
      }),
      commonjs({
        include: /node_modules/
      }),
      esbuild({
        tsconfig: './tsconfig.json',
        exclude: ['**/*.stories.tsx', '**/mocks/*.mock.*', '**/mocks/**/*.ts', '**/mock.d.ts'],
        minify: true,
        target: 'es2015',
        jsx: 'automatic',
        jsxFactory: 'React.createElement',
        jsxFragment: 'React.Fragment'
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
        ],
        inject: true
      }),
      url({
        include: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.gif'],
        limit: 8192,
        emitFiles: true
      }),
      terser()
    ],
    external
  },
  {
    input: 'src/components/index.ts',
    output: {
      file: packageJson.types,
      format: 'es'
    },
    plugins: [
      dts({
        respectExternal: true,
        tsconfig: './tsconfig.json'
      })
    ],
    external: [/\.css$/, /\.scss$/, ...external]
  }
];