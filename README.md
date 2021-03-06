# Express4 Mongoose AngularJS Learning Demo

## Synopsis

This is a functional demo how to setup a project that uses Express 4, Mongoose 4, bluebird, JsonWebToken, Angular 1 & Angular 2, Sass 3, Gulp 3, BrowserSync, and nodemon.


## 第一步 开始一个项目

#### 安装Express框架
先确保系统已经安装好 [NodeJS](https://nodejs.org/)

然后在命令行运行以下命令安装[Express](http://expressjs.com/) (Express 是基于Nodejs做网站的一个开发框架)

    npm install express --save

同时安装express 命令行工具 [express-generator](http://expressjs.com/starter/generator.html)

    npm install express-generator --save-dev 或 npm install express-generator --save-dev -g


说明: 项目所需要的后端依赖的库都在 node_modules 下。后端文件和库使用npm install 命令安装。在使用 npm install --save 命令会自动把信息保存在 package.json 里面。 在package.json 文件的属性 dependencies 下面是项目运行需要的库, devDependencies 是项目搭建环境和测试等工具需要的库

其中 npm install 参数 --save 是安装并把安装的库写入 package.json 文件中的 dependencies 属性里面, 而 --save-dev 写入package.json文件中的 devDependencies 属性里面. 参数 -g 是全局安装, 会安装到系统的node_modules下面,而不是安装到该项目的node_modules目录下面.


注意: 在MAC系统下 可能需要管理员权限安装 请在原命令前增加sudo

    sudo npm install express --save


#### 安装MongoDB 数据库
[官方文档](https://docs.mongodb.org/v3.0/tutorial/install-mongodb-on-os-x/)
或使用homebrew 安装,  先更新一下homebrew 键入命令

    brew update

然后安装mongodb

    brew install mongodb



#### 创建一个项目

然后 创建一个项目 名字叫app

    express app -e 或 express app -e -c compass

参数 -e 是使用ejs模板引擎, -c compass 是使用compass sass CSS预处理工具

创建完毕后, 在当前文件夹下会增加一个app文件夹




## 第二步 使用Bower 构建前端基础结构


#### 安装 Bower 前端库管理工具 [Bower A package manager for the web](http://bower.io/)

    npm install -g bower 或 sudo npm install -g bower (mac 或 linux 下)

需要先安装好 node, npm and git.    

#### 安装 前端依赖库

可以通过 bower init 创建bower 初始配置  进入 app目录 键入命令

    cd app

然后 通过向导创建bower 初始配置文件

    bower init

注意: app/public 文件夹为放置网站的静态文件. 项目所需要的前端依赖的库都在 bower_components 下。 .bowerrc文件记录着文件存放的路径,默认是bower_components, 本项目的路径放在了public/bower_components,需要编辑.bowerrc文件修改为public/bower_components


安装前端所需要依赖的库

    bower install angular --save
    bower install jquery --save
    bower install bootstrap --save
    bower install reveal.js --save (用来做幻灯片的库)


 进入目录 app/public 查看bower安装下载的库




## 第三步 运行网站

进入app文件夹，键入 DEBUG=app:* npm start 或 DEBUG=app:* NODE_ENV=development npm start 运行网站  然后在浏览器 打开http://localhost:8088/ 就可以访问了。

说明: npm start 前面的 DEBUG=app:* 和 NODE_ENV=development 是运行node的环境变量. DEBUG=app:* 是传入DEBUG变量用来调试控制台只输出app的命名的日志.  NODE_ENV=development 是传入NODE_ENV变量用来读取app/config下面的对应环境的配置文件




## 第四步 使用Gulp 任务工具 来运行网站

Gulp可以处理一系列的工作, 例如编译Sass为css,压缩js代码,合并js和css文件, 最后启动网站。



#### 安装Gulp [Gulp.js - streaming build system](http://gulpjs.com/) 和 Gulp插件 [学习资料](http://i5ting.github.io/stuq-gulp/)

使用以下命令 安装Gulp

    sudo npm install -g gulp --save-dev

安装 gulp-nodemon 插件  [nodemon](http://nodemon.io/) 是用来修改代码后自动重启nodejs服务器工具. gulp-nodemon 是在gulp中使用nodemon启动服务器

    sudo npm install gulp-nodemon --save-dev

gulp-nodemon 是重启服务器的插件。 因为我们修改后端的nodejs代码, 需要人工重启服务器才能看到更新, 使用nodemon就可以自动监视文件变化重启服务器。

安装 gulp-livereload 和 browser-sync 插件

    npm install browser-sync --save-dev

gulp-livereload 和 browser-sync 都是自动刷新前端页面的插件, 这样修改了css不用手动刷新页面就能看到最新的修改, 而且可以在电脑,手机上同步刷新。本项目使用了browser-sync 替代了gulp-livereload



##### gulp-livereload 使用方法

需要安装的 [chrome 浏览器插件 LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)
或不用浏览器插件 在页面中插入以下代码 [livereload-js](https://github.com/livereload/livereload-js)

    <script type="text/javascript">
        document.write('<script src="' + (location.protocol || 'http:') + '//' + (location.hostname || 'localhost') + ':35729/livereload.js?snipver=1" type="text/javascript"><\/script>')
    </script>



##### browser-sync 使用方法

按照[官方文档](https://www.browsersync.io/docs/gulp/) 使用 proxy 代理的方式 原来的网站是运行在8088端口,使用browsersync后运行在8089端口,这样使用http://localhost:8089 访问页面修改后就会自动刷新了,而且不需要装浏览器插件或嵌入js代码

    browserSync.init({
        proxy: "http://localhost:8088",
        files: ["app/public/**/*.css", "app/public/**/*.html", "app/views/**/*.*"],
        browser: ["google chrome", "firefox"],
        port: 8089,
    });



#### 编写Gulp 任务

具体请查看gulpfile.js内容, 默认gulp会读取gulpfile.js的任务

如果gulp任务多了,为了更好的结构化gulp 任务可以参考以下文章
[gulp实战](http://i5ting.github.io/stuq-gulp/)
[结构化组织gulp任务](https://blog.simpleblend.net/gulp-organization-structure/)
[gulp教程](https://github.com/streakq/js-tools-best-practice/blob/master/doc/Gulp.md)


#### 运行Gulp 任务

在命令行运行以下命令启动网站, 打开http://localhost:8089/ 就可以访问了。

    gulp 或 gulp default








[Homebrew]: https://brew.sh
[nodejs]: https://nodejs.org
[mongodb]: https://www.mongodb.org
[redis]: http://redis.io
[nginx]: http://nginx.org
[GitBook]: https://gitbook.com
[lunchy]: https://github.com/eddiezane/lunchy
[paw]: https://luckymarmot.com/paw
