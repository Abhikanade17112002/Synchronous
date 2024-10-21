import { Button } from "@/components/ui/button";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Chat from "./Pages/Chat/Chat";
import Profile from "./Pages/Profile/Profile";
import Auth from "./Pages/Auth/Auth";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/chat" element={<Chat/>} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
}
