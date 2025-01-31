import React from 'react'
import {
  ArticleBlock,
  ArticleContainer,
  BottomBlock,
  Container,
  LeftSection,
  RightSection,
  VideoBlock,
  CarrouselControlls,
  Overlay,
  TextOverlay,
  Carousel,
} from './styles/TemplateSeventyThirtyWithCarousel.styles'
import { type Article, type BlockConfig } from '../PageBlock.types'
import truncate from 'lodash/truncate'
import Button from '../../Button'
import { Link } from '@umbriel/components'
import Video from '../../Player'

import CarouselArrowLeft from '../../../../public/icons/CarouselArrowLeft'
import CarouselArrowRight from '../../../../public/icons/CarouselArrowRight'

interface TemplateSeventyThirtyWithCarouselProps {
  articles: Article[]
  config: BlockConfig
  shouldRenderBorderBottom?: boolean
  articlesLayout: {
    carouselSlugs: string[]
    videoUrl: string
    bottomBlocksSlugs: string[]
    poster?: string
    isYoutube?: boolean
  }
  customTemplateSeventyThirtyWithCarouselSyles?: {
    customContainerStyle: string
    customTextOverlayStyles: string
    customCarouselControllsStyle: string
    customArticleContainerStyles: string
    customBottomBlockStyles: string
    customRightSectionStyles: string
  }
}

const TemplateSeventyThirtyWithCarousel: React.FC<
  TemplateSeventyThirtyWithCarouselProps
> = ({
  articles,
  config,
  shouldRenderBorderBottom = true,
  articlesLayout,
  customTemplateSeventyThirtyWithCarouselSyles,
}) => {
  const [currentSlide, setCurrentSlide] = React.useState(0)

  const carouselArticles = articlesLayout.carouselSlugs
    .map((slug) => articles.find((a) => a.slug === slug))
    .filter(Boolean) as Article[]

  const bottomArticles = articlesLayout.bottomBlocksSlugs
    .map((slug) => articles.find((a) => a.slug === slug))
    .filter(Boolean) as Article[]

  // Controles do carrossel
  const nextSlide = () => {
    if (currentSlide < carouselArticles.length - 1) {
      setCurrentSlide((prev) => prev + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1)
    }
  }

  const truncateTitle = (title: string) => {
    return truncate(title, { length: 80, omission: '...' })
  }
  return (
    <>
      <Container
        className={
          customTemplateSeventyThirtyWithCarouselSyles?.customContainerStyle
        }
      >
        <LeftSection>
          <Carousel>
            <div
              className="carousel-inner"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {carouselArticles.map((article, index) => (
                <div className="carousel-item" key={index}>
                  <img
                    src={article.content.image.desktop_image_path}
                    alt={article.title}
                    loading="lazy"
                    decoding="async"
                  />
                  <Overlay>
                    <TextOverlay
                      className={
                        customTemplateSeventyThirtyWithCarouselSyles?.customTextOverlayStyles
                      }
                    >
                      <Link
                        href={`/${article.editorial.slug}/${article.slug}`}
                        hover="hover:opacity-70"
                      >
                        <h2>{truncateTitle(article.title)}</h2>
                      </Link>
                      <p>{article.subtitle}</p>
                    </TextOverlay>
                  </Overlay>
                </div>
              ))}
            </div>
            <CarrouselControlls
              className={
                customTemplateSeventyThirtyWithCarouselSyles?.customCarouselControllsStyle
              }
            >
              <Button
                className="ml-[20px] hover:opacity-70 hover:transition-opacity"
                onClick={prevSlide}
                disabled={currentSlide === 0}
                variant="transparent"
              >
                <CarouselArrowLeft />
              </Button>
              <Button
                className="mr-[20px] hover:opacity-70 hover:transition-opacity"
                onClick={nextSlide}
                disabled={currentSlide === carouselArticles.length - 1}
                variant="transparent"
              >
                <CarouselArrowRight />
              </Button>
            </CarrouselControlls>
          </Carousel>
        </LeftSection>
        <RightSection
          className={
            customTemplateSeventyThirtyWithCarouselSyles?.customRightSectionStyles
          }
        >
          <VideoBlock>
            <Video
              source={articlesLayout.videoUrl}
              poster={articlesLayout.poster}
              isYoutube={articlesLayout.isYoutube}
            />
            <div className="video__border_bottom" />
          </VideoBlock>
          <ArticleContainer
            className={
              customTemplateSeventyThirtyWithCarouselSyles?.customArticleContainerStyles
            }
          >
            {bottomArticles.slice(0, 2).map((article, index) => (
              <ArticleBlock key={index}>
                <img
                  src={article.content.image.desktop_image_path}
                  alt={article.title}
                  loading="lazy"
                  decoding="async"
                />
                <div className="text-content">
                  <Link
                    href={`/${article.editorial.slug}/${article.slug}`}
                    hover="hover:opacity-70"
                  >
                    <h3>{article.title}</h3>
                  </Link>
                </div>
              </ArticleBlock>
            ))}
          </ArticleContainer>
          <div className="articleContainer__border_bottom" />
          {bottomArticles[2] && (
            <BottomBlock
              className={
                customTemplateSeventyThirtyWithCarouselSyles?.customBottomBlockStyles
              }
            >
              <div className="text-content">
                <Link
                  href={`/${bottomArticles[2].editorial.slug}/${bottomArticles[2].slug}`}
                  hover="hover:opacity-70"
                >
                  <h3>{bottomArticles[2].title}</h3>
                </Link>
                <p>{bottomArticles[2].subtitle}</p>
              </div>
              <img
                src={bottomArticles[2].content.image.desktop_image_path}
                alt={bottomArticles[2].title}
                loading="lazy"
                decoding="async"
              />
            </BottomBlock>
          )}
        </RightSection>
      </Container>

      {shouldRenderBorderBottom && (
        <div className="border-b b-[#DFDFDF] my-4" />
      )}
    </>
  )
}

export default TemplateSeventyThirtyWithCarousel
