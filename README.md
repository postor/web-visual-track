# web-visual-track

track visual changes of your web site | 跟踪你网站的视觉变化

I want an easy way to perform visual tests, so come this project. Once deployed, you can perform visual test by click a button on web and see the results. If you want something like a daily report of your visual test, https://github.com/postor/simple-visual-test should be what you are looking for

我希望能通过简单的方式进行网站视觉测试，所以启动了这个项目。一旦部署好了，你就可以随时通过网页来进行视觉测试，并且展示对比结果。如果你想要的是一个每日报告一样的东西https://github.com/postor/simple-visual-test更符合你的需求

## features | 功能

- crawl and generate tests | 爬取网站链接并且生成测试
- run test | 运行测试

### todos | 要做的事情

- url management
- device
- language
- cookie

## usage | 使用

```
git clone https://github.com/postor/simple-visual-test.git
cd simple-visual-test
yarn && yarn dev

#or production 
yarn && yarn build && yarn start
```

then open http://localhost:3000 to use

![screenshot](./screenshot.png)


