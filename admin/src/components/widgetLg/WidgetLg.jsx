import "./widgetLg.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function WidgetLg() {
  const [orders, setOrders] = useState([]);
  const { mode } = useContext(ThemeContext);


  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get("orders");
        setOrders(res.data);
      } catch {}
    };
    getOrders();
  }, []);

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg"  style={
      mode === "dark"
        ? { backgroundColor: "#1f1f1f", color: "white" }
        : { backgroundColor: "white", color: "black" }
    }>
      <h3 className="widgetLgTitle">Dernières transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Client</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Montant</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {orders.map((order) => (
          <tr className="widgetLgTr" key={order._id}>
            <td className="widgetLgUser">
              <span className="widgetLgName">{order.userId}</span>
            </td>
            <td className="widgetLgDate">{format(order.createdAt)}</td>
            <td className="widgetLgAmount">${order.amount}</td>
            <td className="widgetLgStatus">
              <Button type={order.status} />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
