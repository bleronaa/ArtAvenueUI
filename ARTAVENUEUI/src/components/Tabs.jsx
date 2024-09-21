import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Account from './AccountDetails';
import MyArtItems from './MyArtItems';
import ChangePassword from './ChangePassword';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ clientDetails }) {
  const [value, setValue] = React.useState(0);
  console.log('tabs',clientDetails)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs
      value={value}
      onChange={handleChange}
      aria-label="basic tabs example"
       // Use the centered prop to center tabs
      sx={{ '.MuiTabs-flexContainer': { justifyContent: 'center !important' } }}  
    >
          <Tab label="My Account" {...a11yProps(0)} />
          <Tab label="My Bids / Sellings" {...a11yProps(1)} />
          <Tab label="Change Password" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      <Account clientDetails={clientDetails} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <MyArtItems/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
       <ChangePassword/>
      </CustomTabPanel>
    </Box>
  );
}
