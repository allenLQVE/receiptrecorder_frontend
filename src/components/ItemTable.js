/* eslint-disable eqeqeq */
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import axios from "axios";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons';
import { ItemContext } from '../context/ItemContext';

export const ItemTable = ({ items, setItems, openItemModal }) => {
    const itemContext = useContext(ItemContext);
    const [sortedRows, setRows] = useState(items);
    const [alert, setAlert] = useState(false);

    useEffect(() => {
        if(items){
            setRows(items);
        }
    }, [items]);

    const toggleAlert = () => setAlert(!alert);

    const editItem = (e) => {
        const row = document.getElementById('item ' + e.currentTarget.value);
        
        // set the value from the selected row to the form
        itemContext.setId(e.currentTarget.value);
        itemContext.setName(row.getElementsByClassName('name')[0].textContent);
        if(row.getElementsByClassName('unit')[0].textContent != null){
            itemContext.setUnit(row.getElementsByClassName('unit')[0].textContent);
        }
        if(row.getElementsByClassName('desc')[0].textContent != null){
            itemContext.setDesc(row.getElementsByClassName('desc')[0].textContent);
        }
            
        openItemModal();
    }

    const removeItem = async (e) => {
        // make sure the item is not linking to any record
        const id = e.currentTarget.value;
        const itemName = document.getElementById('item '+ id).getElementsByClassName('name')[0].textContent;
        const data = {item:itemName}
        
        var empty = false
        await axios.get('http://localhost:8000/api/records/getRecordByItem/', {params:data}).then(
            response => {
                if(Object.keys(response.data).length != 0){
                    toggleAlert()
                } else {
                    empty = true
                }
            }
        ).catch(error => {
            console.error(error)
        });

        if(empty){
            axios.delete(
                `http://localhost:8000/api/items/${id}/`,
            ).catch(error => {
                console.error(error);
            });

            setItems(
                items.filter((item) => {
                    return item.id != id;
                })
            )
        }
    };
    
    return (
        <>
            <table className={'table table-bordered table-striped table-responsive-sm'}>
                <thead>
                    <tr>
                        <th width="20%">Name</th>
                        <th width="10%">Unit</th>
                        <th width="45%">Description</th>
                        <th width="10%">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedRows.map((row, index) => (
                        <tr key={index} id={'item ' + row.id}>
                            <td key='name' className='name'>{row.name}</td>
                            <td key='unit' className='unit'>{row.unit}</td>
                            <td key='desc' className='desc'>{row.desc}</td>
                            <td key='action'>
                                <button className="btn btn-primary mr-2" onClick={editItem} value={row.id}>
                                    <FontAwesomeIcon icon={faPen}/>
                                </button>
                                <button className="btn btn-danger" onClick={removeItem} value={row.id}>
                                    <FontAwesomeIcon icon={faTrashCan}/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal isOpen={alert} toggle={toggleAlert}>
                <ModalHeader className="bg-danger" toggle={toggleAlert}>
                    Warning!
                </ModalHeader>
                <ModalBody>
                    The item is linking to at least one record. Please remove the associating records first.
                </ModalBody>
            </Modal>
        </>
    )
}