import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import SubmitButton from "../components/SubmitButton/SubmitButton";
import { useLogin } from "../api/authApi";

export default function Login(){
    const {login} = useLogin();
    const {setAccessToken} = useAuth()
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const submitAction = async (formData) => {
      const data = Object.fromEntries(formData);

      try {
        const response = await login(data);
        if(!response.accessToken){
          setError(response.message);
          setTimeout(() => setError(""), 3000);
          return
        }
        
        setAccessToken(response.accessToken);
        navigate("/");

      } catch (e) {
        setError("Something went wrong. Please try again later.");
      }

    }
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-gray-200">
          <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h1>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            
            <form action={submitAction} className="space-y-8">
              <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      Email
                  </label>
                  <input 
                  type="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter a email"
                  autoComplete="email"
                  required
                  />
              </div>
              <div>
                  <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                      Password
                  </label>
                  <input 
                      type="password" 
                      name="password" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your password"
                      autoComplete="password"
                      required
                  />
              </div>
    
              <div className="flex justify-center">
                <SubmitButton btnText="Login"/>
              </div>
            </form>
    
            <div className="mt-6 text-center text-gray-600">
              <p>
                Don't have an account?
                <Link to="/register" className="text-blue-500 hover:text-blue-700 ml-1">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      );
}