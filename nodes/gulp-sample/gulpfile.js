const { src, dest } = require('gulp')
const cleanCss = require('gulp-clean-css')
const rename = require('gulp-rename')

exports.default = () => {
    return src('src/*.css')
        .pipe(cleanCss())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(dest('dist'))
}


// const fs = require('fs')
// const { Transform } = require('stream')

// exports.default = () => {
//     //文件读写流
//     const read = fs.createReadStream('normalize.css')
//     //文件写入流
//     const write = fs.createWriteStream('mormalize.min.css')
//     //文件转换流
//     const transform = new Transform({
//         transform: (chunk, encoding, callback) => {
//             const input = chunk.toString()
//             const output = input.replace(/\s+/g, '').replace(/\/\*.+?\*\//g, '')
//             callback(null, output)
//         }
//     })

//     //把读取出来的文件导入写入流
//     read
//         .pipe(transform) //转换
//         .pipe(write) //写入

//     return read
// }






// const fs = require('fs')

// exports.callback = done => {
//     console.log('callback task~')
//     done()
// }

// exports.callback_error = done => {
//     console.log('callback task~')
//     done(new Error('task failed!'))
// }

// exports.promise = () => {
//     console.log('promise task~')
//     return Promise.resolve()
// }

// exports.promise_error = () => {
//     console.log('promise task~')
//     return Promise.reject(new Error('Promise Reject'))
// }

// const timeout = time => {
//     return new Promise(resolve => {
//         setTimeout(resolve, time)
//     })
// }

// exports.async = async () => {
//     await timeout(1000)
//     console.log('async task')
// }

// // exports.stream = () => {
// //     const readStream = fs.createReadStream('package.json')
// //     const writeStream = fs.createWriteStream('temp.txt')
// //     readStream.pipe(writeStream)
// //     return readStream
// // }

// exports.stream = done => {
//     const readStream = fs.createReadStream('package.json')
//     const writeStream = fs.createWriteStream('temp.txt')
//     readStream.pipe(writeStream)
//     readStream.on('end', () => {
//         done()
//     })
// }






// const { series, parallel } = require('gulp')

// const task1 = done => {
//     setTimeout(() => {
//         console.log('task1 working')
//         done()
//     }, 1000)
// }

// const task2 = done => {
//     setTimeout(() => {
//         console.log('task2 working')
//         done()
//     }, 1000)
// }

// const task3 = done => {
//     setTimeout(() => {
//         console.log('task3 working')
//         done()
//     }, 1000)
// }

// //串行
// exports.foo = series(task1, task2, task3)
// //并行
// exports.foo = parallel(task1, task2, task3)






// exports.foo = done => {
//     console.log('123123')
//     done()
// }

// exports.default = done => {
//     console.log('default task~')
//     done()
// }

// const gulp = require('gulp')

// gulp.task('bar', done => {
//     console.log('bar task~')
//     done()
// })