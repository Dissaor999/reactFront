import React, {useEffect, useState} from "react";

// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";

import stylesselect from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";
import * as SalesChannelService from "components/salesOrders/SalesChannelService.js";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";


const useStylesSele = makeStyles(stylesselect);

export default function SalesChannelOptions() {
    const classes = useStylesSele();
    const [options, setOptions] = useState();
    const getlist = async () => {
        const resp = await SalesChannelService.getAllSalesChannel();
        if (resp.data.status == true) {
            const responsMap = resp.data.data.map((resp) => {
                return (
                    <MenuItem
                        key={resp.id}
                        classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                        }}
                        value={resp.id}
                    >
                        {resp.name}
                    </MenuItem>
                )
            })
            setOptions(responsMap)
        }
    }
    const [salesChannelSelect, setSalesChannelSelect] = React.useState("");
    const hanndleSalesChannel = event => {
        setSalesChannelSelect(event.target.value);
    };

    useEffect(() => {
        getlist()
    }, [])

    return (
        <FormControl fullWidth className={classes.selectFormControl}>
            <InputLabel
                htmlFor="schan-select"
                className={classes.selectLabel}
            >
                Canal de Ventas
            </InputLabel>
            <Select
                MenuProps={{
                    className: classes.selectMenu
                }}
                classes={{
                    select: classes.select
                }}
                value={salesChannelSelect}
                onChange={hanndleSalesChannel}
                inputProps={{
                    name: "salesChannelsel",
                    id: "salesChannelsel"
                }}
            >
                <MenuItem
                    disabled
                    classes={{
                        root: classes.selectMenuItem
                    }}
                >
                    Canal de Venta
                </MenuItem>
                { options }
            </Select>
        </FormControl>
    )
}