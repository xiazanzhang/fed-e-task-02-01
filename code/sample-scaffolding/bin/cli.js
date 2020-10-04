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