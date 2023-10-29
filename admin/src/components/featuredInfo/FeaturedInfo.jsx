import "./featuredInfo.css";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext.js";

export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);
  const { mode } = useContext(ThemeContext); 

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await axios.get("orders/income");
        setIncome(res.data);
        setPerc((res.data[1].total * 100) / res.data[0].total - 100);
      } catch {}
    };
    getIncome();
  }, []);
  return (
    <div className="featured">
      <div
        className={"featuredItem"}
        style={
          mode === "dark"
            ? { backgroundColor: "#1f1f1f", color: "white" }
            : { backgroundColor: "white", color: "black" }
        }
      >
        <span className="featuredTitle">Revenus</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{income[1]?.total}€</span>
          <span className="featuredMoneyRate">
            %{Math.floor(perc)}{" "}
            {perc < 0 ? (
              <ArrowDownwardIcon className="featuredIcon negative" />
            ) : (
              <ArrowUpwardIcon className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">Par rapport au mois dernier</span>
      </div>
      <div
        className="featuredItem"
        style={
          mode === "dark"
            ? { backgroundColor: "#1f1f1f", color: "white" }
            : { backgroundColor: "white", color: "black" }
        }
      >
        <span className="featuredTitle">Ventes</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">4,415 €</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownwardIcon className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">Par rapport au mois dernier</span>
      </div>
      <div
        className="featuredItem"
        style={
          mode === "dark"
            ? { backgroundColor: "#1f1f1f", color: "white" }
            : { backgroundColor: "white", color: "black" }
        }
      >
        <span className="featuredTitle">Coût</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">2,225 €</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpwardIcon className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">Par rapport au mois dernier</span>
      </div>
    </div>
  );
}
