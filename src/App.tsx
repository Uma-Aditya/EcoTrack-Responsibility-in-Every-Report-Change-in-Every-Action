import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { HomePage } from './pages/HomePage';
import { ReportPage } from './pages/ReportPage';
import { SchedulePage } from './pages/SchedulePage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

type Page = 'home' | 'report' | 'schedule' | 'admin-login' | 'admin-dashboard';

interface ToastState {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    setToast({ message, type });
  };

  const closeToast = () => {
    setToast(null);
  };

  const navigate = (page: Page | string) => {
    setCurrentPage(page as Page);
    window.scrollTo(0, 0);
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar currentPage={currentPage} onNavigate={navigate} />

        <main className="flex-grow">
          {currentPage === 'home' && <HomePage onNavigate={navigate} />}
          {currentPage === 'report' && <ReportPage onShowToast={showToast} />}
          {currentPage === 'schedule' && <SchedulePage onShowToast={showToast} />}
          {currentPage === 'admin-login' && (
            <AdminLoginPage onShowToast={showToast} onNavigate={navigate} />
          )}
          {currentPage === 'admin-dashboard' && (
            <AdminDashboardPage onShowToast={showToast} onNavigate={navigate} />
          )}
        </main>

        <Footer />

        {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}
      </div>
    </AuthProvider>
  );
}

export default App;
