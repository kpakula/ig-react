import React, { useEffect } from 'react'
import axios from 'axios'

function Profile() {

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }
      };

    const clicked = (e) => {
        e.preventDefault();

          console.log(localStorage.getItem("token"))
        axios.post("http://localhost:8080/something", {},  axiosConfig)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
        console.log(axiosConfig)
    }

    // })
    return (

        <div>
        <button onClick={clicked}>Benc</button>
                    <div>Profile</div>
        </div>
    )
}

export default Profile
