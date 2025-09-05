import Image from "next/image"
import Link from "next/link"
import Features from "./features"

export default function Landing() {
  return (
    <>
      <div className="flex flex-col justify-around items-center content-center max-w-xl mx-auto md:max-w-6xl lg:max-w-7xl mt-20">
        
        
       <div className="max-w-2xl text-center">
              <h2 className="text-3xl md:text-4xl xl:text-6xl font-semibold text-zinc-800 font-funnel">
                Automate your Linkedin in seconds.
              </h2>

              <p className="mt-5 text-md md:text-xl text-zinc-600 font-funnel">
                Improve your post quality by AI-powered content and image
                generation for maximum engagement and reach.
              </p>
        </div>

        <Link href={"/generate"} className="mt-5 font-funnel text-sm bg-zinc-800 text-zinc-100 px-5 py-2 rounded-full hover:bg-zinc-900 transition-all">
            Get Started
        </Link>


        <Image src={"/demo.png"}
            alt="Demo Image"
            width={900} height={800} className="mt-15 border border-zinc-300 rounded-3xl">
        </Image>

        <Features/>
      
      </div>
    </>
  )
}