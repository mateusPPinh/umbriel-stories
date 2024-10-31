import { type ReactElement } from 'react'

interface ArticleBodyProps {
  articleBodyCustomCss: string
  blocks?: Array<{
    html: string
    id: string
    type: string
  }>
}

const ArticleBody = ({
  articleBodyCustomCss,
  blocks,
}: ArticleBodyProps): ReactElement => {
  const articleBodyContent = blocks?.map((block) => block.html).join('')
  return (
    <div
      className={articleBodyCustomCss}
      dangerouslySetInnerHTML={{ __html: articleBodyContent ?? '' }}
    />
  )
}

export default ArticleBody
