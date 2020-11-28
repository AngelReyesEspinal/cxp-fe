import React, { useRef } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { Formik } from 'formik';
import { isBrowser } from "react-device-detect";
import { NavLink } from 'react-router-dom';
import { post } from 'services';
import { useHistory } from "react-router";
import { connect } from 'react-redux';
import { SetUser } from "redux/actions/userActions";
import { SetLoggedIn } from "redux/actions/isLoggedInActions";

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

const registerWidth = {
  width: '100%'
}

const colorWelcome = {
  color: '#0262AB'
}

const Login = (props) => {
  const history = useHistory();
  const reRef = useRef();

  const schema = yup.object({
    userName: yup.string().required('El usuario es requerido'),
    password: yup.string().required('La contraseña es requerida')
  });

  const onSumitted = async (data) => {
    const user = {
      nombreDeUsuario: data.userName,
      contrasena: encodeURIComponent(data.password),
    };

    const response = await post(`Usuarios/login`, user);
    if (response.data.data[0]) {
      props.SetUser(response.data.data[0]);
      localStorage.setItem('currentUser', JSON.stringify(response.data.data[0]));
      props.SetLoggedIn(true);
      history.push({
          pathname: "/",
          state: {
              response: null
          }
      });
    } else {
      alert(' Valide sus credenciales ');
    }
  }

  return (
    <div className="display-flex flex-center center-vertical flex-direction-column height-100 login-background">
      <div className={'padding-10'}>

        <div className={'display-flex flex-end'}>
          <span style={customLogo}>
            CUENTAS POR PAGAR
          </span>

        </div>

        <Card>
          <Card.Body className={'p-30'}>
            <Formik
              validationSchema={schema}
              onSubmit={onSumitted}
              initialValues={{
                userName: '',
                password: '',
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
              }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <Form.Row>

                      <Form.Group as={Col} md="12" controlId="validationFormik01">
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

                      <Form.Group as={Col} md="12" controlId="validationFormik02">
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
                      <div style={!isBrowser ? logoStyle : colorWelcome} className={'display-flex flex-end-vertical'}>
                        ¡Bienvenido!
                      </div>
                      <Button type="submit"><strong>  Iniciar sesión </strong> </Button>
                    </div>

                    <hr />

                    <NavLink
                      to="/register"
                      style={registerWidth}
                    >
                      <Button variant="success" style={registerWidth}> <strong> Registrarme </strong> </Button>
                    </NavLink>

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
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    SetUser: (user) => dispatch(SetUser(user)),
    SetLoggedIn: (value) => dispatch(SetLoggedIn(value)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Login);