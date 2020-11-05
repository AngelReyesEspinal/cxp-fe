import React from 'react';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const days = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];
const locale = {
    localize: {
        month: n => months[n],
        day: n => days[n]
    },
    formatLong: {}
};

const BaseDatePicker = ({format = 'dd/MM/yyyy', values, name, setFieldValue}) => (
    <>
    <br/>
    <DatePicker 
        locale={locale}
        selected={values[name]}
        dateFormat={format}
        className="form-control"
        placeholderText={'Seleccione una fecha'}
        name={name}
        onChange={date => setFieldValue(name, date)}
    />
    </>
) 

export default BaseDatePicker;