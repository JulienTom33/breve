import { FC } from 'react'

const FeedPage: FC = () => (
  <div id="feed-page__container--main" className="p-4 md:p-6 max-w-2xl mx-auto">
    <h1 id="feed-page__title--main" className="mb-6">
      À la une
    </h1>
    <p id="feed-page__placeholder--text" className="text-text-muted">
      Le fil d'actualité arrive bientôt.
    </p>
  </div>
)

export default FeedPage
