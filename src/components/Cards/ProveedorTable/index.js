import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { post, get, onDelete } from 'services';
import Form from 'react-bootstrap/Form';
import CurrencyInput from 'react-currency-input';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

const marginBottom = {
    marginBottom: 10
}

const mtHere = {
    marginTop: 32
}

const mr = {
    ...mtHere,
    marginRight: 10
}

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const days = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];
const format = 'dd/MM/yyyy';
const locale = {
    localize: {
        month: n => months[n],
        day: n => days[n]
    },
    formatLong: {}
};

const ProveedorTable = ({ onHandleChange }) => {
    const [proveedores, setProveedores] = useState([]);
    const [balance, setBalance] = useState('');
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    
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

    const onFilter = () => {
        let url = 'Proveedores/filter'
        let data = {}

        if (balance) {
            data = {
                balance: parseFloat(balance)
            }
        }

        if (startDate && endDate) {
            url = `Proveedores/filter?fechaInicio=${startDate}&fechaFin=${endDate}`
        }

        post(url, data).then(response => {
            setProveedores(response.data.data)
        });
    }

    const onClear = () => {
        get('Proveedores').then(response => {
            setProveedores(response.data.data)
        });
        setBalance('');
        setStartDate();
        setEndDate();
    }
    
    return (
        <>
        <Card>
            <Card.Body className={'p-20'}>
                <Form.Row>

                    <Form.Group as={Col} md="3" controlId={"validationwageAspiratio212"}>
                        <Form.Label>Balance</Form.Label>
                        <Form.Control
                            type="text"
                            name="balance"
                            value={balance}
                            onChange={e => setBalance(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="validationFormik11">
                        <Form.Label> Desde </Form.Label>
                        <DatePicker 
                            className="form-control"
                            locale={locale}
                            dateFormat={format}
                            selected={startDate} onChange={date => setStartDate(date)}
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="validationFormik11">
                        <Form.Label> Hasta </Form.Label>
                        <DatePicker 
                            className="form-control"
                            locale={locale}
                            dateFormat={format}
                            selected={endDate} onChange={date => setEndDate(date)}
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="validationFormik11">
                        <div className="display-flex flex-end">
                            <Button style={mr} variant="primary" onClick={onClear}>  <i className="fa fa-broom"></i></Button>
                            <Button style={mtHere} variant="primary" onClick={onFilter}> <i className="fa fa-search"></i></Button>
                        </div>
                    </Form.Group>

                </Form.Row>
                
            </Card.Body>
        </Card>
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