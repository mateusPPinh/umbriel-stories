import React from 'react';
import { PageBlock } from '../../types';
import Sidebar from './variants/Sidebar';
import Magazine from './variants/Magazine';
import Newspaper from './variants/Newspaper';
import Showcase from './variants/Showcase';
import VideoGrid from './variants/VideoGrid';
import { ClientTheme } from '../../types';

interface MixedBlockProps {
  block: PageBlock;
  isDarkTheme?: boolean;
  clientGeneralSettingsData: ClientTheme; 
}

const MixedBlock: React.FC<MixedBlockProps> = ({ block, isDarkTheme, clientGeneralSettingsData }) => {
  const variant = block.variants[0];

  const renderVariant = () => {
    switch (variant.variantType) {
      case 'sidebar':
        return <Sidebar   variant={variant as any} isDarkTheme={isDarkTheme} customStyles={{}} clientGeneralSettingsData={clientGeneralSettingsData} />;
      case 'magazine':
        return <Magazine  variant={variant as any} isDarkTheme={isDarkTheme} customStyles={{}} clientGeneralSettingsData={clientGeneralSettingsData}  />;
      case 'newspaper':
        return <Newspaper  variant={variant as any} isDarkTheme={isDarkTheme} customStyles={{}} clientGeneralSettingsData={clientGeneralSettingsData} />;
      case 'showcase':
        return <Showcase  variant={variant as any} isDarkTheme={isDarkTheme} customStyles={{}} clientGeneralSettingsData={clientGeneralSettingsData} />;
      case 'videogrid':
        return <VideoGrid  variant={variant as any} isDarkTheme={isDarkTheme} customStyles={{}} clientGeneralSettingsData={clientGeneralSettingsData} />;
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

export default MixedBlock; 