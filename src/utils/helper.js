import moment from "moment";

export const formatDateClient = (date) =>{
    if(!isEmptyOrNull(date)){
        return moment(date).format("DD/MM/YYYY")
    }
    return null;
}

export const formatDateServer = (date) =>{
    if(!isEmptyOrNull(date)){
        return moment(date).format("YYYY-MM-DD")
    }
    return null;
}

export const isEmptyOrNull = (value) => {
    return (value == "" || value ==null || value == undefined) ? true : false
}