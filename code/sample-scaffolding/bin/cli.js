#!/usr/bin/env node

// const inquirer = require('inquirer')
// const path = require('path')
// const fs = require('fs')
// const ejs = require('ejs')

// inquirer.prompt([
//     {
//         type: 'input',
//         name: 'name',
//         message: 'Project Name?'
//     }
// ]).then(anwsers => {
//     //模板目录
//     const tmplDir = path.join(path.resolve('.'), 'templates')
//     //目标目录
//     const destDir = process.cwd()
//     //输出到目标目录
//     fs.readdir(tmplDir, (err, files) => {
//         if (err) throw err
//         files.forEach(file => {
//             //通过模板引擎渲染文件
//             ejs.renderFile(path.join(tmplDir, file), anwsers, (err, result) => {
//                 if (err) throw err
//                 fs.writeFileSync(path.join(destDir, file), result)
//             })
//         })
//     })
// })

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