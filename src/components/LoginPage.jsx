import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = ({ setUserRole }) => {
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/api/logins');
      const user = data.logins.find(
        (login) => login.employeeNumber === employeeNumber && login.password === password
      );

      if (user) {
        setUserRole(user.role || 'user');
      } else {
        setMessage('Invalid employee number or password.');
      }
    } catch (error) {
      console.error('Error fetching login data:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <div className="flex justify-center mb-4">
          <img src="/public/logo.png" alt="Logo" className="h-16" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className="mb-4">
            <label htmlFor="employee-number" className="block text-gray-700 mb-2">الرقم الوظيفي:</label>
            <input
              id="employee-number"
              type="text"
              value={employeeNumber}
              onChange={(e) => setEmployeeNumber(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">كلمة السر:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <p className="text-center text-red-500 mt-4" role="alert">{message}</p>
      </div>
    </div>
  );
};

export default LoginPage;