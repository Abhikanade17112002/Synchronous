import { setAddMessage } from "@/store/chatSlice/chatSlice";
import { getUser } from "@/store/userSlice/userSlice";
import { createContext, useEffect, useRef, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useRef();
  const userInfo = useSelector(getUser);
  const dispatch = useDispatch();

  const selectedChatType = useSelector((state) => state.chat.selectedChatType);
  const selectedChatData = useSelector((state) => state.chat.selectedChatData);

  const selectedChatTypeRef = useRef(selectedChatType);
  const selectedChatDataRef = useRef(selectedChatData);

  // Keep refs updated with the latest state
  useEffect(() => {
    selectedChatTypeRef.current = selectedChatType;
    selectedChatDataRef.current = selectedChatData;
  }, [selectedChatType, selectedChatData]);

  useEffect(() => {
    if (userInfo) {
      socket.current = io.connect("https://synchronous-1.onrender.com/", {
        query: { userId: userInfo._id },
        withCredentials: true,
      });

      socket.current.on("connect", () => {
        console.log(`Client Connected To Server With Id:`, socket.current.id);
      });

      // Handle Client Receive Message
      const handleClientReciveMessage = (message) => {
        console.log(
          "Received Message",
          message,
          selectedChatTypeRef.current,
          selectedChatDataRef.current
        );
        try {
          if (
            selectedChatTypeRef.current !== null &&
            (selectedChatDataRef.current._id === message.sender._id ||
              selectedChatDataRef.current._id === message.reciver._id)
          ) {
            console.log("Dispatching SetAddMessage with message:", message);
            dispatch(setAddMessage({ message }));
          }
        } catch (error) {
          console.error(error);
        }
      };

      // Attach listener for receiving messages
      socket.current.on("recivemessage", handleClientReciveMessage);

      // Handle Client Receive Message
      const handleClientReciveChannelMessage = (message) => {
        console.log(
          "Received Channel Message",
          message,
          selectedChatTypeRef.current,
          selectedChatDataRef.current
        );
        try {
          if (
            selectedChatTypeRef.current !== null &&
            selectedChatDataRef.current._id === message.channelId
          ) {
            console.log(
              "Dispatching SetAddMessage Channel  with message:",
              message
            );
            dispatch(setAddMessage({ message }));
          }
        } catch (error) {
          console.error(error);
        }
      };
      socket.current.on(
        "recivechannelmessage",
        handleClientReciveChannelMessage
      );

      // Cleanup when the component unmounts or when `userInfo` changes
      return () => {
        if (socket.current) {
          socket.current.disconnect();
        }
      };
    }
  }, [userInfo, dispatch]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
