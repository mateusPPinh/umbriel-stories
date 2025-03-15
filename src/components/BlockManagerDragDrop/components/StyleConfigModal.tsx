export interface BlockConfig {
  layout: {
    columns: string;
    gap: string;
    padding?: string;
    styles: {
      width: string;
      backgroundColor: string;
    };
    responsive?: {
      mobile: number;
      tablet: number;
      desktop: number;
    };
  };
  styles: {
    featuredImageOverlay?: any;
    theme: {
      light: {
        columnStyle: {
          background: string;
          padding: string;
        };
        headingProps: {
          fontSize: string;
          fontWeight: string;
          color: string;
          fontFamily?: string;
        };
        subtitleProps: {
          fontSize: string;
          color: string;
          fontFamily?: string;
        };
        timelineProps?: {
          color: string;
          width: string;
          markerSize: string;
          markerColor: string;
        };
      };
      dark: {
        columnStyle: {
          background: string;
          padding: string;
        };
        headingProps: {
          fontSize: string;
          fontWeight: string;
          color: string;
          fontFamily?: string;
        };
        subtitleProps: {
          fontSize: string;
          color: string;
          fontFamily?: string;
        };
        timelineProps?: {
          color: string;
          width: string;
          markerSize: string;
          markerColor: string;
        };
      };
    };
    showExcerpt?: boolean;
    showMetadata?: boolean;
    showDate?: boolean;
    timelineStyle?: string;
    markerStyle?: string;
    hoverEffect?: string;
  };
  metadata?: {
    title?: string;
    description?: string;
  };
  mediaConfig?: {
    displayConfig?: {
      showImage?: boolean;
      showSubtitle?: boolean;
      showPublishDate?: boolean;
      showAuthor?: boolean;
      showCategory?: boolean;
      columnConfig?: {
        [columnId: string]: {
          showImage?: boolean;
          showSubtitle?: boolean;
          showPublishDate?: boolean;
          showAuthor?: boolean;
          showCategory?: boolean;
        }
      };
    };
    imageConfig?: {
      fit?: string;
      position?: string;
      overlay?: {
        enabled?: boolean;
        color?: string;
        opacity?: number;
      };
    };
    type?: string;
    customUrl?: string;
    videoConfig?: {
      loop?: boolean;
      muted?: boolean;
      autoplay?: boolean;
      controls?: boolean;
    };
    useArticleMedia?: boolean;
  };
  variant?: string;
}

import React, { useState } from 'react';

interface StyleConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: BlockConfig) => void;
  currentConfig: BlockConfig;
  blockType: 'grid' | 'list' | 'mixed' | 'featured';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(config);
  };

  const updateConfig = (path: string, value: any) => {
    const newConfig = { ...config };
    const keys = path.split('.');
    let current: any = newConfig;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    setConfig(newConfig);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Configuração de Estilo - {blockType.charAt(0).toUpperCase() + blockType.slice(1)} ({variantType})
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Layout Section */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Layout</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Colunas
                </label>
                <select
                  value={config.layout.columns}
                  onChange={(e) => updateConfig('layout.columns', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                >
                  <option value="1">1 Coluna</option>
                  <option value="2">2 Colunas</option>
                  <option value="3">3 Colunas</option>
                  <option value="4">4 Colunas</option>
                  <option value="6">6 Colunas</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Espaçamento
                </label>
                <select
                  value={config.layout.gap}
                  onChange={(e) => updateConfig('layout.gap', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                >
                  <option value="0">Sem espaçamento</option>
                  <option value="2">Pequeno (8px)</option>
                  <option value="4">Médio (16px)</option>
                  <option value="6">Grande (24px)</option>
                  <option value="8">Extra grande (32px)</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Padding
                </label>
                <input
                  type="text"
                  value={config.layout.padding || '0px'}
                  onChange={(e) => updateConfig('layout.padding', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                  placeholder="ex: 16px ou 1rem"
                />
              </div>
            </div>
            
            {/* Styles Section */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Estilos</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Mostrar Resumo
                </label>
                <input
                  type="checkbox"
                  checked={config.styles.showExcerpt || false}
                  onChange={(e) => updateConfig('styles.showExcerpt', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Mostrar Metadados
                </label>
                <input
                  type="checkbox"
                  checked={config.styles.showMetadata || false}
                  onChange={(e) => updateConfig('styles.showMetadata', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Mostrar Data
                </label>
                <input
                  type="checkbox"
                  checked={config.styles.showDate || false}
                  onChange={(e) => updateConfig('styles.showDate', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Efeito de Hover
                </label>
                <select
                  value={config.styles.hoverEffect || 'none'}
                  onChange={(e) => updateConfig('styles.hoverEffect', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                >
                  <option value="none">Nenhum</option>
                  <option value="highlight">Destaque</option>
                  <option value="scale">Escala</option>
                  <option value="translate">Translação</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Metadata Section */}
          <div className="mt-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Metadados</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Título
              </label>
              <input
                type="text"
                value={config.metadata?.title || ''}
                onChange={(e) => updateConfig('metadata.title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                placeholder="Título do bloco"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Descrição
              </label>
              <textarea
                value={config.metadata?.description || ''}
                onChange={(e) => updateConfig('metadata.description', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                rows={3}
                placeholder="Descrição do bloco"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StyleConfigModal; 