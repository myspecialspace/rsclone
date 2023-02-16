import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import LoginPage from '../pages/Login/Login';
import NotFoundPage from '../pages/NotFound/NotFound';
import RegistrationPage from '../pages/Registration/Registration';
import AboutPage from '../pages/About/About';
import Boards from '../pages/Boards/Boards';
import WorkspacePage from '../pages/Workspace/Workspace';
import MeLayout from '../components/MeLayout/MeLayout';
import BoardPage from '../pages/Board/Board';
import { RoutePath } from './paths';

export default createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '',
        element: <AboutPage />,
      },
      {
        path: RoutePath.ABOUT,
        element: <AboutPage />,
      },
      {
        path: RoutePath.LOGIN,
        element: <LoginPage />,
      },
      {
        path: RoutePath.REGISTRATION,
        element: <RegistrationPage />,
      },
      {
        path: RoutePath.BOARDS,
        element: <Boards />,
      },
    ],
  },
  //meLayout для авторизованных пользователей (зона авторизации)
  {
    path: RoutePath.ME,
    element: <MeLayout />,
    children: [
      {
        path: `${RoutePath.WORKSPACES}/:id`,
        element: <WorkspacePage />,
      },
      {
        path: `${RoutePath.BOARDS}/:boardId`,
        element: <BoardPage />,
      },
    ],
  }
]);
