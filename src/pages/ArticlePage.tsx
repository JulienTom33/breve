import { FC } from 'react'
import { useParams } from 'react-router-dom'

const ArticlePage: FC = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <div id="article-page__container--main" className="p-4 md:p-6 max-w-2xl mx-auto">
      <h1 id="article-page__title--main" className="mb-6">
        Article
      </h1>
      <p id="article-page__id--text" className="text-text-muted text-sm">
        ID : {id}
      </p>
    </div>
  )
}

export default ArticlePage
