import React, { useState } from 'react'
import axios from 'axios';
import { useAuth } from '../Context/AuthContext.jsx';
import { useNavigate } from 'react-router';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", { email, password });

        if (response.data.success) {
          await login(response.data.user, response.data.token);
          if (response.data.user.role === 'admin') {
            navigate('/admin/dashboard');
          } else {
            navigate('/customer/dashboard');
          }
        } else {
          alert(response.data.error);
        }

    } catch (error) {
      if(error.response){
        setError(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-pink-600 from-50% to-sky-600 to-50% space-y-6"> 
      <h2 className="text-3xl text-white">Seven Hills Store Inventory</h2>
      <div className="border shadow-lg p-6 w-80 bg-white">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && (<div className="bg-red-300 text-red-800 p-2 mb-4 rounded">{error}</div>)}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input type="text" className="w-full px-3 py-2 border" name="email" placeholder="Enter Email / Username" onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input type="password" className="w-full px-3 py-2 border" placeholder="Enter Password" name="password" onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="mb-4">
            <button type="submit" className="w-full bg-green-600 text-white py-2">
              {loading ? 'Loading...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )

}

export default Login