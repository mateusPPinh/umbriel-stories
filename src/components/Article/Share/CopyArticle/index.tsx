import { type ReactElement } from 'react'
import { Container } from './copy-article.styles'
import { type CopyArticleType } from './types'

const CopyArticle = ({
  copyIcon,
  onCopy,
  copyArticleProps,
  copyButtonChildren,
  isCopied,
  ...rest
}: CopyArticleType): ReactElement => {
  return (
    <Container
      $mt={copyArticleProps?.mt}
      $mr={copyArticleProps?.mr}
      $mb={copyArticleProps?.mb}
      $ml={copyArticleProps?.ml}
      {...rest}
    >
      <button onClick={onCopy} className="flex items-center justify-center">
        {copyButtonChildren && copyButtonChildren}
        {copyIcon}
      </button>
    </Container>
  )
}

export default CopyArticle
