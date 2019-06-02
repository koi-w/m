// es6模块化
// import {name} from './controllers/name'

//commonjs模块化
const indexTpl = require('./views/index.html')

const renderedIndexTpl = template.render(indexTpl,{})

document.querySelector('#app').innerHTML = renderedIndexTpl