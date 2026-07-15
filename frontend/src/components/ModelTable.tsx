import {
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";

import StarIcon from "@mui/icons-material/Star";

interface Props {
    models: any[];
}

// Find best model index by f1_score
function getBestIndex(models: any[]): number {
    return models.reduce(
        (best, m, i, arr) => m.f1_score > arr[best].f1_score ? i : best,
        0
    );
}

function pct(v: number) {
    return `${(v * 100).toFixed(2)}%`;
}

export default function ModelTable({ models }: Props) {

    const bestIdx = getBestIndex(models);

    return (

        <TableContainer sx={{ borderRadius: 1.5, overflow: "hidden", border: "1px solid #E2E5EF" }}>

            <Table size="small">

                <TableHead>
                    <TableRow sx={{ bgcolor: "#4F46E5" }}>
                        {["Model", "Accuracy", "Precision", "Recall", "F1 Score", "ROC AUC"].map(col => (
                            <TableCell
                                key={col}
                                sx={{
                                    color: "white",
                                    fontWeight: 700,
                                    fontSize: "0.75rem",
                                    letterSpacing: "0.05em",
                                    textTransform: "uppercase",
                                    borderBottom: "none",
                                    py: 1.5,
                                }}
                            >
                                {col}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>

                    {models.map((model: any, index: number) => {
                        const isBest = index === bestIdx;
                        return (
                            <TableRow
                                key={model.model}
                                sx={{
                                    bgcolor: isBest ? "#FAFAFE" : (index % 2 === 0 ? "#FAFAFA" : "#fff"),
                                    "&:last-child td": { borderBottom: 0 },
                                    "&:hover": { bgcolor: "#F5F3FF" },
                                }}
                            >

                                <TableCell sx={{ py: 1.25 }}>
                                    <Chip
                                        label={model.model}
                                        size="small"
                                        icon={isBest ? <StarIcon sx={{ fontSize: "14px !important" }} /> : undefined}
                                        color={isBest ? "primary" : "default"}
                                        variant={isBest ? "filled" : "outlined"}
                                        sx={{ fontWeight: 600, fontSize: 12 }}
                                    />
                                </TableCell>

                                <TableCell sx={{ fontWeight: isBest ? 700 : 400, color: "#374151" }}>
                                    {pct(model.accuracy)}
                                </TableCell>

                                <TableCell sx={{ fontWeight: isBest ? 700 : 400, color: "#374151" }}>
                                    {pct(model.precision)}
                                </TableCell>

                                <TableCell sx={{ fontWeight: isBest ? 700 : 400, color: "#374151" }}>
                                    {pct(model.recall)}
                                </TableCell>

                                <TableCell sx={{ fontWeight: 700, color: isBest ? "#4F46E5" : "#374151" }}>
                                    {pct(model.f1_score)}
                                </TableCell>

                                <TableCell sx={{ fontWeight: isBest ? 700 : 400, color: "#374151" }}>
                                    {pct(model.roc_auc)}
                                </TableCell>

                            </TableRow>
                        );
                    })}

                </TableBody>

            </Table>

        </TableContainer>

    );

}