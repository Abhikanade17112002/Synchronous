import React, { useEffect } from 'react'
import Logo from '../../../../utils/Logo';
import Title from '../../../../utils/Title';
import ProfileInfo from '../Chat/Components/ProfileInfo';
import NewDm from '../Chat/Components/NewDm';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { handleFetchAllUSerChannelAction, setSelectedUserDMList } from '@/store/chatSlice/chatSlice';
import ContactList from './ContactList';
import CreateChannel from './CreateChannel';
import GroupList from './GroupList';


const ContactsContainer = () => {
 const dispatch = useDispatch() ;

  useEffect(()=>{
    const getContacts = async () =>{
      try {
        const response = await axios.get("http://localhost:9000/api/contacts/getdmlist",{
          withCredentials:true
        })
        const channelsResponse = await dispatch(handleFetchAllUSerChannelAction());


        console.log('====================================');
        console.log(channelsResponse,"channelsResponse");
        console.log('====================================');
        dispatch(setSelectedUserDMList(response.data.contacts))
      } catch (error) {
        console.log(error);
        
      }
    }

    getContacts() ;
  },[])
  return (
    <div className='relative   md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-gray-500 w-full' >
           <div className="pt3 mt2">
            <Logo/>
           
           </div>
           <div className="my-5 ">
            <div className="flex items-center justify-between  pr-10">
              <Title text={"Direct  Messages"} />
              < NewDm />
            </div>
            <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden">
              <ContactList isChannel={false}/>
            </div>
           </div>
           <div className="my-5 ">
            <div className="flex items-center justify-between  pr-10">
              <Title text={"Channels"} />
              <CreateChannel />
            </div>
            <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden">
              <GroupList isChannel={true}/>
            </div>
           </div>
           <ProfileInfo />
      ContactsContainer
    </div>
  )
}

export default ContactsContainer
