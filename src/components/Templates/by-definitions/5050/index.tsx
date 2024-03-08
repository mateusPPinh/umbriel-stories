import React from 'react';
import { Box } from '../../../Boxes';
import { Text } from '../../../Typography';
import { Template50Types } from './types';
import { Image } from '../../../Image';

export const Template5050: React.FC<Template50Types> = ({ 
  slot_left_bgColor,
  slot_right_bgColor,
  slot_left_items,
  slot_right_items,
}) => {
  const slot_left = slot_left_items?.content || [];
  const slot_right = slot_right_items?.content || [];

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
      <Box css={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgColor: slot_left_bgColor }}>
        {slot_left.map((item, index) => (
      {/* Lado direito */}
      <Box
        css={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          bgColor: slot_right_bgColor
        }}
      >
        {slot_right.map((item, index) => (
        <Box key={index} 
        css={{
          alignItems: 'column',
          justifyContent: 'center',
          display: 'flex',
          margin: 'auto',
          flexDirection: 'column',
          width:'calc(100% - 32px)'
        }}>
          <Box key={index}>
            {item.image && (
              <Image
              key={`right-image-${index}`} 
              desktop_image_path={item.image.desktop_image_path}
              mobile_image_path={item.image.image_mobile_path}
              alt={`Imagem correspondente a ${item.title}`}
            />
            )}
          </Box>
          <Text as='strong'>{item.title}</Text>
          <Text as='p'>{item.subtitle}</Text>
        </Box>
      ))}
      </Box>
    </Box>
  );
};

Template5050.defaultProps = {
  slot_left_bgColor: '#7159c1',
  slot_right_bgColor: '#a69dc6',
  maxImagesLeft: 2,
  maxImagesRight: 2,
  images: {
    slot_left_images: [
     {
      image_middle_desktop_path: 'https://images.unsplash.com/photo-1579762714453-51d9913984e2?q=80&w=2662&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      image_mobile_path: 'https://images.unsplash.com/photo-1579762714453-51d9913984e2?q=80&w=2662&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
     }
    ],
    slot_right_images: [
      {
        image_middle_desktop_path: 'https://images.unsplash.com/photo-1579762714453-51d9913984e2?q=80&w=2662&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        image_mobile_path: 'https://images.unsplash.com/photo-1579762714453-51d9913984e2?q=80&w=2662&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      }
    ]
  }
}