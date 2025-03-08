import React from 'react'
import { Article } from '../../PageblockV2/types'
import { BlockConfig } from './StyleConfigModal'
import { DisplayConfig } from './StyleConfigModal/MediaConfig'
import SwitchTitleSubtitleSkeleton from './TitleSubtitleSkeleton'
import { useClientTheme } from '../hooks/useClientTheme'
import { ClientTheme } from '../types'

type LayoutVariant =
  | 'sidebar'
  | 'showcase'
  | 'newspaper'
  | 'magazine'
  | 'videogrid'

interface MixedLayoutPreviewProps {
  variant: LayoutVariant
  isDarkTheme?: boolean
  columns: { [key: string]: Article[] }
  blockConfig: BlockConfig
  clientGeneralSettingsData: ClientTheme
}

const MixedLayoutPreview: React.FC<MixedLayoutPreviewProps> = ({
  variant,
  isDarkTheme,
  columns,
  blockConfig,
  clientGeneralSettingsData
}) => {
  const theme = useClientTheme({ clientGeneralSettingsData, isDarkTheme })

  // Configurações globais de exibição
  const globalDisplayConfig = blockConfig.mediaConfig?.displayConfig || {
    showImage: true,
    showSubtitle: true,
    showPublishDate: true,
    showAuthor: false,
    showCategory: false,
  }

  // Função para obter configurações específicas de uma coluna
  const getColumnDisplayConfig = (columnId: string): DisplayConfig => {
    const columnConfig = globalDisplayConfig.columnConfig?.[columnId]

    if (!columnConfig) {
      return globalDisplayConfig
    }

    return {
      showImage: columnConfig.showImage ?? globalDisplayConfig.showImage,
      showSubtitle:
        columnConfig.showSubtitle ?? globalDisplayConfig.showSubtitle,
      showPublishDate:
        columnConfig.showPublishDate ?? globalDisplayConfig.showPublishDate,
      showAuthor: columnConfig.showAuthor ?? globalDisplayConfig.showAuthor,
      showCategory:
        columnConfig.showCategory ?? globalDisplayConfig.showCategory,
    }
  }

  const renderSidebarPreview = () => {
    const mainArticle = columns['col-0']?.[0]
    const sidebarArticles = columns['col-1'] || []

    // Configurações específicas para cada coluna
    const mainDisplayConfig = getColumnDisplayConfig('col-0')
    const sidebarDisplayConfig = getColumnDisplayConfig('col-1')

    return (
      <div className="grid grid-cols-[2fr,1fr] gap-6">
        {/* Main Content */}
        <div className="space-y-4">
          {/* Featured Article */}
          <article className="flex flex-col">
            {mainDisplayConfig.showImage && (
              <div
                className={`
                aspect-[16/9] rounded overflow-hidden
              ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}
            `}
              >
                {mainArticle?.content?.image?.desktop_image_path && (
                  <div className="relative w-full h-full">
                    <img
                      src={mainArticle.content.image.desktop_image_path}
                      alt={mainArticle.title}
                      className={`w-full h-full object-${
                        blockConfig.mediaConfig?.imageConfig?.fit || 'cover'
                      } object-${
                        blockConfig.mediaConfig?.imageConfig?.position ||
                        'center'
                      }`}
                    />
                    {blockConfig.mediaConfig?.imageConfig?.overlay?.enabled && (
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundColor:
                            blockConfig.mediaConfig.imageConfig.overlay.color ||
                            'rgba(0,0,0,0.5)',
                          opacity:
                            blockConfig.mediaConfig.imageConfig.overlay
                              .opacity || 0.5,
                        }}
                      />
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="p-4">
              <div
                className="text-xl font-semibold mb-2 line-clamp-2"
                style={{
                  fontFamily: theme.title.fontFamily,
                  color: theme.title.color,
fontSize: theme?.fontSize?.pageblockTitle,
                }}
              >
                {mainArticle?.title || 'Título do artigo principal'}
              </div>

              {mainDisplayConfig.showSubtitle &&
                blockConfig.styles.showExcerpt && (
                  <div
                    className="line-clamp-2"
                    style={{
                      fontFamily: theme.subtitle.fontFamily,
                      color: theme.subtitle.color,
fontSize: theme?.fontSize?.pageblockSubtitle,
                    }}
                  >
                    {mainArticle?.subtitle ||
                      'Descrição do artigo principal...'}
                  </div>
                )}

              {mainDisplayConfig.showPublishDate && mainArticle?.created_at && (
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {new Date(mainArticle.created_at).toLocaleDateString('pt-BR')}
                </div>
              )}
            </div>
          </article>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 border-l border-gray-200 dark:border-gray-700 pl-6">
          {[...Array(4)].map((_, i) => {
            const article = sidebarArticles[i]

            return (
              <article
                key={i}
                className={[
                  'flex gap-4',
                  i !== 3
                    ? 'border-b border-gray-200 dark:border-gray-700 pb-4'
                    : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {/* Thumbnail */}
                {sidebarDisplayConfig.showImage && (
                  <div className="w-24 aspect-[4/3] rounded overflow-hidden shrink-0">
                    {article?.content?.image?.desktop_image_path ? (
                      <div className="relative w-full h-full">
                        <img
                          src={article.content.image.desktop_image_path}
                          alt={article.title}
                          className={`w-full h-full object-${
                            blockConfig.mediaConfig?.imageConfig?.fit || 'cover'
                          } object-${
                            blockConfig.mediaConfig?.imageConfig?.position ||
                            'center'
                          }`}
                        />
                      </div>
                    ) : (
                      <div
                        className={`w-full h-full ${
                          isDarkTheme ? 'bg-gray-600' : 'bg-gray-300'
                        }`}
                      />
                    )}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div
                    className="text-sm font-medium line-clamp-2 mb-1"
                    style={{
                      fontFamily: theme.title.fontFamily,
                      color: theme.title.color,
fontSize: theme?.fontSize?.pageblockTitle,

                    }}
                  >
                    {article?.title || 'Título do artigo relacionado'}
                  </div>

                  {sidebarDisplayConfig.showSubtitle &&
                    blockConfig.styles.showExcerpt &&
                    article?.subtitle && (
                      <div
                        className="text-xs line-clamp-2"
                        style={{
                          fontFamily: theme.subtitle.fontFamily,
                          color: theme.subtitle.color,
fontSize: theme?.fontSize?.pageblockSubtitle,

                        }}
                      >
                        {article.subtitle}
                      </div>
                    )}

                  {sidebarDisplayConfig.showPublishDate &&
                    article?.created_at && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {new Date(article.created_at).toLocaleDateString(
                          'pt-BR'
                        )}
                      </div>
                    )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    )
  }

  const renderShowcasePreview = () => {
    const mainArticle = columns['col-0']?.[0]
    const gridArticles = columns['col-1'] || []
    const listArticles = columns['col-2'] || []

    // Configurações específicas para cada coluna
    const mainDisplayConfig = getColumnDisplayConfig('col-0')
    const gridDisplayConfig = getColumnDisplayConfig('col-1')
    const listDisplayConfig = getColumnDisplayConfig('col-2')

    return (
      <div className="grid grid-cols-12 gap-6">
        {/* Featured Article */}
        <div className="col-span-7">
          <article className="flex flex-col">
            {mainDisplayConfig.showImage && (
              <div
                className={`
                aspect-[16/9] rounded overflow-hidden
                ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}
              `}
              >
                {mainArticle?.content?.image?.desktop_image_path && (
                  <div className="relative w-full h-full">
                    <img
                      src={mainArticle.content.image.desktop_image_path}
                      alt={mainArticle.title}
                      className={`w-full h-full object-${
                        blockConfig.mediaConfig?.imageConfig?.fit || 'cover'
                      } object-${
                        blockConfig.mediaConfig?.imageConfig?.position ||
                        'center'
                      }`}
                    />
                    {blockConfig.mediaConfig?.imageConfig?.overlay?.enabled && (
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
                        style={{
                          backgroundColor:
                            blockConfig.mediaConfig.imageConfig.overlay.color ||
                            'rgba(0,0,0,0.5)',
                          opacity:
                            blockConfig.mediaConfig.imageConfig.overlay
                              .opacity || 0.5,
                        }}
                      />
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="p-4">
              <div
                className="text-2xl font-bold mb-2 line-clamp-2"
                style={{
                  fontFamily: theme.title.fontFamily,
                  color: theme.title.color,
fontSize: theme?.fontSize?.pageblockTitle,

                }}
              >
                {mainArticle?.title || 'Título do artigo principal'}
              </div>

              {mainDisplayConfig.showSubtitle &&
                blockConfig.styles.showExcerpt && (
                  <div
                    className="line-clamp-3"
                    style={{
                      fontFamily: theme.subtitle.fontFamily,
                      color: theme.subtitle.color,
fontSize: theme?.fontSize?.pageblockSubtitle,

                    }}
                  >
                    {mainArticle?.subtitle ||
                      'Descrição do artigo principal...'}
                  </div>
                )}

              {mainDisplayConfig.showPublishDate && mainArticle?.created_at && (
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {new Date(mainArticle.created_at).toLocaleDateString('pt-BR')}
                </div>
              )}
            </div>
          </article>
        </div>

        {/* Grid Articles */}
        <div className="col-span-3">
          <div className="grid grid-cols-1 gap-6">
            {[...Array(3)].map((_, i) => {
              const article = gridArticles[i]

              return (
                <article key={i} className="flex flex-col">
                  {gridDisplayConfig.showImage && (
                    <div
                      className={`
                      aspect-[4/3] rounded overflow-hidden mb-3
                    ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}
                  `}
                    >
                      {article?.content?.image?.desktop_image_path && (
                        <div className="relative w-full h-full">
                          <img
                            src={article.content.image.desktop_image_path}
                            alt={article.title}
                            className={`w-full h-full object-${
                              blockConfig.mediaConfig?.imageConfig?.fit ||
                              'cover'
                            } object-${
                              blockConfig.mediaConfig?.imageConfig?.position ||
                              'center'
                            }`}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex-1">
                    <div
                      className="text-sm font-medium line-clamp-2 mb-1"
                      style={{
                        fontFamily: theme.title.fontFamily,
                        color: theme.title.color,
fontSize: theme?.fontSize?.pageblockTitle,

                      }}
                    >
                      {article?.title || 'Título do artigo'}
                    </div>

                    {gridDisplayConfig.showSubtitle &&
                      blockConfig.styles.showExcerpt && (
                        <div
                          className="text-xs line-clamp-2"
                          style={{
                            fontFamily: theme.subtitle.fontFamily,
                            color: theme.subtitle.color,
fontSize: theme?.fontSize?.pageblockSubtitle,

                          }}
                        >
                          {article?.subtitle || 'Descrição do artigo...'}
                        </div>
                      )}

                    {gridDisplayConfig.showPublishDate &&
                      article?.created_at && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {new Date(article.created_at).toLocaleDateString(
                            'pt-BR'
                          )}
                        </div>
                      )}
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        {/* List Articles */}
        <div className="col-span-2 border-l border-gray-200 dark:border-gray-700 pl-6">
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => {
              const article = listArticles[i]

              return (
                <article
                  key={i}
                  className={[
                    'flex flex-col',
                    i !== 3
                      ? 'border-b border-gray-200 dark:border-gray-700 pb-4'
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <div
                    className="text-sm font-medium line-clamp-2 mb-1"
                    style={{
                      fontFamily: theme.title.fontFamily,
                      color: theme.title.color,
fontSize: theme?.fontSize?.pageblockTitle,

                    }}
                  >
                    {article?.title || 'Título do artigo'}
                  </div>

                  {listDisplayConfig.showSubtitle &&
                    blockConfig.styles.showExcerpt && (
                      <div
                        className="text-xs line-clamp-2"
                        style={{
                          fontFamily: theme.subtitle.fontFamily,
                          color: theme.subtitle.color,
fontSize: theme?.fontSize?.pageblockSubtitle,

                        }}
                      >
                        {article?.subtitle || 'Descrição do artigo...'}
                      </div>
                    )}

                  {listDisplayConfig.showPublishDate && article?.created_at && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {new Date(article.created_at).toLocaleDateString('pt-BR')}
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  const renderNewspaperPreview = () => {
    const mainArticles = columns['col-0'] || []
    const secondaryArticles = columns['col-1'] || []
    const tertiaryArticles = columns['col-2'] || []

    return (
      <div className="grid grid-cols-12 gap-6">
        {/* Main Articles */}
        <div className="col-span-6">
          {[...Array(2)].map((_, i) => {
            const article = mainArticles[i]

            return (
              <article
                key={i}
                className={['flex flex-col', i === 0 ? 'mb-6' : '']
                  .filter(Boolean)
                  .join(' ')}
              >
                {getColumnDisplayConfig('col-0').showImage &&
                  article?.content?.image?.desktop_image_path && (
                    <div
                      className={`
                    aspect-[16/9] rounded overflow-hidden mb-4
                  ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}
                `}
                    >
                      <div className="relative w-full h-full">
                        <img
                          src={article.content.image.desktop_image_path}
                          alt={article.title}
                          className={`w-full h-full object-${
                            blockConfig.mediaConfig?.imageConfig?.fit || 'cover'
                          } object-${
                            blockConfig.mediaConfig?.imageConfig?.position ||
                            'center'
                          }`}
                        />
                        {blockConfig.mediaConfig?.imageConfig?.overlay
                          ?.enabled && (
                          <div
                            className="absolute inset-0"
                            style={{
                              backgroundColor:
                                blockConfig.mediaConfig.imageConfig.overlay
                                  .color || 'rgba(0,0,0,0.5)',
                              opacity:
                                blockConfig.mediaConfig.imageConfig.overlay
                                  .opacity || 0.5,
                            }}
                          />
                        )}
                      </div>
                    </div>
                  )}

                <div className="p-4">
                  <div
                    className="text-xl font-semibold mb-2 line-clamp-2"
                    style={{
                      fontFamily: theme.title.fontFamily,
                      color: theme.title.color,
fontSize: theme?.fontSize?.pageblockTitle,

                    }}
                  >
                    {article?.title || 'Título do artigo principal'}
                  </div>

                  {getColumnDisplayConfig('col-0').showSubtitle &&
                    blockConfig.styles.showExcerpt && (
                      <div
                        className="line-clamp-3"
                        style={{
                          fontFamily: theme.subtitle.fontFamily,
                          color: theme.subtitle.color,
fontSize: theme?.fontSize?.pageblockSubtitle,

                        }}
                      >
                        {article?.subtitle ||
                          'Descrição do artigo principal...'}
                      </div>
                    )}

                  {getColumnDisplayConfig('col-0').showPublishDate &&
                    article?.created_at && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        {new Date(article.created_at).toLocaleDateString(
                          'pt-BR'
                        )}
                      </div>
                    )}
                </div>
              </article>
            )
          })}
        </div>

        {/* Secondary Articles */}
        <div className="col-span-3 border-l border-gray-200 dark:border-gray-700 pl-6">
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => {
              const article = secondaryArticles[i]

              return (
                <article
                  key={i}
                  className={[
                    'flex flex-col',
                    i !== 3
                      ? 'border-b border-gray-200 dark:border-gray-700 pb-6'
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {getColumnDisplayConfig('col-1').showImage &&
                    article?.content?.image?.desktop_image_path && (
                      <div
                        className={`
                      aspect-[4/3] rounded overflow-hidden mb-4
                      ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}
                    `}
                      >
                        <div className="relative w-full h-full">
                          <img
                            src={article.content.image.desktop_image_path}
                            alt={article.title}
                            className={`w-full h-full object-${
                              blockConfig.mediaConfig?.imageConfig?.fit ||
                              'cover'
                            } object-${
                              blockConfig.mediaConfig?.imageConfig?.position ||
                              'center'
                            }`}
                          />
                        </div>
                      </div>
                    )}

                  <div className="flex-1">
                    <div
                      className="text-base font-medium line-clamp-2 mb-1"
                      style={{
                        fontFamily: theme.title.fontFamily,
                        color: theme.title.color,
fontSize: theme?.fontSize?.pageblockTitle,

                      }}
                    >
                      {article?.title || 'Título do artigo'}
                    </div>

                    {getColumnDisplayConfig('col-1').showSubtitle &&
                      blockConfig.styles.showExcerpt && (
                        <div
                          className="text-sm line-clamp-2"
                          style={{
                            fontFamily: theme.subtitle.fontFamily,
                            color: theme.subtitle.color,
fontSize: theme?.fontSize?.pageblockSubtitle,

                          }}
                        >
                          {article?.subtitle || 'Descrição do artigo...'}
                        </div>
                      )}

                    {getColumnDisplayConfig('col-1').showPublishDate &&
                      article?.created_at && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {new Date(article.created_at).toLocaleDateString(
                            'pt-BR'
                          )}
                        </div>
                      )}
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        {/* Tertiary Articles */}
        <div className="col-span-3 border-l border-gray-200 dark:border-gray-700 pl-6">
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => {
              const article = tertiaryArticles[i]

              return (
                <article
                  key={i}
                  className={[
                    'flex flex-col',
                    i !== 3
                      ? 'border-b border-gray-200 dark:border-gray-700 pb-6'
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {getColumnDisplayConfig('col-2').showImage &&
                    article?.content?.image?.desktop_image_path && (
                      <div
                        className={`
                      aspect-[4/3] rounded overflow-hidden mb-4
                      ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}
                    `}
                      >
                        <div className="relative w-full h-full">
                          <img
                            src={article.content.image.desktop_image_path}
                            alt={article.title}
                            className={`w-full h-full object-${
                              blockConfig.mediaConfig?.imageConfig?.fit ||
                              'cover'
                            } object-${
                              blockConfig.mediaConfig?.imageConfig?.position ||
                              'center'
                            }`}
                          />
                        </div>
                      </div>
                    )}

                  <div className="flex-1">
                    <div
                      className="text-base font-medium line-clamp-2 mb-1"
                      style={{
                        fontFamily: theme.title.fontFamily,
                        color: theme.title.color,
fontSize: theme?.fontSize?.pageblockTitle,

                      }}
                    >
                      {article?.title || 'Título do artigo'}
                    </div>

                    {getColumnDisplayConfig('col-2').showSubtitle &&
                      blockConfig.styles.showExcerpt && (
                        <div
                          className="text-sm line-clamp-2"
                          style={{
                            fontFamily: theme.subtitle.fontFamily,
                            color: theme.subtitle.color,
fontSize: theme?.fontSize?.pageblockSubtitle,

                          }}
                        >
                          {article?.subtitle || 'Descrição do artigo...'}
                        </div>
                      )}

                    {getColumnDisplayConfig('col-2').showPublishDate &&
                      article?.created_at && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {new Date(article.created_at).toLocaleDateString(
                            'pt-BR'
                          )}
                        </div>
                      )}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  const renderMagazinePreview = () => {
    const mainArticle = columns['col-0']?.[0]
    const secondaryArticles = columns['col-1'] || []
    const tertiaryArticles = columns['col-2'] || []

    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Article */}
        <div className="lg:col-span-6">
          <article className="flex flex-col">
            {getColumnDisplayConfig('col-0').showImage && (
              <div
                className={`
                aspect-[16/9] rounded overflow-hidden
                ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}
              `}
              >
                {mainArticle?.content?.image?.desktop_image_path && (
                  <div className="relative w-full h-full">
                    <img
                      src={mainArticle.content.image.desktop_image_path}
                      alt={mainArticle.title}
                      className={`w-full h-full object-${
                        blockConfig.mediaConfig?.imageConfig?.fit || 'cover'
                      } object-${
                        blockConfig.mediaConfig?.imageConfig?.position ||
                        'center'
                      }`}
                    />
                  </div>
                )}
              </div>
            )}

            <div className="p-4">
              <div
                className="text-2xl font-bold mb-3"
                style={{
                  fontFamily: theme.title.fontFamily,
                  color: theme.title.color,
fontSize: theme?.fontSize?.pageblockTitle,

                }}
              >
                {mainArticle?.title || 'Título do artigo principal'}
              </div>

              {getColumnDisplayConfig('col-0').showSubtitle &&
                blockConfig.styles.showExcerpt && (
                  <div
                    className="text-lg line-clamp-3"
                    style={{
                      fontFamily: theme.subtitle.fontFamily,
                      color: theme.subtitle.color,
  fontSize: theme?.fontSize?.pageblockSubtitle,

                    }}
                  >
                    {mainArticle?.subtitle ||
                      'Descrição do artigo principal...'}
                  </div>
                )}

              {getColumnDisplayConfig('col-0').showPublishDate &&
                mainArticle?.created_at && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {new Date(mainArticle.created_at).toLocaleDateString(
                      'pt-BR'
                    )}
                  </div>
                )}
            </div>
          </article>
        </div>

        {/* Secondary Articles */}
        <div className="lg:col-span-3">
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => {
              const article = secondaryArticles[i]

              return (
                <article key={i} className="flex flex-col">
                  {getColumnDisplayConfig('col-1').showImage && (
                    <div
                      className={`
                      aspect-[4/3] rounded overflow-hidden mb-4
                      ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}
                    `}
                    >
                      {article?.content?.image?.desktop_image_path && (
                        <div className="relative w-full h-full">
                          <img
                            src={article.content.image.desktop_image_path}
                            alt={article.title}
                            className={`w-full h-full object-${
                              blockConfig.mediaConfig?.imageConfig?.fit ||
                              'cover'
                            } object-${
                              blockConfig.mediaConfig?.imageConfig?.position ||
                              'center'
                            }`}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  <div className="p-4">
                    <div
                      className="text-xl font-semibold mb-2"
                      style={{
                        fontFamily: theme.title.fontFamily,
                        color: theme.title.color,
fontSize: theme?.fontSize?.pageblockTitle,

                      }}
                    >
                      {article?.title || 'Título do artigo secundário'}
                    </div>

                    {getColumnDisplayConfig('col-1').showSubtitle &&
                      blockConfig.styles.showExcerpt && (
                        <div
                          className="text-base line-clamp-2"
                          style={{
                            fontFamily: theme.subtitle.fontFamily,
                            color: theme.subtitle.color,
fontSize: theme?.fontSize?.pageblockSubtitle,

                          }}
                        >
                          {article?.subtitle ||
                            'Descrição do artigo secundário...'}
                        </div>
                      )}

                    {getColumnDisplayConfig('col-1').showPublishDate &&
                      article?.created_at && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {new Date(article.created_at).toLocaleDateString(
                            'pt-BR'
                          )}
                        </div>
                      )}
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        {/* Tertiary Articles */}
        <div className="lg:col-span-3">
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => {
              const article = tertiaryArticles[i]

              return (
                <article key={i} className="flex flex-col">
                  {getColumnDisplayConfig('col-2').showImage && (
                    <div
                      className={`
                      aspect-[4/3] rounded overflow-hidden mb-4
                      ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}
                    `}
                    >
                      {article?.content?.image?.desktop_image_path && (
                        <div className="relative w-full h-full">
                          <img
                            src={article.content.image.desktop_image_path}
                            alt={article.title}
                            className={`w-full h-full object-${
                              blockConfig.mediaConfig?.imageConfig?.fit ||
                              'cover'
                            } object-${
                              blockConfig.mediaConfig?.imageConfig?.position ||
                              'center'
                            }`}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  <div className="p-4">
                    <div
                      className="text-xl font-semibold mb-2"
                      style={{
                        fontFamily: theme.title.fontFamily,
                        color: theme.title.color,
fontSize: theme?.fontSize?.pageblockTitle,

                      }}
                    >
                      {article?.title || 'Título do artigo terciário'}
                    </div>

                    {getColumnDisplayConfig('col-2').showSubtitle &&
                      blockConfig.styles.showExcerpt && (
                        <div
                          className="text-base line-clamp-2"
                          style={{
                            fontFamily: theme.subtitle.fontFamily,
                            color: theme.subtitle.color,
fontSize: theme?.fontSize?.pageblockSubtitle,

                          }}
                        >
                          {article?.subtitle ||
                            'Descrição do artigo terciário...'}
                        </div>
                      )}

                    {getColumnDisplayConfig('col-2').showPublishDate &&
                      article?.created_at && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {new Date(article.created_at).toLocaleDateString(
                            'pt-BR'
                          )}
                        </div>
                      )}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // column-0: video principal
  // column-1: apenas title e subtitle, sem imagem e sem skeleton de imagem, apenas skeleton de texto
  // column-2: apenas title e subtitle, sem imagem e sem skeleton de imagem, apenas skeleton de texto

  const renderVideoGridPreview = () => {
    const mainArticle = columns['col-0']?.[0]
    const secondaryArticles = columns['col-1'] || []
    const tertiaryArticles = columns['col-2'] || []

    return (
      <div className="grid grid-cols-12 gap-6">
        {/* Main Video */}
        <div className="col-span-6">
          <article className="flex flex-col">
            {getColumnDisplayConfig('col-0') && (
              <div
                className={`
                aspect-[16/9] rounded overflow-hidden relative
              ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}
            `}
              >
                {mainArticle?.content?.image?.desktop_image_path && (
                  <div className="relative w-full h-full">
                    <img
                      src={mainArticle.content.image.desktop_image_path}
                      alt={mainArticle.title}
                      className={`w-full h-full object-${
                        blockConfig.mediaConfig?.imageConfig?.fit || 'cover'
                      } object-${
                        blockConfig.mediaConfig?.imageConfig?.position ||
                        'center'
                      }`}
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>
                )}

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className={`
                    w-16 h-16 rounded-full flex items-center justify-center
                    ${isDarkTheme ? 'bg-white/20' : 'bg-black/20'}
                    hover:scale-110 transition-transform duration-200
                  `}
                  >
                    <div
                      className={`
                      w-0 h-0 border-t-[12px] border-t-transparent
                      border-l-[20px] border-r-0
                      border-b-[12px] border-b-transparent
                      ${isDarkTheme ? 'border-l-white' : 'border-l-black'}
                      ml-1
                    `}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="p-4">
              <div
                className="text-xl font-semibold mb-2 line-clamp-2"
                style={{
                  fontFamily: theme.title.fontFamily,
                  color: theme.title.color,
fontSize: theme?.fontSize?.pageblockTitle,

                }}
              >
                {mainArticle?.title || 'Título do vídeo principal'}
              </div>

              {getColumnDisplayConfig('col-0').showSubtitle &&
                blockConfig.styles.showExcerpt && (
                  <div
                    className="line-clamp-2"
                    style={{
                      fontFamily: theme.subtitle.fontFamily,
                      color: theme.subtitle.color,
fontSize: theme?.fontSize?.pageblockSubtitle,

                    }}
                  >
                    {mainArticle?.subtitle || 'Descrição do vídeo principal...'}
                  </div>
                )}

              {getColumnDisplayConfig('col-0').showPublishDate &&
                mainArticle?.created_at && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {new Date(mainArticle.created_at).toLocaleDateString(
                      'pt-BR'
                    )}
                  </div>
                )}
            </div>
          </article>
        </div>

        {/* Secondary Videos */}
        <div className="col-span-3">
          <div className="grid grid-cols-1 gap-6">
            {[...Array(2)].map((_, i) => {
              const article = secondaryArticles[i]

              return (
                <article key={i} className="flex flex-col">
                  {getColumnDisplayConfig('col-1') && (
                    <div
                      className={`
                      ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}
                    `}
                    >
                    </div>
                  )}

                  <div className="p-4">
                    <div
                      className="text-base font-medium line-clamp-2 mb-1"
                      style={{
                        fontFamily: theme.title.fontFamily,
                        color: theme.title.color,
fontSize: theme?.fontSize?.pageblockTitle,

                      }}
                    >
                      {article?.title || <SwitchTitleSubtitleSkeleton variant="title" />}
                    </div>

                    {getColumnDisplayConfig('col-1').showSubtitle &&
                      blockConfig.styles.showExcerpt && (
                        <div
                          className="text-sm line-clamp-2"
                          style={{
                            fontFamily: theme.subtitle.fontFamily,
                            color: theme.subtitle.color,
fontSize: theme?.fontSize?.pageblockSubtitle,

                          }}
                        >
                            {article?.subtitle ||
                            <SwitchTitleSubtitleSkeleton variant="subtitle" />}
                        </div>
                      )}

                    {getColumnDisplayConfig('col-1').showPublishDate &&
                      article?.created_at && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {new Date(article.created_at).toLocaleDateString(
                            'pt-BR'
                          )}
                        </div>
                      )}
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        {/* Tertiary Videos */}
        <div className="col-span-3">
          <div className="grid grid-cols-1 gap-6">
            {[...Array(2)].map((_, i) => {
              const article = tertiaryArticles[i]

              return (
                <article key={i} className="flex flex-col">
                  {getColumnDisplayConfig('col-2') && (
                    <div
                      className={`
                      ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}
                    `}
                    ></div>
                  )}

                  <div className="p-4">
                    <div
                      className="text-base font-medium line-clamp-2 mb-1"
                      style={{
                        fontFamily: theme.title.fontFamily,
                        color: theme.title.color,
fontSize: theme?.fontSize?.pageblockTitle,

                      }}
                    >
                      {article?.title || <SwitchTitleSubtitleSkeleton variant="title" />}
                    </div>

                    {getColumnDisplayConfig('col-2').showSubtitle &&
                      blockConfig.styles.showExcerpt && (
                        <div
                          className="text-sm line-clamp-2"
                          style={{
                            fontFamily: theme.subtitle.fontFamily,
                            color: theme.subtitle.color,
fontSize: theme?.fontSize?.pageblockSubtitle,

                          }}
                        >
                          {article?.subtitle ||
                            <SwitchTitleSubtitleSkeleton variant="subtitle" />}
                        </div>
                      )}

                    {getColumnDisplayConfig('col-2').showPublishDate &&
                      article?.created_at && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {new Date(article.created_at).toLocaleDateString(
                            'pt-BR'
                          )}
                        </div>
                      )}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  const getLayoutPreview = () => {
    switch (variant) {
      case 'sidebar':
        return renderSidebarPreview()
      case 'showcase':
        return renderShowcasePreview()
      case 'newspaper':
        return renderNewspaperPreview()
      case 'magazine':
        return renderMagazinePreview()
      case 'videogrid':
        return renderVideoGridPreview()
      default:
        return renderSidebarPreview()
    }
  }

  return (
    <div
      className={`
      rounded-lg overflow-hidden border
      ${
        isDarkTheme ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }
    `}
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Preview do Layout {variant}
        </h3>
      </div>
      <div className="p-4">{getLayoutPreview()}</div>
    </div>
  )
}

export default MixedLayoutPreview
