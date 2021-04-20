import React, { Component } from 'react';
import {BootstrapTable,
    TableHeaderColumn} from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'
import {sendPostRequest} from "../sendRrquestFetch";


function onInsertRow(row) {
    sendPostRequest("http://localhost:8080/department/employee/", row, 'POST')
}


function onDeleteRow(rowKeys) {
    sendPostRequest("http://localhost:8080/department/employee/delete/", rowKeys, 'DELETE')
}

function onUpdateRow(row) {
    sendPostRequest("http://localhost:8080/department/employee/update/", row, 'POST')
}

class EmployeeTable extends Component {
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
                    <TableHeaderColumn isKey dataField='id' hidden = {true}>
                        ID
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField='lastName'>
                        Фамилия
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField='firstName'>
                        Имя
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField='middleName'>
                        Отчество
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField='sex'>
                        Пол
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField='birthday' dataFormat={dateFormatter} editable={ { type: 'date' } }>
                        День рождения
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

function dateFormatter(cell) {
    return cell.dayOfMonth+"/"+cell.monthValue+"/"+cell.year;
}

function buttonFormatter(cell, row){
    return <button type="submit" onClick={() => {
        console.log("TEST Employee!!!"+ row)
        onUpdateRow(row)

    }
    }>Сохранить</button>;
}




export default EmployeeTable;