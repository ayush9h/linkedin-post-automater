"use client"
import Link from "next/link"
import SignIn from "./signin"
export default function Navbar(){
    return(
        <>
            <nav className="flex justify-around items-center content-center max-w-xl mx-auto md:max-w-6xl lg:max-w-7xl p-2.5">

                {/* Title */}
                <Link href={"/"} className="font-funnel text-sm md:text-md lg:text-lg xl:text-xl font-semibold">
                    Post.ai
                </Link>


                {/* Links */}
                <div className="flex items-center gap-8">
                    <Link href={"https://github.com/ayush9h/linkedin-post-automater"} className="font-funnel text-sm hover:underline">
                            Github
                    </Link>

                    <SignIn/>
                    
                </div>

            </nav>
        </>
    )
}