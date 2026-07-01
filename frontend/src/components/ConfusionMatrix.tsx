import {
    Card,
    CardContent,
    Grid,
    Paper,
    Typography,
} from "@mui/material";

interface Props {
    matrix: number[][];
}

export default function ConfusionMatrix({ matrix }: Props) {

    const labels = [
        ["True Normal", "False Positive"],
        ["False Negative", "True Fraud"],
    ];

    const colors = [
        ["#E8F5E9", "#FFF3E0"],
        ["#FFF8E1", "#E3F2FD"],
    ];

    return (

        <Card
            elevation={0}
            sx={{
                borderRadius: 4,
                border: "1px solid #E5E7EB",
                height: "100%",
            }}
        >

            <CardContent>

                <Typography
                    variant="h6"
                    fontWeight={700}
                    mb={3}
                >
                    Confusion Matrix
                </Typography>

                <Grid container spacing={2}>

                    {matrix.map((row, rowIndex) =>
                        row.map((value, colIndex) => (

                            <Grid
                                key={`${rowIndex}-${colIndex}`}
                                size={{ xs: 6 }}
                            >

                                <Paper
                                    elevation={0}
                                    sx={{
                                        background:
                                            colors[rowIndex][colIndex],
                                        borderRadius: 3,
                                        p: 3,
                                        textAlign: "center",
                                        border: "1px solid #E5E7EB",
                                    }}
                                >

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {labels[rowIndex][colIndex]}
                                    </Typography>

                                    <Typography
                                        variant="h4"
                                        fontWeight="bold"
                                        mt={2}
                                    >
                                        {value}
                                    </Typography>

                                </Paper>

                            </Grid>

                        ))
                    )}

                </Grid>

            </CardContent>

        </Card>

    );

}