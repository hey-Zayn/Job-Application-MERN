import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, useLocation } from "react-router-dom";
import Navbar from "./components/shared/Navbar.jsx";
import { Toaster } from "@/components/ui/sonner";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from "./redux/store.js";
import Footer from "./components/shared/Footer.jsx";
import FooterBottom from "./components/shared/FooterBottom.jsx";

// Component to conditionally render navbar and footer
const Layout = ({ children }) => {
  const location = useLocation();
  
  // Define routes where navbar and footer should be hidden
  const hideNavbarFooterRoutes = [
    '/dashboard',
    '/register-company',
    '/recruiter/dashboard',
    '/recruiter/jobs',
    '/recruiter/candidates',
    '/recruiter/applications',
    '/recruiter/interviews',
    '/recruiter/company',
    '/recruiter/analytics',
    '/recruiter/messages',
    '/recruiter/notifications',
    '/recruiter/settings',
    '/recruiter/help'
  ];

  // Check if current path starts with any of the hide routes
  const shouldHideNavbarFooter = hideNavbarFooterRoutes.some(route => 
    location.pathname.startsWith(route)
  );

  return (
    <>
      {!shouldHideNavbarFooter && <Navbar />}
      {children}
      {!shouldHideNavbarFooter && (
        <>
          <Footer />
          <FooterBottom />
        </>
      )}
      <Toaster />
    </>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout>
            <App />
          </Layout>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);