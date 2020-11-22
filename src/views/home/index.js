import React, { useState } from 'react';
import ConceptoPagoTable from 'components/Cards/ConceptoPagoTable';
import ConceptoPagoForm from 'components/Forms/ConceptoPagoForm';
import ToggleDetail from 'components/ToggleDetail';
import { isBrowser } from "react-device-detect";

const modulePadding =  isBrowser ? '' : '';

const HomeModule = (props) => {
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
        <ToggleDetail onToggleDetail={setShowDetail} label="Conceptos de pago"/>
        { 
          showDetail ? 
          <div> 
            <ConceptoPagoTable onHandleChange={onHandleChange}/>
          </div>
          : 
          <div> 
            <ConceptoPagoForm id={id} action={action} onHandleChange={onHandleChange} />
          </div>
        }
      </div>
    )
}

export default (HomeModule);