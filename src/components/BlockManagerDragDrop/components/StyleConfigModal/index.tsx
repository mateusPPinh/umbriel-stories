import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import LayoutConfig from './LayoutConfig';
import ThemeConfig from './ThemeConfig';
import MediaConfig from './MediaConfig';
import VariantConfig from './VariantConfig';

export interface BlockConfig {
  layout: {
    columns: string;
    gap: string;
    styles: {
      width: string;
      backgroundColor: string;
    }
  };
  styles: {
    theme: {
      light: ThemeConfig;
      dark: ThemeConfig;
    };
    showExcerpt: boolean;
    // Grid specific
    minCellHeight?: string;
    sidebarPosition?: 'left' | 'right';
    // List specific
    itemSpacing?: string;
    cardSize?: 'small' | 'medium' | 'large';
    // Featured specific
    heroHeight?: string;
    splitRatio?: '1:1' | '2:1' | '1:2';
  };
  mediaConfig?: {
    videoConfig?: VideoConfig;
    imageConfig?: ImageConfig;
  };
}

interface ThemeConfig {
  columnStyle: {
    background: string;
    padding: string;
  };
  headingProps: {
    fontSize: string;
    fontWeight: string;
    color: string;
  };
  subtitleProps: {
    fontSize: string;
    color: string;
  };
}

interface VideoConfig {
  autoplay: boolean;
  loop: boolean;
  muted: boolean;
  controls: boolean;
  customUrl?: string;
}

interface ImageConfig {
  fit: 'cover' | 'contain';
  position: 'center' | 'top' | 'bottom';
  overlay?: {
    enabled: boolean;
    color: string;
    opacity: number;
  };
}

interface StyleConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: BlockConfig) => void;
  currentConfig: BlockConfig;
  blockType: 'grid' | 'list' | 'featured';
  variantType: string;
}

const StyleConfigModal: React.FC<StyleConfigModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentConfig,
  blockType,
  variantType
}) => {
  const [config, setConfig] = useState<BlockConfig>(currentConfig);

  if (!isOpen) return null;

  const handleLayoutChange = (layout: BlockConfig['layout']) => {
    setConfig(prev => ({
      ...prev,
      layout
    }));
  };

  const handleLightThemeChange = (themeConfig: BlockConfig['styles']['theme']['light']) => {
    setConfig(prev => ({
      ...prev,
      styles: {
        ...prev.styles,
        theme: {
          ...prev.styles.theme,
          light: themeConfig
        }
      }
    }));
  };

  const handleDarkThemeChange = (themeConfig: BlockConfig['styles']['theme']['dark']) => {
    setConfig(prev => ({
      ...prev,
      styles: {
        ...prev.styles,
        theme: {
          ...prev.styles.theme,
          dark: themeConfig
        }
      }
    }));
  };

  const handleMediaChange = (mediaConfig: BlockConfig['mediaConfig']) => {
    setConfig(prev => ({
      ...prev,
      mediaConfig
    }));
  };

  const tabs = [
    { key: 'layout', label: 'Layout' },
    { key: 'light', label: 'Tema Claro' },
    { key: 'dark', label: 'Tema Escuro' },
    ...(blockType === 'featured' || variantType === 'video' 
      ? [{ key: 'media', label: 'Mídia' }] 
      : []
    ),
    { key: 'variant', label: 'Configurações do Variante' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-black/50 transition-opacity" 
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Configurar Estilos
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <span className="sr-only">Fechar</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <Tab.Group>
              <Tab.List className="flex space-x-1 rounded-lg bg-gray-100 dark:bg-gray-700 p-1">
                {tabs.map((tab) => (
                  <Tab
                    key={tab.key}
                    className={({ selected }: { selected: boolean }) => `
                      w-full rounded-lg py-2.5 text-sm font-medium leading-5
                      ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2
                      ${selected
                        ? 'bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-400 shadow'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-white/[0.12] hover:text-gray-800 dark:hover:text-white'
                      }
                    `}
                  >
                    {tab.label}
                  </Tab>
                ))}
              </Tab.List>

              <Tab.Panels className="mt-6">
                {/* Layout Tab */}
                <Tab.Panel>
                  <LayoutConfig
                    config={config.layout}
                    onChange={handleLayoutChange}
                  />
                </Tab.Panel>

                {/* Light Theme Tab */}
                <Tab.Panel>
                  <ThemeConfig
                    theme="light"
                    config={config.styles.theme.light}
                    onChange={handleLightThemeChange}
                  />
                </Tab.Panel>

                {/* Dark Theme Tab */}
                <Tab.Panel>
                  <ThemeConfig
                    theme="dark"
                    config={config.styles.theme.dark}
                    onChange={handleDarkThemeChange}
                  />
                </Tab.Panel>

                {/* Media Tab (conditional) */}
                {(blockType === 'featured' || variantType === 'video') && (
                  <Tab.Panel>
                    <MediaConfig
                      config={config.mediaConfig}
                      onChange={handleMediaChange}
                      showVideo={variantType === 'video'}
                    />
                  </Tab.Panel>
                )}

                {/* Variant Tab */}
                <Tab.Panel>
                  <VariantConfig
                    blockType={blockType}
                    variantType={variantType}
                    config={config}
                    onChange={setConfig}
                  />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
            >
              Cancelar
            </button>
            <button
              onClick={() => onSave(config)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleConfigModal; 