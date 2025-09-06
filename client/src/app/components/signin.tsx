"use client";

import { signIn} from "next-auth/react";

export default function SignIn(){
    return(
        <>
        <button onClick={() => signIn("linkedin",{callbackUrl:"/createPage"})} className="font-funnel text-sm bg-zinc-800 text-zinc-100 px-5 py-2 rounded-full hover:bg-zinc-900 cursor-pointer transition-all ">
            Sign in with Linkedin
        </button>        
        </>
    )
}