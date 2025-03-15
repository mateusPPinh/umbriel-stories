import React, { useState, useEffect, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import ReactModal from 'react-modal';
import type { Props as ReactModalProps } from 'react-modal';
import { ScheduleAction, ScheduleRequest } from '../interfaces/schedule.types';
import { Calendar } from '../../ui/calendar';
import { Clock, CalendarIcon, Check, X, AlertCircle, Send, Archive } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';
import { formatInTimeZone } from 'date-fns-tz';
import { Input } from './ui/input';
import { TimePicker } from './ui/time-picker';
import Button from '../../../components/Button';

const Modal = ReactModal as unknown as React.ComponentType<ReactModalProps>;

// Estilos globais para o ReactModal
const globalStyles = `
  .ReactModal__Overlay {
    opacity: 0;
    transition: opacity 200ms ease-in-out;
    z-index: 9999 !important;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ReactModal__Overlay--after-open {
    opacity: 1;
  }

  .ReactModal__Overlay--before-close {
    opacity: 0;
  }

  .ReactModal__Body--open,
  .ReactModal__Html--open {
    overflow: hidden;
  }
  
  /* Estilos para corrigir problemas de layout */
  .ReactModal__Content {
    display: flex !important;
    flex-direction: column !important;
    max-height: 90vh !important;
    width: 100% !important;
    max-width: 550px !important;
    margin: 0 auto !important;
    position: relative !important;
    top: auto !important;
    left: auto !important;
    right: auto !important;
    bottom: auto !important;
    border: none !important;
    background: #fff !important;
    overflow: hidden !important;
    border-radius: 0.75rem !important;
    padding: 0 !important;
  }
  
  .dark .ReactModal__Content {
    background: #1f2937 !important;
  }
  
  /* Garantir que os textos não fiquem sobrepostos */
  .ReactModal__Content h2,
  .ReactModal__Content label,
  .ReactModal__Content button {
    white-space: normal !important;
    overflow-wrap: break-word !important;
    word-break: break-word !important;
  }
  
  /* Melhorar a exibição em dispositivos móveis */
  @media (max-width: 640px) {
    .ReactModal__Content {
      width: 95% !important;
      max-width: 95% !important;
      margin: 0 10px !important;
    }
  }
`;

interface SchedulePublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (request: ScheduleRequest) => void;
  blockId: string;
  blockMetadata?: {
    title?: string;
    description?: string;
  };
  initialAction?: ScheduleAction;
  isDarkTheme?: boolean;
  translations?: {
    title?: string;
    action?: {
      label?: string;
      publish?: string;
      unpublish?: string;
    };
    date?: {
      label?: string;
    };
    time?: {
      label?: string;
      hour?: string;
      minute?: string;
    };
    summary?: string;
    timezone?: string;
    cancel?: string;
    schedule?: string;
    timePicker?: {
      hours?: string;
      minutes?: string;
    };
  };
  locale?: string;
}

// Custom styles for the ReactModal to ensure it overlays everything
const getCustomStyles = (isDark: boolean) => ({
  overlay: {
    backgroundColor: isDark ? 'rgba(0, 0, 0, 0.85)' : 'rgba(0, 0, 0, 0.75)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'auto',
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    position: 'relative' as const,
    top: 'auto',
    left: 'auto',
    right: 'auto',
    bottom: 'auto',
    margin: '0 auto',
    padding: 0,
    border: 'none',
    borderRadius: '0.75rem',
    maxWidth: '550px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'hidden',
    boxShadow: isDark 
      ? '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)'
      : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    backgroundColor: isDark ? '#1f2937' : '#ffffff',
  },
});

// Inicializar o ReactModal para acessibilidade
if (typeof window !== 'undefined') {
  ReactModal.setAppElement('body');
}

