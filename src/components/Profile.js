import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");

  const getProfileInformationRequest = (props) => {
    const config = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8;",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .get("http://localhost:8080/profile", config)
      .then((response) => {
        setUsername(response.data.username);
        setId(response.data.id);
        setEmail(response.data.email);

      })
      .catch((error) => {
        console.log(error);
      });
  };

//   const updateData = (response) => {

//   }

  useEffect(() => {
    getProfileInformationRequest();
  }, []);

  // })
  return (
    <div>
      <div>
        <h1>Profile</h1>
      </div>
    </div>
  );
}

export default Profile;
