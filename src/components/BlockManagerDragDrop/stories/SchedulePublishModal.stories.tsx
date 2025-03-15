import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
// Import i18n configuration
import '../../../i18n/config';
import SchedulePublishModal from '../components/SchedulePublishModal';
import { ScheduleAction, ScheduleRequest } from '../interfaces/schedule.types';
import { blocksByBlockIDMock } from '../mocks/blocks-by-blockID.mock';

export default {
  title: 'Components/BlockManager/SchedulePublishModal',
  component: SchedulePublishModal,
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
  decorators: [
    (Story) => (
      <div className="h-screen p-4 w-full">
        <Story />
      </div>
    )
  ]
} as Meta;

// Demo do modal de agendamento
export const ScheduleModalDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lastScheduledData, setLastScheduledData] = useState<ScheduleRequest | null>(null);
  const [selectedAction, setSelectedAction] = useState<ScheduleAction>('update');

  const handleSchedule = (data: ScheduleRequest) => {
    console.log('Scheduled data:', data);
    setLastScheduledData(data);
    setIsOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Modal de Agendamento de Publicação
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Este exemplo demonstra o modal de agendamento de publicação de blocos. Selecione uma ação e clique no botão para abrir o modal.
        </p>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Selecione a ação para testar:
          </label>
          <div className="flex space-x-4">
            <button
              onClick={() => {
                setSelectedAction('update');
                setIsOpen(true);
              }}
              className={`px-4 py-2 rounded-md ${
                selectedAction === 'update'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600'
              }`}
            >
              Atualizar
            </button>
            <button
              onClick={() => {
                setSelectedAction('publish');
                setIsOpen(true);
              }}
              className={`px-4 py-2 rounded-md ${
                selectedAction === 'publish'
                  ? 'bg-green-600 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600'
              }`}
            >
              Publicar
            </button>
            <button
              onClick={() => {
                setSelectedAction('delete');
                setIsOpen(true);
              }}
              className={`px-4 py-2 rounded-md ${
                selectedAction === 'delete'
                  ? 'bg-red-600 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600'
              }`}
            >
              Excluir
            </button>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Abrir Modal de Agendamento
        </button>

        {lastScheduledData && (
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Último Agendamento:</h3>
            <pre className="text-sm overflow-auto p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600 max-h-60">
              {JSON.stringify(lastScheduledData, null, 2)}
            </pre>
          </div>
        )}

        <SchedulePublishModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSchedule={handleSchedule}
          blockId="example-block-123"
          blockMetadata={{
            title: "Exemplo de Bloco",
            description: "Descrição do bloco de exemplo"
          }}
          initialAction={selectedAction}
        />
      </div>
    </div>
  );
};

ScheduleModalDemo.storyName = 'Modal de Agendamento';

// Demo do modal com dados pré-preenchidos
export const PrefilledScheduleModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const blockData = blocksByBlockIDMock;
  const [selectedAction, setSelectedAction] = useState<ScheduleAction>('update');

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Modal com Dados Pré-preenchidos
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Este exemplo demonstra o modal de agendamento com dados pré-preenchidos de um bloco existente.
        </p>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Selecione a ação para testar:
          </label>
          <div className="flex space-x-4">
            <button
              onClick={() => setSelectedAction('update')}
              className={`px-4 py-2 rounded-md ${
                selectedAction === 'update'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600'
              }`}
            >
              Atualizar
            </button>
            <button
              onClick={() => setSelectedAction('publish')}
              className={`px-4 py-2 rounded-md ${
                selectedAction === 'publish'
                  ? 'bg-green-600 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600'
              }`}
            >
              Publicar
            </button>
            <button
              onClick={() => setSelectedAction('delete')}
              className={`px-4 py-2 rounded-md ${
                selectedAction === 'delete'
                  ? 'bg-red-600 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600'
              }`}
            >
              Excluir
            </button>
          </div>
        </div>

        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
          <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">Dados do Bloco:</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">ID:</p>
              <p className="text-sm text-gray-900 dark:text-white">{blockData.id}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tipo:</p>
              <p className="text-sm text-gray-900 dark:text-white">{blockData.template}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Título:</p>
              <p className="text-sm text-gray-900 dark:text-white">{blockData.metadata.title}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Descrição:</p>
              <p className="text-sm text-gray-900 dark:text-white">{blockData.metadata.description}</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Abrir Modal com Dados Pré-preenchidos
        </button>

        <SchedulePublishModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSchedule={(data) => {
            console.log('Scheduled data:', data);
            setIsOpen(false);
          }}
          blockId={blockData.id}
          blockMetadata={blockData.metadata}
          initialAction={selectedAction}
        />
      </div>
    </div>
  );
};

PrefilledScheduleModal.storyName = 'Modal com Dados Pré-preenchidos'; 