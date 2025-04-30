"use client";

import Link from "next/link";

export function AnimatedLogo() {
  return (
    <Link href="/" className="logo-link relative block h-10 w-[120px] overflow-hidden no-underline">
      <div className="e-part absolute top-0 left-0 h-full z-[2] bg-no-repeat bg-contain bg-center" />
      <div className="valyo-wrapper absolute top-0 left-[36px] h-full overflow-hidden">
        <div className="valyo-part h-full bg-no-repeat bg-left bg-contain" />
      </div>

      <style jsx>{`
        .logo-link {
          height: 40px; /* 🔥 A nice normal size */
          width: 120px; /* 🔥 A bit wider */
          overflow: hidden;
          text-decoration: none;
          position: relative;
          display: block;
        }

        .e-part {
          width: 36px; /* The "E" part a bit bigger */
          background-image: url('/Group 4.png');
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center left;
        }

        .valyo-wrapper {
          width: calc(100% - 36px);
          position: relative;
          z-index: 1;
          overflow: hidden;
        }

        .valyo-part {
          width: 200%;
          background-image: url('/Group 5.png');
          background-size: contain;
          background-repeat: no-repeat;
          background-position: left center;
          animation: slide-valyo 4s infinite;
        }

        @keyframes slide-valyo {
          0% {
            transform: translateX(0);
            opacity: 1;
          }
          20% {
            transform: translateX(-50%);
            opacity: 0.7;
          }
          30% {
            transform: translateX(-75%);
            opacity: 0;
          }
          50% {
            transform: translateX(100%);
            opacity: 0;
          }
          60% {
            transform: translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </Link>
  );
}
