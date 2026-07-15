import { useState } from "react";
import {
    Alert,
    Box,
    Button,
    Chip,
    CircularProgress,
    Divider,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import DownloadIcon from "@mui/icons-material/Download";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import api from "../api/api";

export default function PredictionForm() {

    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const analyze = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const res = await api.post("/predict/csv", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setResult(res.data);
        } catch (err: any) {
            setError(
                err?.response?.data?.detail ||
                "Unable to process the file. Please check the CSV format."
            );
        } finally {
            setLoading(false);
        }
    };

    return (

        <Paper
            elevation={0}
            sx={{
                border: "1px solid #E2E5EF",
                borderRadius: 2,
                overflow: "hidden",
            }}
        >

            {/* ── Header Bar ── */}
            <Box
                sx={{
                    px: 3,
                    py: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #E2E5EF",
                    bgcolor: "#FAFAFA",
                }}
            >
                <Box>
                    <Typography variant="h6" fontWeight={700} sx={{ color: "#111827" }}>
                        Batch Fraud Detection
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Upload a CSV file to analyze multiple transactions at once
                    </Typography>
                </Box>
                <Chip
                    icon={<AnalyticsIcon sx={{ fontSize: "16px !important" }} />}
                    label="CSV Analysis"
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{ fontWeight: 600 }}
                />
            </Box>

            {/* ── Body ── */}
            <Box sx={{ p: 3 }}>

                {/* Drop zone */}
                <Box
                    sx={{
                        border: "1.5px dashed #C7D2FE",
                        borderRadius: 1.5,
                        textAlign: "center",
                        py: 5,
                        px: 3,
                        bgcolor: "#F5F7FF",
                        transition: "border-color 0.2s",
                        "&:hover": { borderColor: "#4F46E5" },
                    }}
                >
                    <UploadFileIcon sx={{ fontSize: 44, color: "#4F46E5", mb: 1.5 }} />

                    <Typography variant="subtitle1" fontWeight={600} mb={0.5} sx={{ color: "#111827" }}>
                        Upload Transaction CSV
                    </Typography>

                    <Typography variant="caption" color="text.secondary" display="block" mb={2.5}>
                        Required: <strong>V1–V28, Amount</strong> &nbsp;·&nbsp; Optional: <strong>Time</strong>
                    </Typography>

                    <Button
                        component="label"
                        variant="contained"
                        size="small"
                        disableElevation
                        sx={{ px: 3 }}
                    >
                        Choose CSV file
                        <input
                            hidden
                            type="file"
                            accept=".csv"
                            onChange={(e) => {
                                if (e.target.files?.length) {
                                    setFile(e.target.files[0]);
                                    setResult(null);
                                    setError(null);
                                }
                            }}
                        />
                    </Button>

                    {file && (
                        <Typography
                            variant="body2"
                            mt={2}
                            fontWeight={600}
                            sx={{ color: "#4F46E5" }}
                        >
                            📄 {file.name}
                        </Typography>
                    )}

                    {error && (
                        <Alert severity="error" sx={{ mt: 2, textAlign: "left", borderRadius: 1.5 }}>
                            {error}
                        </Alert>
                    )}

                </Box>

                {/* Analyze button */}
                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    disableElevation
                    sx={{ mt: 2, height: 48, fontWeight: 700 }}
                    disabled={!file || loading}
                    onClick={analyze}
                >
                    {loading
                        ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1 }} /> Analyzing…</>
                        : "Analyze Transactions"
                    }
                </Button>

                {/* ── Results ── */}
                {result && (
                    <Box mt={3}>

                        <Divider sx={{ mb: 2.5 }} />

                        {/* Summary row */}
                        <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap mb={2.5}>

                            <Box sx={{ px: 2, py: 1, bgcolor: "#F3F4F6", borderRadius: 1.5, border: "1px solid #E2E5EF" }}>
                                <Typography variant="caption" color="text.secondary" display="block" fontWeight={600} sx={{ textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.65rem" }}>Total</Typography>
                                <Typography variant="h6" fontWeight={700} sx={{ color: "#111827", lineHeight: 1.3 }}>{result.summary.total_transactions}</Typography>
                            </Box>

                            <Box sx={{ px: 2, py: 1, bgcolor: "#FEF2F2", borderRadius: 1.5, border: "1px solid #FECACA" }}>
                                <Typography variant="caption" sx={{ color: "#B91C1C", display: "block", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.65rem" }}>Fraud</Typography>
                                <Typography variant="h6" fontWeight={700} sx={{ color: "#DC2626", lineHeight: 1.3 }}>{result.summary.fraud_detected}</Typography>
                            </Box>

                            <Box sx={{ px: 2, py: 1, bgcolor: "#F0FDF4", borderRadius: 1.5, border: "1px solid #BBF7D0" }}>
                                <Typography variant="caption" sx={{ color: "#15803D", display: "block", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.65rem" }}>Safe</Typography>
                                <Typography variant="h6" fontWeight={700} sx={{ color: "#16A34A", lineHeight: 1.3 }}>{result.summary.safe_transactions}</Typography>
                            </Box>

                            <Box sx={{ px: 2, py: 1, bgcolor: result.summary.fraud_rate > 10 ? "#FFF7ED" : "#F0FDF4", borderRadius: 1.5, border: `1px solid ${result.summary.fraud_rate > 10 ? "#FED7AA" : "#BBF7D0"}` }}>
                                <Typography variant="caption" sx={{ color: result.summary.fraud_rate > 10 ? "#C2410C" : "#15803D", display: "block", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.65rem" }}>Fraud Rate</Typography>
                                <Typography variant="h6" fontWeight={700} sx={{ color: result.summary.fraud_rate > 10 ? "#EA580C" : "#16A34A", lineHeight: 1.3 }}>{result.summary.fraud_rate}%</Typography>
                            </Box>

                        </Stack>

                        {/* Per-row table */}
                        <TableContainer
                            component={Paper}
                            elevation={0}
                            sx={{ borderRadius: 1.5, border: "1px solid #E2E5EF", maxHeight: 380 }}
                        >
                            <Table stickyHeader size="small">
                                <TableHead>
                                    <TableRow>
                                        {["#", "Amount", "Label", "Fraud Probability"].map(h => (
                                            <TableCell
                                                key={h}
                                                sx={{
                                                    bgcolor: "#4F46E5",
                                                    color: "white",
                                                    fontWeight: 700,
                                                    fontSize: "0.72rem",
                                                    letterSpacing: "0.05em",
                                                    textTransform: "uppercase",
                                                    borderBottom: "none",
                                                    py: 1.25,
                                                }}
                                            >
                                                {h}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {result.predictions.map((row: any, idx: number) => {
                                        const isFraud = row["Label"] === "Fraud";
                                        return (
                                            <TableRow
                                                key={idx}
                                                sx={{
                                                    bgcolor: isFraud ? "#FFF5F5" : "#F9FFFE",
                                                    "&:last-child td": { borderBottom: 0 },
                                                    "&:hover": { bgcolor: isFraud ? "#FFE4E4" : "#ECFDF5" },
                                                }}
                                            >
                                                <TableCell sx={{ color: "#6B7280", fontSize: 12, py: 1 }}>{idx + 1}</TableCell>
                                                <TableCell sx={{ fontWeight: 500, color: "#374151", py: 1 }}>
                                                    {typeof row["Amount"] === "number"
                                                        ? `$${row["Amount"].toFixed(2)}`
                                                        : row["Amount"] ?? "—"}
                                                </TableCell>
                                                <TableCell sx={{ py: 1 }}>
                                                    <Chip
                                                        label={row["Label"]}
                                                        color={isFraud ? "error" : "success"}
                                                        size="small"
                                                        icon={isFraud
                                                            ? <WarningAmberIcon sx={{ fontSize: "13px !important" }} />
                                                            : <CheckCircleOutlineIcon sx={{ fontSize: "13px !important" }} />
                                                        }
                                                        sx={{ fontWeight: 600, fontSize: 11, height: 24 }}
                                                    />
                                                </TableCell>
                                                <TableCell sx={{ fontWeight: 700, color: isFraud ? "#DC2626" : "#16A34A", py: 1 }}>
                                                    {(parseFloat(row["Fraud Probability"]) * 100).toFixed(2)}%
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* Download */}
                        <Button
                            fullWidth
                            startIcon={<DownloadIcon />}
                            href={`${api.defaults.baseURL}${result.download}`}
                            target="_blank"
                            rel="noreferrer"
                            variant="outlined"
                            disableElevation
                            sx={{ mt: 2, height: 42, fontWeight: 600 }}
                        >
                            Download Full Prediction Report
                        </Button>

                    </Box>
                )}

            </Box>

        </Paper>

    );

}