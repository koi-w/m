// es6模块化
// import {name} from './controllers/name'

//commonjs模块化
const Name = require('./controllers/name')
const aaTpl = require('./views/aa.art')

async function getName(){
    console.log(Name.name)
    let name = await Name.setName()
    console.log(name)
    console.log(name)
}
getName()

const newStr = template.render(aaTpl,{title: 'TomTomTom'})
console.log(newStr)