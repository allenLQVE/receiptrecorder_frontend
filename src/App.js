import React, { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';

import { Table } from 'reactstrap'

function App() {
    const [data, setData] = useState();

    useEffect(() => {
        axios.get('http://localhost:8000/api/records/').then(
            response => {
                setData(response.data);
            }
        ).catch(error => {
            console.error(error);
        })
    }, [])

    return (
        <div className='records'>
            <h1>Records</h1>
            <Table bordered striped size="sm">
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Store Name</th>
                        <th>Purchase Date</th>
                        <th>Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((data) => (
                        <tr>
                            <td>{data.item.name}</td>
                            <td>{data.store.name}</td>
                            <td>{data.purchaseDate}</td>
                            <td>${data.price}</td>
                            {/* add a col for removing or update record */}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default App;