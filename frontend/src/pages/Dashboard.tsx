import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/GridLegacy";

import api from "../api/api";

import Header from "../components/Header";
import MetricCard from "../components/MetricCard";
import ComparisonChart from "../components/ComparisonChart";
import ConfusionMatrix from "../components/ConfusionMatrix";
import ModelTable from "../components/ModelTable";
import PredictionForm from "../components/PredictionForm";

function SectionLabel({ children }: { children: string }) {
  return (
    <Typography
      variant="overline"
      sx={{
        display: "block",
        color: "#6B7280",
        fontWeight: 700,
        letterSpacing: "0.1em",
        mb: 1.5,
        fontSize: "0.72rem",
      }}
    >
      {children}
    </Typography>
  );
}

export default function Dashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/metrics/");
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, []);

  if (!data) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 2,
          bgcolor: "#F0F2F8",
        }}
      >
        <CircularProgress sx={{ color: "#4F46E5" }} />
        <Typography color="text.secondary" variant="body2">
          Loading model metrics…
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ background: "#F0F2F8", minHeight: "100vh" }}>
      <Container maxWidth="xl" sx={{ py: 3, px: { xs: 2, md: 3 } }}>

        {/* ── Header ── */}
        <Header />

        {/* ── Metric Cards ── */}
        <Box mb={3}>
          <SectionLabel>Model Performance Overview</SectionLabel>
          <Grid container spacing={2}>
            <Grid xs={12} sm={6} md={3}>
              <MetricCard title="Best Model" value={data.best_model.model} />
            </Grid>
            <Grid xs={12} sm={6} md={3}>
              <MetricCard title="Accuracy" value={`${(data.best_model.accuracy * 100).toFixed(2)}%`} />
            </Grid>
            <Grid xs={12} sm={6} md={3}>
              <MetricCard title="F1 Score" value={`${(data.best_model.f1_score * 100).toFixed(2)}%`} />
            </Grid>
            <Grid xs={12} sm={6} md={3}>
              <MetricCard title="ROC AUC" value={`${(data.best_model.roc_auc * 100).toFixed(2)}%`} />
            </Grid>
          </Grid>
        </Box>

        {/* ── Charts ── */}
        <Box mb={3}>
          <SectionLabel>Visual Analysis</SectionLabel>
          <Grid container spacing={2} alignItems="stretch">

            <Grid xs={12} lg={7}>
              <Paper
                elevation={0}
                sx={{
                  p: "20px 24px",
                  border: "1px solid #E2E5EF",
                  borderRadius: 2,
                  height: "100%",
                }}
              >
                <Typography variant="h6" fontWeight={700} mb={0.5} sx={{ color: "#111827" }}>
                  Model Performance
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <ComparisonChart data={data.comparison} />
              </Paper>
            </Grid>

            <Grid xs={12} lg={5}>
              <ConfusionMatrix matrix={data.best_model.confusion_matrix} />
            </Grid>

          </Grid>
        </Box>

        {/* ── Model Table ── */}
        <Box mb={3}>
          <SectionLabel>Model Comparison</SectionLabel>
          <Paper
            elevation={0}
            sx={{
              p: "20px 24px",
              border: "1px solid #E2E5EF",
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" fontWeight={700} mb={0.5} sx={{ color: "#111827" }}>
              All Models
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <ModelTable models={data.comparison} />
          </Paper>
        </Box>

        {/* ── CSV Upload ── */}
        <Box mb={4}>
          <SectionLabel>Batch Prediction</SectionLabel>
          <PredictionForm />
        </Box>

      </Container>
    </Box>
  );
}