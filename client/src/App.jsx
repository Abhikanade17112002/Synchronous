import { Button } from "@/components/ui/button";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Chat from "./Pages/Chat/Chat";
import Auth from "./Pages/Auth/Auth";
import AuthRoutes from "./components/ProtectedRoutes/AuthRoutes";
import PrivateRoutes from "./components/ProtectedRoutes/PrivateRoutes";
import Profile from "./Pages/Profile/Profile";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { getUserInfoAction } from "./store/userSlice/userSlice";

export default function App() {
  const dispatch  = useDispatch() ;
  useEffect(()=>{
    fetchUser() ;
  },[]) ;


  const fetchUser = async () =>{
    try {
        const response =  await dispatch(getUserInfoAction()) ;
    } catch (error) {
      
    }
  }

  return  (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthRoutes><Auth/></AuthRoutes>} />
        <Route path="/profile" element={<AuthRoutes><Profile/></AuthRoutes>} />
        <Route path="/chat" element={<PrivateRoutes><Chat/></PrivateRoutes>} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
}
