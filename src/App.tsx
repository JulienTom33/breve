import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import FeedPage from '@/pages/FeedPage'
import SearchPage from '@/pages/SearchPage'
import SettingsPage from '@/pages/SettingsPage'
import ArticlePage from '@/pages/ArticlePage'
import NotFoundPage from '@/pages/NotFoundPage'
import DesignSystem from '@/pages/DesignSystem'

const router = createBrowserRouter([
  {
    path: '/design-system',
    element: <DesignSystem />,
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <FeedPage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: 'article/:id', element: <ArticlePage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
