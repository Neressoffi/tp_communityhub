import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import AdminCategoriesPage from '../pages/AdminCategoriesPage';
import ContactsPage from '../pages/ContactsPage';
import CreateEventPage from '../pages/CreateEventPage';
import DashboardPage from '../pages/DashboardPage';
import EventDetailsPage from '../pages/EventDetailsPage';
import EventsPage from '../pages/EventsPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import MessagesPage from '../pages/MessagesPage';
import MySkillPage from '../pages/MySkillPage';
import NotFoundPage from '../pages/NotFoundPage';
import PremiumPage from '../pages/PremiumPage';
import RegisterPage from '../pages/RegisterPage';
import SkillsPage from '../pages/SkillsPage';
import AdminRoute from './AdminRoute';
import ProtectedRoute from './ProtectedRoute';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/events" element={<EventsPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/events/create" element={<CreateEventPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/premium" element={<PremiumPage />} />
            <Route path="/skills/my" element={<MySkillPage />} />
          </Route>

          <Route path="/events/:id" element={<EventDetailsPage />} />
          <Route path="/skills" element={<SkillsPage />} />

          <Route element={<AdminRoute />}>
            <Route path="/admin/categories" element={<AdminCategoriesPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
