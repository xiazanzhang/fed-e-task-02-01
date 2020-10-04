# Grunt项目自动化构建说明文档

## 环境准备

### 1：准备工作

```
mkdir grunt-sample
cd grunt-sample
yarn init --yes
```

### 2：安装grunt

```
yarn add grunt --dev
```

### 3：安装插件

```
# 编译sass
$ yarn add grunt-sass sass -dev

# babel转换
yarn add grunt-babel @babel/core @babel/preset-env --dev

# 自动载入文件
$ yarn add load-grunt-tasks --dev

# 实时监视文件变化
$ yarn add grunt-contrib-watch --dev

# 清除指定文件夹下的文件
$ yarn add grunt-contrib-clean --dev
```

### 4：创建gruntfile.js文件

```javascript
const sass = require('sass')
const loadGruntTasks = require('load-grunt-tasks')

module.exports = grunt => {
    grunt.initConfig({
        clean: {
            dist: 'dist/**'
        },
        sass: {
            options: {
                implementation: sass
            },
            main: {
                files: {
                    'dist/css/main.css': 'src/scss/main.scss'
                }
            }
        },
        babel: {
            options: {
                presets: ['@babel/preset-env']
            },
            main: {
                files: {
                    'dist/js/index.js': 'src/js/index.js'
                }
            }
        },
        watch: {
            js: {
                files: ['src/js/*.js'],
                tasks: ['babel']
            },
            css: {
                files: ['src/scss/*.scss'],
                tasks: ['sass']
            }
        }
    })

    // grunt.loadNpmTasks('grunt-sass')

    //自动加载所有的grunt插件的任务
    loadGruntTasks(grunt)

    grunt.registerTask('default', ['clean', 'sass', 'babel', 'watch'])
}
```



## 开始使用

```cmd
# 使用 yarn 安装依赖
$ yarn

# watch file
$ yarn grunt watch

# clean dist
$ yarn grunt clean

# build sass
$ yarn grunt sass

# build js
$ yarn grunt babel

# default
$ yarn grunt
```