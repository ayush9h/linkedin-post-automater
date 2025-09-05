import Link from "next/link"
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
 
                    <Link href={"/generate"} className="font-funnel text-sm bg-zinc-800 text-zinc-100 px-5 py-2 rounded-full hover:bg-zinc-900 transition-all ">
                            Get Started
                    </Link>
                </div>

            </nav>
        </>
    )
}