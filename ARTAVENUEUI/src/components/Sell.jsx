import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoSearchOutline } from "react-icons/io5";
import { RiImageAddFill } from "react-icons/ri";
import { MdDone } from "react-icons/md";
import {Stepper, Step, StepLabel, Button, Typography, Box, TextField,
  FormControl,InputLabel,Select,MenuItem
} from '@mui/material';
import './Sell.css';
import { useNavigate } from 'react-router-dom';
import toastr from 'toastr';
import Tooltip from '@mui/material/Tooltip';
import { useAuth } from '../../context';
import en from './en.json';
import al from './al.json';
import { useLanguage} from './LanguageContext';



const Sell = () => {

  const userData=useAuth()
  
  useEffect(() => {
    console.log('testssss',userData);
  }, [userData]);
  
  const { language } = useLanguage();
  const translations = language === 'en' ? en : al;

  const [activeStep, setActiveStep] = useState(0);
  const [showHowWorks, setShowHowWorks] = useState(true);
  const [formData, setFormData] = useState({
    category: '',
    country: '',
    artist: '',
    titleOfWork: '',
    measurementUnit: '',
    framedHeight: '',
    framedWidth: '',
    framedDepth: '',
    pricePaid: '',
    currency: '',
    buynow: '',
    note:'',
    year:'',
    description:'',
  });
  const [images, setImages] = useState({
    frontPhoto: null,
    backPhoto: null,
    detailsPhoto: null,
    signaturePhoto: null,
  });


  const handleFileChange = (e, name) => {
    setImages({ ...images, [name]: e.target.files[0] });
  };
  const steps = ['Category', 'Detail', 'Photos', 'Review'];

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://localhost:44340/api/Category/getCategoryList');
        setCategories(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchCategories();
  }, []);
  const handleNext = () => {
    if (showHowWorks && activeStep === 0) {
      setShowHowWorks(false);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep === 0 && !showHowWorks) {
      setShowHowWorks(true); 
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  // const handleReset = () => {
  //   setActiveStep(0);
  //   setFormData({
  //     category: '',
  //     country: '',
  //     artist: '',
  //     titleOfWork: '',
  //     measurementUnit: '',
  //     framedHeight: '',
  //     framedWidth: '',
  //     framedDepth: '',
  //     pricePaid: '',
  //     currency: '',
  //     yearPaid: '',
  //   });
  //   setShowHowWorks(true);
  // };

  const handleCategoryClick = (category) => {
    setFormData({ ...formData, category });
    handleNext();
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div className="category-container">
          {categories.map((category) => (
            <Box key={category.categroyId} className="category-box" onClick={() => handleCategoryClick(category.categroyId)}>
              <h5 className="categoryName">{category.categoryName}</h5>
            </Box>
          ))}
        </div>
        
        );
        case 1:
          return (
            <div className='general-container'>
              <Typography variant="h6" gutterBottom>{translations.TellUs}</Typography>
              <Typography variant="h4" gutterBottom>{translations.General}</Typography>
              <Typography variant="h6" gutterBottom>{translations.ItemsCountry}</Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>{translations.Country}</InputLabel>
                <Select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  label="Country"
                >
                  <MenuItem value="Albania">Albania</MenuItem>
                  <MenuItem value="Kosova">Kosova</MenuItem>
                </Select>
              </FormControl>
              <Typography variant="h6" gutterBottom>{translations.Artist}</Typography>
              <TextField
                fullWidth
                sx={{ mb: 2 }}
                label="Artist"
                variant="outlined"
                value={formData.artist}
                onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
              />
              <Typography variant="h6" gutterBottom>{translations.Title}</Typography>
              <TextField
                fullWidth
                sx={{ mb: 2 }}
                label="Title of Work"
                variant="outlined"
                value={formData.titleOfWork}
                onChange={(e) => setFormData({ ...formData, titleOfWork: e.target.value })}
              />

<Typography variant="h6" gutterBottom>{translations.Description}</Typography>
              <TextField
                fullWidth
                sx={{ mb: 2 }}
                label="Description"
                variant="outlined"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />

<Typography variant="h6" gutterBottom>{translations.Year}</Typography>
              <TextField
                fullWidth
                sx={{ mb: 2 }}
                label="Year"
                variant="outlined"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              />
              <Typography variant="h4" gutterBottom>{translations.Measurements}</Typography>
              <Typography variant="h6" gutterBottom>{translations.MeasurementUnit}</Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>{translations.Unit}</InputLabel>
                <Select
                  value={formData.measurementUnit}
                  onChange={(e) => setFormData({ ...formData, measurementUnit: e.target.value })}
                  label="Unit"
                >
                  <MenuItem value="inches">Inches</MenuItem>
                  <MenuItem value="millimeters">Millimeters</MenuItem>
                  <MenuItem value="feet">Feet</MenuItem>
                  <MenuItem value="centimeters">Centimeters</MenuItem>
                  <MenuItem value="meters">Meters</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                sx={{ mb: 2 }}
                label="Framed Height"
                variant="outlined"
                value={formData.framedHeight}
                onChange={(e) => setFormData({ ...formData, framedHeight: e.target.value })}
              />
              <TextField
                fullWidth
                sx={{ mb: 2 }}
                label="Framed Width"
                variant="outlined"
                value={formData.framedWidth}
                onChange={(e) => setFormData({ ...formData, framedWidth: e.target.value })}
              />
              <TextField
                fullWidth
                sx={{ mb: 2 }}
                label="Framed Depth"
                variant="outlined"
                value={formData.framedDepth}
                onChange={(e) => setFormData({ ...formData, framedDepth: e.target.value })}
              />
              <Typography variant="h4" gutterBottom>{translations.SetPrice}</Typography>
              <TextField
                fullWidth
                sx={{ mb: 2 }}
                label="Start Price"
                variant="outlined"
                value={formData.pricePaid}
                onChange={(e) => setFormData({ ...formData, pricePaid: e.target.value })}
              />
             
              {/* <Typography variant="h6" gutterBottom>Currency</Typography> */}
              {/* <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Currency</InputLabel>
                <Select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  label="Currency"
                >
                  <MenuItem value="Euro">Euro</MenuItem>
                  <MenuItem value="Dollar">Dollar</MenuItem>
                  <MenuItem value="Lek">Lek</MenuItem>
                </Select>
              </FormControl> */}
              <TextField
                fullWidth
                sx={{ mb: 2 }}
                label="Buy immediately price "
                variant="outlined"
                value={formData.yearPaid}
                onChange={(e) => setFormData({ ...formData, yearPaid: e.target.value })}
              />

        <TextField
          fullWidth
            sx={{ mb: 2 }}
         label="Note"
         variant="outlined"
         value={formData.note}
          onChange={(e) => setFormData({ ...formData, note: e.target.value })} // Fixed the prop to "onChange"
         multiline
         rows={4} />

            </div>
            
          );
        
          case 2:
            return (
             <div className='upload'>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', textAlign: 'center', width: '100%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '60%' }}>
                  <Typography variant="h6" gutterBottom>{translations.UploadYourPhotos}</Typography>
                  <TextField
                    fullWidth
                    sx={{ mb: 2 }}
                    type="file"
                    inputProps={{ accept: 'image/jpeg,image/png,image/gif' }}
                    onChange={(e) => handleFileChange(e, 'frontPhoto')}
                    label="Photo from the front"
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    sx={{ mb: 2 }}
                    type="file"
                    inputProps={{ accept: 'image/jpeg,image/png,image/gif' }}
                    onChange={(e) => handleFileChange(e, 'backPhoto')}
                    label="Photo from the back"
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    sx={{ mb: 2 }}
                    type="file"
                    inputProps={{ accept: 'image/jpeg,image/png,image/gif' }}
                    onChange={(e) => handleFileChange(e, 'detailsPhoto')}
                    label="Details"
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    sx={{ mb: 2 }}
                    type="file"
                    inputProps={{ accept: 'image/jpeg,image/png,image/gif' }}
                    onChange={(e) => handleFileChange(e, 'signaturePhoto')}
                    label="Signature of the painting"
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ width: '35%', textAlign: 'left', pl: 2 }}>
                  <Typography variant="h6" gutterBottom>{translations.Requirements}:</Typography>
                  <Typography variant="body2">{translations.Photos}</Typography>
                  <Typography variant="body2">{translations.Documents}</Typography>
                  <Typography variant="body2">{translations.Minimum}</Typography>
                  <Typography variant="body2">{translations.FileSize}</Typography>
                  <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>{translations.Tips}</Typography>
                  <Typography variant="body2">{translations.one}</Typography>
                  <Typography variant="body2">{translations.two}</Typography>
                  <Typography variant="body2">{translations.three}</Typography>
                  <Typography variant="body2">{translations.four}</Typography>
                  <Typography variant="body2">{translations.five}</Typography>
                  <Typography variant="body2">{translations.six}</Typography>
                  <Typography variant="body2">{translations.seven}</Typography>
                  <Typography variant="body2">{translations.eight}</Typography>
                </Box>
              </Box>
              </div>
            );
          
            case 3:
              return (
                <Box className="review-section">
                    <Typography variant="h6" gutterBottom>Review information</Typography>
                    <div className="data-row">
                    <Typography variant="body1" className="label">Year:</Typography>
                    <Typography variant="body1" className="data">{formData.year}</Typography>
                  </div>
                  
                <div className="data-row">

                <Typography variant="body1" className="label">Country:</Typography>
                <Typography variant="body1" className="data">{formData.country}</Typography>
                </div>
                <div className="data-row">

                <Typography variant="body1" className="label">Artist:</Typography>
                <Typography variant="body1" className="data">{formData.artist}</Typography>
                </div>
                <div className="data-row">

                <Typography variant="body1" className="label">Title of Work:</Typography>
                <Typography variant="body1" className="data">{formData.titleOfWork}</Typography>
                </div>
                <div className="data-row">

                <Typography variant="body1" className="label">Measurement Unit:</Typography>
                <Typography variant="body1" className="data">{formData.measurementUnit}</Typography>
                </div>
                <div className="data-row">

                <Typography variant="body1" className="label">Framed Height:</Typography>
                <Typography variant="body1" className="data">{formData.framedHeight}</Typography>
                </div>
                <div className="data-row">

                <Typography variant="body1" className="label">Framed Width:</Typography>
                <Typography variant="body1" className="data">{formData.framedWidth}</Typography>
                </div>
                <div className="data-row">
                
                <Typography variant="body1" className="label">Framed Depth:</Typography>
                <Typography variant="body1" className="data">{formData.framedDepth}</Typography>
                </div>
                <div className="data-row">

                <Typography variant="body1" className="label">Start Price:</Typography>
                <Typography variant="body1" className="data">{formData.pricePaid}</Typography>
                </div>
              
                <div className="data-row">

                <Typography variant="body1" className="label">Buy immediately Price:</Typography>
                <Typography variant="body1" className="data">{formData.buynow}</Typography>
                </div>
               
                <div className="button-container">
                  {/* <Button variant="contained" color="primary" onClick={handleReset} sx={{ marginRight: '1rem' }}>Reset</Button> */}
                  <Button variant="contained" color="primary" onClick={handleSubmit}>Finish</Button>
                </div>
              </Box>
              
              );
            default:
              return <Typography>Unknown step</Typography>;
          }
        };
  const navigate = useNavigate();
      
        const handleSubmit = async () => {
          const data = new FormData();
          data.append('ClientId',userData.data.id)
          data.append('ArtName', formData.titleOfWork);
          data.append('BuyimmediatelyPrice', formData.buynow);
          data.append('StartPrice', formData.pricePaid);
          data.append('Description', formData.description);
          data.append('FirstArtist', formData.artist);
          data.append('Year', formData.year);
          data.append('CategoryId', formData.category);
          data.append('Note', formData.note);
          data.append('Unit', formData.measurementUnit);
          data.append('FramedHeight', formData.framedHeight);
          data.append('FramedDepth', formData.framedDepth);
          data.append('FramedWidth', formData.framedWidth);
          data.append('Images', images.frontPhoto);
          data.append('Images', images.backPhoto);
          data.append('Images', images.detailsPhoto);
          data.append('Images', images.signaturePhoto);
          const token = localStorage.getItem('token');
          try {
            const response = await axios.post('https://localhost:44340/api/ArtItem/addArtItemRequest', data, {
              headers: {
                'Content-Type': 'multipart/form-data',
                 'Authorization': `Bearer ${token}`
              }
            });
            if(response.data.success){
              toastr.success(response.data.message, {
                autoClose: 3000,
              });
              navigate('/')
            }else{
              toastr.error(response.data.message, {
                autoClose: 3000,
              });
            }
           
          } catch (error) {
            toastr.error(error.message, {
              autoClose: 3000,
            });
          }
        };

  return (
    <div>
      <h1 className='choose-Category'>{translations.Choose}</h1>
      {showHowWorks && (
        <div className='howWorks'>
          <h1>{translations.Works}</h1>
          <p className='disclaimer'>{translations.Disclaimer}</p>
          <div className='steps'>
            <div className='step'>
              <IoSearchOutline />
              <h2>{translations.TellUs}</h2>
              <p>{translations.AddDimensions}</p>
            </div>
            <div className='step'>
              <RiImageAddFill />
              <h2>{translations.Upload}</h2>
              <p>{translations.FrontBack}</p>
            </div>
            <div className='step'>
              <MdDone />
              <h2>{translations.Review}</h2>
              <p>{translations.AllSet}</p>
            </div>
          </div>
          {!userData.data?.id ? (
  <Tooltip  title="You need to be logged in to sell an Art Item">
    <span>
      <button style={{cursor:'not-allowed'}} className="bid-button next" disabled>
      {translations.Next}
      </button>
    </span>
  </Tooltip>
) : (
  <button className="bid-button next" onClick={handleNext}>
    {translations.Next}
  </button>
)}
        </div>
      )}
      

      {!showHowWorks && (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>

          <Stepper activeStep={activeStep} alternativeLabel sx={{ width: '90%', maxWidth: '600px', mb: 4 }}>
            
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div>
                <Typography sx={{ mt: 2, mb: 1 }}>{translations.ReviewAndSubmit}</Typography>
                {getStepContent(activeStep)}
              </div>
            ) : (
              <div>
                <Typography sx={{ mt: 2, mb: 1 }}>{getStepContent(activeStep)}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                    style={{marginBottom:'30px'}}
                  >
                    {translations.Back}
                  </Button>
                  {activeStep < steps.length - 1 && (
                                        <Button variant="contained" color="primary" onClick={handleNext} style={{marginBottom:'30px'}}>
                                        {translations.Next}
                                      </Button>
                                    )}
                                  </Box>
                                </div>
                              )}
                            </div>
                          </Box>
                        )}
                      </div>
                    );
                  };
                  
export default Sell;
                  