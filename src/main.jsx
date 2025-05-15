import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useState } from 'react';

import LoginPage from './components/LoginPage';
import App from './App';
import AdminControlPanel from './components/AdminControlPanel';

const Main = () => {
  const [userRole, setUserRole] = useState(null);

  return (
    userRole === 'admin' ? <AdminControlPanel /> : userRole ? <App userRole={userRole} /> : <LoginPage setUserRole={setUserRole} />
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Main />
  </StrictMode>,
);
