/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react'
import Box from '../../../Boxes/Boxes'
import { Text } from '../../../Typography'
import { type Template50Types } from './types'
import Image from '../../../Image/Image'

const Template5050: React.FC<Template50Types> = ({
  slot_left_bgColor,
  slot_right_bgColor,
  slot_left_items,
  slot_right_items,
}) => {
  const slot_left = slot_left_items?.content ?? []
  const slot_right = slot_right_items?.content ?? []

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
          bgColor: slot_left_bgColor,
        }}
      >
        {slot_left.map((item, index) => (
          <Box
            key={index}
            css={{
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              margin: 'auto',
              flexDirection: 'column',
              width: 'calc(100% - 32px)',
            }}
          >
            {item.image && (
              <Image
                key={`left-image-${index}`}
                desktop_image_path={item.image.desktop_image_path}
                mobile_image_path={item.image.mobile_image_path}
                alt={`Imagem correspondente a ${item.title}`}
                fetchPriority="high"
                customCss={{
                  paddingBottom: '56.25%',
                  display: 'block',
                }}
              />
            )}
            <Text as="strong">{item.title}</Text>
            <Text as="p">{item.subtitle}</Text>
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
          bgColor: slot_right_bgColor,
        }}
      >
        {slot_right.map((item, index) => (
          <Box
            key={index}
            css={{
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              margin: 'auto',
              flexDirection: 'column',
              width: 'calc(100% - 32px)',
            }}
          >
            {item.image && (
              <Image
                key={`right-image-${index}`}
                desktop_image_path={item.image.desktop_image_path}
                mobile_image_path={item.image.image_mobile_path}
                alt={`Imagem correspondente a ${item.title}`}
                fetchPriority="high"
                customCss={{
                  paddingBottom: '56.25%',
                  display: 'block',
                }}
              />
            )}
            <Text as="strong">{item.title}</Text>
            <Text as="p">{item.subtitle}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

Template5050.defaultProps = {
  slot_left_bgColor: '#7159c1',
  slot_right_bgColor: '#a69dc6',
}

export default Template5050
