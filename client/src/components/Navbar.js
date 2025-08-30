import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex font-plex items-center justify-around px-6 py-3 text-white border-b border-zinc-300">
      <div>
        <NavLink to="/" className="font-plex text-zinc-700 text-xl">
          Post<span className="font-semibold text-blue-700">.ai</span>
        </NavLink>
      </div>
      <div className="flex space-x-8 text-sm">
        <a href="#features" className="text-zinc-700 hover:text-zinc-900 font-plex hover:underline transition-all">Features</a>
       
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-zinc-700 hover:text-zinc-900 font-plex hover:underline transition-all">GitHub</a>
      </div>
      <div>
        <NavLink to="/generate" className="bg-blue-800 hover:bg-blue-900 transition-all text-zinc-100 text-sm px-4 py-2 rounded-md ">
          Get Started
        </NavLink>
      </div>
    </nav>
  );
}
