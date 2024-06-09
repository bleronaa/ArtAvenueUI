import React, { useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { RiImageAddFill } from "react-icons/ri";
import { MdDone } from "react-icons/md";
import {Stepper, Step, StepLabel, Button, Typography, Box, TextField,
  FormControl,InputLabel,Select,MenuItem,Paper,List,ListItem,
  ListItemText,
} from '@mui/material';
import './Sell.css';

const Sell = () => {
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
    yearPaid: '',
  });

  const steps = ['Category', 'Detail', 'Photos', 'Review'];

  const categories = ['Paintings', 'Fine Art Prints', 'Sculpture'];

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
  const handleReset = () => {
    setActiveStep(0);
    setFormData({
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
      yearPaid: '',
    });
    setShowHowWorks(true);
  };

  const handleCategoryClick = (category) => {
    setFormData({ ...formData, category });
    handleNext();
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>Choose your category</Typography>
            <List component={Paper} sx={{ width: '300px' }}>
              {categories.map((category, index) => (
                <ListItem button key={index} sx={{ textAlign: 'center' }} onClick={() => handleCategoryClick(category)}>
                  <ListItemText primary={category} />
                </ListItem>
              ))}
            </List>
          </Box>
        );
        case 1:
          return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
              <Typography variant="h6" gutterBottom>Tell us about your item</Typography>
              <Typography variant="h4" gutterBottom>General</Typography>
              <Typography variant="h6" gutterBottom>Item's country of Origin</Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Country</InputLabel>
                <Select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  label="Country"
                >
                  <MenuItem value="Albania">Albania</MenuItem>
                  <MenuItem value="Kosova">Kosova</MenuItem>
                </Select>
              </FormControl>
              <Typography variant="h6" gutterBottom>Artist</Typography>
              <TextField
                fullWidth
                sx={{ mb: 2 }}
                label="Artist"
                variant="outlined"
                value={formData.artist}
                onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
              />
              <Typography variant="h6" gutterBottom>Title of Work</Typography>
              <TextField
                fullWidth
                sx={{ mb: 2 }}
                label="Title of Work"
                variant="outlined"
                value={formData.titleOfWork}
                onChange={(e) => setFormData({ ...formData, titleOfWork: e.target.value })}
              />
              <Typography variant="h4" gutterBottom>Measurements</Typography>
              <Typography variant="h6" gutterBottom>Measurement Unit</Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Unit</InputLabel>
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
              <Typography variant="h4" gutterBottom>Price</Typography>
              <Typography variant="h6" gutterBottom>Price Paid</Typography>
              <TextField
                fullWidth
                sx={{ mb: 2 }}
                label="Price Paid"
                variant="outlined"
                value={formData.pricePaid}
                onChange={(e) => setFormData({ ...formData, pricePaid: e.target.value })}
              />
              <Typography variant="h6" gutterBottom>Currency</Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
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
              </FormControl>
              <Typography variant="h6" gutterBottom>Year Paid</Typography>
              <TextField
                fullWidth
                sx={{ mb: 2 }}
                label="Year Paid"
                variant="outlined"
                value={formData.yearPaid}
                onChange={(e) => setFormData({ ...formData, yearPaid: e.target.value })}
              />
            </Box>
          );
        
          case 2:
            return (
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', textAlign: 'center', width: '100%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '60%' }}>
                  <Typography variant="h6" gutterBottom>Upload Your Photos and Documents</Typography>
                  <TextField
                    fullWidth
                    sx={{ mb: 2 }}
                    type="file"
                    inputProps={{ accept: 'image/jpeg,image/png,image/gif' }}
                    label="Photo from the front"
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    sx={{ mb: 2 }}
                    type="file"
                    inputProps={{ accept: 'image/jpeg,image/png,image/gif' }}
                    label="Photo from the back"
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    sx={{ mb: 2 }}
                    type="file"
                    inputProps={{ accept: 'image/jpeg,image/png,image/gif' }}
                    label="Details"
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    sx={{ mb: 2 }}
                    type="file"
                    inputProps={{ accept: 'image/jpeg,image/png,image/gif' }}
                    label="Signature of the painting"
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ width: '35%', textAlign: 'left', pl: 2 }}>
                  <Typography variant="h6" gutterBottom>Requirements:</Typography>
                  <Typography variant="body2">Photos: JPEG, PNG, GIF</Typography>
                  <Typography variant="body2">Documents: PDF, CSV, Word, Excel, Powerpoint</Typography>
                  <Typography variant="body2">Minimum Dimensions: 100px</Typography>
                  <Typography variant="body2">File Size Limit: 20 MB</Typography>
                  <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Tips:</Typography>
                  <Typography variant="body2">1. One photo of entire item as close as possible</Typography>
                  <Typography variant="body2">2. One detail shot, 25% of item unless item very small</Typography>
                  <Typography variant="body2">3. Take in bright day light. Turn on flash</Typography>
                  <Typography variant="body2">4. Take at slight angle off center to avoid reflection and flash back</Typography>
                  <Typography variant="body2">5. Check clarity on computer before uploading. Reshoot if not in focus</Typography>
                  <Typography variant="body2">6. Remove from glass when possible</Typography>
                  <Typography variant="body2">7. Show scale and context; details and texture</Typography>
                  <Typography variant="body2">8. Use your own photos: we cannot accept a photograph of a photo of the work.</Typography>
                </Box>
              </Box>
            );
          
      case 3:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', width: '100%' }}>
          <Typography variant="h6" gutterBottom>Review information</Typography>
          <Typography variant="body1">Category: {formData.category}</Typography>
          <Typography variant="body1">Country: {formData.country}</Typography>
          <Typography variant="body1">Artist: {formData.artist}</Typography>
          <Typography variant="body1">Title of Work: {formData.titleOfWork}</Typography>
          <Typography variant="body1">Measurement Unit: {formData.measurementUnit}</Typography>
          <Typography variant="body1">Framed Height: {formData.framedHeight}</Typography>
          <Typography variant="body1">Framed Width: {formData.framedWidth}</Typography>
          <Typography variant="body1">Framed Depth: {formData.framedDepth}</Typography>
          <Typography variant="body1">Price Paid: {formData.pricePaid}</Typography>
          <Typography variant="body1">Currency: {formData.currency}</Typography>
          <Typography variant="body1">Year Paid: {formData.yearPaid}</Typography>
          <Box sx={{ display: 'flex', marginTop: '1rem' }}>
            <Button variant="contained" color="primary" onClick={handleReset} sx={{ marginRight: '1rem' }}>Reset</Button>
            <Button variant="contained" color="primary" onClick={handleReviewSubmit}>Finish</Button>
          </Box>
        </Box>
        );
      default:
        return <Typography>Unknown step</Typography>;
    }
  };

  return (
    <div>
      {showHowWorks && (
        <div className='howWorks'>
          <h1>How It Works</h1>
          <p className='disclaimer'>Disclaimer: Preliminary estimates may be subject to change upon inspection of the item.</p>
          <div className='steps'>
            <div className='step'>
              <IoSearchOutline />
              <h2>Tell us about your Item</h2>
              <p>Add dimensions, history and any documentation</p>
            </div>
            <div className='step'>
              <RiImageAddFill />
              <h2>Upload Photos</h2>
              <p>Take front and back images of your item</p>
            </div>
            <div className='step'>
              <MdDone />
              <h2>Review and Submit</h2>
              <p>All set! Our specialists will review your submission</p>
            </div>
          </div>
          <button className='bid-button next' onClick={handleNext}>Next</button>
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
                <Typography sx={{ mt: 2, mb: 1 }}>Review and confirm your submission.</Typography>
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
                    Back
                  </Button>
                  {activeStep < steps.length - 1 && (
                                        <Button variant="contained" color="primary" onClick={handleNext} style={{marginBottom:'30px'}}>
                                        Next
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
                  