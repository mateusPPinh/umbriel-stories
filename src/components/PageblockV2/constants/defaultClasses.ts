export const defaultClasses = {
  grid: {
    standard: {
      container: [
        'w-full max-w-[1238px] mx-auto',
        'mb-[40px] mt-[40px]',
        'bg-white dark:bg-gray-900',
        'p-8 rounded-lg'
      ].join(' '),
      grid: [
        'grid grid-cols-1',
        'md:grid-cols-2',
        'lg:grid-cols-3',
        'gap-6'
      ].join(' '),
      article: [
        'flex flex-col',
        'bg-white dark:bg-gray-800',
        'rounded-lg overflow-hidden',
        'transition-all duration-300',
        'hover:shadow-lg'
      ].join(' '),
      image: {
        wrapper: 'relative aspect-[16/10] overflow-hidden mb-4',
        img: 'w-full h-full object-cover'
      },
      content: {
        wrapper: 'p-4',
        title: 'text-xl font-bold text-gray-900 dark:text-white mb-2',
        subtitle: 'text-lg text-gray-600 dark:text-gray-300'
      }
    },
    masonry: {
      container: 'w-full',
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
        title: 'text-xl font-semibold text-gray-900 dark:text-white mb-2',
        subtitle: 'text-md text-gray-600 dark:text-gray-300'
      }
    },
    featured: {
      container: 'w-full',
      grid: [
        'grid grid-cols-1',
        'md:grid-cols-2',
        'lg:grid-cols-3',
        'gap-8'
      ].join(' '),
      article: [
        'flex flex-col',
        'rounded-xl overflow-hidden',
        'transition-all duration-300',
        'hover:shadow-lg'
      ].join(' '),
      image: {
        wrapper: 'relative aspect-[16/10] overflow-hidden',
        img: 'w-full h-full object-cover',
        overlay: 'absolute inset-0 bg-gradient-to-b from-transparent to-black/80'
      },
      content: {
        wrapper: 'absolute bottom-0 left-0 right-0 p-6',
        title: 'text-2xl font-bold text-white mb-2',
        subtitle: 'text-lg text-white/80'
      }
    },
    sidebar: {
      container: 'w-full',
      wrapper: 'flex flex-col lg:flex-row w-full gap-6',
      mainContent: 'flex-1 grid gap-6',
      sidebar: 'w-full lg:w-[360px] shrink-0 border-l border-gray-200 dark:border-gray-700'
    }
  },
  featured: {
    hero: {
      container: [
        'w-full max-w-[1238px] mx-auto',
        'mb-[40px] mt-[40px]'
      ].join(' '),
      grid: 'relative aspect-[21/9]',
      article: [
        'relative w-full h-full',
        'rounded-lg overflow-hidden',
        'hover:opacity-95 transition-opacity'
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
      ].join(' ')
    }
  },
  list: {
    compact: {
      container: 'w-full',
      list: 'space-y-4'
    },
    thumbnail: {
      container: 'w-full',
      list: 'space-y-4',
      article: 'relative'
    },
    chronological: {
      container: 'w-full',
      list: 'relative',
      timeline: [
        'absolute left-4 top-0 bottom-0',
        'w-px border-l-2',
        'border-blue-600 dark:border-blue-400'
      ].join(' '),
      item: [
        'relative pl-12 py-6',
        'transition-all duration-200'
      ].join(' '),
      marker: [
        'absolute left-3 top-8',
        '-translate-x-1/2 w-3 h-3',
        'bg-blue-600 dark:bg-blue-400'
      ].join(' '),
      content: {
        date: 'text-sm text-gray-500 dark:text-gray-400 mb-2',
        title: 'text-lg font-medium text-gray-900 dark:text-white mb-2',
        subtitle: 'text-sm text-gray-600 dark:text-gray-300',
        metadata: 'text-sm text-gray-500 dark:text-gray-400 mt-2'
      },
      variants: {
        line: {
          solid: 'border-solid',
          dashed: 'border-dashed',
          dotted: 'border-dotted'
        },
        marker: {
          circle: 'rounded-full',
          square: 'rounded-none',
          diamond: 'rotate-45'
        },
        hover: {
          highlight: 'hover:bg-blue-50 dark:hover:bg-blue-900/20',
          scale: 'hover:scale-[1.02]',
          none: ''
        }
      }
    }
  },
  mixed: {
    sidebar: {
      container: 'w-full'
    },
    magazine: {
      container: 'w-full'
    },
    showcase: {
      container: 'w-full'
    },
    newspaper: {
      container: 'w-full'
    },
    masonry: {
      container: 'w-full'
    }
  },
  newsfeed: {
    container: [
      "w-full max-w-[1238px] mx-auto",
      "mb-[40px] mt-[40px]",
      "bg-white dark:bg-[#1b1b1b]",
      "p-6 rounded-sm",
    ].join(" "),
    grid: "flex flex-col space-y-4",
    column: "w-full",
    article: [
      "w-full",
      "border-b border-gray-200 dark:border-gray-800",
      "pb-4 last:border-b-0",
      "hover:opacity-90 transition-opacity",
    ].join(" "),
    content: "flex flex-col gap-2",
    title: [
      "text-xl font-semibold",
      "text-gray-900 dark:text-white",
      "leading-tight",
    ].join(" "),
    subtitle: [
      "text-base",
      "text-gray-600 dark:text-gray-300",
      "line-clamp-2",
    ].join(" "),
    readTime: [
      "text-sm",
      "text-gray-500 dark:text-gray-400",
      "font-medium",
      "mt-2",
    ].join(" "),
  },
  newsgrid: {
    container: [
      "w-full max-w-[1238px] mx-auto",
      "mb-[40px] mt-[40px]",
      "bg-white dark:bg-[#1b1b1b]",
      "p-6 rounded-sm",
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
      "text-lg font-semibold",
      "text-gray-900 dark:text-white",
      "leading-tight",
    ].join(" "),
    secondaryTitle: [
      "text-base font-medium",
      "text-gray-800 dark:text-gray-200",
      "leading-snug",
    ].join(" "),
  }
}; 