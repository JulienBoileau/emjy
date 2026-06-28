import { Suspense, lazy, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { SiteFooter } from './components/SiteFooter';

const HomePage = lazy(() => import('./pages/HomePage').then((module) => ({ default: module.HomePage })));
const PresentationPage = lazy(() => import('./pages/PresentationPage').then((module) => ({ default: module.PresentationPage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then((module) => ({ default: module.ServicesPage })));
const AgendaPage = lazy(() => import('./pages/AgendaPage').then((module) => ({ default: module.AgendaPage })));
const GalleryPage = lazy(() => import('./pages/GalleryPage').then((module) => ({ default: module.GalleryPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((module) => ({ default: module.ContactPage })));
const AdminPage = lazy(() => import('./pages/AdminPage').then((module) => ({ default: module.AdminPage })));
const NewsletterPage = lazy(() => import('./pages/NewsletterPage').then((module) => ({ default: module.NewsletterPage })));

export function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <Navbar />
      <main className="page-shell" key={location.pathname}>
        <Suspense
          fallback={
            <div className="route-loader" aria-live="polite" aria-busy="true">
              <span className="route-loader__ring" />
              <p>Chargement de la page...</p>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Navigate to="/accueil" replace />} />
            <Route path="/accueil" element={<HomePage />} />
            <Route path="/presentation" element={<PresentationPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/agenda" element={<AgendaPage />} />
            <Route path="/galerie" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/newsletter" element={<NewsletterPage />} />
          </Routes>
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}
