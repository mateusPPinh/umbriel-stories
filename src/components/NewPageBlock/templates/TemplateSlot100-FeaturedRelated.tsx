import React from 'react'
import styled from 'styled-components'
import { type Article, type BlockConfig } from '../PageBlock.types'
import Link from '../../Link'

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

const Container = styled.div<
  Pick<
    TemplateSlot100FeaturedRelatedProps,
    'templateSlot100FeaturedRelatedProps'
  >
>`
  max-width: 1232px;
  min-height: 300px;
  margin: 0 auto;
  padding: 20px;
  background-color: ${(props) =>
    props.templateSlot100FeaturedRelatedProps.bgColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: ${(props) =>
    props.templateSlot100FeaturedRelatedProps.blockBorderRadius};

  @media (max-width: 768px) {
    padding: 10px;
  }
`

const Title = styled.h2`
  font-family: 'Lora Variable';
  font-weight: bold;
  font-size: 28px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 10px;
  }
`

const Subject = styled.div<
  Pick<
    TemplateSlot100FeaturedRelatedProps,
    'templateSlot100FeaturedRelatedProps'
  >
>`
  color: ${(props) =>
    props.templateSlot100FeaturedRelatedProps.blockSubjectColor};
  font-size: 16px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 8px;
  }
`

const ArticleTitle = styled.h3<
  Pick<
    TemplateSlot100FeaturedRelatedProps,
    'templateSlot100FeaturedRelatedProps'
  >
>`
  font-family: 'Lora Variable';
  font-weight: bold;
  font-size: 24px;
  color: ${(props) =>
    props.templateSlot100FeaturedRelatedProps.articleTitleColor};

  @media (max-width: 768px) {
    font-size: 20px;
  }
`

const TemplateSlot100FeaturedRelated: React.FC<
  TemplateSlot100FeaturedRelatedProps
> = ({ articles, blockTitle, templateSlot100FeaturedRelatedProps }) => {
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
