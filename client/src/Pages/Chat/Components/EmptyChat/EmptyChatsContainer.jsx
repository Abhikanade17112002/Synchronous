import { AnimationOptions } from '@/utils/lottie'
import React from 'react'
import Lottie from 'react-lottie'

const EmptyChatsContainer = () => {
  return (
    <div className='flex-1 h-[100vh] md:bg-[#1c1d25] md:flex flex-col justify-center items-center  hidden duration-1000 transition-all'>
     <Lottie 
     isClickToPauseDisabled={true}
     height={200}
     width={200}
     options={AnimationOptions}
     />
     <div className="text-opacity-80 flex flex-col gap-5 items-center mt-10 lg:text-4xl text-3xl transition-all  duration-300 text-center">
         <h3 className='popins-medium'>
          Hi <span className='text-purple-500'> ! </span> Welcome To <span className='text-purple-500'>Synchronous</span>  <span className='' > Chat App</span>  
         </h3>
     </div>
      EmptyChatsContainer
    </div>
  )
}

export default EmptyChatsContainer
