"use client"

import { ChartBarLabel } from "@/_components/BarChart";
import MetricChart from "@/_components/MetricChart";

const chartData = [
  { label: "January", value: 186 },
  { label: "February", value: 305 },
  { label: "March", value: 237 },
  { label: "April", value: 73 },
  { label: "May", value: 209 },
  { label: "June", value: 214 },
]

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-col gap-2 mx-20">
        <h1 className="text-3xl font-bold text-[#13679F] py-4">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <MetricChart title="Membros Ativos" value={100}  />
          <MetricChart title="Indicações Feitas" value={100} />
          <MetricChart title="Obrigados Registrados" value={100} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {ChartBarLabel("Indicações Mensais", chartData)}
          {ChartBarLabel("Engajamento dos Usuários", chartData)}
        </div>
      </div>
    </>
  );
}