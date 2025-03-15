import React from 'react';
import { useTranslation } from 'react-i18next';
import ScheduleStatusBadge from './ScheduleStatusBadge';
import { ScheduleResponse } from '../interfaces/schedule.types';

// Atualizar a interface Block para ser compatível com os dados reais
interface Block {
  id: string;
  tenantId?: string;
  blockType: string;
  template: string;
  blockPosition: number;
  pageId: string;
  variants?: Array<{
    variantType: string;
    variantPosition: number;
    config: any;
  }>;
  metadata?: {
    title?: string;
    description?: string;
  } | null;
  scheduledAt?: string;
  scheduledAction?: 'publish' | 'update' | 'delete';
  scheduleStatus?: 'pending' | 'completed' | 'failed' | 'canceled';
  updated_at?: string;
  isDraft?: boolean;
  isScheduled?: boolean;
}

interface BlocksListProps {
  blocks: Block[];
  onEditBlock: (blockId: string) => void;
  onScheduleBlock: (blockId: string) => void;
  onDeleteBlock?: (blockId: string) => void;
  onCancelSchedule?: (blockId: string) => void;
  selectedBlockId?: string;
  onClose?: () => void;
}

const BlocksList: React.FC<BlocksListProps> = ({
  blocks,
  onEditBlock,
  onScheduleBlock,
  onDeleteBlock,
  onCancelSchedule,
  selectedBlockId,
  onClose
}) => {
  const { t } = useTranslation();

  if (!blocks || blocks.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold">{t('blocksList.title')}</h2>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {t('blocksList.close')}
            </button>
          )}
        </div>
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">{t('blocksList.empty')}</p>
        </div>
      </div>
    );
  }

  const getTemplateLabel = (template: string) => {
    switch (template) {
      case 'grid':
        return t('blocksList.templateTypes.grid');
      case 'list':
        return t('blocksList.templateTypes.list');
      case 'mixed':
        return t('blocksList.templateTypes.mixed');
      case 'featured':
        return t('blocksList.templateTypes.featured');
      default:
        return template || t('blocksList.templateTypes.unknown');
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return t('blocksList.unknownDate');
    
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch (error) {
      console.error('Error formatting date:', error);
      return t('blocksList.invalidDate');
    }
  };

  // Função para determinar a cor de fundo baseada no tipo de bloco
  const getBgColor = (template: string) => {
    switch (template) {
      case 'grid':
        return 'bg-blue-50 dark:bg-blue-900/20';
      case 'list':
        return 'bg-green-50 dark:bg-green-900/20';
      case 'mixed':
        return 'bg-purple-50 dark:bg-purple-900/20';
      case 'featured':
        return 'bg-orange-50 dark:bg-orange-900/20';
      default:
        return 'bg-gray-50 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold">{t('blocksList.title')}</h2>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {t('blocksList.close')}
          </button>
        )}
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blocks.map((block) => {
            const isSelected = selectedBlockId === block.id;
            const isPending = block.scheduleStatus === 'pending';
            
            return (
              <div 
                key={block.id} 
                className={`rounded-lg border ${isSelected ? 'border-blue-500 ring-2 ring-blue-300 dark:ring-blue-700' : 'border-gray-200 dark:border-gray-700'} overflow-hidden transition-all duration-200 hover:shadow-md`}
              >
                <div className={`p-4 ${getBgColor(block.template)}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg truncate">
                        {block.metadata?.title || 'Sem título'}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        ID: {block.id.substring(0, 8)}...
                      </p>
                    </div>
                    {block.scheduledAt && (
                      <ScheduleStatusBadge
                        scheduledAt={block.scheduledAt}
                        scheduledAction={block.scheduledAction || 'update'}
                        scheduleStatus={block.scheduleStatus || 'pending'}
                      />
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                      {getTemplateLabel(block.template)}
                    </span>
                    {block.variants && block.variants.length > 0 && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300">
                        {block.variants[0].variantType}
                      </span>
                    )}
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                      {t('blocksList.position')}: {block.blockPosition || 0}
                    </span>
                    {block.isDraft && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">
                        Rascunho
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-3 bg-white dark:bg-gray-800 flex justify-between items-center">
                  <button
                    onClick={() => onEditBlock(block.id)}
                    className="inline-flex items-center px-3 py-1.5 border border-blue-600 shadow-sm text-sm font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    {t('blocksList.edit')}
                  </button>
                  
                  {block.scheduledAt && isPending && onCancelSchedule ? (
                    <button
                      onClick={() => onCancelSchedule(block.id)}
                      className="inline-flex items-center px-3 py-1.5 border border-red-600 shadow-sm text-sm font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                    >
                      {t('blocksList.cancel')}
                    </button>
                  ) : (
                    <button
                      onClick={() => onScheduleBlock(block.id)}
                      className="inline-flex items-center px-3 py-1.5 border border-green-600 shadow-sm text-sm font-medium rounded text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                    >
                      {t('blocksList.schedule')}
                    </button>
                  )}
                  
                  {onDeleteBlock && (
                    <button
                      onClick={() => onDeleteBlock(block.id)}
                      className="inline-flex items-center px-2 py-1 text-xs font-medium text-red-700 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300 transition-colors"
                    >
                      {t('blocksList.delete')}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlocksList; 