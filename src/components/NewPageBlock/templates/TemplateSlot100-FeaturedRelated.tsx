/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react'
import { type Article, type BlockConfig } from '../PageBlock.types'
import Link from '../../Link'
import {
  ArticleTitle,
  Container,
  Subject,
  Title,
} from './styles/TemplateSlot100FeaturedRelated.styles'

interface TemplateSlot100FeaturedRelatedProps {
  articles: Article[]
  config: BlockConfig
  blockTitle?: string
  templateSlot100FeaturedRelatedProps: {
    blockSubject: string
    bgColor: string
    blockSubjectColor: string
    articleTitleColor: string
    blockBorderRadius?: string
  }
}

const TemplateSlot100FeaturedRelated: React.FC<
  TemplateSlot100FeaturedRelatedProps
> = ({ articles, blockTitle, templateSlot100FeaturedRelatedProps }) => {
  if (!articles[0]?.editorial || !articles[0].slug) {
    console.error('Article editorial or slug is missing', articles[0])
    return null
  }

  return (
    <Container
      templateSlot100FeaturedRelatedProps={templateSlot100FeaturedRelatedProps}
    >
      {blockTitle != null && <Title>{blockTitle}</Title>}
      <Subject
        templateSlot100FeaturedRelatedProps={
          templateSlot100FeaturedRelatedProps
        }
      >
        {templateSlot100FeaturedRelatedProps.blockSubject}
      </Subject>
      <Link
        href={`/${articles[0].editorial.slug}/${articles[0].slug}`}
        hover="hover:opacity-60"
      >
        <ArticleTitle
          templateSlot100FeaturedRelatedProps={
            templateSlot100FeaturedRelatedProps
          }
        >
          {articles[0].title}
        </ArticleTitle>
      </Link>
    </Container>
  )
}

export default TemplateSlot100FeaturedRelated
