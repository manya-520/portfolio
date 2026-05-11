"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { team: "Frontend", edm: 186, tickets: 80 },
  { team: "Platform", edm: 305, tickets: 200 },
  { team: "Security", edm: 237, tickets: 120 },
  { team: "Data", edm: 73, tickets: 190 },
  { team: "Mobile", edm: 209, tickets: 130 },
  { team: "Infra", edm: 214, tickets: 140 },
];

const chartConfig = {
  edm: {
    label: "EDM (estimated dev minutes)",
    color: "hsl(var(--chart-1))",
  },
  tickets: {
    label: "Tickets",
    color: "hsl(var(--chart-1) / 0.28)",
  },
};

export default function ContributionSection() {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-typ-body font-semibold text-actual-ink">
        Contribution
      </h3>

      <Card>
        <CardHeader className="gap-1 px-6 pb-2 pt-4">
          <h4 className="m-0 text-typ-body font-semibold leading-tight text-actual-ink">
            Estimated Developer Minutes (EDM) and tickets
          </h4>
        </CardHeader>
        <CardContent className="px-6 pb-0 pt-0">
          <ChartContainer
            config={chartConfig}
            className="h-[228px] w-full [&_.recharts-responsive-container]:!aspect-auto [&_.recharts-responsive-container]:max-h-none"
          >
            <BarChart
              data={chartData}
              margin={{ top: 12, right: 10, left: 8, bottom: 14 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="team"
                tickLine={false}
                tickMargin={8}
                axisLine={false}
                interval={0}
                height={28}
                padding={{ left: 4, right: 4 }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar dataKey="edm" fill="var(--color-edm)" radius={8} />
              <Bar dataKey="tickets" fill="var(--color-tickets)" radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 !px-6 !py-4">
          <div className="flex items-center gap-2 text-typ-body font-semibold leading-tight text-actual-text">
            Trending up by 5.2% this month
            <TrendingUp
              className="size-3.5 shrink-0 text-emerald-600"
              aria-hidden
              strokeWidth={2.25}
            />
          </div>
          <p className="text-typ-helper leading-tight text-actual-muted2">
            Showing EDM and tickets by squad for the last 6 months
          </p>
        </CardFooter>
      </Card>
    </section>
  );
}
