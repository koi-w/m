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

async function test(){
    // let result = await fetch.get('/api/listmore.json?pageNo=2&pageSize=15');
    // let result = await fetch.get('/ymt/guess/api/getGuessLikeProducts?callback=cb&pageIndex=1&pageSize=20&_=1555765740258')
    let result = await fetch.get('/juooo/Search/getShowList?category=35&city_id=0&page=2&&version=5.1.4&referer=2')
    console.log(JSON.parse(result).data.list)
}

export default {
    test
}
