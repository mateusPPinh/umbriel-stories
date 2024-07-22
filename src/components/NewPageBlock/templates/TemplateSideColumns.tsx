/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { type ReactElement } from 'react'
import styled from 'styled-components'
import { type Article, type BlockConfig } from '../PageBlock.types'
import Link from '../../Link'

interface TemplateSideColumnsProps {
  config: BlockConfig
  articles: Article[]
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`

const Divider = styled.div`
  width: 100%;
  border-bottom: 1px solid #000;
`

const ArticleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`

const Author = styled.h2`
  font-size: 13px;
  color: #5a5a5a;
  font-family: 'mvpFont';
  text-transform: uppercase;
  line-height: 140%;
`

const Title = styled.h3`
  font-size: 19px;
  font-weight: bold;
  font-family: 'mvpFont';
  color: #121212;
  line-height: 120%;
`

const ArticleImage = styled.img`
  margin-top: 8px;
  width: 100%;
  object-fit: cover;
`

const ArticleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ArticleRowText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`

const ArticleRowImage = styled.img`
  margin-left: 8px;
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
`

const Footer = styled.div`
  display: flex;
  border-top: 1px solid #000;
  padding-top: 16px;
  margin-top: 4px;
`

const FooterColumn = styled.div`
  width: 50%;
  padding-right: 16px;

  &:last-child {
    padding-right: 0;
    padding-left: 16px;
    border-left: 1px solid #000;
  }
`

const FooterTitle = styled.h4`
  font-size: 13px;
  color: #5a5a5a;
  font-family: 'mvpFont';
  text-transform: uppercase;
  line-height: 140%;
`

const FooterContent = styled.p`
  font-size: 15px;
  font-weight: bold;
  font-family: 'mvpFont';
  color: #121212;
  line-height: 120%;
`

const TemplateSideColumns = ({
  articles,
}: TemplateSideColumnsProps): ReactElement => {
  const displayedArticles = articles.slice(0, 6)

  return (
    <Container>
      <Divider />
      {displayedArticles.map((article, index) => {
        if (index === 2) {
          return (
            <React.Fragment key={index}>
              <ArticleContainer>
                <Author>{article.author}</Author>
                <Link
                  href={`/${article.editorial.slug}/${article.slug}`}
                  hover="hover:opacity-60"
                >
                  <Title>{article.title}</Title>
                </Link>
                {Boolean(article.content.image) && (
                  <ArticleImage
                    src={article.content.image.desktop_image_path}
                    alt={article.title}
                  />
                )}
              </ArticleContainer>
              <Divider />
            </React.Fragment>
          )
        }

        if (index === 3 || index === 4) {
          return null
        }

        return (
          <React.Fragment key={index}>
            <ArticleRow>
              <ArticleRowText>
                <Author>{article.author}</Author>
                <Link
                  href={`/${article.editorial.slug}/${article.slug}`}
                  hover="hover:opacity-60"
                >
                  <Title>{article.title}</Title>
                </Link>
              </ArticleRowText>
              {Boolean(article.content.image) && (
                <ArticleRowImage
                  src={article.content.image.desktop_image_path}
                  alt={article.title}
                />
              )}
            </ArticleRow>
            {index < displayedArticles.length - 1 && index !== 2 && <Divider />}
          </React.Fragment>
        )
      })}
      <Footer>
        <FooterColumn>
          <FooterTitle>Letters from our readers</FooterTitle>
          <Link
            href={`/${displayedArticles[0]?.editorial.slug}/${displayedArticles[0]?.slug}`}
            hover="hover:opacity-60"
          >
            <FooterContent>
              {displayedArticles[0]?.title || 'Caring for Pet Companions'}
            </FooterContent>
          </Link>
        </FooterColumn>
        <FooterColumn>
          <FooterTitle>The Editorial</FooterTitle>
          <Link
            href={`/${displayedArticles[5]?.editorial.slug}/${displayedArticles[5]?.slug}`}
            hover="hover:opacity-60"
          >
            <FooterContent>
              {displayedArticles[5]?.title || 'Scientists found evidence.'}
            </FooterContent>
          </Link>
        </FooterColumn>
      </Footer>
      <Divider />
    </Container>
  )
}

export default TemplateSideColumns
