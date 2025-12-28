import type { ReactNode } from 'react';
import HomePage from './pages/HomePage';
import EditorPage from './pages/EditorPage';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    element: <HomePage />
  },
  {
    name: 'Editor',
    path: '/editor',
    element: <EditorPage />
  }
];

export default routes;
