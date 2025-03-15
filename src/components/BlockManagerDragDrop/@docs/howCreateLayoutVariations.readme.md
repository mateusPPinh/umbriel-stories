## Introdução

Este guia explica o processo de adicionar uma nova variação de layout (grid layout) a um componente de lista existente (ListWithThumbnail), permitindo que os usuários alternem entre visualização de coluna única e layout de grid com 2 colunas.

## Requisitos

- Permitir que o usuário alterne entre dois layouts: "single" (padrão) e "grid"
- Persistir a escolha de layout nos dados salvos da API
- Garantir que o layout seja corretamente aplicado quando visualizado
- Implementar estilos específicos para cada layout

## Arquivos Relevantes

1. **src/components/PageblockV2/blocks/ListBlock/variants/ListWithThumbnail.tsx**
   - Componente principal que renderiza a lista de artigos
   
2. **src/components/PageblockV2/blocks/ListBlock/index.tsx**
   - Componente wrapper que gerencia qual variante renderizar

3. **src/components/PageblockV2/index.tsx**
   - Componente de nível superior que renderiza diferentes tipos de blocos

4. **src/components/BlockManagerDragDrop/components/ListManager.tsx**
   - Interface de controle para gerenciar a lista no painel de administração

5. **src/components/BlockManagerDragDrop/components/ListLayoutPreview.tsx**
   - Componente de preview para visualizar o layout da lista 

6. **src/components/BlockManagerDragDrop/hooks/useBlockState.ts**
   - Hook que gerencia o estado dos blocos e formata dados para a API

## Passo a Passo

### 1. Modificar o componente ListWithThumbnail

1. **Adicionar suporte para a prop layout**:
   ```typescript
   interface BaseVariantProps {
     variant: BlockVariant;
     isDarkTheme?: boolean;
     customStyles?: any;
     clientGeneralSettingsData: ClientTheme;
     layout?: 'single' | 'grid';
   }
   ```

2. **Identificar a origem do layout (props vs. API)**:
   ```typescript
   const layoutFromConfig = (variant.config.styles as any)?.layout;
   const actualLayout = explicitLayout || layoutFromConfig || 'single';
   ```

3. **Adicionar estilos condicionais para cada layout**:
   ```typescript
   const thumbnailSize = actualLayout === 'grid' 
     ? { width: '180px', height: '120px' }
     : { width: '120px', height: '120px' };
   ```

4. **Aplicar classes CSS condicionais**:
   ```typescript
   <div 
     className={`
       ${classes.list} 
       ${actualLayout === 'grid' ? 'grid grid-cols-2 gap-6' : 'space-y-4'} 
     `}
     style={{
       gap: actualLayout === 'grid' ? gridGap : undefined
     }}
   >
   ```

### 2. Modificar ListBlock para passar a prop layout

```typescript
const ListBlock: React.FC<ListBlockProps> = ({ 
  block, isDarkTheme, clientGeneralSettingsData, layout = 'single' 
}) => {
  // ...
  return (
    <ListWithThumbnail 
      variant={variant} 
      isDarkTheme={isDarkTheme} 
      clientGeneralSettingsData={clientGeneralSettingsData} 
      layout={layout}
    />
  );
};
```

### 3. Atualizar PageblockV2 para aceitar a prop

```typescript
interface PageBlockV2Props {
  blocksData: PageBlock[];
  isDarkTheme?: boolean;
  clientGeneralSettingsData: ClientTheme;
  listLayout?: 'single' | 'grid';
}

const PageBlockV2 = ({ 
  blocksData, isDarkTheme, clientGeneralSettingsData, listLayout = 'single' 
}: PageBlockV2Props) => {
  // ...
  <ListBlock 
    key={block.id} 
    block={block} 
    isDarkTheme={isDarkTheme} 
    clientGeneralSettingsData={clientGeneralSettingsData}
    layout={listLayout}
  />
  // ...
}
```

### 4. Implementar controle de layout no ListManager

1. **Adicionar estado para controlar o layout**:
   ```typescript
   const [currentLayout, setCurrentLayout] = useState<'single' | 'grid'>(initialLayout);
   ```

2. **Adicionar controle de UI para alternar o layout**:
   ```typescript
   {blockState.currentVariant.variantType === 'card' && !isPreviewOnly && (
     <div className="flex items-center gap-2 mt-4">
       <label htmlFor="layout-select" className="text-sm text-gray-600 dark:text-gray-400">
         Layout:
       </label>
       <select
         id="layout-select"
         value={currentLayout}
         onChange={(e) => setCurrentLayout(e.target.value as 'single' | 'grid')}
         className="text-sm rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 focus:border-blue-500 focus:ring-blue-500"
       >
         <option value="single">Single Column</option>
         <option value="grid">Grid Layout</option>
       </select>
     </div>
   )}
   ```

3. **Criar função para incluir layout na configuração**:
   ```typescript
   const getConfigWithLayout = useCallback(() => {
     const config = adaptBlockConfig(externalBlockConfig);
     return {
       ...config,
       styles: {
         ...config.styles,
         layout: currentLayout
       }
     };
   }, [externalBlockConfig, currentLayout]);
   ```

