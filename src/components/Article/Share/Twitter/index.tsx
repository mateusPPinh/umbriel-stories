import { type ReactElement } from 'react'
import { type TwitterShareButtonProps } from './types'
import Link from '../../../../components/Link'
import { TwitterContainer } from './twitter.styles'

const TwitterShare = ({
  pageUrl,
  twitterPath,
  twitterProps,
  editorialSlug,
  icon,
  slug,
  clientSiteAddressUrl,
  articleTitle,
  clientTwitterHandle,
  ...rest
}: TwitterShareButtonProps): ReactElement => {
  const encodedTitle = encodeURIComponent(articleTitle ?? '')
  const encodedUrl = encodeURIComponent(
    `${clientSiteAddressUrl}/${editorialSlug}/${slug}`
  )
  const shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&via=${clientTwitterHandle}`
  return (
    <TwitterContainer
      $mt={twitterProps?.mt}
      $mr={twitterProps?.mr}
      $mb={twitterProps?.mb}
      $ml={twitterProps?.ml}
      {...rest}
    >
      <Link href={shareUrl} target="_blank">
        {icon}
      </Link>
    </TwitterContainer>
  )
}

export default TwitterShare
