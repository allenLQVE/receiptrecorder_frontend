/* eslint-disable eqeqeq */
import axios from "axios";
import React, { useContext, useState } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label,
} from "reactstrap";
import { StoreContext } from '../context/StoreContext';

export const StoreModal = ({ isOpen, toggle, setStores, isCreate, stores }) =>{
    const storeContext = useContext(StoreContext)

    // check if the input is valid
    const [invalidName, setNameValid] = useState(false);

    const resetEverything = () =>{
        storeContext.reset();
        setNameValid(false);
        toggle();
    }

    const saveStore = (e) =>{
        // check if the input is valid
        if(storeContext.name == ""){
            setNameValid(true);
            return;
        }
        for(var i in stores){
            if(stores[i].name == storeContext.name && stores[i].id != storeContext.id){
                setNameValid(true);
                return;
            }
        }

        const data = {
            name: storeContext.name,
            address: storeContext.address,
            desc: storeContext.desc,
        }

        if(isCreate){
            // create the new store
            axios.post("http://localhost:8000/api/stores/", data).then(
                response => {
                    setStores(prev => [...prev, response.data]);
                }
            ).catch(error => {
                console.error(error);
            })
        } else {
            // edit store
            data['id'] = storeContext.id;

            axios.put(`http://localhost:8000/api/stores/${storeContext.id}/`, data).then(
                response => {
                    setStores(stores => stores.map(store => store.id == storeContext.id ? response.data : store))
                }
            ).catch(error =>{
                console.error(error)
            })
        }

        toggle();

        // set values back to default
        storeContext.reset();
    };

    return (
        <Modal isOpen={isOpen} toggle={resetEverything}>
            <ModalHeader toggle={resetEverything}>{isCreate ? "Create New Store" : "Edit Store"}</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        onChange={(e) => {
                            storeContext.setName(e.target.value);
                            setNameValid(false);
                        }}
                        invalid={invalidName}
                        defaultValue={storeContext.name}
                    >
                    </Input>
                    </FormGroup>
                    <FormGroup>
                    <Label for="address">Address</Label>
                    <Input
                        type="textarea"
                        id="address"
                        name="address"
                        onChange={(e) => {
                            storeContext.setAddress(e.target.value);
                        }}
                        defaultValue={storeContext.address}
                    >
                    </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="desc">Description</Label>
                        <Input
                        id="desc"
                        name="desc"
                        type="textarea"
                        onChange={(e) => {storeContext.setDesc(e.target.value)}}
                        defaultValue={storeContext.desc}
                        />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
            <Button color="success" onClick={saveStore}>
                Save
            </Button>
            </ModalFooter>
        </Modal>
    )
}