/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { type ReactElement } from 'react'
import { type Article, type BlockConfig } from '../PageBlock.types'

interface TemplateSideColumnsProps {
  articles: Article[]
  config: BlockConfig
}

const TemplateSideColumns = ({ articles }: TemplateSideColumnsProps): ReactElement => {
  const displayedArticles = articles.slice(0, 6)

  return (
    <div className="flex flex-col gap-4 max-w-[330px] w-full">
      <div className="w-full border-b border-[#000]" />
      {displayedArticles.map((article, index) => {
        if (index === 2) {
          return (
            <React.Fragment key={index}>
              <div className="flex flex-col items-start">
                <h2 className="text-[13px] text-[#5A5A5A] font-mvpFont uppercase leading-[140%]">{article.author}</h2>
                <h3 className="text-lg font-bold font-mvpFont text-[19px] text-[#121212] leading-[120%]">
                  {article.title}
                </h3>
                {Boolean(article.content.image) && (
                  <img className="mt-2 w-full object-cover" src={article.content.image.desktop_image_path} alt={article.title} />
                )}
              </div>
              <div className="w-full border-b border-[#000]"></div>
            </React.Fragment>
          )
        }

        if (index === 3 || index === 4) {
          return null
        }

        return (
          <React.Fragment key={index}>
            <div>
              <div className="flex items-center justify-between">
                <div className='flex flex-col items-start'>
                  <h2 className="text-[13px] text-[#5A5A5A] font-mvpFont uppercase leading-[140%]">{article.author}</h2>
                  <h3 className="text-lg font-bold font-mvpFont text-[19px] text-[#121212] leading-[120%]">{article.title}</h3>
                </div>
                {Boolean(article.content.image) && (
                  <img className="ml-2 w-10 h-10 object-cover rounded-[50%]" src={article.content.image.desktop_image_path} alt={article.title} />
                )}
              </div>
            </div>
            {index < displayedArticles.length - 1 && index !== 2 && (
              <div className="w-full border-b border-[#000]"></div>
            )}
          </React.Fragment>
        )
      })}
      <div className="flex border-t pt-4 mt-1">
        <div className="w-1/2 pr-4 border-r">
          <h4 className="text-[13px] text-[#5A5A5A] font-mvpFont uppercase leading-[140%]">Letters from our readers</h4>
          <p className="font-bold font-mvpFont text-[15px] text-[#121212] leading-[120%]">
            {displayedArticles[0]?.title || 'Caring for Pet Companions'}
          </p>
        </div>
        <div className="w-1/2 pl-4">
          <h4 className="text-[13px] text-[#5A5A5A] font-mvpFont uppercase leading-[140%]">The Editorial</h4>
          <p className="font-bold font-mvpFont text-[15px] text-[#121212] leading-[120%]">
            {displayedArticles[5]?.title || 'Scientists found evidence.'}
          </p>
        </div>
      </div>
      <div className="w-full border-b border-[#000]" />
    </div>
  )
}

export default TemplateSideColumns
