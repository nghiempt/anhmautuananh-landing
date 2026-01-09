import type { SliderValue } from "@heroui/react";

import React from "react";
import { Slider } from "@heroui/react";

export default function SliderRange() {
  const [value, setValue] = React.useState<SliderValue>([100, 300]);

  return (
    <div className="flex flex-col gap-2 w-full h-full max-w-md items-start justify-center pl-3">
      <Slider
        className="max-w-md text-xs"
        formatOptions={{ style: "currency", currency: "VND" }}
        label="Hãy chọn khoảng giá"
        maxValue={1000}
        minValue={0}
        step={10}
        value={value}
        onChange={setValue}
        showOutline={false}
        size="sm"
        renderThumb={({ index, ...props }) => (
          <div
            {...props}
            className="group p-0 top-1/2 bg-background border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
          >
            <span
              className={
                "transition-transform bg-black shadow-small rounded-full w-5 h-5 block"
              }
            />
          </div>
        )}
      />
      <p className="text-default-500 font-medium text-xs">
        Giá: {Array.isArray(value) && value.map((b) => `$${b}`).join(" – ")}
      </p>
    </div>
  );
}
