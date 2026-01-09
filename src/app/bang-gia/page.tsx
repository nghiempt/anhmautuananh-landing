"use client";

import PriceClient from "@/modules/gia-ca";
import AboutClient from "@/modules/gioi-thieu";
import React, { Suspense } from "react";

export default function PricePage() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Suspense fallback={<div></div>}>
        <PriceClient />
      </Suspense>
    </div>
  );
}
