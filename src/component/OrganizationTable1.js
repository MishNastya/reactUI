import React, {Component} from 'react';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'
import {sendPostRequest} from "../sendRrquestFetch";
import {
    Button, ButtonGroup,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import EditModal from "./EditModal";
import CreateModal from "./CreateModal";



function onDeleteRow(rowKeys) {
    sendPostRequest("http://localhost:8080/department/organization/delete/", rowKeys, 'DELETE')
}

class OrganizationTable1 extends Component {
    render() {
        return (
            <>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight: 'bolder'}}>Сотрудник</TableCell>
                            <TableCell style={{fontWeight: 'bolder'}}>Подразделение</TableCell>
                            <TableCell style={{fontWeight: 'bolder'}}>Должность</TableCell>
                            <TableCell style={{fontWeight: 'bolder'}}>З/П</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.data.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell>{row.employee.lastName + " " + row.employee.firstName + " " + row.employee.middleName}</TableCell>
                                <TableCell>{row.subdivision.name}</TableCell>
                                <TableCell>{row.position.name}</TableCell>
                                <TableCell>{row.salary}</TableCell>
                                <TableCell align="right">
                                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                                        <Button><EditModal value={row}/></Button>
                                        <Button onClick={() => onDeleteRow(row.id)}>Delete</Button>
                                    </ButtonGroup>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </TableContainer>
              <div style={{textAlign: 'right'}}><CreateModal/></div>
            </>
        );
    }
}

export default OrganizationTable1;