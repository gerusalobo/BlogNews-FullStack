import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Homepage from './routes/Homepage.jsx'
import PostlistPage from './routes/PostListPage.jsx'
import LoginPage from './routes/LoginPage.jsx'
import RegisterPage from './routes/RegisterPage.jsx'
import AboutPage from './routes/AboutPage.jsx'
import Write from './routes/Write.jsx'
import MainLayout from './layouts/MainLayout.jsx'
import { ClerkProvider } from "@clerk/clerk-react";

// Import Clerk Public Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const router = createBrowserRouter ([
  {
    element: <MainLayout/>,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/posts",
        element: <PostlistPage />
      },
      {
        path: "/:slug",
        element: <Homepage />
      },
      {
        path: "/write",
        element: <Write />
      },
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/register",
        element: <RegisterPage />
      },
      {
        path: "/about",
        element: <AboutPage />
      },
    ]
  }
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>,
)