import {
    Chip,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";

interface Props {
    models: any[];
}

export default function ModelTable({ models }: Props) {

    return (

        <TableContainer
            component={Paper}
            elevation={3}
            sx={{
                borderRadius: 3,
            }}
        >

            <Table>

                <TableHead>

                    <TableRow
                        sx={{
                            background: "#4F46E5",
                        }}
                    >

                        <TableCell sx={{ color: "white", fontWeight: 700 }}>
                            Model
                        </TableCell>

                        <TableCell sx={{ color: "white", fontWeight: 700 }}>
                            Accuracy
                        </TableCell>

                        <TableCell sx={{ color: "white", fontWeight: 700 }}>
                            Precision
                        </TableCell>

                        <TableCell sx={{ color: "white", fontWeight: 700 }}>
                            Recall
                        </TableCell>

                        <TableCell sx={{ color: "white", fontWeight: 700 }}>
                            F1
                        </TableCell>

                        <TableCell sx={{ color: "white", fontWeight: 700 }}>
                            ROC
                        </TableCell>

                    </TableRow>

                </TableHead>

                <TableBody>

                    {models.map((model: any, index: number) => (

                        <TableRow
                            key={model.model}
                            hover
                            sx={{
                                background:
                                    index % 2 === 0
                                        ? "#fafafa"
                                        : "white",
                            }}
                        >

                            <TableCell>

                                <Chip
                                    label={model.model}
                                    color={
                                        index === models.length - 1
                                            ? "success"
                                            : "primary"
                                    }
                                />

                            </TableCell>

                            <TableCell>{model.accuracy}</TableCell>

                            <TableCell>{model.precision}</TableCell>

                            <TableCell>{model.recall}</TableCell>

                            <TableCell>{model.f1_score}</TableCell>

                            <TableCell>{model.roc_auc}</TableCell>

                        </TableRow>

                    ))}

                </TableBody>

            </Table>

        </TableContainer>

    );

}