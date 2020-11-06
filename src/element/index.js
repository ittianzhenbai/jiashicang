import { Pagination, Table,TableColumn,Tabs,Form,Input,Select,DatePicker,Col,Option,TimePicker,FormItem,Button,Row,Loading} from 'element-ui'
const element = {
  install: function (Vue) {
    Vue.use(Pagination)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(Tabs)
    Vue.use(Form)
    Vue.use(Input)
    Vue.use(Select)
    Vue.use(DatePicker)
    Vue.use(Col)
    Vue.use(Option)
    Vue.use(TimePicker)
    Vue.use(FormItem)
    Vue.use(Button)
    Vue.use(Row)
    Vue.use(Loading)
  }
}
export default element