export const defaultClasses = {
  grid: {
    standard: {
      container: [
        'w-full max-w-[1238px] mx-auto bg-transparent',
        'mb-[40px] mt-[40px]',
        'bg-transparent',
        'p-8 rounded-lg'
      ].join(' '),
      grid: [
        'grid grid-cols-1',
        'md:grid-cols-2',
        `lg:grid-cols-3`,
        `gap-[24px]`
      ].join(' '),
      article: [
        'flex flex-col',
        'bg-transparent',
      ].join(' '),
      image: {
        wrapper: 'relative aspect-[16/10] overflow-hidden mb-4',
        img: 'w-full h-full object-cover'
      },
      content: {
        wrapper: 'p-4',
        title: 'text-[1.5rem] sm:text-[1rem] font-semibold mb-2 text-gray-900 dark:text-white mb-2',
        subtitle: 'text-[1rem] sm:text-[0.8rem] text-gray-700 dark:text-gray-300'
      }
    },
    masonry: {
      container: 'w-full mt-12 mb-12 bg-transparent',
      grid: [
        'columns-1 md:columns-2 lg:columns-3',
        'gap-6'
      ].join(' '),
      article: [
        'break-inside-avoid',
        'mb-6',
        'bg-transparent dark:bg-transparent',
        'p-4',
        'rounded-lg'
      ].join(' '),
      image: {
        wrapper: 'relative overflow-hidden rounded-lg mb-4',
        img: 'w-full h-full object-cover'
      },
      content: {
        title: 'text-[1.5rem] sm:text-[1rem] font-semibold mb-2 text-gray-900 dark:text-white mb-2',
        subtitle: 'text-[1rem] sm:text-[0.8rem] text-gray-700 dark:text-gray-300',
        wrapper: 'p-4',
      },
    },
    featured: {
      container: 'w-full mt-12 mb-12 bg-transparent',
      grid: [
        'grid grid-cols-1',
        'md:grid-cols-2',
        'lg:grid-cols-3',
        'gap-4'
      ].join(' '),
      article: [
        'flex flex-col',
      ].join(' '),
      image: {
        wrapper: 'relative aspect-[16/10] overflow-hidden',
        img: 'w-full h-full object-cover',
        overlay: 'absolute inset-0 bg-gradient-to-b from-transparent to-black/80'
      },
      content: {
        wrapper: 'absolute bottom-0 left-0 right-0 p-6',
        title: 'text-[1.5rem] sm:text-[1rem] font-bold text-white mb-2 dark:text-white',
        subtitle: 'text-[1rem] sm:text-[0.8rem] text-white/80 dark:text-white/80'
      }
    },
    sidebar: {
      container: 'w-full bg-transparent',
      wrapper: [
        'flex flex-col',
        'lg:flex-row',
        'w-full',
        'max-w-[600px]',
        'gap-6'
      ].join(' '),
      mainContent: [
        'flex-1',
        'grid',
        'gap-6'
      ].join(' '),
      sidebar: [
        'w-full lg:w-[360px]',
        'shrink-0 ',
        'border-l ',
        'border-gray-200 ',
        'dark:border-gray-700',
        'space-y-6',
        'pl-6'
      ].join(' '),
      article: {
        main: [
          'flex flex-col',
        ].join(' '),
        sidebar: [
          'flex gap-4',
        ].join(' ')
      },
      image: {
        main: 'w-full aspect-[16/9] object-cover mb-4',
        sidebar: 'w-24 h-24 object-cover shrink-0 rounded-lg'
      },
      content: {
        main: {
          title: 'text-[1.5rem] sm:text-[1rem] font-semibold mb-2 text-gray-900 dark:text-white mb-2',
          subtitle: 'text-[1rem] sm:text-[0.8rem] text-gray-700 dark:text-gray-300'
        },
        sidebar: {
          title: 'text-[1.5rem] sm:text-[1rem] font-semibold mb-2 text-gray-900 dark:text-white mb-1',
          subtitle: 'text-[1rem] sm:text-[0.8rem] text-gray-700 dark:text-gray-300'
        }
      }
    },
    sidebargrid: {
      container: 'w-full bg-transparent',
      wrapper: [
        'flex flex-col',
        'lg:flex-row',
        'w-full',
        'gap-6'
      ].join(' '),
      mainContent: [
        'flex-1',
        'grid',
        'gap-6'
      ].join(' '),
      sidebar: [
        'w-full lg:w-[360px]',
        'shrink-0',
        'border-l',
        'border-gray-200',
        'dark:border-gray-700',
        'space-y-6',
        'pl-6'
      ].join(' '),
      article: {
        main: [
          'flex flex-col',
        ].join(' '),
        sidebar: [
          'flex gap-4',
        ].join(' ')
      },
      image: {
        main: 'w-full aspect-[16/9] object-cover mb-4',
        sidebar: 'w-24 h-24 object-cover shrink-0 rounded-lg'
      },
      content: {
        main: {
          title: 'text-[1.5rem] sm:text-[1rem] font-semibold mb-2 text-gray-900 dark:text-white mb-2',
          subtitle: 'text-[1rem] sm:text-[0.8rem] text-gray-700 dark:text-gray-300'
        },
        sidebar: {
          title: 'text-[1.5rem] sm:text-[1rem] font-semibold mb-2 text-gray-900 dark:text-white mb-1',
          subtitle: 'text-[1rem] sm:text-[0.8rem] text-gray-700 dark:text-gray-300'
        }
      }
    },
    newsfeed: {
      container: [
        'w-full max-w-[1238px] mx-auto mt-12 mb-12 bg-transparent',
        'p-6',
        'space-y-12'
      ].join(' '),
      grid: [
        'grid grid-cols-1',
        'md:grid-cols-2',
        'lg:grid-cols-3',
        'gap-6'
      ].join(' '),
      article: [
        'flex flex-col',
        'bg-transparent',
      ].join(' '),
      image: {
        wrapper: 'relative aspect-[16/10] overflow-hidden mb-4',
        img: 'w-full h-full object-cover'
      },
      content: {
        wrapper: 'p-4',
        title: 'text-[1.5rem] sm:text-[1rem] font-semibold mb-2 text-gray-900 dark:text-white mb-2',
        subtitle: 'text-[1rem] sm:text-[0.8rem] text-gray-700 dark:text-gray-300'
      }
    },
    newsgrid: {
      container: [
        'w-full max-w-[1238px] mx-auto mt-12 mb-12 bg-transparent',
        'p-6',
        'space-y-12'
      ].join(' '),
      grid: [
        'grid grid-cols-1',
        'md:grid-cols-3',
        'lg:grid-cols-5',
        'gap-6'
      ].join(' '),
      column: [
        'flex flex-col space-y-4',
        'gap-6'
      ].join(' '),
      mainArticle: [
        'flex flex-col gap-4',
        'hover:opacity-90 transition-opacity'
      ].join(' '),
      secondaryArticle: [
        'border-t border-gray-200 dark:border-gray-800',
        'pt-4',
        'hover:opacity-90 transition-opacity'
      ].join(' '),
      imageWrapper: 'relative aspect-[16/10] overflow-hidden mb-3',
      image: 'w-full h-full object-cover',
      mainTitle: [
        'text-[1rem] sm:text-[0.8rem] font-normal',
        'text-gray-900 dark:text-white',
        'leading-tight'
      ].join(' '),
      secondaryTitle: [
        'text-[1rem] sm:text-[0.8rem] font-medium',
        'text-gray-800 dark:text-gray-200',
        'leading-snug'
      ].join(' ')
    }
  },

  featured: {
    hero: {
      container: [
        'w-full max-w-[1238px] mx-auto mt-12 mb-12 bg-transparent',
      ].join(' '),
      grid: 'relative aspect-[21/9]',
      article: [
        'relative w-full h-full',
      ].join(' '),
      image: 'w-full h-full object-cover',
      content: 'p-2',
      heading: [
        'mb-0',
        'text-[1.5rem] text-white font-bold sm:text-[1rem] dark:text-white',
      ].join(' '),
      subtitle: [
        'text-lg text-white/80 dark:text-white/80',
      ].join(' ')
    },
    split: {
      container: [
        'w-full max-w-[1238px] mx-auto',
        'mb-[40px] mt-[40px]'
      ].join(' '),
      grid: 'grid grid-cols-1 lg:grid-cols-2 gap-8',
      article: [
        'flex flex-col gap-4',
        'hover:opacity-90 transition-opacity'
      ].join(' '),
      image: 'w-full h-full object-cover',
      content: 'p-2',
      heading: [
        'mb-0',
        'text-[1.5rem] text-gray-900 font-bold sm:text-[1rem] dark:text-white',
      ].join(' '),
      subtitle: [
        'text-lg text-gray-600 dark:text-gray-300',
      ].join(' ')
    },
    triple: {
      container: [
        'w-full max-w-[1238px] mx-auto',
        'mb-[40px] mt-[40px]'
      ].join(' '),
      grid: 'grid grid-cols-1 md:grid-cols-3 gap-6',
      article: [
        'flex flex-col gap-4',
        'hover:opacity-90 transition-opacity'
      ].join(' '),
      image: 'w-full h-full object-cover',
      content: 'p-2',
      heading: [
        'mb-0',
        'text-[1.5rem] text-gray-900 font-bold sm:text-[1rem] dark:text-white',
      ].join(' '),
      subtitle: [
        'text-lg text-gray-600 dark:text-gray-300',
      ].join(' ')
    }
  },
  list: {
    chronological: {
      container: 'relative w-full max-w-3xl mx-auto',
      list: 'relative space-y-6',
      timeline: 'absolute left-4 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-700',
      item: 'flex flex-col gap-2 pl-8 relative',
      marker: 'absolute left-3 top-2 -translate-x-1/2 w-2 h-2 rounded-full bg-blue-500 ring-4 ring-blue-100 dark:ring-blue-900/30',
      content: {
        date: 'text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2',
        relativeTime: 'text-gray-400 dark:text-gray-500',
        title: 'text-lg font-medium text-gray-900 dark:text-white',
        subtitle: 'text-sm text-gray-500 dark:text-gray-400 mt-1',
        preview: 'mt-2'
      },
      variants: {
        line: {
          solid: 'bg-gray-300 dark:bg-gray-700',
          dashed: 'border-l border-dashed border-gray-300 dark:border-gray-700',
          dotted: 'border-l border-dotted border-gray-300 dark:border-gray-700'
        },
        marker: {
          circle: 'rounded-full',
          square: 'rounded-none',
          diamond: 'rotate-45'
        },
        hover: {
          highlight: 'hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg -mx-4 px-4',
          scale: 'hover:scale-[1.02] origin-left',
          background: 'hover:bg-gray-50 dark:hover:bg-gray-800/50',
          translate: 'hover:translate-x-2',
          none: ''
        }
      }
    },
    compact: {
      container: 'relative w-full max-w-3xl mx-auto',
      list: 'space-y-2',
      variants: {
        hover: {
          highlight: 'hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg -mx-4 px-4',
          scale: 'hover:scale-[1.02] origin-left',
          background: 'hover:bg-gray-50 dark:hover:bg-gray-800/50',
          translate: 'hover:translate-x-2',
          none: ''
        },
        divider: {
          solid: 'border-b border-gray-200 dark:border-gray-700',
          dashed: 'border-b border-dashed border-gray-200 dark:border-gray-700',
          dotted: 'border-b border-dotted border-gray-200 dark:border-gray-700'
        }
      }
    },
    thumbnail: {
      container: 'relative w-full max-w-3xl mx-auto',
      list: 'space-y-4',
      variants: {
        hover: {
          highlight: 'hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg -mx-4 px-4',
          scale: 'hover:scale-[1.02] transition-transform duration-300',
          background: 'hover:bg-gray-50 dark:hover:bg-gray-800/50',
          translate: 'hover:translate-x-2',
          none: ''
        },
        shape: {
          square: 'rounded-none',
          rounded: 'rounded-lg',
          circle: 'rounded-full'
        }
      }
    }
  },
  mixed: {
    sidebar: {
      container: 'w-full bg-transparent mt-12 mb-12',
      grid: 'grid grid-cols-1 md:grid-cols-3 gap-6',
      mainColumn: 'md:col-span-2',
      sidebarColumn: [
        'md:col-span-1',
        'border-l',
        'border-gray-200',
        'dark:border-gray-700',
        'md:pl-6'
      ].join(' '),
      article: {
        main: [
          'break-inside-avoid mb-6',
        ].join(' '),
        sidebar: [
          'break-inside-avoid mb-6',
        ].join(' ')
      },
      imageWrapper: 'relative w-full overflow-hidden mb-4',
      image: 'w-full h-full object-cover',
      content: 'p-2',
      heading: [
        'mb-0',
        'text-[1.5rem] font-bold sm:text-[1rem]',
        'text-gray-900',
        'dark:text-white'
      ].join(' '),
      subtitle: [
        'text-lg sm:text-xl',
        'text-gray-600',
        'dark:text-gray-400'
      ].join(' ')
    },
    magazine: {
      container: 'w-full mt-12 mb-12'
    },
    showcase: {
      container: 'w-full bg-transparent mt-12 mb-12',
      grid: 'grid grid-cols-12 gap-6',
      featuredColumn: [
        'col-span-12 lg:col-span-6',
        'border-y',
        'border-gray-200',
        'dark:border-gray-700'
      ].join(' '),
      gridColumn: [
        'col-span-12 lg:col-span-3',
        'border-l',
        'border-gray-200',
        'dark:border-gray-700',
        'lg:pl-6'
      ].join(' '),
      listColumn: [
        'col-span-12 lg:col-span-3',
        'border-l',
        'border-gray-200',
        'dark:border-gray-700',
        'lg:pl-6'
      ].join(' '),
      article: {
        featured: [
          'relative w-full h-full',
        ].join(' '),
        grid: [
          'flex flex-col',
          'border-b border-gray-200 dark:border-gray-700',
          'pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0'
        ].join(' '),
        list: [
          'flex flex-col',
          'p-4',
          'border-b border-gray-200 dark:border-gray-700',
          'pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0'
        ].join(' ')
      },
      imageWrapper: 'relative aspect-video overflow-hidden',
      image: 'w-full h-full object-cover',
      content: {
        featured: 'p-4',
        grid: 'flex-1 p-2',
        list: ''
      },
      heading: {
        featured: [
          'text-[1.5rem] font-bold mb-0 sm:text-[1rem]',
          'text-gray-900',
          'dark:text-white'
        ].join(' '),
        grid: [
          'mb-2 line-clamp-2',
          'text-[1.5rem] sm:text-[1rem] font-bold',
          'text-gray-900',
          'dark:text-white'
        ].join(' '),
        list: [
          'mb-2 line-clamp-2',
          'text-[1.5rem] sm:text-[1rem] font-bold',
          'text-gray-900',
          'dark:text-white'
        ].join(' ')
      },
      subtitle: {
        featured: [
          'text-[1.5rem] sm:text-[1rem] mb-4',
          'text-gray-600',
          'dark:text-gray-400'
        ].join(' '),
        grid: [
          'line-clamp-2',
          'text-base',
          'text-gray-600',
          'dark:text-gray-400'
        ].join(' '),
        list: [
          'line-clamp-2',
          'text-sm',
          'text-gray-600',
          'dark:text-gray-400'
        ].join(' ')
      }
    },
    newspaper: {
      container: 'w-full mt-12 mb-12 bg-transparent',
      grid: 'grid grid-cols-1 lg:grid-cols-12 gap-6',
      mainArticle: [
        'lg:col-span-6',
      ].join(' '),
      secondaryArticles: [
        'lg:col-span-3',
      ].join(' '),
      tertiaryArticles: [
        'lg:col-span-3',
      ].join(' '),
      imageWrapper: 'relative w-full overflow-hidden mb-4',
      image: 'w-full h-full object-cover',
      content: 'p-2',
      heading: [
        'mb-3',
        'text-[1.5rem] font-bold sm:text-[1rem]',
        'text-gray-900 dark:text-white'
      ].join(' '),  
      subtitle: [
        'text-base',
        'text-gray-600 dark:text-gray-300',
        'line-clamp-2'
      ].join(' ') ,
      secondaryArticle: [
        'mb-6 last:mb-0',
      ].join(' '),
      tertiaryArticle: [
        'mb-6 last:mb-0',
      ].join(' '),
    },
    masonry: {
      container: 'w-full mt-12 mb-12',
      masonryGrid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
      article: [
        'break-inside-avoid mb-6',
      ].join(' '),
      imageWrapper: 'relative w-full overflow-hidden mb-4',
      image: 'w-full h-full object-cover',
      content: 'p-2', 
      heading: [
        'mb-3',
        'text-[1.5rem] font-bold sm:text-[1rem]',
        'text-gray-900 dark:text-white'
      ].join(' '),
      subtitle: [
        'text-base',
        'text-gray-600 dark:text-gray-300',
        'line-clamp-2'
      ].join(' ')
    },
    video: {
      container: [
        "w-full mx-auto",
        "mb-[40px] mt-[40px]",
        "bg-transparent",
        "p-0",
      ].join(" "),
      grid: [
        "grid grid-cols-1",
        "md:grid-cols-3",
        "lg:grid-cols-5",
        "gap-6",
      ].join(" "),
      mainColumn: "lg:col-span-6",
      secondaryColumn: "lg:col-span-3",
      secondaryGrid: "space-y-6 lg:pl-6",
      tertiaryColumn: "lg:col-span-3",
      tertiaryGrid: "space-y-6 lg:pl-6",
      article: {
        main: "flex flex-col",
        secondary: "flex flex-col",
        tertiary: "flex flex-col"
      },
      imageWrapper: "relative w-full overflow-hidden mb-4",
      image: "w-full h-full object-cover",
      content: "p-4",
      heading: "text-[1.5rem] sm:text-[1rem] font-semibold mb-2 text-gray-900 dark:text-white",
      subtitle: "text-[1rem] sm:text-[0.8rem] text-gray-700 dark:text-gray-300",
      customVideoHeight: "h-[300px] sm:h-[200px] md:h-[300px] lg:h-auto"
    }
  },
  newsfeed: {
    container: [
      "w-full mx-auto",
      "mb-[40px] mt-[40px]",
      "bg-transparent",
    ].join(" "),
    grid: "grid grid-cols-1 lg:grid-cols-4 gap-6",
    column: {
      main: [
        "col-span-1",
        "flex flex-col space-y-4"
      ].join(" "),
      image: [
        "col-span-2",
        "flex items-start justify-start"
      ].join(" "),
      right: [
        "col-span-1",
        "flex flex-col space-y-4",
        "border-t lg:border-t-0",
        "border-l-0 lg:border-l border-gray-200 dark:border-gray-700",
        "pt-6 lg:pt-0",
        "lg:pl-6"
      ].join(" ")
    },
    article: {
      main: [
        "w-full",
        "border-b border-gray-200 dark:border-gray-700",
        "pb-4 mb-4",
        "last:border-b-0 last:pb-0 last:mb-0"
      ].join(" "),
      image: [
        "w-full aspect-video",
        "overflow-hidden"
      ].join(" "),
      imageContent: [
        "w-full h-full",
        "object-cover"
      ].join(" ")
    },
    content: "flex flex-col gap-2",
    title: [
      "text-[1.5rem] font-bold sm:text-[1rem]",
      "text-gray-900 dark:text-white",
      "leading-tight"
    ].join(" "),
    subtitle: [
      "text-base",
      "text-gray-600 dark:text-gray-300",
      "line-clamp-2"
    ].join(" "),
    readTime: [
      "text-sm",
      "text-gray-500 dark:text-gray-400",
      "font-medium",
      "mt-2"
    ].join(" ")
  },
  newsgrid: {
    container: [
      "w-full mx-auto mt-12 mb-12",
      "bg-transparent",
      "p-6",
      "space-y-12",
    ].join(" "),
    grid: [
      "grid grid-cols-1",
      "md:grid-cols-3",
      "lg:grid-cols-5",
      "gap-6",
    ].join(" "),
    column: "flex flex-col space-y-4",
    mainArticle: [
      "flex flex-col gap-4",
      "hover:opacity-90 transition-opacity",
    ].join(" "),
    secondaryArticle: [
      "border-t border-gray-200 dark:border-gray-800",
      "pt-4",
      "hover:opacity-90 transition-opacity",
    ].join(" "),
    imageWrapper: "relative aspect-[16/10] overflow-hidden mb-3",
    image: "w-full h-full object-cover",
    mainTitle: [
      "text-[1rem] sm:text-[0.8rem] font-normal",
      "text-gray-900 dark:text-white",
      "leading-tight",
    ].join(" "),
    secondaryTitle: [
      "text-[1rem] sm:text-[0.8rem] font-medium",
      "text-gray-800 dark:text-gray-200",
      "leading-snug",
    ].join(" "),
  }
}; 