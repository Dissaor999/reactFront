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

import * as ClientServices from "components/salesOrders/ClientsServices.js";
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

export default function ClientsTable() {
    const [dataform, setDataForm] = useState({
        id: "",
        name: "",
        rfc: "",
        address: "",
        phone: "",
        email: "",
        street_and_number: "",
        interior_number: "",
        colony: "",
        municipality: "",
        postcode: "",
        between_streets: "",
        reference: ""
    })
    const [loadingData, setLoadingData] = useState(true)
    const [clients, setClients] = useState()
    const classest = useStylest();
    const classes = useStyles();
    const [modalForm, setModalForm] = useState(false)
    const [alert, setAlert] = useState(null)
    const [succesNoti, setSuccesNoti] = useState(false)
    const [errNoti, setErrorNoti] = useState(false)
    const [errorstring, setErrorString] = useState("")
    const hideAlert = () => {
        setAlert(null);
    };
    const hideAlertok = () => {
        setAlert(null);
        getClientslist();
    };
    const openModal = async (clientId) => {
        if (clientId) {
            getClientId(clientId)
        }else{
            setDataForm(() => {
                return {
                    id: "",
                    name: "",
                    rfc: "",
                    address: "",
                    phone: "",
                    email: "",
                    street_and_number: "",
                    interior_number: "",
                    colony: "",
                    municipality: "",
                    postcode: "",
                    between_streets: "",
                    reference: ""
                }
            })
            setModalForm(!modalForm)
        }
    }
    const getClientId = async (id) => {
        const resp = await ClientServices.getClientid(id);
        if (resp.data.success == true) {
            setDataForm(() => {
                return {
                    id: resp.data.data.id,
                    name: resp.data.data.name,
                    rfc: resp.data.data.rfc,
                    phone: resp.data.data.phone,
                    email: resp.data.data.email,
                    street_and_number: resp.data.data.street_and_number,
                    interior_number: resp.data.data.interior_number,
                    colony:resp.data.data.colony,
                    municipality: resp.data.data.municipality,
                    postcode: resp.data.data.postcode,
                    between_streets: resp.data.data.between_streets,
                    reference: resp.data.data.reference
                }
            })

        }
        setModalForm(!modalForm)
        console.log(resp.data.data)
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
            let res = await ClientServices.storeClient(dataform);
            if (res.status == true) {
                showNotification("succ")
                setModalForm(!modalForm)
            } else {
                let error = JSON.stringify(res.error)
                console.log(error)
                setErrorString(error)
                showNotification("err")
                setModalForm(!modalForm)

            }
        } else {
            let res = await ClientServices.updateClient(dataform);
            if (res.status == true) {
                showNotification("succ")
                setModalForm(!modalForm)
            } else {
                let error = JSON.stringify(res.error)
                console.log(error)
                setErrorString(error)
                showNotification("err")
                setModalForm(!modalForm)
            }
        }
        getClientslist(true);
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
            const req = await ClientServices.deleteClient(id);
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
        setDataForm({
            id: "",
            name: "",
            rfc: "",
            address: "",
            phone: "",
            email: ""
        })
    }
    const getClientslist = async () => {
        setLoadingData(true);
        const resp = await ClientServices.getAllClients();
        //console.log(resp.data.status);
        if (resp.data.status == true) {
            const clientMap = resp.data.data.map((client, key) => {
                return {
                    id: key,
                    name: client.name,
                    street_and_number: client.street_and_number,
                    rfc: client.rfc,
                    phone: client.phone,
                    email: client.email,
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
                                    openModal(client.id)
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
                                    deleteClient(client.id);
                                }}
                            >
                                <Close />
                            </Button>{" "}
                        </div>
                    ),
                }
            })
            setClients(clientMap);
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
            getClientslist()
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
                            <h4 className={classest.cardIconTitle}>Lista de Clientes</h4>
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
                                            Header: "Calle y Mumero",
                                            accessor: "street_and_number",
                                        },
                                        {
                                            Header: "Rfc",
                                            accessor: "rfc",
                                        },
                                        {
                                            Header: "Telefono",
                                            accessor: "phone",
                                        },
                                        {
                                            Header: "Email",
                                            accessor: "email",
                                        },
                                        {
                                            Header: "Actions",
                                            accessor: "actions",
                                        },
                                    ]}
                                    data={clients}
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
                        message={errorstring}
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
                    <h4 className={classes.modalTitle}>Formulario de Clientes {dataform.id}</h4>
                </DialogTitle>
                <DialogContent
                    id="notice-modal-slide-description"
                    className={classes.modalBody}
                >
                    <GridContainer>
                        <GridItem xs={12} sm={6}>
                            <CustomInput
                                id="clientNameImput"
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
                                id="clientRfcImput"
                                labelText="RFC"
                                formControlProps={{
                                    fullWidth: true,
                                }}
                                inputProps={{
                                    type: "text",
                                    defaultValue: dataform.rfc,
                                    name: "rfc",
                                    onChange: (event) => {
                                        handleInputChange(event)
                                    },
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={4}>
                            <CustomInput
                                id="clientstreetandaddressImput"
                                labelText="Calle y Numero"
                                name="street_and_number"
                                formControlProps={{
                                    fullWidth: true,
                                }}
                                inputProps={{
                                    type: "text",
                                    defaultValue: dataform.street_and_number,
                                    name: "street_and_number",
                                    onChange: (event) => {
                                        handleInputChange(event)
                                    },
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={2}>
                            <CustomInput
                                id="clientinteriorImput"
                                labelText="Interior"
                                name="interior_number"
                                formControlProps={{
                                    fullWidth: true,
                                }}
                                inputProps={{
                                    type: "text",
                                    defaultValue: dataform.interior_number,
                                    name: "interior_number",
                                    onChange: (event) => {
                                        handleInputChange(event)
                                    },
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={3}>
                            <CustomInput
                                id="clientcolonyImput"
                                labelText="Colonia"
                                name="colony"
                                formControlProps={{
                                    fullWidth: true,
                                }}
                                inputProps={{
                                    type: "text",
                                    defaultValue: dataform.colony,
                                    name: "colony",
                                    onChange: (event) => {
                                        handleInputChange(event)
                                    },
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={3}>
                            <CustomInput
                                id="clientmunicipalityImput"
                                labelText="Municipio"
                                name="municipality"
                                formControlProps={{
                                    fullWidth: true,
                                }}
                                inputProps={{
                                    type: "text",
                                    defaultValue: dataform.municipality,
                                    name: "municipality",
                                    onChange: (event) => {
                                        handleInputChange(event)
                                    },
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={2}>
                            <CustomInput
                                id="clientpostcodeImput"
                                labelText="Codigo Postal"
                                name="postcode"
                                formControlProps={{
                                    fullWidth: true,
                                }}
                                inputProps={{
                                    type: "text",
                                    defaultValue: dataform.postcode,
                                    name: "postcode",
                                    onChange: (event) => {
                                        handleInputChange(event)
                                    },
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={5}>
                            <CustomInput
                                id="clienstrsmput"
                                labelText="Entre calles"
                                name="between_streets"
                                formControlProps={{
                                    fullWidth: true,
                                }}
                                inputProps={{
                                    type: "text",
                                    defaultValue: dataform.between_streets,
                                    name: "between_streets",
                                    onChange: (event) => {
                                        handleInputChange(event)
                                    },
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={5}>
                            <CustomInput
                                id="clientreferenceImput"
                                labelText="Referencias"
                                name="reference"
                                formControlProps={{
                                    fullWidth: true,
                                }}
                                inputProps={{
                                    type: "text",
                                    defaultValue: dataform.reference,
                                    name: "reference",
                                    onChange: (event) => {
                                        handleInputChange(event)
                                    },
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={6}>
                            <CustomInput
                                id="clientEmailImput"
                                labelText="Email"
                                formControlProps={{
                                    fullWidth: true,
                                }}
                                inputProps={{
                                    type: "text",
                                    defaultValue: dataform.email,
                                    name: "email",
                                    onChange: (event) => {
                                        handleInputChange(event)
                                    },
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={6}>
                            <CustomInput
                                id="clientPhoneImput"
                                labelText="Telefono"
                                formControlProps={{
                                    fullWidth: true,
                                }}
                                inputProps={{
                                    type: "text",
                                    defaultValue: dataform.phone,
                                    name: "phone",
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