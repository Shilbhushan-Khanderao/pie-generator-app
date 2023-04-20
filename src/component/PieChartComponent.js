import {
  PieChart,
  Pie,
  Legend,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

//required global variables for count of piechart occurence
let explanationCount = 0;
let paceCount = 0;
let interactionCount = 0;
let practicalCount = 0;
let overallCount = 0;

//to plot piechart from given data
export const PieChartComponent = (props) => {
  //required data for piechart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#D733FF"];
  const data = props.data;
  const name = props.name;
  let decision = false;

  //condition for giving page break
  if (name.includes("Explanation")) {
    explanationCount++;
    explanationCount >= 2 ? (decision = true) : (decision = false);
  }
  //condition for giving page break, nested to check if explanation is present 1 or 2 times
  if (name.includes("Pace")) {
    paceCount++;
    explanationCount >= 2
      ? paceCount >= 2
        ? (decision = true)
        : (decision = false)
      : paceCount >= 1
      ? (decision = true)
      : (decision = false);
  }
  if (name.includes("Interaction")) {
    interactionCount++;
    interactionCount >= 2 ? (decision = true) : (decision = false);
  }
  if (name.includes("Practical")) {
    practicalCount++;
    explanationCount >= 2
      ? practicalCount >= 2
        ? (decision = true)
        : (decision = false)
      : practicalCount >= 1
      ? (decision = true)
      : (decision = false);
  }
  if (name.includes("Overall")) {
    overallCount++;
    overallCount >= 2 ? (decision = true) : (decision = false);
  }

  console.log(explanationCount);
  console.log(paceCount);
  console.log(interactionCount);
  console.log(practicalCount);
  console.log(overallCount);
  const RADIAN = Math.PI / 180;
  //for label
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
    <div
      className="container"
      style={{
        pageBreakAfter: decision ? "always" : "auto",
      }}
    >
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
