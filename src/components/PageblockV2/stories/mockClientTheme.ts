import { ClientTheme } from '../types';

export const mockClientTheme: ClientTheme = {
  fontMapping: {
    pageblockTitle: 'Georgia, serif',
    pageblockSubtitle: 'Arial, sans-serif',
    pageblockText: 'Arial, sans-serif',
  },
  colorMapping: {
    light: {
      pageblockTitle: '#1a1a1a',
      pageblockSubtitle: '#4a5568',
      pageblockText: '#2d3748',
    },
    dark: {
      pageblockTitle: '#ffffff',
      pageblockSubtitle: '#a0aec0',
      pageblockText: '#e2e8f0',
    }
  }
}; 