import React, { useEffect, useState } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";


import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";


import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import ReactTable from "components/ReactTable/ReactTable.js";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";

import * as Services from "components/User/permissionService.js";



const stylest = {
    cardIconTitle: {
        ...cardTitle,
        marginTop: "15px",
        marginBottom: "0px",
    },
};


const useStylest = makeStyles(stylest);


export default function ClientsTable() {
   
    const [loadingData, setLoadingData] = useState(true)
    const [clients, setClients] = useState()
    const classest = useStylest();
    
    const getList = async () => {
        setLoadingData(true);
        const resp = await Services.getAll();
        //console.log(resp.data.status);
        if (resp.data.status == true) {
            const clientMap = resp.data.data.map((client, key) => {
                return {
                    id: key,
                    name: client.name,
                    description: client.description
                }
            })
            setClients(clientMap);
            setLoadingData(false);
        } else {
            setLoadingData(true);
        }
    }
    

    useEffect(() => {
        if (loadingData) {
            getList()
        }
    },[]);


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
                            <h4 className={classest.cardIconTitle}>Lista de Permisos</h4>
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
                                            Header: "Descripcion",
                                            accessor: "description",
                                        }
                                    ]}
                                    data={clients}
                                />
                            )}
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>

        </>
    );
}