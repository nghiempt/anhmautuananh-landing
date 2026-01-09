import SSOAuth from "@/modules/ssoa";
import React, { Suspense } from "react";

export default function Account() {
  return (
    <Suspense fallback={<div>...</div>}>
      <SSOAuth />
    </Suspense>
  );
}
