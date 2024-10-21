import CustomInput from '@/components/CustomInput/CustomInput'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

const SignInForm = ({setCurrentTab}) => {
  const { register, handleSubmit, formState:{errors} } = useForm({
    defaultValues: {
      email: '',
      password: ''
      }
      ,
      mode:"all"
  })
  
  const handleUserSignIn = async(data) =>{
    try {
        console.log(data,"data");
        
      const response = await axios.post(`${import.meta.env.VITE_BASEURL}/auth/signin`,data,{
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials:true 
      }) ;

      if( response.data.status)
      {
         toast.success(response.data.message) ;
      }
      else{
        toast.success(response.data.message) ;
      }
      console.log('====================================');
      console.log(response,"response");
      console.log('====================================');
    } catch (error) {
      console.log('====================================');
      console.log(error,"error");
      console.log('====================================');
    }
  } ;
  

  return (
    <div className='w-full flex flex-col justify-center items-center my-5 py-4'>

      <form action="" className='w-full px-4' onSubmit={handleSubmit(handleUserSignIn)} >
         <CustomInput
          label="Email"
          type="email"
          name="email"
          errors={errors}
          placeholder="Enter Email"
          register={register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "enter a valid email",
            },
          })}
         />
           <CustomInput
          label="password"
          type="password"
          name="password"
          errors={errors}
          placeholder="Enter Password"
          register={register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
              message: "enter a strong password",
            },
          })}
         />
         <div className="my-5 flex justify-center flex-col items-center">
         <Button className="w-1/3"  type="submit" > Sign In </Button>
         <div className="text-center my-5">
          <p className='text-[8px] font-bold text-zinc-700 ' > Dont have an account ? <span className='text-blue-700'><Link to="/auth"  onClick={()=>setCurrentTab("signup")}  > Sign Up </Link></span> </p>
         </div>
         </div>
         
      </form>

    </div>
  )
}

export default SignInForm
