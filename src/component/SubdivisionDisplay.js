import {sendRequest} from "../sendRrquestFetch";
import SubdivisionTable from "./SubdivisionTable";
import * as React from "react";
import {Component} from "react/cjs/react.production.min";

const requestUrl = "http://localhost:8080/department/subdivision/"

export class SubdivisionDisplay extends Component {

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
                    <SubdivisionTable data={items}/>
                </div>
            );
        }
    }
}