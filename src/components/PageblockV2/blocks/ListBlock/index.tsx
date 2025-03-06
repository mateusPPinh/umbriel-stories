import React from 'react';
import { PageBlock, ClientTheme } from '../../types';
import CompactList from './variants/CompactList';
import ListWithThumbnail from './variants/ListWithThumbnail';
import Chronological from './variants/Chronological';
import { useClientTheme } from '../../hooks/useClientTheme';
interface ListBlockProps {
  block: PageBlock;
  isDarkTheme?: boolean;
  clientGeneralSettingsData: ClientTheme;
}

const ListBlock: React.FC<ListBlockProps> = ({ block, isDarkTheme, clientGeneralSettingsData }) => {
  const variant = block.variants[0];
  const theme = useClientTheme({ clientGeneralSettingsData, isDarkTheme })

  const renderVariant = () => {
    switch (variant.variantType) {
      case 'compact':
        return <CompactList variant={variant} isDarkTheme={isDarkTheme} clientGeneralSettingsData={clientGeneralSettingsData} />;
      case 'thumbnail':
        return <ListWithThumbnail variant={variant} isDarkTheme={isDarkTheme} clientGeneralSettingsData={clientGeneralSettingsData} />;
      case 'chronological':
        // @ts-ignore
        return <Chronological  variant={variant} isDarkTheme={isDarkTheme} clientGeneralSettingsData={clientGeneralSettingsData} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {renderVariant()}
    </div>
  );
};

export default ListBlock; 