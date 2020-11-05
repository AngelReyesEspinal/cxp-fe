const React = require('react');
const Swal = require('sweetalert2');
require('./image.scss');
const FourMB = 4e+6;

class Upload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null
        };
        this.handleChange = this.handleChange.bind(this);
    }

    operationNotAllowed () {
        Swal.fire({
            icon: 'warning',
            title: '¡Atención!',
            text: '¡La imagen no puede exceder los 4 MB!'
        });
    }

    handleChange(event) {
        if (event.target.files[0].size <= FourMB) {
            this.setState({
                file: URL.createObjectURL(event.target.files[0])
            })
            this.props.onFileChange(event.target.files[0]);
        } else {
            this.operationNotAllowed();
        }
    }

    render() {
        return (
            <div>
                { this.state.file && <img width="300" alt="me" src={this.state.file} /> }
                <div>
                    <label className={'upload-photo-image center-vertical display-flex'} htmlFor="upload-photo">
                        <span className={'upload-photo-image-label'}>
                            Seleccionar una foto
                        </span>
                    </label>
                    <p> Elegir foto de perfil (Máximo 4 MB) </p>
                    <input id="upload-photo" type="file" onChange={this.handleChange} />
                </div>
            </div>
        );
    }
}
module.exports = Upload