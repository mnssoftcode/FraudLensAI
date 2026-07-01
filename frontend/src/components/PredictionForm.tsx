import { useState } from "react";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Divider,
    Stack,
    Typography,
} from "@mui/material";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import DownloadIcon from "@mui/icons-material/Download";
import AnalyticsIcon from "@mui/icons-material/Analytics";

import api from "../api/api";

export default function PredictionForm() {

    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const analyze = async () => {

        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        setLoading(true);

        try {

            const res = await api.post(
                "/predict/csv",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setResult(res.data);

        } catch (e) {

            console.error(e);

        }

        setLoading(false);

    };

    return (

        <Card
            elevation={0}
            sx={{
                borderRadius: 4,
                border: "1px solid #E5E7EB",
                mt: 5,
            }}
        >

            <CardContent>

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={3}
                >

                    <Typography
                        variant="h5"
                        fontWeight={700}
                    >
                        Batch Fraud Detection
                    </Typography>

                    <Chip
                        icon={<AnalyticsIcon />}
                        label="CSV Analysis"
                        color="primary"
                    />

                </Stack>

                <Divider sx={{ mb: 4 }} />

                <Box
                    sx={{
                        border: "2px dashed #4F46E5",
                        borderRadius: 4,
                        textAlign: "center",
                        p: 6,
                        bgcolor: "#F8FAFC",
                    }}
                >

                    <UploadFileIcon
                        sx={{
                            fontSize: 60,
                            color: "#4F46E5",
                            mb: 2,
                        }}
                    />

                    <Typography
                        variant="h6"
                        mb={1}
                    >
                        Upload Transaction CSV
                    </Typography>

                    <Typography
                        color="text.secondary"
                        mb={3}
                    >
                        Supported format: CSV
                    </Typography>

                    <Button
                        component="label"
                        variant="contained"
                    >

                        Choose CSV

                        <input
                            hidden
                            type="file"
                            accept=".csv"
                            onChange={(e) => {

                                if (e.target.files?.length) {

                                    setFile(
                                        e.target.files[0]
                                    );

                                }

                            }}
                        />

                    </Button>

                    {file && (

                        <Typography
                            mt={3}
                            fontWeight={600}
                        >
                            📄 {file.name}
                        </Typography>

                    )}

                </Box>

                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{
                        mt: 4,
                        height: 55,
                    }}
                    disabled={!file || loading}
                    onClick={analyze}
                >

                    {

                        loading

                            ? <CircularProgress size={24} color="inherit"/>

                            : "Analyze Transactions"

                    }

                </Button>

                {

                    result && (

                        <Stack
                            spacing={2}
                            mt={4}
                        >

                            <Alert severity="info">

                                Total Transactions :
                                {" "}
                                <strong>{result.total_transactions}</strong>

                            </Alert>

                            <Alert severity="error">

                                Fraud Detected :
                                {" "}
                                <strong>{result.fraud_detected}</strong>

                            </Alert>

                            <Alert severity="success">

                                Safe Transactions :
                                {" "}
                                <strong>{result.safe_transactions}</strong>

                            </Alert>

                            <Button
                                startIcon={<DownloadIcon />}
                                href="http://127.0.0.1:8000/download"
                                variant="outlined"
                            >
                                Download Prediction Report
                            </Button>

                        </Stack>

                    )

                }

            </CardContent>

        </Card>

    );

}