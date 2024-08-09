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

import CarouselArrowLeft from '../../../../public/icons/CarouselArrowLeft'
import CarouselArrowRight from '../../../../public/icons/CarouselArrowRight'

interface TemplateSeventyThirtyWithCarouselProps {
  articles: Article[]
  config: BlockConfig
  shouldRenderBorderBottom?: boolean
}

const TemplateSeventyThirtyWithCarousel: React.FC<
  TemplateSeventyThirtyWithCarouselProps
> = ({ articles, config, shouldRenderBorderBottom = true }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0)

  const nextSlide = () => {
    if (currentSlide < articles.slice(0, 3).length - 1) {
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
      <Container>
        <LeftSection>
          <Carousel>
            <div
              className="carousel-inner"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {articles.slice(0, 3).map((article, index) => (
                <div className="carousel-item" key={index}>
                  <img
                    src={article.content.image.desktop_image_path}
                    srcSet={`${article.content.image.desktop_image_path}?width=480 480w,
                            ${article.content.image.desktop_image_path}?width=768 768w,
                            ${article.content.image.desktop_image_path}?width=1024 1024w`}
                    sizes="(max-width: 768px) 480px,
                          (max-width: 1024px) 768px,
                          1024px"
                    alt={article.title}
                    loading="eager"
                  />
                  <Overlay>
                    <TextOverlay>
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
            <CarrouselControlls>
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
                disabled={currentSlide === articles.slice(0, 3).length - 1}
                variant="transparent"
              >
                <CarouselArrowRight />
              </Button>
            </CarrouselControlls>
          </Carousel>
        </LeftSection>
        <RightSection>
          <VideoBlock>
            <video controls>
              <source src="video-source.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="video__border_bottom" />
          </VideoBlock>
          <ArticleContainer>
            {articles.slice(3, 5).map((article, index) => (
              <ArticleBlock key={index}>
                <img
                  src={article.content.image.desktop_image_path}
                  srcSet={`${article.content.image.desktop_image_path}?width=480 480w,
                          ${article.content.image.desktop_image_path}?width=768 768w,
                          ${article.content.image.desktop_image_path}?width=1024 1024w`}
                  sizes="(max-width: 768px) 480px,
                        (max-width: 1024px) 768px,
                        1024px"
                  alt={article.title}
                  loading="eager"
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
          {articles[5] && (
            <BottomBlock>
              <div className="text-content">
                <Link
                  href={`/${articles[5].editorial.slug}/${articles[5].slug}`}
                  hover="hover:opacity-70"
                >
                  <h3>{articles[5].title}</h3>
                </Link>
                <p>{articles[5].subtitle}</p>
              </div>
              <img
                src={articles[5].content.image.desktop_image_path}
                srcSet={`${articles[5].content.image.desktop_image_path}?width=480 480w,
                        ${articles[5].content.image.desktop_image_path}?width=768 768w,
                        ${articles[5].content.image.desktop_image_path}?width=1024 1024w`}
                sizes="(max-width: 768px) 480px,
                      (max-width: 1024px) 768px,
                      1024px"
                alt={articles[5].title}
                loading="eager"
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
