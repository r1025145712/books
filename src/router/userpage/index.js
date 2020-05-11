export default {
    path: "/user",
    component: _ => import("@user/home"),
    name: "user2",
    meta: {
        title: "首页",
        tabBarFlag: false,
        requiredAuth: false
    },
    children: [
        {
            path: "/user",
            redirect: "/user/jingxuan"
        },
        {
        path: "mine",
        component: _ => import("@user/mine"),
        name: "mine2",
        meta: {
            title: "个人中心",
            tabBarFlag: true,
            requiredAuth: false
        }
    },
    {
        path: "bookshelf",
        component: _ => import("@user/bookshelf"),
        name: "bookshelf",
        meta: {
            title: "书架",
            tabBarFlag: true,
            requiredAuth: false
        }
    },
    {
        path: "jingxuan",
        component: _ => import("@user/jingxuan"),
        name: "jingxuan",
        meta: {
            title: "小森阅读",
            tabBarFlag: true,
            requiredAuth: false
        },
    },
    {
        path: "hotlist",
        component: _ => import("@components/bookslist"),
        name: "hotlist",
        meta: {
            title: "热门小说",
            tabBarFlag: false,
            requiredAuth: false
        },
    },
    {
        path: "editlist",
        component: _ => import("@components/editlist"),
        name: "editlist",
        meta: {
            title: "编辑推荐",
            tabBarFlag: false,
            requiredAuth: false
        },
    },
    {
        path: "newbooks",
        component: _ => import("@components/newbooks"),
        name: "newbooks",
        meta: {
            title: "新书抢先",
            tabBarFlag: false,
            requiredAuth: false
        },
    },
    {
        path: "collect",
        component: _ => import("@components/collect"),
        name: "collect",
        meta: {
            title: "书友收藏",
            tabBarFlag: false,
            requiredAuth: false
        },
    },
    {
        path: "classify",
        component: _ => import("@user/classify"),
        name: "classify",
        meta: {
            title: "分类",
            tabBarFlag: false,
            requiredAuth: false
        },
    },
    {
        path: "serialize",
        component: _ => import("@user/serialize"),
        name: "serialize",
        meta: {
            title: "连载",
            tabBarFlag: false,
            requiredAuth: false
        },
    },
    {
        path: "oldbooks",
        component: _ => import("@user/oldbooks"),
        name: "oldbooks",
        meta: {
            title: "完本",
            tabBarFlag: false,
            requiredAuth: false
        },
    },
    {
        path: "ranking",
        component: _ => import("@user/ranking"),
        name: "ranking",
        meta: {
            title: "排行",
            tabBarFlag: false,
            requiredAuth: false
        },
    },
    {
        path: "details",
        component: _ => import("@components/details"),
        name: "details",
        meta: {
            title: "详情",
            tabBarFlag: false,
            requiredAuth: false
        },
    },
    {
        path: "mulu",
        component: _ => import("@components/details/mulu"),
        name: "mulu",
        meta: {
            title: "目录",
            tabBarFlag: false,
            requiredAuth: false
        },
    },
    {
        path: "content",
        component: _ => import("@components/details/content"),
        name: "content",
        meta: {
            title: "正文",
            tabBarFlag: false,
            requiredAuth: false
        },
    },
    {
        path: "search",
        component: _ => import("@components/search"),
        name: "search",
        meta: {
            title: "搜索",
            tabBarFlag: false,
            requiredAuth: false
        },
    },
    {
        path: "register",
        component: _ => import("@user/register"),
        name: "register",
        meta: {
            title: "账户登陆注册",
            tabBarFlag: false,
            requiredAuth: false
        },
    },
    {
        path: "usermess",
        component: _ => import("@user/usermess"),
        name: "usermess",
        meta: {
            title: "修改资料",
            tabBarFlag: false,
            requiredAuth: false
        },
    },
    {
        path: "userwomen",
        component: _ => import("@user/userwomen"),
        name: "userwomen",
        meta: {
            title: "关于我们",
            tabBarFlag: false,
            requiredAuth: false
        },
    },
    {
        path: "message",
        component: _ => import("@user/message"),
        name: "message",
        meta: {
            title: "消息通知",
            tabBarFlag: false,
            requiredAuth: false
        },
    },
    {
        path: "comment",
        component: _ => import("@components/details/comment"),
        name: "comment",
        meta: {
            title: "更多书评",
            tabBarFlag: false,
            requiredAuth: false
        },
    }
    
    ]
}