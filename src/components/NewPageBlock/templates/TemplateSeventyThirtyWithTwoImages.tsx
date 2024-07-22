import React from 'react'
import { styled } from 'styled-components'
import { type Article } from '../PageBlock.types'
import Link from '../../Link'

interface TemplateSeventyThirtyWithTwoImagesProps {
  articles: Article[]
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
  gap: 20px;
`

const TextColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const ImageRow = styled.div`
  display: flex;
  gap: 10px;
`

const ArticlePreview = styled.div`
  background-color: transparent;
  padding: 10px;
  border-radius: 8px;

  h2,
  p {
    font-family: 'Lora Variable';
  }

  h2 {
    font-weight: bold;
    line-height: 140%;
    font-size: 18px; // Ajustado para ser menor
  }

  p {
    font-size: 12px; // Ajustado para ser menor
    line-height: 140%;
    color: #5a5a5a;
  }
`

const Image = styled.img`
  width: 50%;
  border-radius: 8px;
  object-fit: cover;
  height: 100vh;
`

const TemplateSeventyThirtyWithTwoImages: React.FC<
  TemplateSeventyThirtyWithTwoImagesProps
> = ({ articles }) => {
  return (
    <Container>
      <TextColumn>
        <ArticlePreview>
          <Link
            href={`/${articles[0].editorial.slug}/${articles[0].slug}`}
            hover="hover:opacity-60"
          >
            <h2>{articles[0].title}</h2>
            <p>{articles[0].subtitle}</p>
          </Link>
        </ArticlePreview>
      </TextColumn>
      <ImageRow>
        {articles[0].content.image.desktop_image_path.length > 0 && (
          <Image
            src={articles[0].content.image.desktop_image_path}
            alt={articles[0].title}
          />
        )}
        {articles[1].content.image.desktop_image_path.length > 0 && (
          <Image
            src={articles[1].content.image.desktop_image_path}
            alt={articles[1].title}
          />
        )}
      </ImageRow>
    </Container>
  )
}

export default TemplateSeventyThirtyWithTwoImages
