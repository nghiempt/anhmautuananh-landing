// components/ReadingTestCollection.tsx
"use client";

import React from "react";
import Marquee from "../section-marquee";

const Section7: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-0 py-20">
      <section className="border-y border-gray-200 py-4">
        <Marquee />
      </section>
    </div>
  );
};

export default Section7;
