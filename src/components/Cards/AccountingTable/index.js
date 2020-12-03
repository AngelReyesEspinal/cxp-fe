import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { get, post, put, contabilidadPost } from 'services';
import moment from 'moment';
import GenericFilter from "components/GenericFilter";
import loading from 'redux/reducers/loadingReducer';

const AccountingTable = () => {
    const [entradasDeDocumento, setEntradasDeDocumento] = useState([]);
    const [displayTable, setDisplayTable] = useState(false);

    useEffect(() => {
        getData()
    }, []);

    const getData = () => {
        let url = `EntradasDeDocumento/filter`
        let data = {
            idAsiento: null
        }
        post(url, data).then(response => {
            setEntradasDeDocumento(response.data.data)
            setDisplayTable(true)
        });
    }

    const onCount = async () => {
        let totalAmount = 0;
        const currentDate = new Date()
        entradasDeDocumento.forEach(entradaDocumento => {
            totalAmount += entradaDocumento.monto
        });
        const dto = {
            descripcion: 'Asiento de CxP correspondiente al periodo '+ currentDate.getFullYear() +'-'+ currentDate.getMonth(),
            idCuentaAuxiliar: 6,
            inicioPeriodo: new Date(),
            finPeriodo: new Date(),
            asientos: [
                {
                    idCuenta: 82,
                    monto: totalAmount
                },
                {
                    idCuenta: 4,
                    monto: totalAmount
                }
            ]
        }
        console.log(dto)
        const result = await contabilidadPost(dto);
        console.log('respuesta de contabilidad below:')
        console.log(result)
        if (result.data) {
            entradasDeDocumento.forEach(async (entradaDocumento) => {
                entradaDocumento.idAsiento = result.data
                entradaDocumento.estado = 'Pagado'
                await put('EntradasDeDocumento', entradaDocumento)
                setDisplayTable(false)
                getData()
            })
        }
    }
    
    return (
        <>
        <GenericFilter filterByIdAsiento={true} filterByDates={true} endpoint={'EntradasDeDocumento'} setData={setEntradasDeDocumento}/>
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

                    <Col xs={12}>
                        <div className="display-flex flex-end">
                            <Button  variant="primary" onClick={onCount}>  <i className="fas fa-calculator"></i></Button>
                        </div>
                    </Col>
                </Row>

            </Card.Body>
        </Card>
        </>
    );
};


export default AccountingTable;