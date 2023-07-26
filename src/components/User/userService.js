//import moment from "moment";
import axios from "axios"

import { productionUrl, headers } from "variables/config.js";

const getall = '/user'
const getid = '/user/'

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

export const storerecord = async (dataform,permissions) => {
    const body = {
        name: dataform.name,
        password: dataform.password,
        email: dataform.email,
        permissions_name: permissions
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

export const updateRecords = async (dataform,permissions) => {
    const body = {
        user_id: dataform.id,
        password: dataform.password,
        permissions_name: permissions
    };

    return await axios.post(productionUrl + '/user/update-permission', body, { headers })
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







