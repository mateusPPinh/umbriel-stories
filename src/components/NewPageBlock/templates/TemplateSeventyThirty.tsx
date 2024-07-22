import React from 'react'
import { styled } from 'styled-components'
import { type Article } from '../PageBlock.types'
import Link from '../../Link'
interface TemplateSeventyThirtyProps {
  articles: Article[]
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  gap: 20px;
`

const TextColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const ImageColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
    font-size: 19px;
  }

  p {
    font-size: 13px;
    line-height: 140%;
    color: #5a5a5a;
  }
`

const Image = styled.img`
  width: 100%;
  border-radius: 8px;
`

const TemplateSeventyThirty: React.FC<TemplateSeventyThirtyProps> = ({
  articles,
}) => {
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
      <ImageColumn>
        {articles[0].content.image.desktop_image_path.length > 0 && (
          <Image
            src={articles[0].content.image.desktop_image_path}
            alt={articles[0].title}
          />
        )}
      </ImageColumn>
    </Container>
  )
}

export default TemplateSeventyThirty
