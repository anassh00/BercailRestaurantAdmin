import React, { useEffect, useState } from 'react'
import { Button, Card, CardText, CardTitle, Col, Row } from 'reactstrap'
import postService from '../../Services/post.service'
import Create from '../Create/Create'
import DragAndDrop from '../DragAndDrop/DragAndDrop'
import NavBar from '../NavBar/NavBar'
import './Carte.css'
import ReactLoading from "react-loading";

const API_URL = "http://localhost:8000/";

const Carte = () => {

    const [carte, setCarte] = useState("");
    const [carteBoissons, setCarteBoissons] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const dataFetch = async () => {
            let restaurant = await postService.getCarteRestaurant();
            let boissons = await postService.getCarteBoisson();
            // set state when the data received
            setCarte(restaurant);
            setCarteBoissons(boissons);
            setLoading(false);
        };

        dataFetch();
    }, [])

    return (
        <div>
            <NavBar></NavBar>
            {loading && <ReactLoading type={"spinningBubbles"} color="#000000" className='spinner' />}
            <div className='carteContainer'>
            <Row>
                <Col sm="6">
                    <Card body>
                        <CardTitle tag="h5">
                            Carte actuelle du Restaurant
                        </CardTitle>
                        <Button onClick={()=> window.open(API_URL+"media/"+carte)}>
                        Visualiser
                        </Button>
                    </Card>
                </Col>
                <Col sm="6">
                    <Card body>
                        <CardTitle tag="h5">
                            Carte actuelle des Boissons
                        </CardTitle>
                        <Button onClick={()=> window.open(API_URL+"media/"+carteBoissons)}>
                            Visualiser
                        </Button>
                    </Card>
                </Col>
            </Row>
            <Create setLoading={setLoading}></Create>
            </div>
        </div>
    )
}

export default Carte