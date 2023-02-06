import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import LoginPage from "../pages/Login/Login";
import NotFoundPage from "../pages/NotFound/NotFound";
import RegistrationPage from "../pages/Registration/Registration";

export default createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '',
        element: <LoginPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "registration",
        element: <RegistrationPage />,
      },
    ],
  },
]);