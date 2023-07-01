import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Row} from "react-bootstrap";

const BrandBar = observer(() => {

    const {book} = useContext(Context)

    return (
        <Row className="d-flex" >
            {book.brands.map(brand =>
                <Card
                    style={{cursor:'pointer', width: 'min-content'}}

                    key={brand.id}
                    className="p-3"
                    onClick={() => book.setSelectedBrand(brand)}
                    border={brand.id === book.selectedBrand.id ? 'primary' : 'light'}
                >
                    {brand.name}
                </Card>
            )}
        </Row>
    );
});

export default BrandBar;
