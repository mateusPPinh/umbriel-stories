import { Article } from '../PageblockV2/types';

export type BlockType = 'articles';
export type TemplateType = 'featured' | 'grid' | 'list' | 'mixed';

// Variantes do Featured
export type FeaturedVariantType = 'hero' | 'split' | 'triple';

// Variantes do Grid
export type GridVariantType = 'standard' | 'featured' | 'masonry' | 'sidebargrid' | 'newsfeed' | 'newsgrid';

// Variantes do List
export type ListVariantType = 'chronological' | 'compact' | 'card';

// Variantes do Mixed
export type MixedVariantType = 'sidebar' | 'showcase' | 'newspaper' | 'magazine' | 'videogrid';

// Todas as variantes possíveis
export type VariantType = FeaturedVariantType | GridVariantType | ListVariantType | MixedVariantType;

export interface ColumnStyle {
  background: string;
  padding: string;
}

export interface ThemeProps {
  fontSize: string;
  fontWeight?: string;
  color: string;
  fontFamily: string;
}

export interface ThemeConfig {
  columnStyle: ColumnStyle;
  headingProps: ThemeProps;
  subtitleProps: ThemeProps;
}

export interface StyleConfig {
  theme: {
    light: ThemeConfig;
    dark: ThemeConfig;
  };
  showExcerpt: boolean;
}

export interface LayoutConfig {
  columns: string;
  gap: string;
  styles: {
    width: string;
    backgroundColor: string;
  };
}

export interface MediaConfig {
  videoConfig?: {
    autoplay: boolean;
    loop: boolean;
    muted: boolean;
    controls: boolean;
    customUrl?: string;
  };
  imageConfig?: {
    fit?: 'cover' | 'contain';
    position?: 'center' | 'top' | 'bottom';
    overlay?: {
      enabled: boolean;
      color: string;
      opacity: number;
    };
  };
}

export interface BlockConfig {
  layout: LayoutConfig;
  articles: {
    [key: string]: string[];
  };
  mediaConfig?: MediaConfig;
  styles: StyleConfig;
}

export interface BlockVariant {
  variantType: VariantType;
  variantPosition: number;
  config: BlockConfig;
}

export interface PageBlock {
  pageId?: string;
  editorialId?: string;
  subEditorialId?: string;
  blockType: BlockType;
  blockPosition: number;
  template: TemplateType;
  variants: BlockVariant[];
  pageData?: any;
  editorialsData?: any;
}

// Interface para o estado local que será usado no componente
export interface LocalBlockState extends Omit<PageBlock, 'variants'> {
  currentVariant: BlockVariant;
  articles: {
    [key: string]: Article[];
  };
}

export interface Column {
  id: string;
  title: string;
  width?: string;
}

export interface GridLayout {
  container: string;
  grid?: string;
  wrapper?: string;
}

export interface GridVariant {
  id: string;
  title: string;
  maxItems: number;
  columns: Column[];
  layout: GridLayout;
}

// Filters for articles
export interface ArticleFilters {
  hasImage: boolean;
  limit: number;
  searchTerm: string;
  search: string;
  page: string;
  editorial: string;
  subEditorial: string;
  isMultiSelectEnabled: boolean;
}

export interface ClientTheme {
  fontMapping: {
    pageblockTitle: string;
    pageblockSubtitle: string;
    pageblockText: string;
  };
  colorMapping: {
    light: {
      pageblockTitle: string;
      pageblockSubtitle: string;
      pageblockText: string;
    };
    dark: {
      pageblockTitle: string;
      pageblockSubtitle: string;
      pageblockText: string;
    };
  };
  fontSize?: {
    pageblockTitle: string;
    pageblockSubtitle: string;
    pageblockText: string;
  };
}

export interface ClientThemeV2 {
  fontMapping: {
    pageblockTitle: string;
    pageblockSubtitle: string;
    pageblockText: string;
  };
  colorMapping: {
    light: {
      pageblockTitle: string;
      pageblockSubtitle: string;
      pageblockText: string;
    };
    dark: {
      pageblockTitle: string;
      pageblockSubtitle: string;
      pageblockText: string;
    };
  };
  fontSizeBySession: {
    pageblockTitle: string;
    pageblockSubtitle: string;
    pageblockText: string;
  };
}   
