import React, { useEffect, useState } from 'react'
import NavBar from '../NavBar/NavBar'
import { Button, Card, CardBody, CardFooter, CardHeader, CardText, Input, ListGroup, ListGroupItem, Table } from 'reactstrap'
import postService from '../../Services/post.service';
import ReactLoading from "react-loading";


const Reservation = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    function timeConverter(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + '/' + a.getMonth() + '/' + year;
        return time;
    }

    const convertDate = (time) => {
        return timeConverter(time).toString();
    }

    useEffect(() => {
        const dataFetch = async () => {
            let reservations = await postService.getReservation();
            // set state when the data received
            setPosts(reservations);
            setLoading(false)
        };

        dataFetch();
    }, [])

    return (
        <div>
            <NavBar></NavBar>
            {loading && <ReactLoading type={"spinningBubbles"} color="#000000" className='spinner' />}
            <h3 style={{ marginTop: "30px", marginLeft: "130px", fontWeight: 'bold' }}>Liste des Reservations</h3>
            <div style={{ display: 'flex', justifyContent: "center" }}>
                <div style={{ marginTop: "20px" }}>
                    <Table
                        style={{
                            width: '68rem'
                        }}
                    >
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>
                                    Nom Prénom
                                </th>
                                <th>
                                    Email
                                </th>
                                <th>
                                    Téléphone
                                </th>
                                <th>
                                    Nombre de personnes
                                </th>
                                <th>
                                    Date
                                </th>
                                <th>
                                    Heure
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Array.from(posts).reverse().map((post) => {
                                    return (
                                        <tr>
                                            <th scope="row">
                                                {post.id}
                                            </th>
                                            <td>
                                                {post.nom} {post.prenom}
                                            </td>
                                            <td>
                                                {post.tel}
                                            </td>
                                            <td>
                                                {post.email}
                                            </td>
                                            <td>
                                                {post.nbpersonne}
                                            </td>
                                            <td>
                                                {post.datestring}
                                            </td>
                                            <td>
                                                {post.time}
                                            </td>
                                        </tr>)
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default Reservation