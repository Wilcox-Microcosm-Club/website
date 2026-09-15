import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import AnnouncementsPage from './pages/AnnouncementsPage'
import AnnouncementPage from './pages/AnnouncementPage'
import DonatePage from './pages/DonatePage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/admin/DashboardPage'
import AnnouncementEditorPage from './pages/admin/AnnouncementEditorPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/announcements" element={<AnnouncementsPage />} />
        <Route path="/announcements/:id" element={<AnnouncementPage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<DashboardPage />} />
          <Route path="/admin/announcements/new" element={<AnnouncementEditorPage />} />
          <Route path="/admin/announcements/:id" element={<AnnouncementEditorPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Layout />} />
    </Routes>
  )
}
