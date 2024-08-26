/* eslint-disable eqeqeq */
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons';
import { RecordContext } from '../context/RecordContext';

export const RecordTable = ({ records, setRecords, openRecordModal }) => {
    const recordContext = useContext(RecordContext);
    const [sortedRows, setRows] = useState(records);

    useEffect(() => {
        if(records){
            setRows(records);
        }
    }, [records]);

    const editRecord = (e) => {
        const row = document.getElementById(e.currentTarget.value);
        
        // set the value from the selected row to the form
        recordContext.setId(e.currentTarget.value);
        recordContext.setItem(row.getElementsByClassName('itemName')[0].textContent);
        recordContext.setStore(row.getElementsByClassName('storeName')[0].textContent);
        recordContext.setPurchaseDate(row.getElementsByClassName('purchaseDate')[0].textContent);
        recordContext.setPrice(parseFloat(row.getElementsByClassName('price')[0].textContent.slice(1)));
        recordContext.setSaving(parseFloat(row.getElementsByClassName('saving')[0].textContent.slice(1)));
        recordContext.setUnits(parseInt(row.getElementsByClassName('units')[0].textContent));
        if(row.getElementsByClassName('detail')[0].textContent != null){
            recordContext.setDetail(row.getElementsByClassName('detail')[0].textContent);
        }
            
        openRecordModal();
    }

    const removeRecord = (e) => {
        axios.delete(
            `http://localhost:8000/api/records/${e.currentTarget.value}/`,
        ).catch(error => {
            console.error(error);
        });

        setRecords(
            records.filter((record) => {
                return record.id != e.currentTarget.value;
            })
        )
    };
    
    return (
        <>
            <table className={'table table-bordered table-striped table-responsive-sm'}>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Store</th>
                        <th>Date</th>
                        <th>Cost</th>
                        <th>Saving</th>
                        <th>Unit</th>
                        <th>Unit Price</th>
                        <th>U.P. (W/Saving)</th>
                        <th>Paid</th>
                        <th>Note</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedRows.map((row, index) => (
                        <tr key={index} id={row.id}>
                            <td key='itemName' className='itemName'>{row.item.name}</td>
                            <td key='storeName' className='storeName'>{row.store.name}</td>
                            <td key='purchaseDate' className='purchaseDate'>{row.purchaseDate}</td>
                            <td key='price' className='price'>${row.price}</td>
                            <td key='saving' className='saving'>${row.saving}</td>
                            <td key='units' className='units'>{row.units}</td>
                            <td key='unitPrice'>${(row.price / row.units).toFixed(2)}</td>
                            <td key='unitPriceSaving'>${((row.price - row.saving) / row.units).toFixed(2)}</td>
                            <td key='paid'>${(row.price - row.saving).toFixed(2)}</td>
                            <td key='detail' className='detail'>{row.detail}</td>
                            {/* add a col for removing or update record */}
                            <td key='action'>
                                <button className="btn btn-primary mr-2" onClick={editRecord} value={row.id}>
                                    <FontAwesomeIcon icon={faPen}/>
                                </button>
                                <button className="btn btn-danger" onClick={removeRecord} value={row.id}>
                                    <FontAwesomeIcon icon={faTrashCan}/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}