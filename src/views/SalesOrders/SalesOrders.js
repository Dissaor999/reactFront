import React, { useEffect, useState, } from "react";
import { downloadExcel } from 'react-export-table-to-excel';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Dvr";
import Close from "@material-ui/icons/Close";

import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import CardText from "components/Card/CardText.js";
import ReactTable from "components/salesOrders/SalesTable.js";
import Snackbar from "components/Snackbar/Snackbar.js";


import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";

import * as SalesOrderService from "components/salesOrders/salesOrderService.js";


import styles from "assets/jss/material-dashboard-pro-react/views/notificationsStyle.js";
import ReactBSAlert from "react-bootstrap-sweetalert";
import Table from "components/Table/Table.js";

import stylestable from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.js";



const stylest = {
    cardIconTitle: {
        ...cardTitle,
        marginTop: "15px",
        marginBottom: "0px",
    },
    cardTitle: {
        marginTop: "0",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        textAlign: "right"
    }
};

const useStyles = makeStyles(styles);
const useStylest = makeStyles(stylest);
const useStylestable = makeStyles(stylestable);
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function SalesChannelTable() 
{

    const [dataform, setDataForm] = useState({
        id: "",
        name: "",
        sat_code: ""
    })
    const [orderItems , setOrderItems] = useState(null)
    const [loadingData, setLoadingData] = useState(true)
    const [tableData, setTableData] = useState()
    const [excelData, setExcelData] = useState()
    const clasessTable = useStylestable();
    const classest = useStylest();
    const classes = useStyles();
    const [modalForm, setModalForm] = useState(false)
    const [alert, setAlert] = useState(null)
    const [succesNoti, setSuccesNoti] = useState(false)
    const [errNoti, setErrorNoti] = useState(false)
    const headertable = ["Titulo", "Direccion Completa", "Notas", "Id Referencia", "Persona de Contacto", "Telefono de contacto", "SMS", "Tipo de Visita"];

    const hideAlert = () => {
        setAlert(null);
    };

    const hideAlertok = () => {
        setAlert(null);
        getlist();
    };

    const openModal = async (recordId) => {
        if (recordId) {
            await getID(recordId)
        }
        setModalForm(!modalForm)
    }
    const getID = async (id) => {
        const resp = await SalesOrderService.getIdReq(id)
        if (resp.data.status == true) {
            //get_sale_order_items map
            const salesOrderdata = () => {
                return {
                    id: resp.data.data.id,
                    orderMarketId: resp.data.data.marketplace_id,
                    orderMarketplace: resp.data.data.get_channel.name,
                    orderDate: resp.data.data.order_at,
                    orderStatus: resp.data.data.order_status,
                    orderTotal:resp.data.data.total,
                    orderEntrega: resp.data.data.shipping_at,
                    clientName: resp.data.data.get_client.name,
                    clientRfc: resp.data.data.get_client.rfc,
                    clientTel:resp.data.data.get_client.phone,
                    clientEmail:resp.data.data.get_client.email,
                    clientStreet: resp.data.data.get_client.street_and_number,
                    clientInter: resp.data.data.get_client.interior_number,
                    clientColo: resp.data.data.get_client.colony,
                    clientMuni:resp.data.data.get_client.municipality,
                    clienZipcode:resp.data.data.get_client.postcode,
                    clienBStreets:resp.data.data.get_client.between_streets,
                    clienreference:resp.data.data.get_client.reference                }
            }
            const itemsMap = resp.data.data.get_sale_order_items.map((item) => {
                return [
                    item.id,
                    item.sku,
                    item.name,
                    item.quantity,
                    item.price
                ]
            })
            setDataForm(salesOrderdata)
            setOrderItems(itemsMap)
            setModalForm(!modalForm)
        }

    }
    const deleteClient = async (id) => {
        let mystyle = {
            color: "#000",
            fontSize: "15px",
            fontWeight: "bold",
        };

        setAlert(
            <ReactBSAlert
                warning
                style={{ display: "block", marginTop: "-100px" }}
                title="¿Estas segur@?"
                onConfirm={() => successDelete(id)}
                onCancel={() => hideAlert()}
                confirmBtnText="¡ Sí, bórralo !"
                cancelBtnText="Cancelar"
                showCancel
                btnSize=""
            >
                <div
                    style={mystyle}
                    dangerouslySetInnerHTML={{
                        __html: "¡ No podrás recuperar este dato !",
                    }}
                ></div>
            </ReactBSAlert>
        );
        const successDelete = async (id) => {
            // console.log("deleteProduct");
            const req = await SalesOrderService.deleteRecord(id);
            const JSONreq = req.data;
            if (JSONreq.message == "errors") {
                let text = "";
                text += JSONreq.buyer ? "Error: " + JSONreq.buyer : "";
                setAlert(
                    <ReactBSAlert
                        warning
                        style={{ display: "block", marginTop: "-100px" }}
                        title="Validar Datos"
                        onConfirm={() => hideAlert()}
                        onCancel={() => hideAlert()}
                        confirmBtnBsStyle="info"
                        btnSize=""
                    >
                        <div
                            style={mystyle}
                            dangerouslySetInnerHTML={{ __html: text }}
                        ></div>
                    </ReactBSAlert>
                );
            } else {
                setAlert(
                    <ReactBSAlert
                        success
                        style={{ display: "block", marginTop: "-100px" }}
                        title="Borrado"
                        onConfirm={() => hideAlertok()}
                        onCancel={() => hideAlert()}
                        confirmBtnBsStyle="info"
                        btnSize=""
                    >
                        {/* Your imaginary file has been deleted. */}
                    </ReactBSAlert>
                );
            }
        };
    }
    const getlist = async () => {
        setLoadingData(true);
        const resp = await SalesOrderService.getAllReq();
        if (resp.data.status == true) {
            const responsMap = resp.data.data.map((resp, key) => {
                return {
                    id: key,
                    user: resp.user_id,
                    marketplace_id: resp.marketplace_id,
                    status: resp.order_status,
                    channel_id: resp.channel_id,
                    client: resp.client_id,
                    actions: (
                        // we've added some custom button actions
                        <div className="actions-right">
                            <Button
                                justIcon
                                round
                                simple
                                color="warning"
                                className="edit"
                                onClick={() => {
                                    openModal(resp.id)
                                }}
                            >
                                <Dvr />
                            </Button>
                            <Button
                                justIcon
                                round
                                simple
                                color="danger"
                                className="remove"
                                onClick={() => {
                                    deleteClient(resp.id);
                                }}
                            >
                                <Close />
                            </Button>
                        </div>
                    ),
                }
            })
            setTableData(responsMap);
            setLoadingData(false);
        } else {
            setLoadingData(true);
        }
    }
    const getExcel = async  () =>{
        const resp = await SalesOrderService.getExcell();
        if (resp.data.status == true) {
            const responsMap = resp.data.data.map((resp) => {
                return {
                    title: resp.title,
                    address: resp.address,
                    items: resp.items,
                    order_id: resp.order_id,
                    client: resp.client,
                    phone: resp.phone,
                    sms: resp.sms,
                    sales_channel: resp.sales_channel
                }
            })
            setExcelData(responsMap);
        }
    }

    useEffect(() => {
        if (loadingData) {
            getExcel()
            getlist()
        }
    }, []);

    function handleDownloadExcel() {
        downloadExcel({
            fileName: "Ordenes de venta Hermes",
            sheet: "Ordenes de venta",
            tablePayload: {
                header:headertable,
                // accept two different data structures
                body: excelData
            }
        });
    }


    return (
        <>
            {alert}
            <GridContainer>
                <GridItem xs={12}>
                    <Card>
                        <CardHeader color="warning" icon>
                            <CardIcon color="warning">
                                <Assignment />
                            </CardIcon>
                            <h4 className={classest.cardIconTitle}>Lista de Ordenes de Venta</h4>
                            <Button
                                className="btn-round"
                                color="info"
                                onClick={handleDownloadExcel}
                            > Exportar a Excel
                            </Button>
                        </CardHeader>
                        <CardBody>
                            {loadingData ? (
                                <h4> Buscando los datos... </h4>
                            ) : (
                                <ReactTable
                                    columns={[
                                        {
                                        Header: "Usuario",
                                        accessor: "user",
                                    },
                                        {
                                        Header: "Orden",
                                        accessor: "marketplace_id",
                                    },
                                        {
                                            Header: "Canal de Venta",
                                            accessor: "channel_id",
                                    },
                                        {
                                        Header: "Status",
                                        accessor: "status",
                                    },
                                        {
                                        Header: "Cliente",
                                        accessor: "client",
                                    },
                                        {
                                        Header: "Actions",
                                        accessor: "actions",
                                    },
                                    ]}
                                    data={tableData}
                                />
                            )}
                        </CardBody>
                    </Card>
                </GridItem>
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
                        message="Verifica los datos"
                        open={errNoti}
                        closeNotification={() => {
                            setErrorNoti(false)
                        }}
                        close
                    />
                </GridItem>
            </GridContainer>
            <Dialog
                classes={{
                    root: classes.center + " " + classes.modalRoot,
                    paper: classes.modal.lg,
                }}
                open={modalForm}
                TransitionComponent={Transition}
                onClose={() => {
                    openModal()
                }}
                fullWidth
                maxWidth="lg"
                aria-labelledby="notice-modal-slide-title"
                aria-describedby="notice-modal-slide-description"
            >
                <DialogTitle
                    id="notice-modal-slide-title"
                    disableTypography
                    className={classes.modalHeader}
                >
                    <Button
                        justIcon
                        className={classes.modalCloseButton}
                        key="close"
                        aria-label="Close"
                        color="transparent"
                        onClick={() => {
                            openModal()
                        }}
                    >
                        <Close className={classes.modalClose} />
                    </Button>
                    <h4 className={classes.modalTitle}>Orden de Venta {dataform.id}</h4>
                </DialogTitle>
                <DialogContent
                    id="notice-modal-slide-description"
                    className={classes.modalBody}
                >
                    <GridContainer>
                        <GridItem xs={12} sm={6}>
                            <Card>
                                <CardHeader color="info" text>
                                    <CardText color="info">
                                        <h4 className={classest.cardTitle}>Detalles de la Orden</h4>
                                        <p className="card-category">Market Order: {dataform.orderMarketId}</p>
                                    </CardText>
                                </CardHeader>
                                <CardBody>
                                    <ul>
                                        <li>Marketplace: {dataform.orderMarketplace}</li>
                                        <li>Fecha de la Orden: {dataform.orderDate}</li>
                                        <li>Status: {dataform.orderStatus}</li>
                                        <li>Precio: ${dataform.orderTotal}</li>
                                        <li>Fecha de la Entrega: {dataform.orderEntrega}</li>
                                    </ul>
                                </CardBody>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={6}>
                            <Card>
                                <CardHeader color="info" text>
                                    <CardText color="info">
                                        <h4 className={classest.cardTitle}>Detalles del Cliente</h4>
                                        <p className="card-category">Nombre: {dataform.clientName}</p>
                                    </CardText>
                                </CardHeader>
                                <CardBody>
                                    <GridContainer>
                                        <GridItem xs={12} sm={6}>
                                            <ul>
                                                <li>Calle y numero: {dataform.clientStreet}</li>
                                                <li>Interior: {dataform.clientInter}</li>
                                                <li>Colonia: {dataform.clientColo}</li>
                                                <li>Municipio: {dataform.clientMuni}</li>
                                                <li>Codigo Postal: {dataform.clienZipcode}</li>
                                            </ul>
                                        </GridItem>
                                        <GridItem xs={12} sm={6}>
                                            <ul>
                                                 <li>Entre calles: {dataform.clienBStreets}</li>
                                                <li>Referencias: {dataform.clienreference}</li>
                                                <li>Celular: {dataform.clientTel}</li>
                                                <li>Correo: {dataform.clientEmail}</li>
                                            </ul>
                                        </GridItem>
                                    </GridContainer>
                                </CardBody>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={12}>
                            <Card>
                                <CardHeader color="warning" text>
                                    <CardText color="warning">
                                        <h4 className={classest.cardTitle}>Articulos de la Orden</h4>
                                        <p className="card-category">Numero de Articulos: {dataform.market_order_id}</p>
                                    </CardText>
                                </CardHeader>
                                <CardBody>
                                    <Table
                                        tableHead={["#","Sku","Nombre","Cantidad","Precio"]}
                                        tableData={orderItems}
                                        customCellClasses={[
                                            clasessTable.center,
                                            clasessTable.right,
                                            clasessTable.right
                                        ]}
                                        // 0 is for classes.center, 4 is for classes.right, 5 is for classes.right
                                        customClassesForCells={[0, 4, 5]}
                                        customHeadCellClasses={[
                                            clasessTable.center,
                                            clasessTable.right,
                                            clasessTable.right
                                        ]}
                                        // 0 is for classes.center, 4 is for classes.right, 5 is for classes.right
                                        customHeadClassesForCells={[0, 4, 5]}
                                    />
                                </CardBody>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </DialogContent>
                <DialogActions
                    className={
                        classes.modalFooter + " " + classes.modalFooterCenter
                    }
                >
                </DialogActions>
            </Dialog>

        </>
    );
}