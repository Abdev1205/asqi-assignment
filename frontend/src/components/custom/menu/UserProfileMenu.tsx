import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import useSession from "@/hooks/useSession";
import Image from "../Image";
import { PiUserCircleGearFill } from "react-icons/pi";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const UserProfileMenu = () => {
  const { user, logout } = useSession();
  const navigate = useNavigate();
  return (
    <div className="relative w-fit ">
      {/* Avatar Trigger */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="w-10 h-10 overflow-hidden border border-gray-200 rounded-full shadow-sm cursor-pointer">
            <Image
              src={
                user?.profilePicture ||
                "https://res.cloudinary.com/dujgngjro/image/upload/v1731783000/CloudinaryDemo/neohusgtlq54yal0lg6b.webp"
              }
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        </DropdownMenuTrigger>

        {/* Dropdown Content */}
        <DropdownMenuContent className="w-[14rem]  absolute font-poppins left-[-10rem] border bg-white rounded-lg shadow-md">
          {/* Description */}
          <div className="p-4 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>

          {/* Menu Items */}
          <DropdownMenuItem
            className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
            onClick={() => navigate("/profile")}
          >
            <PiUserCircleGearFill className="text-lg " />
            View Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
            onClick={() => logout()}
          >
            <LuLogOut className=" text-[.4rem] " />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserProfileMenu;
