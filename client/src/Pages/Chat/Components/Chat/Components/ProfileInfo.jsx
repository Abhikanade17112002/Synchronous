import React from "react";
import { Avatar,  AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit2 } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { getUser, handleUserSignOutAction } from "@/store/userSlice/userSlice";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import { getColor } from "@/utils/colors";
import { toast } from "sonner";
const ProfileInfo = () => {
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const dispatch = useDispatch() ;
  

  const handleUserSignOut = async () =>{
    try {
      const response = await dispatch(handleUserSignOutAction())  ;
      navigate("/auth")
      if( response.payload.status)
      {
        
        toast.success(response.payload.message);
        
      }
      else
      {
        toast.error(response.payload.message);
      }
     
    } catch (error) {
      toast.error(error.message) ;
    }
  }

  return (
    <div className="absolute bottom-0 h-16  flex items-center justify-between px-10 w-full bg-[#2a2b33]">
      <div className="flex gap-3 items-center justify-center">
        <div className="h-8 w-8  relative">
          <Avatar className="h-8 w-8  rounded-full">
            {user?.profileimage ? (
              <AvatarImage
                src={user?.profileimage || "https://github.com/shadcn.png"}
                alt="profile image"
                className="object-contain rounded-full   overflow-hidden"
              />
            ) : (
              <div
                className={` uppercase overflow-hidden h-8 w-8  text-lg border border-black flex justify-center  items-center  rounded-full ${getColor(
                  user?.color
                )} `}
              >
                {user?.firstname
                  ? user?.firstname.split("").shift()
                  : user?.email.split("").shift()}
              </div>
            )}
          </Avatar>
        </div>
        <div className="text-[12px] font-bold">
          {user.firstname && user.lastname
            ? `${user.firstname} `
            : ""}
        </div>
      </div>
      <div className="flex gap-6 mx-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FiEdit2 onClick={() => navigate("/profile")} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Add to library</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="" onClick={()=>handleUserSignOut()}>
        <MdLogout  />
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
