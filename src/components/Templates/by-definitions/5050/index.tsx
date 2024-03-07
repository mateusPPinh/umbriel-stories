import React from 'react';
import { Box } from '../../../Boxes';
import { Text } from '../../../Typography';
import { Template50Types } from './types';
import { Image } from '../../../Image';

export const Template5050: React.FC<Template50Types> = ({ 
  slot_left_bgColor,
  slot_right_bgColor,
  images,
  slot_left_items,
  slot_right_items,
  maxImagesLeft,
  maxImagesRight
}) => {
  const slot_left = slot_left_items?.content || [];
  const slot_right = slot_right_items?.content || [];

  // that's cool, let's make ts-check shut up to avoid the lodash, but if you gonna change that, be carefull ;)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const imageObject = images ? images[0] : null;

  // Não podemos permitir que se carregue mais imagens que o tamanho do slot de images.
  const leftImages = maxImagesLeft ? imageObject?.slot_left_images?.slice(0, maxImagesLeft) : imageObject?.slot_left_images;
  const rightImages = maxImagesRight ? imageObject?.slot_right_images?.slice(0, maxImagesRight) : imageObject?.slot_right_images;

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
      {slot_left.map((item, contentIndex) => (
        <Box key={contentIndex} css={{
          alignItems: 'column',
          justifyContent: 'center',
          display: 'flex',
          margin: 'auto',
          flexDirection: 'column',
          width:'calc(100% - 32px)'
        }}>
          {/* Renderize a imagem correspondente ao item de conteúdo atual, se houver uma */}
          {leftImages && leftImages[contentIndex] && (
            <Image
              key={`left-image-${contentIndex}`} 
              desktop_image_path={leftImages[contentIndex].image_middle_desktop_path}
              mobile_image_path={leftImages[contentIndex].image_mobile_path}
              alt={`Imagem correspondente a ${item.title}`}
            />
          )}
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
          bgColor: slot_right_bgColor
        }}
      >
        {slot_right.map((item, contentIndex) => (
        <Box key={contentIndex} css={{
          alignItems: 'column',
          justifyContent: 'center',
          display: 'flex',
          margin: 'auto',
          flexDirection: 'column',
          width:'calc(100% - 32px)'
        }}>
          {/* Renderiza a imagem correspondente ao item de conteúdo atual, se houver uma */}
          {rightImages && rightImages[contentIndex] && (
            <Image
              key={`right-image-${contentIndex}`} 
              desktop_image_path={rightImages[contentIndex].image_middle_desktop_path}
              mobile_image_path={rightImages[contentIndex].image_mobile_path}
              alt={`Imagem correspondente a ${item.title}`}
            />
          )}
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
  slot_right_bgColor: '#a69dc6'
}