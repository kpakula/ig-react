import React, { useEffect } from 'react'
import axios from 'axios'

function Profile() {
    // useEffect(() => {
    //     axios({ method: 'get', url: 'http://localhost:8080/home', headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") } })
    
    // })
    delete axios.defaults.headers.common["Authorization"];
        const jwt = `Bearer ${localStorage.getItem("token")}`;

        axios.get("http://localhost:8080/home", { headers: {
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }})
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })

    // })
    return (

        <div>
                    <div>Profile</div>
        </div>
    )
}

export default Profile
