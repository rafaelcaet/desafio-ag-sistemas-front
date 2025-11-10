"use client"

import { ChartBarLabel } from "@/_components/barChart";
import MetricChart from "@/_components/metricChart";

/*
- Número total de membros ativos.
- Total de indicações feitas no mês.
- Total de "obrigados" registrados no mês.
*/
export default function Dashboard() {
  return (
    <>
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
    </div>
      <div className="flex flex-col gap-6 m-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricChart />
          <MetricChart />
          <MetricChart />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartBarLabel />
          <ChartBarLabel />
        </div>
      </div>
    </>
  );
}