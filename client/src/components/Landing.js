export default function Landing() {
    return (
        <>
            <div className="flex flex-col items-center justify-center max-w-3xl m-auto h-96 text-center">
                <h2 className="px-4 py-2 text-xs bg-white border border-blue-400 rounded-full shadow-xl font-montserrat">
                    Beta version now live
                </h2>
                <h2 className="mt-5 text-8xl font-semibold text-slate-800 font-bebas">
                    Automate your LinkedIn <span className="text-blue-500">posts</span> in
                    seconds.
                </h2>
                <p className="mt-1 text-xl text-slate-600 font-montserrat">
                    Improve your post quality by AI-powered content and image generation
                </p>
            </div>
        </>
    )
}