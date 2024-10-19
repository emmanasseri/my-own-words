import { extendTheme } from "@chakra-ui/react";

const breakpoints = {
  sm: "322px", 
  md: "500px", 
  lg: "765px", 
};

const theme = extendTheme({
  breakpoints,
  // Define custom sizes for the windows
  views: {
    smallView: {
      width: "322px",
      height: "253px",
    },
    expandedView: {
      width: "500px",
      height: "650px",
    },
    pageView: {
      width: "565px",
      height: "793px", // Same aspect ratio as medium
    },
  },
  // Define custom fonts or other style configurations
  fonts: {
    heading: "'Open Sans', sans-serif",
    body: "'Roboto', sans-serif",
  },
  // Optionally, you can define font sizes for different breakpoints
  fontSizes: {
    sm: "12px",
    md: "14px",
    lg: "16px",
  },
});

export default theme;
