/* eslint-disable eqeqeq */
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import axios from "axios";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons';
import { StoreContext } from '../context/StoreContext';

export const StoreTable = ({ stores, setStores, openStoreModal }) => {
    const storeContext = useContext(StoreContext);
    const [sortedRows, setRows] = useState(stores);
    const [alert, setAlert] = useState(false);

    useEffect(() => {
        if(stores){
            setRows(stores);
        }
    }, [stores]);

    const toggleAlert = () => setAlert(!alert);

    const editStore = (e) => {
        const row = document.getElementById(e.currentTarget.value);
        
        // set the value from the selected row to the form
        storeContext.setId(e.currentTarget.value);
        storeContext.setName(row.getElementsByClassName('name')[0].textContent);
        if(row.getElementsByClassName('address')[0].textContent != null){
            storeContext.setAddress(row.getElementsByClassName('address')[0].textContent);
        }
        if(row.getElementsByClassName('desc')[0].textContent != null){
            storeContext.setDesc(row.getElementsByClassName('desc')[0].textContent);
        }
            
        openStoreModal();
    }

    const removeStore = async (e) => {
        // make sure the store is not linking to any record
        const id = e.currentTarget.value;
        const storeName = document.getElementById(id).getElementsByClassName('name')[0].textContent;
        const data = {store:storeName}
        
        var empty = false
        await axios.get('http://localhost:8000/api/records/getRecordByStore/', {params:data}).then(
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
                `http://localhost:8000/api/stores/${id}/`,
            ).catch(error => {
                console.error(error);
            });

            setStores(
                stores.filter((store) => {
                    return store.id != id;
                })
            )
        }
    };
    
    return (
        <>
            <table className={'table table-bordered table-striped table-responsive-sm'}>
                <thead>
                    <tr>
                        <th width="15%">Name</th>
                        <th width="25%">Address</th>
                        <th width="35%">Description</th>
                        <th width="10%">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedRows.map((row, index) => (
                        <tr key={index} id={row.id}>
                            <td key='name' className='name'>{row.name}</td>
                            <td key='address' className='address'>{row.address}</td>
                            <td key='desc' className='desc'>{row.desc}</td>
                            <td key='action'>
                                <button className="btn btn-primary mr-2" onClick={editStore} value={row.id}>
                                    <FontAwesomeIcon icon={faPen}/>
                                </button>
                                <button className="btn btn-danger" onClick={removeStore} value={row.id}>
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
                    The store is linking to at least one record. Please remove the associating records first.
                </ModalBody>
            </Modal>
        </>
    )
}