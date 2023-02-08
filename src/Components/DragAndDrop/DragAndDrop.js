import React, { useEffect, useRef, useState } from 'react';
import './DragAndDrop.css';
import pdfImage from './29587.png'

const DragAndDrop = ({ setFile, file }) => {
    const [image, setImage] = useState(null);
    const [fileExt, setFileExt] = useState("");
    const [isVideo, setIsVideo] = useState(false);
    const [previewUrl, setPreviewUrl] = useState("");
    const fileInput = useRef(null);

    useEffect(() => {
        if(file){
        setFileExt(file.name.split('.').pop());
        if (fileExt == "mp4") {
            setIsVideo(true);
        }
    }
    }, [file])
    

    const handleFile = file => {
        setImage(file);
        setFile(file);
        setFileExt(file.name.split('.').pop());
        if (fileExt == "mp4") {
            setIsVideo(true);
        }
        setPreviewUrl(URL.createObjectURL(file));
    }

    const handleOndragOver = event => {
        event.preventDefault();
    }

    const handleOndrop = event => {
        //prevent the browser from opening the image
        event.preventDefault();
        event.stopPropagation();         //let's grab the image file
        let imageFile = event.dataTransfer.files[0];
        handleFile(imageFile);
    }

    return (
        <div className="wrapper">
            <div
                className="drop_zone"
                onDragOver={handleOndragOver}
                onDrop={handleOndrop}
                onClick={() => fileInput.current.click()}
            >
                {!previewUrl ?
                    <p>Cliquer ici pour sélectionner ou glisser un fichier .pdf</p>
                    :
                    <div style={{display : 'flex', flexDirection : 'column', alignItems : 'center', margin: "auto"}}>
                        <img style={{width : "70px", marginBottom : "10px"}} src={pdfImage} alt=""/>
                        {file.name}
                    </div>
                }
                <input
                    type="file"
                    accept="application/pdf"
                    ref={fileInput} hidden
                    onChange={e => handleFile(e.target.files[0])}
                />
            </div>
        </div>
    )
}

export default DragAndDrop