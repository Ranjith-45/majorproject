import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DesignProvider } from './context/DesignContext.jsx'

import { GoogleOAuthProvider } from "@react-oauth/google";

import { GoogleLoginProvider } from './context/GoogleLoginContext.jsx'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from "./reducer";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './context/AuthContext.jsx'

const googleClientId = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;

const store = configureStore({
  reducer: rootReducer,
});


createRoot(document.getElementById('root')).render(

  <GoogleOAuthProvider clientId={googleClientId}>

    <Provider store={store}>

    

  
  <DesignProvider>
  <StrictMode>
     <GoogleLoginProvider>

      <AuthProvider>

      <BrowserRouter>

     
        <App />
      </BrowserRouter>
      </AuthProvider>
      </GoogleLoginProvider>
  </StrictMode>
  </DesignProvider>
  

  </Provider>
  </GoogleOAuthProvider>
  ,
)
