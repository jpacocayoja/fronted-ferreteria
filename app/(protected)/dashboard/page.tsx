'use client';
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Card } from "flowbite-react";

// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  // Datos del gráfico (pueden venir de una API)
  const data = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
    datasets: [
      {
        label: "Ventas por mes",
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Opciones de configuración del gráfico
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Gráfico de Ventas",
        color: "#000", // se puede personalizar dinámicamente si quieres
      },
      legend: {
        labels: {
          color: "#000",
        },
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#000",
        bodyColor: "#000",
      },
    },
    scales: {
      x: {
        ticks: { color: "#000" },
        grid: { color: "rgba(0,0,0,0.1)" },
      },
      y: {
        ticks: { color: "#000" },
        grid: { color: "rgba(0,0,0,0.1)" },
      },
    },
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Card de gráfico */}
      <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <div className="text-center mb-4">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Gráfico de Ventas
          </h2>
        </div>
        <Bar data={data} options={options} />
      </Card>
    </div>
  );
}
