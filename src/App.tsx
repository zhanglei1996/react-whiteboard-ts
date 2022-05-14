import React from 'react';
import { useAuth } from './context/auth';
import AuthenticationApp from './pages/authentication-app';
import UnAuthenticationApp from './pages/unauthentication-app';

function App() {

  const { user } = useAuth()

  return (
    <div className="App">
      { user ? <AuthenticationApp /> : <UnAuthenticationApp />} 
    </div>
  );
}

export default App;
