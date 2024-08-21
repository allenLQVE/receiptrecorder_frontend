import axios from "axios";
import React, { useState } from "react";
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

export const RecordModal = ({ itemList, storeList, isOpen, toggle, setRecords }) =>{
    const [item, setItem] = useState('');
    const [store, setStore] = useState('');
    const [purchaseDate, setPurchaseDate] = useState();
    const [price, setPrice] = useState(0);
    const [saving, setSaving] = useState(0);
    const [units, setUnits] = useState(1);
    const [detail, setDetail] = useState('');
    const [invalidItem, setItemValid] = useState(false);
    const [invalidStore, setStoreValid] = useState(false);
    const [invalidDate, setDateValid] = useState(false);

    const saveRecord = (e) =>{
        e.preventDefault();

        // check if the record has required fields
        var invalid = false;
        if(store === ""){
            setStoreValid(true);
            invalid = true;
        }
        if(item === ""){
            setItemValid(true);
            invalid = true;
        }
        if(purchaseDate==null){
            setDateValid(true);
            invalid = true;
        }

        if(invalid){
            return;
        } 

        // create the new record
        axios.post("http://localhost:8000/api/records/", {
            item: item,
            store: store,
            purchaseDate: purchaseDate,
            price: price,
            saving: saving,
            units: units,
            detail: detail,
        }).then(
            response => {
                setRecords(prev => [...prev, response.data]);
                
            }
        ).catch(error => {
            console.error(error);
        })

        toggle();

        // set values back to default
        setItem('');
        setStore('');
        setPurchaseDate(null);
        setPrice(0);
        setSaving(0);
        setUnits(1);
        setDetail('');
        setItemValid(false);
        setDateValid(false);
        setStoreValid(false);
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create New Record</ModalHeader>
            <ModalBody>
                <Form onSubmit={saveRecord} id="recordForm">
                    <FormGroup>
                    <Label for="item">Item</Label>
                    <Input
                        type="select"
                        id="item"
                        name="item"
                        onChange={(e) => {
                            setItem(e.target.value);
                            setItemValid(false);
                        }}
                        invalid={invalidItem}
                    >
                        <option></option>
                        {itemList.map((item) => (
                            <option>{item.name}</option>
                        ))}
                    </Input>
                    </FormGroup>
                    <FormGroup>
                    <Label for="store">Store</Label>
                    <Input
                        type="select"
                        id="store"
                        name="store"
                        onChange={(e) => {
                            setStore(e.target.value);
                            setStoreValid(false);
                        }}
                        invalid={invalidStore}
                    >
                        <option></option>
                        {storeList.map((store) => (
                            <option>{store.name}</option>
                        ))}
                    </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="purchaseDate">Date</Label>
                        <Input
                        id="purchaseDate"
                        name="purchaseDate"
                        placeholder="date placeholder"
                        type="date"
                        onChange={(e) => {
                            setPurchaseDate(e.target.value);
                            setDateValid(false);
                        }}
                        invalid={invalidDate}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="price">Price</Label>
                        <Input
                        id="price"
                        name="price"
                        type="number"
                        step="0.1"
                        min="0"
                        defaultValue="0"
                        onChange={(e) => {setPrice(e.target.value)}}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="saving">Saving</Label>
                        <Input
                        id="saving"
                        name="saving"
                        type="number"
                        step="0.1"
                        min="0"
                        defaultValue="0"
                        onChange={(e) => {setSaving(e.target.value)}}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="units">Unit</Label>
                        <Input
                        id="units"
                        name="units"
                        type="number"
                        min="1"
                        defaultValue="1"
                        onChange={(e) => {setUnits(e.target.value)}}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="detail">Note</Label>
                        <Input
                        id="detail"
                        name="detail"
                        type="textarea"
                        onChange={(e) => {setDetail(e.target.value)}}
                        />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
            <Button color="success" onClick={saveRecord}>
                Save
            </Button>
            </ModalFooter>
        </Modal>
    )
}

// export class RecordModal extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             activeItem: this.props.activeItem,
//             itemList: this.props.itemList,
//             storeList: this.props.storeList,
//         };
//     }

//     handleChange = (e) => {
//         let { name, value } = e.target;

//         const activeItem = { ...this.state.activeItem, [name]: value };
//         const itemList = { ...this.state.itemList, [name]: value };
//         const storeList = { ...this.state.storeList, [name]: value };

//         this.setState({ activeItem, itemList, storeList });
//     };

//     render() {
//         const { toggle, onSave } = this.props;

//         return (
//             <Modal isOpen={true} toggle={toggle}>
//                 <ModalHeader toggle={toggle}>Create</ModalHeader>
//                 <ModalBody>
//                     <Form>
//                         <FormGroup>
//                         <Label for="Item Name">Item</Label>
//                         <Input
//                             type="select"
//                             id="itemName"
//                             name="itemName"
//                             onChange={this.handleChange}
//                             value={this.state.activeItem.item.name}
//                         >
//                             {this.state.itemList.map((item) => (
//                                 <option>{item.name}</option>
//                             ))}
//                         </Input>
//                         </FormGroup>
//                     </Form>
//                 </ModalBody>
//                 <ModalFooter>
//                 <Button
//                     color="success"
//                     onClick={() => onSave(this.state.activeItem)}
//                 >
//                     Save
//                 </Button>
//                 </ModalFooter>
//             </Modal>
//         );
//     }
// }