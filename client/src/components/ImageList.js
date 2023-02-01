import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ImageList.css'


const ImagesList = () => {
    const [images, setImages] = useState([]);
    // const [description, setDescription] = useState("");

    async function updateDescription(id, imgDescription) {
        const newDescription = await prompt("Edit image description : ", imgDescription);
        if (newDescription !== null) {
            console.log(newDescription)
                try {
                    const response = await axios.put(`http://localhost:8000/img/update/${id}`,{newDescription});
                    console.log(response.data);

                } catch (error) {
                    console.error(error);
                }
            
        }
    }



    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/img/all');
            setImages(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="images-list">
            <button onClick={()=>fetchData()}>refreach</button>
            {images.map(({ id, url, description }) => (
                <div key={id}>
                    <img src={url} alt='img' onClick={() => { updateDescription(id, description); }} />
                    <p>{description}</p>
                </div>
            ))}
        </div>
    );
};

export default ImagesList;

