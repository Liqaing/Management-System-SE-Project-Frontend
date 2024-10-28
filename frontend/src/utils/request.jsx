import { message } from "antd";
import axios from "axios";

export const config = {
    base_server : "http://localhost:8000/api/"
}

export const request = (url, method, param) => {
    // var  access_token = getAccessToken();
    return axios ({
        url: config.base_server + url,
        method: method,
        data: param
        // headers: {
        //     Authorization  : "Bearer "+access_token
        // }
    }).then(res => {
        return res.data;
    }).catch(err => {
        var status = err.response?.status;
        if(status === 404){
            message.error("Route not found!");
        }else if(status === 401){
            message.error("You don't has permission acceess this method!");
        }else if(status === 500){
            message.error("Internal error server!");
        }else{
            message.error(err.message);
        }
        return false;
    }).finally(final => {
        console.log(final);
    })
}

