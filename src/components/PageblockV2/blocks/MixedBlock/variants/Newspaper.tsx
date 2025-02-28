import React from 'react'
import { BlockVariant, Article, GridStyles } from '../../../types'
import { generateArticleUrl } from '../../../utils/generateArticleUrl'
import Link from '../../../../Link'
import { defaultClasses } from '../../../constants/defaultClasses'

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

const Newspaper: React.FC<BaseVariantProps> = ({ variant, isDarkTheme }) => {
  const classes = defaultClasses.mixed.newspaper || { container: '' }
  const { articles } = variant.config
  const styles = variant.config.styles || {}
  const mainArticle = articles['col-0']?.[0]
  const secondaryArticles = articles['col-1'] || []
  const tertiaryArticles = articles['col-2'] || []

  return (
    <div className={`${classes.container}`}>
      <div
        className={classes?.grid || 'grid grid-cols-1 lg:grid-cols-12 gap-6'}
      >
        {/* Main Article */}
        {mainArticle && (
          <article className={classes?.mainArticle || 'lg:col-span-6'}>
            {mainArticle.content?.image?.desktop_image_path && (
              <div
                className={
                  classes?.imageWrapper ||
                  'relative w-full overflow-hidden mb-4'
                }
              >
                <img
                  src={mainArticle.content?.image?.desktop_image_path}
                  alt={mainArticle.title}
                  className={classes?.image || 'w-full h-full object-cover'}
                />
              </div>
            )}

            <div className={classes?.content || 'p-4'}>
              <Link
                href={generateArticleUrl( mainArticle)}
                className="hover:underline transition-all duration-300"
              >
                <h2 className={classes?.heading || 'mb-3'}>
                  {mainArticle.title}
                </h2>
              </Link>

              {styles.showExcerpt ? (
                <p className={classes?.subtitle || ''}>
                  {mainArticle.subtitle}
                </p>
              ) : (
                <p className={classes?.subtitle || ''}>
                  {mainArticle.subtitle}
                </p>
              )}
            </div>
          </article>
        )}

        {/* Secondary Articles */}
        <div className={classes?.secondaryArticles || 'lg:col-span-3'}>
          {secondaryArticles.map((article: Article) => (
            <article
              key={article.id}
              className={classes?.secondaryArticle || 'mb-6 last:mb-0'}
            >
              {article.content?.image?.desktop_image_path && (
                <div
                  className={
                    classes?.imageWrapper ||
                    'relative w-full overflow-hidden mb-4'
                  }
                >
                  <img
                    src={article.content.image.desktop_image_path}
                    alt={article.title}
                    className={classes?.image || 'w-full h-full object-cover'}
                  />
                </div>
              )}

              <div className={classes?.content || 'p-4'}>
                <Link
                  href={generateArticleUrl(article)}
                  className="hover:underline transition-all duration-300"
                >
                  <h2 className={classes?.heading || 'mb-3'}>
                    {article.title}
                  </h2>
                </Link>

                {styles.showExcerpt ? (
                  <p className={classes?.subtitle || ''}>{article.subtitle}</p>
                ) : (
                  <p className={classes?.subtitle || ''}>{article.subtitle}</p>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Tertiary Articles */}
        <div className={classes?.tertiaryArticles || 'lg:col-span-3'}>
          {tertiaryArticles.map((article: Article) => (
            <article
              key={article.id}
              className={classes?.tertiaryArticle || 'mb-6 last:mb-0'}
            >
              {article.content?.image?.desktop_image_path && (
                <div
                  className={
                    classes?.imageWrapper ||
                    'relative w-full overflow-hidden mb-4'
                  }
                >
                  <img
                    src={article.content.image.desktop_image_path}
                    alt={article.title}
                    className={classes?.image || 'w-full h-full object-cover'}
                  />
                </div>
              )}

              <div className={classes?.content || 'p-4'}>
                <Link
                  href={generateArticleUrl(article)}
                  className="hover:underline transition-all duration-300"
                >
                  <h2 className={classes?.heading || 'mb-3'}>
                    {article.title}
                  </h2>
                </Link>

                {styles.showExcerpt ? (
                  <p className={classes?.subtitle || ''}>{article.subtitle}</p>
                ) : (
                  <p className={classes?.subtitle || ''}>{article.subtitle}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Newspaper
