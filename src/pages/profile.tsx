import { http } from "@/services/http";
import React, { useEffect } from "react";

export const Profile = () => {
  useEffect(() => {
    const getProfile = async () => {
      http.get("v6/profile/auth/get-profile/");
    };
    getProfile();
  }, []);
  return <div>Profile</div>;
};
