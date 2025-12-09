import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function ChartCard({ title, labels, values }) {
  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: values,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
      <h3 className="text-sm font-medium mb-3">{title}</h3>
      <Bar data={data} options={options} />
    </div>
  );
}
