import { type ReactElement } from 'react'
import { type WhatsAppShareButtonProps } from './types'
import { WhatsppContainer } from './whatsapp.styles'
import Link from '../../../../components/Link'

const WhatsappShare = ({
  pageUrl,
  whatsappProps,
  icon,
  slug,
  editorialSlug,
  articleTitle,
  clientSiteAddressUrl,
  isWhatsappHovered,
  onWhatsappMouseEnter,
  onWhatsappMouseLeave,
  ...rest
}: WhatsAppShareButtonProps): ReactElement => {
  const encodedTitle = encodeURIComponent(articleTitle ?? '')
  const encodedUrl = encodeURIComponent(
    `${clientSiteAddressUrl}/${editorialSlug}/${slug}`
  )
  const shareUrl = `https://api.whatsapp.com/send?text=${encodedTitle} - ${encodedUrl}`

  return (
    <WhatsppContainer
      $mt={whatsappProps?.mt}
      $mr={whatsappProps?.mr}
      $mb={whatsappProps?.mb}
      $ml={whatsappProps?.ml}
      {...rest}
    >
      <Link
        href={shareUrl}
        target="_blank"
        onMouseEnter={onWhatsappMouseEnter}
        onMouseLeave={onWhatsappMouseLeave}
      >
        {icon}
      </Link>
    </WhatsppContainer>
  )
}

export default WhatsappShare
