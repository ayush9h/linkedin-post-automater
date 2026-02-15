'use client'
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const languages = ['Professional', 'Humourous', 'Basic']

export default function ToneSelector() {
    const [currLanguage, setCurrLanguage] = useState('Basic')
  
    return (
    <div className="mt-6">
        <label className="text-sm font-semibold text-stone-900">
            Style & Tone
        </label>
        <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
            <div className="flex items-center justify-between gap-2 rounded-md border border-stone-200 bg-white px-4 py-3 cursor-pointer hover:bg-stone-50 transition">
            <span>{currLanguage}</span>
            <ChevronDown className="h-4 w-4 text-stone-500" />
            </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-full min-w-[var(--radix-dropdown-menu-trigger-width)] font-funnel">
            {languages.map((lang) => (
                <DropdownMenuItem key={lang} onSelect={()=>setCurrLanguage(lang)}>{lang}</DropdownMenuItem>
            ))}
        </DropdownMenuContent>
        </DropdownMenu>
    </div>
  );
}
