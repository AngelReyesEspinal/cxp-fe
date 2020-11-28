import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { get, onDelete } from 'services';
import "react-datepicker/dist/react-datepicker.css";
import GenericFilter from "components/GenericFilter";

const marginBottom = {
    marginBottom: 10
}

const ProveedorTable = ({ onHandleChange }) => {
    const [proveedores, setProveedores] = useState([]);

    useEffect(() => {
        get('Proveedores').then(response => {
            setProveedores(response.data.data)
        });
    }, []);

    const onAdd = () => {
        onHandleChange(0, 'agregar', false)
    }

    const onEdit = (id) => {
        onHandleChange(id, 'editar', false)
    }

    const onHandleDelete = async (id) => {
        onDelete('Proveedores', id).then(() => {
            get('Proveedores').then(response => {
                setProveedores(response.data.data)
            });
        })
    }
    
    return (
        <>
        <GenericFilter filterByBalance={true} filterByDates={true} endpoint={'Proveedores'} setData={setProveedores}/>
        <br/>
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
                                    <th>Nombre</th>
                                    <th>Tipo persona</th>
                                    <th>Cédula/RNC</th>
                                    <th>Balance</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    proveedores.map(option => {
                                        return (
                                            <tr key={option.id}>
                                                <td>{option.nombre}</td> 
                                                <td>{option.tipoPersona}</td>
                                                <td>
                                                    <b> { option.tipoDocumento } </b>
                                                    {option.documento}
                                                </td>
                                                <td>{option.balance}</td>
                                                <td>{option.estado}</td>
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
        </>
    );
};


export default ProveedorTable;