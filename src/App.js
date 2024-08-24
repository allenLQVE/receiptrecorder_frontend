import React, { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';

import { RecordTable } from './components/RecordTable';
import { RecordModal } from './components/RecordModal';
import { RecordProvider } from './context/RecordContext';
import { Button } from 'reactstrap';

function App() {
    // data from api
    const [records, setRecords] = useState();
    const [items, setItems] = useState();
    const [stores, setStores] = useState();

    // Modal for creating/editing record
    const [recordModal, setRecordModal] = useState(false);
    const [isCreate, setIsCreate] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8000/api/records/').then(
            response => {
                setRecords(response.data);
            }
        ).catch(error => {
            console.error(error);
        })
        axios.get('http://localhost:8000/api/items/').then(
            response => {
                setItems(response.data);
            }
        ).catch(error => {
            console.error(error);
        })
        axios.get('http://localhost:8000/api/stores/').then(
            response => {
                setStores(response.data);
            }
        ).catch(error => {
            console.error(error);
        })
    }, [])

    const toggle = () => setRecordModal(!recordModal);

    const openRecordModal = (create) => {
        setIsCreate(create)
        toggle();
    }

    return (
        <RecordProvider>
            <div className='container'>
                <div className='records'>
                    <div className='container'>
                        <div className="row mt-2">
                            <div className='col-11'>
                                <h1>Records</h1>
                            </div>
                            <div className='col-1'>
                                <Button color="primary" className="mt-2" onClick={() => {toggle(); setIsCreate(true)}}>Create</Button>
                            </div>
                        </div>
                        <div className="row">
                            {records ? <RecordTable records={records} setRecords={setRecords} openRecordModal={openRecordModal}/> : null}
                        </div>
                    </div>
                </div>
                {(items && stores) ? (
                    <RecordModal itemList={items} storeList={stores} isOpen={recordModal} toggle={toggle} setRecords={setRecords} isCreate={isCreate}/>
                ): null}
                
            </div>
        </RecordProvider>
    );
}

export default App;