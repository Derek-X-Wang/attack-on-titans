# AttackOnTitans

科技巨头们的电话面试模拟器，力求真实还原(๑•̀ㅂ•́) ✧

[English](https://github.com/Derek-X-Wang/attack-on-titans/blob/master/README.md) | 简体中文

### WIP声明
> 目前这个应用还在测试阶段。 如发现问题，请到Issue报告。

## 在线应用
[应用](http://attackontitans-env.6h2vtm2wag.us-east-1.elasticbeanstalk.com/#/)

谷歌面试模拟器需要用到Google Doc, aot会自动为你创建Doc, 不过这需要你的授权
> 谷歌会显示 "This app isn't verified". 点击 "Advanced" 并授权.

我还没做谷歌软件的认证， 之后会补上（主要是懒_(:з」∠)_）。你如果对未认证的应用有所顾虑的话，欢迎下载到本地运行。

## 为啥做这个玩意呢？

> 上次面Google，Phone Screen就跪了，(ಥ_ಥ)，扎心。 不过是我的问题啦~ 谁让我懒得刷题而且心里素质超差呢。。。面试时直接大脑一片空白。 真是尴尬啊。 为了缓解我的尴尬。 我要通过做模拟器让大家的面试容易一丢丢。程序员想要自我安慰当然是要靠写程序啊。写码治百病( •̀ .̫ •́ )✧ 总之，希望这个项目能帮到你！(o´ω`o)

## 截屏
<img width="80%" alt="screen shot 2018-01-01 at 1 54 48 am" src="https://user-images.githubusercontent.com/6364170/34466906-ff28d2ae-ee97-11e7-86d0-5ffdebdd9d4b.png">
<img width="80%" alt="screen shot 2018-01-01 at 1 55 54 am" src="https://user-images.githubusercontent.com/6364170/34466907-026ce05e-ee98-11e7-8caf-90bf1fcbb706.png">
<img width="80%" alt="screen shot 2018-01-01 at 1 57 00 am" src="https://user-images.githubusercontent.com/6364170/34466909-04e0681a-ee98-11e7-9d91-c44c058809b1.png">
<img width="80%" alt="screen shot 2018-01-01 at 1 58 10 am" src="https://user-images.githubusercontent.com/6364170/34466910-072cc442-ee98-11e7-92e6-f84f9dd6bd5d.png">

## 支持的电话面试
- Google

## 使用说明
- Google
    - 为了追求最真实的模拟，应用只会在右下角有个菜单。将鼠标移过去后会自动展开。
    - (重要)你可以用✅按钮来跳过当前环节。面试时每道题会给你大概15分钟作答和2分钟用来解释时间和空间复杂度。你可以用✅来直接跳过。比如你提前完成了。
    - 停止按钮可以终止当前面试
    - 开始按钮开始面试
    - 面试结束后会有Report生成，Report里的答案都来自网络。我没有验证过。如果有错误请报告到Issue。如果有侵权，请告诉我，我会及时删除。


## 求帮助!!!
- 关于面试官说话的范本。 时间太长了，我早就忘了他具体说了什么。。。 求各大公司面试说话的范本，大概差不多就行~
- 向面试过Google, FB, Amazon, Microsoft, 阿里, 百度, 腾讯等等大型科技公司的同学们求助。分享你的经验，然后一起做个模拟器帮助学弟学妹们吧 (๑•̀ㅂ•́) ✧
- 目前的模拟器的实现基本上还是状态机。这样模拟出来的效果还是不真实。所以我想一方面继续完善状态机，另一方面用如Dialogflow等服务，实现AI机器人。欢迎大家一起来讨论！

## 文档
- 文件结构(in progress)
- 状态机(in progress)
- 如何添加一个面试模拟器(in progress)
- Api(in progress)

## 开发

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm run dev
```

## Roadmap
- 使用Dialogflow/api.ai等技术来实现对话机器人 -> 0.4
- 加强文本生成器 -> 0.4
- 加强声音生成系统，更自然的声音
- Report支持多语言
- unit test
- e2e test

## Credit
- [seed project](http://vuejs-templates.github.io/webpack/)
- [icons](https://icons8.com) by Icons8
- [photo](https://unsplash.com/search/code?photo=fPkvU7RDmCo) by Caspar Rubin
- [leetcode](https://leetcode.com/)
- [solutions](http://www.jiuzhang.com/) by jiuzhang
