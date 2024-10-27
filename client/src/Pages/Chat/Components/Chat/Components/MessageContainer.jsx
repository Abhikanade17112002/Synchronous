import { handleFetchAllDMMessages } from "@/store/chatSlice/chatSlice";
import moment from "moment";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkFileFormat } from "@/utils/checkFileFormat";
import { MdFolderZip } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";
import { handleFileDownload } from "@/utils/handleFileDownload";
import { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
const MessageContainer = () => {

  const [ openFullPageImage , setOpenFullPageImage] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const dispatch = useDispatch();
  const selectedChatMessages = useSelector(
    (state) => state.chat.selectedChatMessages
  );
  const selectedChatType = useSelector((state) => state.chat.selectedChatType);
  const selectedChatData = useSelector((state) => state.chat.selectedChatData);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]);

  // Fetch messages when chat data or type changes
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

    if (selectedChatData) {
      fetchMessages();
    }
  }, [selectedChatData, selectedChatType, dispatch]);

  // Render messages with date separation
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
        </div>
      );
    });
  };

  // Render direct messages
  const renderDMMessages = (message) => {
    return (
      <div
        className={`text-${
          message.sender === selectedChatData._id ? "left" : "right"
        }`}
      >
        {message.messagetype === "text" && (
          <div
            className={`${
              message.sender !== selectedChatData._id
                ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
                : "bg-[#2a2b33]/5 text-white/80 border-white/20"
            } border inline-block p-2 rounded my-1 max-w-[50%] break-words`}
          >
            {message?.message}
          </div>
        )}
        {message.messagetype === "file" && (
          <div
            className={`${
              message.sender !== selectedChatData._id
                ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
                : "bg-[#2a2b33]/5 text-white/80 border-white/20"
            } border inline-block p-2 rounded my-1 max-w-[50%] break-words`}
          >
            {checkFileFormat(message.file) ? (
              <div 
              onClick={()=>{setOpenFullPageImage((prevState)=>!prevState);
                setImageURL(message.file);
              }

              }
              className=" w-[300px] h-[350px]  flex  flex-col justify-evenly object-center">
                <img
                  src={message.file}
                  className="  w-[300px] h-[300px] object-center "
                  alt="chat file"
                />{" "}
                <div
                  className="flex justify-center items-center text-white text-3xl cursor-pointer"
                  onClick={() => handleFileDownload(message.file)}
                >
                  <span className="text-sm"> Download</span>
                  <IoMdDownload />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-5">
                <span className="text-white/80 text-3xl bg-black rounded-full p-3 ">
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
        )}
        <div className="text-sx text-gray-600">
          {moment(message.createdAt).format("LT")}
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] w-full xl:w-[80vw]">
      {renderMessages()}
      {/* This is the reference element for scrolling */}
      <div ref={messagesEndRef} />
      {
        openFullPageImage && <div className="fixed z-[1000] top-0 left-0 h-[100vh] w-[100vw]  items-center justify-center backdrop-blur-lg flex-col">
          <div className="flex justify-center items-center my-20">
            <img src={imageURL} alt="full page image"  className="h-[80vh] w-[70vw] bg-cover"/>
          </div>
          <div  className="flex gap-5 fixed top-0 mt-5 w-full  justify-center">
            <button onClick={()=>handleFileDownload(imageURL)}>
            <IoMdDownload className="text-3xl" />
            </button>
            <button onClick={()=>{setOpenFullPageImage((prevState)=>!prevState)
              setImageURL("");
            }}>
            <IoMdCloseCircleOutline className="text-3xl" />
            </button>
          </div>
        </div>
      }
    </div>
  );
};

export default MessageContainer;
