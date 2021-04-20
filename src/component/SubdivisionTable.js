import React, { Component } from 'react';
import {BootstrapTable,
    TableHeaderColumn} from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'
import {sendPostRequest} from "../sendRrquestFetch";

function onInsertRow(row) {
    sendPostRequest("http://localhost:8080/department/subdivision/", row, 'POST')
}


function onDeleteRow(rowKeys) {
    sendPostRequest("http://localhost:8080/department/subdivision/delete/", rowKeys, 'DELETE')
}

function onUpdateRow(row) {
    sendPostRequest("http://localhost:8080/department/subdivision/update/", row, 'POST')
}

class SubdivisionTable extends Component {
    render() {
        const options = {
            afterInsertRow: onInsertRow,
            afterDeleteRow: onDeleteRow
        }
        const cellEditProp = {
            mode: 'click',
        }
        const selectRowProp = {
            mode: 'checkbox'
        }
        return (
            <div>
                <BootstrapTable data={this.props.data}
                                insertRow={true}
                                deleteRow={true}
                                selectRow={selectRowProp}
                                options={options}
                                cellEdit={cellEditProp}>
                    <TableHeaderColumn isKey dataField='id' hidden ={true}>
                        ID
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField='name'>
                        Наименование
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="button"
                                       editable={false}
                                       dataFormat={buttonFormatter}
                                       width="10%"/>
                </BootstrapTable>
            </div>
        );
    }
}

function buttonFormatter(cell, row){
    return <button type="submit" onClick={() => {
        console.log("TEST Employee!!!"+ row)
        onUpdateRow(row)

    }
    }>Сохранить</button>;
}

export default SubdivisionTable;