// 实现这个项目的构建任务
const { src, dest, parallel, series, watch } = require('gulp')

const del = require('del')
const browserSync = require('browser-sync')
const bs = browserSync.create()

const loadPlugins = require('gulp-load-plugins')
const plugins = loadPlugins()

/**
 * 基础数据
 */
const data = {
    menus: [{
            name: 'Home',
            icon: 'aperture',
            link: 'index.html'
        },
        {
            name: 'Features',
            link: 'features.html'
        },
        {
            name: 'About',
            link: 'about.html'
        },
        {
            name: 'Contact',
            link: '#',
            children: [{
                    name: 'Twitter',
                    link: 'https://twitter.com/w_zce'
                },
                {
                    name: 'About',
                    link: 'https://weibo.com/zceme'
                },
                {
                    name: 'divider'
                },
                {
                    name: 'About',
                    link: 'https://github.com/zce'
                }
            ]
        }
    ],
    pkg: require('./package.json'),
    date: new Date()
}

/**
 * 清理目录
 */
const clean = () => {
    return del(['dist', 'temp'])
}

/**
 * 样式编译
 */
const style = () => {
    return src('src/assets/styles/*.scss', { base: 'src' })
        .pipe(plugins.sass({ outputStyle: 'expanded' }))
        .pipe(dest('temp'))
        .pipe(bs.reload({ stream: true }))
}

/**
 * 脚本编译
 */
const script = () => {
    return src('src/assets/scripts/*.js', { base: 'src' })
        .pipe(plugins.babel({ presets: ['@babel/preset-env'] })) //babel本身不做es6转换 最新ECMAScirpt转换
        .pipe(dest('temp'))
        .pipe(bs.reload({ stream: true }))
}

/**
 * 模板编译
 */
const page = () => {
    return src('src/*.html', { base: 'src' })
        .pipe(plugins.swig({ data, defaults: { cache: false } })) //使用BrowserSync等查看/编译html模板时，避免缓存。
        .pipe(dest('temp'))
        .pipe(bs.reload({ stream: true }))
}

/**
 * 压缩图片
 */
const image = () => {
    return src('src/assets/images/**', { base: 'src' })
        .pipe(plugins.imagemin())
        .pipe(dest('dist'))
}

/**
 * 处理字体
 */
const font = () => {
    return src('src/assets/fonts/**', { base: 'src' })
        .pipe(plugins.imagemin())
        .pipe(dest('dist'))
}

/**
 * 处理其他文件
 */
const extra = () => {
    return src('public/**', { base: 'public' })
        .pipe(dest('dist'))
}

/**
 *开发服务器
 */
const server = () => {
    // 监听文件的变化，重新打包
    watch('src/assets/styles/*.scss', style)
    watch('src/assets/scripts/*.js', script)
    watch('src/*.html', page)
    watch([
        'src/assets/images/**',
        'src/assets/fonts/**',
        'public/**'
    ], bs.reload)
    bs.init({
        notify: false,
        port: 8888,
        // open: false,
        // files: 'dist/**', //监听dist下所有文件的修改
        server: {
            baseDir: ['temp', 'src', 'public'],
            routes: {
                '/node_modules': 'node_modules'
            }
        }
    })
}

/**
 * 文件合并压缩
 */
const useref = () => {
    return src('temp/*.html', { base: 'temp' })
        .pipe(plugins.useref({ searchPath: ['temp', '.'] }))
        .pipe(plugins.if(/\.js$/, plugins.uglify()))
        .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
        .pipe(plugins.if(/\.html$/, plugins.htmlmin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true
        })))
        .pipe(dest('dist'))
}

const compile = parallel(style, script, page)

//上线之前执行的任务
const build = series(clean, parallel(series(compile, useref), image, font, extra))

const develop = series(compile, server)

module.exports = {
    clean,
    build,
    develop
}