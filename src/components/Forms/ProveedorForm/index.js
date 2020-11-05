import React, { useState, useEffect, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { SetUser } from "redux/actions/userActions";
import { post, get, put } from 'services';
import InputMask from "react-input-mask";
import CurrencyInput from 'react-currency-input';
let yup = require('yup');

const marginRightBtn = {
    marginRight: 10
}

const ProveedorForm = ({ user, id, action, onHandleChange }) => {
    const [exampleOptionsArray, setExampleOptionsArray] = useState([{ value: 'Pendiente', label: 'Pendiente' }, { value: 'Pagado', label: 'Pagado' }]);
    const [tipoPersona, setIipoPersona] = useState([{ value: 'Física', label: 'Física' }, { value: 'Jurídica', label: 'Jurídica' }]);
    const [tipoDocumento, setTipoDocumento] = useState([{ value: 'Cédula', label: 'Cédula' }, { value: 'RNC', label: 'RNC' }]);
    const [loadForm, setLoadForm] = useState(false);
    const [formContent, setFormContent] = useState({});
    const [formikSchema, setFormikSchema] = useState({});
    const [basicSchema, setBasicSchema] = useState({
        nombre: yup.string().required("El campo es requerido"),
        documento: yup.string().required("El campo es requerido"),
        tipoPersona: yup.string().required("El campo es requerido"),
        estado: yup.string().required("El campo es requerido"),
        tipoDocumento: yup.string().required("El campo es requerido"),
        balance: yup.string().required("El campo es requerido"),
    });
    const formRef = useRef();

    useEffect(() => {

        updateFormik(basicSchema);

        if (action === 'editar') {
            get('Proveedores/' + id).then((response) => {
                
                setFormContent(() => {
                    return {
                        nombre: response.data.data[0].nombre,
                        estado: response.data.data[0].estado,
                        tipoPersona: response.data.data[0].tipoPersona,
                        documento: response.data.data[0].documento,
                        tipoDocumento: response.data.data[0].tipoDocumento,
                        balance: String(response.data.data[0].balance),
                    }
                });
            })
        } else {
            setFormContent(() => {
                return {
                    nombre: '',
                    estado: 'Pendiente',
                    tipoPersona: 'Física',
                    documento:'',
                    tipoDocumento: 'Cédula',
                    balance:''
                }
            });
        }

        setLoadForm(true);
    }, [])

    const updateFormik = (schema) => setFormikSchema(() => {
        return yup.object(schema);
    });

    const onFormSubmitted = async (form) => {
        form = {
            ...form,
            balance: parseFloat(form.balance.replaceAll(',', '')),
        }
        if (action === 'editar') {
            form = {
                id,
                ...form
            }
            await put('Proveedores', form);
        } else {
            await post('Proveedores', form);
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
                                                
                                            <Form.Group as={Col} md="6" controlId="validationFormik01">
                                                    <Form.Label> Tipo de persona </Form.Label>
                                                    <Form.Control
                                                        name="tipoPersona"
                                                        value={values.tipoPersona}
                                                        onChange={handleChange}
                                                        as="select"
                                                        custom
                                                        isValid={touched.tipoPersona && !errors.tipoPersona}
                                                        isInvalid={!!errors.tipoPersona}
                                                    >
                                                        {
                                                            tipoPersona.map(option => {
                                                                return (
                                                                    <option key={option.value} value={option.value}>{option.label}</option>
                                                                )
                                                            })
                                                        }
                                                    </Form.Control>
                                                </Form.Group>

                                                <Form.Group as={Col} md="6" controlId="validationFormik04">
                                                    <Form.Label>Nombre</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="nombre"
                                                        placeholder="Requerido*"
                                                        value={values.nombre}
                                                        onChange={handleChange}
                                                        isValid={touched.nombre && !errors.nombre}
                                                        isInvalid={!!errors.nombre}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.nombre}
                                                    </Form.Control.Feedback>
                                                </Form.Group>

                                               
                                                <Form.Group as={Col} md="6" controlId="validationFormik01">
                                                    <Form.Label> Tipo documento </Form.Label>
                                                    <Form.Control
                                                        name="tipoDocumento"
                                                        value={values.tipoDocumento}
                                                        onChange={handleChange}
                                                        as="select"
                                                        custom
                                                        isValid={touched.tipoDocumento && !errors.tipoDocumento}
                                                        isInvalid={!!errors.tipoDocumento}
                                                    >
                                                        {
                                                            tipoDocumento.map(option => {
                                                                return (
                                                                    <option key={option.value} value={option.value}>{option.label}</option>
                                                                )
                                                            })
                                                        }
                                                    </Form.Control>
                                                </Form.Group>

                                                <Form.Group as={Col} md="6" controlId="validationFormik04">
                                                    <Form.Label>Documento</Form.Label>
                                                    { 
                                                        values.tipoDocumento == 'Cédula' 
                                                        ? 
                                                        <Form.Control
                                                            type="text"
                                                            name="documento"
                                                            as={InputMask}
                                                            mask="999-9999999-9"
                                                            placeholder="Requerido*"
                                                            value={values.documento}
                                                            onChange={handleChange}
                                                            isValid={touched.documento && !errors.documento}
                                                            isInvalid={!!errors.documento}
                                                        />
                                                        : 
                                                        <Form.Control
                                                            type="text"
                                                            name="documento"
                                                            placeholder="Requerido*"
                                                            value={values.documento}
                                                            onChange={handleChange}
                                                            isValid={touched.documento && !errors.documento}
                                                            isInvalid={!!errors.documento}
                                                        />
                                                    }
                                                    
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.nombre}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                                

                                                <Form.Group as={Col} md="6" controlId={"validationwageAspiratio212"}>
                                                    <Form.Label>Balance</Form.Label>
                                                    <Form.Control
                                                        as={CurrencyInput}
                                                        type="text"
                                                        name={`balance`}
                                                        placeholder="RD$0.00"
                                                        value={values[`balance`]}
                                                        onChange={d => setFieldValue(`balance`, d)}
                                                        isValid={touched[`balance`] && !errors[`balance`]}
                                                        isInvalid={!!errors[`balance`]}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors[`balance`]}
                                                    </Form.Control.Feedback>
                                                </Form.Group>

                                                <Form.Group as={Col} md="6" controlId="validationFormik01">
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
                                                <Button type="submit"> {action === 'agregar' ? 'Guardar' : 'Editar'} </Button>
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
    mapDispatchToProps)(ProveedorForm);