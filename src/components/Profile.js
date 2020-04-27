import React from 'react'
import axios from 'axios'

const axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8;',
        "Authorization" : `Bearer ${localStorage.getItem("token")}`,
    }
  };

function Profile() {


    const clicked = (e) => {
        // axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("token") ;

        axios.post("http://localhost:8080/profile", {}, axiosConfig)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })

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
