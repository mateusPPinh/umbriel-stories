import React from 'react'
import { styled } from 'styled-components'
import { type Article } from '../PageBlock.types'

interface TemplateImageRightProps {
  articles: Article[]
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

const ArticlePreview = styled.div`
  flex: 1;
`

const ImageWrapper = styled.div`
  width: 50%;
`

const TemplateImageRight: React.FC<TemplateImageRightProps> = ({ articles }) => {
  return (
    <Container>
      <ArticlePreview>
        <h2>{articles[0].title}</h2>
        <p>{articles[0].subtitle}</p>
      </ArticlePreview>
      <ImageWrapper>
        <img src={articles[0].content.image.desktop_image_path} alt={articles[0].title} />
      </ImageWrapper>
    </Container>
  )
}

export default TemplateImageRight
