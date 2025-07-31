import React, { useState } from "react";
import { Input } from "./ui/input";
import { Search, Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
export const Header = ({ role, CloseSidebar }) => {
  const [keyword, setKeyword] = useState("");

  return (
    <div className="w-full flex gap-2 md:gap-3 justify-between border-box px-6 py-3 border-b border-solid border-gray-200 shadow-sm">
      <div className="self-center cursor-pointer">
        <CloseSidebar />
      </div>
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
      <div className="ml-auto self-center">
        <Bell className="w-5 h-5" />
      </div>
      <div className="flex gap-2 self-center">
        <Avatar className="self-center">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="hidden md:block">
          <h5 className="text-sm font-semibold">Lisa</h5>
          <div className="text-xs text-gray-600 mt-1">Admin</div>
        </div>
      </div>
    </div>
  );
};
