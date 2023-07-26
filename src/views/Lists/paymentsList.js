import React, {useEffect, useState} from "react";

// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";

import stylesselect from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";
import * as PaymentServices from "components/salesOrders/paymentsService.js";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";


const useStylesSele = makeStyles(stylesselect);

export default function PaymentOptions() {
    const classes = useStylesSele();
    const [options, setOptions] = useState();
    const getPayments = async () => {
        const resp = await PaymentServices.getAllReq();
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
    const [paymentSelect, setPaymentSelect] = React.useState("");
    const handlePayment = event => {
        setPaymentSelect(event.target.value);
    };

    useEffect(() => {
        getPayments()
    }, [])

    return (
        <FormControl fullWidth className={classes.selectFormControl}>
            <InputLabel
                htmlFor="payment-select"
                className={classes.selectLabel}
            >
                Metodo de Pago
            </InputLabel>
            <Select
                MenuProps={{
                    className: classes.selectMenu
                }}
                classes={{
                    select: classes.select
                }}
                value={paymentSelect}
                onChange={handlePayment}
                inputProps={{
                    name: "payment-select",
                    id: "payment-select"
                }}
            >
                <MenuItem
                    disabled
                    classes={{
                        root: classes.selectMenuItem
                    }}
                >
                    Metodo de Pago
                </MenuItem>
                { options }
            </Select>
        </FormControl>
    )
}