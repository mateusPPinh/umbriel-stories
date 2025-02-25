"use client"
import React from 'react';
import { PageBlock } from '@umbriel/components';

interface CustomStyles {
  container?: string;
  grid?: string;
  mainColumn?: string;
  secondaryColumn?: string;
  compactList?: string;
  article?: string;
}

interface Block {
  id?: string;
  tenantId?: string;
  blockType: string;
  template: string;
  blockPosition?: number;
  variants: Array<{
    variantType: string;
    variantPosition: number;
    config: {
      layout: {
        columns?: number;
        gap?: string;
        padding?: string;
        responsive?: {
          mobile: number;
          tablet: number;
          desktop: number;
        };
      };
      styles?: {
        theme?: {
          light: {
            mainColumnStyle?: {
              background?: string;
              padding?: string;
              borderRadius?: string;
            };
            headingProps?: {
              fontSize?: {
                main: string;
                sidebar: string;
              };
              fontWeight?: {
                main: string;
                sidebar: string;
              };
              color?: string;
            };
          };
          dark: {
            mainColumnStyle?: {
              background?: string;
              padding?: string;
              borderRadius?: string;
            };
            headingProps?: {
              fontSize?: {
                main: string;
                sidebar: string;
              };
              fontWeight?: {
                main: string;
                sidebar: string;
              };
              color?: string;
            };
          };
        };
      };
      customStyles?: CustomStyles;
    };
  }>;
}

interface PageBlockWrapperProps {
  block: Block;
  isDarkTheme?: boolean;
}

export const PageBlockWrapper: React.FC<PageBlockWrapperProps> = ({ block, isDarkTheme }) => {
  const getTemplateClasses = (template: string, variantType?: string): CustomStyles => {
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
          grid: 'grid grid-cols-1 lg:grid-cols-12 gap-6',
          mainColumn: [
            'col-span-12',
            'grid grid-cols-1',
            'w-full',
            'lg:col-[span_6/span_6]'
          ].join(' '),
          secondaryColumn: 'lg:col-span-3 space-y-6',
          compactList: 'lg:col-span-12 mt-8',
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
          grid: 'grid grid-cols-1 lg:grid-cols-12 gap-6',
          mainColumn: 'lg:col-span-8',
          secondaryColumn: 'lg:col-span-4 space-y-6',
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
          grid: 'grid grid-cols-1 lg:grid-cols-12 gap-6',
          mainColumn: 'lg:col-span-9',
          secondaryColumn: 'lg:col-span-3 space-y-6',
          article: [
            'flex flex-col gap-4',
            'hover:opacity-90 transition-opacity'
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
        id: block.id || 'temp-id',
        tenantId: block.tenantId || 'temp-tenant',
        blockPosition: String(block.blockPosition || 1),
        pageId: 'temp-page',
        metadata: {
          title: '',
          description: '',
          tags: []
        },
        blockType: block.blockType,
        template: block.template,
        variants: block.variants.map((variant) => ({
          ...variant,
          config: {
            ...variant.config,
            customStyles: getTemplateClasses(block.template, variant.variantType)
          }
        }))
      }]}
      isDarkTheme={isDarkTheme}
    />
  );
}; 