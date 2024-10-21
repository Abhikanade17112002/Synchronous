import CustomInput from '@/components/CustomInput/CustomInput'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

const SignUpForm = ({setCurrentTab}) => {
  const { register, handleSubmit, formState:{errors} } = useForm({
    defaultValues: {
      email: '',
      username:"",
      password: ''
      }
      ,
      mode:"all"
  })
  
  const handleUserSignUp = async(data) =>{
    try {
        console.log(data,"data");
        
      const response = await axios.post(`${import.meta.env.VITE_BASEURL}/auth/signup`,data,{
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
    <div className='w-full flex flex-col justify-center items-center  my-5 '>

      <form action="" className='w-full px-8' onSubmit={handleSubmit(handleUserSignUp)}  >
        <CustomInput
          label="Username"
          type="password"
          name="username"
          errors={errors}
          placeholder="Enter Username ( eg. userName@21 )"
          register={register("username", {
            required: {
              value: true,
              message: "username is required",
            },
            pattern: {
              value: /^[a-zA-Z][a-zA-Z0-9._]{2,19}$/,
              message: "enter a username ",
            },
          })}
         />
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
          <p className='text-[8px] font-bold text-zinc-700 ' > Already  have an account ? <span className='text-blue-700'><Link to="/auth"  onClick={()=>setCurrentTab("signin")}  > Sign In </Link></span> </p>
         </div>
         </div>
         
      </form>

    </div>
  )
}

export default SignUpForm
