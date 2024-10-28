
import { handleFetchAllDMMessages, handleFetchAllUSerChannelAction, handleFetchChannelChatsAction } from "@/store/chatSlice/chatSlice";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkFileFormat } from "@/utils/checkFileFormat";
import { MdFolderZip } from "react-icons/md";
import { IoMdDownload, IoMdCloseCircleOutline } from "react-icons/io";
import { handleFileDownload } from "@/utils/handleFileDownload";
import { getUser } from "@/store/userSlice/userSlice";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { getColor } from "@/utils/colors";
import { toast } from "sonner";

const MessageContainer = () => {
  const [openFullPageImage, setOpenFullPageImage] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const dispatch = useDispatch();
  const selectedChatMessages = useSelector(
    (state) => state.chat.selectedChatMessages
  );
  const selectedChatType = useSelector((state) => state.chat.selectedChatType);
  const selectedChatData = useSelector((state) => state.chat.selectedChatData);
  const userInfo = useSelector(getUser);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        console.log("Fetching messages...");
        const response = await dispatch(
          handleFetchAllDMMessages(selectedChatData._id)
        );
        console.log(response);
      } catch (error) {
        console.error("Error fetching previous messages: ", error);
      }
    };
    if (selectedChatData) fetchMessages();
    if (selectedChatData && selectedChatType === "channel") {
        fetchChannelMessages()
   
    }

  }, [selectedChatData, dispatch]);


  const fetchChannelMessages = async () =>{
    const response = dispatch(handleFetchChannelChatsAction(selectedChatData._id))

    console.log('====================================');
    console.log("FETCH CHANNEL CHAT MESSAGE RESPONSE ",response);
    console.log('====================================');


    if( response.payload.status)
    {
      toast.success(response.payload.message) ;
    }
    else{
      toast.error(response.payload.message) ;
    }
  }

  const renderMessages = () => {
    let lastDate = null;
    return selectedChatMessages.map((message) => {
      const messageDate = moment(message.createdAt).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;
      return (
        <div key={message._id}>
          {showDate && (
            <div className="text-center text-gray-500 my-2">
              {moment(message.createdAt).format("LL")}
            </div>
          )}
          {selectedChatType === "contact" && renderDMMessages(message)}
          {selectedChatType === "channel" && renderChannelMessages(message)}
        </div>
      );
    });
  };
  // Render direct messages
  const renderDMMessages = (message) => {
    const isSender = message.sender === selectedChatData?._id;
    const alignmentClass = isSender
      ? "text-left mr-auto"
      : "text-right ml-auto";
    const messageClass = isSender
      ? "bg-[#2a2b33]/5 text-white/80 border-white/20"
      : "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50";

    return (
      <div className={`${alignmentClass} my-1 max-w-[50%]`}>
        {message.messagetype === "text" && (
          <div
            className={`${messageClass} border inline-block p-2 rounded break-words`}
          >
            {message.message}
          </div>
        )}
        {message.messagetype === "file" && renderFileMessage(message, isSender)}
        <div className="text-xs text-gray-600 mt-1">
          {moment(message.createdAt).format("LT")}
        </div>
      </div>
    );
  };

  const renderChannelMessages = (message) => {
    const isSender = message.sender._id === userInfo?._id;
    const alignmentClass = isSender
      ? "text-left mr-auto"
      : "text-right ml-auto";
    const messageClass = isSender
      ? "bg-[#2a2b33]/5 text-white/80 border-white/20"
      : "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50";
    return (
      <div
        className={`mt-5   ${
          message.sender._id !== userInfo._id ? "text-left" : "text-right"
        }`}
      >
        {message.messagetype === "text" && (
          <div
            className={`${messageClass} border inline-block p-2 rounded break-words`}
          >
            <div className="flex flex-row-reverse gap-5">
              <div className="">{message.message}</div>

              <div className="">
                {message.sender._id !== userInfo._id ? (
                  <Avatar className="h-5 w-5  rounded-full">
                    {message.sender?.profileimage ? (
                      <AvatarImage
                        src={
                          message?.sender?.profileimage ||
                          "https://github.com/shadcn.png"
                        }
                        alt="profile image"
                        className=" h-8 w-8 object-contain rounded-full   overflow-hidden"
                      />
                    ) : (
                      <div
                        className={` uppercase overflow-hidden h-8 w-8  text-lg border border-black flex justify-center  items-center  rounded-full ${getColor(
                          message.sender?.color
                        )} `}
                      >
                        {message.sender?.firstname
                          ? message.sender?.firstname.split("").shift()
                          : message.sender?.email.split("").shift()}
                      </div>
                    )}
                  </Avatar>
                ) : (
                  <div className=""></div>
                )}
              </div>
            </div>
            <div className="">
              {message.sender._id !== userInfo._id ? (
                message.sender?.firstname ? (
                  message.sender?.firstname
                ) : (
                  message.sender?.email
                )
              ) : (
                <div className=""></div>
              )}
            </div>
            <div className="text-xs text-gray-600 mt-1">
              {moment(message.createdAt).format("LT")}
            </div>
          </div>
        )}
     {message.messagetype === "file" && <div
        className={`${messageClass} border inline-block p-2 rounded my-1 min-w-fit min-h-fit `}
      >
        {checkFileFormat(message.file) ? (
          <div
            onClick={() => {
              setOpenFullPageImage(true);
              setImageURL(message.file);
            }}
            className="w-[300px] h-[350px] object-contain flex flex-col justify-evenly items-center"
          >
            <img
              src={message.file}
              className="w-[300px] h-[300px] object-contain"
              alt="chat file"
            />
            <div
              className="flex justify-center items-center text-white text-3xl cursor-pointer"
              onClick={() => handleFileDownload(message.file)}
            >
              <span className="text-sm">Download</span>
              <IoMdDownload />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-5">
            <span className="text-white/80 text-3xl bg-black rounded-full p-3">
              <MdFolderZip />
            </span>
            <span className="text-white text-[12px] font-bold">
              {String(message.file).split("/").pop()}
            </span>
            <div
              className="flex text-xl cursor-pointer"
              onClick={() => handleFileDownload(message.file)}
            >
              <IoMdDownload />
            </div>
          </div>
        )}
      </div>}
      </div>
    );
  };

  const renderFileMessage = (message, isSender) => {
    const messageClass = isSender
      ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
      : "bg-[#2a2b33]/5 text-white/80 border-white/20";

    return (
      <div
        className={`${messageClass} border inline-block p-2 rounded my-1 min-w-fit min-h-fit `}
      >
        {checkFileFormat(message.file) ? (
          <div
            onClick={() => {
              setOpenFullPageImage(true);
              setImageURL(message.file);
            }}
            className="w-[300px] h-[350px] object-contain flex flex-col justify-evenly items-center"
          >
            <img
              src={message.file}
              className="w-[300px] h-[300px] object-contain"
              alt="chat file"
            />
            <div
              className="flex justify-center items-center text-white text-3xl cursor-pointer"
              onClick={() => handleFileDownload(message.file)}
            >
              <span className="text-sm">Download</span>
              <IoMdDownload />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-5">
            <span className="text-white/80 text-3xl bg-black rounded-full p-3">
              <MdFolderZip />
            </span>
            <span className="text-white text-[12px] font-bold">
              {String(message.file).split("/").pop()}
            </span>
            <div
              className="flex text-xl cursor-pointer"
              onClick={() => handleFileDownload(message.file)}
            >
              <IoMdDownload />
            </div>
          </div>
        )}
      </div>
    );
  };

  const FullScreenImage = () => (
    <div className="fixed z-[1000] top-0 left-0 h-[100vh] w-[100vw] items-center justify-center backdrop-blur-lg flex flex-col">
      <div className="flex justify-center items-center my-20">
        <img
          src={imageURL}
          alt="full page image"
          className="h-[80vh] w-[70vw] object-contain"
        />
      </div>
      <div className="flex gap-5 fixed top-0 mt-5 w-full justify-center">
        <button onClick={() => handleFileDownload(imageURL)}>
          <IoMdDownload className="text-3xl" />
        </button>
        <button
          onClick={() => {
            setOpenFullPageImage(false);
            setImageURL("");
          }}
        >
          <IoMdCloseCircleOutline className="text-3xl" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto  scrollbar-hidden p-4 px-4 md:px-8 lg:px-16 xl:px-20 w-full">
      {renderMessages()}
      <div ref={messagesEndRef} />
      {openFullPageImage && <FullScreenImage />}
    </div>
  );
};

export default MessageContainer;
