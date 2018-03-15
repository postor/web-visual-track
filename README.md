# web-visual-track

track visual changes of your web site | 跟踪你网站的视觉变化

I want an easy way to perform visual tests, so come this project. Once deployed, you can perform visual test by click a button on web and see the results. If you want something like a daily report of your visual test, https://github.com/postor/simple-visual-test should be what you are looking for

我希望能通过简单的方式进行网站视觉测试，所以启动了这个项目。一旦部署好了，你就可以随时通过网页来进行视觉测试，并且展示对比结果。如果你想要的是一个每日报告一样的东西https://github.com/postor/simple-visual-test更符合你的需求

## features | 功能

- crawl and generate tests | 爬取网站链接并且生成测试
- run test and view screen shots | 运行测试并浏览截图

### todo | 要做的事情

- url management
- device
- language
- cookie

## usage | 使用

```
git clone https://github.com/postor/simple-visual-test.git
cd simple-visual-test
yarn && yarn dev

# or production 
yarn && yarn build && yarn start
```

then open http://localhost:3000 to use | 然后打开 http://localhost:3000 使用

if you are inside GFW, you may have problem installing puppeteer, you need to | 如果在国内，可能是没法正常安装puppeteer的，你需要:

- set environment varible  `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD` to `true` | 设置环境变量 `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD` 为 `true`
- add a `launch.json` in `simple-visual-test` folder and set value `executablePath` to your chrome.exe path | 在 `simple-visual-test` 目录下增加 `launch.json` 文件，并设置 `executablePath` 的值为你的 chrome.exe 的完整路径

launch.json, you can add other launch options refer https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions 

launch.json, 你可以添加其他的启动参数，参考 https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions 

```
{
  "executablePath":"C:\\Users\\josh\\AppData\\Local\\Google\\Chrome SxS\\Application\\chrome.exe",
}
```

on linux you may run into problems launching chrome, you may need libs installed | 在linux上可能需要一些库来运行chrome

```
sudo apt-get install -yq gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 \
ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```

and if you are using root , a launch config is needed, launch.json | 如果你使用root账号还需要配置launch参数

```
{
  "args": ["--no-sandbox"]
}
```

or use docker | 或者使用docker

```
docker run -p 80:80 -it postor/web-visual-track
```

![screenshot](./screenshot.png)
