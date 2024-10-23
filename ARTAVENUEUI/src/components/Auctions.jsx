import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, Dropdown } from "flowbite-react";
import AuctionTimer from "./AuctionTimer"; // Import the updated AuctionTimer component
import "./Auctions.css";
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import StartTimeIcon from '@mui/icons-material/EventAvailableOutlined';
import EndTimeIcon from '@mui/icons-material/EventBusyOutlined';
import { CircularProgress } from '@mui/material';
import Preloader from "./Preloader";
import en from './en.json';
import al from './al.json';
import { useLanguage} from './LanguageContext';


const AuctionList = () => {
  const [auctions, setAuctions] = useState([]);
  const [upcomingAuctions, setUpcomingAuctions] = useState([]);
  const [openedAuctionsMessage, setOpenedAuctionsMessage] = useState("");
  const [upcomingAuctionsMessage, setUpcomingAuctionsMessage] = useState("");
  const [preloader, setPrelaoder]=useState(true);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const translations = language === 'en' ? en : al;

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44340/api/Auction/getAuctionList"
        );
        if (
          response.data &&
          response.data.auctionList.length > 0 &&
          Array.isArray(response.data.auctionList)
        ) {
          setAuctions(response.data.auctionList);
          setOpenedAuctionsMessage("");
        } else {
          setAuctions([]);
          setOpenedAuctionsMessage("No opened auctions found.");
        }
      } catch (error) {
        console.error("Error fetching auction data:", error);
        setAuctions([]);
        setOpenedAuctionsMessage("Error fetching opened auction data.");
      }finally{
        setPrelaoder(false);
      }
    };

    const fetchUpcomingAuctions = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44340/api/Auction/getAuctionListUnPublished"
        );
        if (
          response.data &&
          response.data.auctionList.length > 0 &&
          Array.isArray(response.data.auctionList)
        ) {
          setUpcomingAuctions(response.data.auctionList);
          setUpcomingAuctionsMessage("");
        } else {
          console.error("API response is not an array:", response.data);
          setUpcomingAuctions([]);
          setUpcomingAuctionsMessage("No upcoming auctions found.");
        }
      } catch (error) {
        console.error("Error fetching upcoming auction data:", error);
        setUpcomingAuctions([]);
        setUpcomingAuctionsMessage("Error fetching upcoming auction data.");
      }
    };

    fetchAuctions();
    fetchUpcomingAuctions();
  }, []);

  const handleOpenButtonClick = (auctionId) => {
    navigate(`/auction/${auctionId}`);
  };
  if(preloader){
    return ( <div className="preloader-container">
      <Preloader />
    </div>)
  }
  return (
    <div className="auction-list-container">
      <h1 className="auction-list-header">{translations.OpenedAuctions}</h1>
      <div className="auctions-wrapper">
        {auctions.map((auction) => (
          <Card className="max-w-sm" key={auction.auctionId} id="OpenedAuctionCard">
            <div className="flex justify-between px-4 pt-4 mb-4">
            <span className="text-sm  text-green-500 dark:text-green-400">
             <HourglassEmptyOutlinedIcon/> <AuctionTimer endTime={auction.auctionEndDate} />
              </span>
           
            </div>
          
            <div className="flex flex-col items-center pb-10">
              <img
                style={{ height: "155px" }}
                alt="Auction image"
                height="auto"
                src={auction.auctionImage}
                width="200"
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-black">
                {auction.auctionName}
              </h5>
              <div style={{display:'flex',flexDirection:'column',gap:'5px'}}>
              <span className="text-sm text-gray-500 dark:text-gray-400">
               <StartTimeIcon style={{color:'#90ef90'}}/> Start Time: {new Date(auction.auctionStartDate).toLocaleString()}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
              <EndTimeIcon style={{color:'#fa6b84'}}/>  End Time: {new Date(auction.auctionEndDate).toLocaleString()}
              </span>
              </div>
           
             
              <div className="mt-4 flex space-x-3 lg:mt-6 open-button">
                <a
                  onClick={() => handleOpenButtonClick(auction.auctionId)}
                  className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                >
                  Open Auction
                </a>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <h1 className="auction-list-header">{translations.UpcomingAuctions}</h1>
      <div className="auctions-wrapper">
        {upcomingAuctions.map((auction) => (
       <Card className="max-w-sm" key={auction.auctionId} id="OpenedAuctionCard">
       <div className="flex justify-between px-4 pt-4 mb-4">
       <span className="text-sm  text-green-500 dark:text-green-400">
           Time Remaining: <AuctionTimer endTime={auction.auctionEndDate} />
         </span>
       </div>
     
       <div className="flex flex-col items-center pb-10">
         <img
           style={{ height: "155px" }}
           alt="Auction image"
           height="auto"
           src={auction.auctionImage}
           width="200"
         />
         <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-black">
           {auction.auctionName}
         </h5>
         <div style={{display:'flex',flexDirection:'column',gap:'5px'}}>
         <span className="text-sm text-gray-500 dark:text-gray-400">
         <StartTimeIcon style={{color:'#90ef90'}}/> Start Time: {new Date(auction.auctionStartDate).toLocaleString()}
         </span>
         <span className="text-sm text-gray-500 dark:text-gray-400">
         <EndTimeIcon style={{color:'#fa6b84'}}/>   End Time: {new Date(auction.auctionEndDate).toLocaleString()}
         </span>
        </div>
         <div className="mt-4 flex space-x-3 lg:mt-6 open-button">
           <a
             onClick={() => handleOpenButtonClick(auction.auctionId)}
             className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
           >
             Open Auction
           </a>
         </div>
       </div>
     </Card>
        ))}
      </div>
    </div>
  );
};

export default AuctionList;
