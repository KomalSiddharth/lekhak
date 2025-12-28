import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import Header from '@/components/common/Header';
// import { AuthProvider } from '@/contexts/AuthContext';
// import { RouteGuard } from '@/components/common/RouteGuard';
import { Toaster } from '@/components/ui/toaster';
import routes from './routes';
import DarkModeToggle from '@/components/common/DarkModeToggle';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen relative">
        <div className="fixed top-6 right-6 z-[100]">
          <DarkModeToggle />
        </div>
        {/*<Header />*/}
        <main className="flex-grow">
          <Routes>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={route.element}
              />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
      <Toaster />
      {/*</RouteGuard>*/}
      {/*</AuthProvider>*/}
    </Router>
  );
};

export default App;
