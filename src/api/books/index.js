import http from '@utils/request'
import http2 from '@utils/request2'
// 获取书籍
export const booksListApi =(id)=>http({
    method:"get",
    url:"node/books/booksList",
    data:{
        id:id
        // page: 1,
        // limit:5
    }
})
// 获取全部书籍
export const userListApi =()=>http({
    method:"get",
    url:"node/books/booksList3",
    data:{
    }
})
// 获取分类全部书籍
export const booksList4 =(page,limit,sort)=>http2({
    method:"get",
    url:"node/books/booksList4",
    data:{
        page,
        limit,
        sort:sort
    }
})
// 根据连载获取信息
export const booksLZ=(page,limit,sort,paihang,status)=>http2({
    method:"get",
    url:"node/books/booksLZ",
    data:{
        page,
        limit,
        sort:sort,
        paihang:paihang,
        status
    }
})
// 获取作品信息
export const booksList2Api =(id)=>http({
    method:"get",
    url:"node/books/booksList2",
    data:{
        id:id
    }
})


// 上传封面
export const uploadApi = (formData)=>http({
    method:"post",
    url:"node/upload/urlImage",
    data:formData, 
    processData: false,
    cache: false,
    headers: { "content-type": "multipart/form-data" }
})

// 提交书籍
export const submitApi = ( ruleForm)=>http({
    method:"post",
    url:"node/books/addbooks",
    data:{
        userid:ruleForm.userid,
        booksAuth:ruleForm.autu,
        booksName:ruleForm.name,
        booksStatus:ruleForm.status,
        booksregion:ruleForm.region,
        booksclassify:ruleForm.classify,
        booksImg:ruleForm.booksImg,
        booksday:ruleForm.day,
        booksdesc:ruleForm.desc,
        bookszuozhe:ruleForm.zuozhe,
        booksTotal:ruleForm.total,
        booksclick:ruleForm.click,
        bookscollect:ruleForm.collect,
        upperShelf:ruleForm.upperShelf
    }
})
export const bookxiugaizi =(name)=>http({
    method:"post",
    url:"node/books/total2",
    data:{
        booksName: name
    }
})
// 推荐
export const bookstuijian =(id,tuijian,message,userid,manage)=>http({
    method:"post",
    url:"node/books/tuijian",
    data:{
        id: id,
        tuijian:tuijian,
        message,userid,manage
    }
})
// 封禁
export const booksProhibit =(id,status,message,userid,manage)=>http({
    method:"post",
    url:"node/books/prohibit",
    data:{
        id: id,
        status:status,
        message,userid,manage
    }
})
// 插入章节
export const bookInsertApi =(ruleForm,booksid,booksName)=>http({
    method:"post",
    url:"node/books/insert",
    data:{
        booksTitle:ruleForm.name,
        content:ruleForm.desc,
        authortalk:ruleForm.zuozhe,
        booksid:booksid,
        articledate:ruleForm.day,
        sizelength:ruleForm.sizelength,
        booksName:booksName
    },
})
// 发布章节
export const draftInsertApi =(ruleForm,booksid,booksName)=>http({
    method:"post",
    url:"node/books/insert",
    data:{
        booksTitle:ruleForm.title,
        content:ruleForm.content,
        authortalk:ruleForm.chapterSays,
        booksid:booksid,
        articledate:ruleForm.day,
        sizelength:ruleForm.sizelength,
        booksName:booksName
    },
})
// 插入草稿
export const bookDraftApi =(ruleForm,booksid)=>http({
    method:"post",
    url:"node/books/draft",
    data:{
        booksTitle:ruleForm.name,
        content:ruleForm.desc,
        authortalk:ruleForm.zuozhe,
        booksid:booksid,
        articledate:ruleForm.day,
        sizelength:ruleForm.sizelength
    },
})
// 修改章节
export const modifyArticle =(ruleForm,oldday,booksid)=>http({
    method:"post",
    url:"node/books/insert2",
    data:{
        booksTitle:ruleForm.title,
        content:ruleForm.content,
        authortalk:ruleForm.chapterSays,
        booksid:booksid,
        articledate:ruleForm.day,
        sizelength:ruleForm.sizelength,
        oldday:oldday
    },
})
// 修改草稿
export const modifyArticle2 =(ruleForm,oldday,booksid)=>http({
    method:"post",
    url:"node/books/draft2",
    data:{
        booksTitle:ruleForm.title,
        content:ruleForm.content,
        authortalk:ruleForm.chapterSays,
        booksid:booksid,
        articledate:ruleForm.day,
        sizelength:ruleForm.sizelength,
        oldday:oldday
    },
})
// 删除章节
export const deleteArticle =(booksid,oldday)=>http({
    method:"post",
    url:"node/books/insert3",
    data:{
      
        booksid:booksid,
        oldday:oldday
    },
})
// 删除草稿
export const deleteArticle2 =(booksid,oldday)=>http({
    method:"post",
    url:"node/books/draft3",
    data:{
      
        booksid:booksid,
        oldday:oldday
    },
})
// 删除书籍
export const booksDelApi =(id,userid,message,manage)=>http({
    method:"get",
    url:"node/books/delete",
    data:{
        id: id,
        userid,message,
        manage
    }
})

// 修改书籍
export const booksMdApi =(ruleForm)=>http({
    method:"post",
    url:"node/books/modify",
    data:{
        booksName:ruleForm.booksName,
        booksdesc:ruleForm.booksdesc,
        bookszuozhe:ruleForm.bookszuozhe,
        booksID:ruleForm._id,
        booksStatus:ruleForm.booksStatus
    }
})
// 修改书籍字数
export const booksTotal =(booksTotal,id)=>http({
    method:"post",
    url:"node/books/total",
    data:{
        booksID:id,
        booksTotal:booksTotal,
    }
})
// 修改书籍作者
export const booksAuthApi =(ruleForm)=>http({
    method:"post",
    url:"node/books/auth",
    data:{
        userid:ruleForm._id,
        booksAuth:ruleForm.name,
    }
})

// 修改图片
export const booksMdApi2 =(ruleForm)=>http({
    method:"post",
    url:"node/books/modify2",
    data:{
        booksID:ruleForm._id,
        booksImg:ruleForm.booksImg,
    }
})

// 查询书籍

export const booksSearchlApi =(name)=>http({
    method:"get",
    url:"node/books/search",
    data:{
        name: name
    }
})
// 查询书籍

export const booksSearchlApi2 =(name)=>http({
    method:"get",
    url:"node/books/search2",
    data:{
        name: name
    }
})
export const booksStatusApi =(region,classify,status)=>http({
    method:"get",
    url:"node/books/category",
    data:{
        region: region,
        classify:classify,
        status:status
    }
 
})

// 查询推荐
export const recommendApi =(sort)=>http2({
    method:"get",
    url:"node/books/recommend",
    data:{
        sort
    }
 
})

// 排序

export const booksSortApi =(page,limit,category,sort)=>http2({
    method:"get",
    url: "node/books/sort",
    data: {
        page,limit,
        category:category,
        sort:sort
    },
})

// 添加文章

export const addArticle =(ruleForm,booksid)=>http({
    method:"post",
    url:"node/article/addArticle",
    data:{
        booksTitle:ruleForm.name,
        content:ruleForm.desc,
        authortalk:ruleForm.zuozhe,
        booksid:booksid,
        articledate:ruleForm.day,
    },
})


// 获取文章
export const addList =()=>http({
    method:"post",
    url:"node/article/articleList",
    data:{
        page:1,
        limit:30
    },
})



