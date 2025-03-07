import React from 'react';
import { PageBlock, ClientTheme } from './types';
import GridBlock from './blocks/GridBlock';
import FeaturedBlock from './blocks/FeaturedBlock';
import ListBlock from './blocks/ListBlock';
import MixedBlock from './blocks/MixedBlock';
import { withLayoutControl } from './hoc/withLayoutControl';

interface PageBlockV2Props {
  blocksData: PageBlock[];
  isDarkTheme?: boolean;
  clientGeneralSettingsData: ClientTheme;
  listLayout?: 'single' | 'grid';
}

// Aplicar o HOC aos componentes de bloco
const EnhancedListBlock = withLayoutControl(ListBlock);
const EnhancedFeaturedBlock = withLayoutControl(FeaturedBlock);
const EnhancedGridBlock = withLayoutControl(GridBlock);
const EnhancedMixedBlock = withLayoutControl(MixedBlock);

const PageBlockV2 = ({ blocksData, isDarkTheme, clientGeneralSettingsData, listLayout = 'single' }: PageBlockV2Props) => {
  if (!Array.isArray(blocksData)) {
    console.error('blocksData deve ser um array');
    return null;
  }

  return (
    <>
      {blocksData.map((block) => {
        if (!block?.variants?.[0]?.config) {
          console.warn('Block configuration is invalid:', block);
          return null;
        }

        const { template } = block;
        const commonProps = {
          key: block.id,
          block,
          isDarkTheme,
          clientGeneralSettingsData,
          layout: listLayout
        };

        switch (template) {
          case 'grid':
            return <EnhancedGridBlock {...commonProps} />;
          case 'featured':
            return <EnhancedFeaturedBlock {...commonProps} />;
          case 'list':
            return <EnhancedListBlock {...commonProps} />;
          case 'mixed':
            return <EnhancedMixedBlock {...commonProps} />;
          default:
            console.warn(`Template não suportado: ${template}`);
            return null;
        }
      })}
    </>
  );
};

export default PageBlockV2;
