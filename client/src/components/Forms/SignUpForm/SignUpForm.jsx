import CustomInput from '@/components/CustomInput/CustomInput'
import { Button } from '@/components/ui/button'
import { handleUserSignUpAction } from '@/store/userSlice/userSlice'
import React, { useState } from 'react'
import {  useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const SignUpForm = ({setCurrentTab}) => {
  const navigate = useNavigate() ;
  const dispatch = useDispatch() ;
  const [ submitting , setSubmitting ] = useState(false) ;
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
      const response = await dispatch(handleUserSignUpAction(data));
      console.log('====================================');
      console.log(response,"Response");
      console.log('====================================');
      if (response.payload.status) {
        toast.success(response.payload.message);
        setSubmitting(false);
        navigate("/profile");
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
    <div className='w-full flex flex-col justify-center items-center  my-5 '>
      <form action="" className='w-full px-8' onSubmit={handleSubmit(handleUserSignUp)}  >
        <CustomInput
          label="Username"
          type="text"
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
         <Button className="w-1/3"    disable={submitting}   type="submit" > {submitting? "submitting ..." : "Sign Up"} </Button>
         <div className="text-center my-5">
          <p className='text-[8px] font-bold text-zinc-700 ' > Already  have an account ? <span className='text-blue-700'><Link to="/auth"  onClick={()=>setCurrentTab("signin")}  > Sign In </Link></span> </p>
         </div>
         </div>
         
      </form>

    </div>
  )
}

export default SignUpForm
