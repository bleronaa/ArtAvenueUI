import React from 'react';
import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {IoEarthOutline, IoCalculator} from "react-icons/io5";
import Signature from '../images/violinsignature.png';
import './Order.css';
import Footer from './Footer';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {Slide} from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import CustomCarousel from './custom.slider';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import PaymentIcon from '@mui/icons-material/Payment';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axiosInstance from '../Axios';
import TextField from '@mui/material/TextField';
import {useAuth} from '../../context';
import {Button} from "@material-tailwind/react";
import toastr from 'toastr';
import StraightenIcon from '@mui/icons-material/Straighten';
import en from './en.json';
import al from './al.json';
import {useLanguage} from './LanguageContext';

const Order = () => {

    const location = useLocation();
    const {artAuctionId, fromBuyComponent} = useParams();
    const isFromBuyComponent = fromBuyComponent === 'true';
    const image = location.state
        ?.image || {};
    const [fetchItemNow,
        setFetchItemNow] = useState({images: []});
    const [error,
        setError] = useState('');
    const [isLoggedInClient,
        setIsLoggedInClient] = useState(false);
    const [isLoading,
        setIsLoading] = useState(false);
    const [isOpen,
        setIsOpen] = useState(false);
    const {language} = useLanguage();
    const translations = language === 'en'
        ? en
        : al;
    const [bid,
        setBid] = useState(0);
    const auth = useAuth()

    const toggleBreakdown = () => {
        setIsOpen(!isOpen);
    };

    async function handleBidButton() {
        try {
            setIsLoading(true);
            const response = await axiosInstance.post('/ClientBid/addClientBid', {
                artAuctionId: artAuctionId,
                bidAmount: bid,
                clientId: auth.data.id
            });
            if (response.data.success) {
                toastr.success(`${response.data.message}`)
                setIsLoading(false);
            } else {
                toastr.error(`${response.data.message}`)
                setIsLoading(false);

            }
            console.log('Bid submitted successfully:', response.data);
        } catch (error) {
            // Handle error (for example, display an error message)
            toastr.error('Error submitting bid');
            setIsLoading(false);

        }
    }

    useEffect(() => {
        const fetchItemBuyNow = async() => {
            try {
                const response = await axios.post(`https://localhost:44340/api/ArtItem/getArtItemDetails/${artAuctionId}`);
                if (response.data) {
                    console.log(response.data);
                    setFetchItemNow(response.data);
                }

            } catch (error) {
                setError(error.message || 'Error fetching auction details');
                console.log(error);
            }
        };

        fetchItemBuyNow();
    }, []);
    const TAX_RATE = 0.18;
    const BIDBRUSH_FEE_RATE = 0.03;

    // Ensure validBid is always a number
    const validBid = Number(bid) || 0;

    // Calculate tax and fee
    const tax = validBid * TAX_RATE;
    const bidBrushFee = validBid * BIDBRUSH_FEE_RATE;
    const total = validBid + tax + bidBrushFee;
    useEffect(() => {
        console.log('aaa', isFromBuyComponent)
        const fetchLoggedInClient = async() => {
            try {
                const response = await axiosInstance.get('/Client/getCurrentlyLoggedInClient');
                if (response.data) {
                    console.log('test', response);
                    setIsLoggedInClient(true);
                } else {
                    setIsLoggedInClient(false);
                    console.log('test', response);

                }
            } catch (error) {
                console.error('Error fetching logged in client data:', error);
                setIsLoggedInClient(false); // Set to false if there's an error
            }
        };

        fetchLoggedInClient();
    }, []);

    return ( <> <div className="order-container">
        <div key={fetchItemNow.id} className="order-image">
            <CustomCarousel>
                {fetchItemNow
                    .images
                    .map((image, index) => {
                        return <img
                            key={index}
                            src={transformImagePath(image.photoFormat)}
                            alt={image.caption}/>;
                    })}
            </CustomCarousel>
            <div className="order-details flex gap-20">
                <div class="overflow-hidden rounded-md border bg-white">
                    <div class="bg-gray-100 py-3">
                        <p class="text-center font-medium text-gray-500">Details</p>
                    </div>
                    <div class="mt-4 mb-10 px-6 lg:px-14">
                        <div class="">
                            <h2 class="max-w-md text-center text-lg text-gray-500">{fetchItemNow.artName}</h2>
                        </div>
                        <div class="mt-6 flex flex-col items-center">
                            <p class="mt-1 text-sm text-gray-400">Description: {fetchItemNow
                                    ?.description}</p>
                        </div>
                        <div class="mx-auto mt-8 flex w-60 flex-col space-y-4">
                            <div class="flex items-center space-x-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="inline h-7 w-7 rounded-full bg-blue-100 p-1 text-blue-500">
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"></path>
                                </svg>
                                <span class="text-sm text-gray-500">Category: {fetchItemNow
                                        ?.categoryName}</span>
                            </div>
                            <div class="flex items-center space-x-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="inline h-7 w-7 rounded-full bg-blue-100 p-1 text-blue-500">
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"/>
                                </svg>

                                <span class="text-sm text-gray-500">Artist: {fetchItemNow
                                        ?.firstArtist}</span>
                            </div>

                            <div class="flex items-center space-x-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="inline h-7 w-7 rounded-full bg-blue-100 p-1 text-blue-500">
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"/>
                                </svg>

                                <span class="text-sm text-gray-500">Year: {fetchItemNow
                                        ?.year}</span>
                            </div>

                            <div class="flex items-center space-x-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="inline h-7 w-7 rounded-full bg-blue-100 p-1 text-blue-500">
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"/>
                                </svg>
                                <span class="text-sm text-gray-500">Note: {fetchItemNow
                                        ?.note}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div className="order-info">
            <h1 className='image-name'>{image.text || ''}</h1>

            <div
                style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center'
            }}>
                <p>Your Bid:</p>
                <TextField
                    id="filled-number"
                    label="Price"
                    type="number"
                    variant="filled"
                    style={{
                    width: '80%'
                }}
                    slotProps={{
                    inputLabel: {
                        shrink: true
                    }
                }}
                    onChange={(e) => setBid(e.target.value)}/>
            </div>

            <hr className='hrline'/>
            <div className='price'>
                <p>{isFromBuyComponent
                        ? 'Price:'
                        : 'Start Price:'}</p>
                {isFromBuyComponent
                    ? (fetchItemNow.buyimmediatelyPrice + '€' || '')
                    : (fetchItemNow.startPrice + '€' || fetchItemNow.startPrice)}
            </div>

            <button
                className={`add-to-bag-button ${ !isLoggedInClient
                ? 'disabled-button'
                : ''}`}
                disabled={!isLoggedInClient}
                onClick={() => handleBidButton()}>
                {isLoading
                    ? (
                        <div role="status">
                            <svg
                                aria-hidden="true"
                                class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"/>
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"/>
                            </svg>
                            <span class="sr-only">Loading...</span>
                        </div>

                    )
                    : ('Place Bid' // Show "Place Bid" when not loading
                    )}
            </button>

            {!isLoggedInClient && (
                <p className="login-message">You need to be logged in to place a bid.</p>
            )}
            <div className='shipping'>
                <div className='info-logo'>
                    <IoEarthOutline/>
                </div>
                <div className='info-text'>
                    <h4>International shipping not available</h4>
                    <h5>Customs duties and taxes may apply.</h5>
                </div>
            </div>
            <div className='shipping'>
                <div className='info-logo'>
                    <IoCalculator/>
                </div>
                <div className='info-text'>
                    <h4>Taxes not included</h4>
                    <h5>VAT and other taxes are not reflected in the listed pricing.</h5>
                </div>
            </div>
            <button onClick={toggleBreakdown} className="toggle-button">
                <span
                    className={`arrow ${isOpen
                    ? 'up'
                    : 'down'}`}></span>
                {isOpen
                    ? 'Hide Total with Taxes and Fees'
                    : 'Show Total with Taxes and Fees'}
            </button>
            <div
                className={`breakdown-section ${isOpen
                ? 'show'
                : 'hide'}`}>
                <div className="breakdown-item">
                    <span>
                        <span
                            style={{
                            color: '#f3eee2'
                        }}>
                            <PaymentIcon/></span>
                        <strong>
                            My Price:</strong>
                    </span>
                    <span>€{validBid.toFixed(2)}</span>
                </div>
                <div className="breakdown-item">
                    <span>
                        <span
                            style={{
                            color: '#f3eee2 ',
                            fontFamily: 'Roboto, sans-serif'
                        }}><FactCheckIcon/></span>
                        <strong>
                            Tax (18%):</strong>
                    </span>
                    <span>€{tax.toFixed(2)}</span>
                </div>
                <div className="breakdown-item">
                    <span>
                        <span
                            style={{
                            color: '#f3eee2 '
                        }}><FactCheckIcon/></span>
                        <strong>
                            BidBrush Fee (3%):</strong>
                    </span>
                    <span>€{bidBrushFee.toFixed(2)}</span>
                </div>
                <hr className="breakdown-separator"/>
                <div className="breakdown-item breakdown-total">
                    <span>
                        <span
                            style={{
                            color: '#f3eee2'
                        }}><ShoppingCartIcon/></span>
                        <strong>Total:</strong>
                    </span>
                    <span>€{total.toFixed(2)}</span>
                </div>
            </div>
            <div style={{
                marginTop: 'auto'
            }} className='unit'>
                <div class="my-10 max-w-xs rounded-xl bg-pink-100 px-6 py-8 text-pink-800">
                    <p class="mb-2 text-2xl font-medium">Dimensions</p>
                    <p class="mb-6">The dimensions for this art item are in
                        <b>{fetchItemNow.unit}</b>
                        .</p>
                    <div class="mb-6 space-y-2">
                        <div class="flex space-x-2 font-medium">
                            <span class="text-blue-600">
                                <StraightenIcon/>
                            </span>
                            <span>Height: {fetchItemNow.framedHeight}</span>
                        </div>
                        <div class="flex space-x-2 font-medium">
                            <span class="text-blue-600">
                                <StraightenIcon/>
                            </span>
                            <span>Width: {fetchItemNow.framedWidth}</span>
                        </div>
                        <div class="flex space-x-2 font-medium">
                            <span class="text-blue-600">
                                <StraightenIcon/>

                            </span>
                            <span>Depth: {fetchItemNow.framedDepth}</span>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> < Footer /> </>);
};
const transformImagePath = (path) => {
    if (!path) 
        return ''; // Return an empty string or a default image URL if path is undefined
    const baseURL = 'https://localhost:44340/ArtItem-photos/';
    const fileName = path
        .split('\\')
        .pop(); // Extract the filename from the path
    return `${baseURL}${fileName}`;
};

export default Order;
