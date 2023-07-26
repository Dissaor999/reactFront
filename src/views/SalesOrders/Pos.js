import React, { useEffect, useState } from 'react';
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Assignment from "@material-ui/icons/Assignment";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.js";
import Datetime from "react-datetime";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import Close from "@material-ui/icons/Close";



import Card from "components/Card/Card.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import { cardTitle, hexToRgb, blackColor } from "assets/jss/material-dashboard-pro-react.js";

import PaymentOptions from "views/Lists/paymentsList.js";
import ClientOptions from "views/Lists/ClientsList.js";
import SalesChannelOptions from "views/Lists/salesChannelList.js"
import InventoryOptions from "views/Lists/InventoryList.js";
import * as SalesOrderService from "components/salesOrders/salesOrderService.js";
import Table from "../../components/Table/Table";
import Snackbar from "components/Snackbar/Snackbar.js";

const stylest = {
    cardIconTitle: {
        ...cardTitle,
        marginTop: "15px",
        marginBottom: "0px",
    },
    DividerItem: {
        margin: "5px 0",
        backgroundColor: "rgba(" + hexToRgb(blackColor) + ", 0.12)",
        height: "10px",
        overflow: "hidden",
    },
};
const styledp = {
    label: {
        color: "rgba(0, 0, 0, 0.26)",
        cursor: "pointer",
        display: "inline-flex",
        fontSize: "14px",
        transition: "0.3s ease all",
        lineHeight: "1.428571429",
        fontWeight: "400",
        paddingLeft: "0"
    }
};

const useStylest = makeStyles(stylest);
const useStylesdp = makeStyles(styledp);
const useStyles = makeStyles(styles);

