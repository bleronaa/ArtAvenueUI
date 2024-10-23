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
          <img className="h-56 rounded-lg object-cover md:w-56" src={`https://localhost:44340/${clientDetails.photo}`} alt="Client Photo" />
        </div>
        <div className="">
          <p className="text-xl font-medium mb-2 text-gray-700">{clientDetails.clientName} {clientDetails.clientLastName}</p>
          <div className="flex space-x-2">
            <div className="flex flex-col items-center rounded-xl bg-gray-100 px-4 py-2">
              <p className="text-sm font-medium text-gray-500">Total Sellings</p>
              <p className="text-3xl font-medium text-gray-600">{clientDetails.sellings}</p>
            </div>
            <div className="flex flex-col items-center rounded-xl bg-gray-100 px-4 py-2">
              <p className="text-sm font-medium text-gray-500">Total Bids</p>
              <p className="text-3xl font-medium text-gray-600">{clientDetails.totalBids}</p>
            </div>
            <div className="flex flex-col items-center rounded-xl bg-gray-100 px-4 py-2">
              <p className="text-sm font-medium text-gray-500">Current Bids</p>
              <p className="text-3xl font-medium text-gray-600">{clientDetails.currentBids}</p>
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
