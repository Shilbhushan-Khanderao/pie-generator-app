import {
  PieChart,
  Pie,
  Legend,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { feedbackColors, reportConfig } from "../config/reportConfig";

//to plot piechart from given data
export const PieChartComponent = ({
  data,
  name,
  count,
  animated = true,
  fullWidth = false,
}) => {
  //required data for piechart
  const FALLBACK_COLORS = reportConfig.chartColors;
  const getColor = (feedbackValue, fallbackIndex) =>
    feedbackColors[feedbackValue?.toLowerCase()] ||
    FALLBACK_COLORS[fallbackIndex % FALLBACK_COLORS.length];
  const shouldPageBreak = count % 2 === 1 ? true : false;

  const RADIAN = Math.PI / 180;

  // for label
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.25;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div style={{ pageBreakAfter: shouldPageBreak ? "always" : "auto" }}>
      <div className="row justify-content-center text-center">
        <div className={fullWidth ? "col-12 pdf" : "col-md-8 pdf"}>
          <br />
          <h4 style={{ textAlign: "center" }}>{name}</h4>

          <div className="container-fluid">
            <ResponsiveContainer
              width="100%"
              height={400}
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <PieChart
                width={400}
                height={400}
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={renderCustomizedLabel}
                  isAnimationActive={animated}
                  outerRadius={130}
                  dataKey="count"
                  nameKey="feedback"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={getColor(entry.feedback, index)}
                    />
                  ))}
                </Pie>
                <Legend
                  height={40}
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PieChartComponent;
