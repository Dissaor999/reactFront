//import moment from "moment";
import axios from "axios"

import { productionUrl, headers } from "variables/config.js";

const getall = '/invoice/local'
const getAllInvoicedUrl = '/invoice/invoiced'
const getid = '/invoice/local/'


export const getAllReq = async () => {

    return await axios.get(productionUrl + getall, {
        headers
    })

}

export const getAllInvoiced = async () => {

    return await axios.get(productionUrl + getAllInvoicedUrl, {
        headers
    })

}

export const getIdReq = async (id) => {

    return await axios.get(productionUrl + getid + id, {
        headers
    })

}

export const invoicedata = async (dataform) => {
    const body = {
        'order_id': dataform.order_id,
        'paymet_method': dataform.paymet_method,
        'payment_way': dataform.payment_way,
        'cdfi_use': dataform.cdfi_use
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

export const updateItems = async () => {
    return await axios.get(productionUrl + '/join/zoho/getZohoItems', { headers })
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