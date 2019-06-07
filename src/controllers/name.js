// es6模块化
// export const name = 'webpack'

//commonjs模块化
// async function test(){
//     let result = await fetch('/api/listmore.json?pageNo=2&pageSize=15')
//     console.log(result)
// }
// module.exports = {
//     // name : 'webpack',
//     // setName : () => {
//     //     return new Promise((reolve,reject)=>{
//     //         setTimeout(() => {
//     //             reolve('webpack4.0')
//     //         },1000)
//     //     })
//     // }
//     test

// }

// exports.test = async () =>{
//     let result = await fetch('/api/listmore.json?pageNo=2&pageSize=15');
//     console.log(result)
// }


import fetch from '../models/fetch'
export default{
    async test(){
        let result = await fetch.get('/ymt/guess/api/getGuessLikeProducts?callback=cb&pageIndex=1&pageSize=20&_=1555765740258')
        console.log(result)
    }
}
