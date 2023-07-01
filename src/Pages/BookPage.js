import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, Image, Row} from "react-bootstrap";
import {useParams} from 'react-router-dom';
import {addToBasket, delBook, fetchOneBook, setDescription, updateAmount} from "../http/bookAPI";
import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {Context} from "../index";
import SetDescription from "../components/modals/SetDescription";

const BookPage = observer(() => {

    const {user} = useContext(Context)
    const [book, setBook] = useState({info: []})
    const {id} = useParams()
    const [bookVisible, setBookVisible] = useState(false)
    useEffect(() => {
        fetchOneBook(id).then(data => setBook(data))
    }, [])

    const [value, setValue] = useState('')


    

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + book.img}/>
                    <h1>{book.name}</h1>
                </Col>
                <Col>
                    <h2>Ссысылки и автор</h2>
                    {book.info.map((info, index) =>
                        <Row key={info.id} style={{
                            //border: '2px solid lightgray',
                            //background: index % 2 === 0 ? 'lightgray' : 'transparent',
                            padding: 10
                        }}>
                            <Col>{info.title}</Col><Col> : {info.description}</Col>
                            {user.isRole === "ADMIN"?
                                <Row>
                                    <Col className="mt-3 ">
                                        <Button
                                            variant={"outline-dark"}
                                            className="bg-primary text-light"
                                            onClick={() => setBookVisible(true)}
                                        >
                                            Добавить описание
                                        </Button>
                                        <SetDescription show={bookVisible} onHide={() => setBookVisible(false)}/>
                                    </Col>
                                    </Row>:<br/>
                                }
                                </Row>
                            )}
                </Col>
            </Row>
            <Row >
                <Col className={"w-75"}>
                    <label >
                        {book._info}
                    </label>
                </Col>
                
            </Row>
            
        </Container>
    );
});
export default BookPage;
