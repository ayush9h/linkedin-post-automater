"use client";

import { signIn} from "next-auth/react";

export default function SignIn(){
    return(
        <>
        <button onClick={() => signIn("linkedin",{callbackUrl:"/createPage"})} className="font-funnel text-sm bg-stone-800 text-stone-100 px-5 py-2 rounded-full hover:bg-stone-900 cursor-pointer transition-all ">
            Sign in with Linkedin
        </button>        
        </>
    )
}