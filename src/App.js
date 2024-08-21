import React, { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';

import { RecordTable } from './components/RecordTable';
import { RecordModal } from './components/RecordModal';
import { Button, Container, Row, Col, } from 'reactstrap';

function App() {
    const [records, setRecords] = useState();
    const [items, setItems] = useState();
    const [stores, setStores] = useState();
    const [recordModal, setRecordModal] = useState(false);

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

    return (
        <Container>
            <div className='records'>
                <Container>
                    <Row className="mt-2">
                        <Col>
                            <h1>Records</h1>
                        </Col>
                        <Col sm={{offset:1}}>
                            <Button color="primary" className="mt-2" onClick={toggle}>Create</Button>
                        </Col>
                    </Row>
                    <Row>
                        {records ? <RecordTable data={records}/> : null}
                    </Row>
                </Container>
            </div>
            {(items && stores) ? (
                <RecordModal itemList={items} storeList={stores} isOpen={recordModal} toggle={toggle} setRecords={setRecords}/>
            ): null}
            
        </Container>
    );
}

export default App;