import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import BookList from "../components/BookList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchBooks, fetchTypes} from "../http/bookAPI";
import Pages from "../components/Pages";
import data from "bootstrap/js/src/dom/data";

const Library = observer(() => {
    const {user} = useContext(Context)
    const {book} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => book.setTypes(data))
        fetchBrands().then(data => book.setBrands(data))
        fetchBooks(null, null, book.page, book.limit).then(data => {
            book.setBooks(data.rows)
            book.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchBooks(book.selectedType.id, book.selectedBrand.id, book.page, book.limit).then(data => {
            book.setBooks(data.rows)
            book.setTotalCount(data.count)
        })
    }, [book.page, book.selectedType, book.selectedBrand,])

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <TypeBar />
                </Col>
                <Col md={9}>
                    <BrandBar/>
                    <BookList />
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );

});

export default Library;
