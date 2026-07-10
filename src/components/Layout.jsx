import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideFooterRoutes = ['/ai-mentor', '/playground'];
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-slate-50 dark:bg-dark-bg transition-colors duration-300">
      {/* Background gradients for futuristic vibe */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary-600/20 dark:bg-primary-600/10 blur-[120px] pointer-events-none animate-blob"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 dark:bg-purple-600/10 blur-[120px] pointer-events-none animate-blob" style={{ animationDelay: '2s' }}></div>
      
      <Navbar />
      <main className="flex-grow flex flex-col pt-24 pb-6 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto w-full z-10">
        {children}
      </main>
      {!shouldHideFooter && <Footer />}
    </div>
  );
};

export default Layout;
