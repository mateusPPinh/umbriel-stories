import React from 'react'
import { PageBlock, ClientTheme } from '../../types'
import CompactList from './variants/CompactList'
import ListWithThumbnail from './variants/ListWithThumbnail'
import Chronological from './variants/Chronological'
import { useClientTheme } from '../../hooks/useClientTheme'
interface ListBlockProps {
  block: PageBlock
  isDarkTheme?: boolean
  clientGeneralSettingsData: ClientTheme
  layout: 'single' | 'grid'
}

const ListBlock: React.FC<ListBlockProps> = ({
  block,
  isDarkTheme,
  clientGeneralSettingsData,
  layout,
}) => {
  const variant = block.variants[0]
  const theme = useClientTheme({ clientGeneralSettingsData, isDarkTheme })

  const renderVariant = () => {
    switch (variant.variantType) {
      case 'compact':
        return (
          <CompactList
            variant={variant}
            isDarkTheme={isDarkTheme}
            clientGeneralSettingsData={clientGeneralSettingsData}
            layout={layout}
          />
        )
      case 'thumbnail':
        return (
          <ListWithThumbnail
            variant={variant}
            isDarkTheme={isDarkTheme}
            clientGeneralSettingsData={clientGeneralSettingsData}
            layout={layout}
          />
        )
      case 'chronological':
        return (
          <Chronological
            variant={variant as any}
            isDarkTheme={isDarkTheme}
            clientGeneralSettingsData={clientGeneralSettingsData}
            layout={layout}
          />
        )
      default:
        return null
    }
  }

  return <div className="w-full">{renderVariant()}</div>
}

export default ListBlock
