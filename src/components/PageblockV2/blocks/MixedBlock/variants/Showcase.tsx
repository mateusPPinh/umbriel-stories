import React from 'react'
import { BlockVariant, Article, GridStyles } from '../../../types'
import { defaultClasses } from '../../../constants/defaultClasses'
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

const Showcase: React.FC<BaseVariantProps> = ({
  variant,
  isDarkTheme,
  customStyles,
  
}) => {
  const classes = defaultClasses.mixed.showcase
  const { articles } = variant.config
  const styles = variant.config.styles || {}

  const featuredArticle = articles['col-0']?.[0]
  const gridArticles = articles['col-1'] || []
  const listArticles = articles['col-2'] || []

  return (
    <div className={`${classes.container} ${customStyles?.container || ''}`}>
      <div className={customStyles?.grid || classes.grid}>
        {/* Featured Article */}
        <div className={customStyles?.featuredColumn || classes.featuredColumn}>
          {featuredArticle && (
            <article
              className={customStyles?.article || classes.article.featured}
            >
              {featuredArticle.content?.image?.desktop_image_path && (
                <div
                  className={customStyles?.imageWrapper || classes.imageWrapper}
                >
                  <img
                    src={featuredArticle.content.image.desktop_image_path}
                    alt={featuredArticle.title}
                    className={customStyles?.image || classes.image}
                  />
                </div>
              )}

              <div
                className={customStyles?.content || classes.content.featured}
              >
                <Link
                  href={generateArticleUrl( featuredArticle)}
                  className="hover:underline transition-all duration-300"
                >
                  <h1
                    className={
                      customStyles?.heading || classes.heading.featured
                    }
                  >
                    {featuredArticle.title}
                  </h1>
                </Link>

                {styles.showExcerpt ? (
                  <p
                    className={
                      customStyles?.subtitle || classes.subtitle.featured
                    }
                  >
                    {featuredArticle.subtitle}
                  </p>
                ) : (
                  <p
                    className={
                      customStyles?.subtitle || classes.subtitle.featured
                    }
                  >
                    {featuredArticle.subtitle}
                  </p>
                )}
              </div>
            </article>
          )}
        </div>

        {/* Grid Articles */}
        <div className={customStyles?.gridColumn || classes.gridColumn}>
          <div className={customStyles?.gridLayout || 'grid grid-cols-1 gap-6'}>
            {gridArticles.map((article: Article) => (
              <article
                key={article.id}
                className={customStyles?.gridArticle || classes.article.grid}
              >
                {article.content?.image?.desktop_image_path && (
                  <div
                    className={
                      customStyles?.imageWrapper || classes.imageWrapper
                    }
                  >
                    <img
                      src={article.content.image.desktop_image_path}
                      alt={article.title}
                      className={customStyles?.image || classes.image}
                    />
                  </div>
                )}

                <div className={customStyles?.content || classes.content.grid}>
                  <Link
                    href={generateArticleUrl(article)}
                    className="hover:underline transition-all duration-300"
                  >
                    <h2
                      className={customStyles?.heading || classes.heading.grid}
                    >
                      {article.title}
                    </h2>
                  </Link>

                  {styles.showExcerpt ? (
                    <p
                      className={
                        customStyles?.subtitle || classes.subtitle.grid
                      }
                    >
                      {article.subtitle}
                    </p>
                  ) : (
                    <p
                      className={
                        customStyles?.subtitle || classes.subtitle.grid
                      }
                    >
                      {article.subtitle}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* List Articles */}
        <div className={customStyles?.listColumn || classes.listColumn}>
          <div className={customStyles?.listLayout || 'space-y-6'}>
            {listArticles.map((article: Article) => (
              <article
                key={article.id}
                className={customStyles?.listArticle || classes.article.list}
              >
                <Link
                  href={generateArticleUrl(article)}
                  className="hover:underline transition-all duration-300"
                >
                  <h3 className={customStyles?.heading || classes.heading.list}>
                    {article.title}
                  </h3>
                </Link>

                {styles.showExcerpt ? (
                  <p
                    className={customStyles?.subtitle || classes.subtitle.list}
                  >
                    {article.subtitle}
                  </p>
                ) : (
                  <p
                    className={customStyles?.subtitle || classes.subtitle.list}
                  >
                    {article.subtitle}
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Showcase
