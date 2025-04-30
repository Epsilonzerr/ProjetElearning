"use client";

import Link from "next/link";

export default function StaticLogo() {
  return (
    <Link href="/" className="relative block w-[110px] h-[36px] overflow-hidden">
      {/* E part */}
      <div
        className="absolute left-0 top-0 h-full w-[36px] bg-no-repeat bg-contain bg-left z-20"
        style={{
          backgroundImage: "url('/Group 4.png')",
        }}
      ></div>

      {/* Valyo part */}
      <div
        className="absolute left-[36px] top-0 h-full w-[74px] bg-no-repeat bg-contain bg-left z-10"
        style={{
          backgroundImage: "url('/Group 5.png')",
        }}
      ></div>
    </Link>
  );
}
