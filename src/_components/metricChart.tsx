import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MetricChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Metric Chart</CardTitle>
            </CardHeader>
            <CardContent>
                <h1 className="text-2xl font-bold">100</h1>
            </CardContent>
        </Card>
    )
}