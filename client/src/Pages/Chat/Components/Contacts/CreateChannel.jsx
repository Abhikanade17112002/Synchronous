import React, { useEffect, useState } from "react";
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

import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { handleGetAllContactsForChannelAction } from "@/store/contactSlice/contactSlice";
import { Button } from "@/components/ui/button";
import MultipleSelector from "../../../../components/ui/multipleselect";
import {
  addChannel,
  handleCreateNewChannelAction,
  setChannelList,
  setSelectedUserChannelList,
} from "@/store/chatSlice/chatSlice";

const CreateChannel = () => {
  const [newChannelModal, setNewChannelModal] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [allContacts, setAllContacts] = useState([]);
  const [channelName, setChannelName] = useState("");
  const selectedChatData = useSelector((state) => state.chat.selectedChatData);
  const selectedChatType = useSelector((state) => state.chat.selectedChatType);
  const selectedUserChannelList = useSelector((state) => state.chat.selectedUserChannelList);

  const dispatch = useDispatch();

  const handleGetAllContacts = async () => {
    try {
      const response = await dispatch(handleGetAllContactsForChannelAction());
      if (response.payload.status) {
        setAllContacts(response.payload.contacts);
        toast.success(response.payload.message);

      } else {
        toast.error(response.payload.message);
      }
    } catch (error) {
      console.log("====================================");
      console.log("ERROR :: ", error);
      console.log("====================================");
    }
  };

  useEffect(() => {
    handleGetAllContacts();
  }, []);




  const handleCreateNewChannel = async () => {
    try {
      if (channelName.length > 0 && selectedContacts.length > 0) {
        const channelData =  {
          name: channelName,
          members: selectedContacts.map((contact)=>contact.value),
        }
        const response = await dispatch(
         
          handleCreateNewChannelAction(channelData)
        );

        console.log("====================================");
        console.log(response, "CHANNEL RESPONSE");
        console.log("====================================");

        if (response.payload.status) {
          setNewChannelModal(false);
          setChannelName("");
          setSelectedContacts([]); 
    
        } else {
          toast.error("Failed to create new channel");
        }
      } else {
        toast.error(
          "channel name should be not null or there should be atlest one member"
        );
      }
    } catch (error) {
      console.log("====================================");
      console.log("SOMETHING WENT WRONG IN NEW CHANNEL CREATION :: ", error);
      console.log("====================================");
    }
  };

  console.log('====================================');
  console.log(selectedUserChannelList,"selectedUserChannelList");
  console.log('====================================');
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer duration-300 transition-all"
              onClick={() => setNewChannelModal(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
            Create Channel
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={newChannelModal} onOpenChange={setNewChannelModal}>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Fill Channel Details</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="">
            <input
              onChange={(e) => setChannelName(e.target.value)}
              type="text"
              placeholder="Channel Name"
              className="w-full rounded-lg p-3 bg-[#2c2e3b] border-none"
              value={channelName}
            />
          </div>
          <div className="">
            <MultipleSelector
              className="rounded-lg bg-[#2c2e3b] border-none py-2 text-white"
              defaultOptions={allContacts}
              placeholder="Search Contacts"
              value={selectedContacts}
              onChange={setSelectedContacts}
              emptyIndicator={
                <div className="flex justify-center items-center text-neutral-400">
                  No Results Found
                </div>
              }
            />
          </div>
          <div>
            <Button
              onClick={handleCreateNewChannel}
              className="w-full bg-purple-700 hover:bg-pink-900 transition-all duration-300"
            >
              Create Channel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateChannel;
