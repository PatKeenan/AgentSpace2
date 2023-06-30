import { UserProfile } from "@clerk/nextjs";
import React from "react";

const Profile = () => {
  return (
    <div className="flex">
      <UserProfile />
    </div>
  );
};

export default Profile;
