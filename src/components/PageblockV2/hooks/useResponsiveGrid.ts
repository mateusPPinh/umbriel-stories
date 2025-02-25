import { useResponsiveDevice } from '../contexts/ResponsiveDeviceContext';
import { BlockConfig } from '../types';

export const useResponsiveGrid = (config: BlockConfig) => {
  const { deviceType } = useResponsiveDevice();

  const getGridColumns = () => {
    const cols = config.layout.responsive[deviceType];
    return `grid-cols-${cols}`;
  };

  const getGapClass = () => {
    const gap = config.layout.gap.replace('px', '');
    return `gap-${gap}`;
  };

  const getPaddingClass = () => {
    if (!config.layout.padding) return '';
    const padding = config.layout.padding.replace('px', '');
    return `p-${padding}`;
  };

  return {
    gridColumns: getGridColumns(),
    gapClass: getGapClass(),
    paddingClass: getPaddingClass(),
    deviceType
  };
}; 