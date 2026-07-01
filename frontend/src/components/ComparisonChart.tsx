import {
    Card,
    CardContent,
    Typography,
} from "@mui/material";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Cell,
} from "recharts";

interface Props {
    data: any[];
}

const COLORS = [
    "#EF4444",
    "#F59E0B",
    "#4F46E5",
    "#10B981",
];

export default function ComparisonChart({ data }: Props) {

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
                    Model Performance (F1 Score)
                </Typography>

                <ResponsiveContainer
                    width="100%"
                    height={330}
                >

                    <BarChart
                        data={data}
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="model"
                        />

                        <YAxis
                            domain={[0, 1]}
                        />

                        <Tooltip />

                        <Bar
                            dataKey="f1_score"
                            radius={[8, 8, 0, 0]}
                        >

                            {data.map((_: any, index: number) => (

                                <Cell
                                    key={index}
                                    fill={
                                        COLORS[
                                            index % COLORS.length
                                        ]
                                    }
                                />

                            ))}

                        </Bar>

                    </BarChart>

                </ResponsiveContainer>

            </CardContent>

        </Card>

    );

}