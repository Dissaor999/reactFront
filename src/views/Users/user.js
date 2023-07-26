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

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

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

import * as UserServices from "components/User/userService.js";
import styles from "assets/jss/material-dashboard-pro-react/views/notificationsStyle.js";
import stylesselect from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";
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
const useStylesSele = makeStyles(stylesselect);
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function UserList() {
    const [dataform, setDataForm] = useState({
        id: "",
        name: "",
        email: "",
        password: "", 
        permissions: ""
    })
    const [loadingData, setLoadingData] = useState(true)
    const [clients, setClients] = useState()
    const classest = useStylest();
    const classes = useStyles();
    const classesSelect = useStylesSele();
    const [modalForm, setModalForm] = useState(false)
    const [alert, setAlert] = useState(null)
    const [succesNoti, setSuccesNoti] = useState(false)
    const [errNoti, setErrorNoti] = useState(false)
    const [errorstring, setErrorString] = useState("")
    const [multipleSelect, setMultipleSelect] = useState([])
    const handleMultiple = event => {
        setMultipleSelect(event.target.value);
    };

    const hideAlert = () => {
        setModalForm(false)
        setAlert(null);
    };

    const hideAlertok = () => {
        setAlert(null);
        setModalForm(false)
        getList();
    };

    const openModal = async (userId = 0) => {
        if (userId != 0) {
            getId(userId)
        } else {
            setDataForm({
                id: "",
                name: "",
                email: "",
                password: "",
                permissions: ""
            })
            setModalForm(!modalForm)
        }

    }
    const getId = async (id) => {
        setModalForm(false)
        const resp = await UserServices.getId(id);
        if (resp.data.success == true) {
            setDataForm(() => {
                return {
                    id: resp.data.data.id,
                    email: resp.data.data.email,
                    name: resp.data.data.name
                }
            })
            setModalForm(!modalForm)

        }
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
            let res = await UserServices.storerecord(dataform, multipleSelect);
            if (res.status == true) {
                showNotification("succ")
            } else {
                let error = JSON.stringify(res.error)
                console.log(error)
                setErrorString(error)
                showNotification("err")

            }
        } else {
            let res = await UserServices.updateRecords(dataform,multipleSelect);
            if (res.status == true) {
                showNotification("succ")
            } else {
                let error = JSON.stringify(res.error)
                console.log(error)
                setErrorString(error)
                showNotification("err")
            }
        }
        getList();
    }
    const deleteClient = async (id) => {
        let mystyle = {
            color: "success",
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
            const req = await UserServices.deleteRecord(id);
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
            email: "",
            password: "",
            permissions: ""
        })
    }
    const getList = async () => {
        setLoadingData(true);
        const respu = await UserServices.getAll();
        console.log(respu.data);
        if (respu.data.status == true) {
            const clientMap = respu.data.data.map((user, key) => {
                return {
                    id: key,
                    name: user.name,
                    email: user.email,
                    permissions: user.permissions,
                    status: user.status,
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
                                    openModal(user.id)
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
                                    deleteClient(user.id);
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
            setModalForm(false)
            getList()
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
                            <h4 className={classest.cardIconTitle}>Lista de Usuarios</h4>
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
                                            Header: "Email",
                                            accessor: "email",
                                        },
                                        {
                                            Header: "Permisos",
                                            accessor: "permissions"
                                        },
                                        {
                                            Header: "Estado",
                                            accessor: "status"
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
                    <h4 className={classes.modalTitle}>Formulario de Usuarios {dataform.id}</h4>
                </DialogTitle>
                <DialogContent
                    id="notice-modal-slide-description"
                    className={classes.modalBody}
                >
                    <GridContainer>
                        <GridItem xs={12} sm={6} md={5} lg={5}>
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
                        <GridItem xs={12} sm={6} md={5} lg={5}>
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
                        <GridItem xs={12} sm={6} md={5} lg={5}>
                            <CustomInput
                                id="passwordImput"
                                labelText="Password"
                                formControlProps={{
                                    fullWidth: true,
                                }}
                                inputProps={{
                                    type: "password",
                                    name: "password",
                                    onChange: (event) => {
                                        handleInputChange(event)
                                    },
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={5} lg={5}>
                            <FormControl fullWidth className={classesSelect.selectFormControl}>
                                <InputLabel
                                    htmlFor="multiple-select"
                                    className={classesSelect.selectLabel}
                                >
                                    Permisos
                                </InputLabel>
                                <Select
                                    multiple
                                    value={multipleSelect}
                                    onChange={handleMultiple}
                                    MenuProps={{
                                        className: classesSelect.selectMenu,
                                        classes: { paper: classesSelect.selectPaper }
                                    }}
                                    classes={{ select: classesSelect.select }}
                                    inputProps={{
                                        name: "multipleSelect",
                                        id: "multiple-select"
                                    }}
                                >
                                    <MenuItem
                                        disabled
                                        classes={{
                                            root: classesSelect.selectMenuItem
                                        }}
                                    >
                                        Permisos
                                    </MenuItem>
                                    <MenuItem
                                        classes={{
                                            root: classesSelect.selectMenuItem,
                                            selected: classesSelect.selectMenuItemSelectedMultiple
                                        }}
                                        value="admin"
                                    >
                                        Administrador
                                    </MenuItem>
                                    <MenuItem
                                        classes={{
                                            root: classesSelect.selectMenuItem,
                                            selected: classesSelect.selectMenuItemSelectedMultiple
                                        }}
                                        value="invoice"
                                    >
                                        Facturador
                                    </MenuItem>
                                    <MenuItem
                                        classes={{
                                            root: classesSelect.selectMenuItem,
                                            selected: classesSelect.selectMenuItemSelectedMultiple
                                        }}
                                        value="seller"
                                    >
                                        Vendedor
                                    </MenuItem>
                                    <MenuItem
                                        classes={{
                                            root: classesSelect.selectMenuItem,
                                            selected: classesSelect.selectMenuItemSelectedMultiple
                                        }}
                                        value="logistic"
                                    >
                                        Logistica
                                    </MenuItem>
                                </Select>
                            </FormControl>
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