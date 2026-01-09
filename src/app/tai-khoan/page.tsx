"use client";

import AboutClient from "@/modules/gioi-thieu";
import AccountClient from "@/modules/tai-khoan";
import React, { Suspense } from "react";

export default function AccountPage() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Suspense fallback={<div></div>}>
        <AccountClient />
      </Suspense>
    </div>
  );
}
