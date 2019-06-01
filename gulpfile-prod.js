const {src,dest,series,parallel} = require('gulp')
const webpackStream = require('webpack-stream')
const path = require('path')
const gulpSass = require('gulp-sass')
const rev = require('gulp-rev')
const revCollector = require('gulp-rev-collector')

function copyhtml(){
    return src('./*.html').pipe(dest('./dist/'))
}
function artTemplate(){
    return src('./node_modules/art-template/lib/template-web.js').pipe(dest('./dist/lib/'))
}
function copyimages(){
    return src('./src/images/**/*').pipe(dest('./dist/images/'))
}
function copyicons(){
    return src('./src/icons/**/*').pipe(dest('./dist/icons/'))
}
function packjs(){
    return src('./src/**.*').pipe(webpackStream({
        mode : 'production',
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
        
    }))
    .pipe(rev())
    .pipe(dest('./dist/scripts'))
    .pipe(rev.manifest())
    .pipe(dest('./rev/scripts'))
}
function packCss(){
    return src('./src/styles/app.scss')
            .pipe(gulpSass().on('error',gulpSass.logError))
            .pipe(rev())
            .pipe(dest('./dist/styles'))
            .pipe(rev.manifest())
            .pipe(dest('./rev/styles'))
}
function revColl(){
    return src(['./rev/**/*.json','./dist/*.html'])
        .pipe(revCollector())
        .pipe(dest('./dist'))
}

exports.default = series(parallel(packCss,packjs,artTemplate,copyimages,copyicons),copyhtml,revColl)
