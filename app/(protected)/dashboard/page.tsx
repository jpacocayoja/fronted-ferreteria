'use client';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Card } from "flowbite-react";

// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
    // Datos del gráfico (esto puede venir de una API, base de datos, etc.)
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
            },
        },
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Dashboard</h1>

            {/* Card de gráfico */}
            <Card>
                <div className="text-center mb-4">
                    <h2 className="text-lg font-medium">Gráfico de Ventas</h2>
                </div>
                <Bar data={data} options={options} />
            </Card>
        </div>
    );
}
