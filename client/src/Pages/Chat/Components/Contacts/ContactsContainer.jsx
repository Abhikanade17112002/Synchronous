import React from 'react'
import Logo from '../../../../utils/Logo';
import Title from '../../../../utils/Title';
import ProfileInfo from '../Chat/Components/ProfileInfo';
import NewDm from '../Chat/Components/NewDm';

const ContactsContainer = () => {
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
           </div>
           <div className="my-5 ">
            <div className="flex items-center justify-between  pr-10">
              <Title text={"Channels"} />
            </div>
           </div>
           <ProfileInfo />
      ContactsContainer
    </div>
  )
}

export default ContactsContainer
