import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout/AppLayout'
import ProtectedRoute from '@/components/auth/ProtectedRoute/ProtectedRoute'
import FeedPage from '@/pages/FeedPage'
import SearchPage from '@/pages/SearchPage'
import SettingsPage from '@/pages/SettingsPage'
import ArticlePage from '@/pages/ArticlePage'
import NotFoundPage from '@/pages/NotFoundPage'
import AuthPage from '@/pages/AuthPage'
import OnboardingCategoriesPage from '@/pages/OnboardingCategoriesPage'
import DesignSystem from '@/pages/DesignSystem'

const router = createBrowserRouter([
  {
    path: '/design-system',
    element: <DesignSystem />,
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
  {
    path: '/onboarding/categories',
    element: <OnboardingCategoriesPage />,
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <FeedPage /> },
          { path: 'search', element: <SearchPage /> },
          { path: 'settings', element: <SettingsPage /> },
          { path: 'article/:id', element: <ArticlePage /> },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
