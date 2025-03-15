import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ScheduleAction, ScheduleStatus, ScheduleResponse } from '../interfaces/schedule.types';
import ScheduleStatusBadge from './ScheduleStatusBadge';
import { Clock, Filter, Check, X, AlertTriangle, Trash2, RefreshCw, Search, ChevronDown, Calendar } from 'lucide-react';
import Button from '../../../components/Button';

interface ScheduleListProps {
  blockId?: string;
  pageId?: string;
  schedules: ScheduleResponse[];
  onCancelSchedule?: (scheduleId: string) => Promise<void>;
  onRefresh: () => Promise<void>;
  isLoading?: boolean;
  translations?: {
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

const ScheduleList: React.FC<ScheduleListProps> = ({
  blockId,
  pageId,
  schedules,
  onCancelSchedule,
  onRefresh,
  isLoading = false,
  translations = {}
}) => {
  const { t } = useTranslation();
  const [filteredSchedules, setFilteredSchedules] = useState<ScheduleResponse[]>(schedules);
  const [actionFilter, setActionFilter] = useState<ScheduleAction | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<ScheduleStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Função auxiliar para obter traduções personalizadas ou usar as padrões
  const getTranslation = (key: string, params?: Record<string, any>) => {
    // Dividir a chave em partes para acessar objetos aninhados (ex: "filters.allActions")
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

  // Atualizar a lista filtrada quando os filtros ou a lista original mudar
  useEffect(() => {
    let result = [...schedules];
    
    // Filtrar por ação
    if (actionFilter !== 'all') {
      result = result.filter(schedule => schedule.scheduledAction === actionFilter);
    }
    
    // Filtrar por status
    if (statusFilter !== 'all') {
      result = result.filter(schedule => schedule.scheduleStatus === statusFilter);
    }
    
    // Filtrar por termo de busca
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(schedule => 
        schedule.metadata?.title?.toLowerCase().includes(term) || 
        schedule.metadata?.description?.toLowerCase().includes(term)
      );
    }
    
    setFilteredSchedules(result);
  }, [schedules, actionFilter, statusFilter, searchTerm]);

  const handleCancelSchedule = async (scheduleId: string) => {
    if (onCancelSchedule) {
      await onCancelSchedule(scheduleId);
      await onRefresh();
    }
  };

  const getActionIcon = (action: ScheduleAction | null) => {
    switch (action) {
      case 'update':
        return <RefreshCw className="h-4 w-4 text-blue-500 flex-shrink-0" />;
      case 'publish':
        return <Check className="h-4 w-4 text-green-500 flex-shrink-0" />;
      case 'delete':
        return <Trash2 className="h-4 w-4 text-red-500 flex-shrink-0" />;
      case 'create':
        return <Calendar className="h-4 w-4 text-purple-500 flex-shrink-0" />;
      case 'unpublish':
        return <X className="h-4 w-4 text-orange-500 flex-shrink-0" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500 flex-shrink-0" />;
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-heading flex items-center">
            <Clock className="mr-2 h-5 w-5 text-blue-500 flex-shrink-0" />
            <span className="truncate">{getTranslation('scheduleList.title')}</span>
          </h3>
          
          <div className="flex items-center gap-2">
            <Button
              onClick={() => onRefresh()}
              variant="secondary"
              className="text-sm font-heading"
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-1 flex-shrink-0 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="truncate">{getTranslation('scheduleList.refresh')}</span>
            </Button>
            
            <Button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              variant="secondary"
              className="text-sm font-heading"
            >
              <Filter className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="truncate">{getTranslation('scheduleList.filter')}</span>
              <ChevronDown className={`h-4 w-4 ml-1 transition-transform flex-shrink-0 ${isFilterOpen ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        </div>
        
        {/* Filtros */}
        {isFilterOpen && (
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            {/* Busca */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400 flex-shrink-0" />
              </div>
              <input
                type="text"
                className="pl-10 pr-3 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-heading"
                placeholder={getTranslation('scheduleList.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Filtro de Ação */}
            <select
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-heading"
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value as ScheduleAction | 'all')}
            >
              <option value="all">{getTranslation('scheduleList.filters.allActions')}</option>
              <option value="update">{getTranslation('scheduleStatus.actions.update')}</option>
              <option value="publish">{getTranslation('scheduleStatus.actions.publish')}</option>
              <option value="delete">{getTranslation('scheduleStatus.actions.delete')}</option>
              <option value="create">{getTranslation('scheduleStatus.actions.create')}</option>
              <option value="unpublish">{getTranslation('scheduleStatus.actions.unpublish')}</option>
            </select>
            
            {/* Filtro de Status */}
            <select
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-heading"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as ScheduleStatus | 'all')}
            >
              <option value="all">{getTranslation('scheduleList.filters.allStatuses')}</option>
              <option value="pending">{getTranslation('scheduleStatus.statuses.pending')}</option>
              <option value="completed">{getTranslation('scheduleStatus.statuses.completed')}</option>
              <option value="failed">{getTranslation('scheduleStatus.statuses.failed')}</option>
              <option value="canceled">{getTranslation('scheduleStatus.statuses.canceled')}</option>
            </select>
          </div>
        )}
      </div>
      
      {/* Lista de agendamentos */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[400px] overflow-y-auto">
        {filteredSchedules.length === 0 ? (
          <div className="py-8 text-center text-gray-500 dark:text-gray-400 font-heading">
            {isLoading ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mb-2"></div>
                <span>{getTranslation('scheduleList.loading')}</span>
              </div>
            ) : (
              <>
                <Clock className="h-10 w-10 mx-auto mb-2 opacity-50" />
                <span>{getTranslation('scheduleList.empty')}</span>
              </>
            )}
          </div>
        ) : (
          filteredSchedules.map((schedule) => (
            <div key={schedule.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <div className="flex flex-col sm:flex-row justify-between gap-3">
                <div className="flex-1 min-w-0">
                  {/* Título e descrição */}
                  <div className="flex items-start gap-2">
                    {getActionIcon(schedule.scheduledAction)}
                    <div className="flex-grow min-w-0">
                      <h4 className="font-medium text-gray-900 dark:text-white font-heading truncate">
                        {schedule.metadata?.title || getTranslation('scheduleList.untitled')}
                      </h4>
                      {schedule.metadata?.description && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 font-heading break-words">
                          {schedule.metadata.description}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Detalhes do agendamento */}
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
                      {getTranslation('scheduleList.scheduledFor')}: {formatDate(schedule.scheduledAt)}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
                      {getTranslation('scheduleList.createdAt')}: {formatDate(schedule.created_at)}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:items-end gap-2">
                  {/* Badge de status */}
                  <ScheduleStatusBadge 
                    scheduledAt={schedule.scheduledAt} 
                    scheduledAction={schedule.scheduledAction} 
                    scheduleStatus={schedule.scheduleStatus} 
                    translations={{
                      actions: translations?.actions,
                      statuses: translations?.statuses
                    }}
                  />
                  
                  {/* Botão de cancelar (apenas para agendamentos pendentes) */}
                  {schedule.scheduleStatus === 'pending' && onCancelSchedule && (
                    <Button
                      onClick={() => handleCancelSchedule(schedule.id)}
                      variant="danger"
                      className="text-xs font-heading py-1 px-2"
                    >
                      <X className="h-3 w-3 mr-1 flex-shrink-0" />
                      <span className="truncate">{getTranslation('scheduleList.cancel')}</span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ScheduleList; 