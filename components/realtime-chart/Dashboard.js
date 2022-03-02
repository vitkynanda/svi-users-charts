import { CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import DetailChart from "./detail-chart";

function Dashboard({ price, data, pair, loading }) {
  const [updateData, setUpdateData] = useState({});
  const opts = {
    tooltips: {
      intersect: false,
      mode: "index",
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  useEffect(() => {
    setUpdateData(data);
  }, [data]);

  useEffect(() => {
    if (data?.datasets !== undefined) {
      const lastPriceIndex = data?.datasets[0]?.data?.length - 1;
      if (lastPriceIndex) {
        const values = [...data?.datasets[0]?.data];
        values[lastPriceIndex] = Number(price);
        setUpdateData({
          ...data,
          datasets: [{ ...data?.datasets[0], data: values }],
        });
      }
    }
  }, [data, price]);

  if (price === "0.00") {
    return (
      <h2 className="mt-5">
        {loading ? "Loading data" : "Please select a currency pair"}
      </h2>
    );
  }

  return (
    <div className="dashboard">
      <h2>{`$${price}`}</h2>
      <div>
        <DetailChart
          data={updateData}
          options={opts}
          price={price}
          pair={pair}
        />
      </div>
      <div className="chart-container">
        <Line data={updateData} options={opts} />
      </div>
    </div>
  );
}

export default Dashboard;
