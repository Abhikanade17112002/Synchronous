import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaPlus } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import Lottie from "react-lottie";
import { AnimationOptions } from "@/utils/lottie";
import {
  getContacts,
  handleGetContactsAction,
} from "../../../../../store/contactSlice/contactSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { getColor } from "@/utils/colors";
import {
  setSelectChatData,
  setChatClose,
  setSelectChatType,
  setSelectedChatMessages,
} from "@/store/chatSlice/chatSlice";

const NewDm = () => {
  const [openNewContactModal, setOpenNewContactModal] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);
  const dispatch = useDispatch();

  const handleSearchContacts = async (searchTerm) => {
    try {
      if (searchTerm.length > 0) {
        const response = await dispatch(handleGetContactsAction(searchTerm));

        if (response.payload.status) {
          toast.success(response.payload.message);
          setSearchedContacts(response.payload.contacts);
        } else {
          setSearchedContacts([]);
          toast.error(response.payload.message);
        }
      } else {
        setSearchedContacts([]); // Clear when the search term is empty
      }
    } catch (error) {
      setSearchedContacts([]);
      toast.error(error.message);
      console.error(error);
    }
  };

const handleSelectNewContact = (contact) =>{
  setOpenNewContactModal(false);
  dispatch(setSelectChatType("contact"));
  dispatch(setSelectChatData(contact));
  setSearchedContacts([]) ;
  
}
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer duration-300 transition-all"
              onClick={() => setOpenNewContactModal(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e]  border-none mb-2 p-3 text-white">
             Select New Contact
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
        <DialogContent className="bg-[#181920] border-none text-white md:w-[400px] md:h-[400px] w-[250px] h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle className="md:text-md text-sm">Select a New Contact</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="">
            <input
              onChange={(e) => handleSearchContacts(e.target.value)}
              type="text"
              placeholder="Search Contact"
              className="w-full rounded-lg md:p-3 p-2 text-sm md:text-md bg-[#2c2e3b] border-none"
            />
          </div>
          {searchedContacts.length <= 0 ? (
            <div className="flex-1 flex flex-col justify-center items-center duration-1000 transition-all">
              <Lottie
                isClickToPauseDisabled={true}
                height={100}
                width={100}
                options={AnimationOptions}
              />
              <div className="text-opacity-80 flex flex-col gap-5 items-center mt-10 lg:text-2xl text-3xl transition-all duration-300 text-center">
                <h3 className="popins-medium text-sm md:text-xl">
                  <span className="text-purple-500"></span> Search New{" "}
                  <span className="text-purple-500">Contact</span>
                </h3>
              </div>
            </div>
          ) : (
            <ScrollArea className="h-[250px] w-[350px] rounded-md border p-4">
              <div className="flex flex-col  gap-5">
                {searchedContacts.map((contact) => (
                  <div className="flex  items-center gap-5 cursor-pointer" onClick={()=>handleSelectNewContact(contact)}>
                    <div className="h-8 w-8  relative ">
                      <Avatar className="h-8 w-8  rounded-full">
                        {contact?.profileimage ? (
                          <AvatarImage
                            src={
                              contact?.profileimage ||
                              "https://github.com/shadcn.png"
                            }
                            alt="profile image"
                            className="object-contain rounded-full   overflow-hidden"
                          />
                        ) : (
                          <div
                            className={` uppercase overflow-hidden h-8 w-8  text-lg border border-black flex justify-center  items-center  rounded-full ${getColor(
                              contact?.color
                            )} `}
                          >
                            {contact?.firstname
                              ? contact?.firstname?.split("").shift()
                              : contact?.email?.split("").shift()}
                          </div>
                        )}
                      </Avatar>
                    </div>
                    <div className="flex flex-col text-sm items-center w-full ">
                      <div className="w-full">
                        {contact.firstname && contact.lastname
                          ? `${contact.firstname} ${contact.lastname} `
                          : ""}
                      </div>
                      <div className="w-full">
                        {contact.email && contact.email.includes("@")
                          ? `${contact.email} `
                          : ""}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewDm;
