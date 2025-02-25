export const mockArticle = {
  id: "40c5ea29-44a8-40bc-8726-a9d28ecd56d7",
  tenant_id: "eb223d91-3f8a-4820-8c1b-e6615478622c",
  title: "Three Years Into War in Ukraine, Trump Ushers in New World for Putin",
  subtitle: "Fresh possibilities have emerged for President Vladimir V. Putin of Russia with a change of power in Washington",
  content: {
    image: {
      desktop_image_path: "https://barzuputru.local.api.umbrielcms.com.br:3001/uploads/6370ab4d976b0a5a95ea-24putin-anniversary-hvgm-superJumbo.webp?width=2048&height=1365",
      image_mobile_path: "https://barzuputru.local.api.umbrielcms.com.br:3001/uploads/6370ab4d976b0a5a95ea-24putin-anniversary-hvgm-superJumbo.webp?width=2048&height=1365"
    }
  }
};

// Base block configuration
export const baseBlockConfig = {
  tenantId: "eb223d91-3f8a-4820-8c1b-e6615478622c",
  blockPosition: 1,
  pageId: "f0af77fe-0d98-48d1-81ba-22a0aab9ae68",
  metadata: {
    title: "Block Title",
    description: "Block Description",
    tags: ["articles", "featured"]
  }
};

// Base variant configuration
export const baseVariantConfig = {
  mediaConfig: {
    type: "image",
    customUrl: "",
    useArticleMedia: true
  }
};

// Atualizando a configuração de layout base
export const baseLayoutConfig = {
  gap: "24px",
  padding: "24px",
  imageSize: "medium",
  aspectRatio: "16/9",
  responsive: {
    mobile: 1,
    tablet: 2,
    desktop: 3
  },
  styles: {
    backgroundColor: "transparent",
    grid: {
      autoRows: "auto",
      templateColumns: "1fr"
    },
    width: "100%",
    columnStyles: {
      sidebarPosition: "right"
    }
  }
};

// Helper para criar múltiplos artigos
export const createArticles = (count: number) => {
  return Array.from({ length: count }).map((_, index) => ({
    ...mockArticle,
    id: `${mockArticle.id}-${index}`,
    title: `${mockArticle.title} ${index + 1}`,
  }));
};

// Mock blocks para cada tipo
export const mockBlocks = {
  grid: {
    ...baseBlockConfig,
    id: "grid-block",
    blockType: "articles",
    template: "grid",
    variants: [
      {
        variantType: "standard",
        variantPosition: 1,
        config: {
          ...baseVariantConfig,
          layout: {
            ...baseLayoutConfig,
            columns: 3
          },
          styles: {
            theme: {
              light: {
                columnStyle: { background: "#ffffff" },
                headingProps: { fontSize: "24px", color: "#000000" },
                subtitleProps: { fontSize: "16px", color: "#666666" }
              },
              dark: {
                columnStyle: { background: "#1a1a1a" },
                headingProps: { fontSize: "24px", color: "#ffffff" },
                subtitleProps: { fontSize: "16px", color: "#cccccc" }
              }
            },
            showExcerpt: true,
            titleSize: "lg",
            columnStyle: {},
            imageHeight: "400px",
            showMetadata: true
          },
          articles: {
            "col-0": [createArticles(2)[0]],
            "col-1": [createArticles(2)[1]],
            "col-2": [createArticles(2)[0]]
          }
        }
      }
    ]
  },
  featured: {
    ...baseBlockConfig,
    id: "featured-block",
    blockType: "articles",
    template: "featured",
    variants: [
      {
        variantType: "hero",
        variantPosition: 1,
        config: {
          ...baseVariantConfig,
          layout: {
            ...baseLayoutConfig,
            columns: 1,
            responsive: {
              mobile: 1,
              tablet: 1,
              desktop: 1
            }
          },
          styles: {
            theme: {
              light: {
                columnStyle: { background: "transparent" },
                headingProps: { fontSize: "48px", color: "#ffffff" },
                subtitleProps: { fontSize: "20px", color: "#ffffff" }
              },
              dark: {
                columnStyle: { background: "transparent" },
                headingProps: { fontSize: "48px", color: "#ffffff" },
                subtitleProps: { fontSize: "20px", color: "#ffffff" }
              }
            },
            showExcerpt: true,
            titleSize: "xl",
            columnStyle: {},
            imageHeight: "600px",
            showMetadata: true
          },
          articles: {
            "col-0": [mockArticle]
          }
        }
      }
    ]
  }
}; 