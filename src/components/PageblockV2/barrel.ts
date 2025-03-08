// Exportar componentes principais
export { default as ListBlock } from './blocks/ListBlock';

// Exportar variantes
export { default as Chronological } from './blocks/ListBlock/variants/Chronological';
export { default as CompactList } from './blocks/ListBlock/variants/CompactList';
export { default as ListWithThumbnail } from './blocks/ListBlock/variants/ListWithThumbnail';

// Importar explicitamente os estilos para garantir que o Tailwind os inclua
import './styles/grid-utils.css'; 