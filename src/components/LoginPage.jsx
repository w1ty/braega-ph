import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoginPage = ({ setUserRole }) => {
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [logins, setLogins] = useState([]);

  useEffect(() => {
    const fetchLogins = async () => {
      try {
        const response = await axios.get('https://braega-ph.onrender.com/api/logins');
        setLogins(response.data);
      } catch (error) {
        console.error('Error fetching login data:', error);
      }
    };

    fetchLogins();
  }, []);

  const handleLogin = () => {
    const user = logins.find(
      (login) => login.employee_number === employeeNumber && login.password === password
    );

    if (user) {
      setUserRole(user.role || 'user');
    } else {
      setMessage('رقم التوظيف أو كلمة المرور غير صحيحة.');
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-between"
      dir="rtl"
      style={{
        backgroundImage: 'url(/bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container mx-auto flex flex-col items-center justify-center flex-grow" style={{ marginTop: '5%' }}>
        <div className="w-full max-w-3xl">
          <div className="bg-white rounded shadow-md p-8 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 w-full flex flex-col items-center mb-6 md:mb-0">
              <img src="logo.png" alt="Logo" className="rounded mb-4" style={{ width: 200 }} />
              <img src="loginpic.png" alt="Login" className="rounded" style={{ width: 120 }} />
            </div>
            <div className="md:w-1/2 w-full flex flex-col items-center">
              <h1 className="text-2xl font-bold mb-6 text-center">تسجيل دخول</h1>
              <form
                className="w-full"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
              >
                <input
                  type="text"
                  placeholder="رقم التوظيف"
                  value={employeeNumber}
                  onChange={(e) => setEmployeeNumber(e.target.value)}
                  className="form-control w-full mb-3 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 text-right"
                  required
                />
                <input
                  type="password"
                  placeholder="كلمة المرور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control w-full mb-3 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 text-right"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 font-bold text-lg"
                >
                  تسجيل دخول
                </button>
              </form>
              <p className="text-center text-red-500 mt-4" role="alert">{message}</p>
              <div className="text-center mt-3">
                <a href="#" className="text-blue-600 hover:underline">إعادة تعيين كلمة المرور</a>
              </div>
            </div>
          </div>
          {/* Warning Alert */}
          <div className="mt-6">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <div className="flex items-center mb-2">
                <img src="warning.png" alt="Warning" className="w-6 h-6 ml-2" />
                <span className="font-bold">ملاحظات هامة:</span>
              </div>
              <ul className="list-disc pr-6">
                <li>كل مستخدم للنظام مسؤول مسؤلية كاملة عن كلمة المرور الخاصة به وعليه اتخاذ كافة الإحتياطات الممكنة حتى لا يستطيع أي شخص آخر الحصول عليها.</li>
                <li>يتحمل المستخدم كافة عمليات الإدخال والتعديل والحذف أو أي أشياء أخرى تتم عن طريق حسابه الخاص به.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="footer bg-white py-2 text-center border-t">
        <div className="p-footer text-gray-600">برمجة و تصميم © منسقية الأتصلات السلكية </div>
      </footer>
    </div>
  );
};

export default LoginPage;