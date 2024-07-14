import React from 'react'
import styled from 'styled-components'
import { type Article } from '../PageBlock.types'

interface TemplateMainWithSidebarProps {
  articles: Article[]
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 30% 40% 30%;
  gap: 20px;
  max-width: 1200px;
  margin: auto;
`

const MainColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const CenterColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`

const SidebarColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const ArticlePreview = styled.div`
  background-color: transparent;
  padding: 10px;
  border-bottom: 1px solid #ddd;

  h2,
  p {
    font-family: ${(props) => props.theme.fonts.mvpFont};
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
  height: auto;
  border-radius: 8px;
  object-fit: cover;
`

const TemplateMainWithSidebar: React.FC<TemplateMainWithSidebarProps> = ({ articles }) => {
  return (
    <Container>
      <MainColumn>
        {articles.slice(0, 4).map((article, index) => (
          <ArticlePreview key={index}>
            <h2>{article.title}</h2>
            <p>{article.subtitle}</p>
          </ArticlePreview>
        ))}
      </MainColumn>
      <CenterColumn>
        {articles[0].content.image.desktop_image_path.length > 0 && (
          <Image src={articles[0].content.image.desktop_image_path} alt={articles[0].title} />
        )}
        <ArticlePreview>
          <h2>{articles[4].title}</h2>
          <p>{articles[4].subtitle}</p>
        </ArticlePreview>
      </CenterColumn>
      <SidebarColumn>
        {articles.slice(5).map((article, index) => (
          <ArticlePreview key={index}>
            <h2>{article.title}</h2>
            <p>{article.subtitle}</p>
          </ArticlePreview>
        ))}
      </SidebarColumn>
    </Container>
  )
}

export default TemplateMainWithSidebar
