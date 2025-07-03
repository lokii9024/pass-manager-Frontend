import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Hero from './Pages/Hero.tsx'
import HowItWorksPage from './Pages/HowItWorksPage.tsx'
import {SignIn} from './Pages/SignIn.tsx'
import { SignUp } from './Pages/SignUp.tsx'
import Dashboard from './Pages/dashboard.tsx'
import AuthLayout from './components/authLayout.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <Hero />
      },
      {
        path: "/",
        element: <Hero/>
      },
      {
        path: "howItWorks",
        element: <HowItWorksPage/>
      },
      {
        path: "signin",
        element: <SignIn />
      },
      {
        path: "signup",
        element: <SignUp />
      },
      {
        path: "dashboard/:slug",
        element: (
          <AuthLayout>
            <Dashboard/>
          </AuthLayout>
        ),
      }
    ]
  }

])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
