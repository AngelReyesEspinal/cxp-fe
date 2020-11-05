import React, { useEffect, useState } from 'react';
import DocumentEntryTable from 'components/Cards/DocumentEntryTable';
import DocumentEntryForm from 'components/Forms/DocumentEntryForm';
import ToggleDetail from 'components/ToggleDetail';
import { isBrowser } from "react-device-detect";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { SetUser } from "redux/actions/userActions";

const modulePadding =  isBrowser ? '' : '';

const DocumentEntryModule = (props) => {
  const [showDetail, setShowDetail] = useState(true);
  const [action, setAction] = useState('');
  const [id, setId] = useState(0);

  useEffect(() => {
    
  }, []);

  const onHandleChange = (id, action, detail) => {
    setId(id);
    setAction(action);
    setShowDetail(detail);
  }

  return  props.isLoggedIn  
    ? 
    (
      <div className={modulePadding}>
        <ToggleDetail onToggleDetail={setShowDetail} label="Entrada de documentos"/>
        { 
          showDetail ? 
          <div> 
            <DocumentEntryTable onHandleChange={onHandleChange}/>
          </div>
          : 
          <div> 
            <DocumentEntryForm id={id} action={action} onHandleChange={onHandleChange} />
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DocumentEntryModule);