import { createTheme } from "@mui/material/styles";

// Create a custom theme
const theme = createTheme({
    palette: {
        text: {
            primary: "#000000",
            secondary: "#555",
        },
        background: {
            primary: "",
        },
    },
    typography: {
        fontFamily: ["Roboto", "Poppins", "sans-serif"].join(","),
    },
});

export default theme;
