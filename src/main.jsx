import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useState } from 'react';

import LoginPage from './components/LoginPage';
import App from './App';

const Main = () => {
  const [userRole, setUserRole] = useState(null);

  return (
    userRole ? <App userRole={userRole} /> : <LoginPage setUserRole={setUserRole} />
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Main />
  </StrictMode>,
);
