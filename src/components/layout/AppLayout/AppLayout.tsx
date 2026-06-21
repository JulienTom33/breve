import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import CategoryTabs from '../CategoryTabs/CategoryTabs'
import BottomNav from '../BottomNav/BottomNav'

const AppLayout: FC = () => (
  <div id="app-layout__container--main" className="min-h-screen bg-bg flex flex-col">
    <Header />
    <CategoryTabs />
    <main id="app-layout__main--content" className="flex-1 overflow-y-auto pb-14 md:pb-0">
      <Outlet />
    </main>
    <BottomNav />
  </div>
)

export default AppLayout
