// src/components/BlockManagerDragDrop/components/Sidebar.tsx
import { useState, useMemo, memo } from 'react';
import { Article } from 'src/components/PageblockV2/types';
import { PageResponse } from '../interfaces/pages.types';
import { Editorial } from '../interfaces/editorial.types';
import { BlockConfig } from '../components/StyleConfigModal';
import { Card } from '../../radix/components/ui/card';
import { ScrollArea } from '../../radix/components/ui/scroll';
import { Skeleton } from '../../radix/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../radix/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../radix/components/ui/select';
import Button from '../../Button';
import { Input } from '../../radix/components/ui/input';
import { Label } from '../../radix/components/ui/label';
import { Switch } from '../../radix/components/ui/switch';

interface SidebarProps {
  articles?: Article[];
  isLoading?: boolean;
  className?: string;
  pageData?: PageResponse[];
  editorialsData?: Editorial;
  isPagesLoading: boolean;
  isEditorialsLoading: boolean;
  blockConfig: BlockConfig;
  filters: ArticleFilters;
  onFiltersChange: (filters: ArticleFilters) => void;
  onPageSelect?: (pageId: string) => void;
  onEditorialSelect?: (editorialId: string, subEditorialId?: string) => void;
  onClearSelection?: () => void;
  onPublishBlock?: () => void;
  onSave?: (data?: any) => void;
  onConfigClick?: () => void;
  children?: React.ReactNode;
}

interface ArticleFilters {
  hasImage: boolean;
  limit: number;
  searchTerm: string;
}

