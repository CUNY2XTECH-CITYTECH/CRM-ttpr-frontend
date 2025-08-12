import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Search, Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useNavigate } from 'react-router'
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useAuth } from "@/lib/dataContext";

export const Header = ({ currentUser, CloseSidebar, hideSearchbar = false }) => {
  const { logout } = useAuth()
  const [keyword, setKeyword] = useState("");
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const logoutUser = async () => {
    await logout()
  }
  return (
    <div className="w-full flex gap-2 md:gap-3 justify-between border-box px-14 py-3 border-b border-solid border-gray-200 shadow-sm">
      <div className="self-center cursor-pointer">
        {CloseSidebar || <></>}
      </div>
      {!hideSearchbar &&
        <div className="px-3 py-1 rounded-full bg-secondary md:w-[300px] flex gap-1 focus-within:ring-1 ring-primary ">
          <Input
            type={"text"}
            placeholder="Search.."
            value={keyword}
            className="focus-visible:ring-0 border-none w-full text-lg shadow-none focus:outline-none focus:border-none"
            id="keyword"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Search className="w-5 h-5 self-center mr-1" />
        </div>
      }
      <div className="ml-auto self-center">
        <Bell className="w-5 h-5" />
      </div>
      <div className="flex gap-2 self-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="self-center">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className={'uppercase'}>{currentUser?.name[0]}</AvatarFallback>
            </Avatar>

          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-fit" align="start">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem>
              <a href={currentUser?.role === 'admin' ? '/admin/profile' : '/profile'}>
                Profile
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className={'cursor-pointer'}>
              <div onClick={logoutUser}>
                Log out
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="hidden md:block">
          <h5 className="text-sm font-semibold">{currentUser?.name}</h5>
          <div className="text-xs text-gray-600 mt-1">{currentUser?.role}</div>
        </div>
      </div>
    </div>
  );
};

