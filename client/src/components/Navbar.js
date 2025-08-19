import { NavLink } from "react-router-dom";
export default function Navbar() {
    return(
        <>
        <nav className="bg-transparent p-4">
            <div className="max-width p-4 flex justify-center items-center">
                <div className="flex justify-between items-center w-full max-w-4xl">
                    <div className="flex">
                        <NavLink to="/" className="font-montserrat text-2xl flex justify-center items-center">
                            Post<span className="text-blue-500 font-semibold italic">.ai</span>
                        </NavLink>
                    </div>

                    {/* <div>
                        <NavLink to="/postanalysis" className="font-montserrat px-4 py-3 rounded-full hover:bg-slate-200 hover:font-semibold transition-all">Analyse Posts</NavLink>
                    </div> */}
                </div>    
            </div>
        </nav>
        </>
    );
}
