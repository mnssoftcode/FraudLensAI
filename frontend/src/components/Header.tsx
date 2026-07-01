import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Chip,
} from "@mui/material";

import SecurityIcon from "@mui/icons-material/Security";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function Header() {

    return (

        <AppBar
            position="static"
            elevation={0}
            color="transparent"
            sx={{
                mb: 4,
            }}
        >

            <Toolbar
                disableGutters
                sx={{
                    justifyContent: "space-between",
                }}
            >

                <Box
                    display="flex"
                    alignItems="center"
                    gap={2}
                >

                    <SecurityIcon
                        sx={{
                            fontSize: 42,
                            color: "#4F46E5",
                        }}
                    />

                    <Box>

                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >
                            FraudLens AI
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            AI Powered Fraud Detection System
                        </Typography>

                    </Box>

                </Box>

                <Chip
                    icon={<CheckCircleIcon />}
                    label="Production Ready"
                    color="success"
                    variant="filled"
                />

            </Toolbar>

        </AppBar>

    );

}