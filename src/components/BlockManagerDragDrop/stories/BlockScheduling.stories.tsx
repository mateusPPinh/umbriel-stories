import React, { useState, useMemo } from 'react';
import { Story, Meta } from '@storybook/react';
import BlockManagerDragDrop from '../BlockManagerDragDrop';
import BlocksList from '../components/BlocksList';
import { createArticles } from '../../PageblockV2/stories/mockData';
import { mockClientTheme } from '../../PageblockV2/stories/mockClientTheme';
import { blocksByBlockIDMock } from '../mocks/blocks-by-blockID.mock';
import { blocksByPageIDMock } from '../mocks/blocks-by-pageID.mock';
import { ScheduleRequest } from '../interfaces/schedule.types';
import SchedulePublishModal from '../components/SchedulePublishModal';

export default {
  title: 'Components/BlockManager/Scheduling',
  component: BlockManagerDragDrop,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' }
      ]
    }
  },
  argTypes: {
    isDarkTheme: {
      control: 'boolean',
      defaultValue: false
    }
  },
  decorators: [
    (Story) => (
      <div className="h-screen p-4 w-full">
        <Story />
      </div>
    )
  ]
} as Meta;

const mockArticles = createArticles(10);

// Demo de agendamento de bloco
export const ScheduleBlockDemo = () => {
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleInfo, setScheduleInfo] = useState<any>(null);
  
  const handleSchedule = (blockId: string, scheduleData: ScheduleRequest) => {
    console.log('Scheduling block:', blockId, scheduleData);
    setIsScheduled(true);
    setScheduleInfo({
      scheduledAt: scheduleData.scheduledAt,
      scheduledAction: scheduleData.scheduledAction,
      scheduleStatus: 'pending',
      scheduledData: scheduleData.scheduledData
    });
  };
  
  const handleCancelSchedule = (blockId: string) => {
    console.log('Canceling schedule for block:', blockId);
    setIsScheduled(false);
    setScheduleInfo(null);
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Agendamento de Publicação de Bloco
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Este exemplo demonstra como agendar a publicação de um bloco. Clique no botão "Agendar publicação" para abrir o modal de agendamento.
        </p>
        
        <BlockManagerDragDrop
          articles={mockArticles}
          blockType="grid"
          variant="standard"
          isDarkTheme={false}
          onSave={(columns) => console.log('Updated columns:', columns)}
          pageId="demo-page-id"
          clientGeneralSettingsData={mockClientTheme}
          blockId="demo-block-id"
          isEditMode={true}
          scheduleInfo={isScheduled ? scheduleInfo : undefined}
          onSchedule={handleSchedule}
          onCancelSchedule={handleCancelSchedule}
          onPublishBlock={() => console.log('Publishing block now')}
        />
      </div>
    </div>
  );
};

ScheduleBlockDemo.storyName = 'Agendamento de Bloco';

