import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Layout, FileText, Search, ChevronRight, Loader2 } from 'lucide-react';
import Button from '../../../components/Button';

// Interfaces para os tipos de dados
interface Page {
  id: string;
  title: string;
  slug: string;
  section?: {
    id: string;
    name: string;
  };
}

interface Section {
  id: string;
  name: string;
  slug: string;
  pages?: Page[];
}

interface BlockTargetSelectorProps {
  onSelectTarget: (targetType: 'page' | 'section', targetId: string) => void;
  sections: Section[];
  pages: Page[];
  isLoading?: boolean;
  selectedTargetId?: string;
  selectedTargetType?: 'page' | 'section';
}

const BlockTargetSelector: React.FC<BlockTargetSelectorProps> = ({
  onSelectTarget,
  sections,
  pages,
  isLoading = false,
  selectedTargetId,
  selectedTargetType
}) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSections, setFilteredSections] = useState<Section[]>(sections);
  const [filteredPages, setFilteredPages] = useState<Page[]>(pages);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<'sections' | 'pages'>('sections');

  // Atualizar os dados filtrados quando os dados originais ou o termo de busca mudar
  useEffect(() => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      
      // Filtrar seções
      const matchedSections = sections.filter(section => 
        section.name.toLowerCase().includes(term) || 
        section.slug.toLowerCase().includes(term)
      );
      
      // Filtrar páginas
      const matchedPages = pages.filter(page => 
        page.title.toLowerCase().includes(term) || 
        page.slug.toLowerCase().includes(term) ||
        page.section?.name.toLowerCase().includes(term)
      );
      
      setFilteredSections(matchedSections);
      setFilteredPages(matchedPages);
      
      // Expandir automaticamente as seções que correspondem à pesquisa
      const newExpandedSections: Record<string, boolean> = {};
      matchedSections.forEach(section => {
        newExpandedSections[section.id] = true;
      });
      setExpandedSections(newExpandedSections);
    } else {
      setFilteredSections(sections);
      setFilteredPages(pages);
    }
  }, [sections, pages, searchTerm]);

  // Expandir/recolher uma seção
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Verificar se um item está selecionado
  const isSelected = (type: 'page' | 'section', id: string) => {
    return selectedTargetType === type && selectedTargetId === id;
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-heading flex items-center">
          <Layout className="mr-2 h-5 w-5 text-blue-500" />
          {t('blockTargetSelector.title')}
        </h3>
        
        {/* Barra de pesquisa */}
        <div className="mt-3 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="pl-10 pr-3 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-heading"
            placeholder={t('blockTargetSelector.search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Tabs */}
        <div className="mt-3 flex border-b border-gray-200 dark:border-gray-700">
          <button
            className={`px-4 py-2 text-sm font-medium font-heading ${
              activeTab === 'sections'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('sections')}
          >
            {t('blockTargetSelector.tabs.sections')}
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium font-heading ${
              activeTab === 'pages'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('pages')}
          >
            {t('blockTargetSelector.tabs.pages')}
          </button>
        </div>
      </div>
      
      {/* Conteúdo */}
      <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
        {isLoading ? (
          <div className="py-8 text-center text-gray-500 dark:text-gray-400 font-heading">
            <div className="flex flex-col items-center">
              <Loader2 className="h-8 w-8 animate-spin mb-2" />
              {t('blockTargetSelector.loading')}
            </div>
          </div>
        ) : activeTab === 'sections' ? (
          // Lista de Editorias
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredSections.length === 0 ? (
              <div className="py-8 text-center text-gray-500 dark:text-gray-400 font-heading">
                <Layout className="h-10 w-10 mx-auto mb-2 opacity-50" />
                {searchTerm 
                  ? t('blockTargetSelector.noSectionsFound') 
                  : t('blockTargetSelector.noSections')}
              </div>
            ) : (
              filteredSections.map(section => (
                <div key={section.id} className="divide-y divide-gray-100 dark:divide-gray-800">
                  {/* Cabeçalho da Editoria */}
                  <div 
                    className={`flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                      isSelected('section', section.id) ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                    onClick={() => toggleSection(section.id)}
                  >
                    <div className="flex items-center">
                      <Layout className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                      <span className="font-medium text-gray-900 dark:text-white font-heading">
                        {section.name}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectTarget('section', section.id);
                        }}
                        variant={isSelected('section', section.id) ? 'primary' : 'secondary'}
                        className="text-xs font-heading mr-2"
                      >
                        {t('blockTargetSelector.select')}
                      </Button>
                      <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform ${
                        expandedSections[section.id] ? 'rotate-90' : ''
                      }`} />
                    </div>
                  </div>
                  
                  {/* Páginas da Editoria */}
                  {expandedSections[section.id] && section.pages && section.pages.length > 0 && (
                    <div className="pl-8 bg-gray-50 dark:bg-gray-800/30">
                      {section.pages.map(page => (
                        <div 
                          key={page.id}
                          className={`flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-800/70 transition-colors ${
                            isSelected('page', page.id) ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                          }`}
                        >
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                            <span className="text-sm text-gray-900 dark:text-white font-heading">
                              {page.title}
                            </span>
                          </div>
                          <Button
                            onClick={() => onSelectTarget('page', page.id)}
                            variant={isSelected('page', page.id) ? 'primary' : 'secondary'}
                            className="text-xs font-heading"
                          >
                            {t('blockTargetSelector.select')}
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        ) : (
          // Lista de Páginas
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredPages.length === 0 ? (
              <div className="py-8 text-center text-gray-500 dark:text-gray-400 font-heading">
                <FileText className="h-10 w-10 mx-auto mb-2 opacity-50" />
                {searchTerm 
                  ? t('blockTargetSelector.noPagesFound') 
                  : t('blockTargetSelector.noPages')}
              </div>
            ) : (
              filteredPages.map(page => (
                <div 
                  key={page.id}
                  className={`flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                    isSelected('page', page.id) ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                >
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                      <span className="font-medium text-gray-900 dark:text-white font-heading">
                        {page.title}
                      </span>
                    </div>
                    {page.section && (
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-7 font-heading">
                        {page.section.name}
                      </span>
                    )}
                  </div>
                  <Button
                    onClick={() => onSelectTarget('page', page.id)}
                    variant={isSelected('page', page.id) ? 'primary' : 'secondary'}
                    className="text-xs font-heading"
                  >
                    {t('blockTargetSelector.select')}
                  </Button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockTargetSelector; 