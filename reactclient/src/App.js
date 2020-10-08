import React, {forwardRef, useEffect, useState} from 'react';
import './App.css';
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import axios from 'axios'
import MaterialTable from "material-table";
import {
    AddBox, ArrowDownward,
    Check, ChevronLeft,
    ChevronRight,
    Clear,
    DeleteOutline,
    Edit,
    FilterList,
    FirstPage, LastPage, Remove,
    SaveAlt, Search, ViewColumn
} from "@material-ui/icons";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const api = axios.create({
    baseURL: `http://localhost:8080/api`
})

function App() {

    const columns = [
        {title: "id", field: "id", hidden: true},
        {title: "Name", field: "name"},
        {title: "Address", field: "address"},
        {title: "City", field: "city"},
        {title: "Country Code", field: "countryCode"},
        {title: "Loan Amount", field: "loanAmount"}
    ]
    const [data, setData] = useState([]); //table data

    //for error handling
    const [iserror, setIserror] = useState(false)
    const [errorMessages, setErrorMessages] = useState([])

    useEffect(() => {
        api.get("/customers")
            .then(res => {
                setData(res.data)
            })
            .catch(error=>{
                setErrorMessages(["Cannot load customer data"])
                setIserror(true)
            })
    }, [])

    const handleRowAdd = (newData, resolve) => {
        //validation
        let errorList = []
        if(newData.name === undefined){
            errorList.push("Please enter name")
        }
        if(newData.address === undefined){
            errorList.push("Please enter address")
        }
        if(newData.city === undefined){
            errorList.push("Please enter a city")
        }
        if(newData.countryCode === undefined){
            errorList.push("Please enter a country code")
        }
        if(newData.loanAmount === undefined || isNaN(newData.loanAmount)){
            errorList.push("Please enter a loan amount")
        }
        if(errorList.length < 1){ //no error
            api.post("/customers", newData)
                .then(res => {
                    let dataToAdd = [...data];
                    dataToAdd.push(newData);
                    setData(dataToAdd);
                    resolve()
                    setErrorMessages([])
                    setIserror(false)
                })
                .catch(error => {
                    setErrorMessages(["Cannot add data. Server error!"])
                    setIserror(true)
                    resolve()
                })
        }else{
            setErrorMessages(errorList)
            setIserror(true)
            resolve()
        }
    }

    const handleRowUpdate = (newData, oldData, resolve) => {
        //validation
        let errorList = []
        if(newData.name === ""){
            errorList.push("Please enter name")
        }
        if(newData.address === ""){
            errorList.push("Please enter address")
        }
        if(newData.city === ""){
            errorList.push("Please enter a city")
        }
        if(newData.countryCode === ""){
            errorList.push("Please enter a country code")
        }
        if(newData.loanAmount === "" || isNaN(newData.loanAmount)){
            errorList.push("Please enter a loan amount")
        }

        if(errorList.length < 1){
            api.put("/customers/", newData)
                .then(res => {
                    const dataUpdate = [...data];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    setData([...dataUpdate]);
                    resolve()
                    setIserror(false)
                    setErrorMessages([])
                })
                .catch(error => {
                    setErrorMessages(["Update failed! Server error"])
                    setIserror(true)
                    resolve()

                })
        }else{
            setErrorMessages(errorList)
            setIserror(true)
            resolve()

        }

    }

    const handleRowDelete = (oldData, resolve) => {

        api.delete("/customers/"+oldData.id)
            .then(res => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                resolve()
            })
            .catch(error => {
                setErrorMessages(["Delete failed! Server error"])
                setIserror(true)
                resolve()
            })
    }


    return (
        <div className="App">

            <Grid container spacing={1}>
                <Grid item xs={3}/>
                <Grid item xs={6}>
                    <div>
                        {iserror &&
                        <Alert severity="error">
                            {errorMessages.map((msg, i) => {
                                return <div key={i}>{msg}</div>
                            })}
                        </Alert>
                        }
                    </div>
                    <MaterialTable
                        title="Customers table"
                        columns={columns}
                        data={data}
                        icons={tableIcons}
                        editable={{
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve) => {
                                    handleRowUpdate(newData, oldData, resolve);

                                }),
                            onRowAdd: (newData) =>
                                new Promise((resolve) => {
                                    handleRowAdd(newData, resolve)
                                }),
                            onRowDelete: (oldData) =>
                                new Promise((resolve) => {
                                    handleRowDelete(oldData, resolve)
                                }),
                        }}
                    />
                </Grid>
                <Grid item xs={3}/>
            </Grid>
        </div>
    );


}

export default App;

