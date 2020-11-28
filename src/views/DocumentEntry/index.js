import React, { useState } from 'react';
import DocumentEntryTable from 'components/Cards/DocumentEntryTable';
import DocumentEntryForm from 'components/Forms/DocumentEntryForm';
import ToggleDetail from 'components/ToggleDetail';
import { isBrowser } from "react-device-detect";

const modulePadding =  isBrowser ? '' : '';

const DocumentEntryModule = (props) => {
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
}


export default (DocumentEntryModule);