
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../images/imglogo-removebg-preview (2).png';
import SignUp from './SignUp';
import axios from 'axios';
import toastr from 'toastr';
import axiosInstance from '../Axios';
import { useAuth } from '../../context';
import './MyArtItems.css/.'


const MyArtItems =()=>{

  const [showBids, setShowBids] = useState(true);

  const toggleView = () => {
    setShowBids(!showBids);
  };
  const authData=useAuth();
  const [data, setData] = useState({
    clientBids: [],
    clientSellings: []
  });
const navigate=useNavigate()
  const HandleViewClickButton = (artAuctionId) => {
  navigate(`/order/${artAuctionId}/false`);

    console.log()
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('userdata',authData)
        const response = await axiosInstance.post(`/ClientBid/getClientBidsSellings`,{
          clientId:authData.data.id
        });
        if (response.data) {
          setData(response.data);
          console.log('aa',response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData()
  }, []);
  

    return (

        <>
      <div style={{width:'100%',display:'flex',justifyContent:'end'}} >
  <button onClick={()=>toggleView()} class="relative mt-4 rounded-lg border-2 border-blue-700 bg-blue-700 px-6 py-2 font-medium text-white transition hover:translate-y-1">
    <div class="-scale-x-100 absolute left-0 -bottom-10 inline-flex h-10 w-10 -rotate-12 text-blue-700">
      <svg viewBox="0 0 82 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      </svg>
    </div>
    {showBids ? 'My Sellings' : 'My Bids'}
  </button>
  </div>
        <div className={showBids ? "myBids block" : "myBids hidden"}>

        <section class="bg-white py-12 text-gray-700 sm:py-16 lg:py-20">
       <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-md text-center">
      <h2 class="font-serif text-2xl font-bold sm:text-3xl">Your Bids</h2>
    </div>
    <div class="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
    {data.clientBids.map((item) => (
      <article key={item.id} class="relative flex flex-col overflow-hidden rounded-lg border">
        <div class="aspect-square overflow-hidden">
          <img class="h-full w-full object-cover transition-all duration-300 group-hover:scale-125" src={transformImagePath(item?.artItemImage ||'')} alt="" />
        </div>
        <div style={{maxHeight:'55px',Height:'55px'}} class="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
          <div class="mb-2 flex">
            <p class="mr-3 text-sm font-semibold"> {item.artItemName.length > 60 ? `${item.artItemName.substring(0, 60)}...` : item.artItemName}</p>
          </div>
          <h3 class="mb-2 text-sm text-gray-400">Your Bid:{item.bidPrice} </h3>
        </div>
        <button onClick={()=>HandleViewClickButton(item.artItemId)} class="group mx-auto mb-2 flex h-10 w-10/12 items-stretch overflow-hidden rounded-md text-gray-600">
          <div class="flex w-full items-center justify-center bg-gray-100 text-xs uppercase transition group-hover:bg-emerald-600 group-hover:text-white">View</div>
        </button>
      </article>
      
      
    ))}
      </div>
      </div>

        </section>

</div>
<div className={showBids ? "mySellings hidden" : "mySellings block"}>

<section class="bg-white py-12 text-gray-700 sm:py-16 lg:py-20">
<div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
<div class="mx-auto max-w-md text-center">
<h2 class="font-serif text-2xl font-bold sm:text-3xl">Your Sellings</h2>
</div>
<div class="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
{data.clientSellings.map((item) => (
  <article key={item.id} class="relative flex flex-col overflow-hidden rounded-lg border">
        <div class="aspect-square overflow-hidden">
          <img class="h-full w-full object-cover transition-all duration-300 group-hover:scale-125" src={transformImagePath(item?.artItemImage ||'')} alt="" />
        </div>
        <div style={{maxHeight:'55px',Height:'55px'}} class="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
          <div class="mb-2 flex">
            <p class="mr-3 text-sm font-semibold"> {item.artItemName.length > 60 ? `${item.artItemName.substring(0, 60)}...` : item.artItemName}</p>
          </div>
          <h3 class="mb-2 text-sm text-gray-400">Last Bid:{item.lastBidPrice} </h3>
        </div>
       <div className="relative group">
  <button
    onClick={() => HandleViewClickButton(item.artItemId)}
    className={`mx-auto mb-2 flex h-10 w-10/12 items-stretch overflow-hidden rounded-md text-gray-600 ${!item.approve ? 'cursor-not-allowed' : ''}`}
    disabled={!item.approve}
  >
    <div className={`flex w-full items-center justify-center bg-gray-100 text-xs uppercase transition ${item.approve ? 'group-hover:bg-emerald-600 group-hover:text-white' : ''}`}>
      Approve
    </div>
  </button>
  {!item.approve && (
    <div className=" absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-3 py-2 bg-black text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
      Auction has not yet been over <br/>
       Or no bid has been submited
    </div>
  )}
</div>
      </article>
))}
</div>
</div>

</section>

</div>
</>
    )
}
const transformImagePath = (path) => {
  if (!path) return ''; // Return an empty string or a default image URL if path is undefined
  const baseURL = 'https://localhost:44340/ArtItem-photos/';
  const fileName = path.split('\\').pop(); // Extract the filename from the path
  return `${baseURL}${fileName}`;
};
export default MyArtItems;