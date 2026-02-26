import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import NavbarMenu from "./navbar-menu";
import SignIn from "../signin";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex justify-between items-center
                    max-w-xl mx-auto md:max-w-4xl lg:max-w-7xl
                    px-8 py-4 bg-white rounded-3xl mt-5">
      <Link
        href="/"
        className="font-funnel text-sm md:text-md lg:text-lg xl:text-xl font-semibold"
      >
        Post.ai
      </Link>

      <div className="flex items-center gap-6">
        <Link
          href="https://github.com/ayush9h/linkedin-post-automater"
          className="font-funnel text-sm font-semibold hover:underline"
        >
          Github
        </Link>

        {session ? (
          <NavbarMenu user={session.user} />
        ) : (
          <SignIn />
        )}
      </div>
    </div>
  );
}