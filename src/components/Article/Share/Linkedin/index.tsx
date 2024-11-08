import { type ReactElement } from 'react'
import { type LinkedinShareButtonProps } from './types'
import Link from '../../../../components/Link'
import { LinkedinContainer } from './linkedin.styles'

const LinkedinShare = ({
  pageUrl,
  linkedinPath,
  linkedinProps,
  editorialSlug,
  icon,
  slug,
  articleTitle,
  clientSiteAddressUrl,
  isLinkedinHovered,
  onLinkedinMouseEnter,
  onLinkedinMouseLeave,
  ...rest
}: LinkedinShareButtonProps): ReactElement => {
  const encodedTitle = encodeURIComponent(articleTitle ?? '')
  const encodedUrl = encodeURIComponent(
    `${clientSiteAddressUrl}/${editorialSlug}/${slug}`
  )
  const shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`

  return (
    <LinkedinContainer
      $mt={linkedinProps?.mt}
      $mr={linkedinProps?.mr}
      $mb={linkedinProps?.mb}
      $ml={linkedinProps?.ml}
      {...rest}
    >
      <Link
        href={shareUrl}
        target="_blank"
        onMouseEnter={onLinkedinMouseEnter}
        onMouseLeave={onLinkedinMouseLeave}
      >
        {icon}
      </Link>
    </LinkedinContainer>
  )
}

export default LinkedinShare
