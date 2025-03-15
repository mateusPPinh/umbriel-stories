import { mockArticle, createArticles } from '../../../components/PageblockV2/stories/mockData';

// Exportando o artigo mock individual
export { mockArticle };

// Criando uma lista de artigos para uso nos blocos
export const articlesMock = createArticles(15);

// Mapeamento de IDs para artigos específicos (para uso com os blocos por ID)
export const articlesById = {
  "1ca825fb-4320-4739-b151-2a653d8b719a": {
    ...mockArticle,
    id: "1ca825fb-4320-4739-b151-2a653d8b719a",
    title: "Indigenous Communities Lead Climate Conservation Efforts",
    subtitle: "Traditional knowledge combined with modern science creates powerful environmental protection",
    content: {
      image: {
        desktop_image_path: "https://images.unsplash.com/photo-1551651653-c5186a1fbba2?q=80&w=2070",
        image_mobile_path: "https://images.unsplash.com/photo-1551651653-c5186a1fbba2?q=80&w=1080"
      }
    }
  },
  "aefc7554-d22f-47d9-85ce-84533ba7a10a": {
    ...mockArticle,
    id: "aefc7554-d22f-47d9-85ce-84533ba7a10a",
    title: "Rainforest Conservation Project Shows Promising Results",
    subtitle: "Community-led initiative reduces deforestation while supporting local economies",
    content: {
      image: {
        desktop_image_path: "https://images.unsplash.com/photo-1469125155630-7ed37e065743?q=80&w=2069",
        image_mobile_path: "https://images.unsplash.com/photo-1469125155630-7ed37e065743?q=80&w=1080"
      }
    }
  },
  "5225884c-7709-4731-ac08-3dfd04bb858f": {
    ...mockArticle,
    id: "5225884c-7709-4731-ac08-3dfd04bb858f",
    title: "Cultural Festival Celebrates Indigenous Art and Music",
    subtitle: "Annual gathering showcases traditional and contemporary creative expressions",
    content: {
      image: {
        desktop_image_path: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=2112",
        image_mobile_path: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=1080"
      }
    }
  },
  "195d817a-647f-4d8a-94be-28eef1522441": {
    ...mockArticle,
    id: "195d817a-647f-4d8a-94be-28eef1522441",
    title: "Ancient Healing Practices Find Modern Medical Applications",
    subtitle: "Traditional remedies undergo scientific validation in groundbreaking research program",
    content: {
      image: {
        desktop_image_path: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=2084",
        image_mobile_path: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1080"
      }
    }
  },
  "20fb349b-1cbe-4586-9522-bce36a10d971": {
    ...mockArticle,
    id: "20fb349b-1cbe-4586-9522-bce36a10d971",
    title: "Sacred Sites Protection Law Passes After Decades of Advocacy",
    subtitle: "Landmark legislation ensures preservation of culturally significant locations",
    content: {
      image: {
        desktop_image_path: "https://images.unsplash.com/photo-1518021964703-4b2030f03085?q=80&w=2070",
        image_mobile_path: "https://images.unsplash.com/photo-1518021964703-4b2030f03085?q=80&w=1080"
      }
    }
  },
  "8a123efb-ea3d-4ba7-b37a-83b8610cbf64": {
    ...mockArticle,
    id: "8a123efb-ea3d-4ba7-b37a-83b8610cbf64",
    title: "Indigenous Rights Movement Gains International Recognition",
    subtitle: "United Nations resolution strengthens protections for native communities worldwide",
    content: {
      image: {
        desktop_image_path: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=2070",
        image_mobile_path: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1080"
      }
    }
  },
  "236750fe-1082-4455-b382-ea1fa6a4be8f": {
    ...mockArticle,
    id: "236750fe-1082-4455-b382-ea1fa6a4be8f",
    title: "Traditional Ecological Knowledge Guides Sustainable Agriculture",
    subtitle: "Ancient farming techniques offer solutions to modern environmental challenges",
    content: {
      image: {
        desktop_image_path: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070",
        image_mobile_path: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1080"
      }
    }
  },
  "f85c79e5-5a0b-4cf9-9b37-6135d3c5d5b7": {
    ...mockArticle,
    id: "f85c79e5-5a0b-4cf9-9b37-6135d3c5d5b7",
    title: "Indigenous Language Revitalization Through Digital Technology",
    subtitle: "Innovative apps and online platforms help preserve endangered languages",
    content: {
      image: {
        desktop_image_path: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070",
        image_mobile_path: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1080"
      }
    }
  }
}; 