import type { Meta, StoryObj } from '@storybook/react';
import { Text as Typography } from '../../components/Typography';
import { TextProps } from '../../components/Typography/types';

export default {
  title: 'Example/Typography',
  component: Typography,
  // Se você quiser adicionar tags como parâmetros, eles devem estar dentro de um objeto
  parameters: {
    layout: 'fullscreen'
  },
  // Inclua aqui quaisquer argumentos padrão que você gostaria de aplicar a todas as histórias desse componente
  args: {
    children: 'Default Text',
  },
  // Se você tiver argumentos que se aplicam a todas as histórias, mas quer permitir que sejam sobrescritos
  argTypes: {
    // Defina os controles para os tipos de argumentos aqui, se necessário
  },
} as Meta<TextProps<'span'>>;

// Define uma história padrão
export const Default: StoryObj<TextProps<'span'>> = {
  args: {
    // Os argumentos específicos dessa variante
    css: { fontSize: '16px' },
  },
};

// Define outras variantes
export const Large: StoryObj<TextProps<'span'>> = {
  args: {
    children: 'Large Text',
    css: { fontSize: '24px' },
  },
};

export const Eagle: StoryObj<TextProps<'span'>> = {
  args: {
    children: 'Umbriel Typography',
    css: { fontSize: '44px', fontWeight: 'bold', fontFamily: 'Roboto' },
  },
  parameters: {
    backgrounds: { default: '#1A1A1E' }, // Use um fundo escuro como na imagem
    // Inclua parâmetros adicionais para definir informações sobre a tipografia
    typography: {
      name: 'Eagle (GEL Canon)',
      size: '44/48',
      usage: 'Not in use on iPlayer',
    },
  },
  // Você pode adicionar decorators ou parâmetros adicionais aqui para customizar o render da história
};

// E assim por diante para outras variantes...
