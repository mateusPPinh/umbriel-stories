import React from 'react';
import { BlockConfig } from './index';

interface ThemeConfigProps {
  theme: 'light' | 'dark';
  config: BlockConfig['styles']['theme']['light' | 'dark'];
  onChange: (themeConfig: BlockConfig['styles']['theme']['light' | 'dark']) => void;
}

const ThemeConfig: React.FC<ThemeConfigProps> = ({ theme, config, onChange }) => {
  const handleColumnStyleChange = (key: string, value: string) => {
    onChange({
      ...config,
      columnStyle: {
        ...config.columnStyle,
        [key]: value
      }
    });
  };

  const handleHeadingChange = (key: string, value: string) => {
    onChange({
      ...config,
      headingProps: {
        ...config.headingProps,
        [key]: value
      }
    });
  };

  const handleSubtitleChange = (key: string, value: string) => {
    onChange({
      ...config,
      subtitleProps: {
        ...config.subtitleProps,
        [key]: value
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Column Style */}
      <div>
        <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">
          Estilo da Coluna
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Cor de Fundo
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={config.columnStyle.background}
                onChange={(e) => handleColumnStyleChange('background', e.target.value)}
                className="h-9 w-9 rounded border border-gray-300 dark:border-gray-600"
              />
              <input
                type="text"
                value={config.columnStyle.background}
                onChange={(e) => handleColumnStyleChange('background', e.target.value)}
                className="flex-1 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="#000000 ou transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Padding
            </label>
            <select
              value={config.columnStyle.padding}
              onChange={(e) => handleColumnStyleChange('padding', e.target.value)}
              className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="8px">8px</option>
              <option value="16px">16px</option>
              <option value="24px">24px</option>
              <option value="32px">32px</option>
            </select>
          </div>
        </div>
      </div>

      {/* Heading Props */}
      <div>
        <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">
          Estilo do Título
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tamanho da Fonte
            </label>
            <select
              value={config.headingProps.fontSize}
              onChange={(e) => handleHeadingChange('fontSize', e.target.value)}
              className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="sm">Pequeno</option>
              <option value="base">Normal</option>
              <option value="lg">Grande</option>
              <option value="xl">Extra Grande</option>
              <option value="2xl">2x Grande</option>
              <option value="3xl">3x Grande</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Peso da Fonte
            </label>
            <select
              value={config.headingProps.fontWeight}
              onChange={(e) => handleHeadingChange('fontWeight', e.target.value)}
              className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="normal">Normal</option>
              <option value="medium">Médio</option>
              <option value="semibold">Semi Negrito</option>
              <option value="bold">Negrito</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Cor
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={config.headingProps.color}
                onChange={(e) => handleHeadingChange('color', e.target.value)}
                className="h-9 w-9 rounded border border-gray-300 dark:border-gray-600"
              />
              <input
                type="text"
                value={config.headingProps.color}
                onChange={(e) => handleHeadingChange('color', e.target.value)}
                className="flex-1 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="#000000"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Subtitle Props */}
      <div>
        <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">
          Estilo do Subtítulo
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tamanho da Fonte
            </label>
            <select
              value={config.subtitleProps.fontSize}
              onChange={(e) => handleSubtitleChange('fontSize', e.target.value)}
              className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="xs">Extra Pequeno</option>
              <option value="sm">Pequeno</option>
              <option value="base">Normal</option>
              <option value="lg">Grande</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Cor
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={config.subtitleProps.color}
                onChange={(e) => handleSubtitleChange('color', e.target.value)}
                className="h-9 w-9 rounded border border-gray-300 dark:border-gray-600"
              />
              <input
                type="text"
                value={config.subtitleProps.color}
                onChange={(e) => handleSubtitleChange('color', e.target.value)}
                className="flex-1 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="#000000"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div>
        <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">
          Preview
        </h3>
        <div
          className="rounded-lg border border-gray-200 dark:border-gray-700"
          style={{
            backgroundColor: config.columnStyle.background,
            padding: config.columnStyle.padding
          }}
        >
          <div
            style={{
              fontSize: config.headingProps.fontSize,
              fontWeight: config.headingProps.fontWeight,
              color: config.headingProps.color
            }}
          >
            Título de Exemplo
          </div>
          <div
            style={{
              fontSize: config.subtitleProps.fontSize,
              color: config.subtitleProps.color,
              marginTop: '0.5rem'
            }}
          >
            Este é um subtítulo de exemplo para visualizar como ficará o estilo.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeConfig; 