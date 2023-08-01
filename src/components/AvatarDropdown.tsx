"use client";

import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar } from "./ui/avatar";
import { Dna, Download, Menu, Redo } from "lucide-react";

interface AvatarDropdownProps {}

const AvatarDropdown: FC<AvatarDropdownProps> = ({}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="w-12 h-12 sm:w-6 sm:h-6 bg-secondary flex rounded shadow-md">
          <Menu className="h-8 w-8 sm:h-4 sm:w-4 m-auto" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => {}}>
          <Download className="w-4 h-4 mr-2" /> Download
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {}}>
          <Dna className="w-4 h-4 mr-2" />
          Quick Variant (1 Credit)
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => {}}>
          <Redo className="w-4 h-4 mr-2" /> Reuse Prompt
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarDropdown;
