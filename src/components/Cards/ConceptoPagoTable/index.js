import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { get, onDelete } from 'services';

const marginBottom = {
    marginBottom: 10
}

const ConceptoPagoTable = ({ onHandleChange }) => {
    const [conceptosDePago, setConceptosDePago] = useState([]);
    
    useEffect(() => {
        get('ConceptosDePago').then(response => {
            setConceptosDePago(response.data.data)
        });
    }, []);

    const onAdd = () => {
        onHandleChange(0, 'agregar', false)
    }

    const onEdit = (id) => {
        onHandleChange(id, 'editar', false)
    }

    const onHandleDelete = async (id) => {
        onDelete('ConceptosDePago', id).then(() => {
            get('ConceptosDePago').then(response => {
                setConceptosDePago(response.data.data)
            });
        })
    }
    
    return (
        <Card>
            <Card.Body className={'p-20'}>
                <Row>
                    <Col style={marginBottom} xs={12}>
                        <div className="display-flex flex-end">
                            <Button variant="primary" onClick={onAdd}>Agregar <i className="fa fa-plus"></i></Button>
                        </div>
                    </Col>
                    
                    <Col xs={12}>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Estado</th>
                                    <th>Descripción</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    conceptosDePago.map(option => {
                                        return (
                                            <tr key={option.id}>
                                                <td>{option.id}</td>
                                                <td>{option.estado}</td> 
                                                <td>{option.descripcion}</td>
                                                <td>
                                                    <Button variant="danger"  onClick={() => { onHandleDelete(option.id) }}><i className="fa fa-trash-alt"></i></Button>{' '} 
                                                    <Button variant="warning" onClick={() => { onEdit(option.id) }}><i className="fa fa-pencil-alt"></i></Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>

            </Card.Body>
        </Card>
    );
};


export default ConceptoPagoTable;