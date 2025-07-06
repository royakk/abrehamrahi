import { Navigate } from "react-router-dom";

import { PATH } from "@/lib/path";
import type { ReactNode } from "react";
import useAuthStore from "@/zustand/useAuthStore";

export type ProtectedRoutesProps = {
    children: ReactNode;
};
const ProtectedRoute = ({ children }: ProtectedRoutesProps) => {
    const user = useAuthStore((state) => state.user);

    if (user === undefined) return <p>Loading...</p>;
    else if (!user) return <Navigate to={PATH.login} />;
    else return children;
};

export default ProtectedRoute;
