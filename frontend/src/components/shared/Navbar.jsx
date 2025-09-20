import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
      {/* Logo */}
      <div className="text-xl font-bold text-blue-600">MyLogo</div>
      {/* Nav Links */}
      <ul className="flex space-x-6">
        <li>
          <Link
            to={"/"}
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to={`/jobs`}
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            jobs
          </Link>
        </li>
        <li>
          <Link
            to={"/browse"}
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Browse
          </Link>
        </li>
      </ul>
      {!user ? (
        <div className="space-x-3">
          <Link to="/login">
            <Button variant="default">Login</Button>
          </Link>
          <Link to="/signup">
            <Button variant="outline">Sign Up</Button>
          </Link>
        </div>
      ) : (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-blue-50 transition-colors"
              aria-label="Open user menu"
            >
              <Avatar className="w-8 h-8">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="User avatar"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline text-sm font-medium text-gray-700">
                Zayn Butt
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-4">
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="w-12 h-12">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="User avatar"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  Zayn Butt
                </h2>
                <p className="text-xs text-gray-500">zayn.butt@email.com</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Link to="/profile">
                <Button variant="outline" className="w-full">
                  View Profile
                </Button>
              </Link>
              <Button variant="destructive" className="w-full">
                Logout
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </nav>
  );
};

export default Navbar;
