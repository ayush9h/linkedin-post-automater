import SignIn from "./signin"
import Image from "next/image"
import Features from "./features"

import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "../lib/auth"

export default async function Landing() {

  const session = await getServerSession(authOptions);

  return (
    <>
    <div className="flex flex-col justify-around items-center content-center max-w-xl mx-auto md:max-w-6xl lg:max-w-7xl mt-5 rounded-3xl bg-[radial-gradient(circle_at_top,_rgba(64,64,64,0.85)_0%,_rgba(28,28,28,0.95)_35%,_rgba(10,10,10,1)_65%)]">
       <div className="max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl xl:text-6xl font-semibold text-stone-100 font-funnel mt-10">
            Automate your Linkedin in seconds.
          </h2>

          <p className="mt-5 text-md md:text-xl text-stone-400 font-funnel">
            Improve your post quality by AI-powered content and image
            generation for maximum engagement and reach.
          </p>
        </div>

        <div className="flex items-center gap-4 mt-10">
        {session ? (
          <>
          <Link href={"/createPage"}  className="font-funnel text-sm bg-stone-200 text-stone-800 px-4 py-2 rounded-lg hover:bg-stone-300 cursor-pointer transition-all">
              Create Posts
          </Link>
          <Link
            href="/"
            className="font-funnel text-sm text-stone-100 px-5 py-2 rounded-lg border border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 active:scale-[0.98] transition-all duration-200 ease-out"
          >
            How to Use
          </Link>
          </>
        ):(
          <>
            <SignIn/>
            <Link href={"/"} className="font-funnel text-sm text-stone-100 px-5 py-2 rounded-lg border border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 active:scale-[0.98] transition-all duration-200 ease-out">
              How to Use
          </Link>
          </>
        )}
        </div>
        

        {/* Landing page Image */}
        <div className="mt-10 w-full flex justify-center mb-10">
          <div className=" w-full max-w-6xl md:p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-stone-100/20

          ">
            <div className="rounded-3xl overflow-hidden">
              <Image
                src="/demos/demo.png"
                alt="Demo Image"
                width={1400}
                height={900}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>

      </div>

      {/* Features */}
      <Features/>      
    </>
  )
}