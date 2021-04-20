import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {SubdivisionDisplay} from "./SubdivisionDisplay";
import {EmployeeDisplay} from "./EmployeeDisplay";
import {PositionDisplay} from "./PositionDisplay";
import {OrganizationDisplay} from "./OrganizationDisplay";
import {ReportDisplay} from "./ReportDisplay";

function TabPanel(props) {
    const { children, value, index} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}

        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

export default function DepartmentTabs() {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Сотрудники"/>
                    <Tab label="Должность"/>
                    <Tab label="Подразделение"/>
                    <Tab label="Организация"/>
                    <Tab label="Отчеты"/>
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <EmployeeDisplay/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <PositionDisplay/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <SubdivisionDisplay/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <OrganizationDisplay/>
            </TabPanel>
            <TabPanel value={value} index={4}>
                <ReportDisplay/>
            </TabPanel>
        </div>
    );
}


