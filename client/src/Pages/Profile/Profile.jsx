import React, { useRef, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  handleUserUpdateProfileAction,
  handleRemoveUserProfileImageAction,
} from "@/store/userSlice/userSlice";
import { colors, getColor } from "@/utils/colors";
import { FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import CustomInput from "@/components/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const [image, setImage] = useState("");

  const [fileInput, setFileInput] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const user = useSelector(getUser);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    firstname: "",
    lastname: "",
  });

  const handUserDataUpdate = async (data) => {
    try {
      let formdata = { ...data, color: selectedColor, profileimage: image };

      const response = await dispatch(handleUserUpdateProfileAction(formdata));

      if (response.payload.status) {
        toast.success(response.payload.message);
      } else {
        toast.error(response.payload.message);
      }
    } catch (error) {
      console.log("ERROR WHILE UPDATING USER INFO", error);
    }
  };

  const handleNavigate = () => {
    if (user && user?.profilesetup) {
      navigate("/chat");
    } else {
      toast.error("Please Setup Profile First");
    }
  };

  const handleFileInputClicked = () => {
    fileInputRef.current.click();
  };

  const handleUserProfileImageChange = async (event) => {
    try {
      const Image = event.target.files[0];

      if (Image) {
        setImage(Image);
      } else {
        setImage("");
      }
    } catch (error) {}
  };
  const handleUserProfileImageDelete = async () => {
    try {
      const response = await dispatch(handleRemoveUserProfileImageAction());

      if (response.payload.status) {
        toast.success(response.payload.message);
        setImage(null);
      } else {
        toast.error(response.payload.message);
      }
    } catch (error) {
      console.log("ERROR WHILE Deleting  USER INFO", error);
    }
  };

  return (
    <div className="bg-gray-800 min-h-[100vh]  overflow-hidden flex items-center justify-center  flex-col gap-10 ">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max overflow-hidden">
        <div className="">
          <IoArrowBack
            onClick={() => handleNavigate()}
            className=" text-3xl overflow-hidden text-white/90 cursor-pointer"
          ></IoArrowBack>
        </div>
        <div className="grid grid-cols-2 justify-center items-center h-full  ">
          <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="h-full w-full   relative flex items-center justify-center "
          >
            <Avatar className="h-32 w-32 md:w-48 md:h-48  rounded-full">
              {user?.profileimage ? (
                <AvatarImage
                  src={user?.profileimage || "https://github.com/shadcn.png"}
                  alt="profile image"
                  className="object-contain rounded-full   overflow-hidden"
                />
              ) : (
                <div
                  className={` uppercase overflow-hidden h-32 w-32 md:w-48 md:h-48 text-5xl border border-black flex justify-center  items-center  rounded-full ${getColor(
                    user?.color || selectedColor
                  )} `}
                >
                  {user?.firstname
                    ? user?.firstname.split("").shift()
                    : user?.email.split("").shift()}
                </div>
              )}
              {hover && (
                <div
                  onClick={
                    user?.profileimage
                      ? handleUserProfileImageDelete
                      : handleFileInputClicked
                  }
                  className="absolute inset-0 flex   items-center justify-center bg-black/50 ring-fuchsia-50 rounded-full"
                >
                  {user?.profileimage ? (
                    <FaTrash className="text-white text-3xl cursor-pointer" />
                  ) : (
                    <FaPlus
                      className="text-white text-3xl cursor-pointer"
                      onClick={() => setFileInput(true)}
                    />
                  )}
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleUserProfileImageChange}
                name="profileimage"
              />
            </Avatar>
          </div>

          <div className="h-full">
            <form
              action=""
              onSubmit={handleSubmit(handUserDataUpdate)}
              className=" font-bold h-full flex min-w-32  md:min-w-64 flex-col  text-black items-center justify-evenly"
            >
              <CustomInput
                label="First Name"
                type="text"
                name="firstname"
                errors={errors}
                placeholder="Enter First Name"
                register={register("firstname", {
                  required: {
                    value: true,
                    message: "first name is required",
                  },
                })}
              />
              <CustomInput
                label="Last Name"
                type="text"
                name="lastname"
                errors={errors}
                placeholder="Enter Last Name"
                register={register("lastname", {
                  required: {
                    value: true,
                    message: "last name is required",
                  },
                })}
              />

              <div className="w-full flex  justify-around my-1 py-2">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedColor(index);
                    }}
                    className={`cursor-pointer transition-all duration-300   w-7 h-7 rounded-full ${color} ${
                      selectedColor === index
                        ? "outline outline-white/50 outline-4"
                        : ""
                    }`}
                  ></div>
                ))}
              </div>
              <div className="flex justify-center my-4">
                {" "}
                <Button type="submit" className="mx-3">
                  {" "}
                  Update Profile
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
