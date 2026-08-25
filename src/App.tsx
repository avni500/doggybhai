import React, { useEffect } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { SearchModal } from './components/common/SearchModal';
import { AuthModal } from './components/common/AuthModal';
import { ToastContainer } from './components/common/ToastContainer';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CombosPage } from './pages/CombosPage';
import { OffersPage } from './pages/OffersPage';
import { MyDogPage } from './pages/MyDogPage';
import { GuidePage } from './pages/GuidePage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { UserAccountPage } from './pages/UserAccountPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { SmartCarePage } from './pages/SmartCarePage';

const AppContent: React.FC = () => {
  const { currentRoute } = useShop();

  // Scroll to top on page route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentRoute]);

  const renderCurrentPage = () => {
    switch (currentRoute) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'categories':
        return <CategoriesPage />;
      case 'combos':
        return <CombosPage />;
      case 'offers':
        return <OffersPage />;
      case 'smart-care':
        return <SmartCarePage />;
      case 'my-dog':
        return <MyDogPage />;
      case 'guide':
        return <GuidePage />;
      case 'article-detail':
        return <ArticleDetailPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'order-confirmation':
        return <OrderConfirmationPage />;
      case 'order-tracking':
        return <OrderTrackingPage />;
      case 'account':
        return <UserAccountPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'faqs':
        return <FAQPage />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 text-zinc-900 selection:bg-orange-500 selection:text-white">
      <Header />
      <main className="flex-1">
        {renderCurrentPage()}
      </main>
      <Footer />

      {/* Global Drawers & Modals */}
      <CartDrawer />
      <SearchModal />
      <AuthModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
