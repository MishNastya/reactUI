import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {
    Button,
    ButtonGroup, colors, createMuiTheme,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TableCell,
    TableRow,
    TextField
} from "@material-ui/core";
import {sendPostRequest, sendRequest} from "../sendRrquestFetch";
import {getModalStyle, getValue} from "./Utils";


initDropDown();


function initDropDown(){
    getAllPosition();
    getAllSubdivision();
    getAllEmployee();
}

let positions = [];
let subdivisions = [];
let employees = [];

function getAllPosition() {
    sendRequest("http://localhost:8080/department/position/")
        .then(r => {
            positions = r
        });
}

function getAllSubdivision() {
    sendRequest("http://localhost:8080/department/subdivision/")
        .then(r => {
            subdivisions = r
        });
}

function getAllEmployee() {
    sendRequest("http://localhost:8080/department/employee/")
        .then(r => {
            employees = r
        });
}

function onUpdateRow(row) {
    sendPostRequest("http://localhost:8080/department/organization/update/", row, 'POST')
}



const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        margin: '30px',
    },
}));

export default function EditModal(props) {
    let salary = props.value.salary;
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        let row = {};
        row.subdivision = getValue(subdivisions, subdivision);
        row.position = getValue(positions, position);
        row.salary = salary
        onUpdateRow(row);
    };

    const [subdivision, setSubdivision] = React.useState(props.value.subdivision.id);

    const handleChangeSubdivision = (event) => {
        setSubdivision(event.target.value);
    };

    const [position, setPosition] = React.useState(props.value.position.id);

    const handleChangePosition = (event) => {
        setPosition(event.target.value);
    };
    const handleTextFieldChange = (event) => {
        salary = event.target.value;
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Редактирование </h2>
            <TextField  style = {{width: 330}} id="outlined-basic" variant="outlined" disabled defaultValue={props.value.employee.lastName
            +" "+ props.value.employee.firstName
            +" "+ props.value.employee.middleName}/>
            <div className = "element">


            <FormControl fullWidth={200} variant="outlined">

                <InputLabel id="subdivision">Подразделение</InputLabel>
                <Select
                    labelId="subdivision-label"
                    id="subdivision"
                    value={subdivision}
                    onChange={handleChangeSubdivision}
                    label="subdivision"
                >

                    {subdivisions.map((row) => (
                    <MenuItem value = {row.id}>{row.name}</MenuItem>
                    ))
                    }

                </Select>
            </FormControl>
            </div>
            <div className = "element">


            <FormControl fullWidth={200} variant="outlined" width="90">
                <InputLabel id="position">Должность</InputLabel>
                <Select
                    labelId="position-label"
                    id="position"
                    value={position}
                    onChange={handleChangePosition}
                    label="position"
                >
                    {positions.map((row) => (
                    <MenuItem value = {row.id}>{row.name}</MenuItem>
                    ))
                    }
                </Select>
            </FormControl>
            </div>
            <div className = "element">
                 <TextField style = {{width: 330}}
                            variant="outlined"
                            id="outlined-basic"
                            label="З/п"
                            defaultValue={props.value.salary}
                            onChange={handleTextFieldChange}
                 />
            </div>
            <div className = "element">
                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                    <Button onClick={handleSave}>
                        save
                    </Button>
                    <Button onClick={handleClose}>
                        cancel
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    );

    return (
        <div>
            <Button onClick={handleOpen}>
                Edit
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}
