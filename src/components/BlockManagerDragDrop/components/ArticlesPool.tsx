import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Article } from '../../PageblockV2/types';
import DraggableArticle from './DraggableArticle';

interface ArticlesPoolProps {
  articles: Article[];
  isDarkTheme?: boolean;
  droppableId: string;
}

const ArticlesPool: React.FC<ArticlesPoolProps> = ({ articles, isDarkTheme, droppableId }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortBy, setSortBy] = React.useState<'date' | 'title'>('date');
  const itemsPerPage = 9; // Reduzido para melhor visualização

  // Filter and sort articles
  const filteredArticles = React.useMemo(() => {
    return articles
      .filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content?.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === 'date') {
          return new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime();
        }
        return a.title.localeCompare(b.title);
      });
  }, [articles, searchTerm, sortBy]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className={`w-full rounded-lg overflow-hidden border ${isDarkTheme ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
      {/* Header com título e contagem */}
      <div className={`flex items-center justify-between px-3 py-2 border-b ${isDarkTheme ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
        <h2 className={`text-sm font-medium ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
          Artigos Disponíveis
        </h2>
        <span className={`text-xs px-1.5 py-0.5 rounded-full ${isDarkTheme ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
          {filteredArticles.length} artigos
        </span>
      </div>

      {/* Barra de pesquisa e ordenação */}
      <div className={`p-3 border-b ${isDarkTheme ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Buscar artigos..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className={`w-full pl-8 pr-3 py-1.5 text-sm rounded-md ${
                isDarkTheme 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
              } border focus:ring-blue-500 focus:outline-none`}
            />
            <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
              <svg className={`h-4 w-4 ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'title')}
            className={`text-sm rounded-md ${
              isDarkTheme 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            } border focus:ring-blue-500 focus:border-blue-500`}
          >
            <option value="date">Mais recentes</option>
            <option value="title">Título (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Lista de artigos */}
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`p-3 min-h-[200px] ${
              snapshot.isDraggingOver 
                ? isDarkTheme ? 'bg-gray-700' : 'bg-blue-50' 
                : ''
            }`}
            style={{ maxHeight: '400px', overflowY: 'auto', overflowX: 'hidden' }}
          >
            {paginatedArticles.length > 0 ? (
              <div className="grid grid-cols-1 gap-2">
                {paginatedArticles.map((article, index) => (
                  <DraggableArticle
                    key={article.id}
                    article={article}
                    index={index}
                    isDarkTheme={isDarkTheme}
                    showRemoveButton={false}
                    onRemove={() => {}}
                  />
                ))}
              </div>
            ) : (
              <div className={`flex flex-col items-center justify-center h-32 text-center ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                <svg className="h-8 w-8 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                {searchTerm ? (
                  <p className="text-sm">Nenhum artigo encontrado para "{searchTerm}"</p>
                ) : (
                  <p className="text-sm">Todos os artigos já foram utilizados</p>
                )}
              </div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className={`flex items-center justify-between px-3 py-2 border-t ${isDarkTheme ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
          <div className={`text-xs ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
            <span className="hidden sm:inline">Mostrando </span>
            <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span>
            <span className="hidden sm:inline"> a </span>
            <span className="sm:hidden">-</span>
            <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredArticles.length)}</span>
            <span className="hidden sm:inline"> de </span>
            <span className="sm:hidden">/</span>
            <span className="font-medium">{filteredArticles.length}</span>
          </div>
          <div className="flex gap-0.5">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className={`
                p-1 rounded
                ${isDarkTheme
                  ? 'bg-gray-700 text-white disabled:bg-gray-800 disabled:text-gray-600'
                  : 'bg-white text-gray-700 disabled:bg-gray-100 disabled:text-gray-400'
                }
                disabled:cursor-not-allowed
              `}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`
                p-1 rounded
                ${isDarkTheme
                  ? 'bg-gray-700 text-white disabled:bg-gray-800 disabled:text-gray-600'
                  : 'bg-white text-gray-700 disabled:bg-gray-100 disabled:text-gray-400'
                }
                disabled:cursor-not-allowed
              `}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Page Numbers */}
            <div className="hidden sm:flex">
              {[...Array(Math.min(3, totalPages))].map((_, i) => {
                // Logic to show pages around current page
                let pageNum;
                if (totalPages <= 3) {
                  pageNum = i + 1;
                } else if (currentPage <= 2) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 1) {
                  pageNum = totalPages - 2 + i;
                } else {
                  pageNum = currentPage - 1 + i;
                }
                
                return (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`
                      w-6 h-6 flex items-center justify-center rounded mx-0.5 text-xs
                      ${currentPage === pageNum
                        ? isDarkTheme
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-600 text-white'
                        : isDarkTheme
                          ? 'bg-gray-700 text-white hover:bg-gray-600'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={`
                p-1 rounded
                ${isDarkTheme
                  ? 'bg-gray-700 text-white disabled:bg-gray-800 disabled:text-gray-600'
                  : 'bg-white text-gray-700 disabled:bg-gray-100 disabled:text-gray-400'
                }
                disabled:cursor-not-allowed
              `}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className={`
                p-1 rounded
                ${isDarkTheme
                  ? 'bg-gray-700 text-white disabled:bg-gray-800 disabled:text-gray-600'
                  : 'bg-white text-gray-700 disabled:bg-gray-100 disabled:text-gray-400'
                }
                disabled:cursor-not-allowed
              `}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Drag Indicator */}
      <div className={`flex items-center justify-center py-2 text-xs ${isDarkTheme ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}`}>
        <svg className="w-4 h-4 mr-1.5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
        <span>Arraste os artigos para as colunas</span>
      </div>
    </div>
  );
};

export default ArticlesPool; 