"use client";

import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <button
      onClick={() => signIn("linkedin", { callbackUrl: "/createPage" })}
      className="font-funnel text-sm bg-stone-200 text-stone-800 px-4 py-2 rounded-lg hover:bg-stone-300 cursor-pointer transition-all">
      Get Started
    </button>
  );
}