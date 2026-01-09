"use client";

import AboutClient from "@/modules/gioi-thieu";
import React, { Suspense } from "react";

export default function AboutPage() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Suspense fallback={<div></div>}>
        <AboutClient />
      </Suspense>
    </div>
  );
}
