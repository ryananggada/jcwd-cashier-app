import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import api from "../api.js";

export default function UserAvatar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve the JWT token from localStorage
    const token = localStorage.getItem("token");

    if (token) {
      // Decode the JWT token to get user information
      const decoded = jwt_decode(token);
      console.log("Decoded JWT token:", decoded);

      // Fetch user data from the server using the token
      api
        .get("/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const userData = response.data;
          console.log("User data from server:", userData);
          setUser(userData);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } else {
      console.log("No JWT token found in localStorage.");
    }
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center gap-x-2">
      <img
        className="h-8 w-8 rounded-full object-cover"
        src={user.profilePicture || "default_image_url.jpg"}
        alt={user.name}
      />
      <div className="flex flex-col">
        <span className="text-sm font-semibold">
          {user.name || "Default Name"}
        </span>
        <span className="text-xs">{user.role || "Default Role"}</span>
      </div>
    </div>
  );
}
