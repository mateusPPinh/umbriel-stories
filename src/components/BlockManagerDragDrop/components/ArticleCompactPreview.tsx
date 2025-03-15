import React, { useMemo } from 'react';
import { Article } from '../../PageblockV2/types';

// Estendendo o tipo Article para incluir propriedades necessárias
interface ExtendedArticle extends Article {
  featuredImage?: string;
  category?: string;
}

interface BlockConfig {
  styles: {
    theme: {
      light: {
        columnStyle?: {
          background?: string;
          itemBackground?: string;
          badgeColors?: Record<string, string>;
        };
        headingProps?: {
          color?: string;
        };
      };
      dark: {
        columnStyle?: {
          background?: string;
          itemBackground?: string;
          badgeColors?: Record<string, string>;
        };
        headingProps?: {
          color?: string;
        };
      };
    };
  };
}

interface ArticleCompactPreviewProps {
  article: ExtendedArticle;
  isDarkTheme?: boolean;
  isCompact?: boolean;
  blockConfig?: BlockConfig;
  columnId?: string;
  variant?: string;
  onRemove?: (articleId: string | number) => void;
}

/**
 * Versão compacta do preview de artigo para uso nas colunas de edição
 * Esta versão simplificada não mostra imagens, apenas título e indicadores
 */
const ArticleCompactPreview: React.FC<ArticleCompactPreviewProps> = ({
  article,
  isDarkTheme = false,
  isCompact = false,
  blockConfig = {
    styles: {
      theme: {
        light: {
          columnStyle: {
            background: '#f7fafc',
            itemBackground: '#ffffff',
            badgeColors: {}
          },
          headingProps: {
            color: '#000000'
          }
        },
        dark: {
          columnStyle: {
            background: '#1a202c',
            itemBackground: '#2d3748',
            badgeColors: {}
          },
          headingProps: {
            color: '#ffffff'
          }
        }
      }
    }
  },
  columnId = 'default',
  variant,
  onRemove
}) => {
  // Memoizar valores que dependem de cálculos para evitar recálculos
  const theme = useMemo(() => blockConfig?.styles?.theme?.[isDarkTheme ? 'dark' : 'light'] || {
    columnStyle: {
      background: isDarkTheme ? '#1a202c' : '#f7fafc',
      itemBackground: isDarkTheme ? '#2d3748' : '#ffffff',
      badgeColors: {}
    },
    headingProps: {
      color: isDarkTheme ? '#ffffff' : '#000000'
    }
  }, [blockConfig, isDarkTheme]);

   // Determina a cor da coluna com base no ID da coluna e tema
   const getColumnColor = () => {
    const badgeColors = theme?.columnStyle?.badgeColors || {};
    const defaultColors: Record<string, string> = {
      main: '#3b82f6', // azul
      secondary: '#10b981', // verde
      tertiary: '#f59e0b', // amarelo
      featured: '#8b5cf6', // roxo
      sidebar: '#ec4899', // rosa
    };
    
    return badgeColors[columnId] || defaultColors[columnId] || '#9ca3af';
  };

  // Determina o rótulo da coluna com base no ID
  const getColumnLabel = () => {
    const labels: Record<string, string> = {
      main: 'Principal',
      secondary: 'Secundário',
      tertiary: 'Terciário',
      featured: 'Destaque',
      sidebar: 'Lateral',
      // Adicione outros rótulos conforme necessário
    };
    
    return labels[columnId] || columnId;
  };

  const columnColor = useMemo(() => getColumnColor(), [variant, columnId, theme]);
  const columnLabel = useMemo(() => getColumnLabel(), [columnId, variant]);

  // Renderiza um ícone genérico de artigo (pode ser expandido para diferentes tipos)
  const renderArticleIcon = useMemo(() => {
    if (!isCompact) return null;

    // Memoizando o ícone para evitar re-renderização
    if (article.category === 'video') {
      return (
        <div style={{ 
          width: '20px', 
          height: '20px', 
          borderRadius: '50%', 
          backgroundColor: '#FF0000', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          marginRight: '6px',
          flexShrink: 0
        }}>
          <svg style={{ width: '10px', height: '10px', fill: 'white' }} viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      );
    }
    
    if (article.featuredImage) {
      return (
        <div style={{ 
          width: '24px', 
          height: '24px', 
          borderRadius: '3px', 
          backgroundImage: `url(${article.featuredImage})`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          marginRight: '6px',
          flexShrink: 0
        }}/>
      );
    }
    
    return null;
  }, [article.category, article.featuredImage, isCompact]);

  // Handler para o botão de remoção
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que o evento se propague para o Draggable
    if (onRemove) {
      onRemove(article.id);
    }
  };

  return (
    <div className="article-compact-preview" style={{
      display: 'flex',
      padding: isCompact ? '8px' : '12px',
      backgroundColor: theme?.columnStyle?.itemBackground || (isDarkTheme ? '#2d3748' : '#ffffff'),
      borderRadius: '4px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
      alignItems: 'center',
      borderLeft: `3px solid ${columnColor}`,
      marginBottom: '4px',
      willChange: 'transform', // Ajuda com a performance de animações
      transform: 'translate3d(0,0,0)' // Força a GPU acceleration
    }}>
      {/* Badge indicando o tipo de coluna */}
      {!isCompact && (
        <div className="column-badge" style={{
          backgroundColor: columnColor,
          color: 'white',
          fontSize: '9px',
          fontWeight: 600,
          padding: '2px 6px',
          borderRadius: '3px',
          marginRight: '8px',
          textTransform: 'uppercase'
        }}>
          {columnLabel}
        </div>
      )}
      
      <div className="article-info" style={{
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        overflow: 'hidden'
      }}>
        {renderArticleIcon}
        
        <h4 style={{
          margin: 0,
          fontSize: isCompact ? '12px' : '14px',
          fontWeight: 500,
          color: theme?.headingProps?.color || (isDarkTheme ? '#ffffff' : '#000000'),
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {article.title}
        </h4>
      </div>
      
      {article.category && !isCompact && (
        <span style={{
          fontSize: '9px',
          color: '#64748b',
          backgroundColor: isDarkTheme ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
          padding: '1px 4px',
          borderRadius: '3px',
          marginLeft: '4px',
          whiteSpace: 'nowrap'
        }}>
          {article.category}
        </span>
      )}

      {/* Botão de remoção */}
      {onRemove && (
        <button 
          onClick={handleRemove}
          style={{
            marginLeft: '8px',
            background: 'none',
            border: 'none',
            padding: '2px',
            cursor: 'pointer',
            color: isDarkTheme ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: isCompact ? '16px' : '20px',
            height: isCompact ? '16px' : '20px',
            flexShrink: 0,
            transition: 'color 0.2s, background-color 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.color = '#ef4444';
            e.currentTarget.style.backgroundColor = isDarkTheme ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.color = isDarkTheme ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
          title="Remover artigo"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width={isCompact ? "12" : "14"} height={isCompact ? "12" : "14"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default React.memo(ArticleCompactPreview); 