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