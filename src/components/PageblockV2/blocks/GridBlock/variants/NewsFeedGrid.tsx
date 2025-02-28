import React from 'react'
import { defaultClasses } from '../../../constants/defaultClasses'
import { BlockVariant, Article, GridStyles } from '../../../types'
import { generateArticleUrl } from '../../../utils/generateArticleUrl'
import Link from '../../../../Link'

interface BaseVariantProps {
  variant: BlockVariant & {
    config: {
      styles: GridStyles
    }
  }
  isDarkTheme?: boolean
  customStyles?: any
  ;
}

const NewsFeedGrid: React.FC<BaseVariantProps> = ({
  variant,
  isDarkTheme,
  customStyles,
  
}) => {
  const classes = defaultClasses.newsfeed
  const { articles } = variant.config
  const styles = variant.config.styles || {}

  // Garante que articles existe e é um objeto
  if (!articles || typeof articles !== 'object') {
    return null
  }

  const mainColumnArticles = articles['col-0'] || []
  const rightColumnArticles = articles['col-1'] || []
  const firstArticle = mainColumnArticles[0]

  return (
    <div className={`${classes.container} ${customStyles?.container || ''}`}>
      <div className={customStyles?.grid || classes.grid}>
        {/* Left Column - Articles */}
        <div className={classes.column.main}>
          {mainColumnArticles.map((article: Article) => {
            const articleUrl = generateArticleUrl(article)
            return (
              <article key={article.id} className={classes.article.main}>
                <div className={classes.content}>
                  <Link
                    href={articleUrl}
                    aria-label={article.title}
                    className="hover:underline transition-all duration-300"
                  >
                    <h3 className={classes.title}>{article.title}</h3>
                  </Link>
                  {article.subtitle && (
                    <p className={classes.subtitle}>{article.subtitle}</p>
                  )}
                  {/* <span className={classes.readTime}>
                  {article.readTime ? `${article.readTime} MIN READ` : '3 MIN READ'}
                </span> */}
                </div>
              </article>
            )
          })}
        </div>

        {/* Middle Column - Featured Image */}
        <div className={classes.column.image}>
          {firstArticle?.content?.image?.desktop_image_path && (
            <div className={classes.article.image}>
              <img
                src={firstArticle.content.image.desktop_image_path}
                alt={firstArticle.title}
                className={classes.article.imageContent}
              />
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className={customStyles?.rightColumn || classes.column.right}>
          {rightColumnArticles.map((article: Article) => {
            const articleUrl = generateArticleUrl(article)
            return (
              <article key={article.id} className={classes.article.main}>
                <div className={classes.content}>
                  <Link href={articleUrl} aria-label={article.title} className="hover:underline transition-all duration-300">
                    <h3 className={classes.title}>{article.title}</h3>
                  </Link>
                  {/* <span className={classes.readTime}>
                  {article.readTime ? `${article.readTime} MIN READ` : '3 MIN READ'}
                </span> */}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default NewsFeedGrid
