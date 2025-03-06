import React from 'react'
import { BlockVariant, Article, ClientTheme      } from '../../../types'
import { defaultClasses } from '../../../constants/defaultClasses'
import { generateArticleUrl } from '../../../utils/generateArticleUrl'
import Link from '../../../../Link'
import { useClientTheme } from '../../../hooks/useClientTheme';

interface BaseVariantProps {
  variant: BlockVariant
  isDarkTheme?: boolean
  customStyles?: any
  clientGeneralSettingsData: ClientTheme
   
}

const Split: React.FC<BaseVariantProps> = ({
  variant,
  isDarkTheme,
  customStyles,
  clientGeneralSettingsData
}) => {
  const theme = useClientTheme({ clientGeneralSettingsData, isDarkTheme })
  const classes = defaultClasses.featured.split
  const { articles } = variant.config
  const styles = variant.config.styles || {}

  return (
    <div
      className={`${classes.container} ${customStyles?.container || ''}`}
    >
      <div className={`${classes.grid} ${customStyles?.grid || ''}`}>
        {Object.entries(articles).map(([colKey, colArticles]) =>
          colArticles.map((article: Article) => {
            const articleUrl = generateArticleUrl(article)
            return (
              <div
                key={article.id}
                className={`
                flex flex-col md:flex-row gap-6
                mb-8 last:mb-0
              `}
              >
                {article.content?.image?.desktop_image_path && (
                  <div className="w-full md:w-1/2">
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                      <img
                        src={article.content?.image?.desktop_image_path}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                <div
                  className={
                    article.content?.image ? 'w-full md:w-1/2' : 'w-full'
                  }
                >
                  <Link
                    href={articleUrl}
                    aria-label={article.title}
                    className="hover:underline transition-all duration-300"
                  >
                    <h3 className={classes.heading} style={{
                      color: theme.title.color,
                      fontFamily: theme.title.fontFamily,
                    }}>{article.title}</h3>
                  </Link>
                  {styles.showExcerpt ? (
                    <p className={classes.subtitle} style={{
                      color: theme.subtitle.color,
                      fontFamily: theme.subtitle.fontFamily,
                    }}>{article.subtitle}</p>
                  ) : (
                    <p className={classes.subtitle} style={{
                      color: theme.subtitle.color,
                      fontFamily: theme.subtitle.fontFamily,
                    }}>{article.subtitle}</p>
                  )}
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default Split
