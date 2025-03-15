import { Suspense, useState, useCallback, useEffect, useRef } from 'react';
import SchedulePublishModal from './components/BlockManagerDragDrop/components/SchedulePublishModal';
import BlockManagerDragDrop, { BlockManagerDragDropRef } from './components/BlockManagerDragDrop/BlockManagerDragDrop';
import BlockTargetSelector from './components/BlockManagerDragDrop/components/BlockTargetSelector';
import ScheduleManager from './components/BlockManagerDragDrop/components/ScheduleManager';
import BlocksList from './components/BlockManagerDragDrop/components/BlocksList';
import ScheduleStatusBadge from './components/BlockManagerDragDrop/components/ScheduleStatusBadge';
import Skeleton from './components/Skeleton';
import { useTranslation } from 'react-i18next';
import { Clock, X } from 'lucide-react';

import { memo } from "react";
import { BlockTypeSelectorProps } from "./tests/interfaces";
import { ScheduleRequest, ScheduleResponse, ScheduleAction, ScheduleStatus } from './components/BlockManagerDragDrop/interfaces/schedule.types';
import { Article } from './components/PageblockV2/types';
import { Editorial } from './components/BlockManagerDragDrop/interfaces/editorial.types';
import { ClientTheme } from './components/BlockManagerDragDrop/types';

import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from  './components/ui/select'
import Button from './components/Button';

// Importando os mocks
import { editorialsMock } from './components/BlockManagerDragDrop/stories/editorials.mock';
import { pageMock } from './components/BlockManagerDragDrop/stories/page.mock';
import { pagblockByPageMock } from './components/BlockManagerDragDrop/stories/pagblock-by-page.mock';
import { onePageBlockMock } from './components/BlockManagerDragDrop/stories/one-pageblock.mock';
import { articlesMock } from './components/BlockManagerDragDrop/mocks/articles.mock';

const BlockTypeSelector = memo(({
  blockType,
  setBlockType
}: {
  blockType: 'grid' | 'list' | 'featured' | 'mixed',
  setBlockType: (type: 'grid' | 'list' | 'featured' | 'mixed') => void
}) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="font-medium">Tipo de Bloco:</span>
      <Select value={blockType} onValueChange={setBlockType}>
        <SelectTrigger className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="grid">Grid</SelectItem>
          <SelectItem value="list">Lista</SelectItem>
          <SelectItem value="featured">Destaque</SelectItem>
          <SelectItem value="mixed">Misto</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
});

