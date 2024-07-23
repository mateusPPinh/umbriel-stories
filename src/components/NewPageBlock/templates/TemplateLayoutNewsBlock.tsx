'use client'

import React from 'react'
import styled from 'styled-components'
import { type Article } from '../PageBlock.types'
import Link from '../../Link'

interface LayoutNewsBlockProps {
  articles: Article[]
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1200px;
  margin: auto;
`

const BlockTitle = styled.h2`
  font-size: 13px;
  line-height: 140%;
  margin-bottom: -1rem;
  margin-left: 0.8rem;
  font-weight: bold;
  font-family: 'Inter Variable';
  color: #121212;
  cursor: pointer;

  @media (min-width: 768px) {
    cursor: default;
  }
`

const ArticleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  justify-content: center;

  @media (min-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
  }
`

const ArticlePreview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 10px;
  max-width: 215px;

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
  height: auto;
  border-radius: 8px;
  object-fit: cover;
`

const LinksList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;

  li {
    margin-bottom: 10px;
  }

  a {
    font-family: 'Lora Variable';
    margin-top: -3px;
    transition: color 0.6s ease 0s;
    color: rgb(18, 18, 18);
    font-size: 0.875rem;
    line-height: 1.125rem;
    font-weight: 200;
    letter-spacing: 0.2px;

    &:hover {
      text-decoration: underline;
    }
  }
`

const TemplateLayoutNewsBlock: React.FC<LayoutNewsBlockProps> = ({
  articles,
}) => {
  const isValidArticle = (article: Article) =>
    article &&
    article.content &&
    article.content.image &&
    article.content.image.desktop_image_path

  return (
    <>
      <div className="borderTop" />
      <div className="borderBottom" />
      <Container>
        <BlockTitle>NEWS</BlockTitle>
        <ArticleGrid>
          {articles.filter(isValidArticle).map((article, index) => (
            <ArticlePreview key={index}>
              {article.content.image.desktop_image_path.length > 0 && (
                <Image
                  src={article.content.image.desktop_image_path}
                  alt={article.title}
                />
              )}
              <LinksList>
                {article.links?.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.url}>{link.title}</Link>
                  </li>
                ))}
              </LinksList>
            </ArticlePreview>
          ))}
        </ArticleGrid>
      </Container>
    </>
  )
}

export default TemplateLayoutNewsBlock
