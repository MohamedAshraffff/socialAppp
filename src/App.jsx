import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./Pages/Layout";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import PostDetails from "./Pages/PostDetails";
import Profile from "./Pages/Profile";
function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Login /> },
        { path: "Register", element: <Register /> },
        { path: "/Home", element: <ProtectedRoute><Home></Home></ProtectedRoute> },
        { path: "/posts/:id", element: <ProtectedRoute><PostDetails></PostDetails></ProtectedRoute> },
        { path: "/profile/:id", element: <ProtectedRoute><Profile></Profile></ProtectedRoute> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);         
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
