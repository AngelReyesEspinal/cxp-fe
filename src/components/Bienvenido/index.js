import React from 'react';
import { connect } from 'react-redux';
import Utils from '../../utils';

const Bienvenido = (props) => {
  let today = new Date();
  return (
    <div>
      <p > ¡Buenos días { props.user.nombre }! { Utils.Helpers.convertDate(today) } </p>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Bienvenido);
