import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../Axios';
import toastr from 'toastr';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    try {
      const response = await axiosInstance.post(`/Client/forgotPasswordRequest?email=${email}`);
      if(response.data.success){
        toastr.success(`${response.data.message}`)
        navigate('LogIn');
      }else{
        toastr.error(`${response.data.message}`)
      }
    } catch (error) {
      console.error('Error changing password:', error);
      toastr.error(`${error}`)


      // Handle error response
    }
  };

  return (
    <div className="p-5">
      <form onSubmit={handleSubmit} className="flex w-96 flex-col space-y-5 rounded-lg border py-10 px-5 shadow-xl mx-auto">
        <div className="mx-auto mb-2 space-y-3">
          <h1 className="text-3xl font-bold text-gray-700">Forgot Password</h1>
        </div>

        <div>
          <div className="relative mt-2 w-full">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
              placeholder=" "
            />
            <label
              htmlFor="currentpassword"
              className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
            >
              Your Email
            </label>
          </div>
        </div>

     

        <button type="submit" className="rounded-lg bg-blue-600 py-3 font-bold text-white">Send Email</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
