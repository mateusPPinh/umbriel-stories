// Exportando o componente principal
import BlockManagerDragDrop from './BlockManagerDragDrop';
export default BlockManagerDragDrop;

// Exportando componentes
export { default as GridManager } from './components/GridManager';
export { default as ListManager } from './components/ListManager';
export { default as MixedManager } from './components/MixedManager';
export { default as FeaturedManager } from './components/FeaturedManager';
export { default as StyleConfigModal } from './components/StyleConfigModal';
export { default as ListLayoutPreview } from './components/ListLayoutPreview';
export { default as DroppableColumn } from './components/DroppableColumn';
export { default as ArticlesPool } from './components/ArticlesPool';

// Exportando hooks
export { useBlockState } from './hooks/useBlockState';

// Exportando tipos
export type { 
  GridVariantType, 
  MixedVariantType, 
  FeaturedVariantType, 
  ListVariantType 
} from './types';
export type { BlockConfig } from './components/StyleConfigModal';

// Exportando adaptadores e tipos relacionados
export { adaptBlockConfig } from './utils/adapters';
export type { ExtendedBlockConfig } from './utils/adapters'; 