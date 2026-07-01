import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#4F46E5",
        },
        background: {
            default: "#F5F7FA",
        },
    },

    shape: {
        borderRadius: 16,
    },

    typography: {
        fontFamily: "Inter, sans-serif",
    },
});

export default theme;