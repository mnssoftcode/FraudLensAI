import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#4F46E5",
        },
        background: {
            default: "#F0F2F8",
            paper: "#ffffff",
        },
    },

    // Reduced from 16 → 8: standard modern SaaS look, not bubbly
    shape: {
        borderRadius: 8,
    },

    typography: {
        fontFamily: "'Inter', 'Roboto', sans-serif",
        h4: { fontWeight: 700, letterSpacing: "-0.5px" },
        h5: { fontWeight: 700, letterSpacing: "-0.3px" },
        h6: { fontWeight: 600 },
    },

    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    boxShadow: "0 1px 3px rgba(0,0,0,.08)",
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 6,
                    fontWeight: 600,
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 7,
                    textTransform: "none",
                    fontWeight: 600,
                    letterSpacing: "0",
                },
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    "& .MuiTableCell-root": {
                        fontSize: "0.8rem",
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                    },
                },
            },
        },
    },
});

export default theme;