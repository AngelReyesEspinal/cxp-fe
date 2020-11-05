import React, { useState } from 'react';
import Bienvenido from "../../components/Bienvenido";
import Card from 'react-bootstrap/Card';

const Home = ({ label, onToggleDetail }) => {
    const [showDetail, setShowDetail] = useState(true);
    const handleChangeSetShowDetail = () => {
        setShowDetail(!showDetail);
        onToggleDetail(!showDetail)
    }
    return (
        <div>
            <div className={'display-flex space-between center-vertical '}>
                <div></div>
                <Bienvenido />
            </div>
            <Card>
                <Card.Body className={'fs-20'}> {label} </Card.Body>
            </Card>
            <br />
        </div>
    );
}

export default Home;
