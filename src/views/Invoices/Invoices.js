import React, { useEffect, useState } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Dvr";
import Close from "@material-ui/icons/Close";
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import CodeIcon from '@material-ui/icons/Code';

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
import ReactTable from "components/ReactTable/ReactTable.js";
import Snackbar from "components/Snackbar/Snackbar.js";


import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";

import * as InvoicesService from "components/Invoices/InvoiceService.js";


import styles from "assets/jss/material-dashboard-pro-react/views/notificationsStyle.js";

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
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function InvoiceTable()
{

    const [dataform, setDataForm] = useState({
        id: "",
        name: "",
        sat_code: ""
    })
    const [loadingData, setLoadingData] = useState(true)
    const [tableData, setTableData] = useState()
    const classest = useStylest();
    const classes = useStyles();
    const [modalForm, setModalForm] = useState(false)

    const [succesNoti, setSuccesNoti] = useState(false)
    const [errNoti, setErrorNoti] = useState(false)



    const openModal = async (recordId) => {
        if (recordId) {
            await getID(recordId)
        }
        console.log(dataform);
        setModalForm(!modalForm)
    }
    const getID = async (id) => {
        const resp = await InvoicesService.getIdReq(id)
        if (resp.data.success == true) {
            //get_sale_order_items map
            const salesOrderdata = () => {
                return {
                    id: resp.data.data.id,
                    payment_method: resp.data.data.payment_method,
                    total: resp.data.data.total,
                    uuid: resp.data.data.uuid,
                    xml: resp.data.data.url_xml,
                    pdf: resp.data.data.url_pdf,
                    get_sale_order: resp.data.data.get_sale_order,
                    get_user: resp.data.data.get_user,
                    get_client: resp.data.data.get_client,
                    get_payment_type: resp.data.data.get_payment_type,
                    get_channel: resp.data.data.get_channel,
                    }

            }
            console.log(salesOrderdata)
            setDataForm(salesOrderdata)
            setModalForm(!modalForm)
        }

    }
    const getlist = async () => {
        setLoadingData(true);
        const resp = await InvoicesService.getAllInvoiced();
        if (resp.data.success == true) {
            const responsMap = resp.data.data.map((resp, key) => {
                return {
                    id: key,
                    user_id: resp.user_id,
                    client_id: resp.client_id,
                    payment_type_id: resp.payment_type_id,
                    invoice_status: resp.invoice_status,
                    total: resp.total,
                    uuid: resp.uuid,
                    updated_at_format: resp.updated_at_format,
                    actions: (
                        // we've added some custom button actions
                        <div>
                            <Button
                                round
                                color="primary"
                                className="edit"
                                alt="xml"
                                onClick={() => {
                                    location.href=resp.url_xml;
                                }}
                            >
                                <CodeIcon /> XML
                            </Button>
                            <Button
                                round
                                color="danger"
                                className="edit"
                                onClick={() => {
                                    location.href=resp.url_pdf;
                                }}
                            >
                                <PictureAsPdfIcon /> PDF
                            </Button>
                            <Button
                                round
                                color="info"
                                className="edit"
                                onClick={() => {
                                    openModal(resp.id)
                                }}
                            >
                                <Dvr /> Detalles
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

    useEffect(() => {
        if (loadingData) {
            getlist()
        }
    }, []);


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
                            <h4 className={classest.cardIconTitle}>Lista de Facturas</h4>
                        </CardHeader>
                        <CardBody>
                            {loadingData ? (
                                <h4> Buscando los datos... </h4>
                            ) : (
                                <ReactTable
                                    columns={[
                                        {
                                            Header: "Usuario",
                                            accessor: "user_id",
                                        },
                                        {
                                            Header: "Cliente",
                                            accessor: "client_id",
                                        },
                                        {
                                            Header: "Pago",
                                            accessor: "payment_type_id",
                                        },
                                        {
                                            Header: "Status",
                                            accessor: "invoice_status",
                                        },
                                        {
                                            Header: "UUID",
                                            accessor: "uuid",
                                        },
                                        {
                                            Header: "Total",
                                            accessor: "total",
                                        },
                                        {
                                            Header: "Ultima Actividad",
                                            accessor: "updated_at_format",
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
                    <h4 className={classes.modalTitle}>Factura</h4>
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
                                        <h4 className={classest.cardTitle}>Detalles de la Factura</h4>
                                        <p className="card-category">Folio: {dataform.id}</p>
                                    </CardText>
                                </CardHeader>
                                <CardBody>
                                    <ul>

                                    </ul>
                                </CardBody>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={6}>
                            <Card>
                                <CardHeader color="info" text>
                                    <CardText color="info">
                                        <h4 className={classest.cardTitle}>Detalles del Cliente</h4>
                                        <p className="card-category">Nombre:</p>
                                    </CardText>
                                </CardHeader>
                                <CardBody>
                                    <GridContainer>
                                        <GridItem xs={12} sm={6}>
                                            <ul>

                                            </ul>
                                        </GridItem>
                                        <GridItem xs={12} sm={6}>
                                            <ul>

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
                                        <p className="card-category">Numero de Articulos: </p>
                                    </CardText>
                                </CardHeader>
                                <CardBody>

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