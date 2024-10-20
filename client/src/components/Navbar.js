import { NavLink } from "react-router-dom";
export default function Navbar() {
    return(
        <>
        <nav className="bg-white p-4 shadow-md">
            <div className="max-width container mx-auto px-4 flex justify-center items-center">
                <div className="flex justify-between items-center w-full max-w-4xl">
                    <div className="flex">
                        <NavLink to="/" className="font-ubuntu text-2xl flex justify-center items-center">
                            Post.ai <span className="bg-black text-white text-sm px-2 py-1 rounded-md ml-2">Beta build</span>
                        </NavLink>
                    </div>

                    <div>
                        <NavLink to="/postanalysis" className="font-ubuntu px-4 py-2 rounded-md hover:bg-slate-200 transition-all">Analyse Posts</NavLink>
                    </div>
                </div>    
            </div>
        </nav>
        </>
    );
}
