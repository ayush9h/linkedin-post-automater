"use client";
import Link from "next/link";
import SignIn from "./signin";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDown, PlusCircle, LayoutDashboard, LogOut } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-around items-center content-center max-w-xl mx-auto md:max-w-6xl lg:max-w-7xl p-2.5">
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

          <Menu as="div" className="relative inline-block text-left">
            <MenuButton className="inline-flex items-center gap-2 rounded-full p-1 bg-zinc-200 text-sm font-semibold text-zinc-800 shadow-inner shadow-white/10 cursor-pointer hover:bg-zinc-300">
              <Image
                alt="Profile"
                src={session.user?.image as string}
                height={30}
                width={30}
                className="rounded-full"
              />
              <ChevronDown className="mr-1" size={18} />
            </MenuButton>

            <MenuItems
            anchor="bottom end"
              className="absolute mt-2 w-52 origin-top-right rounded-xl border border-zinc-200 bg-zinc-100 p-1 text-sm text-zinc-800 focus:outline-none  font-funnel cursor-pointer"
            >
              <MenuItem>
                <Link
                  href="/generate"
                  className="group flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-zinc-200"
                >
                  <PlusCircle size={18} />
                  Create Post
                </Link>
              </MenuItem>

              <MenuItem>
                <Link
                  href="/dashboard"
                  className="group flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-zinc-200"
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>
              </MenuItem>

              <MenuItem>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="group flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-red-100 text-red-700 cursor-pointer"
                >
                  <LogOut size={18} />
                  Sign out
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
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
