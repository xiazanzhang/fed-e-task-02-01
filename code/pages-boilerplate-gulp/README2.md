# Gulp项目自动化构建说明文档

## 环境准备

### 1：安装gulp

```
yarn add gulp --dev
```

### 2：安装插件

```
# babel转换
$ yarn add @babel/core @babel/preset-env gulp-babel --dev

# 压缩css
$ yarn add gulp-clean-css --dev

# 压缩html
$ yarn add gulp-htmlmin --dev

# gulp-if
# yarn add gulp-if --dev

# 压缩图片
$ yarn add gulp-imagemin --dev

# 加载插件
$ yarn add gulp-load-plugins --dev

# 编译sass
$ yarn add gulp-sass --dev

# 模板引擎
$ yarn add gulp-swig --dev

# 压缩js
$ yarn add gulp-uglify --dev

# 文件合并
$ yarn add gulp-useref --dev

# 删除文件
$ yarn add del --dev

# 浏览器同步插件
$ yarn add browser-sync --dev
```

### 3：新建gulpfile.js

```javascript
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
```

### 4：配置package.json

```
{
    "name": "pages-boilerplate",
    "version": "0.1.0",
    "private": true,
    "description": "Always a pleasure scaffolding your awesome static sites.",
    "keywords": [
        "pages-boilerplate",
        "boilerplate",
        "pages",
        "zce"
    ],
    "homepage": "https://github.com/zce/pages-boilerplate#readme",
    "bugs": {
        "url": "https://github.com/zce/pages-boilerplate/issues"
    },
    "repository": {
        "type": "git",
        "url": "git+https://github.com/zce/pages-boilerplate.git"
    },
    "license": "MIT",
    "author": {
        "name": "zce",
        "email": "w@zce.me",
        "url": "https://zce.me"
    },
    "scripts": {
        "clean": "gulp clean",
        "build": "gulp build",
        "develop": "gulp develop"
    },
    "browserslist": [
        "last 1 version",
        "> 1%",
        "maintained node versions",
        "not dead"
    ],
    "dependencies": {
        "bootstrap": "4.4.1",
        "jquery": "3.4.1",
        "popper.js": "1.16.1"
    },
    "devDependencies": {
        "@babel/core": "^7.11.6",
        "@babel/preset-env": "^7.11.5",
        "browser-sync": "^2.26.12",
        "del": "^6.0.0",
        "gulp": "^4.0.2",
        "gulp-babel": "^8.0.0",
        "gulp-clean-css": "^4.3.0",
        "gulp-htmlmin": "^5.0.1",
        "gulp-if": "^3.0.0",
        "gulp-imagemin": "^7.1.0",
        "gulp-load-plugins": "^2.0.4",
        "gulp-sass": "^4.1.0",
        "gulp-swig": "^0.9.1",
        "gulp-uglify": "^3.0.2",
        "gulp-useref": "^4.0.1"
    },
    "engines": {
        "node": ">=6"
    }
}
```



## 开始使用

```cmd
# 使用 yarn 安装依赖
$ yarn

# 清理dist目录
$ yarn clean

# 发布
$ yarn build

# 开发阶段构建
$ yarn develop
```

