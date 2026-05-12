import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Navbar />
      <main className={isLandingPage ? '' : 'max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'}>
        {children}
      </main>
      {!isLandingPage && (
        <footer className="bg-white m-4 rounded-lg shadow mt-8 max-w-7xl mx-auto">
          <div className="w-full mx-auto p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center">© 2026 TrueDoc™. All Rights Reserved.</span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0">
              <li><a href="#" className="hover:underline me-4 md:me-6">About</a></li>
              <li><a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline me-4 md:me-6">Licensing</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