### 5. Atualizar ListLayoutPreview para suportar layout grid

1. **Adicionar props de layout**:
   ```typescript
   interface ExtendedBlockConfig extends Omit<BlockConfig, 'mediaConfig'> {
     styles: {
       // ...existing props
       layout?: 'single' | 'grid'
       gridGap?: string
     }
   }
   ```

2. **Implementar renderização condicional baseada no layout**:
   ```typescript
   const renderCardList = () => {
     // ...
     const isGridLayout = blockConfig.styles.layout === 'grid';

     return (
       <div className={`${isGridLayout ? 'grid grid-cols-2 gap-4' : 'space-y-4'}`}>
         {articles.map((article, index) => (
           <div className={`${isGridLayout ? 'h-full' : ''}`}>
             {/* ... */}
           </div>
         ))}
       </div>
     );
   };
   ```

3. **Atualizar o skeleton para suportar layout grid**:
   ```typescript
   const renderSkeleton = (type) => {
     const isGridLayout = type === 'card' && blockConfig.styles.layout === 'grid';
     
     // ...
     return (
       <div className={`${isGridLayout ? 'grid grid-cols-2 gap-4' : 'space-y-4'}`}>
         {/* ... */}
       </div>
     );
   };
   ```

### 6. Garantir que o layout seja armazenado quando enviado para a API

```typescript
// No botão de salvar do ListManager
onClick={() => {
  // Create clean article data without pool
  const cleanArticles: Record<string, (string | number)[]> = {};
  
  // Only include non-pool columns
  Object.entries(blockState.articles).forEach(([colKey, articles]) => {
    if (colKey !== 'pool') {
      cleanArticles[colKey] = articles.map(article => article.id);
    }
  });
  
  // Create a clean payload
  const payload = {
    blockType: 'articles',
    blockPosition: blockState.blockPosition || 1,
    template: blockState.template,
    variants: [
      {
        variantType: blockState.currentVariant.variantType,
        variantPosition: blockState.currentVariant.variantPosition || 1,
        config: {
          articles: cleanArticles,
          styles: {
            ...(blockState.currentVariant.config?.styles || {}),
            layout: currentLayout,
            gridGap: '24px'
          }
        }
      }
    ],
    pageId: pageId
  };
  
  // Save the clean payload
  console.log('Clean payload:', payload);
  onSave(payload);
}}
```

### 7. Atualizar Storybook para testar os layouts

```typescript
// Adicionar controle para o layout
argTypes: {
  layout: {
    control: { type: 'radio' },
    options: ['single', 'grid'],
    defaultValue: 'single',
    description: 'Layout type for the list'
  }
}

// Criar histórias específicas para cada layout
export const SingleColumn = Template.bind({});
SingleColumn.args = {
  variant: baseThumbnailVariant,
  isDarkTheme: false,
  layout: 'single'
};

export const GridLayout = Template.bind({});
GridLayout.args = {
  variant: baseThumbnailVariant,
  isDarkTheme: false,
  layout: 'grid'
};
```

### 8. Principais erros e suas soluções

1. **Problema**: A propriedade 'pool' estava sendo incluída no payload da API
   **Solução**: Filtrar explicitamente a propriedade 'pool' antes de salvar
   ```typescript
   Object.entries(blockState.articles).forEach(([colKey, articles]) => {
     if (colKey !== 'pool') {
       cleanArticles[colKey] = articles.map(article => article.id);
     }
   });
   ```

2. **Problema**: Layout não era aplicado quando carregado da API
   **Solução**: Priorizar a origem do layout (prop ou config)
   ```typescript
   const layoutFromConfig = (variant.config.styles as any)?.layout;
   const actualLayout = explicitLayout || layoutFromConfig || 'single';
   ```

3. **Problema**: Erros de TypeScript para propriedades não definidas
   **Solução**: Usar type assertion e valores padrão
   ```typescript
   const gridGap = (variant.config.styles as any)?.gridGap || '24px';
   ```

## Conclusão

Para implementar variações de layout em um componente, é necessário:

1. Criar interfaces/tipos apropriados para as novas opções
2. Atualizar a hierarquia de componentes para passar as props necessárias
3. Implementar renderização condicional baseada na variação escolhida
4. Garantir que a escolha seja persistida nos dados da API
5. Verificar que a configuração salva seja corretamente interpretada na renderização

Esse padrão pode ser aplicado para outras variações de componentes, como tamanhos, alinhamentos, estilos visuais, etc.

## Boas Práticas

1. Use valores padrão em todos os níveis para garantir comportamento consistente
2. Implemente logging estratégico para diagnóstico
3. Crie preview e UI para testar mudanças
4. Documente novos parâmetros e opções
5. Mantenha a compatibilidade com código existente
6. Use tipos adequados para garantir checagem estática

---

Este README serve como guia para implementações semelhantes no futuro, documentando não apenas o "como" mas também o "porquê" das decisões tomadas.
