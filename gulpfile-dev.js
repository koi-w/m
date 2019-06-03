//gulp 4.0.2 写法
const {src,dest,series,parallel,watch} = require('gulp')
const gulpwebserver = require('gulp-webserver')
const webpackStream = require('webpack-stream')
const path = require('path')
const gulpSass = require('gulp-sass')
const proxy = require('http-proxy-middleware')
const del = require('del')


function copyhtml(){
    return src('./*.html').pipe(dest('./dev/'))
}
function artTemplate(){
    return src('./node_modules/art-template/lib/template-web.js').pipe(dest('./dev/lib/'))
}
function copylibs(){
    return src('./src/libs/**/*').pipe(dest('./dev/lib/'))
}
function copyimages(){
    return src('./src/images/**/*').pipe(dest('./dev/images/'))
}
function copyicons(){
    return src('./src/icons/**/*').pipe(dest('./dev/icons/'))
}
function packjs(){
    return src('./src/**.*').pipe(webpackStream({
        mode : 'development',
        entry : {
            app : './src/app.js'
        },
        output : {
            filename : '[name].js',
            path : path.resolve(__dirname,'./dev')
        },
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['@babel/plugin-transform-runtime']
                        }
                    }
                },
                {   test: /\.html$/,
                    loader: "string-loader" 
                }
            ]
        }
        
    })).pipe(dest('./dev/scripts'))
}
function packCss(){
    return src('./src/styles/app.scss')
            .pipe(gulpSass().on('error',gulpSass.logError))
            .pipe(dest('./dev/styles'))
}
function webserver(){
    return src('./dev').pipe(gulpwebserver({
        livereload: true,
        // open: true,
        port: 8000,
        // directoryListing: true,
        middleware : [
            proxy('/api',{
                target: 'https://m.lagou.com',
                changeOrigin: true,     //访问不同的域名，设置为true
                pathRewrite:{
                    '^/api':''
                }
            }),
            proxy('/json',{
                target: 'http://localhost:9000',
                pathRewrite:{
                    '^/json':''
                }
            })
        ]
      }))
}
function watcher(){
    // watch('./src/libs/**/*',series())
    watch('./*.html',series(copyhtml))
    watch('./src/images/**/*',series(clear('./dev/images'),copyimages))
    watch('./src/icons/**/*',series(copyicons))
    watch('./src/styles/**/*',series(packCss))
    watch(['./src/**/*','!./src/libs/**/*','!./src/styles/**/*','!./src/images/**/*','!./src/icons/**/*'],series(packjs))
}

function clear(target){
    return function(){
        return del(target)
    }
}

exports.default = series(parallel(packCss,packjs,artTemplate,copyimages,copyicons,copylibs),copyhtml,webserver,watcher)
