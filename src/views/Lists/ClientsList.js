import React, {useEffect, useState} from "react";

// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";

import stylesselect from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";
import Select from "react-select";
import FormControl from "@material-ui/core/FormControl";
import * as ClientsService from "components/salesOrders/ClientsServices.js";


const useStylesSele = makeStyles(stylesselect);

export default function ClientOptions() {
    const classes = useStylesSele();
    const [options, setOptions] = useState([{
        value: '',
        disabled: true,
        label:  "Cliente",
        isFixed: true
    }]);
    const getPayments = async () => {
        const resp = await ClientsService.getAllClients();
        if (resp.data.status == true) {
            let clientsList = resp.data.data
            let lientOrderedList = clientsList.sort((a,b) => b.id - a.id)
            const responsMap = lientOrderedList.map((resp) => {
                return {
                    id: resp.id,
                    label: resp.id + '-' + resp.name,
                }
            })
            setOptions(responsMap)
        }
    }

    useEffect(() => {
        getPayments()
    }, [])

    return (
        <FormControl fullWidth className={classes.selectFormControl}>
            <Select
                className =  {{
                    select: classes.select
                }}
                menuPortalTarget={document.body}
                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                classNamePrefix = "select"
                id = "client-select"
                options={options}
                getOptionValue={(option) => `${option['id']}`}
                placeholder="Cliente"
            >
            </Select>
        </FormControl>
    )
}