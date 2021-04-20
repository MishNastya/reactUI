import * as React from "react";
import {Component} from "react/cjs/react.production.min";
import PositionTable from "./PositionTable";
import {sendRequest} from "../sendRrquestFetch";

const requestUrl = "http://localhost:8080/department/position/"

export class PositionDisplay extends Component {

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

                console.log('promise request', r);
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
                    <PositionTable data={items}/>
                </div>
            );
        }
    }
}