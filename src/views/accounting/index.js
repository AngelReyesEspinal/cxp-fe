import React, { useState } from 'react';
import AccountingTable from 'components/Cards/AccountingTable';
import ToggleDetail from 'components/ToggleDetail';
import { isBrowser } from "react-device-detect";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { SetUser } from "redux/actions/userActions";

const modulePadding =  isBrowser ? '' : '';

const AccountingModule = (props) => {
  const [showDetail, setShowDetail] = useState(true);
  const [action, setAction] = useState('');
  const [id, setId] = useState(0);

  const onHandleChange = (id, action, detail) => {
    setId(id);
    setAction(action);
    setShowDetail(detail);
  }

  return  props.isLoggedIn  
    ? 
    (
      <div className={modulePadding}>
        <ToggleDetail onToggleDetail={setShowDetail} label="Contabilidad"/>
        { 
          showDetail && <AccountingTable onHandleChange={onHandleChange}/>
        }
      </div>
    )
    : <Redirect to='login'/>
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    SetUser: (user) => dispatch(SetUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountingModule);