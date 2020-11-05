import React from 'react'
import Alert from 'react-bootstrap/Alert';

const WarningNotiifcation = ({message = 'No ha agregado datos', enphasis = ''}) => (
    <Alert variant={'warning'}>
        { message } <strong> {enphasis } </strong>
    </Alert>
)

export default WarningNotiifcation;
