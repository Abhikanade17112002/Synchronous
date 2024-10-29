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
        const response = await axios.get("https://synchronous.onrender.com/api/contacts/getdmlist",{
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
    <div className='relative  h-[100vh]  md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-gray-500 w-full' >
           <div className="pt-3 mt-2">
            <Logo/>
           
           </div>
           <div className="my-5 ">
            <div className="flex items-center justify-between   pr-10">
              <Title text={"Direct  Messages"}  />
              < NewDm />
            </div>
            <div className=" py-2  h-[30vh]  overflow-y-auto no-scrollbar">
              <ContactList isChannel={false}/>
            </div>
           </div>
           <div className="my-5 ">
            <div className="flex items-center justify-between  pr-10">
              <Title text={"Channels"} />
              <CreateChannel />
            </div>
            <div  className="py-5 max-h-[40vh] overflow-y-auto no-scrollbar">
              <GroupList  isChannel={true}/>
            </div>
           </div>
           <ProfileInfo />
      
    </div>
  )
}

export default ContactsContainer
