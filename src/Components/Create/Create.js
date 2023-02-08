import React from 'react'
import { useState } from 'react';
import DragAndDrop from '../DragAndDrop/DragAndDrop.js'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, ButtonGroup, Alert } from 'reactstrap';
import authService from '../../Services/auth.service.js';
import postService from '../../Services/post.service.js';

const Create = ({ modal, toggle, setLoading}) => {
    const [file, setFile] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const authed = authService.getCurrentUser();
    const [description, setDescription] = useState("");
    const [rSelected, setRSelected] = useState("1");

    const handleChangeDescription = (event) => {
        setDescription(event.target.value);
    }

    async function handleSubmit() {
        try {
            console.log("submit !");
            setLoading(true);
            setShowAlert(true);
            let uploadfile = await postService.uploadfile(file);
            let uploadPost = await postService.savePost(description, uploadfile, authed.data.username, rSelected);
            window.location.reload(false);
            
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div style={{ marginTop: "20px" }}>
            <div style={{ marginBottom: "20px" }}>
                <h5>Mise à jour de la carte : </h5>
                <ButtonGroup>
                    <Button
                        color="secondary"
                        outline
                        onClick={() => setRSelected("1")}
                        active={rSelected === "1"}
                    >
                        Restaurant
                    </Button>
                    <Button
                        color="secondary"
                        outline
                        onClick={() => setRSelected("2")}
                        active={rSelected === "2"}
                    >
                        Boissons
                    </Button>
                </ButtonGroup>
                {/* <p>Selected: {rSelected}</p> */}
            </div>
            <DragAndDrop setFile={setFile} file={file}></DragAndDrop>
            <div>
                <div>
                    <FormGroup style={{ display: "flex", flexDirection: "column", marginTop: "20px", width: "100%" }}>
                        <Button onClick={handleSubmit} style={{ width: "100%" }}>Mettre à jour la carte</Button>
                    </FormGroup>
                </div>
            </div>
        </div>
    )
}

export default Create