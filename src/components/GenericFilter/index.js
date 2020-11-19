import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { get, post } from 'services';
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

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

const GenericFilter = ({ filterByBalance = false, filterByDates = false, endpoint = '', setData }) => {
    const [balance, setBalance] = useState('');
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const onFilter = () => {

        let url = `${endpoint}/filter`
        let data = {}

        if (filterByBalance && balance) {
            data = {
                balance: parseFloat(balance)
            }
        }

        if (filterByDates && (startDate && endDate)) {
            url = `${endpoint}/filter?fechaInicio=${startDate}&fechaFin=${endDate}`
        }

        post(url, data).then(response => {
            setData(response.data.data)
        });
    }

    const onClear = () => {
        get(endpoint).then(response => {
            setData(response.data.data)
        });
        setBalance('');
        setStartDate();
        setEndDate();
    }

    return (
        <Card>
            <Card.Body className={'p-20'}>
                <Form.Row>
                    {
                        filterByBalance &&
                        <Form.Group as={Col} md="3" controlId={"validationwageAspiratio212"}>
                            <Form.Label>Balance</Form.Label>
                            <Form.Control
                                type="text"
                                name="balance"
                                value={balance}
                                onChange={e => setBalance(e.target.value)}
                            />
                        </Form.Group>
                    }
                    {
                        filterByDates &&
                        <>
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
                        </>
                    }
                    <Form.Group as={Col} md={filterByBalance ? "3" : "6"} controlId="validationFormik11">
                        <div className="display-flex flex-end">
                            <Button style={mr} variant="primary" onClick={onClear}>  <i className="fa fa-broom"></i></Button>
                            <Button style={mtHere} variant="primary" onClick={onFilter}> <i className="fa fa-search"></i></Button>
                        </div>
                    </Form.Group>
                </Form.Row>

            </Card.Body>
        </Card>
    )

}

export default GenericFilter;