import { setChatClose } from '@/store/chatSlice/chatSlice'
import React from 'react'
import {RiCloseFill} from "react-icons/ri"
import { useDispatch, useSelector } from 'react-redux'
import { Avatar } from '@/components/ui/avatar';
import { getColor } from '@/utils/colors';
import { AvatarImage } from '@radix-ui/react-avatar';
const ChatHeader = () => {
  const dispatch = useDispatch() ;
  const selectedChatData = useSelector((state)=>state.chat.selectedChatData) ;
  const handleChatClose = () => {
    dispatch(setChatClose())
    }
  return (
    <div className='h-[10vh] border-b-2 border-[#2f303b] px-20 flex items-center justify-between '>
      <div className="flex gap-5 items-center">
        <div className="flex gap-3 items-center justify-center">
        <div className="h-8 w-8  relative ">
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
                    </div>
                    <div className="flex flex-col text-sm items-center w-full ">
                      <div className="w-full">
                        {selectedChatData.firstname && selectedChatData.lastname
                          ? `${selectedChatData.firstname} ${selectedChatData.lastname} `
                          : ""}
                      </div>
                      <div className="w-full">
                        {selectedChatData.email && selectedChatData.email.includes("@")
                          ? `${selectedChatData.email} `
                          : ""}
                      </div>
                    </div>
        </div>
        <div className="flex items-center justify-center gap-5 ">
          <button onClick={()=>handleChatClose()}  className='text-neutral-500  focus:border-none  focus:outline-none focus:text-white duration-300 transition-all'>
            <RiCloseFill className='text-3xl'></RiCloseFill>
          </button>
        </div>
      </div>
      CharHeader
    </div>
  )
}

export default ChatHeader
