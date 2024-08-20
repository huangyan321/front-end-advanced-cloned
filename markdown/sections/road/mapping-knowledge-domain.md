# 前端知识图谱

转载自 [云谦的博客](https://sorrycc.com/f2e-knowledge-map-02/)

> 基于 [https://frontendmasters.com/guides/front-end-handbook/2024/](https://frontendmasters.com/guides/front-end-handbook/2024/) 整理，

## 基础能力

### 代码编辑器

前端常用编辑器有：

- VSCode
- WebStorm
- Zed

MDN 上有一篇关于编辑器的介绍，见 [https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Tools_and_setup/Available_text_editors](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Tools_and_setup/Available_text_editors) ，但内容有点过时。

### HTML

一些学 HTML 的站点包括：

- MDN 上的 [Guide to HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML)
- web.dev 上的 [Learn HTML](https://web.dev/learn/html)
- [HTML Reference](https://htmlreference.io/) 查看参考，一目了然
- MDH 上看 [HTML Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)

深入了解 HTML 可以看规范，见 [https://html.spec.whatwg.org/multipage/](https://html.spec.whatwg.org/multipage/) 。

### CSS

一些学 CSS 的站点包括：

- MDN 上的 [Guide to CSS](https://developer.mozilla.org/en-US/docs/Learn/CSS)
- web.dev 上的 [Learn CSS](https://web.dev/learn/css)
- [CSS Reference](https://cssreference.io/) 查看参考，一目了然
- MDH 上看 [CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference) 和 [CSS Selectors Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)
- [CSS Database](https://cssdb.org/)
- [CSS Tricks](https://css-tricks.com/)
- [217 – 《CSS 技巧》](http://23.106.141.116:8080/css-tips)

深入了解 CSS 可以看规范，见 [https://www.w3.org/Style/CSS/current-work](https://www.w3.org/Style/CSS/current-work) 。

### JavaScript

一些学 JavaScript 的站点包括：

- MDN 上的 [Guide to JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- web.dev 上的 [Learn JavaScript](https://web.dev/learn/javascript)
- freeCodeCamp 上的 [JavaScript Algorithms and Data Structures](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)
- [JavaScript Roadmap](https://roadmap.sh/javascript)
- [javascript.info](https://javascript.info/)
- [33 JS Concepts](https://github.com/leonardomso/33-js-concepts)
- [Eloquent JavaScript](https://eloquentjavascript.net/)（注：[418 – 《知识星球资料》](http://23.106.141.116:8080/resources) 有最新第四版的双语版）
- Kyle Simpson 的 [You Dont Know JS](https://github.com/getify/You-Dont-Know-JS)
- MDH 上看 [MDN JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)

深入了解 JavaScript 可以看规范，见 [https://tc39.es/ecma262/](https://tc39.es/ecma262/) 。

### DOM

DOM 全称 Document Object Model，是网页文档的一个基本编程接口，它将网页概念化为一棵由节点组成的分层树，使动态交互和操作成为可能。

一些学 DOM 的站点包括：

- MDN 上的 [Introduction to the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
- [DOM Enlightenment](https://domenlightenment.com/)
- [javascript.info](http://javascript.info) 上的 [DOM](https://javascript.info/document)

深入了解 DOM 可以看规范，见 [https://dom.spec.whatwg.org/](https://dom.spec.whatwg.org/) 。

### TypeScript

TypeScript 是由微软开发和维护的一种开源编程语言。它是 JavaScript 的超集，这意味着任何有效的 JavaScript 代码也是有效的 TypeScript 代码。

一些学 TypeScript 的站点包括：

- [官方 TypeScript 手册](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)
- [TypeScript 入门](https://www.totaltypescript.com/tutorials/beginners-typescript)
- [简明 TypeScript 手册](https://github.com/gibbok/typescript-book)
- [TypeScript Roadmap](https://roadmap.sh/typescript)

### JavaScript Web APIs

JavaScript Web APIs 又称「Web Browser APIs」，是内置于浏览器中的 API 的集合。它们允许开发人员与浏览器和底层操作系统进行交互，使网络应用程序能够执行各种传统上只能在本地应用程序中完成的任务。比如图形和媒体 API、通信 API、设备 API、存储 API、Service Worker 和离线 API、性能 API 等。

一些学 JavaScript Web APIs 的站点包括：

- MDN 上的 [Introduction to web APIs](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction)
- [The Web Platform: Browser technologies](https://html-now.github.io/)

### JSON

JSON 全称 JavaScript Object Notation，是一种轻量级、人机可读、独立于语言的数据交换格式。它是一种基于文本的格式，由名-值对和有序的值列表组成，在网络开发和其他各种编程环境中被广泛使用。

一些学 JSON 的站点包括：

- [JSON 官网](https://www.json.org/json-zh.html)
- MDN 上的 [Working with JSON](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON)

### ES 模块

ES 模块（ECMAScript Modules）是 JavaScript 代码模块化的官方标准。

一些学 ES 模块的站点包括：

- MDN 上的 [Guide to ES Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [JavaScript (ES2015+) 启蒙](https://frontendmasters.com/guides/javascript-enlightenment/)
- 阮一峰的 [ES6 入门教程](https://es6.ruanyifeng.com/)

### 命令行

命令行是前端开发人员的重要工具，它提供了一个基于文本的界面，可以有效地与计算机操作系统进行交互。命令行也被称为终端、shell 或命令提示符，它允许开发人员执行一系列命令来完成任务，如运行 Node.js 脚本、管理项目依赖关系或启动构建流程。

一些学命令行的站点包括：

- MDH 上的 [Command line crash course](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line)
- Josh w Comeau 的 [The Front-End Developer’s Guide to the Terminal](https://www.joshwcomeau.com/javascript/terminal-for-js-devs/)
- [计算机教育中缺失的一课](https://missing-semester-zh-hant.github.io/)
- [106 – 《我的 Terminal 经验》](http://23.106.141.116:8080/terminal)

### Node.js

Node.js 是一个开源、跨平台的 JavaScript 运行时环境，可让 JavaScript 在服务器端运行，将其功能扩展到网络浏览器之外。它基于事件驱动的非阻塞 I/O 模型运行，对于在分布式设备上运行的数据密集型实时应用程序来说非常高效。

一些学 Node.js 的站点包括：

- 官网的 [Node.js 简介](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs)
- [Node.js Developer Roadmap](https://roadmap.sh/nodejs)

### JavaScript 包管理器

JavaScript 包管理器是现代网络开发中必不可少的工具，旨在简化项目依赖关系的管理。通过有效地处理依赖关系，包管理器可以将第三方库和工具无缝集成到开发项目中，确保开发人员可以专注于编写代码而不是管理包。

一些包管理器包括：

- npm
- pnpm
- yarn

### NPM Registry

npm Registry 是 JavaScript 开发社区的重要资源，它是一个广泛的开源 JavaScript 软件包公共存储库。这个庞大的数据库对于希望发布自己的软件包或将现有软件包整合到自己项目中的开发人员来说不可或缺。

了解 Npm：

- [关于 npm](https://docs.npmjs.com/about-npm)
- [npm 公共注册表](https://docs.npmjs.com/cli/v10/using-npm/registry)

此外，近期 Deno 推出的 [JSR Registry](https://jsr.io/) 也值得关注。

### Git

Git 是一种分布式版本控制系统，广泛用于跟踪软件开发过程中源代码的变更。它由 Linus Torvalds 于 2005 年为开发 Linux 内核而创建。Git 可以快速高效地处理从小型到超大型的所有项目。

一些学 Git 的站点包括：

- [Git 官网文档](https://git-scm.com/doc)
- 经典的 [《Pro Git》](https://git-scm.com/book/en/v2)
- MDN 上的 [Git and GitHub](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/GitHub)
- 交互式学 Git 的 [Learn Git Branching](https://learngitbranching.js.org/)

### 无障碍：WCAG 和 ARIA

WCAG 是一套国际标准，旨在让残疾人更容易访问网络。它们提供了一个框架，用于创建可供更多人使用的网络内容，包括有听觉、认知、神经、肢体、语言和视觉障碍的人。

ARIA 是一组属性，定义了如何让残障人士更容易访问网络内容和网络应用程序。ARIA 是对 HTML 的补充，有助于传达使用 JavaScript、Ajax、HTML 和相关技术开发的动态内容和复杂用户界面元素的信息。

一些学无障碍的站点包括：

- MDN 上的 [Web Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- web.dev 上的 [Learn Accessibility](https://web.dev/learn/accessibility)

### 网页图像、文件类型和 DATA URLS

一些学习的站点包括：

- MDN 上的 [Guide to Images in HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML)
- web.dev 上的 [Learn Images](https://web.dev/learn/images)

### 浏览器开发者工具

浏览器开发工具（通常称为 DevTools）是集成在谷歌 Chrome 浏览器、Mozilla Firefox、Microsoft Edge 和 Safari 等主要网络浏览器中的不可或缺的套件。这些工具专为开发人员量身定制，在编码和用户体验之间架起了一座桥梁，从调试 JavaScript 到分析性能瓶颈和网络问题，DevTools 对现代网络开发至关重要。

一些学习的站点包括：

- MDN 上的 [What are browser developer tools?](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Tools_and_setup/What_are_browser_developer_tools)
- [Chrome Devtools 官网文档](https://developer.chrome.com/docs/devtools/)

参考：
[123 – 《前端速通指南》](http://23.106.141.116:8080/f2e-speedrun)

## 其它能力

### A/B Testing

A/B 测试，又称分割测试，是一种用于比较网页、应用程序功能或其他产品元素的两个版本，以确定哪一个表现更好的方法。这种方法允许数据驱动决策，并能有效改进用户界面和体验，从而提高用户满意度，改善网络项目的性能。

### AI 驱动的编码工具

人工智能驱动的编码工具是使用人工智能（AI）和机器学习（ML）协助开发人员编写代码的软件程序。这些工具能显著提高开发人员的生产力和效率。

了解更多：

- [在 VS Code 中使用 GitHub Copilot](https://code.visualstudio.com/docs/copilot/overview)
- [Github Copilot](https://github.com/features/copilot)

### 自适应设计

网页开发中的自适应设计指的是一种创建网页的策略，这种网页可以在多种不同屏幕尺寸和分辨率的设备上正常运行。响应式设计依靠流体网格和灵活的图像来动态调整布局以适应浏览环境，而自适应设计则不同，它通常涉及设计多种固定的布局尺寸。

### 算法

算法是解决问题的步骤或公式。在网络开发和编程中，它指的是为执行特定任务或解决特定问题而设计的一系列指令。算法是计算机科学和软件工程（包括网络开发）各个方面的基础。

了解更多：

- [JavaScript 算法和数据结构](https://www.youtube.com/playlist?list=PLC3y8-rFHvwjPxNAKvZpdnsr41E0fCMMP)
- [JavaScript 算法](https://github.com/trekhleb/javascript-algorithms)
- [https://the-algorithms.com/language/javascript](https://the-algorithms.com/language/javascript)

### 异步编程。

JavaScript 中的异步编程是一个强大的概念，它允许以非阻塞的方式执行代码。在异步编程中，您可以启动一项操作，然后在操作完成前继续执行其他任务。一旦操作完成，通常会执行一个回调函数来处理结果。这种方法允许网页在等待这些耗时的操作完成时保持响应性和交互性。

了解更多：

- MDN 上的 [异步 JavaScript 指南](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous)

### Atomic CSS。

原子 CSS 是网页开发中的一种样式设计方法，包括使用范围和功能有限的单用途类。原子 CSS 中的每个类都只做一件事，而且要做得很好，只代表一个样式属性和值。这种方法与一个类可能包含多个样式规则的传统 CSS 方法截然不同。

了解更多：

- [UnoCSS](https://unocss.dev/)
- [淺談 Atomic CSS 的發展背景與 Tailwind CSS – Huli’s blog](https://blog.huli.tw/2022/05/23/atomic-css-and-tailwind-css/)

### Backend as a Service（Baas）

BaaS 是一种云服务模式，它为开发人员提供一种简化后端开发流程的方法，加快应用程序开发。BaaS 通常会提供数据库管理、用户认证、推送通知、云函数、文件存储和管理、API 集成等。对于规模较小的团队和初创企业来说，BaaS 尤其具有显著优势，因为他们可能没有足够的资源来全面开发和维护定制的后端解决方案。

一些 BaaS 服务：

- [Firebase](https://firebase.google.com/)
- [Supabase](https://supabase.io/)
- [Turso](https://turso.tech/)

### 大 O 表示法

大 O 表示法用于描述算法的性能或复杂性。具体来说，它以算法相对于输入大小（即 “n”）的增长速度来描述算法的时间复杂性或空间复杂性。术语 “大 O” 实质上指的是复杂度的上限，它给出了算法需要多少时间或内存的最坏情况。

### 构建

构建指的是将源代码文件转换为可在计算机或服务器上运行的独立软件的过程。在网络开发中，构建对于优化网络应用程序的性能和兼容性至关重要。它可确保应用程序高效、可扩展，并可跨不同浏览器和设备访问。

### CI/CD

CI/CD 是持续集成（Continuous Integration）和持续交付（Continuous Delivery）或持续部署（Continuous Deployment）的缩写，是现代软件开发的关键概念。CI/CD pipeline 通常通过 Jenkins、GitLab CI/CD、CircleCI、Travis CI 等 DevOps 工具来实现。

一些 CI/CD 服务：

- [Github Actions](https://github.com/features/actions)
- [Buddy](https://buddy.works/)

### CMS

CMS 全称 Content Management System，旨在帮助用户创建、管理和修改网站内容，而无需专业的技术知识。

### 代码复杂性

代码复杂度是对一段代码的复杂或错综程度的衡量。通常用代码行数或代码分支数来衡量。代码越复杂，就越难理解、调试和维护。代码复杂性工具有助于识别此类复杂代码，并提供改进代码的见解。

了解更多：

- [413 – 《读书笔记：A Philosophy of Software Design》](http://23.106.141.116:8080/book-a-philosophy-of-software-design)

### 代码覆盖率

代码覆盖率是软件测试中的一个关键指标，用于衡量测试过程中程序源代码被执行的程度。它对于识别代码库中未经测试的部分和确保关键功能得到彻底测试至关重要。代码覆盖率的主要类型包括语句覆盖率、分支覆盖率、函数覆盖率和条件覆盖率，每种覆盖率都侧重于代码的不同方面，如可执行语句、控制结构分支、函数调用和布尔子表达式。

### 代码格式化

代码格式化工具（如 Prettier）是用于软件开发的工具，可自动以一致的风格格式化代码。这在团队中尤为重要，因为不同的开发人员可能会有不同的编码风格，导致代码库难以阅读和维护。

一些代码格式化工具：

- Prettier
- [Biome](https://biomejs.dev/)，基于 Rust，速度极快

### CSS in JS

CSS in JS 是现代网络开发中使用的一种样式技术，尤其是在基于 JavaScript 的用户界面框架和库中。它是在 JavaScript 代码中直接编写 CSS 样式，为基于 UI 组件的架构提供了多种优势。

一些 CSS in JS 的库：

- [Styled Components](https://styled-components.com/)
- [Panda CSS](https://panda-css.com/)
- [StyleX](https://stylex-docusaurus.vercel.app/docs/learn/)
- [Vanilla Extract](https://vanilla-extract.style/)
- [Linaria](https://linaria.dev/)
- [Pigment CSS](https://github.com/mui/material-ui/tree/master/packages/pigment-css-react)

### CSS 动画

CSS 动画是网页开发中的一个强大工具，可用于创建引人入胜的交互式用户界面。通过 CSS 动画，您可以将 HTML 元素和 CSS 属性制作成动画，让网页栩栩如生。CSS 动画尤其适用于创建基于状态的动画，如悬停效果和过渡效果。

了解更多：

- MDN 上的 [Using CSS animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations)

一些 CSS 动画库：

- [Animate.css](https://daneden.github.io/animate.css/)
- [Hover.css](https://ianlunn.github.io/Hover/)
- [GSAP](https://greensock.com/gsap/)

### CSS 框架

一些流行的通用 CSS 框架包括 Bootstrap 和 Bulma。这些框架因其易用性、丰富的文档和大量的社区支持而被广泛使用。对于需要快速设计原型或不想处理复杂的纯 CSS 常见布局和样式任务的开发人员来说，它们尤其有用。

### CSS Resets

在制作网页时，你会发现不同的浏览器对各种 HTML 元素都有自己的默认样式。这些默认样式会导致网页在不同浏览器上的外观不一致。CSS Resets 可移除浏览器应用于 HTML 元素的默认样式，从而确保不同浏览器之间的一致性。

一些 CSS Resets 库：

- [ress](https://www.ress.page/)
- [Destyle.css](https://nicolas-cusan.github.io/destyle.css/)
- [The New CSS Reset](https://github.com/elad2412/the-new-css-reset)
- [A modern CSS reset](https://www.joshwcomeau.com/css/custom-css-reset/)

### 数据 API 测试

数据 API 测试包括验证用于在服务器和客户端（如网络浏览器）之间传输数据的 API 是否正常运行。

一些工具：

- [Postman](https://www.postman.com/)
- [Thunder Client](https://www.thunderclient.com/)
- [Testfully](https://testfully.io/)
- [Rapid API](https://paw.cloud/)

### 数据结构

数据结构是计算机科学和编程中的一个基本概念，在有效组织、管理和存储数据方面发挥着至关重要的作用。了解不同数据结构的类型和用途对任何程序员来说都很重要，因为它们会影响你如何快速、轻松地操作应用程序所处理的数据。

### 声明式编程

声明式编程是一种构建计算机程序结构和元素的风格，它只表达计算的逻辑，而不描述其控制流，不涉及其实现的细节，重点在于 "是什么 "而不是 “怎么做”。比如 HTML、SQL、JSX 都是声明式的。它与命令式编程形成鲜明对比，后者侧重于明确描述如何实现操作。

### 设计系统

设计系统是用户界面/用户体验设计的基础框架，是融合组织设计原则和元素的一套具有凝聚力的指导方针。这种综合方法不仅能确保产品和服务的品牌一致性，还能简化设计流程，提高效率和协作性。蚂蚁的 Ant Design 和 Google 和 Meterial Design 都是很好的例子。

了解更多：

- [Design System Roadmap](https://roadmap.sh/design-system)
- [Design Systems 101](https://www.nngroup.com/articles/design-systems-101/)

### 设备测试

设备测试，是确保网站或网络应用程序在不同设备上正常运行的关键过程。使用真实设备进行测试能让您更准确地了解用户体验，并发现在模拟器或仿真器中可能无法发现的问题。这是开发过程中的一个重要环节，尤其是在设备种类繁多的今天。

一些用于设备测试的服务：

- [BrowserStack](https://www.browserstack.com/)
- [LambdaTest](https://www.lambdatest.com/)
- [Sauce Labs](https://www.saucelabs.com/)

### 开发服务器

开发服务器是开发和测试网络应用程序过程中使用的软件工具或组件，尤其是在前端方面。它们的主要用途是在开发阶段为网络应用程序文件提供服务，使开发人员在将应用程序部署到生产环境之前，能更轻松地处理代码、实时查看更改和测试应用程序。

### 仿真设备测试

使用仿真技术进行设备测试包括在开发环境中模拟不同的设备。这意味着您可以测试网站或应用程序在智能手机、平板电脑和台式机等不同设备上的表现，而无需物理设备本身。（注意：虽然仿真技术非常有用，但它并不能完全取代在实际设备上进行的测试。）

### DOM 操作

DOM 脚本涉及与 DOM 的交互和操作，DOM 是浏览器提供的编程接口，它将 HTML 页面表示为一棵对象树。

### 前端框架和库

前端网络开发框架和库是现代网络开发的基本工具，比如 Angular、React 和 Vue。它们为构建客户端呈现的网络应用程序提供了结构化和标准化的方法。这些框架和库提供了一整套功能，可简化开发流程、提高生产率并简化复杂的任务。

### 全栈 Web 开发框架（元框架）

全栈 Web 开发框架将前端和后端功能无缝整合在一起。这些工具提供了构建网络应用程序的整体方法，具有全面的工具集，可提高效率、提升生产力并简化复杂的编码任务。

一些全栈框架：

- [Next.js](https://nextjs.org/ 'Learn more about Next.js')
- [Nuxt.js](https://nuxt.com/ 'Learn more about Nuxt.js')
- [Svelte Kit](https://kit.svelte.dev/docs/introduction/ 'Learn more about Svelte Kit')
- [SolidStart](https://start.solidjs.com/getting-started/what-is-solidstart 'Learn more about SolidStart')
- [Qwik](https://qwik.builder.io/ 'Learn more about Qwik')
- [Astro](https://astro.build/ 'Learn more about Astro')

### 函数式编程（FP）

函数式编程是一种编程范式，它将计算视为数学函数的评估，并避免使用变化状态和易变数据。在函数式编程中，函数是一等公民，这意味着它们可以像其他数据类型一样，被赋值给变量，作为参数传递给其他函数，以及从其他函数返回。

了解更多：

- [Functional Programming Jargon](https://github.com/hemanth/functional-programming-jargon#functional-programming-jargon)
- [Functional-Light-JS](https://github.com/getify/Functional-Light-JS)
- [Mostly adequate guide to FP (in javascript)](https://github.com/MostlyAdequate/mostly-adequate-guide)

### 功能测试和 E2E 测试

端到端（E2E）测试和功能测试是软件测试中的两种重要方法，它们各有特点。E2E 测试旨在从头至尾测试应用程序的流程，其目的是复制真实的用户场景，确保系统在完全集成的环境中按预期运行。功能测试包括单元测试、集成测试、系统测试等。

一些工具：

- [Playwright](https://playwright.dev/)
- [Cypress](https://www.cypress.io/)

### GraphQL

GraphQL 是一种 API 查询语言，也是一种通过现有数据执行这些查询的运行时。它不同于传统的 REST API 方法。在 REST 中，通常有多个端点用于不同的数据请求，但 GraphQL 只有一个端点。这使得数据检索更加高效和灵活。

了解更多：

- 官网的 [GraphQL 教学](https://graphql.org/learn/)
- [How to GraphQL](https://www.howtographql.com/)

相关工具：

- [Apollo GraphQL](https://www.apollographql.com/)

### Headless CMS

Headless CMS 是一种 CMS，它将 “主体”（即内容存储和管理）与 “头部”（即显示这些内容的表现层）分离开来。这与 WordPress 或 Joomla 等传统内容管理系统平台不同。Headless CMS 提供了更大的灵活性、更高的性能以及 API 驱动的内容管理方法，使其成为需要在各种平台和设备上显示内容的现代网站开发项目的理想选择。

一些 Headless CMS 方案：

- [Contentful](https://www.contentful.com/)
- [Sanity.io](https://www.sanity.io/)
- [Strapi](https://strapi.io/)
- [Directus](https://directus.io/)
- [GraphCMS](https://graphcms.com/)
- [Prismic](https://prismic.io/)
- [Storyblok](https://www.storyblok.com/)
- [Cockpit](https://getcockpit.com/)

### HTML 电子邮件开发

HTML 电子邮件开发涉及使用 HTML（超文本标记语言）和 CSS（层叠样式表）创建格式和样式的电子邮件。这与网页开发类似，但也有一些独特的挑战和注意事项。比如要使用内联样式、基于 Table 做布局等。

### 命令式编程

命令式编程是一种使用语句改变程序状态的编程范式。它基于这样一个概念：给计算机一连串命令，计算机按顺序执行这些命令。这种方法类似于你给别人一系列执行任务的步骤，就像食谱一样。在命令式编程中，你基本上是在告诉计算机 "如何 "做某事。

### 交互设计

交互设计（IxD）是一个专注于设计交互式数字产品、环境、系统和服务的领域。它的目的是塑造供人们使用的数字事物，在技术功能与视觉元素之间取得平衡，从而创造出一个不仅可操作，而且可用并能适应不断变化的用户需求的系统。

### JAM stack

JAMstack "是一种现代网络开发架构，代表 JavaScript、API 和标记。它是一种设计理念，旨在创建快速、安全、可扩展的网站和应用程序。

了解更多：

- [JAMstack](https://jamstack.org/)

### JavaScript 性能

JavaScript 性能是指 JavaScript 代码在网络浏览器或其他环境中运行的效率和速度。JavaScript 的性能在网络开发中至关重要，因为它直接影响用户体验，尤其是交互式动态网站。影响 JavaScript 性能的因素有很多，比如执行速度、DOM 操作、异步编程、内存管理、优化策略、浏览器差异、网络性能、是否使用 Web Worker 等。

了解更多：

- MDN 上的 [JavaScript performance optimization](https://developer.mozilla.org/en-US/docs/Learn/Performance/JavaScript)

### JSX

JSX 是 JavaScript XML 的缩写。它是 JavaScript 的语法扩展，是 React 和其他一些框架（如 SolidJS）的核心部分，它提供了一种更直观的方式，使用与 HTML 非常相似的语法来构建和管理 UI 组件，并与 JavaScript 无缝集成。

了解更多：

- [JSX](https://facebook.github.io/jsx/)
- [Naked JSX](https://nakedjsx.org/)

### 微前端

微前端是一种设计方法，它将微服务的概念扩展到前端。其理念是将前端分解成更小、更易于管理的部分，这些部分可以独立开发、测试和部署。这种方法尤其适用于大型、复杂的应用程序，并能提供多种优势。

了解更多：

- [Micro Frontends](https://microfrontends.com/)

一些微前端相关的库：

- [single-spa](https://single-spa.js.org/)
- [qiankun](https://qiankun.umijs.org/)

### Monorepos

monorepo 是 monolithic repository 的缩写，是一种软件开发策略，许多项目的代码都存储在一个版本控制库中。这与多库方案形成鲜明对比，后者是指每个项目或服务都有自己的库。谷歌、Facebook 和 Twitter 等公司在大规模软件开发中使用 monorepos。

了解更多：

- [Monorepos.tools](https://monorepo.tools/)

### MPA

多页应用（MPA）是一种由多个网页组成的 Web 应用。每个页面都是一个独立的 HTML 文档，页面之间的导航通过点击链接或使用浏览器导航来完成。这与单页应用（Single-Page App，SPA）形成鲜明对比，后者是将所有内容动态加载到一个网页中。

注：新的 [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API) 可使 MPA 的行为更像 SPA（无需刷新整个页面）。该 API 可实现页面之间的平滑过渡，而无需重新加载整个页面。

### 基于 Web 技术的 Native 应用开发

使用 Web 技术构建本地应用程序包括利用 HTML、CSS 和 JavaScript 创建可在台式机、移动设备和网络浏览器等各种平台上运行的应用程序。这种方法使开发人员能够在多个平台上使用单一的代码库，从而简化开发流程并降低维护成本。

相关工具：

- [Electron](https://electronjs.org/)
- [React Native](https://reactnative.dev/)
- [Tauri](https://beta.tauri.app/)
- [NativeScript](https://nativescript.org/)
- [PWA](https://web.dev/articles/what-are-pwas)

### 面向对象编程（OOP）

面向对象编程（OOP）是一种以 “对象” 概念为中心的编程范式。这些对象是类的实例，而类本质上是蓝图或模板，定义了由类创建的对象所具有的属性（属性）和行为（方法）。与过程式编程相比，这种范式能更直观地为复杂系统建模，因此被广泛使用。

### 离线/本地优先 Web 开发

离线优先 Web 开发 适用于需要在网络连接不佳的地区使用的应用程序，或者适用于可能经常失去网络连接的移动用户。其目的是提供无缝、不间断的用户体验，即使用户处于离线状态或网络连接不可靠。

了解更多：

- [Local-First Web Development](https://localfirstweb.dev/)

### Polyfills

polyfill 是一段代码（通常是 JavaScript），用于提供 Web 浏览器未内置的功能。它用于在不支持这些功能的 Web 浏览器上模拟这些功能。Polyfills 让开发人员在使用现代网络标准和功能的同时，仍能保持与旧版浏览器的兼容性。

了解更多：

- [Polyfill.io](https://polyfill.io/)
- [Polyfill 方案的过去、现在和未来](http://23.106.141.116:8080/polyfill)

### PWA

PWA 全程 Progressive Web App，旨在通过 Web 提供与本地应用程序类似的用户体验。PWA 最受欢迎的典型例子是 Twitter Lite。它体现了 PWA 的核心原则，提供了快速、高效、可靠的移动浏览体验。它拥有类似应用程序的界面，可以离线运行，发送推送通知，而且比本地应用程序轻巧得多，因此在低端设备和网络条件较差的情况下性能更佳。

了解更多：

- web.dev 上的 [Progressive Web Apps](https://web.dev/progressive-web-apps/)
- MDN 上的 [Progressive Web apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)

### 正则表达式

正则表达式（regex）是编程中强大而通用的工具，是涉及文本搜索、匹配和操作的任务中不可或缺的工具。正则表达式是定义特定搜索条件的字符和特殊符号序列。

了解更多：

- MDN 上的 [Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions)
- [RegexOne](https://regexone.com/)

一些工具：

- [RegExr](https://regexr.com/)

### 响应式设计（RWD）

响应式设计是一种网站开发方法，可确保网站的布局和内容无缝适应不同的屏幕尺寸和设备，在各种平台上提供最佳的浏览体验。响应式设计的核心原则是灵活性；它允许单个网站在智能手机、平板电脑、笔记本电脑和台式电脑上有效运行，而无需为每种设备类型提供单独的版本。

了解更多：

- MDN 上的 [Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- web.dev 上的 [Learn Responsive Design](https://web.dev/learn/design/)

### REST API

REST 是用于设计 Web 应用的架构风格，最常用于创建 API，以便前端应用程序与之交互。

了解更多：

- [REST API Tutorial](https://restfulapi.net/)

### 搜索引擎优化（SEO）

搜索引擎优化（SEO）是一个用于提高网站在搜索引擎结果中可见度的过程。它涉及各种策略和技术，旨在提高网站在搜索引擎结果页面（SERP）上的排名。网站排名越靠前，用户访问的可能性就越大。

了解更多：

- [learningseo.io](https://learningseo.io/)

### 语义版本控制

语义版本管理（Semantic Versioning）通常缩写为 SemVer，是一种版本管理系统，旨在传达版本中基本变更的含义。这种方法在软件开发（包括网络开发）中尤为盛行，有助于管理依赖关系和了解更新软件组件的影响。

了解更多：

- [Semantic Versioning](https://semver.org/)

一些工具：

- [npm SemVer Calculator](https://semver.npmjs.com/)

### 语义 HTML

语义 HTML 指的是使用 HTML 标记来强化网页和网络应用程序中信息的含义，而不仅仅是定义其表现形式或外观。它包括使用 HTML 标记，为网页内容引入意义。这种做法不仅有助于创建信息丰富、易于浏览的网页，而且在搜索引擎优化（SEO）和可访问性方面也发挥着重要作用。

了解更多：

- web.dev 上的 [Semantic HTML](https://web.dev/learn/html/semantic-html/)

### 服务器端渲染（SSR）

服务器端呈现（SSR）是让网页内容先在服务器上进行生成，然后再发送到客户端浏览器。这有别于客户端呈现，后者是使用 JavaScript 在浏览器中呈现内容。将 SSR 集成到网站开发项目中，可以显著提高网站的性能和搜索引擎优化，尤其是对于内容繁多的网站。

了解更多：

- freecodecamp 上的 [Server Side Rendering in JavaScript – SSR vs CSR Explained](https://www.freecodecamp.org/news/server-side-rendering-javascript/)

### 单页应用（Single Page Apps）

单页面应用程序（Single Page Applications，SPA）代表了网络应用程序构建和交互方式的根本转变。与重新加载整个页面或加载新页面以显示不同内容的传统网络应用程序不同，SPA 只加载一个 HTML 页面，并在用户与应用程序交互时动态更新内容。

了解更多：

- wikipedia 上的 [Single-page application](https://en.wikipedia.org/wiki/Single-page_application)

### 状态管理

在 Web 开发中，"状态 "指的是应用程序或用户界面的实时数据和条件。这包括从用户输入和服务器响应到用户界面变化和会话状态的所有内容。状态是动态的，并根据用户交互、应用程序接口响应和内部逻辑不断变化，在决定应用程序行为和用户体验方面起着关键作用。

### 状态机

状态机常用于计算机科学和工程领域，是用来描述系统行为的抽象模型。状态机可被视为一种概念模型，它代表了系统的所有可能状态，并定义了系统如何从一种状态过渡到另一种状态。在前端开发中，状态机对于管理复杂的用户界面行为和交互特别有用。

一些状态机的实现：

- [XState](https://xstate.js.org/)

### 静态分析工具

静态分析工具（如 ESLint）是一种工具，可在不执行其他软件的情况下对其进行分析。它们广泛应用于软件开发中的各种用途。

一些工具：

- [ESLint](https://eslint.org/)
- [Stylelint](https://stylelint.io/)
- [Oxc](https://oxc-project.github.io/)

### 静态网站生成器（SSG）

静态网站生成器是网络开发中用于从源文件创建静态 HTML 页面的工具。传统的网络服务器会根据每次请求动态生成页面，而静态网站生成器则不同，它会在部署时预先生成所有页面。

了解更多：

- netlify 上的 [What is a Static Site Generator?](https://www.netlify.com/blog/2020/04/14/what-is-a-static-site-generator-and-3-ways-to-find-the-best-one/)

一些擅长做 SSG 的工具：

- [Astro](https://astro.build/)
- [Hugo](https://gohugo.io/)
- [11ty](https://www.11ty.dev/)

### 静态类型/类型注解

虽然 JavaScript 中的动态类型提供了灵活性，但也可能导致一些具有挑战性的错误，例如对当前数据类型执行不兼容的操作（例如将字符串与数字连接起来）。TypeScript 等工具为 JavaScript 带来了静态类型检查功能，有助于在编译时而不是运行时捕获此类错误。

了解更多：

- [ECMAScript proposal: Type Annotations](https://github.com/tc39/proposal-type-annotations)
- [TypeScript](https://www.typescriptlang.org/)

### 流式 SSR

流式服务器端渲染（SSR）是一种先进的网络开发技术，它能将部分渲染好的内容从服务器实时发送到客户端，从而提高用户体验和网站性能。传统的服务器端渲染是先在服务器上进行整个页面的渲染，然后再发送到客户端，而流式服务器端渲染则不同，它是在内容准备就绪后立即开始传输内容块。

### 树和图数据结构

树形和图形数据结构是计算机科学中的基本概念，用于表示元素之间的层次关系或基于网络的关系。

### UI 设计模式

UI 设计模式是针对常见设计问题的可重复使用的解决方案。它们是设计人员和开发人员解决重复出现的用户界面难题的标准参考点。

了解更多：

- [UI Design Patterns](https://ui-patterns.com/patterns)

### UI 工具包/库

UI 工具包是预写代码库或代码集，为开发人员提供了一系列可重复使用的组件/用户界面小工具，以更高效地构建用户界面（UI）。比如可复用组件、定制和主题化、跨浏览器兼容性、响应式设计、可访问性等。

一些库：

- [Ark](https://ark-ui.com/)
- [Park UI](https://park-ui.com/)

### 单元测试

单元测试包括测试代码的单个组件或单元，以确保它们按预期运行。这些单元是应用程序中最小的可测试部分，通常是一个函数或方法。其目的是隔离程序的每个部分，并证明各个部分都是正确的。

一些工具：

- [Vitest](https://vitest.dev/)
- [Jest](https://jestjs.io/)

### 用户体验（UX）

用户体验（UX）是指一个人在与产品、系统或服务交互时的整体体验和满意度，尤其是在产品、系统或服务的易用性和愉悦性方面。包括可用性、可访问性、设计、性能、交互、内容、情感设计、反馈与测试等。

### Utility First CSS 框架

Utility First CSS 框架（比如 Tailwind CSS）由许多基于特定样式或布局功能的小型单用途类组成。例如，一个类可能用于设置边距、改变文本颜色或调整填充。这些类可以在 HTML 标记中进行组合，以实现各种设计。

一些库：

- [Tailwind CSS](https://tailwindcss.com/)

### 虚拟 DOM

Web 开发中的虚拟 DOM 概念，尤其是在 React 等框架中，最初是为了解决与直接操作实际 DOM 的性能瓶颈而引入的。从历史上看，由于重新渲染 UI 所涉及的操作成本较高，频繁更新 DOM 会导致性能问题。

不过，随着浏览器技术的进步和 DOM 操作处理效率的提高，传统上与直接 DOM 操作相关的性能问题已经大大减少。在这种情况下，虚拟 DOM 的作用与其说是为了提高性能，不如说是一种架构选择。它抽象了实际 DOM，允许开发人员编写声明式用户界面代码。

### 可视化测试

可视化测试，又称可视化回归测试，是一种质量保证流程，用于网络开发和其他对产品的可视化方面至关重要的领域。它将组件、页面或应用程序的视觉外观与一组基准图像进行比较，以检测变化。

一些工具：

- [Percy](https://www.percy.io/)
- [Argos](https://argos-ci.com/playwright)

### Web 1.0

Web 1.0 是指万维网演变的第一阶段。从本质上讲，它是万维网从 20 世纪 90 年代初创建到 21 世纪初左右的样子。

### Web 2.0

Web 2.0 指的是第二代万维网，它强调用户生成内容、可用性和终端用户的互操作性。与早期的 Web 1.0 相比，Web 2.0 有所改变，早期的 Web 1.0 主要是静态的 HTML 页面，用户只需浏览这些页面，而无需与之互动。

### Web 3.0（概念性）

Web3 是一个用来描述更加分散的网络愿景的术语。注：这一术语尚未被广泛采用，也未被完全接受为官方术语。目前，它更像是一个与加密货币有关的流行词。

### Web Animations（又称 JavaScript Animations）

Web Animations API 可直接通过 JavaScript 对动画进行更多控制，而无需完全依赖 CSS 动画或外部库。该 API 旨在统一 CSS 和 SVG 的动画功能，提供一套可在两种技术中使用的通用功能。

了解更多：

- [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)

### Web Assembly (WASM)

WebAssembly 通常缩写为 Wasm，是一种基于堆栈的虚拟机二进制指令格式。它被设计为 C/C++ 和 Rust 等高级语言的可移植编译目标，可在网络上部署客户端和服务器应用程序。WebAssembly 特别适用于 JavaScript 性能不足的情况，或者需要将现有 C/C++/Rust 代码库移植到网络的情况。

### Web 浏览器测试

Web 浏览器测试包括在不同设备、操作系统和网络浏览器上对网站和网络应用程序进行评估，以确保性能和用户体验的一致性。这一过程至关重要，因为每个 Web 浏览器都以其独特的方式解释 HTML、CSS 和 JavaScript，这可能导致网页显示和功能的差异。

了解更多：

- MDN 上的 [Cross Browser Testing](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Introduction)

一些工具：

- [BrowserStack](https://www.browserstack.com/)
- [Lambdatest](https://www.lambdatest.com/)

### Web Components

Web Components 是一套网络平台 API，允许您创建自定义、可重用、封装的 HTML 标记，以便在网页和网络应用程序中使用。

了解更多：

- MDN 上的 [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_Components)
- web.dev 上的 [Building components](https://web.dev/articles/web-components)

一些工具：

- [Lit](https://lit.dev/)
- [Atomico](https://atomico.gitbook.io/doc/)

### Web 字体

Web 字体是 Web 设计中使用的字体，用于确保不同网站和平台的排版一致。与预装在用户电脑或设备上的传统字体不同，Web 字体是在加载网页时从互联网上下载的。

了解更多：

- MDN 上的 [Web fonts](https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Web_fonts)
- CSS Tricks 上的 [Understanding Web Fonts: A Primer](https://css-tricks.com/understanding-web-fonts-getting/)

### Web 托管服务

Web 托管服务是互联网基础设施的重要组成部分，使个人和组织能够通过万维网访问其网站。这些服务提供网站存储、维护和访问所需的技术和资源。

一些服务：

- [Nelify](https://www.netlify.com/)
- [Vercel](https://vercel.com/)
- [Cloudflare Pages](https://pages.cloudflare.com/)
- [DigitalOcean](https://www.digitalocean.com/)

### Web 性能

Web 性能是指网页在用户浏览器上下载和显示的速度和效率。这是 Web 开发的一个重要方面，尤其是前端工程师来说，因为它直接影响到用户体验、参与度和满意度。

了解更多：

- MDN 上的 [Web performance](https://developer.mozilla.org/en-US/docs/Web/Performance)
- web.dev 上的 [Learn Performance](https://web.dev/learn/performance/)

### Web 安全

Web 安全，尤其是与前端工程师相关的网络安全，是指为保护网站和网络服务免受各种网络威胁和攻击而实施的保护措施和协议。这些措施旨在保护网站的服务器和访问网站的用户。网络安全的主要目标是确保网络资源和用户数据的保密性、完整性和可用性。

了解更多：

- MDN 上的 [Web security](https://developer.mozilla.org/en-US/docs/Web/Security)

### Web Sockets

WebSockets 是网络技术的一大进步，可实现用户浏览器与服务器之间的实时双向通信。这项技术允许客户端（用户浏览器）和服务器之间进行交互式通信会话，可以直接相互发送数据，从而为更动态、反应更快的网络应用程序创造了机会。

了解更多：

- MDN 上的 [Guide to WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
- whatwg 上的 [WebSockets 规范](https://websockets.spec.whatwg.org/)

### Web 排版

Web 排版是指在网页设计中使用字体和字样，对美观和可读性产生影响。

### Web Workers

Web Worker 提供了一种在后台线程中运行脚本的方法，与网页的主执行线程分离。这在网络应用程序中特别有用，可以在不干扰用户界面的情况下执行任务。

了解更多：

- [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)

一些工具：

- [Partytown](https://partytown.builder.io/)

### 线框设计

线框设计是网页设计和开发过程中必不可少的一步。它有助于布局网站或应用程序的结构和层次，而不会被设计元素所干扰。这一步骤对于确保最终产品的用户友好性和满足项目目标至关重要。

常用工具：

- Balsamiq
- Sketch
- Figma
