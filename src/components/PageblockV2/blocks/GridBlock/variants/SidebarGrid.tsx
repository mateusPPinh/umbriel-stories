import React from 'react'
import { useBlockStyles } from '../../../hooks/useBlockStyles'
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
  clientGeneralSettingsData: ClientTheme;
}

const SidebarGrid: React.FC<BaseVariantProps> = ({
  variant,
  isDarkTheme,
  customStyles,
  clientGeneralSettingsData
}) => {
  const theme = useClientTheme({ clientGeneralSettingsData, isDarkTheme })
  const classes = defaultClasses.grid.sidebargrid
  const { articles } = variant.config
  const styles = variant.config.styles || {}

  return (
    <div className={`${classes.container} ${customStyles?.container || ''}`}>
      <div className={`${classes.wrapper} ${customStyles?.wrapper || ''}`}>
        {/* Main Content */}
        <div className={classes.mainContent}>
          {articles['col-0']?.map((article: Article) => {
            const articleUrl = generateArticleUrl(article)
            return (
              <div key={article.id} className={classes.article.main}>
                {article.content?.image?.desktop_image_path ? (
                  <img
                    src={article.content.image.desktop_image_path}
                    alt={article.title}
                    className={classes.image.main}
                  />
                ) : null}
                <div>
                  <Link
                    href={articleUrl}
                    aria-label={article.title}
                    className="hover:underline transition-all duration-300"
                  >
                    <h3 className={classes.content.main.title} style={{
                      color: theme.title.color,
                      fontFamily: theme.title.fontFamily,
                    }}>
                      {article.title}
                    </h3>
                  </Link>
                  {styles.showExcerpt ? (
                    <p className={classes.content.main.subtitle} style={{
                      color: theme.subtitle.color,
                      fontFamily: theme.subtitle.fontFamily,
                    }}>
                      {article.subtitle}
                    </p>
                  ) : (
                    <p className={classes.content.main.subtitle} style={{
                      color: theme.subtitle.color,
                      fontFamily: theme.subtitle.fontFamily,
                    }}>
                      {article.subtitle}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Sidebar */}
        <div className={classes.sidebar}>
          {articles['col-1']?.map((article: Article, index: number) => {
            const articleUrl = generateArticleUrl(article)
            return (
              <div
                key={article.id}
                className={[
                  classes.article.sidebar,
                  index !== articles['col-1'].length - 1
                    ? 'border-b border-gray-200 dark:border-gray-700 pb-4 mb-4'
                    : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {article.content?.image?.desktop_image_path ? (
                  <img
                    src={article.content.image.desktop_image_path}
                    alt={article.title}
                    className={classes.image.sidebar}
                  />
                ) : null}
                <div>
                  <Link
                    href={articleUrl}
                    aria-label={article.title}
                    className="hover:underline transition-all duration-300"
                  >
                    <h3 className={classes.content.sidebar.title} style={{
                      color: theme.title.color,
                      fontFamily: theme.title.fontFamily,
                    }}>
                      {article.title}
                    </h3>
                  </Link>
                  {styles.showExcerpt ? (
                    <p className={classes.content.sidebar.subtitle} style={{
                      color: theme.subtitle.color,
                      fontFamily: theme.subtitle.fontFamily,
                    }}>
                      {article.subtitle}
                    </p>
                  ) : (
                    <p className={classes.content.sidebar.subtitle} style={{
                      color: theme.subtitle.color,
                      fontFamily: theme.subtitle.fontFamily,
                    }}>
                      {article.subtitle}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SidebarGrid
