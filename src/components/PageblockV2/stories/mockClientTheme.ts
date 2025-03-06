import { ClientTheme } from '../types';

export const mockClientTheme: ClientTheme = {
  fontMapping: {
    articleTitle: 'Georgia, serif',
    articleSubtitle: 'Arial, sans-serif',
    articleBody: 'Arial, sans-serif',
    headerTitle: 'Georgia, serif',
    headerText: 'Arial, sans-serif'
  },
  colorMapping: {
    light: {
      articleBackground: '#ffffff',
      articleTitle: '#1a1a1a',
      articleSubtitle: '#4a5568',
      articleText: '#2d3748',
      headerBackground: '#ffffff',
      headerText: '#1a1a1a',
      primaryButton: '#2d3748',
      secondaryButton: '#4a5568',
      accent: '#3182ce',
      sidebarBackground: '#f7fafc',
      sidebarText: '#2d3748'
    },
    dark: {
      articleBackground: '#1a1a1a',
      articleTitle: '#ffffff',
      articleSubtitle: '#a0aec0',
      articleText: '#e2e8f0',
      headerBackground: '#1a1a1a',
      headerText: '#ffffff',
      primaryButton: '#e2e8f0',
      secondaryButton: '#a0aec0',
      accent: '#63b3ed',
      sidebarBackground: '#2d3748',
      sidebarText: '#e2e8f0'
    }
  }
}; 