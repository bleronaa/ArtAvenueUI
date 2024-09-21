import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../Axios';
import BasicTabs from './Tabs';
import Footer from './Footer';

const Profile = () => {
  // Initialize state
  const [clientDetails, setClientDetails] = useState({});
  
  // Extract clientId from useParams
  const { clientId } = useParams();

  // Fetch client details when component mounts
  useEffect(() => {
    if (clientId) {
      fetchClientDetails();
    }
  }, [clientId]);

  // Fetch client details function
  const fetchClientDetails = async () => {
    try {
      const response = await axiosInstance.get(`/Client/getClientDetails?clientId=${clientId}`);
      console.log(response);
      setClientDetails(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <div className="mx-auto my-10 flex max-w-xs flex-col items-center rounded-xl border px-4 py-4 text-center md:max-w-lg md:flex-row md:items-start md:text-left">
        <div className="mb-4 md:mr-6 md:mb-0">
          <img className="h-56 rounded-lg object-cover md:w-56" src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60" alt="" />
        </div>
        <div className="">
          <p className="text-xl font-medium text-gray-700">{clientDetails.clientName}</p>
          <p className="mb-4 text-sm font-medium text-gray-500">Senior Editor</p> 
          <div className="flex space-x-2">
            <div className="flex flex-col items-center rounded-xl bg-gray-100 px-4 py-2">
              <p className="text-sm font-medium text-gray-500">Articles</p>
              <p className="text-3xl font-medium text-gray-600">13</p>
            </div>
            <div className="flex flex-col items-center rounded-xl bg-gray-100 px-4 py-2">
              <p className="text-sm font-medium text-gray-500">Papers</p>
              <p className="text-3xl font-medium text-gray-600">7</p>
            </div>
            <div className="flex flex-col items-center rounded-xl bg-gray-100 px-4 py-2">
              <p className="text-sm font-medium text-gray-500">Followers</p>
              <p className="text-3xl font-medium text-gray-600">2.5k</p>
            </div>
            <div className=""></div>
          </div>
          <div className="mb-3"></div>
        </div>
      </div>

      <BasicTabs clientDetails={clientDetails} />

      <Footer />
    </>
  );
};

export default Profile;
