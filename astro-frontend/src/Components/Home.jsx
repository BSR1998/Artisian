import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

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
        console.log(data); // Handle the response data
      } catch (error) {
        console.error("Error:", error);
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