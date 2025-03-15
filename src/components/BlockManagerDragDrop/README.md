# BlockManagerDragDrop

O componente `BlockManagerDragDrop` é uma ferramenta poderosa para gerenciar blocos de conteúdo em uma interface de arrastar e soltar. Ele suporta diferentes tipos de blocos (grid, lista, misto, destaque) e variantes, permitindo uma experiência de edição rica e flexível.

## Funcionalidades

- Interface de arrastar e soltar para organizar artigos em colunas
- Suporte a diferentes tipos de blocos: grid, lista, misto e destaque
- Configuração de estilos e layout
- Seletor de tipo de bloco integrado
- Agendamento de publicação de blocos
- Visualização de blocos por ID de página
- Edição de blocos existentes

## Instalação

```bash
npm install @umbriel/components
```

## Uso Básico

```jsx
import { BlockManagerDragDrop } from '@umbriel/components';

const MyComponent = () => {
  const handleSave = (columns) => {
    console.log('Colunas atualizadas:', columns);
  };

  return (
    <BlockManagerDragDrop
      articles={myArticles}
      blockType="grid"
      variant="standard"
      isDarkTheme={false}
      onSave={handleSave}
      pageId="my-page-id"
      clientGeneralSettingsData={clientTheme}
    />
  );
};
```

## Seletor de Tipo de Bloco

O componente agora suporta um seletor de tipo de bloco integrado, que permite alternar entre diferentes tipos de blocos (grid, lista, misto, destaque).

```jsx
<BlockManagerDragDrop
  articles={myArticles}
  blockType={blockType}
  variant={variant}
  isDarkTheme={false}
  onSave={handleSave}
  pageId="my-page-id"
  clientGeneralSettingsData={clientTheme}
  showBlockTypeSelector={true}
  onBlockTypeChange={(newBlockType) => setBlockType(newBlockType)}
/>
```

## Agendamento de Publicação

O componente agora suporta agendamento de publicação de blocos, permitindo agendar atualizações, publicações ou exclusões para uma data e hora específicas.

```jsx
<BlockManagerDragDrop
  articles={myArticles}
  blockType="grid"
  variant="standard"
  isDarkTheme={false}
  onSave={handleSave}
  pageId="my-page-id"
  clientGeneralSettingsData={clientTheme}
  blockId="my-block-id"
  isEditMode={true}
  onSchedule={(blockId, scheduleData) => handleSchedule(blockId, scheduleData)}
  onCancelSchedule={(blockId) => handleCancelSchedule(blockId)}
/>
```

## Visualização de Blocos por ID de Página

O componente `BlocksList` permite listar blocos por ID de página, facilitando a navegação e edição de blocos existentes.

```jsx
<BlocksList
  blocks={myBlocks}
  onEditBlock={(blockId) => handleEditBlock(blockId)}
  onScheduleBlock={(blockId) => handleScheduleBlock(blockId)}
  onDeleteBlock={(blockId) => handleDeleteBlock(blockId)}
/>
```

## Edição de Blocos Existentes

O componente suporta a edição de blocos existentes, permitindo carregar um bloco com suas configurações e conteúdo para edição.

```jsx
<BlockManagerDragDrop
  articles={myArticles}
  blockType={blockData.template}
  variant={blockData.variants[0].variantType}
  isDarkTheme={false}
  onSave={handleSave}
  pageId={blockData.pageId}
  clientGeneralSettingsData={clientTheme}
  blockId={blockData.id}
  isEditMode={true}
  scheduleInfo={scheduleInfo}
  onSchedule={handleSchedule}
  onCancelSchedule={handleCancelSchedule}
  onPublishBlock={handlePublishBlock}
/>
```

## Componentes Relacionados

- `SchedulePublishModal`: Modal para agendar publicação de blocos
- `ScheduleStatusBadge`: Badge para exibir o status de agendamento de um bloco
- `BlocksList`: Componente para listar blocos por ID de página

## Props

### BlockManagerDragDrop

| Prop | Tipo | Descrição |
|------|------|-----------|
| `articles` | `Article[]` | Lista de artigos disponíveis |
| `blockType` | `'grid' \| 'list' \| 'mixed' \| 'featured'` | Tipo de bloco |
| `variant` | `string` | Variante do bloco |
| `isDarkTheme` | `boolean` | Se o tema escuro está ativado |
| `onSave` | `(columns: { [key: string]: Article[] }) => void` | Callback chamado quando as colunas são atualizadas |
| `pageId` | `string` | ID da página |
| `clientGeneralSettingsData` | `ClientTheme` | Configurações gerais do cliente |
| `showBlockTypeSelector` | `boolean` | Se o seletor de tipo de bloco deve ser exibido |
| `onBlockTypeChange` | `(blockType: 'grid' \| 'list' \| 'mixed' \| 'featured') => void` | Callback chamado quando o tipo de bloco é alterado |
| `blockId` | `string` | ID do bloco (para edição) |
| `isEditMode` | `boolean` | Se o modo de edição está ativado |
| `scheduleInfo` | `{ scheduledAt: string \| null, scheduledAction: string \| null, scheduleStatus: string \| null, scheduledData: any \| null }` | Informações de agendamento |
| `onSchedule` | `(blockId: string, scheduleData: ScheduleRequest) => void` | Callback chamado quando um agendamento é criado |
| `onCancelSchedule` | `(blockId: string) => void` | Callback chamado quando um agendamento é cancelado |
| `onPublishBlock` | `() => void` | Callback chamado quando o bloco é publicado |

### BlocksList

| Prop | Tipo | Descrição |
|------|------|-----------|
| `blocks` | `Block[]` | Lista de blocos |
| `onEditBlock` | `(blockId: string) => void` | Callback chamado quando um bloco é editado |
| `onScheduleBlock` | `(blockId: string) => void` | Callback chamado quando um bloco é agendado |
| `onDeleteBlock` | `(blockId: string) => void` | Callback chamado quando um bloco é excluído |
| `onCancelSchedule` | `(blockId: string) => void` | Callback chamado quando um agendamento é cancelado |

### SchedulePublishModal

| Prop | Tipo | Descrição |
|------|------|-----------|
| `isOpen` | `boolean` | Se o modal está aberto |
| `onClose` | `() => void` | Callback chamado quando o modal é fechado |
| `onSchedule` | `(scheduleData: ScheduleRequest) => void` | Callback chamado quando um agendamento é criado |
| `blockId` | `string` | ID do bloco |
| `blockMetadata` | `{ title?: string, description?: string }` | Metadados do bloco |

### ScheduleStatusBadge

| Prop | Tipo | Descrição |
|------|------|-----------|
| `scheduledAt` | `string \| null` | Data e hora do agendamento |
| `scheduledAction` | `ScheduleAction \| null` | Ação agendada |
| `scheduleStatus` | `ScheduleStatus \| null` | Status do agendamento | 