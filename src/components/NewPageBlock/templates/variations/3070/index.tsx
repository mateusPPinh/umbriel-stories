import { Fragment, memo, type ReactElement } from 'react'
import { type Article } from '../../../PageBlock.types'
import {
  Container,
  ArticlePreview,
  Column,
  Image,
  SideColumn,
  LiveBadge,
  UpdatesContainer,
  Update,
  ArticleRow,
  ArticleRowContainer,
  Divider,
  MainContent
} from './styles'
import ShouldRenderXBorderBottomDivider from '../../../conditions/ShouldRenderXBorderBottomDivider'

interface T3070VariationProps {
  articles: Article[]
}

// eslint-disable-next-line react/display-name
const ArticleCard = memo(({ article }: { article: Article }) => (
  <ArticlePreview>
    {(article.isArticleLive ?? false) && <LiveBadge>LIVE 16m ago</LiveBadge>}
    <h2>{article.title}</h2>
    <p>{article.subtitle}</p>
    {(article.articleEstimatedReadTime != null) && (
      <span>{article.articleEstimatedReadTime} MIN READ</span>
    )}
  </ArticlePreview>
))

export default function T3070Variation ({
  articles
}: T3070VariationProps): ReactElement {
  const [firstArticle, secondArticle, ...restArticles] = articles
  return (
    <Container>
      <MainContent>
        <Column>
          <ArticleCard article={firstArticle} />
          <Divider />
          <ArticleCard article={secondArticle} />
          <UpdatesContainer>
            <span>See more updates</span>
            <Update>9+</Update>
          </UpdatesContainer>
        </Column>
        <SideColumn>
          <Image
            src={firstArticle.content.image.desktop_image_path}
            alt={firstArticle.title}
          />
          <div className="captions">The captions here.</div>
        </SideColumn>
      </MainContent>
      <div className="border-t bg-gray-300" />
      <ArticleRowContainer>
        {restArticles.slice(0, 3).map((article, i) => (
          <Fragment key={i}>
            <ArticleRow>
              {(article.isArticleLive ?? false)
                ? (
                <LiveBadge>LIVE 16m ago</LiveBadge>
                  )
                : (
                    (article.articleEstimatedReadTime != null) && (
                  <span>{article.articleEstimatedReadTime} MIN READ</span>
                    )
                  )}
              <h2>{article.title}</h2>
              {(article.articleEstimatedReadTime != null) && (
                <span>{article.articleEstimatedReadTime}</span>
              )}
            </ArticleRow>
          </Fragment>
        ))}
      </ArticleRowContainer>
      <ShouldRenderXBorderBottomDivider
        borderXBottomColor='#000'
      />
    </Container>
  )
}
