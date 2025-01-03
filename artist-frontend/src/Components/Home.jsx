import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import Cookies from 'js-cookie';


function Home() {

    const navigate = useNavigate()

    const cookieChecker = async() => {
      try {
        const response = await fetch("http://localhost:8000/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies in the request
        });
      
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response); // Handle the response data
      } catch (error) {
        console.error("Error:", error);
        navigate("/login")
      }

    }

    useEffect(() =>{
      cookieChecker()
    },[])

  return (
    <div><h1>HOME</h1></div>
  )
}



export default Home