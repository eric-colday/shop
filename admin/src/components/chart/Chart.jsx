import "./chart.css";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function Chart({ title, data, dataKey, grid }) { 
  const { mode } = useContext(ThemeContext);
  
  return (
    <div
      className="chart"
      style={
        mode === "dark"
          ? { backgroundColor: "#1f1f1f", color: "white" }
          : { backgroundColor: "white", color: "black" }
      }
    >
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#008080"  />
          <Line type="monotone" dataKey={dataKey} stroke="#008080" />
          <Tooltip />
          {grid && <CartesianGrid stroke="#008080" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
