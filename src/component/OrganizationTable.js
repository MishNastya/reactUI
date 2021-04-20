import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'
import {sendPostRequest, sendRequest} from "../sendRrquestFetch";
import {Table} from "@material-ui/core";


initDropDown();


function initDropDown(){
    getAllPosition();
    getAllSubdivision()
}

let position = [];
let subdivision = [];

function getAllPosition() {
    sendRequest("http://localhost:8080/department/position/")
        .then(r => {
            position = r.map(obj => obj.name)
        });
}

function getAllSubdivision() {
    sendRequest("http://localhost:8080/department/subdivision/")
        .then(r => {
            subdivision = r.map(obj => obj.name)
        });
}

function onInsertRow(row) {
    sendPostRequest("http://localhost:8080/department/organization/", row, 'POST')
}


function onDeleteRow(rowKeys) {
    sendPostRequest("http://localhost:8080/department/organization/delete/", rowKeys, 'DELETE')
}

function onUpdateRow(row) {
    sendPostRequest("http://localhost:8080/department/organization/update/", row, 'POST')
}



class OrganizationTable extends Component {
    render() {
        const options = {
            afterInsertRow: onInsertRow,
            afterDeleteRow: onDeleteRow
        }
        const cellEditProp = {
            mode: 'click',
        }
        const selectRowProp = {
            mode: 'checkbox',
            unselectable: [2]
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
                    <TableHeaderColumn dataField='employee'
                                       dataFormat={employeeFormatter}
                                       width="30%"
                                       editable={false}>
                        Сотрудник
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField='subdivision'
                                       // dataFormat={nameFormatter}
                                       editable={ { type: 'select', options: { values: subdivision } } }>
                        Подразделение
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField='position'
                                       //dataFormat={nameFormatter}
                                       editable={ { type: 'select', options: { values: position} } }>
                        Должность
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField='salary' dataFormat={priceFormatter}>
                        З/П
                    </TableHeaderColumn>
                    <TableHeaderColumn  editable={ { type: 'select', options: { values: position } } }>Job Type</TableHeaderColumn>
                    {/*/!*<TableHeaderColumn dataField='active' editable={ { type: 'checkbox', options: { values: 'Y:N' } } }>Active</TableHeaderColumn>TableHeaderColumn*!/*/}
                    <TableHeaderColumn dataField="button"
                    editable={false}
                    dataFormat={buttonFormatter}
                    width="10%"/>
                </BootstrapTable>
                <Table>
                    <thead>

                    </thead>

                </Table>
            </div>
        );
    }
}

function priceFormatter(cell, row){
    return "$" + cell;
}

class ActiveFormatter extends React.Component {
    render() {
        return (
            <input type='checkbox' checked={ this.props.active }/>
        );
    }
}

function activeFormatter(cell, row) {
    console.log("TEST Employee FORMATTER!!!"+  cell, row);
    return (
        <ActiveFormatter active={ cell } />
    );
}

function employeeFormatter(cell){
    return cell.lastName +" "+ cell.firstName +" "+ cell.middleName;
}

function nameFormatter(cell){
    console.log("CELL!!!!", cell)
    return cell.name;
}

function buttonFormatter(cell, row) {
    return <button type="submit" onClick={() => {
        console.log("TEST Employee!!!" + row)
        onUpdateRow(row)}
    }>Сохранить</button>;
}

export default OrganizationTable;