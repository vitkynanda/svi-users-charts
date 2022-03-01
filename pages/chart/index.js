import React from "react";
import Layout from "../../components/layout";
import RealtimeChart from "../../components/realtime-chart";

const index = () => {
  return (
    <Layout title="Charts">
      <div>
        <p>Chart</p>
        <RealtimeChart />
      </div>
    </Layout>
  );
};

export default index;
