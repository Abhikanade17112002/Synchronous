import { getUser } from "@/store/userSlice/userSlice";
import { createContext, useEffect, useRef, useState, useContext } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useRef();
  const userInfo = useSelector(getUser);

  useEffect(() => {
    if (userInfo) {
      socket.current = io.connect("http://localhost:9000", {
        query: { userId: userInfo._id },
        withCredentials: true,
      });
  
      // Client-side should use 'connect' event to verify successful connection
      socket.current.on("connect", () => {
        console.log("connected");
      });
  
      // Cleanup when the component unmounts or when `userInfo` changes
      return () => {
        if (socket.current) {
          socket.current.disconnect();
          console.log("disconnected");
        }
      };
    }
  }, [userInfo]);
  
  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
