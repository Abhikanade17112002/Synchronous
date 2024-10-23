import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
const CustomInput = ({ label , placeholder , disable , errors , type ,  name , register }) => {
  return (
    <div className="w-full px-2 py-2 my-2">
      <Label>{label}</Label>
      <Input type={type} disabled = {disable? true : false}  placeholder={placeholder} {...register} className="my-2" />
      {errors[name] ? (
        <div className="error">
          <span className="error-text text-[10px] text-red-700 font-semibold">
            {errors[name]?.message}
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default CustomInput;
