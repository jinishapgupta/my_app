import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { useTheme } from '@mui/material/styles';

interface FooterProps {
  data: any;
  filterData: any;
  setFilterData: React.Dispatch<React.SetStateAction<any>>;
}

export default function Footer({ data, filterData, setFilterData }: FooterProps) {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const theme = useTheme();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    const selectedKey = Object.keys(filterData)[newValue];
    setFilterData({ [selectedKey]: filterData[selectedKey] });
  };

  return (
    <footer className=" text-white p-4">
      <Box sx={{ 
        maxWidth: "100%", 
        bgcolor: 'transparent',
        position: 'relative',
        '& .MuiTabs-scrollButtons': {
          '&.Mui-disabled': {
            opacity: 0.3,
          },
          color: 'black',
        },
      }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons={true}
          allowScrollButtonsMobile
          aria-label="Filter Tabs"
          textColor="inherit"
          indicatorColor="primary"
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: 'orange',
            },
            '& .MuiTabs-scrollButtons': {
              color: 'white',
              '&.Mui-disabled': {
                opacity: 0.3,
              },
            },
          }}
        >
          {Object.entries(filterData).map(([key, value]: [string, any], index) => (
            <Tab
              key={key}
              label={`${value.displayName} (${value.restaurantIds.length})`}
              sx={{
                textTransform: 'none',
                fontSize: '0.8rem',
                color: 'black',
                minHeight: '48px',
                padding: '6px 16px',
                '&.Mui-selected': {
                  color: 'orange',
                },
                '&:hover': {
                  color: 'orange',
                  opacity: 0.8,
                },
              }}
            />
          ))}
        </Tabs>
      </Box>
    </footer>
  );
}