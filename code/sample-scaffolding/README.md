# 自定义小型脚手架说明文档

## 环境准备

### 1：准备工作

```
mkdir sample-scaffolding
cd sample-scaffolding
yarn init --yes  //初始化package文件
```

### 2：安装所需插件

```
# 模板渲染引擎
$ yarn add ejs --dev

# 命令行解决方案
$ yarn add commander --dev
```



### 3：修改package.json文件

```
{
  "name": "xzz",
  "version": "1.0.0",
  "description": "一个基本的脚手架工具",
  "main": "lib/index.js",
  "bin": "bin/cli.js",
  "author": "kakarotto",
  "license": "MIT",
  "dependencies": {
    "axios": "^0.20.0",
    "chalk": "^4.1.0",
    "commander": "^6.1.0",
    "ejs": "^3.1.5",
    "inquirer": "^7.3.3",
    "ora": "^5.1.0"
  }
}
```

### 4：创建cli.js

```javascript
#!/usr/bin/env node

let { program } = require('commander')
let { version } = require('../package.json')
let mainFn = require('..') //在当前目录的结构下就相当于将lib下的index.js导入

let actionMap = {
    create: {
        alias: 'crt',
        description: '初始化项目模板',
        examples: ['xzz create <projectname>']
    }
}

Reflect.ownKeys(actionMap).forEach(aname => {
    program
        .command(aname)
        .alias(actionMap[aname].alias)
        .description(actionMap[aname].description)
        .action(() => {
            console.log(aname, '命令执行了', process.argv.slice(3))
            mainFn(aname, process.argv.slice(3))
        })
})

program.on('--help', () => {
    console.log('\nExamples：')
    Reflect.ownKeys(actionMap).forEach(aname => {
        actionMap[aname].examples.forEach(item => {
            console.log(' ', item)
        })
    })
})

program.on('create', () => {
    console.log('create')
})


program.version(version).parse(process.argv)
```

### 5：创建index.js

```javascript
const { requiredOption } = require("commander")

module.exports = function (aname, args) {
    require('./' + aname)(...args)
}
```

### 6：创建create.js

```javascript
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

module.exports = async function (anwsers) {
    //模板目录
    const tmplDir = path.join(__dirname, '../templates')
    console.log("输出路径", tmplDir)
    //目标目录
    const destDir = process.cwd()
    //输出到目标目录
    fs.readdir(tmplDir, (err, files) => {
        if (err) throw err
        files.forEach(file => {
            console.log(path.join(tmplDir, file))
            //通过模板引擎渲染文件
            ejs.renderFile(path.join(tmplDir, file), { name: anwsers }, (err, result) => {
                if (err) throw err
                fs.writeFileSync(path.join(destDir, file), result)
            })
        })
    })
}
```



## 开始使用

```cmd
# 使用 yarn 安装依赖
$ yarn

# 将xzz链接到全局
$ yarn link

# 查看帮助信息
$ xzz --help

# 生成文件
$ xzz create <title>
```

