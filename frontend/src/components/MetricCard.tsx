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

export default function MetricCard({
    title,
    value,
}: Props) {

    return (

        <Card
            elevation={0}
            sx={{
                borderRadius: 4,
                border: "1px solid #E5E7EB",
                transition: "0.25s",
                height: "100%",

                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 30px rgba(0,0,0,.08)",
                },
            }}
        >

            <CardContent>

                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={3}
                >

                    <Typography
                        color="text.secondary"
                        fontWeight={600}
                    >
                        {title}
                    </Typography>

                    <TrendingUpIcon
                        sx={{
                            color: "#4F46E5",
                        }}
                    />

                </Box>

                <Typography
                    variant="h4"
                    fontWeight={700}
                >
                    {value}
                </Typography>

            </CardContent>

        </Card>

    );

}