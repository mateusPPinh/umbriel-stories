import React from 'react';
import { BlockConfig } from './index';

interface LayoutConfigProps {
  config: BlockConfig['layout'];
  onChange: (layout: BlockConfig['layout']) => void;
}

const LayoutConfig: React.FC<LayoutConfigProps> = ({ config, onChange }) => {
  const handleChange = (key: string, value: string) => {
    onChange({
      ...config,
      [key]: value
    });
  };

  const handleStyleChange = (key: string, value: string) => {
    onChange({
      ...config,
      styles: {
        ...config.styles,
        [key]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {/* Colunas */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Número de Colunas
          </label>
          <select
            value={config.columns}
            onChange={(e) => handleChange('columns', e.target.value)}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} {i === 0 ? 'coluna' : 'colunas'}
              </option>
            ))}
          </select>
        </div>

        {/* Gap */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Espaçamento entre Colunas
          </label>
          <select
            value={config.gap}
            onChange={(e) => handleChange('gap', e.target.value)}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="16px">16px</option>
            <option value="24px">24px</option>
            <option value="32px">32px</option>
            <option value="48px">48px</option>
          </select>
        </div>

        {/* Width */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Largura do Container
          </label>
          <select
            value={config.styles.width}
            onChange={(e) => handleStyleChange('width', e.target.value)}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="100%">100% (Full)</option>
            <option value="75%">75%</option>
            <option value="50%">50%</option>
          </select>
        </div>

        {/* Background Color */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Cor de Fundo
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              value={config.styles.backgroundColor}
              onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
              className="h-9 w-9 rounded border border-gray-300 dark:border-gray-600"
            />
            <input
              type="text"
              value={config.styles.backgroundColor}
              onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
              className="flex-1 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="#000000 ou transparent"
            />
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Preview
        </h3>
        <div
          className="p-4 rounded-lg border border-gray-200 dark:border-gray-700"
          style={{
            width: config.styles.width,
            backgroundColor: config.styles.backgroundColor,
          }}
        >
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: `repeat(${config.columns}, minmax(0, 1fr))`,
              gap: config.gap,
            }}
          >
            {[...Array(Number(config.columns))].map((_, i) => (
              <div
                key={i}
                className="aspect-[16/10] rounded bg-gray-200 dark:bg-gray-700"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutConfig; 