function Sidebar({ 
  articles = [],
  isLoading, 
  className, 
  pageData = [],
  editorialsData, 
  blockConfig, 
  isPagesLoading, 
  isEditorialsLoading,
  filters,
  onFiltersChange,
  onPageSelect,
  onEditorialSelect,
  onClearSelection,
  onPublishBlock,
  onSave,
  onConfigClick,
  children
}: SidebarProps) {
  const [selectedPage, setSelectedPage] = useState<string>('');
  const [selectedEditorial, setSelectedEditorial] = useState<string>('');
  const [selectedSubEditorial, setSelectedSubEditorial] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  console.log(filters);

  const handlePageSelect = (pageId: string) => {
    setSelectedPage(pageId);
    setSelectedEditorial('');
    setSelectedSubEditorial('');
    onPageSelect?.(pageId);
  };

  const handleEditorialSelect = (editorialId: string, subEditorialId?: string) => {
    setSelectedEditorial(editorialId);
    if (subEditorialId) {
      setSelectedSubEditorial(subEditorialId);
    } else {
      setSelectedSubEditorial('');
    }
    setSelectedPage('');
    onEditorialSelect?.(editorialId, subEditorialId);
  };

  const handleClearSelection = () => {
    setSelectedPage('');
    setSelectedEditorial('');
    setSelectedSubEditorial('');
    setSearchTerm('');
    onClearSelection?.();
  };

  const handleSaveClick = () => {
    onSave?.();
  };

  const filteredArticles = useMemo(() => {
    let filtered = articles;

    // Filtro por imagem
    if (filters.hasImage) {
      filtered = filtered.filter(article => {
        const desktopImage = article.content?.image?.desktop_image_path;
        const mobileImage = article.content?.image?.mobile_image_path;
        return (desktopImage && desktopImage.length > 0) || (mobileImage && mobileImage.length > 0);
      });
    }

    // Filtro por texto (título e subtítulo)
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchLower) ||
        article.subtitle?.toLowerCase().includes(searchLower)
      );
    }

    // Aplicar limite
    return filtered.slice(0, filters.limit);
  }, [articles, filters]);

  const pages = Array.isArray(pageData) ? pageData : [];
  const editorials = editorialsData?.editorials || [];
  
  const filteredEditorials = useMemo(() => {
    if (!searchTerm) return editorials;
    
    return editorials.filter(editorial => 
      editorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      editorial.children.some(child => 
        child.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [editorials, searchTerm]);

  return (
    <Card className={`${className} shadow-lg border-gray-200 dark:border-gray-700`}>
      <div className="p-4 pb-2">
        <Tabs defaultValue="pages" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger 
              value="pages" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Páginas
            </TabsTrigger>
            <TabsTrigger 
              value="editorials"
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Editorias
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pages" className="mt-0">
            <div className="space-y-3">
              <Select
                onValueChange={handlePageSelect}
                defaultValue={selectedPage}
              >
                <SelectTrigger className="w-full border-gray-200 dark:border-gray-700 h-10">
                  <SelectValue placeholder="Selecione uma página" />
                </SelectTrigger>  
                <SelectContent className="max-h-[300px]"> 
                  {!isPagesLoading && pages.length > 0 ? (
                    pages.map((page) => (
                      <SelectItem 
                        key={page.id} 
                        value={page.id}
                        className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {page.title}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-pages" disabled>
                      {isPagesLoading ? (
                        <div className="flex items-center">
                          <Skeleton className="h-4 w-4 mr-2 rounded-full animate-spin" />
                          Carregando páginas...
                        </div>
                      ) : 'Nenhuma página disponível'}
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="editorials" className="mt-0">
            <div className="space-y-3">
              <Select
                onValueChange={(editorialId) => handleEditorialSelect(editorialId)}
                defaultValue={selectedEditorial}
              >
                <SelectTrigger className="w-full border-gray-200 dark:border-gray-700 h-10">
                  <SelectValue placeholder="Selecione uma editoria" />
                </SelectTrigger>  
                <SelectContent className="max-h-[300px]"> 
                  {!isEditorialsLoading && editorials && editorials.length > 0 ? (
                    editorials.map((editorial) => (
                      <SelectItem 
                        key={editorial.id} 
                        value={editorial.id}
                        className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {editorial.title}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-editorials" disabled>
                      {isEditorialsLoading ? (
                        <div className="flex items-center">
                          <Skeleton className="h-4 w-4 mr-2 rounded-full animate-spin" />
                          Carregando editorias...
                        </div>
                      ) : 'Nenhuma editoria disponível'}
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>

              {selectedEditorial && (
                <Select
                  onValueChange={(subEditorialId) => handleEditorialSelect(selectedEditorial, subEditorialId)}
                  defaultValue={selectedSubEditorial}
                >
                  <SelectTrigger className="w-full border-gray-200 dark:border-gray-700 h-10">
                    <SelectValue placeholder="Selecione uma sub-editoria" />
                  </SelectTrigger>  
                  <SelectContent className="max-h-[300px]"> 
                    {(() => {
                      const selectedEditorialData = editorials.find(e => e.id === selectedEditorial);
                      const hasChildren = selectedEditorialData?.children && selectedEditorialData.children.length > 0;
                      
                      return hasChildren ? (
                        selectedEditorialData.children.map((subEditorial) => (
                          <SelectItem 
                            key={subEditorial.id} 
                            value={subEditorial.id}
                            className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            {subEditorial.title}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-sub-editorials" disabled>
                          Nenhuma sub-editoria disponível
                        </SelectItem>
                      );
                    })()}
                  </SelectContent>
                </Select>
              )}
            </div>
          </TabsContent>
          
          <div className="mt-1 mb-4 flex flex-col gap-2 border-t pt-4 border-gray-200 dark:border-gray-700">
            <Button 
              className="w-full h-10 font-medium shadow-sm" 
              variant="warning" 
              onClick={handleClearSelection}
            >
              Limpar seleção
            </Button>
          </div>
        </Tabs>
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700">
        <div className="p-4 space-y-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="search" className="text-sm font-medium">Buscar artigos</Label>
              <Input
                id="search"
                type="search"
                placeholder="Digite para buscar..."
                value={filters.searchTerm}
                onChange={(e) => onFiltersChange({ ...filters, searchTerm: e.target.value })}
                className="mt-1.5"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch
                  id="has-image"
                  checked={filters.hasImage}
                  onCheckedChange={(checked: boolean) => onFiltersChange({ ...filters, hasImage: checked })}
                />
                <Label htmlFor="has-image" className="text-sm font-medium">
                  Apenas com imagem
                </Label>
              </div>
              
              <Select
                value={String(filters.limit)}
                onValueChange={(value) => onFiltersChange({ ...filters, limit: Number(value) })}
              >
                <SelectTrigger className="w-[110px]">
                  <SelectValue placeholder="Limite" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 artigos</SelectItem>
                  <SelectItem value="20">20 artigos</SelectItem>
                  <SelectItem value="30">30 artigos</SelectItem>
                  <SelectItem value="50">50 artigos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredArticles.length > 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {filteredArticles.length} artigos encontrados
            </p>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Nenhum artigo encontrado com os filtros atuais
            </p>
          )}
        </div>
        {children}
      </div>
    </Card>
  );
}

export default memo(Sidebar);