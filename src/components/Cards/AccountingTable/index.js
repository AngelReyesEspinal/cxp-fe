import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { get, post, put, corsContabilidadPost } from 'services';
import moment from 'moment';
import GenericFilter from "components/GenericFilter";
import loading from 'redux/reducers/loadingReducer';
import { SetLoading } from "redux/actions/loadingActions";
import { connect } from 'react-redux';
const Swal = require('sweetalert2');

const AccountingTable = ({SetLoading}) => {
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
        //SetLoading(true);
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
            moneda: 'DOP',
            asientos: [
                {
                    idCuenta: 21,
                    monto: totalAmount
                },
                {
                    idCuenta: 4,
                    monto: totalAmount
                }
            ]
        }
        const regex = /(\d+)/g;
        const result = await corsContabilidadPost(dto);
        //SetLoading(false);
        if (result.data) {
            entradasDeDocumento.forEach(async (entradaDocumento) => {
                entradaDocumento.idAsiento = Number(result.data.match(regex).join(''))
                entradaDocumento.estado = 'Pagado'
                await put('EntradasDeDocumento', entradaDocumento)
                setDisplayTable(false)
                getData()
            })
            Swal.fire(
                'Muy bien',
                'Se han actualizado las entradas de documentos con el idAsiento: '+ Number(result.data.match(regex).join('')),
                'success'
            )
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
                                                <td> {'Asiento de CxP correspondiente al periodo ' + new Date().getFullYear() +' - '+ new Date().getMonth()}  </td> 
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


const mapDispatchToProps = (dispatch) => {
    return {
        SetLoading: (value) => dispatch(SetLoading(value))
    }
}

export default connect(
    null,
    mapDispatchToProps)(AccountingTable);
