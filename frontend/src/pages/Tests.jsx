import React, { useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";

const Tests = () => {
  const [files, setFiles] = useState([]);
  const [fileUrl, setFileUrl] = useState(null);
  const [fileNames, setFileNames] = useState(["fcf7e944-b574-4f46-8dcd-7903126a7a39","f8f15245-83e6-46d5-a522-a382fdd98680", "6062bf46-ba98-4d5f-af47-e08a414e8ffe"]);
  const [fileUrls, setFileUrls] = useState([]);
  const testImg = fileUrls[0];

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

      const response = await axios.post(
        "http://localhost:8080/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error uploading files: ", error);
    }
  };

  const handleGet = async () => {
    console.log(fileUrl)
    try {
      const response = await axios.get("http://localhost:8080/api/files/fcf7e944-b574-4f46-8dcd-7903126a7a39", {
        responseType: 'blob', // Specify the response type as blob
      });
      
      // Create URL for the file blob
      const url = URL.createObjectURL(response.data);
      setFileUrl(url);
    } catch (error) {
      console.error("Error getting file: ", error);
    }
  };

  const handleGetBulk = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/files", fileNames);

      // Decode base64 encoded strings and set URLs
      const urls = response.data.map((fileContent) => {
        const byteCharacters = atob(fileContent);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/octet-stream' });
        return URL.createObjectURL(blob);
      });

      setFileUrls(urls);
    } catch (error) {
      console.error("Error getting files: ", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} multiple />
      <button onClick={handleSubmit}>Upload</button> <br /> <br />
      <button onClick={handleGet}>Get a file</button> <br /> <br />
      <button onClick={handleGetBulk}>Get Bulk files</button> <br /> <br />
      <div>
        {fileUrl && (
          <img
            src={fileUrl}
            alt="file"
            style={{ width: "500px" }}
          />
        )}
        {fileUrl && (
          <img
            src={testImg}
            alt="file"
            style={{ width: "500px" }}
          />
        )}

        <br /><span>{fileUrl}</span>

        {/* {fileUrl && (
          <ReactPlayer url={fileUrl} controls width="500px" height="auto" />
        )} */}
      </div>


      <div>
        {fileUrls?.map((url, index) => (
          <div key={index}>
            <img src={url} alt="file" style={{ width: "500px" }} />
          </div>
        ))}
      </div>

    </div>
  );
};

export default Tests;
