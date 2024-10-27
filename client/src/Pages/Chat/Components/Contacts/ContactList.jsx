import React from 'react'
import { useSelector } from 'react-redux'

const ContactList = (contacts, isChannel = false) => {
    const contactList = useSelector((state)=>state.chat.selectedUserDMList);
    console.log('====================================');
    console.log("DMLIST",contactList);
    console.log('====================================');
  return (
    <div>
      
    </div>
  )
}

export default ContactList
