import React, { useState, useEffect } from 'react';

interface DragDropTipsProps {
  isDarkTheme?: boolean;
  onDismiss?: () => void;
  isForced?: boolean; // Nova prop para controlar se é uma abertura forçada (manual)
}

const DragDropTips: React.FC<DragDropTipsProps> = ({ 
  isDarkTheme = false,
  onDismiss,
  isForced = false
}) => {
  const [shouldShow, setShouldShow] = useState(true);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true); // Controla se as dicas devem rodar automaticamente

  const tips = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
        </svg>
      ),
      title: "Arraste artigos individualmente",
      description: "Clique e arraste um artigo para movê-lo para uma coluna"
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      title: "Selecione múltiplos artigos",
      description: "Use Ctrl/Cmd + Clique para selecionar vários artigos e arrastá-los juntos"
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
      title: "Remova múltiplos artigos",
      description: "Nas colunas, use Ctrl/Cmd + Clique para selecionar artigos e removê-los em grupo"
    }
  ];

  useEffect(() => {
    // Se não for uma abertura forçada, verifica o localStorage
    if (!isForced) {
      const isDismissed = localStorage.getItem('dragdrop-tips-dismissed');
      if (isDismissed) {
        setShouldShow(false);
      }
    } else {
      // Se for forçado, sempre mostra
      setShouldShow(true);
    }
  }, [isForced]);

  const handleDismiss = () => {
    setShouldShow(false);
    onDismiss?.();
    
    // Só salva no localStorage se não for uma abertura forçada
    if (!isForced) {
      localStorage.setItem('dragdrop-tips-dismissed', 'true');
    }
  };

  const handlePrevTip = () => {
    setAutoRotate(false); // Desativa a rotação automática quando navega manualmente
    setCurrentTipIndex(prev => (prev - 1 + tips.length) % tips.length);
  };

  const handleNextTip = () => {
    setAutoRotate(false); // Desativa a rotação automática quando navega manualmente
    setCurrentTipIndex(prev => (prev + 1) % tips.length);
  };

  useEffect(() => {
    // Rotaciona as dicas a cada 5 segundos se autoRotate estiver ativo
    let interval: NodeJS.Timeout;
    if (autoRotate) {
      interval = setInterval(() => {
        setCurrentTipIndex(prev => (prev + 1) % tips.length);
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRotate]);

  if (!shouldShow) return null;

  const currentTip = tips[currentTipIndex];

  return (
    <div className={`
      fixed bottom-4 right-4 max-w-sm rounded-lg shadow-lg p-4
      ${isDarkTheme 
        ? 'bg-gray-800 border border-gray-700' 
        : 'bg-white border border-gray-200'
      }
    `}>
      <div className="flex items-start gap-3">
        <div className={`
          flex-shrink-0 p-2 rounded-full
          ${isDarkTheme ? 'bg-blue-900/30' : 'bg-blue-50'}
        `}>
          {currentTip.icon}
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className={`
            font-medium mb-1
            ${isDarkTheme ? 'text-gray-200' : 'text-gray-900'}
          `}>
            {currentTip.title}
          </h4>
          <p className={`
            text-sm
            ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}
          `}>
            {currentTip.description}
          </p>
          
          {/* Navegação e indicadores */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex gap-2">
              <button
                onClick={handlePrevTip}
                className={`
                  p-1 rounded-full transition-colors
                  ${isDarkTheme 
                    ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-300' 
                    : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                  }
                `}
                title="Dica anterior"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNextTip}
                className={`
                  p-1 rounded-full transition-colors
                  ${isDarkTheme 
                    ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-300' 
                    : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                  }
                `}
                title="Próxima dica"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="flex gap-1.5">
              {tips.map((_, index) => (
                <div
                  key={index}
                  className={`
                    w-1.5 h-1.5 rounded-full transition-all duration-300
                    ${index === currentTipIndex
                      ? (isDarkTheme ? 'bg-blue-500' : 'bg-blue-600')
                      : (isDarkTheme ? 'bg-gray-700' : 'bg-gray-300')
                    }
                  `}
                />
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleDismiss}
          className={`
            flex-shrink-0 p-1 rounded-full transition-colors
            ${isDarkTheme 
              ? 'text-gray-500 hover:text-gray-300 hover:bg-gray-700' 
              : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
            }
          `}
          title="Fechar dicas"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DragDropTips; 