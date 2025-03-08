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

const Masonry: React.FC<BaseVariantProps> = ({
  variant,
  isDarkTheme,
  customStyles,
  clientGeneralSettingsData
}) => {
  const theme = useClientTheme({ clientGeneralSettingsData, isDarkTheme })
  const classes = defaultClasses.mixed.masonry || { container: '' }
  const { articles } = variant.config
  const items = Object.values(articles).flat()
  const styles = variant.config.styles || {}

  const columnCount = variant.config.layout?.columns || 3
  const gap = variant.config.layout?.gap || '24px'

  // Construct the columns class based on configuration
  const columnsClass = `columns-1 md:columns-2 lg:columns-${columnCount}`
  const gapClass = `gap-x-[${gap}]`

  return (
    <div className={`${classes.container}`}>
      <div className={classes.masonryGrid || `${columnsClass} ${gapClass}`}>
        {items.map((article: Article) => {
          const articleUrl = generateArticleUrl(article)
          return (
            <article
              key={article.id}
              className={classes?.article || 'break-inside-avoid mb-6'}
            >
              {article.content?.image?.desktop_image_path && (
                <div
                  className={
                    classes.imageWrapper ||
                    'relative w-full overflow-hidden mb-4'
                  }
                >
                  <img
                    src={article.content?.image?.desktop_image_path}
                    alt={article.title}
                    className={classes.image || 'w-full h-full object-cover'}
                  />
                </div>
              )}

              <div className={classes.content || 'p-4'}>
                <Link
                  href={articleUrl}
                  aria-label={article.title}
                  className="hover:underline transition-all duration-300"
                >
                  <h2 
                    className={classes.heading || 'mb-3'}
                    style={{
                      fontFamily: theme.title.fontFamily,
                      color: theme.title.color,
fontSize: theme?.fontSize?.pageblockTitle,

                    }}
                  >
                    {article.title}
                  </h2>
                </Link>
                {styles.showExcerpt && article.subtitle && (
                  <p 
                    className={classes.subtitle || ''}
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
          )
        })}
      </div>
    </div>
  )
}

export default Masonry
