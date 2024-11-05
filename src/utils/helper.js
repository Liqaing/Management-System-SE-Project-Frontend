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

export const storeUserProfileData = (res) =>{
    localStorage.setItem('username',res.username);
    localStorage.setItem('role',res.role);
    localStorage.setItem('userImage',res.userImage);
    localStorage.setItem('user',JSON.stringify(res.data));
}

export const getUser = () => {
    var user = localStorage.getItem("user");
    if(!isEmptyOrNull(user)){
        user = JSON.parse(user);
        return user;
    }else{
        //can logout
        return {};
    }
}