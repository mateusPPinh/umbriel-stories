import React from 'react';
import { BlockConfig } from './index';

interface VariantConfigProps {
  blockType: 'grid' | 'list' | 'featured';
  variantType: string;
  config: BlockConfig;
  onChange: (config: BlockConfig) => void;
}

const VariantConfig: React.FC<VariantConfigProps> = ({
  blockType,
  variantType,
  config,
  onChange
}) => {
  const handleShowExcerptChange = (value: boolean) => {
    onChange({
      ...config,
      styles: {
        ...config.styles,
        showExcerpt: value
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Common Settings */}
      <div>
        <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">
          Configurações Gerais
        </h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="show-excerpt"
              checked={config.styles.showExcerpt}
              onChange={(e) => handleShowExcerptChange(e.target.checked)}
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="show-excerpt" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Exibir Resumo
            </label>
          </div>
        </div>
      </div>

      {/* Grid Specific Settings */}
      {blockType === 'grid' && (
        <div>
          <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">
            Configurações de Grid
          </h3>
          <div className="space-y-4">
            {variantType === 'masonry' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Altura Mínima da Célula
                </label>
                <select
                  value={config.styles.minCellHeight || '200px'}
                  onChange={(e) => onChange({
                    ...config,
                    styles: {
                      ...config.styles,
                      minCellHeight: e.target.value
                    }
                  })}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="150px">150px</option>
                  <option value="200px">200px</option>
                  <option value="250px">250px</option>
                  <option value="300px">300px</option>
                </select>
              </div>
            )}

            {variantType === 'sidebar' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Posição da Barra Lateral
                </label>
                <select
                  value={config.styles.sidebarPosition || 'right'}
                  onChange={(e) => onChange({
                    ...config,
                    styles: {
                      ...config.styles,
                      sidebarPosition: e.target.value as 'left' | 'right'
                    }
                  })}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="left">Esquerda</option>
                  <option value="right">Direita</option>
                </select>
              </div>
            )}
          </div>
        </div>
      )}

      {/* List Specific Settings */}
      {blockType === 'list' && (
        <div>
          <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">
            Configurações de Lista
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Espaçamento entre Itens
              </label>
              <select
                value={config.styles.itemSpacing || '16px'}
                onChange={(e) => onChange({
                  ...config,
                  styles: {
                    ...config.styles,
                    itemSpacing: e.target.value
                  }
                })}
                className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="8px">8px</option>
                <option value="16px">16px</option>
                <option value="24px">24px</option>
                <option value="32px">32px</option>
              </select>
            </div>

            {variantType === 'card' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tamanho do Card
                </label>
                <select
                  value={config.styles.cardSize || 'medium'}
                  onChange={(e) => onChange({
                    ...config,
                    styles: {
                      ...config.styles,
                      cardSize: e.target.value as 'small' | 'medium' | 'large'
                    }
                  })}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="small">Pequeno</option>
                  <option value="medium">Médio</option>
                  <option value="large">Grande</option>
                </select>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Featured Specific Settings */}
      {blockType === 'featured' && (
        <div>
          <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">
            Configurações de Destaque
          </h3>
          <div className="space-y-4">
            {variantType === 'hero' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Altura do Hero
                </label>
                <select
                  value={config.styles.heroHeight || '500px'}
                  onChange={(e) => onChange({
                    ...config,
                    styles: {
                      ...config.styles,
                      heroHeight: e.target.value
                    }
                  })}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="400px">400px</option>
                  <option value="500px">500px</option>
                  <option value="600px">600px</option>
                  <option value="700px">700px</option>
                </select>
              </div>
            )}

            {variantType === 'split' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Proporção da Divisão
                </label>
                <select
                  value={config.styles.splitRatio || '1:1'}
                  onChange={(e) => onChange({
                    ...config,
                    styles: {
                      ...config.styles,
                      splitRatio: e.target.value as '1:1' | '2:1' | '1:2'
                    }
                  })}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="1:1">1:1</option>
                  <option value="2:1">2:1</option>
                  <option value="1:2">1:2</option>
                </select>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VariantConfig; 