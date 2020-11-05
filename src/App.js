import React from 'react';
import '@fortawesome/fontawesome-free/js/all.js';
import './assets/scss/custom.scss'
import './App.css';
import Layout from 'layout';
import Router from 'router';
import { connect } from 'react-redux';

const App = (props) => {
  return (
    <>
      {
        props.isLoggedIn 
        ? <Layout/> 
        : <Router/>
      }
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn
  }
}

export default connect(mapStateToProps)(App);