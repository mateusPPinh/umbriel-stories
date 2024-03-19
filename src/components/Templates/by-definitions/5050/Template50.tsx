import React from 'react'
import Box from '../../../Boxes/Boxes'
import { type Template50Types } from './types'
import Image from '../../../Image/Image'
import SlotAnchorHandlers from '../../../utils/SlotAnchorHandlers'
import TextHandlers from '../../../../components/utils/TextHandlers'

const Template5050: React.FC<Template50Types> = ({
  slot_left_items,
  slot_right_items,
  blockPosition,
  template50Options,
  textProps,
  target
}) => {
  const slot_left = slot_left_items?.content ?? []
  const slot_right = slot_right_items?.content ?? []

  if ((slot_left_items == null) && (slot_right_items == null)) {
    console.error('No data avaliable on slots')
    return
  }

  return (
    <Box
      css={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '0',
        width: '100%'
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
          bgColor: template50Options?.slot_left_bgColor
        }}
      >
        {slot_left.map((item, index) => (
         <SlotAnchorHandlers
           key={index}
           index={index}
           isSlotLeftTitleAnchor={template50Options?.anchorHandlerProps?.isSlotLeftTitleAnchor}
           isSlotImageLeftAnchor={template50Options?.anchorHandlerProps?.isSlotImageLeftAnchor}
           position="slot_left"
           href={template50Options?.anchorHandlerProps?.href}
           target={target}
         >
           <Box
            css={{
              alignItems: template50Options?.align_text_slot_left,
              justifyContent: 'center',
              display: 'flex',
              margin: 'auto',
              flexDirection: 'column',
              width: 'calc(100% - 32px)'
            }}
          >
            {(Boolean(item.image)) && (
              <Image
                key={`left-image-${index}`}
                desktop_image_path={item.image.desktop_image_path}
                mobile_image_path={item.image.mobile_image_path}
                alt={`Imagem correspondente a ${item.title}`}
                fetchPriority="high"
                customCss={{
                  paddingBottom: '56.25%',
                  display: 'block'
                }}
              />
            )}
            <TextHandlers
              as={textProps?.as}
              color={textProps?.color}
              font_family={textProps?.font_family}
              font_size={textProps?.font_size}
              line_height={textProps?.line_height}
              transform={textProps?.transform}
            >
              {item.title}
            </TextHandlers>
            <TextHandlers
              as={textProps?.as}
              color={textProps?.color}
              font_family={textProps?.font_family}
              font_size={textProps?.font_size}
              line_height={textProps?.line_height}
              transform={textProps?.transform}
            >
              {item.subtitle}
            </TextHandlers>
          </Box>
         </SlotAnchorHandlers>
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
          bgColor: template50Options?.slot_right_bgColor
        }}
      >
        {slot_right.map((item, index) => (
         <SlotAnchorHandlers
          key={index}
          index={index}
          isSlotRightTitleAnchor={template50Options?.anchorHandlerProps?.isSlotRightTitleAnchor}
          isSlotImageRightAnchor={template50Options?.anchorHandlerProps?.isSlotImageRightAnchor}
          position="slot_right"
          href={template50Options?.anchorHandlerProps?.href}
          target={target}
         >
           <Box
            css={{
              alignItems: template50Options?.align_text_slot_right,
              justifyContent: 'center',
              display: 'flex',
              margin: 'auto',
              flexDirection: 'column',
              width: 'calc(100% - 32px)'
            }}
          >
            {(Boolean(item.image)) && (
              <Image
                key={`right-image-${index}`}
                desktop_image_path={item.image.desktop_image_path}
                mobile_image_path={item.image.image_mobile_path}
                alt={`Imagem correspondente a ${item.title}`}
                fetchPriority="high"
                customCss={{
                  paddingBottom: '56.25%',
                  display: 'block'
                }}
              />
            )}
            <TextHandlers
              as={textProps?.as}
              color={textProps?.color}
              font_family={textProps?.font_family}
              font_size={textProps?.font_size}
              line_height={textProps?.line_height}
              transform={textProps?.transform}
            >
              {item.title}
            </TextHandlers>
            <TextHandlers
              as={textProps?.as}
              color={textProps?.color}
              font_family={textProps?.font_family}
              font_size={textProps?.font_size}
              line_height={textProps?.line_height}
              transform={textProps?.transform}
            >
              {item.subtitle}
            </TextHandlers>
          </Box>
         </SlotAnchorHandlers>
        ))}
      </Box>
    </Box>
  )
}

Template5050.defaultProps = {
  template50Options: {
    slot_left_bgColor: 'white',
    slot_right_bgColor: 'white',
    align_text_slot_left: 'center',
    align_text_slot_right: 'center',
    anchorHandlerProps: {
      isSlotLeftTitleAnchor: true,
      isSlotImageLeftAnchor: true,
      href: 'http://www.google.com',
      isSlotRightTitleAnchor: true,
      isSlotImageRightAnchor: true
    }
  },
  target: '_blank'

}

export default Template5050
