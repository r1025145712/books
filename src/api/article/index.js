import http from "@utils/request2.js"
// 添加文章

export const addArticle =(booksdata,userid,index,readtime,sort,first)=>http({
    method:"post",
    url:"node/article/addArticle",
    data:{
        booksid:booksdata._id,
        userid:userid,
        booksAuth:booksdata.booksAuth,
        booksImg:booksdata.booksImg,
        booksName:booksdata.booksName,
        status:false,
        bookstext:booksdata.bookstext,
        bookmark:index,
        readtime:readtime,
        sort,
        first
    },
})
export const addbooksping =(booksid,userid,name,img,textarea,readtime)=>http({
    method:"post",
    url:"node/article/addbooksping",
    data:{
        booksid,userid,name,img,textarea,readtime
    },
})
// 书架
export const modifyCollect =(id,userid,index,status,bookscollect)=>http({
    method:"post",
    url:"node/article/modifyCollect",
    data:{
        booksid:id,
        userid:userid,
        status:status,
        bookmark:index,
        bookscollect
    },
})
// 加点击
export const modifyCollect2 =(booksdata,userid,index,readtime,oldtime,booksclick,sign)=>http({
    method:"post",
    url:"node/article/modifyCollect2",
    data:{
        booksid:booksdata._id,
        userid:userid,
        readtime:readtime,
        bookmark:index,
        oldtime:oldtime,
        booksclick,
        sign
    },
})
export const modifyCollect3 =(booksdata,userid,sort,index)=>http({
    method:"post",
    url:"node/article/modifyCollect3",
    data:{
        booksid:booksdata._id,
        userid:userid,
        sort:sort,
        bookmark:index,
    },
})
export const collectInfo =(booksdata,userid)=>http({
    method:"post",
    url:"node/article/collectInfo",
    data:{
        booksid:booksdata._id,
        userid:userid,
    },
})
export const commentapi =(id)=>http({
    method:"post",
    url:"node/article/comment",
    data:{
       id
    },
})

export const collectInfo2 =(userid,status1)=>http({
    method:"post",
    url:"node/article/collectInfo2",
    data:{
        userid:userid,
        status1
    },
})
export const userReport = (message,userid,manage)=>http({
    method:"post",
    url:"node/article/userReport",
    data:{
        message,userid,manage
    }
})