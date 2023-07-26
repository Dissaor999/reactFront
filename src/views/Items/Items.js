import React, { useEffect, useState } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Close from "@material-ui/icons/Close";

import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import CustomInput from "components/CustomInput/CustomInput.js";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import ReactTable from "components/ReactTable/ReactTable.js";
import Snackbar from "components/Snackbar/Snackbar.js";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";

import * as InventoryService from "components/Inventory/InventoryService.js";

import styles from "assets/jss/material-dashboard-pro-react/views/notificationsStyle.js";



const stylest = {
    cardIconTitle: {
        ...cardTitle,
        marginTop: "15px",
        marginBottom: "0px",
    },
};

const useStyles = makeStyles(styles);
const useStylest = makeStyles(stylest);
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function SalesChannelTable() {
    const [dataform, setDataForm] = useState({
        id: "",
        name: "",
        access: ""
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
            getID(recordId)
        } else {
            setDataForm(() => {
                return {
                    id: "",
                    name: "",
                    access: ""
                }
            })
            setModalForm(!modalForm)
        }
    }
    const getID = async (id) => {
        const resp = await InventoryService.getIdReq(id);
        if (resp.success == true) {
            setDataForm(() => {
                return {
                    id: resp.data.id,
                    name: resp.data.name,
                    access: resp.data.access
                }
            })
            setModalForm(!modalForm)
        }
        console.log(resp.data)
    }
    const handleInputChange = (event) => {
        setDataForm({
            ...dataform,
            [event.target.name]: event.target.value,
        });
        console.log(dataform);
    }
    const sendForm = async (event) => {
        event.preventDefault();
        if (dataform.id == false) {
            let res = await InventoryService.storeRec(dataform);
            if (res.status == true) {
                showNotification("succ")
                setModalForm(!modalForm)
            } else {
                showNotification("err")
                setModalForm(!modalForm)

            }
        } else {
            let res = await InventoryService.updateRecord(dataform);
            if (res.status == true) {
                showNotification("succ")
                setModalForm(!modalForm)
            } else {
                showNotification("err")
                setModalForm(!modalForm)
            }
        }
        setDataForm(() => {
            return {
                id: "",
                name: "",
                access: ""
            }
        })
        getlist();
    }

    const updatezoho = async () =>{
        let res = await InventoryService.updateItems();
        if (res.success) {
            getlist()
            showNotification("succ")
            console.log("Productos Actualizados!0")
        }else{
            window.open('https://back.hermesmx.ml/getZohoCode','_blank')
        }

        //updateItems
    }
    
    const getlist = async () => {
        setLoadingData(true);
        const resp = await InventoryService.getAllReq();
        //console.log(resp.data.status);
        if (resp.data.status == true) {
            const responsMap = resp.data.data.map((resp) => {
                return {
                    id: resp.id,
                    name: resp.name,
                    sku: resp.sku,
                    upc: resp.upc,
                    price: resp.price,
                    total_stock: resp.total_stock,
                    sat_code: resp.sat_code,
                    updated: resp.updated_at_format
                }
            })
            setTableData(responsMap);
            setLoadingData(false);
        } else {
            setLoadingData(true);
        }
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
                            <h4 className={classest.cardIconTitle}>Lista de Inventario Zoho</h4>
                            <Button
                                className="btn-round"
                                color="success"
                                onClick={() => updatezoho()}
                            >
                                Actualizar Inventarios
                            </Button>
                        </CardHeader>
                        <CardBody>
                            {loadingData ? (
                                <h4> Buscando los datos... </h4>
                            ) : (
                                <ReactTable
                                    columns={[
                                        {
                                            Header: "Id",
                                            accessor: "id",
                                        },
                                        {
                                            Header: "Nombre",
                                            accessor: "name",
                                        },
                                        {
                                            Header: "Sku",
                                            accessor: "sku",
                                        },
                                        {
                                            Header: "Upc",
                                            accessor: "upc",
                                        },
                                        {
                                            Header: "Precio",
                                            accessor: "price",
                                        },
                                        {
                                            Header: "Stock",
                                            accessor: "total_stock",
                                        },
                                        {
                                            Header: "SatCode",
                                            accessor: "sat_code",
                                        },
                                        {
                                            Header: "Actualizado",
                                            accessor: "updated",
                                        }
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
                    <h4 className={classes.modalTitle}>Formulario de Canales de Venta {dataform.id}</h4>
                </DialogTitle>
                <DialogContent
                    id="notice-modal-slide-description"
                    className={classes.modalBody}
                >
                    <GridContainer>
                        <GridItem xs={12} sm={6}>
                            <CustomInput
                                id="salesChannelNAme"
                                labelText="Nombre"
                                formControlProps={{
                                    fullWidth: true,
                                }}
                                inputProps={{
                                    type: "text",
                                    defaultValue: dataform.name,
                                    name: "name",
                                    onChange: (event) => {
                                        handleInputChange(event)
                                    },
                                }}

                            />
                        </GridItem>
                        <GridItem xs={12} sm={6}>
                            <CustomInput
                                id="salesChannelAccess"
                                labelText="Permiso"
                                formControlProps={{
                                    fullWidth: true,
                                }}
                                inputProps={{
                                    type: "text",
                                    defaultValue: dataform.access,
                                    name: "access",
                                    onChange: (event) => {
                                        handleInputChange(event)
                                    },
                                }}
                            />
                        </GridItem>
                    </GridContainer>
                </DialogContent>
                <DialogActions
                    className={
                        classes.modalFooter + " " + classes.modalFooterCenter
                    }
                >
                    <Button
                        onClick={(event) => sendForm(event)}
                        color="success"
                        round
                    >
                        Enviar Datos
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    );
}