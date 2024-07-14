import React from 'react'
import {
  ArticlePreview,
  Caption,
  Column,
  Container,
  Divider,
  DividerVertical,
  Image,
  ImageArea,
  VerticalDividerWrapper,
  ArticleTextArea,
  Description,
  Title
} from './styles/TemplateFeatured.styles'
import { type Article, type BlockConfig } from '../PageBlock.types'

interface TemplateFeaturedProps {
  articles: Article[]
  config: BlockConfig
}

const TemplateFeatured: React.FC<TemplateFeaturedProps> = ({ articles }) => {
  return (
    <Container>
      <ImageArea>
        {(articles[0].content.image.desktop_image_path.length > 0) && (
          <Image src={articles[0].content.image.desktop_image_path} alt={articles[0].title} />
        )}
      </ImageArea>
      <Caption>The captions here.</Caption>
      <ArticleTextArea>
        <Title>
          <h2>{articles[0].title}</h2>
        </Title>
        <Description>
          <p>{articles[0].subtitle}</p>
        </Description>
      </ArticleTextArea>
      <Divider />
      <VerticalDividerWrapper>
        <Column gridArea="col1">
          <ArticlePreview>
            <h2>{articles[1].title}</h2>
            <p>{articles[1].subtitle}</p>
            {(articles[1].content.image.desktop_image_path.length > 0) && (
              <Image src={articles[1].content.image.desktop_image_path} alt={articles[1].title} />
            )}
          </ArticlePreview>
        </Column>
        <DividerVertical />
        <Column gridArea="col2">
          <ArticlePreview>
            <h2>{articles[2].title}</h2>
            <p>{articles[2].subtitle}</p>
            {(articles[2].content.image.desktop_image_path.length > 0) && (
              <Image src={articles[2].content.image.desktop_image_path} alt={articles[2].title} />
            )}
          </ArticlePreview>
        </Column>
      </VerticalDividerWrapper>
    </Container>
  )
}

export default TemplateFeatured
