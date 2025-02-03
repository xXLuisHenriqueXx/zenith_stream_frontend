import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import AdminLogin from "./pages/Admin/Login";
import NotFound from "./pages/NotFound";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/admin/login",
      element: <AdminLogin />
    },
    {
      path: "*",
      element: <NotFound />
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;