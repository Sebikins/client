import React, {useContext} from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {useNavigate} from "react-router-dom"
import {BOOK_ROUTE} from "../utils/consts";
import {Context} from "../index";

const BookItem = ({book}) => {
    const navigate = useNavigate()
    const {user} = useContext(Context)
    return (
        <Col md={3} className={"mt-3"} onClick={() => navigate(BOOK_ROUTE + '/' + book.id)}>

                <Card style={{ width: 170, height:250, cursor: 'pointer'} }className="p-2">
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + book.img}/><br/>
                <div style={{width: '90%', margin: '0 auto', textalign: 'center'}}>{book.name}<br/>
                </div>
            </Card>
        </Col>
    );
};

export default BookItem;
