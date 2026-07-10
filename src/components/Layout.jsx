import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const hideFooterRoutes = ['/ai-mentor', '/playground'];
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);
  
  // Don't show sidebar on login screen
  const isAuth = localStorage.getItem('ai_skillverse_auth') === 'true';

  return (
    <div className="flex flex-col min-h-screen relative bg-slate-50 dark:bg-dark-bg transition-colors duration-300">
      {/* Background gradients for futuristic vibe */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary-600/20 dark:bg-primary-600/10 blur-[120px] pointer-events-none animate-blob"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 dark:bg-purple-600/10 blur-[120px] pointer-events-none animate-blob" style={{ animationDelay: '2s' }}></div>
      
      {/* Fixed top Navbar */}
      <Navbar setSidebarOpen={setIsSidebarOpen} />
      
      <div className="flex flex-1 pt-14 relative z-10 w-full mx-auto">
        {/* Sidebar */}
        {isAuth && (
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        )}

        {/* Main Content Area */}
        <main className={`flex-1 flex flex-col w-full min-w-0 transition-all duration-300 ${isAuth ? 'lg:pl-0' : ''}`}>
          <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 py-6 flex-grow flex flex-col">
            {children}
          </div>
          {!shouldHideFooter && <Footer />}
        </main>
      </div>
    </div>
  );
};

export default Layout;
