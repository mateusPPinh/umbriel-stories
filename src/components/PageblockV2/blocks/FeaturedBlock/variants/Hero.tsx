import React from 'react'
import { BlockVariant, Article, ClientTheme } from '../../../types'
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

const Hero: React.FC<BaseVariantProps> = ({
  variant,
  isDarkTheme,
  customStyles,
  clientGeneralSettingsData
}) => {
  const theme = useClientTheme({ clientGeneralSettingsData, isDarkTheme })
  const classes = defaultClasses.featured.hero
  const { articles } = variant.config
  const styles = variant.config.styles || {}


  return (
    <div className={`${classes.container} ${customStyles?.container || ''}`}>
      <div className={`${classes.grid} ${customStyles?.grid || ''}`}>
        {Object.entries(articles).map(([colKey, colArticles]) =>
          colArticles.map((article: Article) => {
            const articleUrl = generateArticleUrl(article)
            return (
              <div key={article.id} className={classes.article}>
                {article.content?.image?.desktop_image_path && (
                  <div className="relative aspect-[21/9] rounded-lg overflow-hidden">
                    <img
                      src={article.content.image.desktop_image_path}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  </div>
                )}

                <div
                  className={`${
                    article.content?.image
                      ? 'absolute bottom-0 left-0 right-0'
                      : ''
                  } p-8`}
                >
                  <Link
                    href={articleUrl}
                    aria-label={article.title}
                    className="!hover:underline transition-all duration-300"
                  >
                    <h2 className={classes.heading} style={{
                      color: theme.title.color,
                      fontFamily: theme.title.fontFamily,
                    }}>{article.title}</h2>
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

export default Hero
