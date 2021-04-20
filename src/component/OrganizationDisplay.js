import {sendRequest} from "../sendRrquestFetch";
import SubdivisionTable from "./SubdivisionTable";
import * as React from "react";
import {Component} from "react/cjs/react.production.min";
import EmployeeTable from "./EmployeeTable";
import OrganizationTable from "./OrganizationTable";
import OrganizationTable1 from "./OrganizationTable1";

const requestUrl = "http://localhost:8080/department/organization/"

export class OrganizationDisplay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        sendRequest(requestUrl)
            .then(r => {
                    this.setState({
                        isLoaded: true,
                        items: r
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                })
    }


    render() {
        const {error, isLoaded, items} = this.state;
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Загрузка...</div>;
        } else {
            return (
                <div>
                    <OrganizationTable1 data={items}/>
                </div>
            );
        }
    }
}