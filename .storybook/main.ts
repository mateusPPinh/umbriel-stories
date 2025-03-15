import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'

const config: StorybookConfig = {
  stories: [
    '../src/components/**/stories/*.stories.@(js|jsx|ts|tsx)',
    '../src/components/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-theme-provider',
    '@storybook/addon-viewport'
  ],
  core: {
    builder: '@storybook/builder-vite',
  },
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  staticDirs: ['../public'],
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: [
          {
            find: /^storybook\/internal\/(.*)/,
            replacement: '@storybook/$1'
          }
        ]
      },
      optimizeDeps: {
        include: [
          '@storybook/addon-viewport',
          '@storybook/theming',
          '@storybook/components',
          '@storybook/preview-api',
          '@storybook/manager-api',
          '@storybook/icons'
        ]
      }
    })
  }
}

export default config
