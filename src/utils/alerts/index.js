const Swal = require('sweetalert2');

const operationSuccess = (title = '¡Excelente!', message = '¡Se ha realizado la operación con éxito!') => {
    Swal.fire(
        title,
        message,
        'success'
    )
}

const operationNotAllowed = (title = '¡Atención!', message = '¡Operación no permitida!') => {
    Swal.fire({
        icon: 'warning',
        title: title,
        text: message
    })
}


export default { operationSuccess, operationNotAllowed };