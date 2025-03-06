import React from 'react';
import { PageBlock, ClientTheme } from './types';
import GridBlock from './blocks/GridBlock';
import FeaturedBlock from './blocks/FeaturedBlock';
import ListBlock from './blocks/ListBlock';
import MixedBlock from './blocks/MixedBlock';

interface PageBlockV2Props {
  blocksData: PageBlock[];
  isDarkTheme?: boolean;
  clientGeneralSettingsData: ClientTheme;
}

const PageBlockV2 = ({ blocksData, isDarkTheme, clientGeneralSettingsData }: PageBlockV2Props) => {
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

        switch (template) {
          case 'grid':
            return <GridBlock key={block.id} block={block} isDarkTheme={isDarkTheme} />;
          case 'featured':
            return <FeaturedBlock key={block.id} block={block} isDarkTheme={isDarkTheme} />;
          case 'list':
            return <ListBlock key={block.id} block={block} isDarkTheme={isDarkTheme} />;
          case 'mixed':
            return <MixedBlock key={block.id} block={block} isDarkTheme={isDarkTheme} clientGeneralSettingsData={clientGeneralSettingsData} />;
          default:
            console.warn(`Template não suportado: ${template}`);
            return null;
        }
      })}
    </>
  );
};

export default PageBlockV2;
