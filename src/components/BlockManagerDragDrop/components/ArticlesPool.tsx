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

      {/* Search and Controls */}
      <div className={`p-3 border-b ${isDarkTheme ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
              <svg className={`h-4 w-4 ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Buscar artigos..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
              className={`
                w-full pl-7 pr-3 py-1.5 text-sm rounded
                transition-colors duration-200
                ${isDarkTheme 
                  ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600' 
                  : 'bg-gray-50 text-gray-900 placeholder-gray-500 border-gray-300'
                }
                border focus:outline-none focus:ring-1 focus:ring-blue-500
              `}
            />
          </div>
          <div className="flex items-center">
            <label className={`mr-2 text-xs ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
              Ordenar:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'title')}
              className={`
                px-2 py-1.5 text-sm rounded
                transition-colors duration-200
                ${isDarkTheme
                  ? 'bg-gray-700 text-white border-gray-600'
                  : 'bg-gray-50 text-gray-900 border-gray-300'
                }
                border focus:outline-none focus:ring-1 focus:ring-blue-500
              `}
            >
              <option value="date">Mais recentes</option>
              <option value="title">Ordem alfabética</option>
            </select>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <Droppable droppableId={droppableId} direction="horizontal">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`
              grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-3
              transition-all duration-200 min-h-[250px] max-h-[400px] overflow-y-auto
              ${isDarkTheme ? 'bg-gray-800' : 'bg-white'}
              ${snapshot.isDraggingOver ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
            `}
          >
            {paginatedArticles.length > 0 ? (
              paginatedArticles.map((article, index) => (
                <DraggableArticle
                  key={article.id}
                  article={article}
                  index={index}
                  isDarkTheme={isDarkTheme}
                  showRemoveButton={false}
                  onRemove={() => {}}
                />
              ))
            ) : (
              <div className={`
                col-span-full flex flex-col items-center justify-center py-8
                ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}
              `}>
                {searchTerm ? (
                  <>
                    <svg
                      className="w-8 h-8 mb-3 opacity-50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <p className="text-sm font-medium">Nenhum artigo encontrado</p>
                    <p className="text-xs mt-1">Tente ajustar seus filtros de busca</p>
                    <button 
                      onClick={() => setSearchTerm('')}
                      className={`mt-3 px-3 py-1 rounded text-xs ${
                        isDarkTheme 
                          ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      }`}
                    >
                      Limpar busca
                    </button>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-8 h-8 mb-3 opacity-50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                    <p className="text-sm font-medium">Nenhum artigo disponível</p>
                    <p className="text-xs mt-1">Adicione artigos para começar</p>
                  </>
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