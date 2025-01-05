import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const cookieChecker = async () => {
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
      navigate("/login");
    }
  };

  useEffect(() => {
    cookieChecker();
  }, []);

  async function submitTheForm(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('profile', file);

    const result = await fetch("http://localhost:8000/user/profile", {
      method: "POST",
      body: formData,
      credentials: "include", // Ensures cookies are sent and stored
    });

    if (result.ok) {
      console.log("File uploaded successfully");
    } else {
      console.error("Error uploading file");
    }
  }

  function imageSelect(e) {
    setFile(e.target.files[0]);
  }

  return (
    <form onSubmit={submitTheForm} enctype="multipart/form-data">
      <TextField
        type="file"
        variant="outlined"
        fullWidth
        label="Upload File"
        InputLabelProps={{ shrink: true }}
        name="profile"
        onChange={imageSelect}
      />
      <div style={{ margin: "5px" }}>
        <Button type="submit" variant="contained">Submit</Button>
      </div>
    </form>
  );
}

export default Home;
