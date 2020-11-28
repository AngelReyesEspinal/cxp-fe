import React, { useState } from 'react';
import AccountingTable from 'components/Cards/AccountingTable';
import ToggleDetail from 'components/ToggleDetail';
import { isBrowser } from "react-device-detect";

const modulePadding =  isBrowser ? '' : '';

const AccountingModule = () => {
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
      <ToggleDetail onToggleDetail={setShowDetail} label="Contabilidad"/>
      { 
        showDetail && <AccountingTable onHandleChange={onHandleChange}/>
      }
    </div>
  )
}

export default (AccountingModule);