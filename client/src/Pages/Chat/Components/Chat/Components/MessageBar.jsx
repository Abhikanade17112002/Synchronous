import React, { useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { RiEmojiStickerLine } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import EmojiPicker from "../../../../../../node_modules/emoji-picker-react/dist/emoji-picker-react.esm";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "@/socketcontext/SocketContext";
import { getUser } from "@/store/userSlice/userSlice";
import { handleUploadChatFile } from "@/store/chatSlice/chatSlice";
import { toast } from "sonner";

const MessageBar = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const emojiPickerRef = useRef();
  const fileUploadRef = useRef();
  const socket = useSocket();
  const selectedChatType = useSelector((state) => state.chat.selectedChatType);
  const selectedChatData = useSelector((state) => state.chat.selectedChatData);
  const userInfo = useSelector(getUser);
  useEffect(() => {
    function handleClickedOutSideEmojiPicker(event) {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setEmojiPicker(false);
      }
    }

    document.addEventListener("mousedown", handleClickedOutSideEmojiPicker);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickedOutSideEmojiPicker
      );
    };
  }, [emojiPickerRef]);
  const [emojiPicker, setEmojiPicker] = useState(false);
  const handleSendMessage = async (event) => {
    event.preventDefault();
    console.log("====================================");
    console.log(message);
    console.log("====================================");

    try {
      if (selectedChatType === "contact") {
        socket.emit("sendmessage", {
          sender: userInfo._id,
          reciver: selectedChatData._id,
          message,
          messagetype: "text",
          file: null,
        });
        setMessage("");
      } else if (selectedChatType === "channel") {
        socket.emit("sendchannelmessage", {
          sender: userInfo._id,
          channelId: selectedChatData._id,
          message,
          messagetype: "text",
          file: null,
        });
        setMessage("");
      }
    } catch (error) {}
  };

  const handleAddEmoji = async (emoji) => {
    setMessage((msg) => msg + emoji?.emoji);
  };

  const handleAttachmentClicked = () => {
    if (fileUploadRef.current) {
      fileUploadRef.current.click();
    }
  };
  const handleAttachmentChange = async (event) => {
    try {
      const file = event.target.files[0];
      console.log("====================================");
      console.log(file, "THIS FILE");
      console.log("====================================");
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const response = await dispatch(handleUploadChatFile(formData));
        console.log("====================================");
        console.log("FILE UPLOAD RESPONBSE ", response);
        console.log("====================================");

        if (response.payload.status) {
          toast.success(response.payload.message);
          console.log("====================================");
          console.log(response.payload, "FILEURL");
          console.log("====================================");
          const fileUrl = response.payload.file;
          console.log("====================================");
          console.log(selectedChatType, "FILEURL");
          console.log("====================================");

          if (selectedChatType === "contact") {
            socket.emit("sendmessage", {
              sender: userInfo._id,
              reciver: selectedChatData._id,
              message: null,
              messagetype: "file",
              file: fileUrl,
            });
          } else if (selectedChatType === "channel") {
            socket.emit("sendchannelmessage", {
              sender: userInfo._id,
              channelId: selectedChatData._id,
              message:null,
              messagetype: "file",
              file: fileUrl,
            });
            setMessage("");
          }
        } else {
          toast.error(response.payload.message);
        }
      }
      fileUploadRef.current.value = null;
    } catch (error) {
      console.log("====================================");
      console.log("UPLOAD FILE ERROR", error);
      console.log("====================================");
    } finally {
    }
  };
  return (
    <div className="md:h-[10vh] h-[6vh]  bg-[#1c1d25] flex justify-center items-center gap-4 px-5 md:mb-4 mb-2">
      <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5">
        <input
          type="text"
          placeholder="Enter Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 md:p-4 p-2 text-[12px] bg-transparent  rounded-md focus: border-none focus:outline-none"
        />
        <button
          onClick={handleAttachmentClicked}
          className="text-neutral-500  focus:border-none  focus:outline-none focus:text-white duration-300 transition-all"
        >
          <GrAttachment className="md:text-xl  text-[12px]"></GrAttachment>
        </button>
        <input
          type="file"
          ref={fileUploadRef}
          className="hidden"
          onChange={handleAttachmentChange}
        />
        <div className="relative">
          <button
            onClick={() => setEmojiPicker((prevState) => !prevState)}
            className="text-neutral-500  focus:border-none  focus:outline-none focus:text-white duration-300 transition-all"
          >
            <RiEmojiStickerLine className="md:text-xl  text-[12px]"></RiEmojiStickerLine>
          </button>
          <div className="absolute bottom-16 right-0" ref={emojiPickerRef}>
            <EmojiPicker
              theme="dark"
              open={emojiPicker}
              onEmojiClick={handleAddEmoji}
              autoFocusSearch={false}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
      <button
        onClick={(event) => handleSendMessage(event)}
        className="bg-[#8417ff] rounded-md flex  items-center justify-center md:p-3 p-2    focus:border-none  focus:outline-none text-white focus:text-white duration-300 transition-all hover:bg-[#741bda]"
      >
        <IoSend className="md:text-xl text-md"></IoSend>
      </button>
      </div>
      
    </div>
  );
};

export default MessageBar;
