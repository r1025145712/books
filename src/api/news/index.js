import http from "@utils/request.js"


// 添加文章

export const addArticle =(ruleForm)=>http({
    method:"post",
    url:"node/article/news",
    data:{
        booksTitle:ruleForm.name,
        content:ruleForm.desc,
        userid:ruleForm.userid,
        date:ruleForm.day
    },
})

// 获取、删除文章
export const addList =(id)=>http({
    method:"post",
    url:"node/article/newslist",
    data:{
        id
    },
})
// 删除新闻
export const newsdel =(id)=>http({
    method:"post",
    url:"node/article/newsdel",
    data:{
        id
    },
})
