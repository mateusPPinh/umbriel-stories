import React from 'react';
import { PageBlock, ClientTheme } from '../../types';
import Hero from './variants/Hero';
import Split from './variants/Split';
import Triple from './variants/Triple';
import { useClientTheme } from '../../hooks/useClientTheme';
interface FeaturedBlockProps {
  block: PageBlock;
  isDarkTheme?: boolean;
  clientGeneralSettingsData: ClientTheme;
}

const FeaturedBlock: React.FC<FeaturedBlockProps> = ({ block, isDarkTheme, clientGeneralSettingsData }) => {
  const variant = block.variants[0];
  const theme = useClientTheme({ clientGeneralSettingsData, isDarkTheme })

  const renderVariant = () => {
    switch (variant.variantType) {
      case 'hero':
        return <Hero  variant={variant} isDarkTheme={isDarkTheme} clientGeneralSettingsData={clientGeneralSettingsData} />;
      case 'split':
        return <Split  variant={variant} isDarkTheme={isDarkTheme} clientGeneralSettingsData={clientGeneralSettingsData} />;
      case 'triple':
        return <Triple  variant={variant} isDarkTheme={isDarkTheme} clientGeneralSettingsData={clientGeneralSettingsData} />;
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

export default FeaturedBlock; 