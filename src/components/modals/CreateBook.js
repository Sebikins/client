import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form, Row, Col} from "react-bootstrap";
import {Context} from "../../index";
import {createBook, fetchBrands, fetchTypes} from "../../http/bookAPI";
import {observer} from "mobx-react-lite";

const CreateBook = observer(({show, onHide}) => {
    const {book} = useContext(Context)
    const [name, setName] = useState('')
    const [country, setCountry] = useState('')
    const [amount, setAmount] = useState(1)
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])

    useEffect(() => {
        fetchTypes().then(data => book.setTypes(data))
        fetchBrands().then(data => book.setBrands(data))
    }, [])

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addBook = () => {
        const formData = new FormData()
        try{
            formData.append('name', name)
            formData.append('country', 10)
            formData.append('price', `${price}`)
            formData.append('img', file)
            formData.append('amount', `${amount}`)
            formData.append('brandId', book.selectedBrand.id)
            formData.append('typeId', book.selectedType.id)
            formData.append('info', JSON.stringify(info))
            createBook(formData).then(data => onHide())
        } catch(e){
            alert(e)
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Добавить книгу
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{book.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {book.types.map(type =>
                                <Dropdown.Item
                                    onClick={() => book.setSelectedType(type)}
                                    key={type.id}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{book.selectedBrand.name || "Выберите Жанр"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {book.brands.map(brand =>
                                <Dropdown.Item
                                    onClick={() => book.setSelectedBrand(brand)}
                                    key={brand.id}
                                >
                                    {brand.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Введите название"
                    />
                    <Form.Control
                        className="mt-3 ua"
                        type="file"
                        onChange={selectFile}
                    />
                    <hr/>
                    <Button
                        variant={"outline-dark"}
                        onClick={addInfo}
                    >
                        Добавить автора
                    </Button>
                    {info.map(i =>
                        <Row className="mt-4" key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.title}
                                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                    placeholder="Введите имя автора"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.description}
                                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                    placeholder="вставьте ссылку"
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    onClick={() => removeInfo(i.number)}
                                    variant={"outline-danger"}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addBook}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateBook;
