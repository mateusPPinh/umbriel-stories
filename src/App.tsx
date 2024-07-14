import { type ReactElement } from 'react'
import PageBlock from './components/NewPageBlock'
import { type BlockData } from './components/NewPageBlock/PageBlock.types'
import Header from './tests/mvp/Header'
import Footer from './tests/mvp/Footer'

const layoutConfigurations = {
  fullWidth: {
    layout: '"col1 col1 col1"',
    columns: [3]
  },
  halfAndHalf: {
    layout: '"col1 col2 col2"',
    columns: [1, 2]
  },
  seventyThirty: {
    layout: '"col1 col1 col2"',
    columns: [2, 1]
  },
  threeColumns: {
    layout: '"col1 col2 col3"',
    columns: [1, 1, 1]
  },
  threeColumnsExtended: {
    layout: '"col1 col1 col3" "col2 col2 col3" "col4 col4 col4"',
    columns: [2, 2, 1, 1]
  },
  custom5050: {
    layout: '"col1 col2 col3"',
    columns: [1, 1, 1]
  },
  halfAndHalfWithImage: {
    layout: '"col1 col2"',
    columns: [1, 1]
  },
  featured: {
    layout: '"image image" "caption caption" "title title" "desc desc" "col1 col2"',
    columns: [1, 1]
  }
}

