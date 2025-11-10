"use client"

import { ChartBarLabel } from "@/_components/BarChart";
import MetricChart from "@/_components/MetricChart";

/*
- Número total de membros ativos.
- Total de indicações feitas no mês.
- Total de "obrigados" registrados no mês.
*/


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
    <div>
      <h1 className="text-2xl font-bold">Dashboard
      /*
- Número total de membros ativos.
- Total de indicações feitas no mês.
- Total de "obrigados" registrados no mês.
*/
      </h1>
    </div>
      <div className="flex flex-col gap-2 m-20">
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