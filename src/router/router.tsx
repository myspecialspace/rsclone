import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import LoginPage from '../pages/Login/Login';
import NotFoundPage from '../pages/NotFound/NotFound';
import RegistrationPage from '../pages/Registration/Registration';
import AboutPage from '../pages/About/About';
import Boards from '../pages/Boards/Boards';

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
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'registration',
        element: <RegistrationPage />,
      },
      {
        path: 'boards',
        element: <Boards />,
      },
    ],
  },
]);
