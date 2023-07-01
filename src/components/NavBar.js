import React, {useContext} from 'react';
import {Context} from "../index";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Button, Container,Row,Col} from "react-bootstrap";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, LIBRARY_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <Navbar bg="primary" variant="dark">
            <Container> 
                <label style={{color:'white',cursor: 'pointer' }} onClick={() => history(LIBRARY_ROUTE)}>Книги</label>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: 'white' }}>
                        {user.isRole === 'ADMIN'?
                        <Row>
                            <Col>
                            <Button
                                onClick={() => history(ADMIN_ROUTE)}
                                className="ms-3"
                            >
                                Админ
                            </Button>
                            </Col>
                            <Col>
                            <Button
                                    
                                onClick={() => logOut()}
                                className="ms-3"
                            >
                                Выйти
                            </Button>
                            </Col>
                        </Row>
                        : <Button
                            
                        onClick={() => logOut()}
                        className="ms-3"
                    >
                        Выйти
                    </Button>}             
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button onClick={() => history(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>

    );
});

export default NavBar;