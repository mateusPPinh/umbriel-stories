import { type ReactElement } from 'react'
import WhatsappShare from './Whatsapp'
import TwitterShare from './Twitter'
import LinkedinShare from './Linkedin'
import CopyArticle from './CopyArticle'
import { Container } from './share.styles'
import { type ShareProps } from './types'

const Share = ({
  whatsappPath,
  whatsappProps,
  whatsappIcon,
  containerProps,
  slug,
  editorialSlug,
  twitterPath,
  twitterProps,
  twitterIcon,
  linkedinIcon,
  linkedinPath,
  linkedinProps,
  clientSiteAddressUrl,
  articleTitle,
  clientTwitterHandle,
  copyArticleProps,
  copyIcon,
  onCopy,
  copyButtonChildren,
  isCopied,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  isLinkedinHovered,
  onLinkedinMouseEnter,
  onLinkedinMouseLeave,
  isWhatsappHovered,
  onWhatsappMouseEnter,
  onWhatsappMouseLeave,
  ...rest
}: ShareProps): ReactElement => {
  return (
    <Container
      $mt={containerProps?.mt}
      $mr={containerProps?.mr}
      $mb={containerProps?.mb}
      $ml={containerProps?.ml}
      $width={containerProps?.width}
      $maxWidth={containerProps?.maxWidth}
      $flexDirection={containerProps?.flexDirection}
      $justifyContent={containerProps?.justifyContent}
      $alignItems={containerProps?.alignItems}
      {...rest}
    >
      <WhatsappShare
        icon={whatsappIcon}
        pageUrl={whatsappPath ?? ''}
        whatsappProps={whatsappProps}
        slug={slug}
        editorialSlug={editorialSlug}
        articleTitle={articleTitle}
        clientSiteAddressUrl={clientSiteAddressUrl}
        isWhatsappHovered={isWhatsappHovered}
        onWhatsappMouseEnter={onWhatsappMouseEnter}
        onWhatsappMouseLeave={onWhatsappMouseLeave}
      />
      <TwitterShare
        icon={twitterIcon}
        pageUrl={twitterPath ?? ''}
        twitterProps={twitterProps}
        slug={slug}
        editorialSlug={editorialSlug}
        clientSiteAddressUrl={clientSiteAddressUrl}
        articleTitle={articleTitle}
        clientTwitterHandle={clientTwitterHandle}
        isHovered={isHovered}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
      <LinkedinShare
        icon={linkedinIcon}
        pageUrl={linkedinPath ?? ''}
        linkedinProps={linkedinProps}
        slug={slug}
        editorialSlug={editorialSlug}
        articleTitle={articleTitle}
        clientSiteAddressUrl={clientSiteAddressUrl}
        isLinkedinHovered={isLinkedinHovered}
        onLinkedinMouseEnter={onLinkedinMouseEnter}
        onLinkedinMouseLeave={onLinkedinMouseLeave}
      />
      <CopyArticle
        copyArticleProps={{ ...copyArticleProps?.copyArticleProps }}
        copyIcon={copyIcon}
        onCopy={onCopy}
        copyButtonChildren={copyButtonChildren}
        isCopied={isCopied}
      />
    </Container>
  )
}

export default Share
