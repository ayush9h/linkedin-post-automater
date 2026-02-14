import { useSession } from "next-auth/react";
import Navbar from "../components/navbar/navbar";
import Generate from "../components/generate";
import Footer from "../components/footer";

import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
export default async function CreatePage(){

    const session = await getServerSession(authOptions);

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