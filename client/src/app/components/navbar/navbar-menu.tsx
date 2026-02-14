"use client";

import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDown, PlusCircle, LayoutDashboard, LogOut } from "lucide-react";

export default function NavbarMenu({ user }: { user: any }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="inline-flex items-center gap-2 rounded-full p-1 bg-stone-200 text-sm font-semibold text-stone-800 shadow-inner shadow-white/10 cursor-pointer hover:bg-stone-300">
        <Image
          alt="Profile"
          src={user?.image || "/default-avatar.png"}
          height={30}
          width={30}
          className="rounded-full"
        />
        <ChevronDown className="mr-1" size={16} />
      </MenuButton>

      <MenuItems
        anchor="bottom end"
        className="absolute mt-2 w-52 origin-top-right rounded-xl border border-stone-200 bg-stone-100 p-1 text-sm text-stone-800 focus:outline-none font-funnel cursor-pointer"
      >
        <MenuItem>
          <Link
            href="/createPage"
            className="group flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-stone-200"
          >
            <PlusCircle size={16} />
            Create Post
          </Link>
        </MenuItem>

        <MenuItem>
          <Link
            href="/dashboard"
            className="group flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-stone-200"
          >
            <LayoutDashboard size={16} />
            Dashboard
          </Link>
        </MenuItem>

        <MenuItem>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="group flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-red-100 text-red-700 cursor-pointer"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
