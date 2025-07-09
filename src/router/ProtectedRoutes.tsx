import { PATH } from "@/lib/path";
import type { ReactNode } from "react";
import useAuthStore from "@/zustand/useAuthStore";

import { Outlet, Navigate } from "react-router-dom";
export type ProtectedRoutesProps = {
  children: ReactNode;
};

const ProtectedRoute = () => {
  const user = useAuthStore((state) => state.user);

  if (user === undefined) return <p>Loading…</p>;
  if (!user) return <Navigate to={PATH.login} />;
  return <Outlet />;
};

export default ProtectedRoute;
