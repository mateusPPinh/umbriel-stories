export const mockArticle = {
  id: "40c5ea29-44a8-40bc-8726-a9d28ecd56d7",
  tenant_id: "eb223d91-3f8a-4820-8c1b-e6615478622c",
  title: "Three Years Into War in Ukraine, Trump Ushers in New World for Putin",
  subtitle: "Fresh possibilities have emerged for President Vladimir V. Putin of Russia with a change of power in Washington",
  slug: "three-years-into-war-in-ukraine-trump-ushers-in-new-world-for-putin",
  content: {
    image: {
      desktop_image_path: "https://barzuputru.local.api.umbrielcms.com.br:3001/uploads/6370ab4d976b0a5a95ea-24putin-anniversary-hvgm-superJumbo.webp?width=2048&height=1365",
      image_mobile_path: "https://barzuputru.local.api.umbrielcms.com.br:3001/uploads/6370ab4d976b0a5a95ea-24putin-anniversary-hvgm-superJumbo.webp?width=2048&height=1365"
    },
    body: "As the war in Ukraine enters its third year, a significant shift in global politics emerges with potential changes in Washington..."
  },
  editorial: {
    id: "b5f835c1-3313-427e-9171-a0b90989f837",
    name: "International",
    description: "International",
    slug: "word/international",
    status: true,
    created_at: "2025-02-16T17:05:47.612Z",
    updated_at: "2025-02-16T17:05:47.612Z",
    tenantId: "eb223d91-3f8a-4820-8c1b-e6615478622c",
    numberOfArticles: null
  },
  articleBody: `<p class="p__hero p__hero"></p><p>President Vladimir V. Putin of Russia took the stage in Sochi, Russia, last fall, two days after Donald J. Trump won the U.S. presidential election, and spoke of the dawn of a new world order.</p><p>"In a sense," Mr. Putin said, "the moment of truth is coming."</p><p>It may have already arrived.</p><p>After three years of grinding warfare and isolation by the West, a world of new possibilities has opened up for Mr. Putin with a change of power in Washington.</p><p>Gone are the statements from the East Room of the White House about the United States standing up to bullies, supporting democracy over autocracy and ensuring freedom will prevail.</p><p>Gone, too, is Washington's united front against Russia with its European allies, many of whom have begun to wonder if the new American administration will protect them against a revanchist Moscow, or even keep troops in Europe at all.</p><p></p><p>Mr. Trump, having voiced desires to take Greenland, has pursued a rapid rapprochement with the Kremlin, while sidelining shocked European allies and publicly assailing President Volodymyr Zelensky of Ukraine.</p><p></p>`,
  created_at: "2024-02-27T12:00:00Z",
  updated_at: "2024-02-27T12:00:00Z",
  links: [
    {
      title: "Read More news 1  ",
      url: "https://www.google.com"
    },
    {
      title: "Read More news 2",
      url: "https://www.google.com"
    },
    {
      title: "Read More news 3",
      url: "https://www.google.com"
    },
    {
      title: "Read More news 4",
      url: "https://www.google.com"
    },
    {
      title: "Read More news 5",
      url: "https://www.google.com"
    },
    {
      title: "Read More news 6",
      url: "https://www.google.com"
    },
    {
      title: "Read More news 7",
      url: "https://www.google.com"
    },
    {
      title: "Read More news 8",
      url: "https://www.google.com"
    },
    {
      title: "Read More news 9",
      url: "https://www.google.com"
    },
    {
      title: "Read More news 10",
      url: "https://www.google.com"
    }
  ]
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
  const imageUrls = [
    "https://barzuputru.local.api.umbrielcms.com.br:3001/uploads/6370ab4d976b0a5a95ea-24putin-anniversary-hvgm-superJumbo.webp?width=2048&height=1365",
    "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1682687220208-22d7a2543e88?q=80&w=1000&auto=format&fit=crop",
    "", // Artigo sem imagem
    "https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop",
    null, // Artigo com imagem nula
    "https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1000&auto=format&fit=crop",
    "", // Outro artigo sem imagem
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1000&auto=format&fit=crop",
    null, // Mais um artigo com imagem nula
    "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=1000&auto=format&fit=crop"
  ];
  
  const titles = [
    "Three Years Into War in Ukraine, Trump Ushers in New World for Putin",
    "Climate Change Accelerates as Global Temperatures Rise",
    "Tech Giants Face New Regulations in European Union",
    "Economic Recovery Shows Signs of Slowing Down",
    "New Medical Breakthrough Promises Treatment for Rare Disease",
    "Sports Championship Ends with Unexpected Victory",
    "Cultural Festival Attracts Record Number of Visitors",
    "Scientists Discover New Species in Amazon Rainforest",
    "Global Summit Addresses International Security Concerns",
    "Renewable Energy Investments Reach All-Time High",
    "Education Reform Bill Passes with Bipartisan Support",
    "Space Exploration Mission Reveals Surprising Findings",
    "Film Industry Celebrates Diverse Voices at Annual Awards",
    "Public Health Officials Warn of New Virus Variant",
    "Historic Peace Agreement Signed After Decades of Conflict"
  ];
  
  const subtitles = [
    "Fresh possibilities have emerged for President Vladimir V. Putin of Russia with a change of power in Washington",
    "Scientists warn of irreversible damage if immediate action is not taken",
    "Legislation aims to curb monopolistic practices and protect user data",
    "Inflation and supply chain issues continue to impact global markets",
    "Researchers announce promising results from clinical trials",
    "Underdog team defeats reigning champions in dramatic final match",
    "Event showcases diverse artistic expressions from around the world",
    "Newly identified species could hold key to ecological balance",
    "Leaders from 50 nations discuss strategies for global cooperation",
    "Private sector leads transition to sustainable energy solutions",
    "New legislation focuses on improving access to quality education",
    "Mission data challenges existing theories about planetary formation",
    "Recognition of underrepresented filmmakers marks industry shift",
    "Experts recommend precautionary measures as cases increase",
    "Agreement includes provisions for economic cooperation and human rights"
  ];

  return Array.from({ length: count }).map((_, index) => {
    const imageIndex = index % imageUrls.length;
    const titleIndex = index % titles.length;
    
    // Determine if this article should have an image
    const hasImage = imageUrls[imageIndex] !== "" && imageUrls[imageIndex] !== null;
    
    // Create a unique ID with a random component to ensure uniqueness
    const uniqueId = `article-${index + 1}-${Math.floor(Math.random() * 1000)}`;
    
    return {
      ...mockArticle,
      id: uniqueId,
      title: titles[titleIndex] + ` ${index + 1}`,
      subtitle: subtitles[titleIndex],
      slug: `${titles[titleIndex].toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${index + 1}`,
      content: {
        ...mockArticle.content,
        image: hasImage ? {
          desktop_image_path: imageUrls[imageIndex],
          image_mobile_path: imageUrls[imageIndex]
        } : {
          desktop_image_path: "",
          image_mobile_path: ""
        }
      }
    };
  });
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