import React from 'react';
import { PageBlock } from '../../types';
import StandardGrid from './variants/StandardGrid';
import FeaturedGrid from './variants/FeaturedGrid';
import MasonryGrid from './variants/MasonryGrid';
import SidebarGrid from './variants/SidebarGrid';
import NewsFeedGrid from './variants/NewsFeedGrid';
import NewsGrid from './variants/NewsGrid';
import { ClientTheme } from '../../types';

interface GridBlockProps {
  block: PageBlock;
  isDarkTheme?: boolean;
  clientGeneralSettingsData: ClientTheme;
}

const GridBlock: React.FC<GridBlockProps> = ({ block, isDarkTheme, clientGeneralSettingsData }) => {
  const variant = block.variants[0];

  const renderVariant = () => {
    switch (variant.variantType) {
      case 'standard':
        return <StandardGrid  variant={variant as any} isDarkTheme={isDarkTheme} clientGeneralSettingsData={clientGeneralSettingsData} />;
      case 'featured':
        return <FeaturedGrid  variant={variant as any} isDarkTheme={isDarkTheme} clientGeneralSettingsData={clientGeneralSettingsData} />;
      case 'masonry':
        return <MasonryGrid  variant={variant as any} isDarkTheme={isDarkTheme} clientGeneralSettingsData={clientGeneralSettingsData} />;
      case 'sidebargrid':
        return <SidebarGrid  variant={variant as any} isDarkTheme={isDarkTheme} clientGeneralSettingsData={clientGeneralSettingsData} />;
      case 'newsfeed':
        return <NewsFeedGrid  variant={variant as any} isDarkTheme={isDarkTheme} clientGeneralSettingsData={clientGeneralSettingsData} />;
      case 'newsgrid':
        return <NewsGrid   variant={variant as any} isDarkTheme={isDarkTheme} clientGeneralSettingsData={clientGeneralSettingsData} />;
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

export default GridBlock; 