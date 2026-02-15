"use client";

import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, PlusCircle, LayoutDashboard, LogOut } from "lucide-react";

export default function NavbarMenu({ user }: { user: any }) {
  return (

    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Image
          alt="Profile"
          src={user?.image || "/default-avatar.png"}
          height={30}
          width={30}
          className="rounded-full bg-stone-200/70 p-0.5"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="font-funnel">
        <DropdownMenuItem>
          <Link
            href="/createPage"
            className="group flex w-full items-center gap-2">
            <PlusCircle size={16} />
            Create Post
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem>
          <Link
            href="/dashboard"
            className="group flex w-full items-center gap-2">
            <LayoutDashboard size={16} />
            Dashboard
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem> 
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="group flex w-full items-center gap-2 text-red-700 cursor-pointer">
            <LogOut size={16} className="text-red-700" />
            Sign out
          </button>
        </DropdownMenuItem>
      
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
