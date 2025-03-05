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

interface SidebarProps {
  articles?: Article[];
  isLoading?: boolean;
  className?: string;
  pageData?: PageResponse[];
  editorialsData?: Editorial;
  isPagesLoading: boolean;
  isEditorialsLoading: boolean;
  blockConfig: BlockConfig;
  onPageSelect?: (pageId: string) => void;
  onEditorialSelect?: (editorialId: string, subEditorialId?: string) => void;
  onClearSelection?: () => void;
  onPublishBlock?: () => void;
  onSave?: (data?: any) => void;
  onConfigClick?: () => void;
  children?: React.ReactNode;
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
    onClearSelection?.();
  };

  const handleSaveClick = () => {
    onSave?.();
  };

  const filteredArticles = useMemo(() => {
    if (!searchTerm) return articles;
    
    return articles.filter(article => 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [articles, searchTerm]);

  // Garantir que temos arrays válidos para trabalhar
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
    <Card className={className}>
      <Tabs defaultValue="pages" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pages">Páginas</TabsTrigger>
          <TabsTrigger value="editorials">Editorias</TabsTrigger>
        </TabsList>

        <TabsContent value="pages">
          <div className="space-y-4">
            <Select
              onValueChange={handlePageSelect}
              defaultValue={selectedPage}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma página" />
              </SelectTrigger>  
              <SelectContent> 
                {!isPagesLoading && pages.length > 0 ? (
                  pages.map((page) => (
                    <SelectItem key={page.id} value={page.id}>
                      {page.title}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-pages" disabled>
                    {isPagesLoading ? 'Carregando páginas...' : 'Nenhuma página disponível'}
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        </TabsContent>

        <TabsContent value="editorials">
          <div className="space-y-4">
            <Select
              onValueChange={(editorialId) => handleEditorialSelect(editorialId)}
              defaultValue={selectedEditorial}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma editoria" />
              </SelectTrigger>  
              <SelectContent> 
                {!isEditorialsLoading && editorials && editorials.length > 0 ? (
                  editorials.map((editorial) => (
                    <SelectItem key={editorial.id} value={editorial.id}>
                      {editorial.title}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-editorials" disabled>
                    {isEditorialsLoading ? 'Carregando editorias...' : 'Nenhuma editoria disponível'}
                  </SelectItem>
                )}
              </SelectContent>
            </Select>

            {selectedEditorial && (
              <Select
                onValueChange={(subEditorialId) => handleEditorialSelect(selectedEditorial, subEditorialId)}
                defaultValue={selectedSubEditorial}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma sub-editoria" />
                </SelectTrigger>  
                <SelectContent> 
                  {(() => {
                    const selectedEditorialData = editorials.find(e => e.id === selectedEditorial);
                    const hasChildren = selectedEditorialData?.children && selectedEditorialData.children.length > 0;
                    
                    return hasChildren ? (
                      selectedEditorialData.children.map((subEditorial) => (
                        <SelectItem key={subEditorial.id} value={subEditorial.id}>
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
        
        <section className='mt-2 flex flex-col gap-2'>
          {onSave && (
            <Button 
              className='w-full' 
              variant="primary"
              onClick={handleSaveClick}
            >
              Salvar
            </Button>
          )}
          
          {onConfigClick && (
            <Button 
              className='w-full' 
              variant="info"
              onClick={onConfigClick}
            >
              Configurar Estilos
            </Button>
          )}         
          <Button 
            className='w-full' 
            variant="warning" 
            onClick={handleClearSelection}
          >
            Limpar seleção
          </Button>
        </section>
      </Tabs>
      {children}
    </Card>
  );
}

export default memo(Sidebar);