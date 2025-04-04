import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import API from "../assets/api";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = { /* Your data here */ };

return <Pie data={data} />;

function AnalyticsChart() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    API.get("/images/analytics/stats").then((res) => setStats(res.data));
  }, []);

  const data = {
    labels: ["Original Size", "Compressed Size"],
    datasets: [
      {
        data: [stats.totalOriginalSize, stats.totalCompressedSize],
        backgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold">Compression Analytics</h2>
      <Doughnut data={data} />
    </div>
  );
}

export default AnalyticsChart;
