export const defaultClasses = {
  grid: {
    standard: {
      container: [
        'w-full max-w-[1238px] mx-auto',
        'mb-[40px] mt-[40px]',
        'bg-[#f3f3f3] dark:bg-[#1b1b1b]',
        'p-8 rounded-sm'
      ].join(' '),
      grid: [
        'grid grid-cols-1',
        'md:grid-cols-2',
        'lg:grid-cols-3',
        'gap-6'
      ].join(' '),
      article: [
        'flex flex-col gap-4',
        'p-4 rounded-lg',
        'hover:shadow-lg transition-all duration-300',
        'dark:bg-[#262626] bg-white'
      ].join(' ')
    },
    masonry: {
      container: [
        'w-full max-w-[1238px] mx-auto',
        'mb-[40px] mt-[40px]'
      ].join(' '),
      grid: [
        'grid grid-cols-1',
        'md:grid-cols-2',
        'lg:grid-cols-2',
        'gap-6'
      ].join(' '),
      article: [
        'flex flex-col gap-4',
        'hover:shadow-lg transition-all duration-300'
      ].join(' ')
    },
    featured: {
      container: [
        'w-full max-w-[1238px] mx-auto',
        'mb-[40px] mt-[40px]'
      ].join(' '),
      grid: [
        'grid grid-cols-1',
        'md:grid-cols-2',
        'lg:grid-cols-3',
        'gap-6'
      ].join(' '),
      article: [
        'flex flex-col gap-4',
        'hover:shadow-lg transition-all duration-300'
      ].join(' ')
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
      container: [
        'w-full max-w-[1238px] mx-auto',
        'mb-[40px] mt-[40px]',
        'bg-white dark:bg-[#1b1b1b]',
        'p-6 rounded-sm'
      ].join(' '),
      grid: 'space-y-6',
      article: [
        'border-b border-gray-100 dark:border-gray-800',
        'last:border-0 pb-6 last:pb-0',
        'hover:bg-gray-50 dark:hover:bg-[#262626]',
        'transition-colors duration-300'
      ].join(' ')
    },
    thumbnail: {
      container: [
        'w-full max-w-[1238px] mx-auto',
        'mb-[40px] mt-[40px]',
        'bg-white dark:bg-[#1b1b1b]',
        'p-6 rounded-sm'
      ].join(' '),
      grid: 'space-y-6',
      article: [
        'flex items-start gap-4 p-4 rounded-lg',
        'hover:bg-gray-50 dark:hover:bg-[#262626]',
        'transition-colors duration-300',
        'border-b border-gray-100 dark:border-gray-800 last:border-0'
      ].join(' ')
    },
    chronological: {
      container: [
        'w-full max-w-[1238px] mx-auto',
        'mb-[40px] mt-[40px]'
      ].join(' '),
      grid: 'space-y-8',
      article: [
        'flex items-start gap-6',
        'hover:bg-gray-50 dark:hover:bg-[#262626]',
        'transition-colors duration-300',
        'p-4 rounded-lg'
      ].join(' ')
    }
  },
  mixed: {
    magazine: {
      container: [
        'w-full max-w-[1238px] mx-auto',
        'mb-[40px] mt-[40px]',
        'bg-white dark:bg-[#1b1b1b]',
        'p-6 rounded-sm'
      ].join(' '),
      grid: 'grid grid-cols-1 md:grid-cols-[2.5fr,1fr,1fr] gap-6',
      article: [
        'flex flex-col gap-4',
        'hover:opacity-90 transition-opacity'
      ].join(' ')
    },
    newspaper: {
      container: [
        'w-full max-w-[1238px] mx-auto',
        'mb-[40px] mt-[40px]',
        'bg-white dark:bg-[#1b1b1b]',
        'p-6 rounded-sm'
      ].join(' '),
      grid: 'grid grid-cols-1 md:grid-cols-[3fr,1fr,1fr] gap-6',
      article: [
        'flex flex-col gap-4',
        'hover:opacity-90 transition-opacity'
      ].join(' ')
    },
    sidebar: {
      container: [
        'w-full max-w-[1238px] mx-auto',
        'mb-[40px] mt-[40px]',
        'bg-white dark:bg-[#1b1b1b]',
        'p-6 rounded-sm'
      ].join(' '),
      grid: 'grid gap-6',
      article: [
        'flex gap-4',
        'hover:bg-gray-50 dark:hover:bg-[#262626]',
        'transition-colors duration-300'
      ].join(' ')
    }
  }
}; 