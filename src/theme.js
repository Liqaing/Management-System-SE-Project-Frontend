import { createTheme } from "@mui/material/styles";

// Create a custom theme
const theme = createTheme({
    palette: {
        text: {
            primary: "#ffffff",
            secondary: "#555",
        },
    },
    typography: {
        fontFamily: ["Roboto", "Poppins", "sans-serif"].join(","),
    },
});

export default theme;
