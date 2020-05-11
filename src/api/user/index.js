import http from "@utils/request.js"


export const userApi = (username, password,identity) => http({
    method: "post",
    url: "/node/users/register",
    data: {
        username: username,
        password: password,
        identity:identity,
    }
})
export const useridApi = (id) => http({
    method: "post",
    url: "/node/users/gain",
    data: {
        id: id,
    }
})
export const userpassword = (password,pass,username) => http({
    method: "post",
    url: "/node/users/password",
    data: {
        password,pass,username
    }
})

export const usermodify = (id) => http({
    method: "post",
    url: "/node/users/usermodify",
    data: {
        id: id,
    }
})
export const messageid = (id) => http({
    method: "post",
    url: "/node/users/message",
    data: {
        id: id,
    }
})
export const messageMdf = (id,manage) => http({
    method: "post",
    url: "/node/users/messageMdf",
    data: {
        id: id,
        manage
    }
})
export const messagedel = (id) => http({
    method: "post",
    url: "/node/users/messagedel",
    data: {
        id: id,
    }
})
export const usermanyApi = (id) => http({
    method: "post",
    url: "/node/users/alluser",
    data: {
    }
})
export const userProhibit = (id,status) => http({
    method: "post",
    url: "/node/users/Prohibit",
    data: {
        id,
        status
    }
})
export const userDelApi = (id) => http({
    method: "post",
    url: "/node/users/userdel",
    data: {
        id,
    }
})
export const userDataApi = ( ruleForm) => http({
    method: "post",
    url: "/node/users/modify",
    data: {
        name:ruleForm.name,
        img:ruleForm.urlPic,
        id:ruleForm._id,
    }
})
export const loginApi = (username,password)=>http({
    method:"post",
    url:"node/users/login",
    data:{
        username: username,
        password: password,
    }
})
export const uploadApi = (formData)=>http({
    method:"post",
    url:"node/upload/urlImage",
    data:formData, 
    processData: false,
    cache: false,
    // contentType: "multipart/form-data",
    headers: { "content-type": "multipart/form-data" }
})

