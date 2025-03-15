import React from 'react'
import { BlockVariant, Article, GridStyles, ClientTheme } from '../../../types'
import { defaultClasses } from '../../../constants/defaultClasses'
import { generateArticleUrl } from '../../../utils/generateArticleUrl'
import Link from '../../../../Link'
import { useClientTheme } from '../../../hooks/useClientTheme'

interface BaseVariantProps {
  variant: BlockVariant & {
    config: {
      styles: GridStyles
    }
  }
  isDarkTheme?: boolean
  customStyles?: any
  clientGeneralSettingsData: ClientTheme
}

const Newspaper: React.FC<BaseVariantProps> = ({
  variant,
  isDarkTheme,
  customStyles,
  clientGeneralSettingsData
}) => {
  const theme = useClientTheme({ clientGeneralSettingsData, isDarkTheme })
  const classes = defaultClasses.mixed.newspaper || { container: '' }
  const { articles } = variant.config
  const styles = variant.config.styles || {}
  const mainArticle = articles['col-0']?.[0]
  const secondaryArticles = articles['col-1'] || []
  const tertiaryArticles = articles['col-2'] || []

  return (
    <div className={`${classes.container}`}>
      <div className={classes?.grid || 'grid grid-cols-1 lg:grid-cols-12 gap-6'}>
        {/* Main Article */}
        {mainArticle && (
          <article className={classes?.mainArticle || 'lg:col-span-6'}>
            {mainArticle.content?.image?.desktop_image_path && (
              <div className={classes?.imageWrapper || 'relative w-full overflow-hidden mb-4'}>
                <img
                  src={mainArticle.content?.image?.desktop_image_path}
                  alt={mainArticle.title}
                  className={classes?.image || 'w-full h-full object-cover'}
                />
              </div>
            )}

            <div className={classes?.content || 'p-4'}>
              <Link href={generateArticleUrl(mainArticle)} className="hover:underline transition-all duration-300">
                <h2 
                  className={classes?.heading || 'mb-3'}
                  style={{
                    fontFamily: theme.title.fontFamily,
                    color: theme.title.color,
fontSize: theme?.fontSize?.pageblockTitle,

                  }}
                >
                  {mainArticle.title}
                </h2>
              </Link>

              {styles.showExcerpt && mainArticle.subtitle && (
                <p 
                  className={classes?.subtitle || ''}
                  style={{
                    fontFamily: theme.subtitle.fontFamily,
                    color: theme.subtitle.color,
fontSize: theme?.fontSize?.pageblockSubtitle,

                  }}
                >
                  {mainArticle.subtitle}
                </p>
              )}
            </div>
          </article>
        )}

        {/* Secondary Articles */}
        <div className={classes?.secondaryArticles || 'lg:col-span-3'}>
          {secondaryArticles.map((article: Article) => (
            <article key={article.id} className={classes?.secondaryArticle || 'mb-6 last:mb-0'}>
              {article.content?.image?.desktop_image_path && (
                <div className={classes?.imageWrapper || 'relative w-full overflow-hidden mb-4'}>
                  <img
                    src={article.content.image.desktop_image_path}
                    alt={article.title}
                    className={classes?.image || 'w-full h-full object-cover'}
                  />
                </div>
              )}

              <div className={classes?.content || 'p-4'}>
                <Link href={generateArticleUrl(article)} className="hover:underline transition-all duration-300">
                  <h3 
                    className={classes?.heading || 'mb-3'}
                    style={{
                      fontFamily: theme.title.fontFamily,
                      color: theme.title.color,
fontSize: theme?.fontSize?.pageblockTitle,

                    }}
                  >
                    {article.title}
                  </h3>
                </Link>

                {styles.showExcerpt && article.subtitle && (
                  <p 
                    className={classes?.subtitle || ''}
                    style={{
                      fontFamily: theme.subtitle.fontFamily,
                      color: theme.subtitle.color,
fontSize: theme?.fontSize?.pageblockSubtitle,

                    }}
                  >
                    {article.subtitle}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Tertiary Articles */}
        <div className={classes?.tertiaryArticles || 'lg:col-span-3'}>
          {tertiaryArticles.map((article: Article) => (
            <article key={article.id} className={classes?.tertiaryArticle || 'mb-6 last:mb-0'}>
              {article.content?.image?.desktop_image_path && (
                <div className={classes?.imageWrapper || 'relative w-full overflow-hidden mb-4'}>
                  <img
                    src={article.content?.image?.desktop_image_path}
                    alt={article.title}
                    className={classes?.image || 'w-full h-full object-cover'}
                  />
                </div>
              )}

              <div className={classes?.content || 'p-4'}>
                <Link href={generateArticleUrl(article)} className="hover:underline transition-all duration-300">
                  <h3 
                    className={classes?.heading || 'mb-3'}
                    style={{
                      fontFamily: theme.title.fontFamily,
                      color: theme.title.color,
fontSize: theme?.fontSize?.pageblockTitle,

                    }}
                  >
                    {article.title}
                  </h3>
                </Link>

                {styles.showExcerpt && article.subtitle && (
                  <p 
                    className={classes?.subtitle || ''}
                    style={{
                      fontFamily: theme.subtitle.fontFamily,
                      color: theme.subtitle.color,
fontSize: theme?.fontSize?.pageblockSubtitle,

                    }}
                  >
                    {article.subtitle}
                  </p>
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
