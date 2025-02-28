import React from 'react';
import { BlockConfig } from './index';

interface MediaConfigProps {
  config?: {
    videoConfig?: BlockConfig['mediaConfig']['videoConfig'];
    imageConfig?: BlockConfig['mediaConfig']['imageConfig'];
  };
  onChange: (mediaConfig: BlockConfig['mediaConfig']) => void;
  showVideo?: boolean;
}

const defaultVideoConfig: BlockConfig['mediaConfig']['videoConfig'] = {
  autoplay: false,
  loop: false,
  muted: false,
  controls: true,
  customUrl: ''
};

const defaultImageConfig: BlockConfig['mediaConfig']['imageConfig'] = {
  fit: 'cover',
  position: 'center',
  overlay: {
    enabled: false,
    color: '#000000',
    opacity: 0.5
  }
};

const MediaConfig: React.FC<MediaConfigProps> = ({ config = {}, onChange, showVideo = true }) => {
  const videoConfig = config?.videoConfig || defaultVideoConfig;
  const imageConfig = config?.imageConfig || defaultImageConfig;

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

  return (
    <div className="space-y-8">
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