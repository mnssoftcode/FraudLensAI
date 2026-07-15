import { Typography } from "@mui/material";

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

const COLORS = ["#EF4444", "#F59E0B", "#4F46E5", "#10B981"];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                background: "#fff",
                border: "1px solid #E2E5EF",
                borderRadius: 6,
                padding: "8px 14px",
                fontSize: 13,
                boxShadow: "0 4px 12px rgba(0,0,0,.08)",
            }}>
                <p style={{ fontWeight: 700, marginBottom: 2, color: "#111827" }}>{label}</p>
                <p style={{ color: "#4F46E5" }}>F1 Score: <strong>{(Number(payload[0].value) * 100).toFixed(2)}%</strong></p>
            </div>
        );
    }
    return null;
};

export default function ComparisonChart({ data }: Props) {

    return (

        <>
            <Typography
                variant="body2"
                color="text.secondary"
                mb={2}
                sx={{ fontWeight: 500 }}
            >
                F1 Score comparison across all trained models
            </Typography>

            <ResponsiveContainer width="100%" height={280}>

                <BarChart
                    data={data}
                    barCategoryGap="35%"
                    margin={{ top: 4, right: 8, left: -10, bottom: 0 }}
                >

                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#E9EBF0"
                    />

                    <XAxis
                        dataKey="model"
                        tick={{ fontSize: 12, fill: "#6B7280" }}
                        axisLine={false}
                        tickLine={false}
                    />

                    <YAxis
                        domain={[0, 1]}
                        tick={{ fontSize: 12, fill: "#6B7280" }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
                    />

                    <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(79,70,229,.04)" }} />

                    <Bar
                        dataKey="f1_score"
                        radius={[4, 4, 0, 0]}
                        maxBarSize={56}
                    >
                        {data.map((_: any, index: number) => (
                            <Cell
                                key={index}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Bar>

                </BarChart>

            </ResponsiveContainer>
        </>

    );

}