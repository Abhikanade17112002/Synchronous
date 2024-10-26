import React, { useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { RiEmojiStickerLine } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import EmojiPicker from '../../../../../../node_modules/emoji-picker-react/dist/emoji-picker-react.esm';
import { useAutoFocusSearchConfig } from '../../../../../../node_modules/emoji-picker-react/src/config/useConfig';
const MessageBar = () => {
  const [message, setMessage] = useState("");
  const emojiPickerRef = useRef() ;
  useEffect(()=>{
    function handleClickedOutSideEmojiPicker(event) {
           if(emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)){
            setEmojiPicker(false);
           }
    }

    document.addEventListener("mousedown",handleClickedOutSideEmojiPicker);

    return()=>{
      document.removeEventListener("mousedown",handleClickedOutSideEmojiPicker);
    }
  },[emojiPickerRef])
  const [emojiPicker, setEmojiPicker] = useState(false) ;
  const handleSendMessage = async (event) =>{
    try {
      
    } catch (error) {
      
    }
  }

  const handleAddEmoji = async ( emoji ) =>{
    setMessage((msg)=> msg + emoji?.emoji ); 
  }
  return (
    <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center gap-6 px-8 mb-6">
      <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5">
        <input
          type="text"
          placeholder="Enter Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-5 bg-transparent  rounded-md focus: border-none focus:outline-none"
        />
        <button className="text-neutral-500  focus:border-none  focus:outline-none focus:text-white duration-300 transition-all">
          <GrAttachment className="text-2xl"></GrAttachment>
        </button>
        <div className="relative">
          <button 
          onClick={()=>setEmojiPicker((prevState)=>!prevState)}
          className="text-neutral-500  focus:border-none  focus:outline-none focus:text-white duration-300 transition-all">
            <RiEmojiStickerLine className="text-2xl"></RiEmojiStickerLine>
          </button>
          <div className="absolute bottom-16 right-0"  ref={emojiPickerRef}>
            <EmojiPicker
            theme="dark"
            open={emojiPicker}
            onEmojiClick={handleAddEmoji}
            autoFocusSearch={false}
            />
          </div>
        </div>
      </div>

      <button onClick={()=>handleSendMessage()} className="bg-[#8417ff] rounded-md flex  items-center justify-center p-5    focus:border-none  focus:outline-none text-white focus:text-white duration-300 transition-all hover:bg-[#741bda]">
        <IoSend className="text-2xl"></IoSend>
      </button>
    </div>
  );
};

export default MessageBar;
