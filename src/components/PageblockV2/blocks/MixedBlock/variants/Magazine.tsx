import React from 'react';
import { BlockVariant, Article, GridStyles } from '../../../types';
import { generateArticleUrl } from '../../../utils/generateArticleUrl';
import Link from '../../../../Link';
import { defaultClasses } from '../../../constants/defaultClasses';



interface BaseVariantProps {
  variant: BlockVariant & {
    config: {
      styles: GridStyles;
    };
  };
  isDarkTheme?: boolean;
  customStyles?: any;
}


const Magazine: React.FC<BaseVariantProps> = ({ variant, isDarkTheme, customStyles }) => {
  const classes = defaultClasses.mixed.magazine || { container: '' };
  const { articles } = variant.config;
  const styles = variant.config.styles || {};


  // Get main article and secondary articles
  const mainArticle = articles['col-0']?.[0];
  const secondaryArticles = articles['col-1'] || [];
  const tertiaryArticles = articles['col-2'] || [];

  return (
    <div className={`${classes.container} ${customStyles?.container || ''}`}>
      <div className={customStyles?.grid || 'grid grid-cols-1 lg:grid-cols-12 gap-6'}>
        {/* Main Article */}
        {mainArticle && (
          <div className={customStyles?.mainColumn || 'lg:col-span-6'}>
            <article 
              className={customStyles?.mainArticle || 'flex flex-col'}
            >
              {mainArticle.content?.image?.desktop_image_path && (
                <div className={customStyles?.imageWrapper || 'relative w-full aspect-[16/9] overflow-hidden mb-4'}>
                  <img
                    src={mainArticle.content.image.desktop_image_path}
                    alt={mainArticle.title}
                    className={customStyles?.image || 'w-full h-full object-cover'}
                  />
                </div>
              )}
              
              <div className={customStyles?.content || 'p-4'}>
                <Link className="hover:underline transition-all duration-300" href={generateArticleUrl(mainArticle)}>
                  <h2 
                    className={customStyles?.heading || 'text-2xl font-bold mb-3'} 
                  >
                    {mainArticle.title}
                  </h2>
                </Link>
                
                {styles.showExcerpt ? (
                  <p 
                    className={customStyles?.subtitle || 'text-lg'} 
                  >
                    {mainArticle.subtitle}
                  </p>
                ) : (
                  <p 
                    className={customStyles?.subtitle || 'text-lg'} 
                  >
                    {mainArticle.subtitle}
                  </p>
                )}
              </div>
            </article>
          </div>
        )}

        {/* Secondary Articles */}
        <div className={customStyles?.secondaryColumn || 'lg:col-span-3'}>
          <div className={customStyles?.secondaryGrid || 'space-y-6'}>
            {secondaryArticles.map((article: Article) => (
              <article 
                key={article.id} 
                className={customStyles?.secondaryArticle || 'flex flex-col'}
              >
                {article.content?.image?.desktop_image_path && (
                  <div className={customStyles?.imageWrapper || 'relative w-full aspect-[4/3] overflow-hidden mb-4'}>
                    <img
                      src={article.content?.image?.desktop_image_path}
                      alt={article.title}
                      className={customStyles?.image || 'w-full h-full object-cover'}
                    />
                  </div>
                )}
                
                <div className={customStyles?.content || 'p-4'}>
                  <Link className="hover:underline transition-all duration-300" href={generateArticleUrl(article)}>
                    <h2 
                      className={customStyles?.heading || 'text-xl font-semibold mb-2'} 
                    >
                      {article.title}
                    </h2>
                  </Link>
                  
                  {styles.showExcerpt ? (
                    <p 
                      className={customStyles?.subtitle || 'text-base'} 
                    >
                      {article.subtitle}
                    </p>
                    ) : (
                    <p 
                      className={customStyles?.subtitle || 'text-base'} 
                    >
                      {article.subtitle}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Tertiary Articles */}
        <div className={customStyles?.tertiaryColumn || 'lg:col-span-3'}>
          <div className={customStyles?.tertiaryGrid || 'space-y-6'}>
            {tertiaryArticles.map((article: Article) => (
              <article 
                key={article.id} 
                className={customStyles?.tertiaryArticle || 'flex flex-col'}
              >
                {article.content?.image?.desktop_image_path && (
                  <div className={customStyles?.imageWrapper || 'relative w-full aspect-[4/3] overflow-hidden mb-4'}>
                    <img
                      src={article.content?.image?.desktop_image_path}
                      alt={article.title}
                      className={customStyles?.image || 'w-full h-full object-cover'}
                    />
                  </div>
                )}
                
                <div className={customStyles?.content || 'p-4'}>
                  <Link className="hover:underline transition-all duration-300" href={generateArticleUrl(article)}>
                    <h2 
                      className={customStyles?.heading || 'text-xl font-semibold mb-2'} 
                    >
                      {article.title}
                    </h2>
                  </Link>
                  
                  {styles.showExcerpt ? (
                    <p 
                      className={customStyles?.subtitle || 'text-base'} 
                    >
                      {article.subtitle}
                    </p>
                    ) : (
                    <p 
                      className={customStyles?.subtitle || 'text-base'} 
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
    </div>
  );
};

export default Magazine; 