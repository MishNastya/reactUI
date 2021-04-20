import React, { Component } from 'react';
import {BootstrapTable,
    TableHeaderColumn} from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'

class ReportTable extends Component {
    render() {

        return (
            <div>
                <BootstrapTable data={this.props.data}>
                    <TableHeaderColumn isKey dataField='subdivisionName'>
                        Имя подразделения
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField='salaryWomen' dataFormat={ priceFormatter }>
                        З/п женщин
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField='salaryMen' dataFormat={ priceFormatter }>
                        З/п мужчин
                    </TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}


function priceFormatter(cell) {
    return "$ " + cell;
}


export default ReportTable;