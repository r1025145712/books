import { recommendApi, booksSortApi,booksList4,booksList2Api } from "@api/books"
let state = {
  recommend: JSON.parse(sessionStorage.getItem("recommend")) || [],
  remendata: JSON.parse(sessionStorage.getItem("remendata")) || [],
  collect: JSON.parse(sessionStorage.getItem("collect")) || [],
  sort: JSON.parse(sessionStorage.getItem("sort")) || "",
  newbooks:JSON.parse(sessionStorage.getItem("newbooks")) || [],
  booksdata:JSON.parse(sessionStorage.getItem("booksdata")) || [],
}

let actions = {
// 获取推荐
  async handleActionsRecommend({ commit }) {
    let data = await recommendApi(state.sort);
    if (data.data.status == 1) {
      commit("handleGian", data.data.list)
    }
  },
  // 获取热门
  async handleActionsRemendata({ commit }, ) {
    let booksclick = "booksclick";
    let page=1;
    let limit=20;
    let remendata = await booksSortApi(page,limit,state.sort, booksclick)
    if (remendata.data.status == 1) {
      commit("handleSort", remendata.data.list)
    }
  },
  // 获取新书
  async handleActionsNewbooks({ commit }, ) {
    let page=1;
    let limit=20;
    let newbooksdata = await booksList4(page,limit,state.sort);
    if (newbooksdata.data.status == 1) {
      commit("handleNewbooks", newbooksdata.data.list)
    }
  },
  // 获取收藏
  async handleActionsCollect({ commit }, ) {
    let page=1;
    let limit=20;
    let bookscollect = "bookscollect";
    let remendata = await booksSortApi(page,limit,state.sort, bookscollect)
    if (remendata.data.status == 1) {
      commit("handleSort1", remendata.data.list)
    }
  },
  // 获取图书信息
  async  handleActionsBooks({ commit },id ) {
    let data = await  booksList2Api(id)
    if (data.data.status == 1) {
      commit("handlebooks", data.data.list[0])
    }
  },
  handleActionsSort({ commit }, sort) {
    commit("handlefenlei", sort)
  }

}

let mutations = {
  handleGian(state, params) {
    state.recommend = params;
    // state.goodsList =[...state.goodsList,...params] ;
    sessionStorage.setItem("recommend", JSON.stringify(state.recommend))
  },
  handleSort(state, params) {
    state.remendata = params;
    sessionStorage.setItem("remendata", JSON.stringify(state.remendata))
  },
  handleSort1(state, params) {
    state.collect = params;
    sessionStorage.setItem("collect", JSON.stringify(state.collect))
  },
  handleNewbooks(state, params) {
    state.newbooks = params;
    sessionStorage.setItem("newbooks", JSON.stringify(state.newbooks))
  },
  handlefenlei(state, params) {
    state.sort = params;
    sessionStorage.setItem("sort", JSON.stringify(state.sort))
  },
  handlebooks(state, params){
    state.booksdata = params;
    sessionStorage.setItem("booksdata", JSON.stringify(state.booksdata))
  }

}


export default {
  state,
  actions,
  mutations,
  namespaced: true
}