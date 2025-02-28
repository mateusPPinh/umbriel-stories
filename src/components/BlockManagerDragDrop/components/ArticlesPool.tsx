import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Article } from '../../PageblockV2/types';
import DraggableArticle from './DraggableArticle';

interface ArticlesPoolProps {
  articles: Article[];
  isDarkTheme?: boolean;
}

const ArticlesPool: React.FC<ArticlesPoolProps> = ({ articles, isDarkTheme }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortBy, setSortBy] = React.useState<'date' | 'title'>('date');
  const itemsPerPage = 12;

  // Filter and sort articles
  const filteredArticles = React.useMemo(() => {
    return articles
      .filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content?.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === 'date') {
          return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
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
    <div className="w-full">
      {/* Search and Controls */}
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Buscar artigos..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
            className={`
              w-full px-4 py-2 rounded-lg
              transition-colors duration-200
              ${isDarkTheme 
                ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600' 
                : 'bg-white text-gray-900 placeholder-gray-500 border-gray-300'
              }
              border focus:outline-none focus:ring-2 focus:ring-blue-500
            `}
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'date' | 'title')}
          className={`
            px-4 py-2 rounded-lg
            transition-colors duration-200
            ${isDarkTheme
              ? 'bg-gray-700 text-white border-gray-600'
              : 'bg-white text-gray-900 border-gray-300'
            }
            border focus:outline-none focus:ring-2 focus:ring-blue-500
          `}
        >
          <option value="date">Mais recentes</option>
          <option value="title">Ordem alfabética</option>
        </select>
      </div>

      {/* Results Summary */}
      <div className={`text-sm mb-2 ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
        {filteredArticles.length} artigos encontrados
      </div>

      {/* Articles Grid */}
      <Droppable droppableId="pool" direction="horizontal">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`
              grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 rounded-lg
              transition-all duration-200 min-h-[200px]
              ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-100'}
              ${snapshot.isDraggingOver ? 'ring-2 ring-blue-500 scale-[1.01]' : ''}
            `}
          >
            {paginatedArticles.map((article, index) => (
              <DraggableArticle
                key={article.id}
                article={article}
                index={index}
                isDarkTheme={isDarkTheme}
                isInColumn={false}
                columnIsFull={false}
              />
            ))}
            {provided.placeholder}

            {/* Empty State */}
            {filteredArticles.length === 0 && (
              <div className={`
                col-span-full flex flex-col items-center justify-center p-8
                ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}
              `}>
                <svg
                  className="w-12 h-12 mb-4 opacity-50"
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
                <p className="text-lg font-medium">Nenhum artigo encontrado</p>
                <p className="text-sm">Tente ajustar seus filtros de busca</p>
              </div>
            )}
          </div>
        )}
      </Droppable>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className={`
              px-3 py-1 rounded
              transition-colors duration-200
              ${isDarkTheme
                ? 'bg-gray-700 text-white disabled:bg-gray-800 disabled:text-gray-500'
                : 'bg-white text-gray-900 disabled:bg-gray-100 disabled:text-gray-400'
              }
              disabled:cursor-not-allowed
            `}
          >
            Anterior
          </button>
          <span className={`${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className={`
              px-3 py-1 rounded
              transition-colors duration-200
              ${isDarkTheme
                ? 'bg-gray-700 text-white disabled:bg-gray-800 disabled:text-gray-500'
                : 'bg-white text-gray-900 disabled:bg-gray-100 disabled:text-gray-400'
              }
              disabled:cursor-not-allowed
            `}
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
};

export default ArticlesPool; 