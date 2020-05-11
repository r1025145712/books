import {
  Select, Option, Menu, Table,
  TableColumn, Container,Tabs,Backtop, TabPane, Popconfirm,Scrollbar,Tag,Pagination,Avatar, Popover, Submenu, MenuItem, Header, Aside, Main, OptionGroup, Button, Message, Input, Tree, Dialog, Row, Col, Form, FormItem, Alert
} from 'element-ui'
const element = {
  install: function (Vue) {
    Vue.use(Select)
    Vue.use(Option)
   Vue.use(Backtop)
    Vue.use(OptionGroup)
    Vue.use(Tree)
    Vue.use(Dialog)
    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Tag)
    Vue.use(Table)
    Vue.use(Tabs)
    Vue.use(TabPane)
    Vue.use(TableColumn)
    Vue.use(Popover)
    Vue.use(Form)
    Vue.use(Popconfirm)
    Vue.use(Button)
    Vue.use(Input)
    Vue.use(Header)
    Vue.use(Aside)
    Vue.use(Main)
    Vue.use(Submenu)
    Vue.use(MenuItem)
    Vue.use(Menu)
    Vue.use(Pagination)
    Vue.use(Container)
    Vue.use(FormItem)
    Vue.use(Alert)
    Vue.use(Avatar)
    Vue.use(Scrollbar)
    Vue.component(Message)
    Vue.prototype.$message = Message
  }
}
export default element