export default function Example() {
    const classest = useStylest();
    const classesdp = useStylesdp();
    const classes = useStyles();
    const [orderProducts, setOrderProducts] = useState([[
        "",
        "No Has Agregado Nada a la lista",
        "",
        "",
        "",
        ""
    ]])
    const [subtotal, setSubtotal] = useState("")
    const [discount, setDiscount] = useState(0)
    const [total, setTotal] = useState("")
    const [succesNoti, setSuccesNoti] = useState(false)
    const [errNoti, setErrorNoti] = useState(false)
    const [errorstring, setErrorString] = useState("")
    const agregaProducts = () => {
        let select = document.getElementById('inventory-select')
        let ItemName = select.outerText
        let ItemNameArr = ItemName.split('-')
        let ItemId = ItemNameArr['0']
        let Price = document.getElementById('articlepImput').value;
        let Qty = document.getElementById('articleqImput').value;
        let Tot = Price * Qty;

        if (orderProducts['0']['0'] == "") {
            setOrderProducts([
                [
                    ItemId,
                    ItemName,
                    Price,
                    Qty,
                    Tot,
                    <Button color={"danger"} className={classes.actionButton} key={ItemId} onClick={() => quitaProducts(ItemId)} >
                        <Close className={classes.icon} />
                    </Button>
                ]
            ]);

        } else {
            setOrderProducts([
                ...orderProducts,
                [
                    ItemId,
                    ItemName,
                    Price,
                    Qty,
                    Tot,
                    <Button color={"danger"} className={classes.actionButton} key={ItemId} onClick={() => quitaProducts(ItemId)} >
                        <Close className={classes.icon} />
                    </Button>
                ]
            ]);
        }
        console.log(orderProducts)
    }
    const numbers = async () => {
        var sub = 0
        orderProducts.forEach((product) => {
            console.log(product)
            sub = sub + product["4"]
        })
        setSubtotal(sub)
        var tot = subtotal - discount
        setTotal(tot)
    }
    const quitaProducts = (id) => {
        console.log(orderProducts['0'])
        var Products = orderProducts['0'];
        const listProducts = Products.filter((Products) => Products.id !== id)
        setOrderProducts([listProducts])
    }
    const handlediscount = (event) => {
        setDiscount(event.target.value);
        console.log(discount)
    };
    const storeOrder = async () => {
        var user = JSON.parse(localStorage.getItem("user"))
        var user_id = user.userId
        var client = document.getElementById('client-select').outerText
        let clientArr = client.split('-')
        let clientId = clientArr['0']
        var payment = document.getElementById('payment-select').value
        var salesChannelId = document.getElementById('salesChannelsel').value //orderDeliveryDate
        var shippingDate =  document.getElementById('orderDeliveryDate').value
        var ItemArr = []
        orderProducts.forEach((product) => {
            var item = { 
                'item_id': product['0'],
                'item_quantity': product['3'],
                'item_price': product['2']
            }
            ItemArr.push(item)
        })
        const SalesOrder = {
            'user_id': user_id,
            'client_id': clientId,
            'payment_id': payment,
            'channel_id': salesChannelId,
            'total': total,
            'discount': discount,
            'salesOrdeItems': ItemArr,
            'shipping_at': shippingDate
        }
        let res = await SalesOrderService.storeRec(SalesOrder);
        if (res.status == true) {
            showNotification("succ")
            window.location.reload(false);
        } else {
            let error = JSON.stringify(res.error)
            console.log(error)
            setErrorString(error)
            showNotification("err")
            window.location.reload(false);
        }
        console.log(SalesOrder)
    }
    const showNotification = (place) => {
        switch (place) {
            case "err":
                if (!errNoti) {
                    setErrorNoti(true);
                    // setTimeout(function () {
                    //     setErrorNoti(false);
                    // }, 3000);
                }
                break;
            case "succ":
                if (!succesNoti) {
                    setSuccesNoti(true);
                    setTimeout(function () {
                        setSuccesNoti(false);
                    }, 3000);
                }
                break;
            default:
                break;
        }
    };
    useEffect(() => { numbers() })

    return (
        <GridContainer>
            <GridItem>
                <Snackbar
                    place="tc"
                    color="success"
                    message="Finalizado correctamente"
                    open={succesNoti}
                    closeNotification={() => {
                        setSuccesNoti(false)
                    }}
                    close
                />
                <Snackbar
                    place="tc"
                    color="danger"
                    message={errorstring}
                    open={errNoti}
                    closeNotification={() => {
                        setErrorNoti(false)
                    }}
                    close
                />
            </GridItem>
            <GridItem xs={12}>
                <Card>
                    <CardHeader color="warning" icon>
                        <CardIcon color="info">
                            <Assignment />
                        </CardIcon>
                        <h4 className={classest.cardIconTitle}>Agregar una Orden de Venta</h4>
                    </CardHeader>
                    <CardBody>
                        <GridContainer>
                            <GridItem xs={12} sm={6} md={4} lg={4}>
                                <ClientOptions />
                            </GridItem>
                            <GridItem xs={12} sm={6} md={4} lg={4}>
                                <PaymentOptions />
                            </GridItem>
                            <GridItem xs={12} sm={6} md={4} lg={4}>
                                <SalesChannelOptions />
                            </GridItem>
                            <Divider className={classest.DividerItem} />
                            <Card>
                                <CardHeader>
                                    <h5 className={classest.cardIconTitle}>Articulos</h5>
                                </CardHeader>
                                <CardBody>
                                    <GridContainer>
                                        <GridItem xs={12} sm={6} md={6} lg={6}>
                                            <InventoryOptions />
                                        </GridItem>
                                        <GridItem xs={6} sm={2} md={2} lg={2}>
                                            <CustomInput
                                                id="articlepImput"
                                                labelText="Precio"
                                                formControlProps={{
                                                    fullWidth: true,
                                                }}
                                                inputProps={{
                                                    type: "number",
                                                    name: "name",
                                                }}

                                            />
                                        </GridItem>
                                        <GridItem xs={6} sm={2} md={2} lg={2}>
                                            <CustomInput
                                                id="articleqImput"
                                                labelText="Cantidad"
                                                formControlProps={{
                                                    fullWidth: true,
                                                }}
                                                inputProps={{
                                                    type: "number",
                                                    name: "name",
                                                }}

                                            />
                                        </GridItem>
                                        <GridItem xs={6} sm={2} md={2} lg={2}>
                                            <Button
                                                className="btn-round"
                                                color="info"
                                                onClick={() => agregaProducts()}
                                            >
                                                Agregar a la lista
                                            </Button>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12} lg={12}>
                                            <Table
                                                tableHead={["#", "Articulo", "Precio", "Cantidad", "Total", "Acciones"]}
                                                tableData={orderProducts}
                                                customCellClasses={[
                                                    classes.center,
                                                    classes.right,
                                                    classes.right
                                                ]}
                                                // 0 is for classes.center, 4 is for classes.right, 5 is for classes.right
                                                customClassesForCells={[0, 4, 5]}
                                                customHeadCellClasses={[
                                                    classes.center,
                                                    classes.right,
                                                    classes.right
                                                ]}
                                                // 0 is for classes.center, 4 is for classes.right, 5 is for classes.right
                                                customHeadClassesForCells={[0, 4, 5]}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                </CardBody>
                            </Card>
                            <GridItem xs={6} sm={3} md={3} lg={3}>
                                <h4>Subtotal {subtotal}</h4>
                                <h4>Descuento {discount}</h4>
                                <h3>Total $ {total}</h3>
                            </GridItem>
                            <GridItem xs={6} sm={3} md={3} lg={3}>
                                <CustomInput
                                    id="orderDescImput"
                                    labelText="Descuento"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        type: "number",
                                        name: "name",
                                        onChange: (event) => {
                                            handlediscount(event)
                                        },
                                    }}

                                />
                            </GridItem>
                            <GridItem xs={6} sm={3} md={3} lg={3}>
                                <InputLabel className={classesdp.label}>
                                    Fecha de entrega
                                </InputLabel>
                                <br />
                                <FormControl fullWidth>
                                    <Datetime
                                        timeFormat={false}
                                        inputProps={{
                                            placeholder: "Seleccione dia de entrega",
                                            id:"orderDeliveryDate"
                                        }}
                                    />
                                </FormControl>
                            </GridItem>
                            <GridItem xs={6} sm={3} md={3} lg={3}>
                                <Button
                                    className="btn-round"
                                    color="success"
                                    onClick={() => storeOrder()}
                                >
                                    Guardar la orden
                                </Button>
                            </GridItem>
                        </GridContainer>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
}