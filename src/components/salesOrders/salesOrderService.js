//import moment from "moment";
import axios from "axios"

import { productionUrl, headers } from "variables/config.js";

const getall = '/sale/order'
const getid = '/sale/order/'

export const getAllReq = async () => {

    return await axios.get(productionUrl + getall, {
        headers
    })

}

export const getIdReq = async (id) => {

    return await axios.get(productionUrl + getid + id, {
        headers
    })

}

export const storeRec = async (dataform) => {
    

    return await axios.post(productionUrl + getall, dataform, { headers })
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

export const updateRecord = async (dataform) => {
    const body = {
        id: dataform.id,
        name: dataform.name,
        address: dataform.address,
        rfc: dataform.rfc,
        phone: dataform.phone,
        email: dataform.email,
        status: 0
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

export const deleteRecord = async (id) => {
    return await axios.delete(productionUrl + getid + id, { headers })
}

export const getExcell = async  () => {
    return await axios.get(productionUrl + '/sale/export', {
        headers
    })
}







