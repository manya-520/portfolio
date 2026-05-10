import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

/**
 * shadcn/ui-style Switch (Radix) — same track border + thumb chrome in on/off so both states read as one control.
 */
const Switch = React.forwardRef(function Switch({ className, ...props }, ref) {
  return (
    <SwitchPrimitives.Root
      className={cn(
        "peer box-border inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-zinc-300 transition-colors",
        "bg-zinc-200 data-[state=checked]:bg-actual-accent",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full border border-zinc-200 bg-white shadow-sm transition-transform",
          "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5"
        )}
      />
    </SwitchPrimitives.Root>
  );
});
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
