import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { connect } from 'react-redux';
import { SetUser } from "redux/actions/userActions";
import { SetLoggedIn } from "redux/actions/isLoggedInActions";
import { useHistory } from "react-router";

const UserDropdown = (props) => {
    const history = useHistory();

    const LogOut = () => {
        localStorage.removeItem('currentUser');
        props.SetUser({});
        props.SetLoggedIn(false);
        history.push({
            pathname: "/login",
            state: {
                response: null
            }
        });
    }

    return (
        <DropdownButton
            alignRight
            title={
                <i className={'fa fa-user'}></i>
              }
            id="dropdown-menu-align-right"
        >
            <Dropdown.Item onClick={LogOut}>Salir</Dropdown.Item>
        </DropdownButton>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        SetUser: (user) => dispatch(SetUser(user)),
        SetLoggedIn: (value) => dispatch(SetLoggedIn(value))
    }
}

export default connect(null, mapDispatchToProps)(UserDropdown);