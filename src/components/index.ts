import '../index.css'
export { default as Theme } from '../styles/index'
export { default as CustomThemeProvider } from '../styles/index'
export { default as SideMenu } from './SideMenu'
export { default as Modal } from './Modal'
export { default as ArticleLayoutCards } from './BlockItemCards'
export { default as Button } from './Button'
export { default as BlurredImagem } from './ImageBlur'
export { default as TopBar } from './TopBar'
export { default as Link } from './Link'
export { default as LazyImage } from './LazyImage'
export { default as PageBlockV2 } from './PageblockV2'

//barrel 
export * from './PageblockV2/barrel'

// theme
export * from '../styles/deliveryThemeFunc'
// types

// Block Manager Drag Drop
export { default as BlockManagerDragDrop } from './BlockManagerDragDrop'
export type { BlockManagerDragDropRef } from './BlockManagerDragDrop'

// Exportando componentes individuais do BlockManagerDragDrop
export { default as ListManager } from './BlockManagerDragDrop/components/ListManager'
export { default as ListLayoutPreview } from './BlockManagerDragDrop/components/ListLayoutPreview'
export { default as DroppableColumn } from './BlockManagerDragDrop/components/DroppableColumn'
export { default as ArticlesPool } from './BlockManagerDragDrop/components/ArticlesPool'
export { default as SchedulePublishModal } from './BlockManagerDragDrop/components/SchedulePublishModal'
export { default as ScheduleStatusBadge } from './BlockManagerDragDrop/components/ScheduleStatusBadge'
export { default as BlocksList } from './BlockManagerDragDrop/components/BlocksList'

// Novos componentes de agendamento
export { default as ScheduleList } from './BlockManagerDragDrop/components/ScheduleList'
export { default as BlockTargetSelector } from './BlockManagerDragDrop/components/BlockTargetSelector'
export { default as ScheduleManager } from './BlockManagerDragDrop/components/ScheduleManager'

// Exportando hooks
export { useBlockState } from './BlockManagerDragDrop/hooks/useBlockState'

// Exportando tipos
export type { ListVariantType } from './BlockManagerDragDrop/types'
export type { BlockConfig } from './BlockManagerDragDrop/components/StyleConfigModal'
export type { 
  ScheduleAction, 
  ScheduleStatus, 
  ScheduleData, 
  ScheduleRequest, 
  ScheduleResponse 
} from './BlockManagerDragDrop/interfaces/schedule.types'

/**
 * Exportar tipagens, exemplos
 */

export type { ClientTheme } from './PageblockV2/types'
export type { Theme as PageblockTheme } from './PageblockV2/types'

