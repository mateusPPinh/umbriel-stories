import React from 'react';
import { BlockConfig } from './index';

export interface VideoConfig {
  autoplay: boolean;
  loop: boolean;
  muted: boolean;
  controls: boolean;
  customUrl?: string;
}

export interface ImageConfig {
  fit: 'cover' | 'contain';
  position: 'center' | 'top' | 'bottom';
  overlay: {
    enabled: boolean;
    color: string;
    opacity: number;
  };
}

export interface DisplayConfig {
  showImage: boolean;
  showSubtitle: boolean;
  showPublishDate: boolean;
  showAuthor: boolean;
  showCategory: boolean;
  
  columnConfig?: {
    [columnId: string]: {
      showImage?: boolean;
      showSubtitle?: boolean;
      showPublishDate?: boolean;
      showAuthor?: boolean;
      showCategory?: boolean;
    }
  };
}

// Tipo para as chaves da interface DisplayConfig
type DisplayConfigKey = keyof Omit<DisplayConfig, 'columnConfig'>;

interface MediaConfigProps {
  config?: {
    videoConfig?: VideoConfig;
    imageConfig?: ImageConfig;
    displayConfig?: DisplayConfig;
  };
  onChange: (mediaConfig: BlockConfig['mediaConfig']) => void;
  showVideo?: boolean;
  variant?: string;
  blockType?: string;
}

const defaultVideoConfig: VideoConfig = {
  autoplay: false,
  loop: false,
  muted: false,
  controls: true,
  customUrl: ''
};

const defaultImageConfig: ImageConfig = {
  fit: 'cover',
  position: 'center',
  overlay: {
    enabled: false,
    color: '#000000',
    opacity: 0.5
  }
};

const defaultDisplayConfig: DisplayConfig = {
  showImage: true,
  showSubtitle: true,
  showPublishDate: true,
  showAuthor: true,
  showCategory: true,
  columnConfig: {}
};

