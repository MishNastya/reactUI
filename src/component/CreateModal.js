import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {
    Button,
    ButtonGroup, createMuiTheme,
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

function onCreateRow(row) {
    sendPostRequest("http://localhost:8080/department/organization/", row, 'POST')
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

export default function CreateModal(props) {
    let salary;
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
    const [subdivision, setSubdivision] = React.useState('');

    const handleChangeSubdivision = (event) => {
        setSubdivision(event.target.value);
    };

    const [position, setPosition] = React.useState('');

    const handleChangePosition = (event) => {
        setPosition(event.target.value);
    };

    const [employee, setEmployee] = React.useState('');

    const handleTextFieldChange = (event) => {
        salary = event.target.value;
    };

    const handleChangeEmployee = (event) => {
        setEmployee(event.target.value);
    };

    const handleSave = () => {
        let row = {};
        row.subdivision = getValue(subdivisions, subdivision);
        row.position = getValue(positions, position);
        row.employee = getValue(employees, employee);
        row.salary = salary
        onCreateRow(props.value);
    };


    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Создание</h2>
            <div className="element">
            <FormControl fullWidth={200} variant="outlined" >
                <InputLabel id="employee">Сотрудник</InputLabel>
                <Select
                    labelId="position-label"
                    id="employee"
                     onChange={handleChangeEmployee}
                    label="employee"
                >
                    {employees.map((row) => (
                        <MenuItem value = {row.id}>{row.lastName +" "+ row.firstName +" "+ row.middleName}</MenuItem>
                    ))
                    }
                </Select>
            </FormControl>
            </div>
            <div className = "element">


            <FormControl fullWidth={200} variant="outlined" >

                <InputLabel id="subdivision">Подразделение</InputLabel>
                <Select
                    labelId="subdivision-label"
                    id="subdivision"
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


            <FormControl fullWidth={200} variant="outlined" >
                <InputLabel id="position">Должность</InputLabel>
                <Select
                    labelId="position-label"
                    id="position"
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
                          defaultValue="0"
                          onChange={handleTextFieldChange}/>
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
            <Button style={{border:'1px solid rgba(63, 81, 181, 0.5)', padding: '10px', marginTop: '10px'}} onClick={handleOpen}>
                Create new
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
