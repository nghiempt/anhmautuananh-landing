"use client";

import OrderClient from "@/modules/tao-don-hang";
import React, { Suspense } from "react";

export default function OrderPage() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Suspense fallback={<div></div>}>
        <OrderClient />
      </Suspense>
    </div>
  );
}
