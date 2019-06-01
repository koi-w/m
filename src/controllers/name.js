// es6模块化
// export const name = 'webpack'

//commonjs模块化
module.exports = {
    name : 'webpack',
    setName : () => {
        return new Promise((reolve,reject)=>{
            setTimeout(() => {
                reolve('webpack4.0')
            },1000)
        })
    }
}
