import React, { useEffect } from 'react'
import { useState } from 'react'
import { Table } from 'reactstrap'

export const RecordTable = ({ data }) => {
    const [sortedRows, setRows] = useState(data)

    useEffect(() => {
        if(data){
            setRows(data)
        }
    }, [data])
    
    return (
        <>
            <Table bordered striped size="sm">
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
                    </tr>
                </thead>
                <tbody>
                    {sortedRows.map((row, index) => (
                        <tr key={index}>
                            <td key='itemName'>{row.item.name}</td>
                            <td key='storeName'>{row.store.name}</td>
                            <td key='purchaseDate'>{row.purchaseDate}</td>
                            <td key='price'>${row.price}</td>
                            <td key='saving'>${row.saving}</td>
                            <td key='unit'>{row.units}</td>
                            <td key='unitPrice'>${row.price / row.units}</td>
                            <td key='unitPriceSaving'>${(row.price - row.saving) / row.units}</td>
                            <td key='paid'>${row.price - row.saving}</td>
                            <td key='detail'>{row.detail}</td>
                            {/* add a col for removing or update record */}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}