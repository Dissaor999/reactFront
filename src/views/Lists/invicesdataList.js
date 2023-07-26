import React from "react";

// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";

import stylesselect from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";


const useStylesSele = makeStyles(stylesselect);

export function PaymentMethod() {
    const classes = useStylesSele();

    const [paymentSelect, setPaymentSelect] = React.useState("");
    const handlePayment = event => {
        setPaymentSelect(event.target.value);
    };

    return (
        <FormControl fullWidth className={classes.selectFormControl}>
            <InputLabel
                htmlFor="paymentmethod-select"
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
                    name: "paymentmethod-select",
                    id: "paymentmethod-select"
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
                <MenuItem
                    classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                    }}
                    value="PUE"
                >
                    PUE - Pago en una sola exibición
                </MenuItem>
                <MenuItem
                    classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                    }}
                    value="PPD"
                >
                    PPD - Pago en parcialidades o diferido
                </MenuItem>

            </Select>
        </FormControl>
    )
}

export function PaymentWay() {
    const classes = useStylesSele();

    const [paymentSelect, setPaymentSelect] = React.useState("");
    const handlePayment = event => {
        setPaymentSelect(event.target.value);
    };

    return (
        <FormControl fullWidth className={classes.selectFormControl}>
            <InputLabel
                htmlFor="paymentway-select"
                className={classes.selectLabel}
            >
                Forma de Pago
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
                    name: "paymentway-select",
                    id: "paymentway-select"
                }}
            >
                <MenuItem
                    disabled
                    classes={{
                        root: classes.selectMenuItem
                    }}
                >
                    Forma de Pago
                </MenuItem>
                <MenuItem
                    classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                    }}
                    value="01"
                >
                    01 - Efectivo
                </MenuItem>
                <MenuItem
                    classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                    }}
                    value="02"
                >
                    02 - Cheque Nominativp
                </MenuItem>
                <MenuItem
                    classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                    }}
                    value="31"
                >
                    31 - Intermediarios de pago
                </MenuItem>
                <MenuItem
                    classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                    }}
                    value="03"
                >
                    03 - Transferencia electronica de fondos
                </MenuItem>
                <MenuItem
                    classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                    }}
                    value="04"
                >
                    04 - Tarjeta de credito
                </MenuItem>
                <MenuItem
                    classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                    }}
                    value="06"
                >
                    06 - Dinero electronico
                </MenuItem>
                <MenuItem
                    classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                    }}
                    value="08"
                >
                    08 - Vales de despensa
                </MenuItem>
                <MenuItem
                    classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                    }}
                    value="28"
                >
                    28 - Tarjeta de debito
                </MenuItem>
                <MenuItem
                    classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                    }}
                    value="29"
                >
                    29 - Tarjeta de servicio
                </MenuItem>
                <MenuItem
                    classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                    }}
                    value="99"
                >
                    99 - Por definir
                </MenuItem>


            </Select>
        </FormControl>
    )
}

export function CDFIuse() {
    const classes = useStylesSele();

    const [paymentSelect, setPaymentSelect] = React.useState("");
    const handlePayment = event => {
        setPaymentSelect(event.target.value);
    };

    return (
        <FormControl fullWidth className={classes.selectFormControl}>
            <InputLabel
                htmlFor="cdfiuse-select"
                className={classes.selectLabel}
            >
                Uso de CDFI
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
                    name: "cdfiuse-select",
                    id: "cdfiuse-select"
                }}
            >
                <MenuItem
                    disabled
                    classes={{
                        root: classes.selectMenuItem
                    }}
                >
                    uso de CDFI
                </MenuItem>
                <MenuItem
                    classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                    }}
                    value="G01"
                >
                    G01 - Adquisición de mercancias
                    G01 - Adquisición de mercancias
                </MenuItem>
                <MenuItem
                    classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                    }}
                    value="G02"
                >
                    G02 - Por Devoluciones, descuentos o bonificaciones
                </MenuItem>
                <MenuItem
                    classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                    }}
                    value="G03"
                >
                    G03 - Gastos en general
                </MenuItem>
                <MenuItem
                    classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                    }}
                    value="D01"
                >
                    D01 - Honorarios médicos, dentales y gastos hospitalarios
                </MenuItem>
                <MenuItem
                    classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                    }}
                    value="D02"
                >
                    D02 - Gastos médicos por incapacidad o discapacidad
                </MenuItem>
                <MenuItem
                    classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                    }}
                    value="I01"
                >
                    I01 - Construcciones
                </MenuItem>
                <MenuItem
                    classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                    }}
                    value="I02"
                >
                    I02 - Mobilario y equipo de oficina por inversiones
                </MenuItem>
                <MenuItem
                    classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                    }}
                    value="I03"
                >
                    I03 - Equipo de transporte
                </MenuItem>
                <MenuItem
                    classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                    }}
                    value="I04"
                >
                    I04 - Equipo de computo y accesorios
                </MenuItem>
                <MenuItem
                    classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                    }}
                    value="I05"
                >
                    I05 - Dados, troqueles, moldes, matrices y herramental
                </MenuItem>
                <MenuItem
                    classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                    }}
                    value="I06"
                >
                    I06 - Comunicaciones telefónicas
                </MenuItem>
                <MenuItem
                    classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                    }}
                    value="I08"
                >
                    I08 - Otra Maquinaria y Equipo
                </MenuItem>
                <MenuItem
                    classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                    }}
                    value="P01"
                >
                    P01 - Por definir
                </MenuItem>

            </Select>
        </FormControl>
    )
}
