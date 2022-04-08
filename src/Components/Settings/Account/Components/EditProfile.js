import React from "react";

import { useSelector } from "react-redux";

export default function EditProfile() {

  const userData = useSelector((state) => state.auth.userData);

  return (
    <div>
      <div className="mb-10">{userData["business name"]}</div>
    </div>
  );
}
