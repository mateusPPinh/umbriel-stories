# Integrando o BlockManagerDragDrop com uma API

Este guia demonstra como integrar o componente BlockManagerDragDrop com uma API backend para persistir os dados dos layouts.

## Configuração Básica

Primeiro, importe o componente e configure-o com os dados necessários:

```jsx
import React, { useState, useEffect } from 'react';
import { BlockManagerDragDrop } from '@umbriel/storybook';

const BlockManagerPage = ({ pageId }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blockData, setBlockData] = useState(null);

  // Buscar artigos da API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.example.com/articles');
        
        if (!response.ok) {
          throw new Error('Falha ao buscar artigos');
        }
        
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Buscar dados do bloco existente (se houver)
  useEffect(() => {
    const fetchBlockData = async () => {
      try {
        const response = await fetch(`https://api.example.com/pages/${pageId}/blocks`);
        
        if (!response.ok) {
          // Se não existir, não é um erro
          if (response.status === 404) {
            return;
          }
          throw new Error('Falha ao buscar dados do bloco');
        }
        
        const data = await response.json();
        setBlockData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    if (pageId) {
      fetchBlockData();
    }
  }, [pageId]);

  // Função para salvar os dados do bloco
  const handleSave = async (data) => {
    try {
      const response = await fetch(`https://api.example.com/pages/${pageId}/blocks`, {
        method: blockData ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Falha ao salvar o bloco');
      }
      
      const result = await response.json();
      console.log('Bloco salvo com sucesso:', result);
      
      // Atualizar o estado local com os dados salvos
      setBlockData(result);
      
      // Exibir notificação de sucesso
      alert('Bloco salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar o bloco:', error);
      alert(`Erro ao salvar: ${error.message}`);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Gerenciador de Blocos</h1>
      
      <BlockManagerDragDrop
        articles={articles}
        blockType={blockData?.template || 'grid'}
        isDarkTheme={false}
        onSave={handleSave}
        variant={blockData?.variants[0]?.variantType || 'standard'}
        pageId={pageId}
      />
    </div>
  );
};

export default BlockManagerPage;
```

## Estrutura da API

### Endpoints

A integração assume que a API possui os seguintes endpoints:

1. `GET /articles` - Retorna a lista de artigos disponíveis
2. `GET /pages/:pageId/blocks` - Retorna os blocos existentes para uma página
3. `POST /pages/:pageId/blocks` - Cria um novo bloco para uma página
4. `PUT /pages/:pageId/blocks` - Atualiza um bloco existente

### Formato de Resposta da API de Artigos

```json
{
  "articles": [
    {
      "id": "1",
      "title": "Título do Artigo 1",
      "subtitle": "Subtítulo do artigo",
      "excerpt": "Resumo do artigo...",
      "publishDate": "2023-03-01T10:00:00Z",
      "author": {
        "name": "Nome do Autor",
        "avatar": "https://example.com/avatar.jpg"
      },
      "category": {
        "name": "Categoria",
        "slug": "categoria"
      },
      "image": {
        "url": "https://example.com/image.jpg",
        "alt": "Descrição da imagem"
      },
      "slug": "titulo-do-artigo-1"
    },
    // Mais artigos...
  ]
}
```

### Formato de Envio para a API

```json
{
  "pageId": "page-123",
  "blockType": "articles",
  "blockPosition": 1,
  "template": "grid",
  "variants": [
    {
      "variantType": "standard",
      "variantPosition": 1,
      "config": {
        "layout": {
          "columns": "3",
          "gap": "6",
          "styles": {
            "width": "100%",
            "backgroundColor": "transparent"
          }
        },
        "articles": {
          "col-0": ["1", "2"],
          "col-1": ["3", "4"],
          "col-2": ["5", "6"]
        },
        "styles": {
          "theme": {
            "light": {
              "columnStyle": {
                "background": "white",
                "padding": "1rem"
              },
              "headingProps": {
                "fontSize": "1.125rem",
                "fontWeight": "600",
                "color": "#111827"
              },
              "subtitleProps": {
                "fontSize": "0.875rem",
                "color": "#6B7280"
              }
            },
            "dark": {
              "columnStyle": {
                "background": "#1F2937",
                "padding": "1rem"
              },
              "headingProps": {
                "fontSize": "1.125rem",
                "fontWeight": "600",
                "color": "#F9FAFB"
              },
              "subtitleProps": {
                "fontSize": "0.875rem",
                "color": "#9CA3AF"
              }
            }
          },
          "showExcerpt": true
        }
      }
    }
  ]
}
```

## Exemplo Completo com Autenticação

```jsx
import React, { useState, useEffect } from 'react';
import { BlockManagerDragDrop } from '@umbriel/storybook';
import { useAuth } from '../contexts/AuthContext';

const BlockManagerPage = ({ pageId }) => {
  const { token } = useAuth();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blockData, setBlockData] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Função para fazer requisições autenticadas
  const fetchWithAuth = async (url, options = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers
    };

    return fetch(url, {
      ...options,
      headers
    });
  };

  // Buscar artigos da API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await fetchWithAuth('https://api.example.com/articles');
        
        if (!response.ok) {
          throw new Error('Falha ao buscar artigos');
        }
        
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchArticles();
    }
  }, [token]);

  // Buscar dados do bloco existente (se houver)
  useEffect(() => {
    const fetchBlockData = async () => {
      try {
        const response = await fetchWithAuth(`https://api.example.com/pages/${pageId}/blocks`);
        
        if (!response.ok) {
          // Se não existir, não é um erro
          if (response.status === 404) {
            return;
          }
          throw new Error('Falha ao buscar dados do bloco');
        }
        
        const data = await response.json();
        setBlockData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    if (pageId && token) {
      fetchBlockData();
    }
  }, [pageId, token]);

  // Função para salvar os dados do bloco
  const handleSave = async (data) => {
    try {
      const response = await fetchWithAuth(`https://api.example.com/pages/${pageId}/blocks`, {
        method: blockData ? 'PUT' : 'POST',
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Falha ao salvar o bloco');
      }
      
      const result = await response.json();
      console.log('Bloco salvo com sucesso:', result);
      
      // Atualizar o estado local com os dados salvos
      setBlockData(result);
      
      // Exibir notificação de sucesso
      alert('Bloco salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar o bloco:', error);
      alert(`Erro ao salvar: ${error.message}`);
    }
  };

  // Toggle para o tema escuro
  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev);
  };

  if (!token) {
    return <div>Você precisa estar autenticado para acessar esta página.</div>;
  }

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div className={`container mx-auto p-4 ${isDarkTheme ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciador de Blocos</h1>
        
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
        >
          {isDarkTheme ? 'Tema Claro' : 'Tema Escuro'}
        </button>
      </div>
      
      <BlockManagerDragDrop
        articles={articles}
        blockType={blockData?.template || 'grid'}
        isDarkTheme={isDarkTheme}
        onSave={handleSave}
        variant={blockData?.variants[0]?.variantType || 'standard'}
        pageId={pageId}
      />
    </div>
  );
};

export default BlockManagerPage;
```

## Tratamento de Erros

É importante implementar um bom tratamento de erros para lidar com falhas na API:

```jsx
// Componente de notificação de erro
const ErrorNotification = ({ message, onClose }) => (
  <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-md shadow-lg">
    <div className="flex justify-between items-center">
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 text-white">×</button>
    </div>
  </div>
);

// No componente principal
const BlockManagerPage = ({ pageId }) => {
  // ... outros estados
  const [errorMessage, setErrorMessage] = useState(null);

  // Função para salvar com tratamento de erro melhorado
  const handleSave = async (data) => {
    try {
      const response = await fetchWithAuth(`https://api.example.com/pages/${pageId}/blocks`, {
        method: blockData ? 'PUT' : 'POST',
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Falha ao salvar o bloco');
      }
      
      const result = await response.json();
      console.log('Bloco salvo com sucesso:', result);
      
      // Atualizar o estado local com os dados salvos
      setBlockData(result);
      
      // Exibir notificação de sucesso
      setSuccessMessage('Bloco salvo com sucesso!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error('Erro ao salvar o bloco:', error);
      setErrorMessage(error.message);
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {errorMessage && (
        <ErrorNotification 
          message={errorMessage} 
          onClose={() => setErrorMessage(null)} 
        />
      )}
      
      {successMessage && (
        <SuccessNotification 
          message={successMessage} 
          onClose={() => setSuccessMessage(null)} 
        />
      )}
      
      {/* Resto do componente */}
    </div>
  );
};
```

## Considerações de Segurança

1. **Autenticação**: Sempre use tokens JWT ou outro método seguro para autenticar requisições à API.
2. **Validação**: Valide os dados tanto no cliente quanto no servidor.
3. **CSRF Protection**: Implemente proteção contra ataques CSRF.
4. **Rate Limiting**: Implemente limitação de taxa para evitar abusos.

## Otimizações

1. **Caching**: Considere implementar cache para os artigos e configurações de bloco.
2. **Debounce**: Implemente debounce para evitar múltiplas requisições durante edições rápidas.
3. **Paginação**: Se houver muitos artigos, implemente paginação na API de artigos.

## Conclusão

Com esta integração, o componente BlockManagerDragDrop pode ser facilmente conectado a uma API backend para persistir os dados dos layouts. A estrutura flexível do componente permite adaptá-lo a diferentes necessidades e APIs. 