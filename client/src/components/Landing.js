import { NavLink } from "react-router-dom"

export default function Landing() {
  return (
    <>
      <div className="flex flex-col items-center justify-center max-w-3xl m-auto text-center py-20">
        <h2 className="text-6xl font-semibold text-slate-800 font-plex">
          Automate your LinkedIn <span className="text-blue-500">posts</span> in
          seconds.
        </h2>
        <p className="mt-5 text-xl text-slate-600 font-montserrat">
          Improve your post quality by AI-powered content and image generation
        </p>

        <NavLink
          to="/generate"
          className="mt-5 bg-blue-800 hover:bg-blue-900 transition-all text-zinc-100 text-sm px-4 py-2 rounded-xl font-plex"
        >
          Generate for free
        </NavLink>

        <img
          src="/demo.png"
          alt="Demo Preview"
          className="mt-12 rounded-xl shadow-lg w-full max-w-4xl border border-zinc-200"
        />
      </div>
    </>
  )
}
