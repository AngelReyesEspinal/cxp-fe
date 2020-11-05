import React from 'react';
import Form from 'react-bootstrap/Form';

const RequiredMessage = ({message = 'Campo es requerido'}) => {
    return(
        <Form.Control.Feedback type="invalid">
            { message }
        </Form.Control.Feedback>
    );
}

export default RequiredMessage;