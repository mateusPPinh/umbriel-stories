// API URLs
export const API_URLS = {
  // Base URL para a API
  BASE_URL: process.env.REACT_APP_API_URL || 'https://api.umbrielcms.com.br',
  
  // Endpoints para blocos
  BLOCKS: {
    // Obter um bloco específico por ID
    GET_BY_ID: (blockId: string) => `/private/page-blocks/v2/${blockId}`,
    
    // Obter blocos por ID de página
    GET_BY_PAGE_ID: (pageId: string) => `/private/page-blocks/v2/by-page/${pageId}`,
    
    // Criar um novo bloco
    CREATE: '/private/page-blocks/v2',
    
    // Atualizar um bloco existente
    UPDATE: (blockId: string) => `/private/page-blocks/v2/${blockId}`,
    
    // Excluir um bloco
    DELETE: (blockId: string) => `/private/page-blocks/v2/${blockId}`,
    
    // Agendar publicação de um bloco
    SCHEDULE: (blockId: string) => `/private/page-blocks/v2/${blockId}/schedule`,
    
    // Cancelar agendamento de um bloco
    CANCEL_SCHEDULE: (blockId: string) => `/private/page-blocks/v2/${blockId}/cancel-schedule`
  }
};

// Valores padrão para configuração de blocos
export const DEFAULT_BLOCK_CONFIG = {
  layout: {
    columns: "3",
    gap: "24px",
    padding: "24px",
    styles: {
      width: "100%",
      backgroundColor: "transparent"
    },
    responsive: {
      mobile: 1,
      tablet: 2,
      desktop: 3
    }
  },
  styles: {
    theme: {
      light: {
        columnStyle: {
          background: "transparent",
          padding: "16px"
        },
        headingProps: {
          fontSize: "lg",
          fontWeight: "medium",
          color: "#1a1a1a",
          fontFamily: "system-ui"
        },
        subtitleProps: {
          fontSize: "sm",
          color: "#4a5568",
          fontFamily: "system-ui"
        },
        timelineProps: {
          color: "#3182ce",
          width: "2px",
          markerSize: "12px",
          markerColor: "#3182ce"
        }
      },
      dark: {
        columnStyle: {
          background: "transparent",
          padding: "16px"
        },
        headingProps: {
          fontSize: "lg",
          fontWeight: "medium",
          color: "#ffffff",
          fontFamily: "system-ui"
        },
        subtitleProps: {
          fontSize: "sm",
          color: "#a0aec0",
          fontFamily: "system-ui"
        },
        timelineProps: {
          color: "#63b3ed",
          width: "2px",
          markerSize: "12px",
          markerColor: "#63b3ed"
        }
      }
    },
    showExcerpt: true,
    showMetadata: true,
    showDate: true,
    timelineStyle: "solid",
    markerStyle: "circle",
    hoverEffect: "highlight"
  }
};

// Variáveis para uso em desenvolvimento/testes
export const MOCK_VARIABLES = {
  blockIdToSchedule: "9a8f73ed-1de3-4119-8aea-f05740748316",
  pageIdToView: "a8980b89-db72-4fcf-9388-21db124a75a0",
  umbMultiTenantBaseUrlTest: "https://api.umbrielcms.com.br"
}; 