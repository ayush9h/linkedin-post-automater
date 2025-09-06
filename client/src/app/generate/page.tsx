"use client"
import { useSession, signOut } from "next-auth/react";
export default function Generate(){

    const { data: session, status } = useSession();

    if (status === "loading") {
      return <p>Loading...</p>;
    }

    if (session) {
      return (
        <div>
          <p>Signed in as {session.user?.email}</p>
          <button onClick={() => signOut({callbackUrl:'/'})}>Sign out</button>
        </div>
      );
    }
    return(
        <>
            <h1>Logging you in the application</h1>
        </>
    )
}