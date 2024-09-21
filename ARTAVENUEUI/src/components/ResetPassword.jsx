import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import axiosInstance from '../Axios';
import toastr from 'toastr';


const ResetPassword = () => {
    const [searchParams] = useSearchParams(); // Get search params from the hook
  const [token, setToken] = useState('');
    useEffect(() => {
        // Get the token from query params
        const tokenParam = searchParams.get('token');
        if (tokenParam) {
          setToken(tokenParam);
            }});

  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    if (newPassword !== confirmNewPassword) {
      toastr.error("Password do not match."); // Assuming you have toastr installed and configured
      return;
    }
   
    try {
      const response = await axiosInstance.post('/Client/resetPassoword', {
        password: newPassword,
        confirmPassword: confirmNewPassword,
        token,
      });
      if(response.data.success){
        toastr.success(`${response.data.message}`)
        navigate('/');
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
          <h1 className="text-3xl font-bold text-gray-700">Reset Password</h1>
        </div>

    

        <div>
          <div className="relative mt-2 w-full">
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
              placeholder=" "
            />
            <label
              htmlFor="newPassword"
              className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
            >
              New Password
            </label>
          </div>
        </div>

        <div>
          <div className="relative mt-2 w-full">
            <input
              type="password"
              id="confirmNewPassword"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
              placeholder=" "
            />
            <label
              htmlFor="confirmNewPassword"
              className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
            >
              Confirm New Password
            </label>
          </div>
        </div>

        <button type="submit" className="rounded-lg bg-blue-600 py-3 font-bold text-white">Save</button>
      </form>
    </div>
  );
};

export default ResetPassword;