const blockData: BlockData[] = [
  {
    blockType: 'slot',
    blockPosition: '1',
    layout: 'layoutPadrao',
    template: 'TemplateMVP',
    articles: [
      {
        id: '1',
        title: 'Manhattanhenge Is Back: When and Where to Watch',
        subtitle:
          'After mediocre weather during the event’s first two nights in May, New Yorkers get another opportunity to celebrate longer days, warmer weather and epic summer sunsets.',
        author: 'Author 1',
        email: 'author1@example.com',
        content: {
          image: {
            desktop_image_path:
              'https://static01.nyt.com/images/2024/07/27/multimedia/27manhattanhenge-update-2024-tjcw/27manhattanhenge-update-2024-tjcw-threeByTwoMediumAt2X.jpg?auto=webp',
            image_mobile_path: 'https://via.placeholder.com/1920x1080'
          }
        },
        slug: 'sample-article-1',
        schedulePublication: null,
        articleBody: '<p>Content for article 1</p>',
        status: 'published',
        isAward: false,
        metadata: null,
        pageBgColor: '#FFF',
        articleLayoutStruct: null,
        created_at: '2024-07-13T00:00:00.000Z',
        updated_at: '2024-07-13T00:00:00.000Z',
        editorial: {
          id: '1',
          title: 'Editorial 1',
          description: 'Description 1',
          slug: 'editorial-1'
        }
      }
    ],
    config: layoutConfigurations.fullWidth
  },
  {
    blockType: 'slot',
    blockPosition: '2',
    layout: 'layoutPadrao',
    template: 'TemplateMVP',
    articles: [
      {
        id: '1',
        title: 'Krejcikova Defeats Paolini to Win Wimbledon Women’s Final',
        subtitle:
          'Barbora Krejcikova of the Czech Republic won a second Grand Slam title after defeating Jasmine Paolini at Wimbledon.',
        author: 'Author 1',
        email: 'author1@example.com',
        content: {
          image: {
            desktop_image_path:
              'https://static01.nyt.com/images/2024/07/13/multimedia/13krejcikova-alert/13krejcikova-alert-threeByTwoSmallAt2X.jpg?format=pjpg&quality=75&auto=webp&disable=upscale',
            image_mobile_path: 'https://via.placeholder.com/1920x1080'
          }
        },
        slug: 'sample-article-1',
        schedulePublication: null,
        articleBody: '<p>Content for article 1</p>',
        status: 'published',
        isAward: false,
        metadata: null,
        pageBgColor: '#FFF',
        articleLayoutStruct: null,
        created_at: '2024-07-13T00:00:00.000Z',
        updated_at: '2024-07-13T00:00:00.000Z',
        editorial: {
          id: '1',
          title: 'Editorial 1',
          description: 'Description 1',
          slug: 'editorial-1'
        }
      },
      {
        id: '1',
        title: 'Colombia Faces a New Problem: Too Much Cocaine',
        subtitle:
          'Even as production surges, domestic and foreign shifts in the global drug industry have devastated poor Colombians whose livelihood is tied to cocaine.',
        author: 'Author 1',
        email: 'author1@example.com',
        content: {
          image: {
            desktop_image_path:
              'https://static01.nyt.com/images/2024/06/20/multimedia/00colombia-coca-01-promo/00colombia-coca-01-wjmh-threeByTwoSmallAt2X.jpg?format=pjpg&quality=75&auto=webp&disable=upscale',
            image_mobile_path: 'https://via.placeholder.com/1920x1080'
          }
        },
        slug: 'sample-article-1',
        schedulePublication: null,
        articleBody: '<p>Content for article 1</p>',
        status: 'published',
        isAward: false,
        metadata: null,
        pageBgColor: '#FFF',
        articleLayoutStruct: null,
        created_at: '2024-07-13T00:00:00.000Z',
        updated_at: '2024-07-13T00:00:00.000Z',
        editorial: {
          id: '1',
          title: 'Editorial 1',
          description: 'Description 1',
          slug: 'editorial-1'
        }
      },
      {
        id: '1',
        title: 'Unbowed by Jan. 6 Charges, Republicans Pursue Plans to Contest a 2024 Defeat',
        subtitle:
          'A battery of G.O.P. lawyers has been preparing to try to short-circuit the election system if Donald Trump does not win.',
        author: 'Author 1',
        email: 'author1@example.com',
        content: {
          image: {
            desktop_image_path:
              'https://static01.nyt.com/images/2024/07/13/multimedia/13pol-democracy--01-hlgq/13pol-democracy--01-hlgq-threeByTwoSmallAt2X.jpg?format=pjpg&quality=75&auto=webp&disable=upscale',
            image_mobile_path: 'https://via.placeholder.com/1920x1080'
          }
        },
        slug: 'sample-article-1',
        schedulePublication: null,
        articleBody: '<p>Content for article 1</p>',
        status: 'published',
        isAward: false,
        metadata: null,
        pageBgColor: '#FFF',
        articleLayoutStruct: null,
        created_at: '2024-07-13T00:00:00.000Z',
        updated_at: '2024-07-13T00:00:00.000Z',
        editorial: {
          id: '1',
          title: 'Editorial 1',
          description: 'Description 1',
          slug: 'editorial-1'
        }
      },
      {
        id: '1',
        title: 'How Janet Yellen Became an Unlikely Culinary Diploma',
        subtitle:
          'The Treasury secretary views food as a way to connect, and her dining decisions have become the subject of global intrigue.',
        author: 'Author 1',
        email: 'author1@example.com',
        content: {
          image: {
            desktop_image_path:
              'https://static01.nyt.com/images/2024/06/28/multimedia/00dc-yelleneats-lvtg/00dc-yelleneats-lvtg-superJumbo.jpg?quality=75&auto=webp',
            image_mobile_path: 'https://via.placeholder.com/1920x1080'
          }
        },
        slug: 'sample-article-1',
        schedulePublication: null,
        articleBody: '<p>Content for article 1</p>',
        status: 'published',
        isAward: false,
        metadata: null,
        pageBgColor: '#FFF',
        articleLayoutStruct: null,
        created_at: '2024-07-13T00:00:00.000Z',
        updated_at: '2024-07-13T00:00:00.000Z',
        editorial: {
          id: '1',
          title: 'Editorial 1',
          description: 'Description 1',
          slug: 'editorial-1'
        }
      }
    ],
    config: layoutConfigurations.seventyThirty
  },
  {
    blockType: 'slot',
    blockPosition: '3',
    layout: 'layoutPadrao',
    template: 'TemplateFeatured',
    articles: [
      {
        id: '1',
        title: 'Manhattanhenge Is Back: When and Where to Watch',
        subtitle:
          'After mediocre weather during the event’s first two nights in May, New Yorkers get another opportunity to celebrate longer days, warmer weather and epic summer sunsets.',
        author: 'Author 1',
        email: 'author1@example.com',
        content: {
          image: {
            desktop_image_path:
              'https://static01.nyt.com/images/2024/07/27/multimedia/27manhattanhenge-update-2024-tjcw/27manhattanhenge-update-2024-tjcw-threeByTwoMediumAt2X.jpg?auto=webp',
            image_mobile_path: 'https://via.placeholder.com/1920x1080'
          }
        },
        slug: 'sample-article-1',
        schedulePublication: null,
        articleBody: '<p>Content for article 1</p>',
        status: 'published',
        isAward: false,
        metadata: null,
        pageBgColor: '#FFF',
        articleLayoutStruct: null,
        created_at: '2024-07-13T00:00:00.000Z',
        updated_at: '2024-07-13T00:00:00.000Z',
        editorial: {
          id: '1',
          title: 'Editorial 1',
          description: 'Description 1',
          slug: 'editorial-1'
        }
      },
      {
        id: '1',
        title: 'Manhattanhenge Is Back: When and Where to Watch',
        subtitle:
          'After mediocre weather during the event’s first two nights in May, New Yorkers get another opportunity to celebrate longer days, warmer weather and epic summer sunsets.',
        author: 'Author 1',
        email: 'author1@example.com',
        content: {
          image: {
            desktop_image_path:
              'https://static01.nyt.com/images/2024/07/27/multimedia/27manhattanhenge-update-2024-tjcw/27manhattanhenge-update-2024-tjcw-threeByTwoMediumAt2X.jpg?auto=webp',
            image_mobile_path: 'https://via.placeholder.com/1920x1080'
          }
        },
        slug: 'sample-article-1',
        schedulePublication: null,
        articleBody: '<p>Content for article 1</p>',
        status: 'published',
        isAward: false,
        metadata: null,
        pageBgColor: '#FFF',
        articleLayoutStruct: null,
        created_at: '2024-07-13T00:00:00.000Z',
        updated_at: '2024-07-13T00:00:00.000Z',
        editorial: {
          id: '1',
          title: 'Editorial 1',
          description: 'Description 1',
          slug: 'editorial-1'
        }
      },
      {
        id: '1',
        title: 'Manhattanhenge Is Back: When and Where to Watch',
        subtitle:
          'After mediocre weather during the event’s first two nights in May, New Yorkers get another opportunity to celebrate longer days, warmer weather and epic summer sunsets.',
        author: 'Author 1',
        email: 'author1@example.com',
        content: {
          image: {
            desktop_image_path:
              'https://static01.nyt.com/images/2024/07/27/multimedia/27manhattanhenge-update-2024-tjcw/27manhattanhenge-update-2024-tjcw-threeByTwoMediumAt2X.jpg?auto=webp',
            image_mobile_path: 'https://via.placeholder.com/1920x1080'
          }
        },
        slug: 'sample-article-1',
        schedulePublication: null,
        articleBody: '<p>Content for article 1</p>',
        status: 'published',
        isAward: false,
        metadata: null,
        pageBgColor: '#FFF',
        articleLayoutStruct: null,
        created_at: '2024-07-13T00:00:00.000Z',
        updated_at: '2024-07-13T00:00:00.000Z',
        editorial: {
          id: '1',
          title: 'Editorial 1',
          description: 'Description 1',
          slug: 'editorial-1'
        }
      }
    ],
    config: layoutConfigurations.featured
  },
  {
    blockType: 'slot',
    blockPosition: '4',
    layout: 'layoutPadrao',
    template: 'TemplateMVP',
    articles: [
      {
        id: '1',
        title: 'What to Expect as a Punishing Heat Wave Shifts East',
        subtitle:
          'The West will get a small break from record-breaking heat, while much of the Midwest and the East Coast swelter into next week.',
        author: 'Author 1',
        email: 'author1@example.com',
        content: {
          image: {
            desktop_image_path:
              'https://static01.nyt.com/images/2024/07/13/multimedia/13nat-heat-forecast-tpzk/13nat-heat-forecast-tpzk-threeByTwoSmallAt2X.jpg?format=pjpg&quality=75&auto=webp&disable=upscale',
            image_mobile_path: 'https://via.placeholder.com/1920x1080'
          }
        },
        slug: 'sample-article-1',
        schedulePublication: null,
        articleBody: '<p>Content for article 1</p>',
        status: 'published',
        isAward: false,
        metadata: null,
        pageBgColor: '#FFF',
        articleLayoutStruct: null,
        created_at: '2024-07-13T00:00:00.000Z',
        updated_at: '2024-07-13T00:00:00.000Z',
        editorial: {
          id: '1',
          title: 'Editorial 1',
          description: 'Description 1',
          slug: 'editorial-1'
        }
      },
      {
        id: '1',
        title:
          'Ukraine Is Targeting Crimea, a Critical Base for Russia’s Invasion',
        subtitle:
          'Newly armed with deep-strike missiles, Kyiv is trying to degrade Russian abilities on the peninsula, aiming at airfields, air defenses and logistics hubs.',
        author: 'Author 1',
        email: 'author1@example.com',
        content: {
          image: {
            desktop_image_path:
              'https://static01.nyt.com/images/2024/07/08/multimedia/08ukraine-crimea-01-qtvw/08ukraine-crimea-01-qtvw-threeByTwoSmallAt2X.jpg?format=pjpg&quality=75&auto=webp&disable=upscale',
            image_mobile_path: 'https://via.placeholder.com/1920x1080'
          }
        },
        slug: 'sample-article-1',
        schedulePublication: null,
        articleBody: '<p>Content for article 1</p>',
        status: 'published',
        isAward: false,
        metadata: null,
        pageBgColor: '#FFF',
        articleLayoutStruct: null,
        created_at: '2024-07-13T00:00:00.000Z',
        updated_at: '2024-07-13T00:00:00.000Z',
        editorial: {
          id: '1',
          title: 'Editorial 1',
          description: 'Description 1',
          slug: 'editorial-1'
        }
      },
      {
        id: '1',
        title:
          'Ukraine Is Targeting Crimea, a Critical Base for Russia’s Invasion',
        subtitle:
          'Newly armed with deep-strike missiles, Kyiv is trying to degrade Russian abilities on the peninsula, aiming at airfields, air defenses and logistics hubs.',
        author: 'Author 1',
        email: 'author1@example.com',
        content: {
          image: {
            desktop_image_path:
              'https://static01.nyt.com/images/2024/07/08/multimedia/08ukraine-crimea-01-qtvw/08ukraine-crimea-01-qtvw-threeByTwoSmallAt2X.jpg?format=pjpg&quality=75&auto=webp&disable=upscale',
            image_mobile_path: 'https://via.placeholder.com/1920x1080'
          }
        },
        slug: 'sample-article-1',
        schedulePublication: null,
        articleBody: '<p>Content for article 1</p>',
        status: 'published',
        isAward: false,
        metadata: null,
        pageBgColor: '#FFF',
        articleLayoutStruct: null,
        created_at: '2024-07-13T00:00:00.000Z',
        updated_at: '2024-07-13T00:00:00.000Z',
        editorial: {
          id: '1',
          title: 'Editorial 1',
          description: 'Description 1',
          slug: 'editorial-1'
        }
      }
    ],
    config: layoutConfigurations.custom5050
  },
  {
    blockType: 'slot',
    blockPosition: '5',
    layout: 'layoutPadrao',
    template: 'TemplateMVP',
    articles: [
      {
        id: '2',
        title: 'Ruth Westheimer, the Sex Guru Known as Dr. Ruth, Dies at 96',
        subtitle:
          'Frank and funny, the taboo-breaking psychologist said things on television and radio that would have been shocking coming from almost anyone else.',
        author: 'Author 2',
        email: 'author2@example.com',
        content: {
          image: {
            desktop_image_path:
              'https://static01.nyt.com/images/2024/07/14/multimedia/14westheimer-qmpj/00westheimer-qmpj-superJumbo.jpg?quality=75&auto=webp',
            image_mobile_path:
              'https://static01.nyt.com/images/2024/07/14/multimedia/14westheimer-qmpj/00westheimer-qmpj-superJumbo.jpg?quality=75&auto=webp'
          }
        },
        slug: 'sample-article-2',
        schedulePublication: null,
        articleBody: '<p>Content for article 2</p>',
        status: 'published',
        isAward: false,
        metadata: null,
        pageBgColor: '#FFF',
        articleLayoutStruct: null,
        created_at: '2024-07-13T00:00:00.000Z',
        updated_at: '2024-07-13T00:00:00.000Z',
        editorial: {
          id: '2',
          title: 'Editorial 2',
          description: 'Description 2',
          slug: 'editorial-2'
        }
      },
      {
        id: '3',
        title:
          'Israel Launches Major Attack That It Says Targeted a Top Hamas Commander',
        subtitle:
          'Muhammad Deif is considered a mastermind of the Oct. 7 attacks. The Palestinian news media reported mass casualties in the attack in southern Gaza.',
        author: 'Author 3',
        email: 'author3@example.com',
        content: {
          image: {
            desktop_image_path:
              'https://static01.nyt.com/images/2024/07/13/multimedia/13-mideast-netanyahu-cmwq/13-mideast-netanyahu-cmwq-superJumbo.jpg?quality=75&auto=webp',
            image_mobile_path:
              'https://static01.nyt.com/images/2024/07/13/multimedia/13-mideast-netanyahu-cmwq/13-mideast-netanyahu-cmwq-superJumbo.jpg?quality=75&auto=webp'
          }
        },
        slug: 'sample-article-3',
        schedulePublication: null,
        articleBody: '<p>Content for article 3</p>',
        status: 'published',
        isAward: false,
        metadata: null,
        pageBgColor: '#FFF',
        articleLayoutStruct: null,
        created_at: '2024-07-13T00:00:00.000Z',
        updated_at: '2024-07-13T00:00:00.000Z',
        editorial: {
          id: '3',
          title: 'Editorial 3',
          description: 'Description 3',
          slug: 'editorial-3'
        }
      }
    ],
    config: layoutConfigurations.seventyThirty
  },
  {
    blockType: 'slot',
    blockPosition: '6',
    layout: 'layoutPadrao',
    template: 'TemplateMVP',
    articles: [
      {
        id: '2',
        title: 'Ruth Westheimer, the Sex Guru Known as Dr. Ruth, Dies at 96',
        subtitle:
          'Frank and funny, the taboo-breaking psychologist said things on television and radio that would have been shocking coming from almost anyone else.',
        author: 'Author 2',
        email: 'author2@example.com',
        content: {
          image: {
            desktop_image_path:
              'https://static01.nyt.com/images/2024/07/14/multimedia/14westheimer-qmpj/00westheimer-qmpj-superJumbo.jpg?quality=75&auto=webp',
            image_mobile_path:
              'https://static01.nyt.com/images/2024/07/14/multimedia/14westheimer-qmpj/00westheimer-qmpj-superJumbo.jpg?quality=75&auto=webp'
          }
        },
        slug: 'sample-article-2',
        schedulePublication: null,
        articleBody: '<p>Content for article 2</p>',
        status: 'published',
        isAward: false,
        metadata: null,
        pageBgColor: '#FFF',
        articleLayoutStruct: null,
        created_at: '2024-07-13T00:00:00.000Z',
        updated_at: '2024-07-13T00:00:00.000Z',
        editorial: {
          id: '2',
          title: 'Editorial 2',
          description: 'Description 2',
          slug: 'editorial-2'
        }
      },
      {
        id: '3',
        title:
          'Israel Launches Major Attack That It Says Targeted a Top Hamas Commander',
        subtitle:
          'Muhammad Deif is considered a mastermind of the Oct. 7 attacks. The Palestinian news media reported mass casualties in the attack in southern Gaza.',
        author: 'Author 3',
        email: 'author3@example.com',
        content: {
          image: {
            desktop_image_path:
              'https://static01.nyt.com/images/2024/07/13/multimedia/13-mideast-netanyahu-cmwq/13-mideast-netanyahu-cmwq-superJumbo.jpg?quality=75&auto=webp',
            image_mobile_path:
              'https://static01.nyt.com/images/2024/07/13/multimedia/13-mideast-netanyahu-cmwq/13-mideast-netanyahu-cmwq-superJumbo.jpg?quality=75&auto=webp'
          }
        },
        slug: 'sample-article-3',
        schedulePublication: null,
        articleBody: '<p>Content for article 3</p>',
        status: 'published',
        isAward: false,
        metadata: null,
        pageBgColor: '#FFF',
        articleLayoutStruct: null,
        created_at: '2024-07-13T00:00:00.000Z',
        updated_at: '2024-07-13T00:00:00.000Z',
        editorial: {
          id: '3',
          title: 'Editorial 3',
          description: 'Description 3',
          slug: 'editorial-3'
        }
      },
      {
        id: '3',
        title:
          'Israel Launches Major Attack That It Says Targeted a Top Hamas Commander',
        subtitle:
          'Muhammad Deif is considered a mastermind of the Oct. 7 attacks. The Palestinian news media reported mass casualties in the attack in southern Gaza.',
        author: 'Author 3',
        email: 'author3@example.com',
        content: {
          image: {
            desktop_image_path:
              'https://static01.nyt.com/images/2024/07/13/multimedia/13-mideast-netanyahu-cmwq/13-mideast-netanyahu-cmwq-superJumbo.jpg?quality=75&auto=webp',
            image_mobile_path:
              'https://static01.nyt.com/images/2024/07/13/multimedia/13-mideast-netanyahu-cmwq/13-mideast-netanyahu-cmwq-superJumbo.jpg?quality=75&auto=webp'
          }
        },
        slug: 'sample-article-3',
        schedulePublication: null,
        articleBody: '<p>Content for article 3</p>',
        status: 'published',
        isAward: false,
        metadata: null,
        pageBgColor: '#FFF',
        articleLayoutStruct: null,
        created_at: '2024-07-13T00:00:00.000Z',
        updated_at: '2024-07-13T00:00:00.000Z',
        editorial: {
          id: '3',
          title: 'Editorial 3',
          description: 'Description 3',
          slug: 'editorial-3'
        }
      },
      {
        id: '3',
        title:
          'Israel Launches Major Attack That It Says Targeted a Top Hamas Commander',
        subtitle:
          'Muhammad Deif is considered a mastermind of the Oct. 7 attacks. The Palestinian news media reported mass casualties in the attack in southern Gaza.',
        author: 'Author 3',
        email: 'author3@example.com',
        content: {
          image: {
            desktop_image_path:
              'https://static01.nyt.com/images/2024/07/13/multimedia/13-mideast-netanyahu-cmwq/13-mideast-netanyahu-cmwq-superJumbo.jpg?quality=75&auto=webp',
            image_mobile_path:
              'https://static01.nyt.com/images/2024/07/13/multimedia/13-mideast-netanyahu-cmwq/13-mideast-netanyahu-cmwq-superJumbo.jpg?quality=75&auto=webp'
          }
        },
        slug: 'sample-article-3',
        schedulePublication: null,
        articleBody: '<p>Content for article 3</p>',
        status: 'published',
        isAward: false,
        metadata: null,
        pageBgColor: '#FFF',
        articleLayoutStruct: null,
        created_at: '2024-07-13T00:00:00.000Z',
        updated_at: '2024-07-13T00:00:00.000Z',
        editorial: {
          id: '3',
          title: 'Editorial 3',
          description: 'Description 3',
          slug: 'editorial-3'
        }
      }
    ],
    config: layoutConfigurations.threeColumns
  },
  {
    blockType: 'slot',
    blockPosition: '7',
    layout: 'layoutPadrao',
    template: 'TemplateMVP',
    articles: [
      {
        id: '1',
        title: 'Colombia Faces a New Problem: Too Much Cocaine',
        subtitle: 'Even as production surges, domestic and foreign shifts in the global drug industry have devastated poor Colombians whose livelihood is tied to cocaine.',
        author: 'Author 1',
        email: 'author1@example.com',
        content: {
          image: {
            desktop_image_path: 'https://static01.nyt.com/images/2024/06/20/multimedia/00colombia-coca-01-promo/00colombia-coca-01-wjmh-threeByTwoSmallAt2X.jpg?format=pjpg&quality=75&auto=webp&disable=upscale',
            image_mobile_path: 'https://static01.nyt.com/images/2024/06/20/multimedia/00colombia-coca-01-promo/00colombia-coca-01-wjmh-threeByTwoSmallAt2X.jpg?format=pjpg&quality=75&auto=webp&disable=upscale'
          }
        },
        slug: 'sample-article-1',
        schedulePublication: null,
        articleBody: '<p>Content for article 1</p>',
        status: 'published',
        isAward: false,
        metadata: null,
        pageBgColor: '#FFF',
        articleLayoutStruct: null,
        created_at: '2024-07-13T00:00:00.000Z',
        updated_at: '2024-07-13T00:00:00.000Z',
        editorial: {
          id: '1',
          title: 'Editorial 1',
          description: 'Description 1',
          slug: 'editorial-1'
        }
      }
    ],
    config: layoutConfigurations.halfAndHalfWithImage
  }
]

const App = (): ReactElement => {
  return (
    <div className="max-w-[1200px] mx-auto">
      <Header />
      {blockData.map((blockData, index) => (
        <PageBlock key={index} blocksData={[blockData]} />
      ))}{' '}
      <Footer />
    </div>
  )
}

export default App
