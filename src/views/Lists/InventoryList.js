import React, {useEffect, useState} from "react";

// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";

import stylesselect from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";
import Select from 'react-select';
import FormControl from "@material-ui/core/FormControl";
import * as InventoryService from "components/Inventory/InventoryService.js";


const useStylesSele = makeStyles(stylesselect);

export default function InventoryOptions() {
    const classes = useStylesSele();
    const [options, setOptions] = useState([{
        value: "0",
        label:  "pruebas",
        isFixed: true
    }]);

    const getList = async () => {
        const resp = await InventoryService.getAllReq();
        if (resp.data.status == true) {
            const responsMap = resp.data.data.map((item) => {
                return {
                    id: item.id,
                    label: item.id  +  '-' + item.sku  +  '-' + item.name
                }
            })
            setOptions(responsMap)
        }
    }


    useEffect(() => {
        getList()
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
                id = "inventory-select"
                options={options}
                getOptionValue={(option) => `${option['id']}`}
                placeholder="Producto"
            >
            </Select>
        </FormControl>
    )
}