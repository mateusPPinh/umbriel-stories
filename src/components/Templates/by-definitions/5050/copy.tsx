/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Box } from '../../../Boxes';
import { Text } from '../../../Typography';

// interface Item {
//   title: string;
//   subtitle: string;
// }

interface Template50Types {
  blockPosition?: number;
  layout?: string;
  template?: string;
  slot_right_items?: {
    content: Array<any>;
  };
  slot_left_items?: {
    content: Array<any>;
  };
  slot_left_bgColor?: string;
  slot_right_bgColor?: string;
  images?: {
    slot_left_images: any;
    slot_right_images: any;
  }[]
}

export const Template5050: React.FC<Template50Types> = ({ 
  slot_left_bgColor,
  slot_right_bgColor,
  images,
  slot_left_items,
  slot_right_items,
}) => {
  const slot_left = slot_left_items?.content || [];
  const slot_rights = slot_right_items?.content || [];

  return (
    <Box
      css={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '0',
        width: '100%',
      }}
    >
      {/* Lado esquerdo */}
      <Box
        css={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          bgColor: '#7159c1'
        }}
      >
        {slot_left.map((item, index) => (
          <Box key={index}
            css={{
              alignContent: 'center',
              justifyContent: 'center',
              display: 'flex',
              margin: '80px auto',
              flexDirection: 'column'
            }}
          >
            <Text as='strong'>{item.title}</Text>
            <Text as='p'>{item.subtitle}</Text>
          </Box>
        ))}
      </Box>

      {/* Lado direito */}
      <Box
        css={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          bgColor: '#a69dc6'
        }}
      >
        {slot_rights.map((item, index) => (
          <Box key={index}
            css={{
              alignContent: 'center',
              justifyContent: 'center',
              display: 'flex',
              margin: '80px auto',
              flexDirection: 'column',
            }}
          >
            <Text as='strong'>{item.title}</Text>
            <Text as='p'>{item.subtitle}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};