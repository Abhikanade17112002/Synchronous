import React from "react";
import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";

const CustomDropDown = ({
  dropDownOptions,
  label,
  placeholder,
  name,
  control,
  errors,
}) => {
  return (
    <div className="px-4 my-2">
      <Label className="text-sm font-semibold">{label}</Label>

      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full my-2">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {dropDownOptions &&
                  dropDownOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />

      {errors[name] && (
        <div className="error">
          <span className="error-text text-[10px] text-red-700 font-semibold">
            {errors[name]?.message}
          </span>
        </div>
      )}
    </div>
  );
};

export default CustomDropDown;
