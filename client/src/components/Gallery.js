import React, { useState } from 'react';
import axios from "axios";
import './Gallery.css'

function Gallery() {
    const [image, setImage] = useState('');
    const [pic, setPic] = useState("");
    const [New, setNew] = useState(false)
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('url');
    //------------------------------------------------------------------//
    const URL = "http://localhost:8000/img"
    async function uploadToServer() {

        try {
            const response = await axios.post(`${URL}/add`, {
                description: description !== "" ? description : "No description set yet",
                url: url
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    //------------------------------------------------------------------//

    const UploadToCloudinary = () => {
        setNew(false);
        const data = new FormData();
        data.append("file", pic);
        data.append("upload_preset", "mchat-app");
        data.append("cloud_name", "ayoub-cloud");

        fetch("https://api.cloudinary.com/v1_1/ayoub-cloud/image/upload", {
            method: "post",
            body: data,
        })
            .then((res) => res.json())
            .then((data) => {
                setUrl(data.url.toString());
                if (url.length > 3) {
                    console.log(url)
                    uploadToServer();
                } else {
                    console.log("url not changed ??????");
                    setNew(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    //------------------------------------------------------------------//

    // handleFileUpload function for handling image file uploads
    function handleFileUpload(event) {
        // Get the first file from the event target's files array
        const file = event.target.files[0];
        // Get the file type
        const fileType = file.type.split('/')[0];
        // Check if the file type is not an image
        if (fileType !== 'image') {
            // Show an alert message to the user and exit the function
            alert('Only image files are allowed');
            return;
        }
        // Create a new FileReader object
        const reader = new FileReader();
        // Set the onload function to call the addImage function
        reader.onload = function () {
            setImage({ url: reader.result });
        };
        // Read the file as a DataURL
        reader.readAsDataURL(file);
        // Set the description variable to an empty string
        setNew(true)
    }
    //------------------------------------------------------------------//
    return (
        <div className="container">
            <div className="gallery">
                <div className="inputs">
                    <input className="file" type="file" onChange={(event) => { handleFileUpload(event); setPic(event.target.files[0]) }} />
                    <input type="text" placeholder="enter description ..." value={description} onChange={(e) => setDescription(e.target.value)} />

                    {New === true ? <button className='update' onClick={() => UploadToCloudinary()}>Upload to cloudinary</button> : ""}
                </div>
                {
                    <div className="imag">
                        <img src={image.url} alt={description} />
                    </div>
                }
            </div>
        </div>
    );
}

export default Gallery;