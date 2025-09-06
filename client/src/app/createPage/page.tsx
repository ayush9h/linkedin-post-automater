"use client"
import { useSession } from "next-auth/react";
import Navbar from "../components/navbar";
export default function CreatePage(){

    const { data: session } = useSession();

    if (session) {
      return (
        <Navbar/>

        // <Generate/>
      );
    }
}