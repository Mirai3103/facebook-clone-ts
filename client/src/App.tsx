import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import AuthProvider from './Contexts/Auth';
import ToastProvider from './Contexts/Toast';
import { ChatProvider } from './Contexts/Chat';
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <ToastProvider>
          <ChatProvider>
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          </ChatProvider>
        </ToastProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
