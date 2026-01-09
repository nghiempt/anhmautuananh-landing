"use client";

import { useState } from "react";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { HELPER } from "@/utils/helper";

export default function SliderRange({
  value,
  onValueChange,
  min,
  max,
  step,
}: {
  value: number[];
  onValueChange: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <Label className="leading-6">Chọn giá</Label>
        <output className="text-sm font-medium tabular-nums">
          {HELPER.formatVND(String(value[0]))} -{" "}
          {HELPER.formatVND(String(value[1]))}
        </output>
      </div>
      <Slider
        value={value}
        onValueChange={onValueChange}
        min={min || 0}
        max={max || 1000}
        step={step || 1}
        aria-label="Dual range slider with output"
      />
    </div>
  );
}
