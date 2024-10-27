// import { handleFetchAllDMMessages } from "@/store/chatSlice/chatSlice";
// import moment from "moment";
// import React, { useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";


// const MessageContainer = () => {
//   const dispatch = useDispatch();
//   const selectedChatMessages = useSelector(
//     (state) => state.chat.selectedChatMessages
//   );
//   const selectedChatType = useSelector((state) => state.chat.selectedChatType);
//   const selectedChatData = useSelector((state) => state.chat.selectedChatData);
//   const messagesEndRef = useRef(null);
//   console.log("====================================");
//   console.log(selectedChatMessages, "MESSAGES");
//   console.log("====================================");

//   // useEffect(() => {
//   //   if (messagesEndRef.current) {
//   //     messagesEndRef.current.scrollView({ behavior: "smmoth" });
//   //   }
//   // }, [selectedChatMessages]);
//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [selectedChatMessages]);
  
   
//   const handleFetchMessages = async () =>{
//     try {
//       console.log('====================================');
//       console.log("CALLING");
//       console.log('====================================');
//       const response = await dispatch(handleFetchAllDMMessages(selectedChatData._id));
//       console.log(response);
      
//     } catch (error) {
//       console.log('====================================');
//       console.log("ERROR IN FETCHING OPREVIOUS MESSAGES ",error);
//       console.log('====================================');
//     }
//   }
  
//   useEffect(()=>{
//     try {
//        handleFetchMessages() ;
//     } catch (error) {
//       console.log('====================================');
//       console.log("ERROR IN FETCHING OPREVIOUS MESSAGES ",error);
//       console.log('====================================');
//     }
//   },[selectedChatData,selectedChatType])

//   const renderMessages = () => {
//     let lastDate = null;
//     return selectedChatMessages.map((message, index) => {
//       const messageDate = moment(message.createdAt).format("YYYY-MM-DD");
//       const showData = messageDate !== lastDate;
//       lastDate = messageDate;
//       return (
//         <div className="" key={message._id}>
//           {showData && (
//             <div className="text-center text-gray-500 my-2">
//               {moment(message.createdAt).format("LL")}
//             </div>
//           )}
//           {selectedChatType === "contact" && renderDMMessages(message)}
//         </div>
//       );
//     });
//   };

//   const renderDMMessages = (message) => {
//     return (
//       <div
//         className={`${
//           message.sender === selectedChatData._id ? "text-left" : "text-right"
//         }`}
//       >
//         {
//           message.messagetype === "text" &&  (<div
//             className={`${
//               message.sender !== selectedChatData._id
//                 ? "bg-[#8417ff]/5  text-[#8417ff]/90 border-[#8417ff]/50 "
//                 : "bg-[#2a2b33]/5  text-white/80 border-white/20"
//             } border inline-block p-2 rounded my-1  max-w-[50%] break-words`}
//           >
//             {message?.message}
//           </div>)
//         }

//         <div className="text-sx text-gray-600">{moment(message.createdAt).format("LT")}</div>
        
//       </div>
//     );
//   };

//   return (
//     <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] w-full xl:w-[80vw]  " ref={messagesEndRef}>
//     {renderMessages()}
//     </div>
//   );
// };

// export default MessageContainer;




import { handleFetchAllDMMessages } from "@/store/chatSlice/chatSlice";
import moment from "moment";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const MessageContainer = () => {
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
        console.log('Fetching messages...');
        const response = await dispatch(handleFetchAllDMMessages(selectedChatData._id));
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
      <div className={`text-${message.sender === selectedChatData._id ? "left" : "right"}`}>
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
        <div className="text-sx text-gray-600">{moment(message.createdAt).format("LT")}</div>
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] w-full xl:w-[80vw]">
      {renderMessages()}
      {/* This is the reference element for scrolling */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageContainer;
