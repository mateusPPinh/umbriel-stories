import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScheduleAction, ScheduleStatus } from '../interfaces/schedule.types';
import { Clock, Check, X, AlertTriangle, Calendar } from 'lucide-react';

interface ScheduleStatusBadgeProps {
  scheduledAt: string | null;
  scheduledAction: ScheduleAction | null;
  scheduleStatus: ScheduleStatus | null;
  translations?: {
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

const ScheduleStatusBadge: React.FC<ScheduleStatusBadgeProps> = ({
  scheduledAt,
  scheduledAction,
  scheduleStatus,
  translations = {}
}) => {
  const { t, i18n } = useTranslation();
  
  if (!scheduledAt || !scheduledAction || !scheduleStatus) return null;

  // Função auxiliar para obter traduções personalizadas ou usar as padrões
  const getTranslation = (key: string, params?: Record<string, any>) => {
    // Dividir a chave em partes para acessar objetos aninhados (ex: "actions.publish")
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

  const getStatusColor = () => {
    switch (scheduleStatus) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800';
      case 'canceled':
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800';
    }
  };

  const getActionText = () => {
    switch (scheduledAction) {
      case 'publish':
        return getTranslation('scheduleStatus.actions.publish');
      case 'update':
        return getTranslation('scheduleStatus.actions.update');
      case 'delete':
        return getTranslation('scheduleStatus.actions.delete');
      case 'create':
        return getTranslation('scheduleStatus.actions.create');
      case 'unpublish':
        return getTranslation('scheduleStatus.actions.unpublish');
      default:
        return getTranslation('scheduleStatus.actions.default');
    }
  };

  const getStatusIcon = () => {
    switch (scheduleStatus) {
      case 'pending':
        return <Clock className="h-3 w-3 mr-1 flex-shrink-0" />;
      case 'completed':
        return <Check className="h-3 w-3 mr-1 flex-shrink-0" />;
      case 'failed':
        return <AlertTriangle className="h-3 w-3 mr-1 flex-shrink-0" />;
      case 'canceled':
        return <X className="h-3 w-3 mr-1 flex-shrink-0" />;
      default:
        return <Clock className="h-3 w-3 mr-1 flex-shrink-0" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    // Usar o idioma atual do i18n para formatar a data
    const locale = i18n.language || 'pt-BR';
    
    return date.toLocaleDateString(locale, { 
      day: '2-digit', 
      month: '2-digit', 
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`inline-flex items-center px-2 py-1 text-xs rounded-md border ${getStatusColor()} font-heading`}>
      {getStatusIcon()}
      <span className="truncate">{getActionText()} {formatDate(scheduledAt)}</span>
    </div>
  );
};

export default ScheduleStatusBadge; 