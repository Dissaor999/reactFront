//import moment from "moment";
import axios from "axios"

import { productionUrl, headers } from "variables/config.js";

const getall = '/sale/client'
const getid = '/sale/client/'


export const getAllClients = async () => {
    return await axios.get(productionUrl + getall, {
        headers
    })

}

export const getClientid = async (id) => {

    return await axios.get(productionUrl + getid + id, {
        headers
    })

}

export const storeClient = async (dataform) => {
    const body = {
        name: dataform.name,
        address: dataform.address,
        rfc: dataform.rfc,
        phone: dataform.phone,
        email: dataform.email,
        street_and_number:dataform.street_and_number,
        interior_number: dataform.interior_number,
        colony: dataform.colony,
        municipality: dataform.municipality,
        postcode: dataform.postcode,
        between_streets: dataform.between_streets,
        reference: dataform.reference
        
    };

    return await axios.post(productionUrl + getall, body, { headers })
        .then(
            function (response) {
                return response.data
            }
        ).catch(
            function (error) {
                console.log(error.response.data)
                return error.response.data
            }
        )

}

export const updateClient = async (dataform) => {
    const body = {
        id: dataform.id,
        name: dataform.name,
        address: dataform.address,
        rfc: dataform.rfc,
        phone: dataform.phone,
        email: dataform.email,
        street_and_number:dataform.street_and_number,
        interior_number: dataform.interior_number,
        colony: dataform.colony,
        municipality: dataform.municipality,
        postcode: dataform.postcode,
        between_streets: dataform.between_streets,
        reference: dataform.reference        
    };

    return await axios.put(productionUrl + getid + body.id, body, { headers })
        .then(
            function (response) {
                return response.data
            }
        ).catch(
            function (error) {
                console.log(error.response.data)
                return error.response.data
            }
        )

}

export const deleteClient = async (id) => {
    return await axios.delete(productionUrl + getid + id, { headers })
}







