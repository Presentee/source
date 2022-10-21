import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';
import { Auth0Provider } from "@auth0/auth0-react";



// hook to root div
ReactDOM.render(
    <Auth0Provider
        domain="dev-zrs73ejes7e1f4s8.us.auth0.com"
        clientId="1N87KEfws2VLO4GgHCw35WU9orBHzI9X"
        redirectUri={window.location.origin}
    >
    <ContextProvider>
        <App />
    </ContextProvider> 
    </Auth0Provider>,
    document.getElementById('root')
);