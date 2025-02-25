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
      container: 'w-full',
      grid: 'grid gap-4',
      article: 'relative'
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
      list: 'relative'
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
    }
  }
}; 