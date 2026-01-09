"use client";

import React from "react";

interface HtmlContentProps {
  html: string;
  className?: string;
}

// Simple HTML normalizer. We keep tags and fix a few common inputs (e.g., stray &nbsp;)
function normalizeHtml(html: string): string {
  if (!html) return "";
  let out = html;
  // Normalize non-breaking spaces to normal spaces where appropriate
  out = out.replace(/&nbsp;/g, "&nbsp;");
  // Ensure <br> becomes <br /> for React hydration consistency
  out = out.replace(/<br(?!\s*\/)>/gi, "<br/>");
  return out;
}

const HtmlContent: React.FC<HtmlContentProps> = ({ html, className = "" }) => {
  const safeHtml = normalizeHtml(html);

  return (
    <div
      className={
        // prose-style defaults for rich text and tweaks for ul/li spacing
        `prose max-w-none text-gray-700 ` +
        `prose-p:my-3 prose-strong:font-semibold prose-strong:text-gray-900 ` +
        `prose-ul:list-disc prose-ul:pl-6 prose-li:my-1 ` +
        `prose-a:text-[rgb(var(--fifteenth-rgb))] ` +
        `${className}`
      }
    >
      <div dangerouslySetInnerHTML={{ __html: safeHtml }} />
    </div>
  );
};

export default HtmlContent;