const SchedulePublishModal: React.FC<SchedulePublishModalProps> = ({
  isOpen,
  onClose,
  onSchedule,
  blockId,
  blockMetadata = {},
  initialAction = 'publish',
  isDarkTheme = false,
  translations = {},
  locale = 'en-US'
}): ReactElement => {
  const { t, i18n } = useTranslation();
  const [date, setDate] = useState<Date | undefined>(addDays(new Date(), 1));
  const [time, setTime] = useState<string>('12:00');
  const [action, setAction] = useState<ScheduleAction>(initialAction);
  const [title, setTitle] = useState<string>(blockMetadata.title || '');
  const [description, setDescription] = useState<string>(blockMetadata.description || '');
  const [timeZone, setTimeZone] = useState<string>(Intl.DateTimeFormat().resolvedOptions().timeZone);

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

  // Update state when props change
  useEffect(() => {
    setAction(initialAction);
    setTitle(blockMetadata.title || '');
    setDescription(blockMetadata.description || '');
  }, [initialAction, blockMetadata]);

  // Ensure body scrolling is restored when modal closes
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = '';
    }
    
    return () => {
      // Cleanup on unmount
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    // Ensure we clean up any potential overlay issues
    setTimeout(() => {
      document.body.style.overflow = '';
      const overlays = document.querySelectorAll('.ReactModal__Overlay');
      overlays.forEach(overlay => {
        if (overlay.classList.contains('ReactModal__Overlay--after-open')) {
          overlay.classList.remove('ReactModal__Overlay--after-open');
        }
      });
      
      // Remover qualquer elemento de portal que possa ter ficado
      const portals = document.querySelectorAll('.ReactModalPortal');
      portals.forEach(portal => {
        if (!portal.hasChildNodes() || portal.children.length === 0) {
          portal.remove();
        }
      });
      
      // Remover especificamente o div fantasma que está bloqueando a interação
      const ghostDivs = document.querySelectorAll('div.fixed.inset-0.z-50');
      ghostDivs.forEach(div => {
        div.remove();
      });
      
      // Garantir que o body não tenha overflow hidden
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }, 0);
    
    onClose();
  };

  const handleSchedule = () => {
    if (!date) return;

    // Combine date and time
    const scheduledDate = new Date(date);
    const [hours, minutes] = time.split(':').map(Number);
    scheduledDate.setHours(hours, minutes, 0, 0);

    // The scheduledData should only contain metadata at this level
    // The complete block configuration will be added by the parent component
    const scheduledData = {
      metadata: {
        title,
        description
      }
    };

    console.log('SchedulePublishModal - Scheduling with metadata:', scheduledData);

    // Verificar se é um agendamento de criação
    if (action === 'create') {
      onSchedule({
        scheduledAt: scheduledDate.toISOString(),
        scheduledAction: action,
        scheduledData,
        scheduleType: 'create'
      });
    } else {
      onSchedule({
        scheduledAt: scheduledDate.toISOString(),
        scheduledAction: action,
        scheduledData
      });
    }

    onClose();
  };

  const handleTimeChange = (newTime: string) => {
    setTime(newTime);
  };

  const formatDateTimeForSummary = (date: Date | undefined, time: string) => {
    if (!date) return getTranslation('scheduleModal.noDateSelected');
    
    // Usar o locale correto baseado no idioma atual
    const locale = i18n.language === 'en' ? enUS : ptBR;
    
    try {
      // Formatar a data com o fuso horário
      const formattedDate = formatInTimeZone(
        date, 
        timeZone, 
        "dd 'de' MMMM 'de' yyyy", 
        { locale }
      );
      
      return `${formattedDate} às ${time}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      const fallbackDate = format(date, "dd 'de' MMMM 'de' yyyy", { locale });
      return `${fallbackDate} às ${time}`;
    }
  };

  const getActionText = () => {
    switch (action) {
      case 'update':
        return getTranslation('scheduleStatus.actions.update');
      case 'publish':
        return getTranslation('scheduleStatus.actions.publish');
      case 'delete':
        return getTranslation('scheduleStatus.actions.delete');
      case 'create':
        return getTranslation('scheduleStatus.actions.create');
      default:
        return getTranslation('scheduleStatus.actions.default');
    }
  };

  const getActionColor = () => {
    switch (action) {
      case 'update':
        return 'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800';
      case 'publish':
        return 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800';
      case 'delete':
        return 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800';
      case 'create':
        return 'bg-purple-50 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200 border-purple-200 dark:border-purple-800';
      default:
        return 'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800';
    }
  };

  const getActionIcon = () => {
    switch (action) {
      case 'update':
        return <Clock className="mr-2 h-5 w-5 text-blue-500" />;
      case 'publish':
        return <Check className="mr-2 h-5 w-5 text-green-500" />;
      case 'delete':
        return <AlertCircle className="mr-2 h-5 w-5 text-red-500" />;
      case 'create':
        return <Calendar className="mr-2 h-5 w-5 text-purple-500" />;
      default:
        return <Clock className="mr-2 h-5 w-5 text-blue-500" />;
    }
  };

  // Aplicar classes de tema escuro ao corpo do modal
  const modalClasses = isDarkTheme ? 'dark' : '';
  const modalContentClasses = `${modalClasses} outline-none focus:outline-none`;
  const modalPortalClasses = `${modalClasses}`;

  // Função auxiliar para obter traduções personalizadas ou usar as padrões
  const getTranslation = (key: string, params?: Record<string, any>) => {
    // Dividir a chave em partes para acessar objetos aninhados (ex: "metadata.title")
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

  // Adicionar função formatDate
  const formatDate = (date: Date | undefined): string => {
    if (!date) return '';
    return format(date, 'PP', { locale: locale === 'pt-BR' ? ptBR : enUS });
  };

  const isFormValid = () => {
    return date && time;
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={getCustomStyles(isDarkTheme)}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={true}
      contentLabel={getTranslation('scheduleModal.title', { action: getActionText() })}
      portalClassName={modalPortalClasses}
      className={modalContentClasses}
      closeTimeoutMS={200}
      htmlOpenClassName="ReactModal__Html--open"
      bodyOpenClassName="ReactModal__Body--open"
      shouldReturnFocusAfterClose={true}
      shouldFocusAfterRender={true}
      preventScroll={true}
      overlayElement={(props, contentEl) => (
        <div {...props} onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          if (e.target === e.currentTarget) {
            handleClose();
          }
        }}>
          {contentEl as React.ReactNode}
        </div>
      )}
    >
      <div className={`bg-white dark:bg-gray-900 rounded-lg overflow-hidden w-full flex flex-col max-h-[90vh] ${isDarkTheme ? 'dark' : ''}`}>
        {/* Header - Fixado */}
        <div className="bg-gray-50 dark:bg-[#19191b] px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center sticky top-0 z-10 flex-shrink-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center font-heading truncate">
            <span className="mr-2 flex-shrink-0">{getActionIcon()}</span>
            <span className="truncate">{getTranslation('scheduleModal.title', { action: getActionText() })}</span>
          </h2>
          <Button
            onClick={handleClose}
            variant="transparent"
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-full transition-colors flex-shrink-0 ml-2"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Content - Com scroll personalizado */}
        <div className="p-6 bg-white dark:bg-gray-900 overflow-y-auto flex-grow">
          <div className="space-y-6 max-w-full">
            {/* Action Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {getTranslation('scheduleModal.action.label')}
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant={action === 'publish' ? 'primary' : 'secondary'}
                  onClick={() => setAction('publish')}
                  className="w-full flex items-center justify-center"
                >
                  <Send className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{getTranslation('scheduleModal.action.publish')}</span>
                </Button>
                <Button
                  variant={action === 'unpublish' ? 'primary' : 'secondary'}
                  onClick={() => setAction('unpublish')}
                  className="w-full flex items-center justify-center"
                >
                  <Archive className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{getTranslation('scheduleModal.action.unpublish')}</span>
                </Button>
              </div>
            </div>
            
            {/* Date Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {getTranslation('scheduleModal.date.label')}
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={date ? date.toISOString().split('T')[0] : ''}
                  onChange={(e) => {
                    const newDate = e.target.value ? new Date(e.target.value) : undefined;
                    setDate(newDate);
                  }}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>
            
            {/* Time Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {getTranslation('scheduleModal.time.label')}
              </label>
              <TimePicker
                value={time}
                onChange={handleTimeChange}
                translations={{
                  hours: getTranslation('scheduleModal.time.hour'),
                  minutes: getTranslation('scheduleModal.time.minute'),
                }}
              />
            </div>
            
            {/* Summary */}
            <div className="space-y-2 mt-6">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="flex items-start">
                  <div className="mr-3 mt-0.5 text-primary-500 flex-shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-sm text-gray-700 dark:text-gray-300 break-words">
                      {getTranslation('scheduleModal.summary', {
                        action: getActionText().toLowerCase(),
                        date: formatDate(date),
                        time: time,
                      })}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {getTranslation('scheduleModal.timezone', {
                        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Metadata fields (only for update and publish actions) */}
            {action !== 'delete' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 font-heading">{getTranslation('scheduleModal.metadata.title')}</label>
                  <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-blue-500 focus:border-blue-500 font-heading"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 font-heading">{getTranslation('scheduleModal.metadata.description')}</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-heading"
                    rows={3}
                  />
                </div>
             </div>
           )}
          </div>
        </div>
        
        {/* Footer - Fixado */}
        <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3 sticky bottom-0 z-10">
          <Button 
            onClick={handleClose}
            variant="secondary"
            className="font-heading"
          >
            {getTranslation('scheduleModal.cancel')}
          </Button>
          <Button
            onClick={handleSchedule}
            disabled={!isFormValid()}
            variant={action === 'update' ? 'primary' : action === 'publish' ? 'success' : 'danger'}
            className="font-heading"
          >
            {getTranslation('scheduleModal.schedule')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SchedulePublishModal; 