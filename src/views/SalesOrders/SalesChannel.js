import React, { useEffect, useState } from "react";

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

import * as SalesChannelService from "components/salesOrders/SalesChannelService.js";

import styles from "assets/jss/material-dashboard-pro-react/views/notificationsStyle.js";
import ReactBSAlert from "react-bootstrap-sweetalert";


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
    const [alert, setAlert] = useState(null)
    const [succesNoti, setSuccesNoti] = useState(false)
    const [errNoti, setErrorNoti] = useState(false)

    const hideAlert = () => {
        setAlert(null);
    };

    const hideAlertok = () => {
        setAlert(null);
        getlist();
    };

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
        const resp = await SalesChannelService.getSalesChannelid(id);
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
            let res = await SalesChannelService.storeSalesChannel(dataform);
            if (res.status == true) {
                showNotification("succ")
                setModalForm(!modalForm)
            } else {
                showNotification("err")
                setModalForm(!modalForm)

            }
        } else {
            let res = await SalesChannelService.updateSalesChannel(dataform);
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
    const deleteRecord = async (id) => {
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
                confirmBtnBsStyle="info"
                cancelBtnBsStyle="danger"
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
            const req = await SalesChannelService.deleteSalesChannel(id);
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
        const resp = await SalesChannelService.getAllSalesChannel();
        //console.log(resp.data.status);
        if (resp.data.status == true) {
            const responsMap = resp.data.data.map((resp, key) => {
                return {
                    id: key,
                    name: resp.name,
                    access: resp.access,
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
                                    deleteRecord(resp.id);
                                }}
                            >
                                <Close />
                            </Button>{" "}
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
                            <h4 className={classest.cardIconTitle}>Lista de Canales de venta</h4>
                            <Button
                                className="btn-round"
                                color="info"
                                onClick={() => openModal()}
                            >
                                Agregar
                            </Button>
                        </CardHeader>
                        <CardBody>
                            {loadingData ? (
                                <h4> Buscando los datos... </h4>
                            ) : (
                                <ReactTable
                                    columns={[
                                        {
                                            Header: "Nombre",
                                            accessor: "name",
                                        },
                                        {
                                            Header: "Permiso",
                                            accessor: "access",
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