import CustomInput from '@/components/CustomInput/CustomInput'
import { Button } from '@/components/ui/button'
import { handleUserSignInAction } from '@/store/userSlice/userSlice'
import React, { useState } from 'react'
import {  useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
const SignInForm = ({setCurrentTab}) => {
  const dispatch = useDispatch() ;
  const navigate = useNavigate() ;
  const [ submitting , setSubmitting ] = useState(false) ;
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
      const response = await dispatch(handleUserSignInAction(data));
      console.log('====================================');
      console.log(response,"Response");
      console.log('====================================');
      if (response.payload.status) {
        toast.success(response.payload.message);
        setSubmitting(false);
        navigate("/chat");
      } else {
        toast.error(response.payload.message);
        setSubmitting(false);
      }
    } catch (error) {
      console.log(error);
      setSubmitting(false);
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
         <Button className="w-1/3" disable={submitting}  type="submit" >{  submitting ? "submitting..." : "Sign In" }</Button>
         <div className="text-center my-5">
          <p className='text-[8px] font-bold text-zinc-700 ' > Dont have an account ? <span className='text-blue-700'><Link to="/auth"  onClick={()=>setCurrentTab("signup")}  > Sign Up </Link></span> </p>
         </div>
         </div>
         
      </form>

    </div>
  )
}

export default SignInForm
