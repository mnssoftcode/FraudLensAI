import {
    Box,
    Card,
    CardContent,
    Typography,
} from "@mui/material";
import Grid from "@mui/material/GridLegacy";

interface Props {
    matrix: number[][];
}

const CELLS = [
    { label: "True Normal",    bg: "#ECFDF5", border: "#6EE7B7", text: "#065F46" },
    { label: "False Positive", bg: "#FFF7ED", border: "#FCD34D", text: "#92400E" },
    { label: "False Negative", bg: "#FFF7ED", border: "#FCD34D", text: "#92400E" },
    { label: "True Fraud",     bg: "#EFF6FF", border: "#93C5FD", text: "#1E40AF" },
];

export default function ConfusionMatrix({ matrix }: Props) {

    const flat = matrix.flat();

    return (

        <Card
            elevation={0}
            sx={{
                borderRadius: 2,
                border: "1px solid #E2E5EF",
                height: "100%",
            }}
        >

            <CardContent sx={{ p: "20px !important" }}>

                <Typography
                    variant="h6"
                    fontWeight={700}
                    mb={2.5}
                    sx={{ color: "#111827" }}
                >
                    Confusion Matrix
                </Typography>

                <Grid container spacing={1.5}>

                    {flat.map((value, i) => (

                        <Grid item xs={6} key={i}>

                            <Box
                                sx={{
                                    background: CELLS[i].bg,
                                    border: `1.5px solid ${CELLS[i].border}`,
                                    borderRadius: 1.5,
                                    p: "14px 16px",
                                    textAlign: "center",
                                }}
                            >

                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: CELLS[i].text,
                                        fontWeight: 600,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.05em",
                                        fontSize: "0.67rem",
                                    }}
                                >
                                    {CELLS[i].label}
                                </Typography>

                                <Typography
                                    variant="h5"
                                    fontWeight={700}
                                    mt={0.5}
                                    sx={{ color: CELLS[i].text }}
                                >
                                    {value.toLocaleString()}
                                </Typography>

                            </Box>

                        </Grid>

                    ))}

                </Grid>

            </CardContent>

        </Card>

    );

}