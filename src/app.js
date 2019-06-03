// es6模块化
// import {name} from './controllers/name'

//commonjs模块化
const indexTpl = require('./views/index.html')
const { list } = require('./controllers/position')

const renderedIndexTpl = template.render(indexTpl,{})

$('#app').html(renderedIndexTpl)
list()