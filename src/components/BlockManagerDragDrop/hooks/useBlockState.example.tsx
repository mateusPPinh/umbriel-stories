import React, { useState } from 'react';
import { useBlockState } from './useBlockState';
import { Article } from '../../PageblockV2/types';
import { TemplateType, VariantType } from '../types';

const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Article 1',
    subtitle: 'Subtitle 1',
    slug: 'article-1',
    created_at: '2025-02-27 18:43:44.989767',
    content: {
      image: {
        desktop_image_path: 'https://barzuputru.local.api.umbrielcms.com.br:3001/uploads/19948844ea8f931121e7-307824076_634234571684057_3979167513106415840_n.jpg?width=510&height=907'
      }
    }
  },
  {
    id: '2',
    title: 'Article 2',
    subtitle: 'Subtitle 2',
    slug: 'article-2',
    created_at: '2025-02-27 18:43:45.034907',
    content: {
      image: {
        desktop_image_path: 'https://barzuputru.local.api.umbrielcms.com.br:3001/uploads/370120c2c31c03636a96-edited_1739899336673.jpg?width=410&height=300'
      }
    }
  }
];

export const BlockManagerExample: React.FC = () => {
  const [template, setTemplate] = useState<TemplateType>('featured');
  const [variant, setVariant] = useState<VariantType>('split');

  const {
    blockState,
    updateArticlePositions,
    updateVariant,
    updateVariantPosition,
    updateBlockPosition,
    updateBlockConfig,
    getApiFormat
  } = useBlockState({
    pageId: 'example-page',
    template,
    initialVariant: variant,
    initialArticles: mockArticles
  });

  const handleDragEnd = (result: any) => {
    // Exemplo de como atualizar as posições dos artigos após drag and drop
    const { source, destination } = result;

    if (!destination) return;

    const sourceId = source.droppableId;
    const destinationId = destination.droppableId;

    const newColumns = { ...blockState.articles };
    const [movedArticle] = newColumns[sourceId].splice(source.index, 1);
    newColumns[destinationId].splice(destination.index, 0, movedArticle);

    updateArticlePositions(newColumns);
  };

  const handleTemplateChange = (newTemplate: TemplateType) => {
    setTemplate(newTemplate);
    
    // Set a default variant based on the selected template
    switch (newTemplate) {
      case 'featured':
        setVariant('split');
        break;
      case 'grid':
        setVariant('standard');
        break;
      case 'list':
        setVariant('chronological');
        break;
      case 'mixed':
        setVariant('sidebar');
        break;
    }
  };

  const handleVariantChange = (newVariant: VariantType) => {
    setVariant(newVariant);
    updateVariant(newVariant);
  };

  const handleSave = () => {
    const blockData = getApiFormat();
    console.log('Block data to be saved:', blockData);
    // Aqui você pode enviar os dados para a API
  };

  // Render variant options based on the selected template
  const renderVariantOptions = () => {
    switch (template) {
      case 'featured':
        return (
          <>
            <button onClick={() => handleVariantChange('split')}>Split Layout</button>
            <button onClick={() => handleVariantChange('triple')}>Triple Layout</button>
            <button onClick={() => handleVariantChange('hero')}>Hero Layout</button>
          </>
        );
      case 'grid':
        return (
          <>
            <button onClick={() => handleVariantChange('standard')}>Standard Grid</button>
            <button onClick={() => handleVariantChange('featured')}>Featured Grid</button>
            <button onClick={() => handleVariantChange('masonry')}>Masonry Grid</button>
          </>
        );
      case 'list':
        return (
          <>
            <button onClick={() => handleVariantChange('chronological')}>Timeline</button>
            <button onClick={() => handleVariantChange('compact')}>Compact List</button>
            <button onClick={() => handleVariantChange('card')}>Card List</button>
          </>
        );
      case 'mixed':
        return (
          <>
            <button onClick={() => handleVariantChange('sidebar')}>Sidebar</button>
            <button onClick={() => handleVariantChange('showcase')}>Showcase</button>
            <button onClick={() => handleVariantChange('newspaper')}>Newspaper</button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h2>Block Manager Example</h2>
      
      <div>
        <h3>Template Type</h3>
        <div className="flex gap-2">
          <button onClick={() => handleTemplateChange('featured')}>Featured</button>
          <button onClick={() => handleTemplateChange('grid')}>Grid</button>
          <button onClick={() => handleTemplateChange('list')}>List</button>
          <button onClick={() => handleTemplateChange('mixed')}>Mixed</button>
        </div>
      </div>
      
      <div>
        <h3>Current Variant: {blockState.currentVariant.variantType}</h3>
        <div className="flex gap-2">
          {renderVariantOptions()}
        </div>
      </div>

      <div>
        <h3>Block Position</h3>
        <input
          type="number"
          value={blockState.blockPosition}
          onChange={(e) => updateBlockPosition(Number(e.target.value))}
          min={1}
        />
      </div>

      <div>
        <h3>Variant Position</h3>
        <input
          type="number"
          value={blockState.currentVariant.variantPosition}
          onChange={(e) => updateVariantPosition(Number(e.target.value))}
          min={1}
        />
      </div>

      <div>
        <h3>Layout Configuration</h3>
        <button
          onClick={() =>
            updateBlockConfig({
              layout: {
                columns: '6',
                gap: '32px',
                styles: {
                  width: '100%',
                  backgroundColor: 'transparent'
                }
              }
            })
          }
        >
          Update Layout
        </button>
      </div>

      <div>
        <h3>Articles</h3>
        <pre>{JSON.stringify(blockState.articles, null, 2)}</pre>
      </div>

      <button onClick={handleSave}>Save Block</button>
    </div>
  );
}; 