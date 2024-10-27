import { getUser } from '@/store/userSlice/userSlice'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import ContactsContainer from './Components/Contacts/ContactsContainer';
import EmptyChatsContainer from './Components/EmptyChat/EmptyChatsContainer';
import ChatContainer from './Components/Chat/ChatContainer';

const Chat = () => {
  const [ user , setUser ] = useState({}) ;
  const userInfo = useSelector(getUser);
  const  chatType  = useSelector((state)=>state.chat.selectedChatType) ;


  return (
    <div className='flex h-[100vh] text-white overflow-hidden'>
      <ContactsContainer/>
      {
        chatType === null ? <EmptyChatsContainer/> : <ChatContainer/>
      }
      {/* <EmptyChatsContainer/> */}
      {/* <ChatContainer/> */}
    </div>
  )
}

export default Chat
