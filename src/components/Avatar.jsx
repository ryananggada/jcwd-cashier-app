import React, { useEffect, useState } from "react";
import jwt from "jwt-decode";

export default function UserAvatar() {
  const token = localStorage.getItem("token");
  const decodedToken = jwt(token);
  const profPicSrc = `http://localhost:8000/profile-picture/`;

  const { name, role, profilePicture } = decodedToken;

  const defaultAvatarURL =
    "https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_1280.png";
  const avatarURL = profilePicture
    ? `${profPicSrc}/${profilePicture}`
    : defaultAvatarURL;

  // Function to capitalize the first letter of each word
  const capitalizeWords = (text) => {
    return text
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <div className="flex items-center gap-x-2">
      <img
        className="h-[60px] w-[60px] rounded-full object-cover"
        src={avatarURL}
        alt={name}
      />
      <div className="flex flex-col">
        <span className="text-sm font-semibold">{capitalizeWords(name)}</span>
        <span className="text-xs">{capitalizeWords(role)}</span>
      </div>
    </div>
  );
}
