import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Hero from "./Pages/Hero.tsx";
import HowItWorksPage from "./Pages/HowItWorksPage.tsx";
import { SignIn } from "./Pages/SignIn.tsx";
import { SignUp } from "./Pages/SignUp.tsx";
import Dashboard from "./Pages/dashboard.tsx";
import AuthLayout from "./components/authLayout.tsx";
import AddPass from "./Pages/AddPass.tsx";
import EditPass from "./Pages/EditPass.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <Hero />,
      },
      {
        path: "/",
        element: <Hero />,
      },
      {
        path: "howItWorks",
        element: <HowItWorksPage />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "dashboard/:slug",
        element: (
          <AuthLayout>
            <Outlet />
          </AuthLayout>
        ),
        children: [
          {
            path: "",
            element: <Dashboard/>
          },
          {
            path: "update-pass/:id",
            element: <EditPass/>
          },
          {
            path: "add-pass",
            element: <AddPass/>
          }
        ]
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
