import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Victory from "../../assets/victory.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInForm from "@/components/Forms/SignInForm/SignInForm";
import SignUpForm from "@/components/Forms/SignUpForm/SignUpForm";
import Background from "../../assets/login2.png";
const Auth = () => {
  const [currentTab, setCurrentTab] = useState("signin");
  return (
    <div className="w-full min-h-[100vh] flex justify-center items-center ">
      <div className="rounded-3xl grid items-start xl:grid-cols-2 h-[80vh] no-scrollbar overflow-y-auto scroll-smooth border-2 border-white text-opacity-90 shadow-2xl w-[80vw]  md:w-[90vw] lg:w-[70vw] xl:w-[70vw]">
        <div className="flex flex-col gap-2 items-center justify-start px-2 py-4 h-full ">
          <div className="flex justify-center items-center w-full ">
            <Tabs
              className="md:w-3/4 w-full "
              defaultValue="signin"
              value={currentTab}
            >
              <TabsList className="grid w-full grid-cols-2 bg-transparent rounded-none">
                <TabsTrigger
                  onClick={() => setCurrentTab("signin")}
                  value="signin"
                  className="md:text-md text-[12px]   data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 md:p-3 p-2 transition-all duration-300 text-black text-opacity-90 border-b-2 roun-none w-full  "
                >
                  Signin
                </TabsTrigger>
                <TabsTrigger
                  onClick={() => setCurrentTab("signup")}
                  value="signup"
                  className=" md:text-md text-[12px] data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 md:p-3 p-2 transition-all duration-300 text-black text-opacity-90 border-b-2 roun-none w-full  "
                >
                  Signup
                </TabsTrigger>
              </TabsList>
              <TabsContent value="signin" className="flex flex-col gap-5 mt-5">
                <SignInForm setCurrentTab={setCurrentTab}></SignInForm>
              </TabsContent>
              <TabsContent value="signup">
                <div className="overflow-y-auto h-full ">
                  <SignUpForm
                    setCurrentTab={setCurrentTab}
                    className=""
                  ></SignUpForm>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden  xl:flex flex-col justify-center items-cente h-full">
          <div className="flex flex-col items-center justify-center">
            <div className="flex justify-center items-center">
              <h1 className="text-5xl font-bold md:text-3xl">Welcome</h1>
              <img src={Victory} alt="Vicxtory Emoji" className="h-[60px]" />
            </div>
            <p className="font-medium text-center text-sm">
              Fill In The Details To Get Started With Most Exciting Chat App
            </p>
          </div>
          <div className="h-[65vh] flex justify-center">
            <img src={Background} alt="" className="h-full object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
