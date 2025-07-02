import { Navigate, Route, Routes } from "react-router";
import useAuthStore from "./zustand/useAuthStore";
import { Login } from "./pages/login";
import { Profile } from "./pages/profile";
import useCheckLogin from "./hooks/usecheckLogin";

export default function Router() {
  const user = useAuthStore((state) => state.user);
  useCheckLogin();
  return (
    <>
      {user ? (
        <Routes>
          <Route path="/" element={<Profile />} />
        </Routes>
      ) : user === null ? (
        <Routes>
          <Route path="/Login" element={<Login />} />
        </Routes>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
