// import { View, StyleSheet } from "@react-pdf/renderer";
// import { Page, Document } from "react-pdf";
import {
  PieChart,
  Pie,
  Legend,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export const PieChartComponent = (props) => {
  // const styles = StyleSheet.create({
  //   page: {
  //     flexDirection: "row",
  //     backgroundColor: "#E4E4E4",
  //   },
  //   section: {
  //     margin: 10,
  //     padding: 10,
  //     flexGrow: 1,
  //   },
  // });

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#D733FF"];

  const data = props.data;
  const name = props.name;

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
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
    <div className="container">
      <div className="row d-flex justify-content-center text-center">
        <div className="col-md-8 pdf">
          <br />
          <h4 style={{ textAlign: "center" }}>{name}</h4>
          <hr />
          <div className="container-fluid">
            <ResponsiveContainer
              width="100%"
              height={400}
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <PieChart
                width={450}
                height={450}
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={renderCustomizedLabel}
                  isAnimationActive={true}
                  outerRadius={110}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="fb"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
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
