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

// module.exports = grunt => {
//     grunt.initConfig({
//         foo: 'bar222222222',
//         clean: {
//             temp: 'temp/**'
//         },
//         build: {
//             options: {
//                 foo: 'bar'
//             },
//             css: {
//                 options: {
//                     foo: 'baz'
//                 }
//             },
//             js: '2'
//         }
//     })

//     grunt.loadNpmTasks('grunt-contrib-clean')

//     grunt.registerMultiTask('build', function () {
//         console.log(this.options())
//         console.log(`target:${this.target},data:${this.data}`)
//     })

//     grunt.registerTask('foo', () => {
//         console.log(grunt.config('foo'))
//     })

//     grunt.registerTask('bar', '任务描述', () => {
//         console.log('bar grunt~')
//     })

//     // grunt.registerTask('default', '默认任务', () => {
//     //     console.log('default task~')
//     // })
//     grunt.registerTask('default', ['foo', 'bar'])

//     grunt.registerTask('async-task', function () {
//         const done = this.async()
//         setTimeout(() => {
//             console.log('async task working~')
//             done()
//         }, 1000)
//     })
// }