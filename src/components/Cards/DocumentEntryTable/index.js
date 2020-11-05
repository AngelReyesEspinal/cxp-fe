import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { get, onDelete } from 'services';
import moment from 'moment';

const marginBottom = {
    marginBottom: 10
}

const DocumentEntryTable = ({ onHandleChange }) => {
    const [entradasDeDocumento, setEntradasDeDocumento] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [displayTable, setDisplayTable] = useState(false);
    
    useEffect(() => {

        get('Proveedores').then(response => {
            setProveedores(response.data.data)
            setDisplayTable(true)
        });

        get('EntradasDeDocumento').then(response => {
            setEntradasDeDocumento(response.data.data)
        });

    }, []);

    const onAdd = () => {
        onHandleChange(0, 'agregar', false)
    }

    const onEdit = (id) => {
        onHandleChange(id, 'editar', false)
    }

    const onHandleDelete = async (id) => {
        onDelete('EntradasDeDocumento', id).then(() => {
            get('EntradasDeDocumento').then(response => {
                setEntradasDeDocumento(response.data.data)
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
                                    <th>Número documento</th>
                                    <th>Número de factura</th>
                                    <th>Fecha</th>
                                    <th>Monto</th>
                                    <th>Estado</th>
                                    <th>Proveedor</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    displayTable && entradasDeDocumento.map(option => {
                                        return (
                                            <tr key={option.id}>
                                                <td>{option.numeroDocumento}</td>
                                                <td>{option.numeroFactura}</td> 
                                                <td>{ moment(option.fechaDocumento).format('LL') }</td>
                                                <td>{option.monto}</td>
                                                <td>{option.estado}</td>
                                                <td>{proveedores.find(x => x.id == option.proveedorId).nombre}</td>
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


export default DocumentEntryTable;