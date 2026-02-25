import Link from "next/link";

export default function Footer() {
  return (
    <footer className="max-w-7xl mx-auto mt-12 bg-stone-950 rounded-t-3xl overflow-hidden">
      <div className="px-6 py-12 font-funnel flex flex-col items-center text-center">

        <Link
          href="/"
          className="text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight
            bg-gradient-to-b from-white via-stone-300 to-stone-700
            bg-clip-text text-transparent">
          Post.ai
        </Link>

        <ul className="mt-10 flex gap-8 flex-wrap justify-center text-sm text-stone-400">
          <li>
            <Link
              href="https://github.com/ayush9h/linkedin-post-automater"
              className="hover:text-white transition-colors">
              GitHub
            </Link>
          </li>

          <li>
            <Link
              href="https://github.com/ayush9h/linkedin-post-automater"
              className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </li>
        </ul>

        <div className="mt-12 border-t border-stone-800 w-full pt-6 text-sm text-stone-500">
          © {new Date().getFullYear()} Post.ai. All rights reserved.
        </div>

      </div>
    </footer>
  );
}