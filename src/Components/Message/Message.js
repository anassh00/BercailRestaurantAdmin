import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, CardText, Input, ListGroup, ListGroupItem } from 'reactstrap'
import postService from '../../Services/post.service'
import ButtonMailto from '../ButtonMailto/ButtonMailto'
import NavBar from '../NavBar/NavBar'
import ReactLoading from "react-loading";
import './Message.css'

const Message = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actualMessage, setActualMessage] = useState(null);

    useEffect(() => {
        const dataFetch = async () => {
            let messagesFetched = await postService.getMessages();
            // set state when the data received
            setPosts(messagesFetched);
            setActualMessage(messagesFetched[messagesFetched.length - 1])
            setLoading(false)
        };

        dataFetch();
    }, [])
    
    return (
        <div>
            <NavBar></NavBar>
            {loading && <ReactLoading type={"spinningBubbles"} color="#000000" className='spinner' />}
            {posts.length !== 0 ?
                <div style={{ display: 'flex', justifyContent: "center" }}>
                    <div style={{ marginTop: "30px" }}>
                        <Card
                            style={{
                                width: '18rem'
                            }}
                        >
                            <CardHeader>
                                Liste des messages
                            </CardHeader>
                            <ListGroup flush>
                                {
                                    Array.from(posts).reverse().map((post) => {
                                        return (<ListGroupItem style={{cursor : "pointer"}} onClick={()=>setActualMessage(post)}>
                                            {post.FirstName} {post.LastName}
                                        </ListGroupItem>)
                                    })
                                }
                            </ListGroup>
                        </Card>
                    </div>
                    <div style={{ marginTop: "30px", marginLeft: "30px" }}>
                        <Card
                            style={{
                                width: '35rem',
                                height: '30rem'
                            }}
                        >
                            <CardHeader>
                                {actualMessage ? actualMessage.FirstName + " " + actualMessage.LastName : null}
                                <br></br>
                                {actualMessage ? "Email : "+actualMessage.Email : null}
                            </CardHeader>
                            <CardBody>
                                <CardText>
                                    {actualMessage ? actualMessage.MessageText : null}
                                </CardText>
                            </CardBody>
                            <CardFooter>
                                <div style={{ display: 'flex', justifyContent: "space-between", flexDirection: 'row-reverse' }}>
                                    {/* <Button style={{marginRight : "20px", borderRadius : "20px"}}>Répondre</Button> */}
                                    <ButtonMailto label="Répondre" mailto={"mailto:"+actualMessage.Email+"?subject=AuBercail : Réponse à Votre message&body=Bonjour "+actualMessage.FirstName+" "+actualMessage.LastName+","} />
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
                :
                <h3 style={{textAlign : 'center', marginTop : "150px"}}>Pas de messages disponible</h3>
            }
        </div>
    )
}

export default Message