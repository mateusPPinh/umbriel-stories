import React from 'react'
import { type Article } from '../PageBlock.types'

interface Template100Props {
  articles: Article[]
}

const Template100: React.FC<Template100Props> = ({ articles }) => {
  return (
    <div className="template-100">
      {articles.map((article) => (
        <div key={article.id} className="article">
          <img src={article.content.image.desktop_image_path} alt={article.title} />
          <h2>{article.title}</h2>
          <p>{article.subtitle}</p>
          <div dangerouslySetInnerHTML={{ __html: article.articleBody }} />
        </div>
      ))}
    </div>
  )
}

export default Template100
