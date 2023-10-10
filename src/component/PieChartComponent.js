import {
  PieChart,
  Pie,
  Legend,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

//to plot piechart from given data
export const PieChartComponent = ({ data, name }) => {
  //required data for piechart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#D733FF"];

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
    <div className="container">
      <div className="row d-flex justify-content-center text-center">
        <div className="col-md-8 pdf">
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
                  isAnimationActive={true}
                  outerRadius={130}
                  dataKey="count"
                  nameKey="feedback"
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