// Demo de listagem de blocos por página
export const BlocksByPageDemo = () => {
  const [selectedBlock, setSelectedBlock] = useState<any>(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [blockToSchedule, setBlockToSchedule] = useState<any>(null);
  
  // Ensure we have valid blocks data
  const blocksData = Array.isArray(blocksByPageIDMock[0]) ? blocksByPageIDMock[0] : [];
  
  const handleEditBlock = (blockId: string) => {
    console.log('Editing block:', blockId);
    // Find the block with the given ID
    const blockToEdit = blocksData.find(block => block.id === blockId);
    if (blockToEdit) {
      setSelectedBlock(blockToEdit);
    }
  };
  
  const handleScheduleBlock = (blockId: string) => {
    console.log('Opening schedule modal for block:', blockId);
    // Find the block with the given ID
    const blockToSchedule = blocksData.find(block => block.id === blockId);
    if (blockToSchedule) {
      setBlockToSchedule(blockToSchedule);
      setIsScheduleModalOpen(true);
    }
  };
  
  const handleCloseScheduleModal = () => {
    setIsScheduleModalOpen(false);
  };
  
  const handleSchedule = (scheduleData: ScheduleRequest) => {
    console.log('Scheduling block:', blockToSchedule?.id, scheduleData);
    setIsScheduleModalOpen(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Listagem de Blocos por Página
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Este exemplo demonstra como listar blocos por ID de página. Clique em "Editar" para selecionar um bloco para edição.
        </p>
        
        {selectedBlock ? (
          <div className="mb-4">
            <button
              onClick={() => setSelectedBlock(null)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              ← Voltar para a lista
            </button>
          </div>
        ) : null}
        
        {selectedBlock ? (
          <BlockManagerDragDrop
            articles={mockArticles}
            blockType={selectedBlock.template || "grid"}
            variant={selectedBlock.variants && selectedBlock.variants.length > 0 
              ? selectedBlock.variants[0].variantType 
              : "standard"}
            isDarkTheme={false}
            onSave={(columns) => console.log('Updated columns:', columns)}
            pageId="demo-page-id"
            clientGeneralSettingsData={mockClientTheme}
            blockId={selectedBlock.id}
            isEditMode={true}
            onSchedule={(blockId, scheduleData) => console.log('Scheduling block:', blockId, scheduleData)}
            onPublishBlock={() => console.log('Publishing block now')}
          />
        ) : (
          <>
            <BlocksList
              blocks={blocksData}
              onEditBlock={handleEditBlock}
              onScheduleBlock={handleScheduleBlock}
              onDeleteBlock={(blockId) => console.log('Deleting block:', blockId)}
            />
            
            {blockToSchedule && (
              <SchedulePublishModal
                isOpen={isScheduleModalOpen}
                onClose={handleCloseScheduleModal}
                onSchedule={handleSchedule}
                blockId={blockToSchedule.id}
                blockMetadata={blockToSchedule.metadata || { title: '', description: '' }}
                initialAction="update"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

BlocksByPageDemo.storyName = 'Listagem de Blocos por Página';

// Demo de edição de bloco existente
export const EditExistingBlockDemo = () => {
  const blockData = blocksByBlockIDMock;
  const [scheduleInfo, setScheduleInfo] = useState<any>({
    scheduledAt: '2025-03-09T18:58:16.000Z',
    scheduledAction: 'update',
    scheduleStatus: 'pending',
    scheduledData: {
      metadata: {
        title: 'Teste 8',
        description: 'Teste 8'
      }
    }
  });
  
  const handleCancelSchedule = (blockId: string) => {
    console.log('Canceling schedule for block:', blockId);
    setScheduleInfo(null);
  };
  
  // Extract the block configuration from the mock data
  const blockConfig = useMemo(() => {
    if (blockData.variants && blockData.variants.length > 0) {
      return {
        ...blockData.variants[0].config,
        metadata: blockData.metadata
      };
    }
    return undefined;
  }, [blockData]);
  
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Edição de Bloco Existente
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Este exemplo demonstra como editar um bloco existente com informações de agendamento.
        </p>
        
        <BlockManagerDragDrop
          articles={mockArticles}
          blockType={blockData.template as any}
          variant={blockData.variants[0].variantType}
          isDarkTheme={false}
          onSave={(columns) => console.log('Updated columns:', columns)}
          pageId={blockData.pageId}
          clientGeneralSettingsData={mockClientTheme}
          blockId={blockData.id}
          isEditMode={true}
          scheduleInfo={scheduleInfo}
          onSchedule={(blockId, scheduleData) => console.log('Scheduling block:', blockId, scheduleData)}
          onCancelSchedule={handleCancelSchedule}
          onPublishBlock={() => console.log('Publishing block now')}
          config={blockConfig}
        />
      </div>
    </div>
  );
};

EditExistingBlockDemo.storyName = 'Edição de Bloco Existente'; 