import axios from 'axios';
import React, { useState } from 'react'
import './MyGallery.css'


export const MyGallery = () => {

    const [imgtoupload, setimgtoupload] = useState(null);
    const [picture, setPicture] = useState(null);
    const [description, setDescription] = useState('');
    const URL = "http://localhost:8000/img";


    function handleFileUpload(event) {
        const file = event.target.files[0];
        const fileType = file.type.split('/')[0];
        if (fileType !== 'image') {
            alert('Only image files are allowed');
            return;
        }
        const reader = new FileReader();
        reader.onload = function () {
            setPicture({ url: reader.result });
        };
        reader.readAsDataURL(file);
    }
    //-----------------------------------------------//
    const UploadToCloudinary = () => {
        console.log("first")
        const data = new FormData();
        data.append("file", imgtoupload);
        data.append("upload_preset", "mchat-app");
        data.append("cloud_name", "ayoub-cloud");

        fetch("https://api.cloudinary.com/v1_1/ayoub-cloud/image/upload", {
            method: "post",
            body: data,
        })
            .then((res) => res.json())
            .then(async (data) => {
                setPicture(null);
                setimgtoupload(data.url.toString());
                try {
                    const response = await axios.post(`${URL}/add`, {
                        description: description !== "" ? description : "No description set yet",
                        url: data.url.toString()
                    });
                    console.log("response.data from my api");
                    console.log(response.data);
                } catch (error) {
                    console.error(error);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    //-----------------------------------------------//
    return (
        <div>
            <div className="inputes">
                <h1>Upload My picture</h1>
                {picture === null ? null : <img src={picture.url} alt="img" />}
                <input className="file" type="file" onChange={(event) => { setimgtoupload(event.target.files[0]); handleFileUpload(event); }} />
                <input type="text" placeholder="enter description ..." value={description} onChange={(event) => setDescription(event.target.value)} />
                {picture === null ? null : <button onClick={() => UploadToCloudinary()}>Upload to cloudinary</button>}
            </div>
            <div className="list-images">
            </div>
        </div>
    )
}
