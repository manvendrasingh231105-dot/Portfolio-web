import React from "react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2.5 group">
      <svg
        viewBox="0 0 540 400"
        className="w-11 h-8 select-none shrink-0 group-hover:scale-105 transition-transform duration-300"
        fill="none"
        xmlns="http://www.w3.org/2005/svg"
      >
        {/* The 'M' Glyph in dark navy blue */}
        <path
          d="M 30 80 V 340 H 90 V 210 L 160 290 L 230 210 V 340 H 293 V 80 H 235 L 160 170 L 85 80 H 30 Z"
          fill="#1d2e47"
        />
        {/* The 'S' Glyph intertwines with the right leg of M */}
        <path
          d="M 320 156 C 290 156 260 140 260 110 C 260 80 290 50 335 50 C 380 50 410 80 410 115 H 470 C 470 50 405 2 335 2 C 255 2 200 50 200 115 C 200 160 230 195 275 210 L 330 225 C 380 240 405 255 405 285 C 405 315 375 345 330 345 C 280 345 250 310 250 275 H 190 C 190 340 245 401 330 401 C 410 401 465 348 465 280 C 465 230 435 195 380 175 C 345 165 320 160 320 156 Z"
          fill="#1d2e47"
        />
        {/* The Gold Dot next to S */}
        <circle cx="488" cy="148" r="22" fill="#b99e63" />
      </svg>
      <span className="font-extrabold text-sm tracking-tight text-zinc-900 group-hover:text-zinc-650 transition-colors">
        Manvendra Singh
      </span>
    </div>
  );
}
