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

const Showcase: React.FC<BaseVariantProps> = ({
  variant,
  isDarkTheme,
  customStyles,
  clientGeneralSettingsData
}) => {
  const theme = useClientTheme({ clientGeneralSettingsData, isDarkTheme })
  const classes = defaultClasses.mixed.showcase
  const { articles } = variant.config
  const styles = variant.config.styles || {}

  const featuredArticle = articles['col-0']?.[0]
  const gridArticles = articles['col-1'] || []
  const listArticles = articles['col-2'] || []

  return (
    <div className={`${classes.container} ${customStyles?.container || ''}`}>
      <div className={customStyles?.grid || 'grid grid-cols-1 lg:grid-cols-12 gap-6'}>
        {/* Featured Article */}
        <div className={customStyles?.featuredColumn || 'lg:col-span-6'}>
          {featuredArticle && (
            <article className={customStyles?.article || 'flex flex-col'}>
              {featuredArticle.content?.image?.desktop_image_path && (
                <div className={customStyles?.imageWrapper || 'relative w-full aspect-[16/9] overflow-hidden mb-4'}>
                  <img
                    src={featuredArticle.content.image.desktop_image_path}
                    alt={featuredArticle.title}
                    className={customStyles?.image || 'w-full h-full object-cover'}
                  />
                </div>
              )}

              <div className={customStyles?.content || 'p-4'}>
                <Link href={generateArticleUrl(featuredArticle)} className="hover:underline transition-all duration-300">
                  <h2 
                    className={customStyles?.heading || 'text-2xl font-bold mb-3'}
                    style={{
                      fontFamily: theme.title.fontFamily,
                      color: theme.title.color,
fontSize: theme?.fontSize?.pageblockTitle,

                    }}
                  >
                    {featuredArticle.title}
                  </h2>
                </Link>

                {styles.showExcerpt && featuredArticle.subtitle && (
                  <p 
                    className={customStyles?.subtitle || 'text-lg'}
                    style={{
                      fontFamily: theme.subtitle.fontFamily,
                      color: theme.subtitle.color,
fontSize: theme?.fontSize?.pageblockSubtitle,

                    }}
                  >
                    {featuredArticle.subtitle}
                  </p>
                )}
              </div>
            </article>
          )}
        </div>

        {/* Grid Articles */}
        <div className={customStyles?.gridColumn || 'lg:col-span-3'}>
          <div className={customStyles?.gridLayout || 'space-y-6'}>
            {gridArticles.map((article: Article) => (
              <article key={article.id} className={customStyles?.gridArticle || 'flex flex-col'}>
                {article.content?.image?.desktop_image_path && (
                  <div className={customStyles?.imageWrapper || 'relative w-full aspect-[4/3] overflow-hidden mb-4'}>
                    <img
                      src={article.content.image.desktop_image_path}
                      alt={article.title}
                      className={customStyles?.image || 'w-full h-full object-cover'}
                    />
                  </div>
                )}

                <div className={customStyles?.content || 'p-4'}>
                  <Link href={generateArticleUrl(article)} className="hover:underline transition-all duration-300">
                    <h3 
                      className={customStyles?.heading || 'text-xl font-semibold mb-2'}
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
                      className={customStyles?.subtitle || 'text-base'}
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

        {/* List Articles */}
        <div className={customStyles?.listColumn || 'lg:col-span-3'}>
          <div className={customStyles?.listLayout || 'space-y-6'}>
            {listArticles.map((article: Article) => (
              <article key={article.id} className={customStyles?.listArticle || 'flex flex-col'}>
                <Link href={generateArticleUrl(article)} className="hover:underline transition-all duration-300">
                  <h3 
                    className={customStyles?.heading || 'text-xl font-semibold mb-2'}
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
                    className={customStyles?.subtitle || 'text-base'}
                    style={{
                      fontFamily: theme.subtitle.fontFamily,
                      color: theme.subtitle.color,
fontSize: theme?.fontSize?.pageblockSubtitle,

                    }}
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
