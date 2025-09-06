"use client"
import { useSession } from "next-auth/react";
import Navbar from "../components/navbar";
import Generate from "../components/generate";
import Footer from "../components/footer";
export default function CreatePage(){

    const { data: session } = useSession();

    if (session) {
      return (
          <>
          <Navbar />
          <div className="flex flex-col min-h-screen">

              <main className="flex-grow">
                <Generate />
              </main>

              <Footer />
          </div>
          </>
      );
    }
}