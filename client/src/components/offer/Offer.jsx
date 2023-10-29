import React, { useEffect, useState } from "react";
import "./offer.css";

const Offer = () => {
  let difference = +new Date(`12/10/2023`) - +new Date();
  const [delay, setDelay] = useState(difference);

  const d = Math.floor(difference / (1000 * 60 * 60 * 24));
  const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const m = Math.floor((difference / 1000 / 60) % 60);
  const s = Math.floor((difference / 1000) % 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setDelay(delay - 1);
    }, 1000);

    if (delay === 0) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  });
  return (
    <div className="offer">
      <div className="offerCards">
        <div className="offerCard">
          <h2 className="offerCardTitle">Lorem ipsum & dolor sit amet</h2>
          <p className="offerCardText">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />{" "}
            Quisquam voluptatum, quibusdam, quia, quod voluptate voluptas quos
          </p>
          <div className="cardTimer">
            {d}:{h}:{m}:{s}
          </div>
          <div className="buttonContainer">
            <button className="button">Découvrir</button>
          </div>
        </div>
        <div className="OfferCard2">
          <img src="/img/4.png" alt="" className="img-fluid" />
        </div>
      </div>
    </div>
  );
};

export default Offer;
