# 开发脚手架及封装自动化构建工作流

### 简答题

##### 1、谈谈你对工程化的初步认识，结合你之前遇到过的问题说出三个以上工程化能够解决问题或者带来的价值。



**初步认识：**

遵循一定标准和规范，通过工具去提升效率，降低成本的一种手段。



**通过工程化主要解决的问题：**

1：解决传统语言/语法存在的弊端，ES6/ES7/Less/Sass/PostCSS等工具在运行环境中无法直接使用的问题

2：解决无法使用模块化/组件化的弊端

3：解决部署上线前需要手动压缩代码及资源文件，部署过程需要手动上传代码到服务器，减少重复机械式的工作

4：解决多人协作开发，代码风格，质量不统一的问题

5：降低编码过程中对后端的依赖



##### 2、你认为脚手架除了为我们创建项目结构，还有什么更深的意义？

答：一切重复的工作都应该被工程化

1：创建项目结构，创建特定类型文件

2：编码阶段可以帮助我们格式化代码，效验代码的风格，编译/构建/打包

3：预览/测试阶段（热更新、Mock、SourceMap）

4：提交（Git Hooks、Lint-staged、持续集成）

5：部署（CI/CD、自动部署）



### 编程题

##### 1：概述脚手架实现的过程，并使用NodeJS完成一个自定义的小型脚手架工具

答：通过交互命令行询问用户问题，根据用户回答的结果生成文件

```cmd
// 1.yarn init
// 2. 修改package.json 添加一行："bin" : "cli.js"
// 3. 添加cli.js
// 找到对应的node脚本解释器来解释后面的内容
// #!/usr/bin/env node  MAC和linux需要修改文件的权限为755 
// 4.yarn link
```

自定义的小型脚手架工具：

[自定义脚手架](https://github.com/xiazanzhang/fed-e-task-02-01/blob/master/code/sample-scaffolding/bin/cli.js)

[说明文档](https://github.com/xiazanzhang/fed-e-task-02-01/blob/master/code/sample-scaffolding/README.md)



##### 2：尝试使用Gulp完成项目的自动化构建

[Gulp自动化构建](https://github.com/xiazanzhang/fed-e-task-02-01/blob/master/code/pages-boilerplate-gulp/gulpfile.js)

[说明文档](https://github.com/xiazanzhang/fed-e-task-02-01/blob/master/code/pages-boilerplate-gulp/README2.md)



##### 3：使用Grunt完成项目的自动化构建

[Grunt自动化构建](https://github.com/xiazanzhang/fed-e-task-02-01/blob/master/code/grunt-sample/gruntfile.js)

[说明文档](https://github.com/xiazanzhang/fed-e-task-02-01/blob/master/code/grunt-sample/README.md)