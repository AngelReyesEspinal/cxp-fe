import React from 'react';
import Header from 'components/Header';
import Router from 'router';
import { isBrowser } from "react-device-detect";
import { NavLink } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { connect } from 'react-redux';
import './layout.scss';

const whiteWords = {
    color: "white"
}

const bold = {
    fontWeight: "bold"
}

const navLinkStyle = {
    ...whiteWords,
    textDecoration: 'none',
    fontSize: 13
}

const activeNavLinkStyle = {
    ...whiteWords,
    ...bold,
}

class Layout extends React.Component {

    state = {
        drawerPos: isBrowser ? 2 : 0
    };

    handleDrawer = () => {
        if (this.state.drawerPos < 2) {
            this.setState((state) => ({
                drawerPos: state.drawerPos + 2
            }));
        } else {
            this.setState({
                drawerPos: 0
            })
        }
    };

    render() {
        let drawerClass = [];
        let mainClass = [];
        if (this.state.drawerPos === 1) {
            drawerClass.push("drawerMin");
            mainClass.push("mainMin")
        } else if (this.state.drawerPos === 2) {
            if (isBrowser) {
                drawerClass.push("drawerOpen");
            } else {
                drawerClass.push("drawerOpenMobile");
            }
            mainClass.push("mainOpen");
        } else {
            drawerClass = [];
            mainClass = [];
        }
        return (
            <div className="App">
                <Header toggleSidebar={this.handleDrawer} />
                <aside className={drawerClass.join(" ")} >
                    <br/>
                    <ul>
                        <li>
                            <NavLink
                                to="/"
                                exact
                                style={navLinkStyle}
                                activeStyle={activeNavLinkStyle}
                            >
                                <i className="fa fa-receipt"></i> Conceptos de pago
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/providers"
                                exact
                                style={navLinkStyle}
                                activeStyle={activeNavLinkStyle}
                            >
                                <i className="fas fa-hands-helping"></i> Proveedores
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/documentEntryModule"
                                exact
                                style={navLinkStyle}
                                activeStyle={activeNavLinkStyle}
                            >
                                <i className="fa fa-file-pdf"></i> Entrada de documentos
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/accounting"
                                exact
                                style={navLinkStyle}
                                activeStyle={activeNavLinkStyle}
                            >
                                <i className="fa fa-coins"></i> Contabilidad
                            </NavLink>
                        </li>
                    </ul>
                </aside>
                <main className={mainClass.join(" ")}>
                    {
                        this.props.loading &&
                        <div className={'display-flex flex-direction-row flex-center'}>
                            <Spinner variant="primary" className={'is-absolute center-spinner-vertically'} animation="border" size="lg" />
                        </div>
                    }
                    <Router />
                </main>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading
    }
}

export default connect(mapStateToProps)(Layout);