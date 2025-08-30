import { NavLink } from "react-router-dom"
export default function Landing() {
    return (
        <>
            <div className="flex flex-col items-center justify-center max-w-3xl m-auto h-80 text-center">
                <h2 className="text-6xl font-semibold text-slate-800 font-plex">
                    Automate your LinkedIn <span className="text-blue-500">posts</span> in
                    seconds.
                </h2>
                <p className="mt-5 text-xl text-slate-600 font-montserrat">
                    Improve your post quality by AI-powered content and image generation
                </p>


                <NavLink to="/generate" className="mt-5 bg-blue-800 hover:bg-blue-900 transition-all text-zinc-100 text-sm px-4 py-2 rounded-xl font-plex">
                    Generate for free
                </NavLink>

            </div>

            
        </>
    )
}