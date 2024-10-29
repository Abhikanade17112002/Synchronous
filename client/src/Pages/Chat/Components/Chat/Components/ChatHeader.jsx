import { setChatClose } from "@/store/chatSlice/chatSlice";
import React from "react";
import { RiCloseFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@/components/ui/avatar";
import { getColor } from "@/utils/colors";
import { AvatarImage } from "@radix-ui/react-avatar";
const ChatHeader = () => {
  const dispatch = useDispatch();
  const selectedChatData = useSelector((state) => state.chat.selectedChatData);
  const selectedChatType = useSelector((state) => state.chat.selectedChatType);
  console.log('====================================');
  console.log(selectedChatData,"SELECTEDCHAT DATADASASASASAS");
  console.log('====================================');
  const handleChatClose = () => {
    dispatch(setChatClose());
  };
  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] px-20 flex items-center justify-between ">
      <div className="flex gap-5 items-center">
        <div className="flex gap-3 items-center justify-center">
          <div className="h-8 w-8  relative ">
            {selectedChatType === "contact" ? (
              <Avatar className="h-8 w-8  rounded-full">
                {selectedChatData?.profileimage ? (
                  <AvatarImage
                    src={
                      selectedChatData?.profileimage ||
                      "https://github.com/shadcn.png"
                    }
                    alt="profile image"
                    className="object-contain rounded-full   overflow-hidden"
                  />
                ) : (
                  <div
                    className={` uppercase overflow-hidden h-8 w-8  text-lg border border-black flex justify-center  items-center  rounded-full ${getColor(
                      selectedChatData?.color
                    )} `}
                  >
                    {selectedChatData?.firstname
                      ? selectedChatData?.firstname?.split("").shift()
                      : selectedChatData?.email?.split("").shift()}
                  </div>
                )}
              </Avatar>
            ) : (
              <div className="w-full"></div>
            )}
          </div>
          <div className="flex flex-col text-sm items-center w-full ">
            {selectedChatType === "contact" ? (
              <>
                <div className="w-full">
                  {selectedChatData.firstname && selectedChatData.lastname
                    ? `${selectedChatData.firstname} ${selectedChatData.lastname} `
                    : ""}
                </div>
                <div className="w-full">
                  {selectedChatData.email &&
                  selectedChatData.email.includes("@")
                    ? `${selectedChatData.email} `
                    : ""}
                </div>
              </>
            ) : (
              <div className="w-full text-2xl font-bold flex gap-5 justify-center items-center"><div> <div
              className={`bg-[#ffffff22] h-10 w-10 flex items-center justify-center  rounded-full`}
            >
              #
            </div></div>{selectedChatData.name}</div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center gap-5 ">
          <button
            onClick={() => handleChatClose()}
            className="text-neutral-500  focus:border-none  focus:outline-none focus:text-white duration-300 transition-all"
          >
            <RiCloseFill className="text-3xl"></RiCloseFill>
          </button>
        </div>
      </div>
     
    </div>
  );
};

export default ChatHeader;
