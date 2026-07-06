import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Typography,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/GridLegacy";

import api from "../api/api";

import Header from "../components/Header";
import MetricCard from "../components/MetricCard";
import ComparisonChart from "../components/ComparisonChart";
import ConfusionMatrix from "../components/ConfusionMatrix";
import ModelTable from "../components/ModelTable";
import PredictionForm from "../components/PredictionForm";

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
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        background: "#F5F7FA",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Header />

        {/* ================= Metrics ================= */}

        <Grid container spacing={3} mb={4}>
            <Grid xs={12} sm={6} md={3}>
              <MetricCard
                title="Best Model"
                value={data.best_model.model}
              />
            </Grid>

            <Grid xs={12} sm={6} md={3}>
              <MetricCard
                title="Accuracy"
                value={`${(data.best_model.accuracy * 100).toFixed(2)}%`}
              />
            </Grid>

            <Grid xs={12} sm={6} md={3}>
              <MetricCard
                title="F1 Score"
                value={`${(data.best_model.f1_score * 100).toFixed(2)}%`}
              />
            </Grid>

            <Grid xs={12} sm={6} md={3}>
              <MetricCard
                title="ROC AUC"
                value={`${(data.best_model.roc_auc * 100).toFixed(2)}%`}
              />
            </Grid>
        </Grid>

        {/* ================= Charts ================= */}

        <Grid container spacing={3} mb={4}>
          <Grid xs={12} lg={7}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 3,
                height: "100%",
              }}
            >
              <Typography
                variant="h6"
                fontWeight={700}
                mb={2}
              >
                Model Performance
              </Typography>

              <ComparisonChart
                data={data.comparison}
              />
            </Paper>
          </Grid>

          <Grid xs={12} lg={5}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 3,
                height: "100%",
              }}
            >
              <ConfusionMatrix
                matrix={data.best_model.confusion_matrix}
              />
            </Paper>
          </Grid>
        </Grid>

        {/* ================= Table ================= */}

        <Paper
          elevation={2}
          sx={{
            p: 3,
            borderRadius: 3,
            mb: 4,
          }}
        >
          <Typography
            variant="h6"
            fontWeight={700}
            mb={2}
          >
            Model Comparison
          </Typography>

          <ModelTable
            models={data.comparison}
          />
        </Paper>

        {/* ================= Prediction ================= */}

        <PredictionForm />

      </Container>
    </Box>
  );
}