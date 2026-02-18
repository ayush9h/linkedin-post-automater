'use client'
// import { ChevronDown } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { Switch } from "@/components/ui/switch";

export default function WebSearchToggle({enabled, onChange}:{enabled:boolean, onChange:(value: boolean)=>void}) {
  
    return (
      <FieldGroup className="w-full max-w-sm mt-6">
      <FieldLabel htmlFor="switch-share">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Enable Web Search</FieldTitle>
            <FieldDescription>
              When enabled, the system will search the web for recent information and include it in the generated response.
            </FieldDescription>
          </FieldContent>
          <Switch id="switch-share" checked={enabled} onCheckedChange={onChange} />
        </Field>
      </FieldLabel>
    </FieldGroup>
  );
}
