import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { Formik } from 'formik';
import { isBrowser } from "react-device-detect";
import { NavLink } from 'react-router-dom';
import { post } from 'services';
import { connect } from 'react-redux';
import { SetUser } from "redux/actions/userActions";
import { SetLoggedIn } from "redux/actions/isLoggedInActions";
import { SetLoading } from "redux/actions/loadingActions";
import { useHistory } from "react-router";
let yup = require('yup');

const logoStyle = {
    marginBottom: 10
}

const customLogo = {
    ...logoStyle,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25
}

const minWidth = {
    minWidth: 1000,
    maxWidth: 1000
}

const Register = (props) => {
    const history = useHistory();
    const schema = yup.object({
        userName: yup.string().required('El usuario es requerido'),
        password: yup.string().required('La contraseña es requerida'),
        name: yup.string().required('El nombre es requerida'),
    });

    const onSumitted = async (data) => {
        const user = {
            nombre: data.name,
            nombreDeUsuario: data.userName,
            contrasena: encodeURIComponent(data.password),
        };
        const response = await post('Usuarios', user);
        props.SetUser(response.data.data[0]);
        localStorage.setItem('currentUser', JSON.stringify(response.data.data[0]));
        props.SetLoggedIn(true);
        history.push({
            pathname: "/",
            state: {
                response: null
            }
        });
    }

    return (
        <div className="display-flex flex-center center-vertical flex-direction-column height-100 login-background">
            <div>

                <div className={'display-flex flex-end'}>
                    <span style={customLogo}>
                        REGISTRATE CON NOSTROS!
                    </span>
                </div>

                <Card>
                    <Card.Body style={isBrowser ? minWidth : null} className={'p-30'}>
                        <Formik
                            validationSchema={schema}
                            onSubmit={onSumitted}
                            initialValues={{
                                userName: '',
                                password: '',
                                name: '',
                            }}
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

                                            <Form.Group as={Col} md="12" controlId="validationFormik012">
                                                <Form.Label> <strong> Nombre </strong> </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="name"
                                                    value={values.name}
                                                    onChange={handleChange}
                                                    isValid={touched.name && !errors.name}
                                                    isInvalid={!!errors.name}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.name}
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                            <Form.Group as={Col} md="6" controlId="validationFormik013">
                                                <Form.Label> <strong> Usuario </strong> </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="userName"
                                                    value={values.userName}
                                                    onChange={handleChange}
                                                    isValid={touched.userName && !errors.userName}
                                                    isInvalid={!!errors.userName}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.userName}
                                                </Form.Control.Feedback>
                                            </Form.Group>



                                            <Form.Group as={Col} md="6" controlId="validationFormik02">
                                                <Form.Label> <strong> Contraseña </strong> </Form.Label>
                                                <Form.Control
                                                    className="is-password"
                                                    type="text"
                                                    name="password"
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    isValid={touched.password && !errors.password}
                                                    isInvalid={!!errors.password}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.password}
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                        </Form.Row>

                                        <div className={isBrowser ? 'display-flex space-between' : 'display-flex flex-direction-column center-vertical'}>
                                            <div style={!isBrowser ? logoStyle : null} className={'display-flex flex-end-vertical'}>
                                                <NavLink
                                                    to="/login"
                                                    exact
                                                >
                                                    Volver al login
                                                </NavLink>
                                            </div>
                                            <Button variant={'success'} type="submit"><strong>  Registrarme </strong> </Button>
                                        </div>

                                    </Form>
                                )}
                        </Formik>
                    </Card.Body>
                </Card>

            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        SetUser: (user) => dispatch(SetUser(user)),
        SetLoggedIn: (value) => dispatch(SetLoggedIn(value)),
        SetLoading: (value) => dispatch(SetLoading(value)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps)(Register);