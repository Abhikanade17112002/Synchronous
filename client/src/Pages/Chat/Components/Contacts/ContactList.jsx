import { Avatar } from "@/components/ui/avatar";
import {
  setSelectChatData,
  setSelectChatType,
  setSelectedChatMessages,
} from "@/store/chatSlice/chatSlice";
import { getColor } from "@/utils/colors";
import { AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ContactList = ({ isChannel = false }) => {
  const dispatch = useDispatch();

  // Select the contact list and selected chat data
  const contactList = useSelector((state) => state.chat.selectedUserDMList);
  const selectedChatData = useSelector((state) => state.chat.selectedChatData);
  const selectedUserChannelList = useSelector((state) => state.chat.selectedUserChannelList);
  console.log('====================================');
  console.log(selectedUserChannelList,"selectedUserChannelList");
  console.log('====================================');
  const handleContactClicked = (contact) => {
    // Set the chat type depending on the `isChannel` prop
    dispatch(setSelectChatType(isChannel ? "channel" : "contact"));

    // Set the selected chat data
    dispatch(setSelectChatData(contact));

    // Clear messages if the selected contact changes
    if (selectedChatData && selectedChatData._id !== contact._id) {
      dispatch(setSelectedChatMessages([]));
    }
  };

  return (
    <div className="mt-5 ">
      {contactList.map((contact) => (
        <div
          className={`pl-10  py-5 flex gap-5 transition-all duration-300 cursor-pointer ${
            selectedChatData && selectedChatData._id === contact._id
              ? "bg-[#8417ff] hover:bg-[#8417ff]"
              : "hover:bg-[#f1f1f111]"
          }`}
          onClick={() => handleContactClicked(contact)}
          key={contact._id}
        >
          <div className="flex gap-5 items-center justify-start ">
            {!isChannel && (
              <Avatar className="h-10 w-10 rounded-full">
                {contact?.profileimage ? (
                  <AvatarImage
                    src={contact.profileimage}
                    alt="profile image"
                    className="object-contain rounded-full overflow-hidden"
                  />
                ) : (
                  <div
                    className={`uppercase overflow-hidden h-10 w-10 md:text-sm  text-[10px] border border-black flex justify-center items-center rounded-full ${getColor(
                      contact?.color
                    )}`}
                  >
                    {contact?.firstname
                      ? contact.firstname[0]
                      : contact.email[0]}
                  </div>
                )}
              </Avatar>
            )}
          </div>
          {isChannel && (
            <div
              className={`bg-[#ffffff22] h-10 w-10 flex items-center justify-center  rounded-full`}
            >
              #
            </div>
          )}
          {isChannel ? (
            <span>{contact.name}</span>
          ) : (
            <div className="flex flex-col md:text-sm  text-[12px] items-center justify-center ">
              <div className="w-full">
                {contact.firstname && contact.lastname
                  ? `${contact.firstname}  ${contact.lastname} `
                  : `${contact.email}` }
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContactList;
