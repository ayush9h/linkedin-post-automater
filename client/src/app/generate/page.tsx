"use client"
import { useSession } from "next-auth/react";
import Navbar from "../components/navbar";
export default function Generate(){

    const { data: session } = useSession();

    if (session) {
      return (
        <Navbar/>
      );
    }
}