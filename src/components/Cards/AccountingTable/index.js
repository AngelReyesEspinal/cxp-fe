import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { get, post } from 'services';
import moment from 'moment';
import GenericFilter from "components/GenericFilter";

const AccountingTable = () => {
    const [entradasDeDocumento, setEntradasDeDocumento] = useState([]);
    const [displayTable, setDisplayTable] = useState(false);

    useEffect(() => {
        get('EntradasDeDocumento').then(response => {
            setEntradasDeDocumento(response.data.data)
            setDisplayTable(true)
        });
    }, []);
    
    return (
        <>
        <GenericFilter filterByDates={true} endpoint={'EntradasDeDocumento'} setData={setEntradasDeDocumento}/>
        <br/>
        <Card>
            <Card.Body className={'p-20'}>
                <Row>
                    
                    <Col xs={12}>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Id. Transacción</th>
                                    <th>Descripción</th>
                                    <th>Fecha</th>
                                    <th>Monto</th>
                                    <th>Id. Asiento</th>
                                   
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    displayTable && entradasDeDocumento.map(option => {
                                        return (
                                            <tr key={option.id}>
                                                <td> 4 </td>
                                                <td> Cuenta Corriente Banco x  </td> 
                                                <td>{ moment(option.fechaDocumento).format('LL') }</td>
                                                <td>{option.monto}</td>
                                                <td> NULL </td>
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


export default AccountingTable;