import React, { useState, useEffect, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { SetUser } from "redux/actions/userActions";
import { post, get, put } from 'services';
import BaseDatePicker from 'components/BaseDatePicker';
import CurrencyInput from 'react-currency-input';
let yup = require('yup');


const marginRightBtn = {
    marginRight: 10
}

const width100 = {
    width: '100%'
}

const DocumentEntryForm = ({ user, id, action, onHandleChange }) => {
    const [exampleOptionsArray, setExampleOptionsArray] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [loadForm, setLoadForm] = useState(false);
    const [formContent, setFormContent] = useState({});
    const [formikSchema, setFormikSchema] = useState({});
    const [basicSchema, setBasicSchema] = useState({
        estado: yup.string().required("El campo es requerido"),
        proveedorId: yup.number().required("El campo es requerido"),
        numeroDocumento: yup.number('Debe ser un número').required("El campo es requerido"),
        numeroFactura: yup.number('Debe ser un número').required("El campo es requerido"),
        fechaDocumento: yup.date().required("El campo es requerido"),
        monto: yup.string().required("El campo es requerido"),
    });
    const formRef = useRef();

    useEffect(() => {

        setExampleOptionsArray(() => {
            return [{ value: 'Pendiente', label: 'Pendiente' }, { value: 'Pagado', label: 'Pagado' }]
        });
        
        updateFormik(basicSchema);

        get('Proveedores').then(response => {
            const proveedorId = response.data.data[0].id
            setProveedores(response.data.data)

            if (action === 'editar') {
                get('EntradasDeDocumento/' + id).then((response) => {
                    setFormContent(() => {
                        return {
                            estado: response.data.data[0].estado,
                            proveedorId: response.data.data[0].proveedorId,
                            numeroDocumento: response.data.data[0].numeroDocumento,
                            numeroFactura: response.data.data[0].numeroFactura,
                            fechaDocumento: new Date(response.data.data[0].fechaDocumento),
                            monto: response.data.data[0].monto
                        }
                    });
                })
            } else {
                setFormContent(() => {
                    return {
                        estado: 'Pendiente',
                        proveedorId: proveedorId,
                        numeroDocumento: '',
                        numeroFactura: '',
                        fechaDocumento: new Date(),
                        monto: ''
                    }
                });
            }
        });

        

        setLoadForm(true);
    }, [])

    const updateFormik = (schema) => setFormikSchema(() => {
        return yup.object(schema);
    });

    const onFormSubmitted = async (form) => {
        form = {
            ...form,
            monto: parseFloat(String(form.monto).replaceAll(',', '')),
        }
        if (action === 'editar') {
            form = {
                id,
                ...form,
            }
           await put('EntradasDeDocumento', form);
        } else {
            await post('EntradasDeDocumento', form);
        }
        onHandleChange(0, '', true);
    };

    return (
        <div>
            <Card>
                <Card.Body className={'p-20'}>
                    {
                        loadForm &&
                        <div>
                            <Formik
                                innerRef={formRef}
                                validationSchema={formikSchema}
                                onSubmit={onFormSubmitted}
                                initialValues={formContent}
                                enableReinitialize={true}
                            >
                                {({
                                    handleSubmit,
                                    handleChange,
                                    handleBlur,
                                    values,
                                    touched,
                                    isValid,
                                    errors,
                                    setFieldValue
                                }) => (
                                        <Form noValidate onSubmit={handleSubmit}>

                                            <Form.Row>

                                                <Form.Group as={Col} md="3" controlId="validationFormik04">
                                                    <Form.Label>Número Documento</Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        name="numeroDocumento"
                                                        placeholder="Requerido*"
                                                        value={values.numeroDocumento}
                                                        onChange={handleChange}
                                                        isValid={touched.numeroDocumento && !errors.numeroDocumento}
                                                        isInvalid={!!errors.numeroDocumento}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.numeroDocumento}
                                                    </Form.Control.Feedback>
                                                </Form.Group>

                                                <Form.Group as={Col} md="3" controlId="validationFormik04">
                                                    <Form.Label>Número Factura</Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        name="numeroFactura"
                                                        placeholder="Requerido*"
                                                        value={values.numeroFactura}
                                                        onChange={handleChange}
                                                        isValid={touched.numeroFactura && !errors.numeroFactura}
                                                        isInvalid={!!errors.numeroFactura}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.numeroFactura}
                                                    </Form.Control.Feedback>
                                                </Form.Group>

                                                <Form.Group as={Col} md="6" controlId="validationFormik01">
                                                    <Form.Label> Proveedor </Form.Label>
                                                    <Form.Control
                                                        name="proveedorId"
                                                        value={values.proveedorId}
                                                        onChange={handleChange}
                                                        as="select"
                                                        custom
                                                        isValid={touched.proveedorId && !errors.proveedorId}
                                                        isInvalid={!!errors.proveedorId}
                                                    >
                                                        {
                                                            proveedores.map(option => {
                                                                return (
                                                                    <option key={option.id} value={option.id}>{option.nombre}</option>
                                                                )
                                                            })
                                                        }
                                                    </Form.Control>
                                                </Form.Group>
                                                
                                                <Form.Group as={Col} md="3" controlId="validationFormik11">
                                                    <Form.Label> Fecha documento </Form.Label>
                                                    <BaseDatePicker
                                                        style={width100}
                                                        name="fechaDocumento"
                                                        values={values}
                                                        setFieldValue={setFieldValue}
                                                    />
                                                </Form.Group>

                                                <Form.Group as={Col} md="6" controlId={"validationwageAspiratio212"}>
                                                    <Form.Label>Monto</Form.Label>
                                                    <Form.Control
                                                        as={CurrencyInput}
                                                        type="text"
                                                        name={`monto`}
                                                        placeholder="RD$0.00"
                                                        value={values[`monto`]}
                                                        onChange={d => setFieldValue(`monto`, d)}
                                                        isValid={touched[`monto`] && !errors[`monto`]}
                                                        isInvalid={!!errors[`monto`]}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors[`monto`]}
                                                    </Form.Control.Feedback>
                                                </Form.Group>

                                                <Form.Group as={Col} md="3" controlId="validationFormik01">
                                                    <Form.Label> Estado </Form.Label>
                                                    <Form.Control
                                                        name="estado"
                                                        value={values.estado}
                                                        onChange={handleChange}
                                                        as="select"
                                                        custom
                                                        isValid={touched.estado && !errors.estado}
                                                        isInvalid={!!errors.estado}
                                                    >
                                                        {
                                                            exampleOptionsArray.map(option => {
                                                                return (
                                                                    <option key={option.value} value={option.value}>{option.label}</option>
                                                                )
                                                            })
                                                        }
                                                    </Form.Control>
                                                </Form.Group>
                                                
                                            </Form.Row>

                                            <Form.Group className={'display-flex flex-end p-r-0'} as={Col} md="12">
                                                <Button style={marginRightBtn} variant="warning" onClick={() => { onHandleChange(0, '', true) }}> Cancelar </Button>
                                                <Button type="submit"> {action === 'agregar'? 'Guardar' : 'Editar'} </Button>
                                            </Form.Group>
                                        </Form>
                                    )}
                            </Formik>
                        </div>
                    }
                </Card.Body>
            </Card>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        SetUser: (user) => dispatch(SetUser(user))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps)(DocumentEntryForm);