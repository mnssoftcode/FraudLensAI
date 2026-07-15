import {
    Card,
    CardContent,
    Typography,
    Box,
} from "@mui/material";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";

interface Props {
    title: string;
    value: string | number;
}

export default function MetricCard({ title, value }: Props) {

    return (

        <Card
            elevation={0}
            sx={{
                borderRadius: 2,
                border: "1px solid #E2E5EF",
                borderLeft: "4px solid #4F46E5",
                transition: "box-shadow 0.2s, transform 0.2s",
                height: "100%",

                "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px rgba(79,70,229,.12)",
                },
            }}
        >

            <CardContent sx={{ p: "20px !important" }}>

                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={1.5}
                >

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        fontWeight={600}
                        sx={{ textTransform: "uppercase", letterSpacing: "0.06em", fontSize: "0.7rem" }}
                    >
                        {title}
                    </Typography>

                    <Box
                        sx={{
                            width: 32,
                            height: 32,
                            borderRadius: 1.5,
                            bgcolor: "#EEF2FF",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <TrendingUpIcon sx={{ color: "#4F46E5", fontSize: 18 }} />
                    </Box>

                </Box>

                <Typography
                    variant="h5"
                    fontWeight={700}
                    sx={{ color: "#111827", lineHeight: 1.2 }}
                >
                    {value}
                </Typography>

            </CardContent>

        </Card>

    );

}