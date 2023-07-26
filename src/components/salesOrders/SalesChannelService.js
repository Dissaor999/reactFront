//import moment from "moment";
import axios from "axios"

import { productionUrl, headers } from "variables/config.js";

const getall = '/sale/channel'
const getid = '/sale/channel/'

export const getAllSalesChannel = async () => {

    return await axios.get(productionUrl + getall, {
        headers
    })

}

export const getSalesChannelid = async (id) => {

    return await axios.get(productionUrl + getid + id, {
        headers
    })
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

export const storeSalesChannel = async (dataform) => {
    const body = {
        name: dataform.name,
        access: dataform.access,
        status: true
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

export const updateSalesChannel = async (dataform) => {
    const body = {
        id: dataform.id,
        name: dataform.name,
        access: dataform.access,
        status: true
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

export const deleteSalesChannel = async (id) => {
    return await axios.delete(productionUrl + getid + id, { headers })
}