const MediaConfig: React.FC<MediaConfigProps> = ({ 
  config = {}, 
  onChange, 
  showVideo = true,
  variant = 'sidebar',
  blockType = 'mixed'
}) => {
  const videoConfig = config?.videoConfig || defaultVideoConfig;
  const imageConfig = config?.imageConfig || defaultImageConfig;
  const displayConfig = config?.displayConfig || defaultDisplayConfig;

  // Adicionar logs para diagnóstico
  console.log('MediaConfig props:', { blockType, variant });

  const handleVideoChange = (key: string, value: boolean | string) => {
    onChange({
      ...config,
      videoConfig: {
        ...videoConfig,
        [key]: value
      }
    });
  };

  const handleImageChange = (key: string, value: string) => {
    onChange({
      ...config,
      imageConfig: {
        ...imageConfig,
        [key]: value
      }
    });
  };

  const handleOverlayChange = (key: string, value: string | number | boolean) => {
    onChange({
      ...config,
      imageConfig: {
        ...imageConfig,
        overlay: {
          ...imageConfig.overlay,
          [key]: value
        }
      }
    });
  };

  const handleDisplayChange = (key: DisplayConfigKey, value: boolean) => {
    // Obter as colunas disponíveis
    const columnLabels = getColumnLabels();
    
    // Criar um novo objeto columnConfig que preserva as configurações específicas
    // mas atualiza apenas as colunas que estão usando o valor global como fallback
    const updatedColumnConfig = { ...displayConfig.columnConfig };
    
    // Para cada coluna, verificar se ela tem uma configuração específica para esta propriedade
    columnLabels.forEach(column => {
      const columnId = column.id;
      const columnConfig = updatedColumnConfig[columnId] || {};
      
      // Se a coluna não tiver uma configuração específica para esta propriedade,
      // ou se a configuração for igual ao valor global anterior, atualize-a
      if (columnConfig[key] === undefined || columnConfig[key] === displayConfig[key]) {
        updatedColumnConfig[columnId] = {
          ...columnConfig,
          [key]: value
        };
      }
    });
    
    // Atualizar a configuração global e as configurações específicas por coluna
    onChange({
      ...config,
      displayConfig: {
        ...displayConfig,
        [key]: value,
        columnConfig: updatedColumnConfig
      }
    });
  };

  const handleColumnDisplayChange = (columnId: string, key: DisplayConfigKey, value: boolean) => {
    onChange({
      ...config,
      displayConfig: {
        ...displayConfig,
        columnConfig: {
          ...displayConfig.columnConfig,
          [columnId]: {
            ...(displayConfig.columnConfig?.[columnId] || {}),
            [key]: value
          }
        }
      }
    });
  };

  // Função para redefinir as configurações específicas de uma coluna para os valores globais
  const resetColumnConfig = (columnId: string) => {
    if (!displayConfig.columnConfig || !displayConfig.columnConfig[columnId]) {
      return; // Nada a redefinir
    }
    
    const updatedColumnConfig = { ...displayConfig.columnConfig };
    delete updatedColumnConfig[columnId]; // Remove as configurações específicas desta coluna
    
    onChange({
      ...config,
      displayConfig: {
        ...displayConfig,
        columnConfig: updatedColumnConfig
      }
    });
  };

  // Verifica se uma coluna tem configurações personalizadas
  const hasCustomConfig = (columnId: string) => {
    return displayConfig.columnConfig && 
           displayConfig.columnConfig[columnId] && 
           Object.keys(displayConfig.columnConfig[columnId]).length > 0;
  };

  // Determina as colunas disponíveis com base no tipo de bloco e variante
  const getColumnLabels = () => {
    // Mapear variantes específicas para os tipos de layout que conhecemos
    const mapVariantToLayout = (variant: string): string => {
      // Converter para minúsculas para comparação case-insensitive
      const lowerVariant = variant.toLowerCase();
      
      if (lowerVariant.includes('sidebar')) return 'sidebar';
      if (lowerVariant.includes('showcase')) return 'showcase';
      if (lowerVariant.includes('newspaper')) return 'newspaper';
      if (lowerVariant.includes('magazine')) return 'magazine';
      if (lowerVariant.includes('video') || lowerVariant.includes('videogrid')) return 'videogrid';
      
      // Se não conseguirmos mapear, retornamos o padrão 'sidebar'
      return 'sidebar';
    };
    
    // Obter o layout mapeado
    const mappedVariant = mapVariantToLayout(variant);
    
    if (blockType === 'mixed') {
      switch (mappedVariant) {
        case 'sidebar':
          return [
            { id: 'col-0', label: 'Artigo Principal' },
            { id: 'col-1', label: 'Artigos da Barra Lateral' }
          ];
        case 'showcase':
          return [
            { id: 'col-0', label: 'Artigo Principal' },
            { id: 'col-1', label: 'Artigos em Grid' },
            { id: 'col-2', label: 'Artigos em Lista' }
          ];
        case 'newspaper':
          return [
            { id: 'col-0', label: 'Artigos Principais' },
            { id: 'col-1', label: 'Artigos Secundários' },
            { id: 'col-2', label: 'Artigos Terciários' }
          ];
        case 'magazine':
          return [
            { id: 'col-0', label: 'Artigo Principal' },
            { id: 'col-1', label: 'Artigos Secundários' },
            { id: 'col-2', label: 'Artigos Terciários' }
          ];
        case 'videogrid':
          return [
            { id: 'col-0', label: 'Vídeo Principal' },
            { id: 'col-1', label: 'Vídeos Secundários' },
            { id: 'col-2', label: 'Vídeos Terciários' }
          ];
        default:
          // Fallback para pelo menos uma coluna
          return [{ id: 'col-0', label: 'Artigos' }];
      }
    } else if (blockType === 'list') {
      return [{ id: 'col-0', label: 'Artigos da Lista' }];
    } else if (blockType === 'grid') {
      return [{ id: 'col-0', label: 'Todos os Artigos' }];
    } else if (blockType === 'featured') {
      return [
        { id: 'col-0', label: 'Artigo Principal' },
        { id: 'col-1', label: 'Artigos Secundários' }
      ];
    }
    
    // Fallback para pelo menos uma coluna
    return [{ id: 'col-0', label: 'Artigos' }];
  };

  const columnLabels = getColumnLabels();
  
  // Adicionar log para verificar as colunas disponíveis
  console.log('Colunas disponíveis:', columnLabels);

  // Função para aplicar as mesmas configurações a todas as colunas
  const applyToAllColumns = () => {
    const columnLabels = getColumnLabels();
    const updatedColumnConfig = { ...displayConfig.columnConfig };
    
    // Para cada coluna, aplicar as configurações globais atuais
    columnLabels.forEach(column => {
      updatedColumnConfig[column.id] = {
        showImage: displayConfig.showImage,
        showSubtitle: displayConfig.showSubtitle,
        showPublishDate: displayConfig.showPublishDate,
        showAuthor: displayConfig.showAuthor,
        showCategory: displayConfig.showCategory
      };
    });
    
    onChange({
      ...config,
      displayConfig: {
        ...displayConfig,
        columnConfig: updatedColumnConfig
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Display Configuration */}
      <div>
        <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">
          Configurações Globais de Exibição
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="show-image"
              checked={displayConfig.showImage}
              onChange={(e) => handleDisplayChange('showImage', e.target.checked)}
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="show-image" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Mostrar Imagem
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="show-subtitle"
              checked={displayConfig.showSubtitle}
              onChange={(e) => handleDisplayChange('showSubtitle', e.target.checked)}
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="show-subtitle" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Mostrar Subtítulo
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="show-publish-date"
              checked={displayConfig.showPublishDate}
              onChange={(e) => handleDisplayChange('showPublishDate', e.target.checked)}
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="show-publish-date" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Mostrar Data de Publicação
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="show-author"
              checked={displayConfig.showAuthor}
              onChange={(e) => handleDisplayChange('showAuthor', e.target.checked)}
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="show-author" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Mostrar Autor
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="show-category"
              checked={displayConfig.showCategory}
              onChange={(e) => handleDisplayChange('showCategory', e.target.checked)}
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="show-category" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Mostrar Categoria
            </label>
          </div>
        </div>
      </div>

      {/* Column-specific Display Configuration */}
      {columnLabels.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-medium text-gray-900 dark:text-white">
              Configurações Específicas por Coluna
            </h3>
            
            <button
              type="button"
              onClick={applyToAllColumns}
              className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Aplicar configurações a todas as colunas
            </button>
          </div>
          
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-4 text-sm text-blue-800 dark:text-blue-200">
            <p>
              <strong>Dica:</strong> As configurações específicas por coluna permitem personalizar a exibição de elementos para cada coluna individualmente.
            </p>
            <p className="mt-1">
              • Quando você altera uma configuração global, todas as colunas que não têm configurações específicas são atualizadas automaticamente.<br />
              • Configurações personalizadas são destacadas em azul e marcadas como "(personalizado)".<br />
              • Use o botão "Redefinir para padrão" para voltar às configurações globais em uma coluna específica.
            </p>
          </div>
          
          <div className="space-y-6">
            {columnLabels.map(column => (
              <div key={column.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {column.label}
                  </h4>
                  
                  {hasCustomConfig(column.id) && (
                    <button
                      type="button"
                      onClick={() => resetColumnConfig(column.id)}
                      className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Redefinir para padrão
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`${column.id}-show-image`}
                      checked={displayConfig.columnConfig?.[column.id]?.showImage ?? displayConfig.showImage}
                      onChange={(e) => handleColumnDisplayChange(column.id, 'showImage', e.target.checked)}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <label 
                      htmlFor={`${column.id}-show-image`} 
                      className={`ml-2 text-sm ${
                        displayConfig.columnConfig?.[column.id]?.showImage !== undefined && 
                        displayConfig.columnConfig[column.id].showImage !== displayConfig.showImage
                          ? 'font-medium text-blue-600 dark:text-blue-400'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      Mostrar Imagem
                      {displayConfig.columnConfig?.[column.id]?.showImage !== undefined && 
                       displayConfig.columnConfig[column.id].showImage !== displayConfig.showImage && 
                       ' (personalizado)'}
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`${column.id}-show-subtitle`}
                      checked={displayConfig.columnConfig?.[column.id]?.showSubtitle ?? displayConfig.showSubtitle}
                      onChange={(e) => handleColumnDisplayChange(column.id, 'showSubtitle', e.target.checked)}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <label 
                      htmlFor={`${column.id}-show-subtitle`} 
                      className={`ml-2 text-sm ${
                        displayConfig.columnConfig?.[column.id]?.showSubtitle !== undefined && 
                        displayConfig.columnConfig[column.id].showSubtitle !== displayConfig.showSubtitle
                          ? 'font-medium text-blue-600 dark:text-blue-400'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      Mostrar Subtítulo
                      {displayConfig.columnConfig?.[column.id]?.showSubtitle !== undefined && 
                       displayConfig.columnConfig[column.id].showSubtitle !== displayConfig.showSubtitle && 
                       ' (personalizado)'}
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`${column.id}-show-publish-date`}
                      checked={displayConfig.columnConfig?.[column.id]?.showPublishDate ?? displayConfig.showPublishDate}
                      onChange={(e) => handleColumnDisplayChange(column.id, 'showPublishDate', e.target.checked)}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <label 
                      htmlFor={`${column.id}-show-publish-date`} 
                      className={`ml-2 text-sm ${
                        displayConfig.columnConfig?.[column.id]?.showPublishDate !== undefined && 
                        displayConfig.columnConfig[column.id].showPublishDate !== displayConfig.showPublishDate
                          ? 'font-medium text-blue-600 dark:text-blue-400'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      Mostrar Data de Publicação
                      {displayConfig.columnConfig?.[column.id]?.showPublishDate !== undefined && 
                       displayConfig.columnConfig[column.id].showPublishDate !== displayConfig.showPublishDate && 
                       ' (personalizado)'}
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`${column.id}-show-author`}
                      checked={displayConfig.columnConfig?.[column.id]?.showAuthor ?? displayConfig.showAuthor}
                      onChange={(e) => handleColumnDisplayChange(column.id, 'showAuthor', e.target.checked)}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <label 
                      htmlFor={`${column.id}-show-author`} 
                      className={`ml-2 text-sm ${
                        displayConfig.columnConfig?.[column.id]?.showAuthor !== undefined && 
                        displayConfig.columnConfig[column.id].showAuthor !== displayConfig.showAuthor
                          ? 'font-medium text-blue-600 dark:text-blue-400'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      Mostrar Autor
                      {displayConfig.columnConfig?.[column.id]?.showAuthor !== undefined && 
                       displayConfig.columnConfig[column.id].showAuthor !== displayConfig.showAuthor && 
                       ' (personalizado)'}
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`${column.id}-show-category`}
                      checked={displayConfig.columnConfig?.[column.id]?.showCategory ?? displayConfig.showCategory}
                      onChange={(e) => handleColumnDisplayChange(column.id, 'showCategory', e.target.checked)}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <label 
                      htmlFor={`${column.id}-show-category`} 
                      className={`ml-2 text-sm ${
                        displayConfig.columnConfig?.[column.id]?.showCategory !== undefined && 
                        displayConfig.columnConfig[column.id].showCategory !== displayConfig.showCategory
                          ? 'font-medium text-blue-600 dark:text-blue-400'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      Mostrar Categoria
                      {displayConfig.columnConfig?.[column.id]?.showCategory !== undefined && 
                       displayConfig.columnConfig[column.id].showCategory !== displayConfig.showCategory && 
                       ' (personalizado)'}
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Video Configuration */}
      {showVideo && (
        <div>
          <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">
            Configurações de Vídeo
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="autoplay"
                  checked={videoConfig.autoplay}
                  onChange={(e) => handleVideoChange('autoplay', e.target.checked)}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="autoplay" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Autoplay
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="loop"
                  checked={videoConfig.loop}
                  onChange={(e) => handleVideoChange('loop', e.target.checked)}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="loop" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Loop
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="muted"
                  checked={videoConfig.muted}
                  onChange={(e) => handleVideoChange('muted', e.target.checked)}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="muted" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Mudo
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="controls"
                  checked={videoConfig.controls}
                  onChange={(e) => handleVideoChange('controls', e.target.checked)}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="controls" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Controles
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                URL Personalizada
              </label>
              <input
                type="text"
                value={videoConfig.customUrl}
                onChange={(e) => handleVideoChange('customUrl', e.target.value)}
                className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="https://exemplo.com/video.mp4"
              />
            </div>
          </div>
        </div>
      )}

      {/* Image Configuration */}
      <div>
        <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">
          Configurações de Imagem
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Ajuste
              </label>
              <select
                value={imageConfig.fit}
                onChange={(e) => handleImageChange('fit', e.target.value as 'cover' | 'contain')}
                className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="cover">Cover</option>
                <option value="contain">Contain</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Posição
              </label>
              <select
                value={imageConfig.position}
                onChange={(e) => handleImageChange('position', e.target.value as 'center' | 'top' | 'bottom')}
                className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="center">Centro</option>
                <option value="top">Topo</option>
                <option value="bottom">Base</option>
              </select>
            </div>
          </div>

          {/* Overlay Configuration */}
          <div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="overlay-enabled"
                checked={imageConfig.overlay.enabled}
                onChange={(e) => handleOverlayChange('enabled', e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="overlay-enabled" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Habilitar Overlay
              </label>
            </div>

            {imageConfig.overlay.enabled && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Cor do Overlay
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={imageConfig.overlay.color}
                      onChange={(e) => handleOverlayChange('color', e.target.value)}
                      className="h-9 w-9 rounded border border-gray-300 dark:border-gray-600"
                    />
                    <input
                      type="text"
                      value={imageConfig.overlay.color}
                      onChange={(e) => handleOverlayChange('color', e.target.value)}
                      className="flex-1 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="#000000"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Opacidade
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={imageConfig.overlay.opacity * 100}
                    onChange={(e) => handleOverlayChange('opacity', parseInt(e.target.value) / 100)}
                    className="w-full"
                  />
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {Math.round(imageConfig.overlay.opacity * 100)}%
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preview */}
      <div>
        <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">
          Preview
        </h3>
        <div className="relative h-48 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
          <img
            src="https://via.placeholder.com/800x400"
            alt="Preview"
            className="w-full h-full"
            style={{
              objectFit: imageConfig.fit,
              objectPosition: imageConfig.position
            }}
          />
          {imageConfig.overlay.enabled && (
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: imageConfig.overlay.color,
                opacity: imageConfig.overlay.opacity
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaConfig; 