import React from 'react'
import { type Article, type BlockConfig } from '../PageBlock.types'
import {
  ArticlePreview,
  Column,
  Container,
  Description,
  Divider,
  Image,
  Title,
  VerticalDivider,
  TextContainer
} from './styles/Template5050.styles'

interface Template5050Props {
  articles: Article[]
  descriptions: string[]
  config: BlockConfig
  blockTitle?: string
  headingsProps?: {
    fontSize: string | number
    fontWeight: string | number
    transform: string
  }
}

const Template5050: React.FC<Template5050Props> = ({
  articles,
  descriptions,
  blockTitle,
  headingsProps = { fontSize: '15px', fontWeight: 'bold', transform: 'none' }
}) => {
  return (
    <Container>
      <Column gridArea="col1">
        <ArticlePreview>
          <TextContainer>
          <Title style={{ fontSize: headingsProps.fontSize, fontWeight: headingsProps.fontWeight, transform: headingsProps.transform }}>
            <h2>{blockTitle}</h2>
          </Title>
            <Description>
              <p className='paragraph'>{descriptions[0]}</p>
            </Description>
            <h2 style={{ fontSize: headingsProps.fontSize, fontWeight: headingsProps.fontWeight, transform: headingsProps.transform }}>{articles[0].title}</h2>
            <p>{articles[0].subtitle}</p>
          </TextContainer>
          {articles[0].content.image.desktop_image_path.length > 0 && (
            <Image
              src={articles[0].content.image.desktop_image_path}
              alt={articles[0].title}
            />
          )}
        </ArticlePreview>
      </Column>
      <VerticalDivider style={{ gridArea: 'divider1' }} />
      <Column gridArea="col2">
        <ArticlePreview>
          <TextContainer>
            <Description>
            <p className='paragraph'>{descriptions[1]}</p>
            </Description>
            <h2 style={{ fontSize: headingsProps.fontSize, fontWeight: headingsProps.fontWeight, transform: headingsProps.transform }}>{articles[1].title}</h2>
            <p>{articles[1].subtitle}</p>
          </TextContainer>
          {articles[1].content.image.desktop_image_path.length > 0 && (
            <Image
              src={articles[1].content.image.desktop_image_path}
              alt={articles[1].title}
            />
          )}
        </ArticlePreview>
      </Column>
      <Divider />
      <Column gridArea="col3">
        <ArticlePreview>
          <TextContainer>
            <Description>
            <p className='paragraph'>{descriptions[2]}</p>
            </Description>
            <h2 style={{ fontSize: headingsProps.fontSize, fontWeight: headingsProps.fontWeight, transform: headingsProps.transform }}>{articles[2].title}</h2>
            <p>{articles[2].subtitle}</p>
          </TextContainer>
          {articles[2].content.image.desktop_image_path.length > 0 && (
            <Image
              src={articles[2].content.image.desktop_image_path}
              alt={articles[2].title}
            />
          )}
        </ArticlePreview>
      </Column>
      <VerticalDivider style={{ gridArea: 'divider3' }} />
      <Column gridArea="col4">
        <ArticlePreview>
          <TextContainer>
            <Description>
            <p className='paragraph'>{descriptions[3]}</p>
            </Description>
            <h2 style={{ fontSize: headingsProps.fontSize, fontWeight: headingsProps.fontWeight, transform: headingsProps.transform }}>{articles[3].title}</h2>
            <p>{articles[3].subtitle}</p>
          </TextContainer>
          {articles[3].content.image.desktop_image_path.length > 0 && (
            <Image
              src={articles[3].content.image.desktop_image_path}
              alt={articles[3].title}
            />
          )}
        </ArticlePreview>
      </Column>
    </Container>
  )
}

export default Template5050
