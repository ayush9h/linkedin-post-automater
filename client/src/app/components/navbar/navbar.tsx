import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import NavbarMenu from "./navbar-menu";
import SignIn from "../signin";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="flex justify-between items-center content-center max-w-xl mx-auto md:max-w-4xl lg:max-w-5xl p-3 border border-stone-200 rounded-md  mt-5">
      <Link
        href="/"
        className="font-funnel text-sm md:text-md lg:text-lg xl:text-xl font-semibold"
      >
        Post.ai
      </Link>

      {session ? (
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/ayush9h/linkedin-post-automater"
            className="font-funnel text-sm hover:underline"
          >
            Github
          </Link>

          <NavbarMenu user={session.user} />
        </div>
      ) : (
        <div className="flex items-center gap-8">
          <Link
            href="https://github.com/ayush9h/linkedin-post-automater"
            className="font-funnel text-sm hover:underline"
          >
            Github
          </Link>
          <SignIn />
        </div>
      )}
    </nav>
  );
}
