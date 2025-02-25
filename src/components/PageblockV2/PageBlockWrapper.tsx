import React from 'react';
import { PageBlock } from '@umbriel/components';

interface PageBlockWrapperProps {
  block: any;
}

export const PageBlockWrapper: React.FC<PageBlockWrapperProps> = ({ block }) => {
  const getTemplateClasses = (template: string, variantType?: string) => {
    // Primeiro verifica o variantType
    switch (variantType) {
      case 'magazine':
        return {
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
        };

      case 'newspaper':
        return {
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
        };

      case 'sidebar':
        return {
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
        };

      case 'standard':
        return {
          container: [
            'w-full max-w-[1238px] mx-auto',
            'mb-[40px] mt-[40px]',
            'bg-[#f3f3f3] dark:bg-[#1b1b1b]',
            'p-8 rounded-sm'
          ].join(' '),
          grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
          article: [
            'flex flex-col gap-4',
            'p-4 rounded-lg',
            'hover:shadow-lg transition-all duration-300',
            'dark:bg-[#262626] bg-white'
          ].join(' ')
        };

      case 'masonry':
        return {
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
        };

      case 'featured':
        return {
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
        };

      case 'compact':
        return {
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
        };

      case 'thumbnail':
        return {
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
        };

      case 'chronological':
        return {
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
        };
    }

    // Depois verifica o template
    switch (template) {
      case 'mixed':
        return {
          container: [
            'w-full max-w-[1238px] mx-auto',
            'mb-[40px] mt-[40px]',
            'bg-white dark:bg-[#1b1b1b]',
            'p-6 rounded-sm'
          ].join(' '),
          grid: 'grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-6',
          article: [
            'flex flex-col gap-4',
            'hover:opacity-90 transition-opacity'
          ].join(' ')
        };

      case 'grid':
        return {
          container: [
            'w-full max-w-[1238px] mx-auto',
            'mb-[40px] mt-[40px]',
            'bg-[#f3f3f3] dark:bg-[#1b1b1b]',
            'p-8 rounded-sm'
          ].join(' '),
          grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
          article: [
            'flex flex-col gap-4',
            'p-4 rounded-lg',
            'hover:shadow-lg transition-all duration-300',
            'dark:bg-[#262626] bg-white'
          ].join(' ')
        };

      case 'featured':
        return {
          container: 'w-full max-w-[1238px] mx-auto mb-[40px] mt-[40px]',
          grid: 'grid grid-cols-1 lg:grid-cols-2 gap-8',
          article: [
            'flex flex-col gap-4',
            'hover:opacity-90 transition-opacity duration-300'
          ].join(' ')
        };

      case 'list':
        return {
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
        };

      default:
        return {
          container: 'w-full max-w-[1238px] mx-auto mb-[40px] mt-[40px]',
          grid: '',
          article: ''
        };
    }
  };

  return (
    <PageBlock
      blocksData={[{
        ...block,
        variants: block.variants.map((variant: any) => ({
          ...variant,
          config: {
            ...variant.config,
            customStyles: getTemplateClasses(block.template, variant.variantType)
          }
        }))
      }]}
    />
  );
};

export default PageBlockWrapper; 