//import moment from "moment";
import axios from "axios"

import { productionUrl, headers } from "variables/config.js";

const getall = '/user/get-permission'
const getid = '/user/get-permission/'


export const getAll = async () => {

    return await axios.get(productionUrl + getall, {
        headers
    })

}

export const getId = async (id) => {

    return await axios.get(productionUrl + getid + id, {
        headers
    })

}

export const storerecord = async (dataform) => {
    const body = {
        name: dataform.name,
        password: dataform.password,
        email: dataform.email
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

export const updateRecords = async (dataform) => {
    const body = {
        id: dataform.id,
        name: dataform.name,
        password: dataform.password,
        email: dataform.email
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







