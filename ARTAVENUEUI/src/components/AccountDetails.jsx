import React from 'react';
import { useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IoEarthOutline, IoCalculator } from "react-icons/io5";
import Signature from '../images/violinsignature.png';
// import './profile.css';
import Footer from './Footer';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Slide } from 'react-slideshow-image';
import CustomCarousel from './custom.slider';
import axiosInstance from '../Axios';
import BasicTabs from './Tabs';
import ToggleButton from 'react-toggle-button'
import toastr from 'toastr';


const Account = ({ clientDetails }) => {
  const [clientName, setClientName] = useState(clientDetails.clientName || '');
  const [clientLastName, setClientLastName] = useState(clientDetails.clientLastName || '');
  const [email, setEmail] = useState(clientDetails.email || '');
  const [phone, setPhone] = useState(clientDetails.phone || '');
  const [address, setAddress] = useState(clientDetails.address || '');
  const [isNotified, setIsNotified] = useState(clientDetails.address || '');
const {clientId}=useParams();
  useEffect(() => {
    setClientName(clientDetails.clientName || '');
    setClientLastName(clientDetails.clientLastName || '');
    setEmail(clientDetails.email || '');
    setPhone(clientDetails.phone || '');
    setAddress(clientDetails.address || '');
    setIsNotified(clientDetails.isNotified || false);

  }, [clientDetails]);

    const  handleSaveButton= async ()=>{
      try{
        const response= await axiosInstance.put('/Client/editClientRequest',{
          clientId:clientId,
         firstName:clientName,
          lastName:clientLastName,
             email:email,
           phoneNumber:phone,
           address:address,
           isNotified:isNotified,
        });
        console.log(response.data.success)
          if(response.data.success){
            toastr.success(`${response.data.message}`)
          }else{
            toastr.error(`${response.data.message}`)
          }
      }
      catch (error){
        toastr.error(`${error}`)
        
      }

 
}
  return (
    <div className="my-4 max-w-screen-md border px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4 md:mx-auto">
      <div className="flex flex-col border-b py-4 sm:flex-row sm:items-start">
        <div className="shrink-0 mr-auto sm:py-3">
          <p className="font-medium">Account Details</p>
          <p className="text-sm text-gray-600">Edit your account details</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
        <p className="shrink-0 w-32 font-medium">Name</p>
        <input 
          placeholder="First Name" 
          value={clientName} 
          onChange={(e) => setClientName(e.target.value)} 
          className="mb-2 w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 sm:mr-4 sm:mb-0 focus:ring-1" 
        />
        <input 
          placeholder="Last Name" 
          value={clientLastName} 
          onChange={(e) => setClientLastName(e.target.value)} 
          className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1" 
        />
      </div>
      <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
        <p className="shrink-0 w-32 font-medium">Email</p>
        <input 
          placeholder="your.email@domain.com" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1" 
        />
      </div>
      <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
        <p className="shrink-0 w-32 font-medium">Phone</p>
        <input 
          placeholder="Phone" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
          className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1" 
        />
      </div>
      <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
        <p className="shrink-0 w-32 font-medium">Address</p>
        <input 
          placeholder="Address" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
          className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1" 
        />
      </div>
      <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
      <p className="shrink-0 w-32 font-medium">Get Notified </p>

      <ToggleButton
  value={ isNotified}
   onToggle={() => 
    setIsNotified(!isNotified)
   } />
      </div>
      <div className="mt-4 d-flex justify-end">
        <button className="mr-2 hidden rounded-lg border-2 px-4 py-2 font-medium text-gray-500 sm:inline focus:outline-none focus:ring hover:bg-gray-200">Cancel</button>
        <button onClick={()=>handleSaveButton()} className="hidden rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white sm:inline focus:outline-none focus:ring hover:bg-blue-700">Save</button>
      </div>
    </div>
  );
}

export default Account;
