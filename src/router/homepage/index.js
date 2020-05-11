export default {
    path: "/home",
    component: _ => import("@pages/home"),
    name: "home",
    meta: {
        title: "首页",
        tabBarFlag: false,
        requiredAuth: false
    },
    children: [
        {
            path: "/home",
            redirect: "/home/manage"
        },
        {
            path: "manage",
            component: _ => import("@pages/manage"),
            name: "manage",
            meta: {
                title: "作家专区",
                requiredAuth: false
            },
        },
        {
            path: "admin",
            component: _ => import("@pages/admin/booksadmin"),
            name: "admin",
            meta: {
                title: "管理员专区",
                requiredAuth: false
            },
        },
        {
            path: "chapter",
            component: _ => import("@pages/manage/addChapter.vue"),
            name: "chapter",
            meta: {
                title: "章节管理",
                requiredAuth: false
            },
            children:[
                {
                    path: "newChapter",
                    component: _ => import("@pages/manage/newChapter.vue"),
                    name: "newChapter",
                    meta: {
                        title: "新建章节",
                        requiredAuth: false
                    },
                },
                {
                    path: "oldtext",
                    component: _ => import("@pages/manage/oldtext.vue"),
                    name: "oldtext",
                    meta: {
                        title: "已发布",
                        requiredAuth: false
                    },
                },
                {
                    path: "draft",
                    component: _ => import("@pages/manage/draft.vue"),
                    name: "draft",
                    meta: {
                        title: "草稿",
                        requiredAuth: false
                    },
                },
                {
                    path: "bookmessage",
                    component: _ => import("@pages/manage/bookmessage.vue"),
                    name: "bookmessage",
                    meta: {
                        title: "作品信息",
                        requiredAuth: false
                    },
                }
            ]
        },
        {
            path: "bookdata",
            component: _ => import("@pages/bookdata"),
            name: "bookdata",
            meta: {
                title: "作品数据",
                requiredAuth: false
            }
        },
        {
            path: "write",
            component: _ => import("@pages/write"),
            name: "write",
            meta: {
                title: "编写作品",
                requiredAuth: false
            }
        },
        {
            path: "activity",
            component: _ => import("@pages/activity"),
            name: "activity",
            meta: {
                title: "活动专区",
                requiredAuth: false
            }
        },
        {
            path: "mine",
            component: _ => import("@pages/mine"),
            name: "mine",
            meta: {
                title: "基本信息",
                requiredAuth: false
            }
        },
        {
            path: "usermanage",
            component: _ => import("@pages/usermanage"),
            name: "usermanage",
            meta: {
                title: "用户管理",
                requiredAuth: false
            }
        },
        {
            path: "news",
            component: _ => import("@pages/news"),
            name: "news",
            meta: {
                title: "消息通知",
                requiredAuth: false
            }
        },
        {
            path: "news2",
            component: _ => import("@pages/news2"),
            name: "news2",
            meta: {
                title: "消息通知",
                requiredAuth: false
            }
        },
        {
            path: "notice",
            component: _ => import("@pages/notice"),
            name: "notice",
            meta: {
                title: "公告编写",
                requiredAuth: false
            }
        },
        {
            path: "noticelist",
            component: _ => import("@pages/noticelist"),
            name: "noticelist",
            meta: {
                title: "新闻公告",
                requiredAuth: false
            },
        },
        {
            path: "noticelist2",
            component: _ => import("@pages/noticelist2"),
            name: "noticelist2",
            meta: {
                title: "新闻公告",
                requiredAuth: false
            },
        },
        {
            path: "noticelists",
            component: _ => import("@pages/noticelist/noticelists.vue"),
            name: "noticelists",
            meta: {
                title: "新闻公告详情",
                requiredAuth: false
            },
        }
    ]  
}
