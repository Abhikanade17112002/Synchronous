import { getUser } from '@/store/userSlice/userSlice'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const Chat = () => {
  const [ user , setUser ] = useState({}) ;
  const userInfo = useSelector(getUser);
  console.log('====================================');
  console.log(user);
  console.log('====================================');
  return (
    <div>
      Chat
      {userInfo.email}
    </div>
  )
}

export default Chat
