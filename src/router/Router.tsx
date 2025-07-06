import { Navigate, Route, Routes } from "react-router-dom"; // make sure it's 'react-router-dom' not 'react-router'
import useAuthStore from "../zustand/useAuthStore";
import { Login } from "../pages/login";
import { Profile } from "../pages/profile";
import useCheckLogin from "../hooks/usecheckLogin";
import { PATH } from "../lib/path";

export default function Router() {
  const user = useAuthStore((state) => state.user);
  useCheckLogin();

  if (user === undefined) {
    return <p>Loading...</p>;
  }

  return (
    <Routes>
  {user ? (
    <>
      <Route path="/" element={<Navigate to={PATH.profile}  replace/>} />
      <Route path={PATH.profile} element={<Profile />} />
    </>
  ) : (
    <>
      <Route path={PATH.login} element={<Login />} />
      <Route path="*" element={<Navigate to={PATH.login} replace />} />
    </>
  )}
</Routes>

  );
}
