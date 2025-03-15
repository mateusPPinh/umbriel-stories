# Page Blocks V2 API Documentation

A API de Page Blocks V2 oferece uma estrutura mais flexível e poderosa para gerenciar blocos de página com suporte a variantes de layout.

## Estrutura de Dados

### Page Block V2
```typescript
{
  id: string;
  blockType: string;
  blockPosition: number;
  template: string;
  variants: VariantConfig[];
  metadata?: {
    title?: string;
    description?: string;
    tags?: string[];
    [key: string]: any;
  };
  pageId: string;
  tenantId: string;
  created_at: Date;
  updated_at: Date;
}
```

### Variant Config
```typescript
{
  type: 'standard' | 'masonry' | 'featured' | 'carousel' | 'list';
  variantPosition: number;
  config: {
    layout: LayoutConfig;
    articles: ArticlesConfig;
    styles?: {
      backgroundColor?: string;
      textColor?: string;
      titleColor?: string;
      customCSS?: string;
    };
  };
}
```

### Layout Config
```typescript
{
  columns: number;
  columnsPerRow?: number;
  responsive?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  gap?: string;
  padding?: string;
  margin?: string;
}
```

### Articles Config
```typescript
{
  [columnKey: string]: string[]; // Ex: "col-0": ["article-id-1", "article-id-2"]
}
```

## Endpoints

### Operações Básicas de Blocos

#### Criar um Bloco
```http
POST /page-blocks/v2/create
Content-Type: application/json
x-tenant-id: seu-tenant-id

{
  "pageId": "uuid",
  "blockType": "articles",
  "blockPosition": 1,
  "template": "grid",
  "variants": [
    {
      "type": "standard",
      "variantPosition": 1,
      "config": {
        "layout": {
          "columns": 3,
          "gap": "16px",
          "responsive": {
            "mobile": 1,
            "tablet": 2,
            "desktop": 3
          }
        },
        "articles": {
          "col-0": ["article-id-1", "article-id-2"],
          "col-1": ["article-id-3"],
          "col-2": ["article-id-4"]
        }
      }
    }
  ],
  "metadata": {
    "title": "Artigos em Destaque",
    "description": "Seção principal de artigos"
  }
}
```

#### Listar Blocos de uma Página
```http
GET /page-blocks/v2/page/:pageId
x-tenant-id: seu-tenant-id
```

#### Obter um Bloco
```http
GET /page-blocks/v2/:id
x-tenant-id: seu-tenant-id
```

#### Atualizar um Bloco
```http
PUT /page-blocks/v2/:id
Content-Type: application/json
x-tenant-id: seu-tenant-id

{
  "blockType": "articles",
  "blockPosition": 2,
  "template": "list",
  "metadata": {
    "title": "Novo Título"
  }
}
```

#### Excluir um Bloco
```http
DELETE /page-blocks/v2/:id
x-tenant-id: seu-tenant-id
```

### Gerenciamento de Variantes

#### Adicionar Variante
```http
POST /page-blocks/v2/:blockId/variants
Content-Type: application/json
x-tenant-id: seu-tenant-id

{
  "type": "masonry",
  "variantPosition": 2,
  "config": {
    "layout": {
      "columns": 2,
      "gap": "12px"
    },
    "articles": {
      "col-0": ["article-id-1", "article-id-2"],
      "col-1": ["article-id-3", "article-id-4"]
    }
  }
}
```

#### Remover Variante
```http
DELETE /page-blocks/v2/:blockId/variants/:variantPosition
x-tenant-id: seu-tenant-id
```

#### Atualizar Variante
```http
PUT /page-blocks/v2/:blockId/variants/:variantPosition
Content-Type: application/json
x-tenant-id: seu-tenant-id

{
  "config": {
    "layout": {
      "columns": 3,
      "gap": "16px"
    }
  }
}
```

#### Reordenar Variantes
```http
POST /page-blocks/v2/:blockId/variants/reorder
Content-Type: application/json
x-tenant-id: seu-tenant-id

{
  "variantPositions": [2, 1, 3]
}
```

## Validações e Regras de Negócio

1. **Posição dos Blocos**:
   - A `blockPosition` é única por página
   - Ao criar um novo bloco sem especificar posição, ele é adicionado ao final
   - Ao inserir um bloco em uma posição existente, os demais são reordenados

2. **Variantes**:
   - Cada variante deve ter uma `variantPosition` única no bloco
   - As posições devem ser sequenciais (1, 2, 3, ...)
   - Ao remover uma variante, as posições são reajustadas automaticamente

3. **Artigos**:
   - Os IDs dos artigos são validados antes de serem associados
   - A estrutura de colunas é flexível, permitindo distribuição assimétrica

## Exemplos de Uso

### Criando um Bloco com Múltiplas Variantes
```typescript
const block = {
  pageId: "uuid",
  blockType: "articles",
  template: "grid",
  variants: [
    {
      type: "standard",
      variantPosition: 1,
      config: {
        layout: {
          columns: 3,
          gap: "16px",
          responsive: {
            mobile: 1,
            tablet: 2,
            desktop: 3
          }
        },
        articles: {
          "col-0": ["article-1", "article-2"],
          "col-1": ["article-3"],
          "col-2": ["article-4", "article-5"]
        }
      }
    },
    {
      type: "masonry",
      variantPosition: 2,
      config: {
        layout: {
          columns: 2,
          gap: "12px"
        },
        articles: {
          "col-0": ["article-1", "article-3", "article-5"],
          "col-1": ["article-2", "article-4"]
        }
      }
    }
  ]
};

// POST /page-blocks/v2/create
const response = await api.post('/page-blocks/v2/create', block);
```

### Atualizando Layout de uma Variante
```typescript
const variantUpdate = {
  config: {
    layout: {
      columns: 4,
      gap: "24px",
      responsive: {
        mobile: 1,
        tablet: 2,
        desktop: 4
      }
    }
  }
};

// PUT /page-blocks/v2/:blockId/variants/1
const response = await api.put(`/page-blocks/v2/${blockId}/variants/1`, variantUpdate);
```

## Notas Importantes

1. Todos os endpoints requerem o header `x-tenant-id`
2. As operações de reordenação (blocos e variantes) são atômicas
3. As validações de estrutura são feitas tanto no nível da API quanto no banco de dados
4. Os artigos são carregados com dados completos nas operações de leitura
5. A ordenação dos blocos é mantida automaticamente em todas as operações 