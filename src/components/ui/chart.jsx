"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "@/lib/utils";

const ChartContext = React.createContext(null);

function useChart() {
  const ctx = React.useContext(ChartContext);
  if (!ctx) {
    throw new Error("useChart must be used within <ChartContainer />");
  }
  return ctx;
}

/**
 * @typedef {Record<string, { label?: React.ReactNode, icon?: React.ComponentType, color?: string, theme?: never }>} ChartConfig
 */

function ChartStyle({ id, config }) {
  const rules = Object.entries(config)
    .map(([key, item]) => {
      const color = item?.color;
      if (!color) return "";
      return `  --color-${key}: ${color};`;
    })
    .filter(Boolean)
    .join("\n");

  if (!rules) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `[data-chart="${id}"] {\n${rules}\n}`,
      }}
    />
  );
}

const ChartContainer = React.forwardRef(function ChartContainer(
  { id, className, children, config, ...props },
  ref
) {
  const uid = React.useId();
  const chartId = `chart-${id ?? uid.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        ref={ref}
        data-chart={chartId}
        className={cn(
          "w-full text-typ-body [&_.recharts-cartesian-axis-tick-value]:fill-actual-muted2 [&_.recharts-cartesian-axis-tick-value]:text-typ-helper [&_.recharts-cartesian-axis-tick-value]:font-semibold [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-actual-border/60 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-actual-border",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer minWidth={0} minHeight={200}>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});

function getPayloadConfigFromPayload(config, payload, key) {
  if (typeof payload !== "object" || payload === null) return undefined;
  const inner =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined;

  let k = key;
  if (key in payload && typeof payload[key] === "string") {
    k = payload[key];
  } else if (inner && key in inner && typeof inner[key] === "string") {
    k = inner[key];
  }
  return k in config ? config[k] : config[key];
}

const ChartTooltip = RechartsPrimitive.Tooltip;

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}) {
  const { config } = useChart();

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) return null;
    const item = payload[0];
    const key = `${labelKey ?? item?.dataKey ?? item?.name ?? "value"}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value =
      !labelKey && typeof label === "string"
        ? (config[label]?.label ?? label)
        : itemConfig?.label;

    if (labelFormatter) {
      return (
        <div className={cn("text-typ-body font-semibold", labelClassName)}>
          {labelFormatter(value, payload)}
        </div>
      );
    }
    if (!value) return null;
    return (
      <div className={cn("text-typ-body font-semibold", labelClassName)}>
        {value}
      </div>
    );
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey,
  ]);

  if (!active || !payload?.length) return null;

  const nestLabel = payload.length === 1 && indicator !== "dot";

  return (
    <div
      className={cn(
        "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-actual-border bg-white px-2.5 py-1.5 text-typ-body shadow-md",
        className
      )}
    >
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1">
        {payload
          .filter((item) => item.type !== "none")
          .map((item, index) => {
            const key = `${nameKey ?? item.name ?? item.dataKey ?? "value"}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            const indicatorColor =
              color ?? item.payload?.fill ?? item.color ?? item.stroke;

            return (
              <div
                key={`${String(item.dataKey)}-${index}`}
                className="flex w-full flex-wrap items-center gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-actual-muted2"
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {!hideIndicator && (
                      <span
                        className={cn(
                          "h-2.5 w-2.5 shrink-0 rounded",
                          indicator === "dashed" &&
                            "border border-dashed bg-transparent",
                          indicator === "dot" && "rounded-full",
                          indicator === "line" && "w-1"
                        )}
                        style={
                          indicator === "dashed"
                            ? { borderColor: indicatorColor }
                            : { backgroundColor: indicatorColor }
                        }
                      />
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between gap-2 leading-none",
                        nestLabel ? "items-end" : "items-center"
                      )}
                    >
                      <div className="grid gap-1">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-typ-helper text-actual-muted2">
                          {itemConfig?.label ?? item.name}
                        </span>
                      </div>
                      {item.value != null && (
                        <span className="text-typ-body font-mono font-semibold tabular-nums text-actual-text">
                          {typeof item.value === "number"
                            ? item.value.toLocaleString()
                            : String(item.value)}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export { ChartContainer, ChartTooltip, ChartTooltipContent, useChart };
