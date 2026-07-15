import {
    Box,
    Chip,
    Divider,
    Typography,
} from "@mui/material";

import SecurityIcon from "@mui/icons-material/Security";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

export default function Header() {

    return (

        <Box mb={3}>

            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                py={2}
            >

                {/* Left: Logo + Title */}
                <Box display="flex" alignItems="center" gap={1.5}>

                    <Box
                        sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 1.5,
                            bgcolor: "#4F46E5",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                        }}
                    >
                        <SecurityIcon sx={{ color: "white", fontSize: 22 }} />
                    </Box>

                    <Box>
                        <Typography
                            variant="h5"
                            fontWeight={800}
                            sx={{ color: "#111827", lineHeight: 1.2, letterSpacing: "-0.5px" }}
                        >
                            FraudLens AI
                        </Typography>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontWeight: 500, letterSpacing: "0.02em" }}
                        >
                            AI-Powered Fraud Detection System
                        </Typography>
                    </Box>

                </Box>

                {/* Right: Status badge */}
                <Chip
                    size="small"
                    icon={
                        <FiberManualRecordIcon
                            sx={{ fontSize: "10px !important", color: "#16A34A !important" }}
                        />
                    }
                    label="Live · Production Ready"
                    sx={{
                        bgcolor: "#F0FDF4",
                        color: "#15803D",
                        border: "1px solid #BBF7D0",
                        fontWeight: 600,
                        fontSize: 12,
                        height: 30,
                    }}
                />

            </Box>

            <Divider />

        </Box>

    );

}