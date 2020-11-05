import React, { useState, useEffect, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { SetUser } from "redux/actions/userActions";
import { post, get, put } from 'services';
let yup = require('yup');


const marginRightBtn = {
    marginRight: 10
}

const ConceptoPagoForm = ({ user, id, action, onHandleChange }) => {
    const [exampleOptionsArray, setExampleOptionsArray] = useState([]);
    const [loadForm, setLoadForm] = useState(false);
    const [formContent, setFormContent] = useState({});
    const [formikSchema, setFormikSchema] = useState({});
    const [basicSchema, setBasicSchema] = useState({
        estado: yup.string().required("El campo es requerido"),
        descripcion: yup.string().required("El campo es requerido"),
    });
    const formRef = useRef();

    useEffect(() => {

        setExampleOptionsArray(() => {
            return [{ value: 'Pendiente', label: 'Pendiente' }, { value: 'Pagado', label: 'Pagado' }]
        });
        
        updateFormik(basicSchema);

        if (action === 'editar') {
            get('ConceptosDePago/' + id).then((response) => {
                setFormContent(() => {
                    return {
                        estado: response.data.data[0].estado,
                        descripcion: response.data.data[0].descripcion,
                    }
                });
            })
        } else {
            setFormContent(() => {
                return {
                    estado: 'Pendiente',
                    descripcion: '',
                }
            });
        }

        setLoadForm(true);
    }, [])

    const updateFormik = (schema) => setFormikSchema(() => {
        return yup.object(schema);
    });

    const onFormSubmitted = async (form) => {
        if (action === 'editar') {
            form = {
                id,
                ...form,
            }
           await put('ConceptosDePago', form);
        } else {
            await post('ConceptosDePago', form);
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
                                                {/* First row */}

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

                                                <Form.Group as={Col} md="12" controlId="exampleForm.ControlTextarea1">
                                                    <Form.Label>Descripción</Form.Label>
                                                    <Form.Control
                                                        placeholder="Ingrese la descripción aquí"
                                                        name="descripcion"
                                                        value={values.descripcion}
                                                        onChange={handleChange}
                                                        isValid={touched.descripcion && !errors.descripcion}
                                                        isInvalid={!!errors.descripcion}
                                                        as="textarea"
                                                        rows={3} />

                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.descripcion}
                                                    </Form.Control.Feedback>
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
    mapDispatchToProps)(ConceptoPagoForm);