const App = () => {
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);
  const [blockData, setBlockData] = useState<any>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string>('standard');
  const [blockType, setBlockType] = useState<'grid' | 'list' | 'featured' | 'mixed'>('grid');
  const [isMounted, setIsMounted] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isScheduleManagerVisible, setIsScheduleManagerVisible] = useState(false);
  const [allBlocks, setAllBlocks] = useState<any[]>([]);
  const [sections, setSections] = useState<any[]>([]);
  const [isLoadingBlocks, setIsLoadingBlocks] = useState(false);
  const [isBlockListVisible, setIsBlockListVisible] = useState(true);
  const [schedules, setSchedules] = useState<ScheduleResponse[]>([]);
  const [isLoadingSchedules, setIsLoadingSchedules] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTargetType, setSelectedTargetType] = useState<'page' | 'section'>('page');
  const [selectedTargetId, setSelectedTargetId] = useState<string | undefined>();
  const [draftBlocks, setDraftBlocks] = useState<any[]>([]);
  const [currentDraftBlock, setCurrentDraftBlock] = useState<any>(null);
  const [isCreatingNewBlock, setIsCreatingNewBlock] = useState(false);
  const [schedulingBlockId, setSchedulingBlockId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'builder' | 'schedule' | 'test'>('builder');
  const [testSchedulePayload, setTestSchedulePayload] = useState<any>(null);
  const [showTestResults, setShowTestResults] = useState(false);

  // Create a ref to access the BlockManagerDragDrop component
  const blockManagerRef = useRef<BlockManagerDragDropRef>(null);

  // Memoized functions using mock data
  const memoizedFetchSections = useCallback(async () => {
    try {
      return editorialsMock.editorials?.map((editorial: any) => ({
          id: editorial.id,
        name: editorial.title,
          slug: editorial.slug,
        pages: pageMock?.filter((page: any) => page.section?.id === editorial.id) || []
        })) || [];
    } catch (error) {
      console.error('Erro ao buscar seções:', error);
      return [];
    }
  }, []);

  const memoizedFetchPages = useCallback(async () => {
    try {
      return pageMock;
    } catch (error) {
      console.error('Erro ao buscar páginas:', error);
      return [];
    }
  }, []);

  const memoizedFetchSchedules = useCallback(async (targetType: 'page' | 'section' | 'all', targetId?: string): Promise<ScheduleResponse[]> => {
    try {
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create mock schedule data
      const mockSchedules: ScheduleResponse[] = [
        {
          id: '1',
          tenantId: 'tenant-1',
          blockType: 'grid',
          blockPosition: 0,
          template: 'standard',
          variants: [],
          metadata: {
            title: 'Scheduled Grid Block Update',
            description: 'This block will be updated automatically'
          },
          pageId: pageMock[0]?.id || 'page-1',
          created_at: new Date(Date.now() - 86400000).toISOString(), // yesterday
          updated_at: new Date(Date.now() - 86400000).toISOString(),
          scheduledAt: new Date(Date.now() + 86400000).toISOString(), // tomorrow
          scheduledAction: 'update',
          scheduleStatus: 'pending',
          scheduledData: null
        },
        {
          id: '2',
          tenantId: 'tenant-1',
          blockType: 'list',
          blockPosition: 1,
          template: 'standard',
          variants: [],
          metadata: {
            title: 'Scheduled List Block Publish',
            description: 'This block will be published automatically'
          },
          pageId: pageMock[0]?.id || 'page-1',
          created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          updated_at: new Date(Date.now() - 172800000).toISOString(),
          scheduledAt: new Date(Date.now() + 172800000).toISOString(), // in 2 days
          scheduledAction: 'publish',
          scheduleStatus: 'pending',
          scheduledData: null
        },
        {
          id: '3',
          tenantId: 'tenant-1',
          blockType: 'featured',
          blockPosition: 2,
          template: 'standard',
          variants: [],
          metadata: {
            title: 'Scheduled Featured Block Delete',
            description: 'This block will be deleted automatically'
          },
          pageId: pageMock[1]?.id || 'page-2',
          created_at: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
          updated_at: new Date(Date.now() - 259200000).toISOString(),
          scheduledAt: new Date(Date.now() + 259200000).toISOString(), // in 3 days
          scheduledAction: 'delete',
          scheduleStatus: 'pending',
          scheduledData: null
        },
        {
          id: '4',
          tenantId: 'tenant-1',
          blockType: 'mixed',
          blockPosition: 3,
          template: 'standard',
          variants: [],
          metadata: {
            title: 'Completed Schedule',
            description: 'This schedule has been completed'
          },
          pageId: pageMock[0]?.id || 'page-1',
          created_at: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
          updated_at: new Date(Date.now() - 86400000).toISOString(), // updated yesterday
          scheduledAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          scheduledAction: 'update',
          scheduleStatus: 'completed',
          scheduledData: null
        },
        {
          id: '5',
          tenantId: 'tenant-1',
          blockType: 'grid',
          blockPosition: 4,
          template: 'standard',
          variants: [],
          metadata: {
            title: 'Cancelled Schedule',
            description: 'This schedule has been cancelled'
          },
          pageId: pageMock[1]?.id || 'page-2',
          created_at: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
          updated_at: new Date(Date.now() - 259200000).toISOString(), // updated 3 days ago
          scheduledAt: new Date(Date.now() - 86400000).toISOString(), // yesterday
          scheduledAction: 'publish',
          scheduleStatus: 'canceled',
          scheduledData: null
        }
      ];
      
      // Use Promise.all to simulate parallel API calls
      return await Promise.all(
        mockSchedules
          .filter(schedule => {
            if (targetType === 'all') return true;
            if (targetType === 'page' && targetId) return schedule.pageId === targetId;
            if (targetType === 'section' && targetId) {
              // For section filtering, we need to check if the page belongs to the section
              // Since pageMock doesn't have a section property, we'll use the memoizedFetchSections
              // to get the pages for each section
              const sections = editorialsMock.editorials || [];
              const section = sections.find(s => s.id === targetId);
              if (section) {
                // Get pages that might belong to this section from our memoized function
                const pagesInSection = pageMock.filter((page: any) => {
                  // Check if the page has been associated with this section in the memoizedFetchSections
                  return page.id === schedule.pageId;
                });
                return pagesInSection.length > 0;
              }
            }
            return false;
          })
          .map(async schedule => {
            // Simulate some processing time for each schedule
            await new Promise(resolve => setTimeout(resolve, Math.random() * 100));
            return schedule;
          })
      );
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error);
      return [];
    }
  }, []);

  const memoizedCancelSchedule = useCallback(async (scheduleId: string) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update the schedules state to mark the schedule as cancelled
      setSchedules(prevSchedules => 
        prevSchedules.map(schedule => 
          schedule.id === scheduleId 
            ? { ...schedule, scheduleStatus: 'canceled' as ScheduleStatus } 
            : schedule
        )
      );
      
      setSuccessMessage(t('blockBuilder.success.cancelSchedule'));
      setTimeout(() => setSuccessMessage(null), 5000);
      return Promise.resolve();
    } catch (error) {
      console.error('Erro ao cancelar agendamento:', error);
      setErrorMessage(t('blockBuilder.error.cancelSchedule'));
      setTimeout(() => setErrorMessage(null), 5000);
      return Promise.reject(error);
    }
  }, [t]);

  // Set isMounted to true after component mounts
  useEffect(() => {
    // Inicialmente, não queremos que o blockData seja definido automaticamente
    setBlockData(null);
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Initialize selectedPage with the first page when pageData is available
  useEffect(() => {
    if (pageMock && pageMock.length > 0 && !selectedPage && isMounted) {
      // Apenas definir a página selecionada, mas não carregar o bloco automaticamente
      setSelectedPage(pageMock[0].id);
    }
  }, [selectedPage, isMounted, pageMock]);

  // Efeito para carregar os blocos iniciais do mock
  useEffect(() => {
    if (isMounted && selectedPage && allBlocks.length === 0) {
      const fetchBlockData = async () => {
        try {
          setIsLoadingBlocks(true);
          // Usando os dados mockados - pagblockByPageMock é um array de arrays
          const pageBlocks = pagblockByPageMock[0]; // Pegando o primeiro array de blocos para teste
          
          if (pageBlocks && pageBlocks.length > 0) {
            // Não definir blockData automaticamente para evitar que o botão "Limpar Seleção" apareça
            // Apenas adicionar os blocos à lista
            const existingBlockIds = new Set([...draftBlocks, ...allBlocks].map(block => block.id));
            const newMockBlocks = pageBlocks.filter((block: any) => !existingBlockIds.has(block.id));
            
            if (newMockBlocks.length > 0) {
              setAllBlocks(prevBlocks => [...prevBlocks, ...newMockBlocks]);
            }
          }
        } catch (err: any) {
          console.error('Erro ao buscar dados do bloco:', err);
          setError('Falha ao carregar dados do bloco. Por favor, tente novamente.');
        } finally {
          setIsLoadingBlocks(false);
        }
      };

      fetchBlockData();
    }
  }, [isMounted, selectedPage, allBlocks.length, draftBlocks]);

  // Fetch sections when component mounts
  useEffect(() => {
    const fetchSections = async () => {
      const fetchedSections = await memoizedFetchSections();
      setSections(fetchedSections);
    };
    fetchSections();
  }, [memoizedFetchSections]);

  const handleSelectTarget = (targetType: 'page' | 'section', targetId: string) => {
    setSelectedTargetType(targetType);
    setSelectedTargetId(targetId);
  };

  const handleEditBlock = (blockId: string) => {
    const selectedBlock = allBlocks.find((block: any) => block.id === blockId);
    if (selectedBlock) {
      console.log('Selected block:', selectedBlock);
      
      // Extrair os artigos do bloco selecionado
      let articlesFromBlock: any[] = [];
      
      // Verificar se o bloco tem variantes e se a primeira variante tem config.articles
      if (selectedBlock.variants && 
          selectedBlock.variants.length > 0 && 
          selectedBlock.variants[0].config && 
          selectedBlock.variants[0].config.articles) {
        // Usar os artigos da configuração da variante
        const variantArticles = selectedBlock.variants[0].config.articles;
        
        // Formatar os artigos para o BlockManagerDragDrop
        const formattedArticles: Record<string, any[]> = {};
        
        // Converter o objeto de artigos para o formato esperado
        Object.keys(variantArticles).forEach((colKey) => {
          formattedArticles[colKey] = variantArticles[colKey];
        });
        
        // Extrair todos os artigos para articlesData
        articlesFromBlock = Object.values(variantArticles).flat();
        
        // Criar um objeto com a estrutura correta para o BlockManagerDragDrop
        const blockDataWithArticles = {
          ...selectedBlock,
          articlesData: articlesFromBlock,
          itemsLength: articlesFromBlock.length,
          variant: selectedBlock.variants[0].variantType || 'standard',
          articles: formattedArticles
        };
        
        console.log('Block data with articles:', blockDataWithArticles);
        
        setBlockData(blockDataWithArticles);
        setBlockType(selectedBlock.template as 'grid' | 'list' | 'featured' | 'mixed');
        if (selectedBlock.variants && selectedBlock.variants.length > 0) {
          setSelectedVariant(selectedBlock.variants[0].variantType || 'standard');
        }
    } else {
        // Se não houver artigos na configuração da variante, usar os artigos do mock
        // Criar um objeto com a estrutura correta para o BlockManagerDragDrop
        const mockArticles = articlesMock.slice(0, 5);
        
        // Para o tipo 'list', precisamos de um formato específico
        let formattedArticles: Record<string, any[]>;
        
        if (selectedBlock.template === 'list') {
          formattedArticles = {
            'list-items': mockArticles
          };
    } else {
          formattedArticles = {
            'col-0': mockArticles.slice(0, 2),
            'col-1': mockArticles.slice(2, 4),
            'col-2': mockArticles.slice(4, 5)
          };
        }
        
        const blockDataWithArticles = {
          ...selectedBlock,
          articlesData: mockArticles,
          itemsLength: mockArticles.length,
          variant: selectedBlock.variants?.[0]?.variantType || 'standard',
          articles: formattedArticles
        };
        
        console.log('Block data with mock articles:', blockDataWithArticles);
        
        setBlockData(blockDataWithArticles);
        setBlockType(selectedBlock.template as 'grid' | 'list' | 'featured' | 'mixed');
        if (selectedBlock.variants && selectedBlock.variants.length > 0) {
          setSelectedVariant(selectedBlock.variants[0].variantType || 'standard');
        }
      }
    }
  };

  // Função para criar um novo bloco em rascunho
  const handleCreateNewBlock = () => {
    // Limpar qualquer bloco selecionado anteriormente
    setBlockData(null);
    setCurrentDraftBlock(null);
    setSchedulingBlockId(null);
    
    // Definir o estado para criação de novo bloco
    setIsCreatingNewBlock(true);
    
    // Criar um novo bloco vazio com a estrutura básica
    const defaultArticles = {
      "col-0": ["article-1-123", "article-2-456", "article-3-789"],
      "col-1": ["article-4-321", "article-5-654", "article-6-987"],
      "col-2": ["article-7-111", "article-8-222", "article-9-333"]
    };
    
    const newBlock = {
      id: `draft-${Date.now()}`,
      tenantId: "93b80848-57e1-4383-a0f4-614a58a2121f",
      blockType: "articles",
      blockPosition: allBlocks.length + 1,
      template: blockType,
      pageId: selectedPage,
      metadata: {
        title: `Novo Bloco ${blockType.charAt(0).toUpperCase() + blockType.slice(1)}`,
        description: `Bloco em rascunho do tipo ${blockType} com variante ${selectedVariant}`
      },
      variants: [
        {
          variantType: selectedVariant,
          variantPosition: 1,
          config: {
            layout: {
              columns: blockType === 'grid' ? "3" : "1",
              gap: "6",
              styles: {
                width: "100%",
                backgroundColor: "transparent"
              }
            },
            articles: defaultArticles,
            styles: {
              theme: {
                light: {
                  columnStyle: {
                    background: "white",
                    padding: "1rem"
                  },
                  headingProps: {
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    color: "#111827"
                  },
                  subtitleProps: {
                    fontSize: "0.875rem",
                    color: "#6B7280"
                  }
                },
                dark: {
                  columnStyle: {
                    background: "#1F2937",
                    padding: "1rem"
                  },
                  headingProps: {
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    color: "#F9FAFB"
                  },
                  subtitleProps: {
                    fontSize: "0.875rem",
                    color: "#9CA3AF"
                  }
                }
              },
              showExcerpt: true
            }
          }
        }
      ],
      isDraft: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    // Definir o novo bloco como o bloco atual
    setBlockData(newBlock);
    
    console.log('Novo bloco criado:', newBlock);
  };

  // Função para salvar um bloco como rascunho
  const handleSaveAsDraft = (blockData: any) => {
    try {
      console.log('Dados recebidos em handleSaveAsDraft:', blockData);
      
      // Criar uma estrutura de articles para garantir que não fique vazia
      const defaultArticles = {
        "col-0": ["article-1-123", "article-2-456", "article-3-789"],
        "col-1": ["article-4-321", "article-5-654", "article-6-987"],
        "col-2": ["article-7-111", "article-8-222", "article-9-333"]
      };
      
      // Verificar se estamos editando um rascunho existente ou criando um novo
      if (currentDraftBlock) {
        // Atualizar o rascunho existente
        const updatedDraft = {
          ...currentDraftBlock,
          ...blockData,
          updated_at: new Date().toISOString()
        };
        
        // Garantir que os articles sejam preservados
        if (blockData.variants && blockData.variants.length > 0 && 
            currentDraftBlock.variants && currentDraftBlock.variants.length > 0) {
          updatedDraft.variants = blockData.variants.map((variant: any, index: number) => {
            const currentVariant = currentDraftBlock.variants[index] || {};
            
            // Verificar se há articles no config
            const hasArticles = variant.config?.articles && 
                               Object.keys(variant.config.articles).some(key => 
                                 Array.isArray(variant.config.articles[key]) && 
                                 variant.config.articles[key].length > 0);
            
            return {
              ...currentVariant,
              ...variant,
              config: {
                ...currentVariant.config,
                ...variant.config,
                // Se não houver artigos, usar a estrutura padrão
                articles: hasArticles ? variant.config.articles : defaultArticles
              }
            };
          });
        }
        
        console.log('Rascunho atualizado:', updatedDraft);
        
        // Atualizar o rascunho na lista
        const updatedDrafts = draftBlocks.map(draft => 
          draft.id === currentDraftBlock.id ? updatedDraft : draft
        );
        
        setDraftBlocks(updatedDrafts);
        setCurrentDraftBlock(updatedDraft);
        setBlockData(updatedDraft);
        
        // Atualizar também na lista de todos os blocos
        const updatedAllBlocks = allBlocks.map(block => 
          block.id === currentDraftBlock.id ? updatedDraft : block
        );
        
        setAllBlocks(updatedAllBlocks);
        
        setSuccessMessage("Rascunho atualizado com sucesso!");
      } else {
        // Criar um novo rascunho
        const newDraft = {
          ...blockData,
          id: `draft-${Date.now()}`,
          tenantId: "93b80848-57e1-4383-a0f4-614a58a2121f",
          blockType: "articles",
          blockPosition: allBlocks.length + 1,
          template: blockType,
          pageId: selectedPage,
          metadata: {
            title: `Novo Bloco ${blockType.charAt(0).toUpperCase() + blockType.slice(1)}`,
            description: `Bloco em rascunho do tipo ${blockType} com variante ${selectedVariant}`
          },
          variants: [
            {
              variantType: selectedVariant,
              variantPosition: 1,
              config: {
                layout: {
                  columns: blockType === 'grid' ? "3" : "1",
                  gap: "6",
                  styles: {
                    width: "100%",
                    backgroundColor: "transparent"
                  }
                },
                // Usar a estrutura padrão de articles
                articles: defaultArticles,
                styles: {
                  theme: {
                    light: {
                      columnStyle: {
                        background: "white",
                        padding: "1rem"
                      },
                      headingProps: {
                        fontSize: "1.125rem",
                        fontWeight: "600",
                        color: "#111827"
                      },
                      subtitleProps: {
                        fontSize: "0.875rem",
                        color: "#6B7280"
                      }
                    },
                    dark: {
                      columnStyle: {
                        background: "#1F2937",
                        padding: "1rem"
                      },
                      headingProps: {
                        fontSize: "1.125rem",
                        fontWeight: "600",
                        color: "#F9FAFB"
                      },
                      subtitleProps: {
                        fontSize: "0.875rem",
                        color: "#9CA3AF"
                      }
                    }
                  },
                  showExcerpt: true
                }
              }
            }
          ],
          isDraft: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        console.log('Novo rascunho criado:', newDraft);
        
        // Adicionar o novo rascunho à listas
        setDraftBlocks([...draftBlocks, newDraft]);
        setAllBlocks([...allBlocks, newDraft]);
        
        // Definir o rascunho atual
        setCurrentDraftBlock(newDraft);
        setBlockData(newDraft);
        setIsCreatingNewBlock(false);
        
        setSuccessMessage("Novo rascunho criado com sucesso!");
      }
      
      setTimeout(() => setSuccessMessage(null), 5000);
        } catch (error) {
      console.error('Erro ao salvar rascunho:', error);
      setErrorMessage("Erro ao salvar rascunho. Por favor, tente novamente.");
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  // Função para agendar a publicação de um bloco
  const handleScheduleBlock = (blockId: string) => {
    // Encontrar o bloco a ser agendado (pode ser um rascunho ou um bloco existente)
    const blockToSchedule = allBlocks.find(block => block.id === blockId) || 
                           draftBlocks.find(block => block.id === blockId);
    
    if (blockToSchedule) {
      // Get the current data from the BlockManagerDragDrop component
      const currentData = blockManagerRef.current?.getCurrentData();
      
      // If we have current data, update the block with it
      if (currentData && currentData.articles) {
        console.log('Current data from BlockManagerDragDrop:', currentData);
        
        // Update the blockData with the current articles
        setBlockData((prevData: any) => {
          if (!prevData) return prevData;
          
          return {
            ...prevData,
            articles: currentData.articles
          };
        });
      }
      
      // Definir o ID do bloco que está sendo agendado
      setSchedulingBlockId(blockId);
      
      // Abrir o modal de agendamento
      setIsScheduleOpen(true);
    } else {
      setErrorMessage("Bloco não encontrado para agendamento.");
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  // Função para processar o agendamento após confirmação no modal
  const handleConfirmSchedule = (scheduleData: ScheduleRequest) => {
    if (!schedulingBlockId) {
      setErrorMessage("Nenhum bloco selecionado para agendamento.");
      return;
    }
    
    // Encontrar o bloco a ser agendado
    const blockToSchedule = allBlocks.find(block => block.id === schedulingBlockId) || 
                           draftBlocks.find(block => block.id === schedulingBlockId);
    
    if (!blockToSchedule) {
      setErrorMessage("Bloco não encontrado para agendamento.");
      return;
    }
    
    // Log para verificar os dados do agendamento
    console.log('Dados do agendamento (scheduleData):', scheduleData);
    console.log('Bloco a ser agendado (blockToSchedule):', blockToSchedule);
    
    // Criar uma estrutura de articles para garantir que não fique vazia
    const defaultArticles = {
      "col-0": ["article-1-123", "article-2-456", "article-3-789"],
      "col-1": ["article-4-321", "article-5-654", "article-6-987"],
      "col-2": ["article-7-111", "article-8-222", "article-9-333"]
    };
    
    // Garantir que os artigos sejam preservados corretamente
    const scheduledVariants = blockToSchedule.variants.map((variant: any) => {
      // Verificar se o variant.config.articles existe e tem dados
      const hasArticles = variant.config && variant.config.articles && 
                         Object.keys(variant.config.articles).some(key => 
                           Array.isArray(variant.config.articles[key]) && 
                           variant.config.articles[key].length > 0);
      
      return {
        ...variant,
        config: {
          ...variant.config,
          // Se não houver artigos, usar a estrutura padrão
          articles: hasArticles ? variant.config.articles : defaultArticles
        }
      };
    });
    
    // Criar um novo agendamento
    const newSchedule: ScheduleResponse = {
      id: `schedule-${Date.now()}`,
      tenantId: blockToSchedule.tenantId,
      blockType: blockToSchedule.blockType,
      blockPosition: blockToSchedule.blockPosition,
      template: blockToSchedule.template,
      variants: scheduledVariants,
      metadata: {
        title: scheduleData.scheduledData?.metadata?.title || blockToSchedule.metadata?.title || '',
        description: scheduleData.scheduledData?.metadata?.description || blockToSchedule.metadata?.description || ''
      },
      pageId: blockToSchedule.pageId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      scheduledAt: scheduleData.scheduledAt,
      scheduledAction: scheduleData.scheduledAction,
      scheduleStatus: 'pending',
      scheduledData: {
        ...blockToSchedule,
        ...scheduleData.scheduledData,
        // Garantir que os metadados sejam mesclados corretamente
        metadata: {
          ...blockToSchedule.metadata,
          ...scheduleData.scheduledData?.metadata
        },
        // Garantir que os variants e seus artigos sejam preservados
        variants: scheduledVariants
      }
    };
    
    // Log para verificar o novo agendamento criado
    console.log('Novo agendamento criado (newSchedule):', newSchedule);
    
    // Adicionar o novo agendamento à lista
    setSchedules(prevSchedules => [...prevSchedules, newSchedule]);
    
    // Se o bloco for um rascunho, marcar como agendado
    if (blockToSchedule.isDraft) {
      const updatedDrafts = draftBlocks.map(draft => {
        if (draft.id === schedulingBlockId) {
          return {
            ...draft,
            isScheduled: true,
            scheduledAt: scheduleData.scheduledAt,
            scheduledAction: scheduleData.scheduledAction,
            scheduleStatus: 'pending',
            // Garantir que os variants e seus artigos sejam preservados
            variants: scheduledVariants
          };
        }
        return draft;
      });
      setDraftBlocks(updatedDrafts);
      
      // Atualizar também na lista de todos os blocos
      const updatedAllBlocks = allBlocks.map(block => {
        if (block.id === schedulingBlockId) {
          return {
            ...block,
            isScheduled: true,
            scheduledAt: scheduleData.scheduledAt,
            scheduledAction: scheduleData.scheduledAction,
            scheduleStatus: 'pending',
            // Garantir que os variants e seus artigos sejam preservados
            variants: scheduledVariants
          };
        }
        return block;
      });
      setAllBlocks(updatedAllBlocks);
    }
    
    // Fechar o modal
    setIsScheduleOpen(false);
    
    // Limpar o estado de forma direta e sequencial
    setBlockData(null);
    setCurrentDraftBlock(null);
    setIsCreatingNewBlock(false);
    setSchedulingBlockId(null);
    setSelectedVariant('standard');
    setSelectedTargetId(undefined);
    
    // Mostrar mensagem de sucesso
    setSuccessMessage("Agendamento criado com sucesso!");
    setTimeout(() => setSuccessMessage(null), 5000);
    
    // Log para verificar se os estados foram limpos
    setTimeout(() => {
      console.log('Estado após agendamento:', {
        blockData,
        currentDraftBlock,
        isCreatingNewBlock,
        schedulingBlockId,
        isScheduleOpen,
        selectedVariant,
        selectedTargetId
      });
    }, 500);
  };

  const handleDeleteBlock = (blockId: string) => {
    // Verificar se o bloco existe na lista de blocos ou rascunhos
    const blockToDelete = allBlocks.find(block => block.id === blockId) || 
                         draftBlocks.find(block => block.id === blockId);
    
    if (!blockToDelete) {
      setErrorMessage("Bloco não encontrado para exclusão.");
      setTimeout(() => setErrorMessage(null), 5000);
      return;
    }
    
    // Se o bloco estiver agendado, cancelar o agendamento primeiro
    if (blockToDelete.scheduledAt && blockToDelete.scheduleStatus === 'pending') {
      // Remover da lista de agendamentos
      setSchedules(prevSchedules => 
        prevSchedules.filter(schedule => schedule.id !== blockId)
      );
    }
    
    // Remover da lista de blocos
    setAllBlocks(prevBlocks => 
      prevBlocks.filter(block => block.id !== blockId)
    );
    
    // Remover da lista de rascunhos
    setDraftBlocks(prevDrafts => 
      prevDrafts.filter(draft => draft.id !== blockId)
    );
    
    // Se o bloco atual for o que está sendo excluído, limpar o estado
    if (blockData && blockData.id === blockId) {
      setBlockData(null);
      setCurrentDraftBlock(null);
    }
    
    // Mostrar mensagem de sucesso
    setSuccessMessage("Bloco excluído com sucesso!");
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  const clientGeneralSettingsData: ClientTheme = {
    fontMapping: {
      pageblockTitle: "'Noto Sans Variable', sans-serif",
      pageblockSubtitle: "'Noto Sans Variable', sans-serif",
      pageblockText: "'Noto Sans Variable', sans-serif"
    },
    colorMapping: {
      light: {
        pageblockTitle: '#1A1A1A',
        pageblockSubtitle: '#4A5568',
        pageblockText: '#4A5568'
      },
      dark: {
        pageblockTitle: '#FFFFFF',
        pageblockSubtitle: '#E2E8F0',
        pageblockText: '#A0AEC0'
      }
    },
    fontSize: {
      pageblockTitle: '1.5rem',
      pageblockSubtitle: '1.125rem',
      pageblockText: '1rem'
    }
  };

  // Efeito para atualizar o bloco em rascunho quando o tipo de bloco ou variante mudar
  useEffect(() => {
    // Só executar se estiver editando um bloco em rascunho
    if (currentDraftBlock && blockData) {
      // Criar uma versão atualizada do bloco com o tipo e variante atuais
      const updatedBlock = {
        ...blockData,
        template: blockType,
        variants: [
          {
            ...(blockData.variants && blockData.variants[0] ? blockData.variants[0] : {}),
            variantType: selectedVariant,
            variantPosition: 1
          }
        ]
      };
      
      // Atualizar o bloco atual
      setBlockData(updatedBlock);
      
      // Atualizar o bloco na lista de rascunhos
      const updatedDrafts = draftBlocks.map(draft => 
        draft.id === currentDraftBlock.id ? updatedBlock : draft
      );
      setDraftBlocks(updatedDrafts);
      
      // Atualizar o bloco na lista de todos os blocos
      const updatedAllBlocks = allBlocks.map(block => 
        block.id === currentDraftBlock.id ? updatedBlock : block
      );
      setAllBlocks(updatedAllBlocks);
      
      console.log('Bloco em rascunho atualizado:', updatedBlock);
    }
  }, [blockType, selectedVariant, currentDraftBlock]);

  // Função para atualizar o tipo de bloco
  const handleBlockTypeChange = (newBlockType: 'grid' | 'list' | 'featured' | 'mixed') => {
    setBlockType(newBlockType);
    
    // Se estiver editando um bloco em rascunho, atualizar o template
    if (currentDraftBlock && blockData) {
      const updatedBlock = {
        ...blockData,
        template: newBlockType
      };
      setBlockData(updatedBlock);
    }
  };

  // Função para limpar os estados após operações
  const resetStates = () => {
    console.log('Limpando estados...');
    console.log('Estado antes da limpeza:', {
      blockData,
      currentDraftBlock,
      isCreatingNewBlock,
      schedulingBlockId,
      isScheduleOpen,
      selectedVariant,
      selectedTargetId
    });
    
    // Limpar dados do bloco atual
    setBlockData(null);
    setCurrentDraftBlock(null);
    setIsCreatingNewBlock(false);
    
    // Limpar dados de agendamento
    setSchedulingBlockId(null);
    setIsScheduleOpen(false);
    
    // Limpar seleções
    setSelectedVariant('standard');
    setSelectedTargetId(undefined);
    
    // Não limpar completamente as listas de blocos e agendamentos,
    // pois isso causaria perda de dados. Em vez disso, apenas atualizamos
    // o estado dos blocos afetados.
    
    // Mostrar mensagem de feedback
    setSuccessMessage("Seleção limpa com sucesso!");
    setTimeout(() => setSuccessMessage(null), 3000);
    
    // Verificar se o estado foi limpo corretamente após um pequeno delay
    setTimeout(() => {
      console.log('Estado após a limpeza:', {
        blockData,
        currentDraftBlock,
        isCreatingNewBlock,
        schedulingBlockId,
        isScheduleOpen,
        selectedVariant,
        selectedTargetId
      });
    }, 100);
  };

  // Função para verificar se está em modo de edição
  const isEditMode = !!blockData;

  // Função para verificar se o botão de salvar deve ser desabilitado
  const shouldDisableSaveButton = isEditMode && currentDraftBlock;

  // Função para verificar se estamos em modo de edição de um bloco existente (não um rascunho)
  const isEditingExistingBlock = isEditMode && !currentDraftBlock && !isCreatingNewBlock;

  // Função para testar o agendamento de blocos
  const handleTestScheduling = () => {
    // Criar um bloco de teste
    const testBlock = {
      id: `test-block-${Date.now()}`,
      tenantId: "test-tenant",
      blockType: "articles",
      template: blockType,
      blockPosition: 1,
      pageId: selectedPage || "test-page",
      variants: [
        {
          variantType: getDefaultVariant(blockType),
          variantPosition: 1,
          config: {
            layout: {
              columns: "3",
              gap: "6",
              styles: {
                width: "100%",
                backgroundColor: "transparent"
              }
            },
            articles: {
              "col-0": ["article-1", "article-2"],
              "col-1": ["article-3", "article-4"],
              "col-2": ["article-5", "article-6"]
            },
            styles: {
              theme: {
                light: {
                  columnStyle: {
                    background: "white",
                    padding: "1rem"
                  },
                  headingProps: {
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    color: "#111827"
                  },
                  subtitleProps: {
                    fontSize: "0.875rem",
                    color: "#6B7280"
                  }
                },
                dark: {
                  columnStyle: {
                    background: "#1F2937",
                    padding: "1rem"
                  },
                  headingProps: {
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    color: "#F9FAFB"
                  },
                  subtitleProps: {
                    fontSize: "0.875rem",
                    color: "#9CA3AF"
                  }
                }
              },
              showExcerpt: true
            },
            metadata: {
              title: "Bloco de Teste",
              description: "Descrição do bloco de teste"
            }
          }
        }
      ],
      metadata: {
        title: "Bloco de Teste",
        description: "Descrição do bloco de teste"
      }
    };

    // Simular o agendamento
    setSchedulingBlockId(testBlock.id);
    
    // Criar dados de agendamento
    const scheduleData: ScheduleRequest = {
      scheduledAt: new Date(Date.now() + 86400000).toISOString(), // Agendar para amanhã
      scheduledAction: "publish",
      scheduledData: {
        metadata: {
          title: "Bloco de Teste Agendado",
          description: "Descrição do bloco de teste agendado"
        }
      }
    };

    // Adicionar o bloco de teste à lista
    setAllBlocks(prev => [...prev, testBlock]);
    
    // Simular o processamento do agendamento
    setTimeout(() => {
      // Obter o bloco com getBlockConfig
      const blockConfig = {
        blockType: "articles",
        template: blockType,
        variants: [
          {
            variantType: getDefaultVariant(blockType),
            variantPosition: 1,
            config: {
              layout: {
                columns: "3",
                gap: "6",
                styles: {
                  width: "100%",
                  backgroundColor: "transparent"
                }
              },
              articles: {
                "col-0": ["article-1", "article-2"],
                "col-1": ["article-3", "article-4"],
                "col-2": ["article-5", "article-6"]
              },
              styles: {
                theme: {
                  light: {
                    columnStyle: {
                      background: "white",
                      padding: "1rem"
                    },
                    headingProps: {
                      fontSize: "1.125rem",
                      fontWeight: "600",
                      color: "#111827"
                    },
                    subtitleProps: {
                      fontSize: "0.875rem",
                      color: "#6B7280"
                    }
                  },
                  dark: {
                    columnStyle: {
                      background: "#1F2937",
                      padding: "1rem"
                    },
                    headingProps: {
                      fontSize: "1.125rem",
                      fontWeight: "600",
                      color: "#F9FAFB"
                    },
                    subtitleProps: {
                      fontSize: "0.875rem",
                      color: "#9CA3AF"
                    }
                  }
                },
                showExcerpt: true
              }
            }
          }
        ],
        pageId: selectedPage || "test-page"
      };

      // Criar o payload completo
      const completeScheduleData: ScheduleRequest = {
        ...scheduleData,
        scheduledData: {
          ...blockConfig,
          ...scheduleData.scheduledData,
          metadata: {
            ...scheduleData.scheduledData.metadata
          }
        }
      };

      // Salvar o payload para exibição
      setTestSchedulePayload(completeScheduleData);
      setShowTestResults(true);

      // Simular o envio para a API
      console.log("Enviando payload de agendamento para a API:", completeScheduleData);
      
      // Adicionar à lista de agendamentos
      const newSchedule: ScheduleResponse = {
        id: `schedule-${Date.now()}`,
        tenantId: testBlock.tenantId,
        blockType: testBlock.blockType,
        blockPosition: testBlock.blockPosition,
        template: testBlock.template,
        variants: testBlock.variants,
        metadata: {
          title: completeScheduleData.scheduledData?.metadata?.title || "",
          description: completeScheduleData.scheduledData?.metadata?.description || ""
        },
        pageId: testBlock.pageId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        scheduledAt: completeScheduleData.scheduledAt,
        scheduledAction: completeScheduleData.scheduledAction,
        scheduleStatus: "pending",
        scheduledData: completeScheduleData.scheduledData
      };

      setSchedules(prev => [...prev, newSchedule]);
      setSuccessMessage("Teste de agendamento concluído com sucesso!");
      setTimeout(() => setSuccessMessage(null), 5000);
    }, 500);
  };

  // Função auxiliar para obter a variante padrão com base no tipo de bloco
  const getDefaultVariant = (blockType: string): string => {
    switch (blockType) {
      case 'grid':
        return 'standard';
      case 'list':
        return 'chronological';
      case 'mixed':
        return 'sidebar';
      case 'featured':
        return 'hero';
      default:
        return 'standard';
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Gerenciador de Blocos</h1>
      
      <div className="flex space-x-4 mb-6">
        <button 
          className={`px-4 py-2 rounded ${activeTab === 'builder' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('builder')}
        >
          Construtor de Blocos
        </button>
        <button 
          className={`px-4 py-2 rounded ${activeTab === 'schedule' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('schedule')}
        >
          Agendamentos
        </button>
        <button 
          className={`px-4 py-2 rounded ${activeTab === 'test' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('test')}
        >
          Teste de Agendamento
        </button>
      </div>

      {activeTab === 'builder' && (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full">
            <div className="flex flex-col w-full md:w-auto">
              <label htmlFor="blockType" className="text-sm font-medium text-gray-700 mb-1">
                Tipo de Bloco: <span className="text-red-500 font-bold">*</span>
              </label>
              <div className="flex items-center">
                <Select value={blockType} onValueChange={handleBlockTypeChange}>
                  <SelectTrigger className="w-40" id="blockType">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grid">Grid</SelectItem>
                    <SelectItem value="list">Lista</SelectItem>
                    <SelectItem value="featured">Destaque</SelectItem>
                    <SelectItem value="mixed">Misto</SelectItem>
                  </SelectContent>
                </Select>
                <div className="group relative ml-2">
                  <span className="cursor-help text-blue-500">ℹ️</span>
                  <div className="tooltip-text invisible absolute z-50 w-64 bg-gray-800 text-white text-sm rounded-lg py-2 px-3 bottom-full left-1/2 transform -translate-x-1/2 mb-2 group-hover:visible shadow-lg">
                    Selecione o tipo de bloco antes de criar um novo bloco
                  </div>
                </div>
              </div>
            </div>
            <Button
              onClick={handleCreateNewBlock}
              className="bg-blue-600 hover:bg-blue-700 text-white mt-2 md:mt-0"
              variant="primary"
            >
              Criar Novo Bloco
            </Button>
          </div>
          
          {/* Só mostrar o botão "Limpar Seleção" se houver um bloco selecionado pelo usuário */}
          {blockData && !isCreatingNewBlock && (
            <Button
              onClick={resetStates}
              className="bg-gray-500 hover:bg-gray-600 text-white"
              variant="primary"
              data-testid="limpar-selecao-btn"
            >
              Limpar Seleção
            </Button>
          )}
        </div>
      )}

      {activeTab === 'schedule' && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-1 bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-100">Schedule Manager</h2>
            {/* 
              Como testar o ScheduleManager:
              1. Use o BlockTargetSelector abaixo para selecionar uma página ou seção
              2. O ScheduleManager mostrará os agendamentos para essa página/seção
              3. Você pode cancelar agendamentos pendentes clicando no botão "Cancelar"
              4. Use o botão "Atualizar" para buscar os agendamentos mais recentes
            */}
            <BlockTargetSelector
              sections={sections}
              pages={pageMock}
              isLoading={isLoadingBlocks}
              onSelectTarget={handleSelectTarget}
              selectedTargetId={selectedPage || undefined}
              selectedTargetType="page"
            />
            <div className="mt-4">
              <ScheduleManager
                fetchSections={memoizedFetchSections}
                fetchPages={memoizedFetchPages}
                fetchSchedules={memoizedFetchSchedules}
                cancelSchedule={memoizedCancelSchedule}
                initialTargetType="page"
                initialTargetId={selectedPage || undefined}
                isDarkTheme={false}
              />
            </div>
          </div>
          
          <div className="lg:col-span-3 bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-100">Blocks List</h2>
            <BlocksList
              blocks={[
                ...allBlocks.map((block: any) => ({
                  ...block,
                  scheduledAt: block.scheduledAt || null,
                  scheduledAction: block.scheduledAction || null,
                  scheduleStatus: block.scheduleStatus || null
                }))
              ]}
              onEditBlock={handleEditBlock}
              onScheduleBlock={handleScheduleBlock}
              onDeleteBlock={handleDeleteBlock}
              onCancelSchedule={memoizedCancelSchedule}
              selectedBlockId={selectedTargetId}
            />
          </div>
        </div>
      )}

      {activeTab === 'test' && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Teste de Agendamento de Blocos</h2>
          
          <div className="mb-4">
            <p className="text-gray-700 mb-2">
              Este teste verifica se o payload de agendamento está sendo gerado corretamente, incluindo todas as informações necessárias do bloco.
            </p>
            
            <div className="flex space-x-4 mt-4">
              <button 
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={handleTestScheduling}
              >
                Executar Teste de Agendamento
              </button>
            </div>
          </div>
          
          {showTestResults && testSchedulePayload && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Resultado do Teste:</h3>
              
              <div className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96">
                <pre className="text-sm">{JSON.stringify(testSchedulePayload, null, 2)}</pre>
              </div>
              
              <div className="mt-4 p-4 border-l-4 border-blue-500 bg-blue-50">
                <h4 className="font-medium text-blue-800">Verificação do Payload:</h4>
                <ul className="list-disc list-inside mt-2 text-sm text-gray-700">
                  <li>
                    Metadata: {testSchedulePayload.scheduledData.metadata ? '✅' : '❌'}
                  </li>
                  <li>
                    Template: {testSchedulePayload.scheduledData.template ? '✅' : '❌'}
                  </li>
                  <li>
                    Variants: {testSchedulePayload.scheduledData.variants && 
                              testSchedulePayload.scheduledData.variants.length > 0 ? '✅' : '❌'}
                  </li>
                  <li>
                    Articles: {testSchedulePayload.scheduledData.variants && 
                              testSchedulePayload.scheduledData.variants[0].config && 
                              testSchedulePayload.scheduledData.variants[0].config.articles ? '✅' : '❌'}
                  </li>
                  <li>
                    Styles: {testSchedulePayload.scheduledData.variants && 
                            testSchedulePayload.scheduledData.variants[0].config && 
                            testSchedulePayload.scheduledData.variants[0].config.styles ? '✅' : '❌'}
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 mb-6">
        <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-100">Block Manager</h2>
        {/* Debug logs */}
        {(() => {
          console.log('Rendering BlockManagerDragDrop with:', {
            blockType,
            variant: selectedVariant,
            config: blockData,
            initialSelectedArticles: blockData?.articles || {}
          });
          return null;
        })()}
        
        {/* Mostrar informações de modo de edição apenas quando estiver editando um bloco */}
        {isEditMode && (
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Modo de edição: <span className="font-medium text-blue-600">Editando bloco {blockData?.id?.substring(0, 8)}...</span>
            </p>
          </div>
        )}
        
        <BlockManagerDragDrop
          ref={blockManagerRef}
          articles={articlesMock as Article[]}
          blockType={blockType}
          isDarkTheme={false}
          onSave={(data: any) => {
            if (isCreatingNewBlock || currentDraftBlock) {
              handleSaveAsDraft(data);
            } else {
              setBlockData(data);
            }
          }}
          variant={selectedVariant}
          pageId={selectedPage || ''}
          pageData={pageMock}
          editorialsData={editorialsMock as unknown as Editorial}
          isPagesLoading={false}
          isEditorialsLoading={false}
          onPageSelect={(pageId: string) => setSelectedPage(pageId)}
          onEditorialSelect={(editorialId: string) => console.log('Editorial selecionada:', editorialId)}
          onPublishBlock={() => {
            if (blockData) {
              handleScheduleBlock(blockData.id);
            } else {
              setErrorMessage("Nenhum bloco selecionado para agendamento.");
              setTimeout(() => setErrorMessage(null), 5000);
            }
          }}
          clientGeneralSettingsData={clientGeneralSettingsData}
          config={blockData}
          initialSelectedArticles={blockData?.articles || {}}
          blockId={blockData?.id}
          isEditMode={isEditMode}
          showBlockTypeSelector={false}
          onBlockTypeChange={handleBlockTypeChange}
        />
        
        <div className="flex justify-end mt-6 gap-3">
          {isEditMode && (
            <Button
              onClick={resetStates}
              className="bg-gray-500 hover:bg-gray-600 text-white"
              variant="primary"
            >
              Cancelar
            </Button>
          )}
          
          <Button
            onClick={() => {
              if (blockData) {
                handleScheduleBlock(blockData.id);
              } else {
                setErrorMessage("Configure o bloco antes de prosseguir para agendamento.");
                setTimeout(() => setErrorMessage(null), 5000);
              }
            }}
            className="bg-green-600 hover:bg-green-700 text-white"
            variant="primary"
            disabled={!blockData}
          >
            Prosseguir para Agendamento
          </Button>
          
          {/* Botão Salvar - visível apenas quando NÃO estiver em modo de edição de um bloco existente */}
          {!isEditingExistingBlock && (
            <Button
              onClick={() => {
                if (blockData) {
                  // Salvar o bloco como rascunho
                  handleSaveAsDraft(blockData);
                  setSuccessMessage("Bloco salvo com sucesso!");
                  setTimeout(() => setSuccessMessage(null), 5000);
                } else {
                  setErrorMessage("Configure o bloco antes de salvar.");
                  setTimeout(() => setErrorMessage(null), 5000);
                }
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              variant="primary"
              disabled={!blockData}
            >
              Salvar
            </Button>
          )}
        </div>
      </div>
      
      {isScheduleOpen && (
        <SchedulePublishModal
          isOpen={isScheduleOpen}
          onClose={() => {
            setIsScheduleOpen(false);
            setSchedulingBlockId(null);
          }}
          onSchedule={handleConfirmSchedule}
          blockId={schedulingBlockId || ''}
          blockMetadata={
            (allBlocks.find(block => block.id === schedulingBlockId) || 
             draftBlocks.find(block => block.id === schedulingBlockId))?.metadata || 
            { title: '', description: '' }
          }
          initialAction="publish"
          isDarkTheme={false}
        />
      )}

      {(successMessage || errorMessage) && (
        <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${
          successMessage ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          {successMessage || errorMessage}
        </div>
      )}
      
      {/* Adicionar estilos CSS para o tooltip */}
      <style>{`
        .tooltip-text::after {
          content: "";
          position: absolute;
          top: 100%;
          left: 50%;
          margin-left: -5px;
          border-width: 5px;
          border-style: solid;
          border-color: #1f2937 transparent transparent transparent;
        }
      `}</style>
    </div>
  );
};

export default App;