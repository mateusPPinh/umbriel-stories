import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ScheduleResponse } from '../interfaces/schedule.types';
import ScheduleList from './ScheduleList';
import BlockTargetSelector from './BlockTargetSelector';
import { Clock, AlertCircle } from 'lucide-react';

// Estilos globais para melhorar a aparência do gerenciador
const globalStyles = `
  .schedule-manager-container {
    display: flex;
    flex-direction: column;
    max-height: 90vh;
    border-radius: 0.75rem;
    overflow: hidden;
  }
  
  .schedule-manager-header {
    flex-shrink: 0;
    border-bottom: 1px solid;
    padding: 1rem 1.5rem;
  }
  
  .schedule-manager-content {
    flex-grow: 1;
    overflow-y: auto;
    padding: 1.5rem;
  }
  
  .schedule-manager-grid {
    display: grid;
    gap: 1.5rem;
  }
  
  @media (min-width: 1024px) {
    .schedule-manager-grid {
      grid-template-columns: 1fr 2fr;
    }
  }
  
  @media (max-width: 1023px) {
    .schedule-manager-grid {
      grid-template-columns: 1fr;
    }
  }
`;

// Interfaces para os tipos de dados
interface Page {
  id: string;
  title: string;
  slug: string;
  section?: {
    id: string;
    name: string;
  };
}

interface Section {
  id: string;
  name: string;
  slug: string;
  pages?: Page[];
}

interface ScheduleManagerProps {
  // Funções para buscar dados
  fetchSections: () => Promise<Section[]>;
  fetchPages: () => Promise<Page[]>;
  fetchSchedules: (targetType: 'page' | 'section' | 'all', targetId?: string) => Promise<ScheduleResponse[]>;
  cancelSchedule?: (scheduleId: string) => Promise<void>;
  
  // Estado inicial
  initialTargetType?: 'page' | 'section';
  initialTargetId?: string;
  
  // Opções
  isDarkTheme?: boolean;
  
  // Traduções personalizadas
  translations?: {
    title?: string;
    description?: string;
    errors?: {
      loadingTargets?: string;
      loadingSchedules?: string;
      cancelingSchedule?: string;
    };
    scheduleList?: {
      title?: string;
      refresh?: string;
      filter?: string;
      search?: string;
      loading?: string;
      empty?: string;
      untitled?: string;
      scheduledFor?: string;
      createdAt?: string;
      cancel?: string;
      filters?: {
        allActions?: string;
        allStatuses?: string;
      };
    };
    actions?: {
      publish?: string;
      update?: string;
      delete?: string;
      create?: string;
      unpublish?: string;
      default?: string;
    };
    statuses?: {
      pending?: string;
      completed?: string;
      failed?: string;
      canceled?: string;
      default?: string;
    };
  };
}

