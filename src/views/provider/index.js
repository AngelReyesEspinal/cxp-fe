import React, { useState } from 'react';
import ProveedorTable from 'components/Cards/ProveedorTable';
import ProveedorForm from 'components/Forms/ProveedorForm';
import ToggleDetail from 'components/ToggleDetail';
import { isBrowser } from "react-device-detect";

const modulePadding =  isBrowser ? '' : '';

const ProviderModule = (props) => {
  const [showDetail, setShowDetail] = useState(true);
  const [action, setAction] = useState('');
  const [id, setId] = useState(0);

  const onHandleChange = (id, action, detail) => {
    setId(id);
    setAction(action);
    setShowDetail(detail);
  }

  return  (
    <div className={modulePadding}>
      <ToggleDetail onToggleDetail={setShowDetail} label="Proveedores"/>
      { 
        showDetail ? 
        <div> 
          <ProveedorTable onHandleChange={onHandleChange}/>
        </div>
        : 
        <div> 
          <ProveedorForm id={id} action={action} onHandleChange={onHandleChange} />
        </div>
      }
    </div>
  )
}

export default (ProviderModule);