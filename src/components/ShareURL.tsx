"use client";

import { ShareIcon } from "@heroicons/react/24/outline";

export default function ShareURL({ id }: { id: string }) {
  return (
    <div>
      <button
        className="flex justify-center w-full py-5 bg-green-400 hover:bg-green-600 text-white font-bold rounded-full"
        onClick={() => {
          navigator.clipboard.writeText(`https://www.every.org/${id}/donate`);
        }}
      >
        Copy URL
      </button>
    </div>
  );
}