const ScheduleManager: React.FC<ScheduleManagerProps> = ({
  fetchSections,
  fetchPages,
  fetchSchedules,
  cancelSchedule,
  initialTargetType,
  initialTargetId,
  isDarkTheme = false,
  translations = {}
}) => {
  const { t } = useTranslation();
  
  // Estados
  const [sections, setSections] = useState<Section[]>([]);
  const [pages, setPages] = useState<Page[]>([]);
  const [schedules, setSchedules] = useState<ScheduleResponse[]>([]);
  const [selectedTargetType, setSelectedTargetType] = useState<'page' | 'section' | 'all'>(initialTargetType || 'all');
  const [selectedTargetId, setSelectedTargetId] = useState<string | undefined>(initialTargetId);
  const [isLoadingTarget, setIsLoadingTarget] = useState(false);
  const [isLoadingSchedules, setIsLoadingSchedules] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Função auxiliar para obter traduções personalizadas ou usar as padrões
  const getTranslation = (key: string, params?: Record<string, any>) => {
    // Dividir a chave em partes para acessar objetos aninhados (ex: "errors.loadingTargets")
    const parts = key.split('.');
    
    // Tentar obter a tradução personalizada
    let customTranslation: any = translations;
    for (const part of parts) {
      if (!customTranslation || typeof customTranslation !== 'object') {
        customTranslation = undefined;
        break;
      }
      customTranslation = customTranslation[part];
    }
    
    // Se encontrou uma tradução personalizada e é uma string, usar ela
    if (typeof customTranslation === 'string') {
      // Substituir parâmetros na string
      if (params) {
        return Object.entries(params).reduce(
          (str, [key, value]) => str.replace(`{{${key}}}`, String(value)),
          customTranslation
        );
      }
      return customTranslation;
    }
    
    // Caso contrário, usar a tradução padrão do i18n
    return t(key, params);
  };

  // Adicionar estilos globais
  useEffect(() => {
    // Adicionar estilos globais ao head
    const styleElement = document.createElement('style');
    styleElement.innerHTML = globalStyles;
    document.head.appendChild(styleElement);

    return () => {
      // Remover estilos globais quando o componente for desmontado
      document.head.removeChild(styleElement);
    };
  }, []);

  // Carregar seções e páginas
  useEffect(() => {
    const loadTargetData = async () => {
      setIsLoadingTarget(true);
      setError(null);
      
      try {
        const [sectionsData, pagesData] = await Promise.all([
          fetchSections(),
          fetchPages()
        ]);
        
        setSections(sectionsData);
        setPages(pagesData);
      } catch (err) {
        console.error('Error loading target data:', err);
        setError(getTranslation('scheduleManager.errors.loadingTargets'));
      } finally {
        setIsLoadingTarget(false);
      }
    };
    
    loadTargetData();
  }, [fetchSections, fetchPages, t]);

  // Carregar agendamentos quando o alvo mudar
  useEffect(() => {
    loadSchedules();
  }, [selectedTargetType, selectedTargetId]);

  // Função para carregar agendamentos
  const loadSchedules = async () => {
    setIsLoadingSchedules(true);
    setError(null);
    
    try {
      const schedulesData = await fetchSchedules(
        selectedTargetType, 
        selectedTargetType !== 'all' ? selectedTargetId : undefined
      );
      
      setSchedules(schedulesData);
    } catch (err) {
      console.error('Error loading schedules:', err);
      setError(getTranslation('scheduleManager.errors.loadingSchedules'));
    } finally {
      setIsLoadingSchedules(false);
    }
  };

  // Manipular seleção de alvo
  const handleSelectTarget = (targetType: 'page' | 'section', targetId: string) => {
    setSelectedTargetType(targetType);
    setSelectedTargetId(targetId);
  };

  // Manipular cancelamento de agendamento
  const handleCancelSchedule = async (scheduleId: string) => {
    if (cancelSchedule) {
      try {
        await cancelSchedule(scheduleId);
        // Recarregar a lista após cancelar
        await loadSchedules();
      } catch (err) {
        console.error('Error canceling schedule:', err);
        setError(getTranslation('scheduleManager.errors.cancelingSchedule'));
      }
    }
  };

  return (
    <div className={`${isDarkTheme ? 'dark' : ''}`}>
      <div className="schedule-manager-container bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        {/* Cabeçalho */}
        <div className="schedule-manager-header bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white font-heading flex items-center">
            <Clock className="mr-2 h-6 w-6 text-blue-500 flex-shrink-0" />
            <span className="truncate">{getTranslation('scheduleManager.title')}</span>
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 font-heading">
            {getTranslation('scheduleManager.description')}
          </p>
        </div>
        
        {/* Mensagem de erro */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 m-4">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-700 dark:text-red-300 font-heading break-words">{error}</p>
            </div>
          </div>
        )}
        
        {/* Conteúdo principal */}
        <div className="schedule-manager-content">
          <div className="schedule-manager-grid">
            {/* Seletor de alvo */}
            <div>
              <BlockTargetSelector
                sections={sections}
                pages={pages}
                isLoading={isLoadingTarget}
                onSelectTarget={handleSelectTarget}
                selectedTargetId={selectedTargetId}
                selectedTargetType={selectedTargetType === 'all' ? undefined : selectedTargetType}
              />
            </div>
            
            {/* Lista de agendamentos */}
            <div>
              <ScheduleList
                schedules={schedules}
                isLoading={isLoadingSchedules}
                onCancelSchedule={handleCancelSchedule}
                onRefresh={loadSchedules}
                blockId={selectedTargetType === 'page' ? selectedTargetId : undefined}
                pageId={selectedTargetType === 'page' ? selectedTargetId : undefined}
                translations={{
                  ...translations.scheduleList,
                  actions: translations.actions,
                  statuses: translations.statuses
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleManager; 