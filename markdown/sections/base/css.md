# CSS相关

## 1. CSS sprite是什么？有什么优缺点？

> `CSS Sprite`（CSS精灵）是一种将多个小图片合并到一张大图中的技术。通过在页面中引用这张大图，并设置合适的`background-position`和尺寸，可以显示出所需的小图标或背景图案。

**优点：**

- 减少`HTTP`请求数：将多个小图片合并成一张大图，减少了浏览器与服务器之间的请求次数，提高了页面加载速度。
- 提高性能：由于减少了请求数，减少了网络传输时间和延迟，加快了页面加载速度，提升了用户体验。
- 减小图片大小：合并后的大图可以使用更高效的压缩算法进行压缩，减小了图片的文件大小。
- 方便更换风格：只需要替换或修改一张大图中的小图标或背景图案，就可以改变整个页面的样式，维护和更换风格更加方便。

**缺点：**

- 图片合并麻烦：合并图片需要手动调整和拼接小图标或背景图案，需要一定的工作量。
- 维护麻烦：如果需要修改其中一个小图标或背景图案，可能需要重新布局整个大图，并且需要更新相应的CSS样式。

> 总结：`CSS Sprite`通过将多个小图片合并成一张大图，减少了`HTTP`请求，提高了页面加载速度和性能。它的优点包括减少请求数、提高性能、减小图片大小和方便更换风格。然而，它的缺点在于图片合并和维护的麻烦。

## 2 `display: none;`与`visibility: hidden;`的区别

> `display: none;`和`visibility: hidden;`都可以使元素不可见，但它们在实现上有一些区别。

**区别：**

- `display: none;`会使元素完全从渲染树中消失，不占据任何空间，而`visibility: hidden;`不会使元素从渲染树中消失，仍然占据空间，只是内容不可见。
- `display: none;`是非继承属性，子孙节点消失是因为元素本身从渲染树中消失，修改子孙节点的属性无法使其显示。而`visibility: hidden;`是继承属性，子孙节点消失是因为继承了`hidden`属性，通过设置`visibility: visible;`可以使子孙节点显示。
- 修改具有常规流的元素的`display`属性通常会导致文档重排（重新计算元素的位置和大小）。而修改`visibility`属性只会导致本元素的重绘（重新绘制元素的可见部分）。
- 读屏器（屏幕阅读软件）不会读取`display: none;`元素的内容，但会读取`visibility: hidden;`元素的内容。

> 综上所述，`display: none;`和`visibility: hidden;`虽然都可以使元素不可见，但在元素在渲染树中的位置、对子孙节点的影响、性能方面有所不同。选择使用哪种方式取决于具体的需求和场景。

## 3. `link`与`@import`的区别

1. `<link>`是HTML方式，`@import`是CSS方式。`<link>`标签在HTML文档的`<head>`部分中使用，用于引入外部CSS文件；`@import`是在CSS文件中使用，用于引入其他CSS文件。
2. `<link>`标签最大限度地支持并行下载，浏览器会同时下载多个外部CSS文件；而`@import`引入的CSS文件会导致串行下载，浏览器会按照顺序逐个下载CSS文件，这可能导致页面加载速度变慢，出现FOUC（Flash of Unstyled Content）问题。
3. `<link>`标签可以通过`rel="alternate stylesheet"`指定候选样式表，用户可以在浏览器中切换样式；而`@import`不支持`rel`属性，无法提供候选样式表功能。
4. 浏览器对`<link>`标签的支持早于`@import`，一些古老的浏览器可能不支持`@import`方式引入CSS文件，而可以正确解析`<link>`标签。
5. `@import`必须出现在样式规则之前，而且只能在CSS文件的顶部引用其他文件；而`<link>`标签可以放置在文档的任何位置。
6. 总体来说，`<link>`标签在性能、兼容性和灵活性方面优于`@import`。

> 因此，在实际使用中，推荐使用`<link>`标签来引入外部CSS文件。

## 4. 什么是`FOUC`？如何避免？

> FOUC（Flash Of Unstyled Content）指的是在页面加载过程中，由于外部样式表（CSS）加载较慢或延迟，导致页面先以无样式的方式显示，然后突然闪烁出样式的现象。

**为了避免FOUC，可以采取以下方法：**

1. 将样式表放置在文档的`<head>`标签中：通过将样式表放在文档头部，确保浏览器在渲染页面内容之前先加载和解析样式表，从而避免了页面一开始的无样式状态。
2. 使用内联样式：将关键的样式直接写在HTML标签的`style`属性中，这样即使外部样式表加载延迟，页面仍然可以有基本的样式展示，避免出现完全无样式的情况。
3. 使用样式预加载：在HTML的`<head>`中使用`<link rel="preload">`标签，将样式表提前预加载，以确保在页面渲染之前样式表已经下载完毕。
4. 避免过多的样式表和样式文件：减少页面中使用的样式表数量和样式文件大小，优化样式表的结构和规则，从而加快样式表的加载速度。
5. 使用媒体查询避免不必要的样式加载：通过媒体查询（`@media`）在适当的条件下加载特定的样式，避免在不需要的情况下加载不必要的样式。

综上所述，通过优化样式加载顺序、使用内联样式、样式预加载和合理使用媒体查询等方法，可以有效避免FOUC的出现，提供更好的用户体验。

## 5. 如何创建块级格式化上下文(block formatting context),BFC有什么用？

> BFC(Block Formatting Context)，块级格式化上下文，是一个独立的渲染区域，让处于 BFC 内部的元素与外部的元素相互隔离，使内外元素的定位不会相互影响

要创建一个块级格式化上下文（BFC），可以应用以下方法：

1. 使用`float`属性：将元素的`float`属性设置为除`none`以外的值，可以创建一个BFC。
2. 使用`overflow`属性：将元素的`overflow`属性设置为除`visible`以外的值，例如`auto`或`hidden`，可以创建一个BFC。
3. 使用`display`属性：将元素的`display`属性设置为`inline-block`、`table-cell`、`table-caption`等特定的值，可以创建一个BFC。
4. 使用`position`属性：将元素的`position`属性设置为`absolute`、`fixed`、`relative`或`sticky`，可以创建一个BFC。
5. 使用`contain`属性：将元素的`contain`属性设置为`layout`，可以创建一个BFC（仅适用于部分浏览器）。

> 在`IE`下, `Layout`,可通过`zoom:1` 触发

**BFC布局与普通文档流布局区别 普通文档流布局:**

- 浮动的元素是不会被父级计算高度
- 非浮动元素会覆盖浮动元素的位置
- `margin`会传递给父级元素
- 两个相邻元素上下的`margin`会重叠

**BFC布局规则:**

- 浮动的元素会被父级计算高度(父级元素触发了`BFC`)
- 非浮动元素不会覆盖浮动元素的位置(非浮动元素触发了`BFC`)
- `margin`不会传递给父级(父级触发`BFC`)
- 属于同一个`BFC`的两个相邻元素上下`margin`会重叠

**开发中的应用：**

- 阻止`margin`重叠
- 可以包含浮动元素 —— 清除内部浮动(清除浮动的原理是两个 `div`都位于同一个 `BFC` 区域之中)
- 自适应两栏布局
- 可以阻止元素被浮动元素覆盖

## 6. display、float、position的关系

- 如果`display`取值为`none`，那么`position`和`float`都不起作用，这种情况下元素不产生框
- 否则，如果`position`取值为`absolute`或者`fixed`，框就是绝对定位的，`float`的计算值为`none`，`display`根据下面的表格进行调整。
- 否则，如果`float`不是`none`，框是浮动的，`display`根据下表进行调整
- 否则，如果元素是根元素，`display`根据下表进行调整
- 其他情况下`display`的值为指定值
- 总结起来：**绝对定位、浮动、根元素都需要调整`display`**

![1](/images/202202231030963.png)

综上所述，display、float和position之间存在一定的关系，它们的取值会相互影响元素的布局和显示方式。根据不同的取值组合，元素的display值可能会被调整。

## 7. 谈谈浮动、清除浮动有几种方式，它们各自的优缺点？

浮动（float）是CSS中的一种布局方式，它允许元素向左或向右浮动并脱离文档的正常流，其他元素会围绕浮动元素进行布局。

**浮动的特点和应用：**

1. 元素浮动后，其原位置会被其他元素填充，不再占据文档流中的空间。
2. 浮动元素会尽可能地靠近其包含块的左侧或右侧，直到遇到另一个浮动元素或包含块的边界。
3. 浮动元素可以通过设置`float`属性为`left`或`right`进行左浮动或右浮动。
4. 常见应用包括实现多列布局、文字环绕图片等。

以下是清除浮动的几种常见方式以及它们的优缺点：

1. **父级 `div` 定义 `height`：** 将父级容器的高度设置为已浮动元素的高度。优点是简单易实现，缺点是需要提前知道浮动元素的高度，如果高度发生变化，需要手动调整。
2. **结尾处加空 `div` 标签 `clear:both`：** 在浮动元素后面添加一个空的 `div` 标签，并设置 `clear:both`。优点是简单易实现，缺点是需要添加多余的空标签，不符合语义化。
3. **父级 `div` 定义伪类 `:after` 和 `zoom`：** 父级容器使用伪元素 `:after` 清除浮动，并设置 `zoom:1` 触发 `hasLayout`。优点是不需要额外添加多余的标签，清除浮动效果好，缺点是对老版本浏览器的兼容性需要考虑。
4. **父级 `div` 定义 `overflow:hidden`：** 将父级容器的 `overflow` 属性设置为 `hidden`。优点是简单易实现，不需要添加额外的标签，缺点是可能会造成内容溢出隐藏。
5. **父级 `div` 也浮动，需要定义宽度：** 将父级容器也设置为浮动，并定义宽度。优点是清除浮动效果好，缺点是需要定义宽度，不够灵活。
6. **结尾处加 `br` 标签 `clear:both`：** 在浮动元素后面添加 `br` 标签，并设置 `clear:both`。和第2种方式类似，优缺点也相似。
7. **使用 clearfix 类：** 在父级容器上应用 clearfix 类，该类包含伪元素清除浮动。优点是代码简洁易懂，不需要额外添加标签，缺点是需要定义并引用 `clearfix` 类。

> 总体而言，使用伪类 `:after` 和 `zoom` 的方式是较为常见和推荐的清除浮动的方法，它可以避免添加多余的标签，并具有较好的兼容性。然而，不同场景下适合使用不同的清除浮动方式，需要根据实际情况选择合适的方法。

## 8. 为什么要初始化CSS样式?

初始化 CSS 样式的目的主要有以下几点：

1. **浏览器兼容性：** 不同浏览器对于 HTML 元素的默认样式存在差异，通过初始化 CSS 样式，可以尽量消除不同浏览器之间的显示差异，使页面在各个浏览器中更加一致。
2. **统一样式：** 通过初始化 CSS 样式，可以为各个元素提供一个统一的基础样式，避免默认样式的影响。这有助于开发者在项目中构建一致的界面风格，提高开发效率。
3. **提高可维护性：** 初始化 CSS 样式可以避免在编写具体样式时受到浏览器默认样式的干扰，减少不必要的样式覆盖和调整，从而提高代码的可维护性和可读性。
4. **优化性能：** 通过初始化 CSS 样式，可以避免不必要的样式计算和渲染，减少浏览器的工作量，提升页面加载和渲染性能。

需要注意的是，在进行 CSS 样式初始化时，应该注意选择合适的方式和范围，避免过度初始化造成不必要的代码冗余和性能损耗。同时，针对具体项目和需求，可以选择使用已有的 CSS 初始化库或者自定义初始化样式。

## 9. css3有哪些新特性？

CSS3引入了许多新特性，以下是其中一些常见的新特性：

1. **新增选择器**：例如`:nth-child()`、`:first-of-type`、`:last-of-type`等，可以根据元素在父元素中的位置进行选择。
2. **弹性盒模型**：通过`display: flex;`可以创建弹性布局，简化了元素的排列和对齐方式。
3. **多列布局**：使用`column-count`和`column-width`等属性可以实现将内容分为多列显示。
4. **媒体查询**：通过`@media`可以根据设备的特性和屏幕大小应用不同的样式规则。
5. **个性化字体**：使用`@font-face`可以引入自定义字体，并在网页中使用。
6. **颜色透明度**：通过`rgba()`可以设置颜色的透明度。
7. **圆角**：使用`border-radius`可以给元素添加圆角效果。
8. **渐变**：使用`linear-gradient()`可以创建线性渐变背景效果。
9. **阴影**：使用`box-shadow`可以为元素添加阴影效果。
10. **倒影**：使用`box-reflect`可以为元素添加倒影效果。
11. **文字装饰**：使用`text-stroke-color`可以设置文字描边的颜色。
12. **文字溢出**：使用`text-overflow`可以处理文字溢出的情况。
13. **背景效果**：使用`background-size`可以控制背景图片的大小。
14. **边框效果**：使用`border-image`可以为边框使用图片来创建特殊效果。
15. **转换**：使用`transform`可以实现元素的旋转、倾斜、位移和缩放等变换效果。
16. **平滑过渡**：使用`transition`可以为元素的属性变化添加过渡效果。
17. **动画**：通过`@keyframes`和`animation`可以创建元素的动画效果。

**CSS3引入了许多新的伪类，以下是一些常见的新增伪类：**

1. `:nth-child(n)`：选择父元素下的第n个子元素。
2. `:first-child`：选择父元素下的第一个子元素。
3. `:last-child`：选择父元素下的最后一个子元素。
4. `:nth-of-type(n)`：选择父元素下特定类型的第n个子元素。
5. `:first-of-type`：选择父元素下特定类型的第一个子元素。
6. `:last-of-type`：选择父元素下特定类型的最后一个子元素。
7. `:only-child`：选择父元素下仅有的一个子元素。
8. `:only-of-type`：选择父元素下特定类型的唯一一个子元素。
9. `:empty`：选择没有任何子元素或者文本内容的元素。
10. `:target`：选择当前活动的目标元素。
11. `:enabled`：选择可用的表单元素。
12. `:disabled`：选择禁用的表单元素。
13. `:checked`：选择被选中的单选框或复选框。
14. `:focus`：选择当前获取焦点的元素。
15. `:hover`：选择鼠标悬停在上方的元素。
16. `:visited`：选择已访问过的链接。
17. `:not(selector)`：选择不符合给定选择器的元素。

这些新增的伪类为选择元素提供了更多的灵活性和精确性，使得开发者能够更好地控制和样式化文档中的元素。

## 10. display有哪些值？说明他们的作用

`display`属性用于定义元素应该生成的框类型。以下是常见的`display`属性值及其作用：

1. `block`：将元素转换为块状元素，独占一行，可设置宽度、高度、边距等属性。
2. `inline`：将元素转换为行内元素，不独占一行，只占据内容所需的空间，无法设置宽度、高度等块级属性。
3. `none`：设置元素不可见，在渲染时将其完全隐藏，不占据任何空间。
4. `inline-block`：使元素既具有行内元素的特性（不独占一行），又具有块级元素的特性（可设置宽度、高度等属性），可以看作是行内块状元素。
5. `list-item`：将元素作为列表项显示，常用于有序列表（`<ol>`）和无序列表（`<ul>`）中，会添加列表标记。
6. `table`：将元素作为块级表格显示，常用于构建表格布局，类似于`<table>`元素。
7. `inherit`：规定应从父元素继承`display`属性的值，使元素继承父元素的框类型。

这些`display`属性值用于控制元素的外观和布局，通过选择适当的值可以实现不同的布局效果。

## 11. 介绍一下标准的CSS的盒子模型？低版本IE的盒子模型有什么不同的？

> - 有两种，`IE`盒子模型、`W3C`盒子模型；
> - 盒模型：内容(content)、填充(`padding`)、边界(`margin`)、 边框(`border`)；
> - 区 别： IE`的c`ontent`部分把`border`和`padding`计算了进去;

- 盒子模型构成：内容(`content`)、内填充(`padding`)、 边框(`border`)、外边距(`margin`)
- `IE8`及其以下版本浏览器，未声明 `DOCTYPE`，内容宽高会包含内填充和边框，称为怪异盒模型(`IE`盒模型)
- 标准(`W3C`)盒模型：元素宽度 = `width + padding + border + margin`
- 怪异(`IE`)盒模型：元素宽度 = `width + margin`
- 标准浏览器通过设置 css3 的 `box-sizing: border-box` 属性，触发“怪异模式”解析计算宽高

**box-sizing 常用的属性有哪些？分别有什么作用**

`box-sizing`属性用于控制元素的盒模型类型，常用的属性值有：

1. `content-box`：默认值，使用标准的`W3C`盒模型，元素的宽度和高度仅包括内容区域（`content`），不包括填充、边框和外边距。
2. `border-box`：使用怪异的`IE`盒模型，元素的宽度和高度包括内容区域（`content`）、填充（`padding`）和边框（`border`），但不包括外边距（`margin`）。即元素的宽度和高度指定的是内容区域加上填充和边框的总宽度和高度。
3. `inherit`：继承父元素的`box-sizing`属性值。

通过设置不同的`box-sizing`属性值，可以控制元素的盒模型类型，进而影响元素的布局和尺寸计算。使用`border-box`可以更方便地处理元素的宽度和高度，特别适合响应式布局和网格系统的设计。

## 12. position的值， relative和absolute定位原点是？

`position` 属性用于控制元素的定位方式，常用的取值包括：

- `static`：默认值，表示元素在文档流中正常定位，不会受到 `top`、`right`、`bottom`、`left` 属性的影响。
- `relative`：生成相对定位的元素，相对于其正常位置进行定位，通过设置 `top`、`right`、`bottom`、`left` 属性来调整元素的位置，不会脱离文档流，周围的元素仍然会按照正常布局进行排列。
- `absolute`：生成绝对定位的元素，相对于最近的非 `static` 定位的父元素进行定位，如果没有非 `static` 定位的父元素，则相对于文档根元素（即浏览器窗口）进行定位。绝对定位的元素会脱离文档流，不占据空间，可以通过设置 `top`、`right`、`bottom`、`left` 属性来精确控制元素的位置。
- `fixed`：生成绝对定位的元素，相对于浏览器窗口进行定位，不会随着页面的滚动而改变位置。可以通过设置 `top`、`right`、`bottom`、`left` 属性来指定元素的位置。
- `inherit`：规定从父元素继承 `position` 属性的值。

> 对于 `relative` 和 `absolute` 定位，其原点（坐标基准点）是元素在正常文档流中的位置。通过调整 `top`、`right`、`bottom`、`left` 属性，可以相对于原点在水平和垂直方向上进行偏移，实现元素的精确定位。

## 13. display:inline-block 什么时候不会显示间隙？

> `display: inline-block` 元素在默认情况下会产生间隙，这是因为它们被视为行内元素，会保留默认的行框高度和基线对齐。然而，可以采取一些方法来消除这些间隙，使元素紧密排列，例如在携程网站中的布局。

以下是一些消除间隙的常见方法：

1. 移除空格：在 HTML 代码中，将 `inline-block` 元素之间的空格删除，以消除间隙。
2. 使用负值 `margin`：通过设置负值的左右外边距（`margin`）来抵消间隙。例如，可以使用 `margin-right: -4px;` 来消除间隙。
3. 使用 `font-size: 0;`：将 `inline-block` 元素的父元素的字体大小设置为 0，然后在 `inline-block` 元素上重新设置所需的字体大小。这样可以消除间隙，因为元素内部没有文字导致的间隙。
4. 使用 `letter-spacing`：在 `inline-block` 元素的父元素上设置负值的 `letter-spacing`，例如 `letter-spacing: -4px;`，可以消除间隙。
5. 使用 `word-spacing`：在 `inline-block` 元素的父元素上设置负值的 `word-spacing`，例如 `word-spacing: -4px;`，可以消除间隙。

这些方法都是通过调整元素的布局或字体属性来实现消除间隙的效果。具体的方法选择取决于实际需求和布局要求。

## 14. PNG\GIF\JPG的区别及如何选

> `PNG`, `GIF`, 和 `JPG` 是常见的图像文件格式，它们在以下方面有所区别：

1. **GIF (Graphics Interchange Format)**

   - 使用 `8` 位像素，最多支持 `256` 种颜色。
   - 采用无损压缩算法，不会损失图像质量。
   - 支持简单的动画功能，可以创建循环播放的图像。
   - 支持二进制透明和索引透明，可以实现简单的透明效果。
   - 适用于图标、简单的动画和带有透明背景的图像。

2. **JPEG (Joint Photographic Experts Group)**

   - 支持高达 `16.7` 百万种颜色，适合存储照片和复杂图像。
   - 使用有损压缩算法，可以调整压缩质量以平衡图像质量和文件大小。
   - 不支持透明效果，背景会被默认填充为白色。
   - 适合摄影、艺术作品等需要保留高质量细节的图像。

3. **PNG (Portable Network Graphics)**

   - 有两种类型：`PNG-8` 和真彩色 `PNG`。
   - `PNG-8` 类似于 `GIF`，支持最多 `256` 种颜色，文件较小，可以实现透明效果。
   - 真彩色 `PNG` 支持高分辨率的真彩色图像，文件较大，支持完全的 `alpha` 透明度。
   - 不支持动画功能。
   - 适合图标、背景、按钮等需要透明度的图像。

**选择使用哪种图像格式取决于图像的特点和用途：**

- 如果需要动画效果，可以选择`GIF`格式。
- 如果是照片或复杂图像，需要高质量和丰富的颜色，可以选择 `JPG` 格式。
- 如果需要透明背景或简单的透明效果，可以选择 `PNG` 格式，根据图像的复杂性选择 `PNG-8` 或真彩色 `PNG`。

## 15. 在网页中的应该使用奇数还是偶数的字体？为什么呢？

在网页中，通常建议使用偶数字号的字体，即字号为偶数（如 `12px`、`14px`、`16px` 等）。这是因为偶数字号相对更容易与网页设计的其他部分构成比例关系，具有更好的视觉平衡和一致性。

以下是一些原因和考虑因素：

1. **整数像素对齐：** 偶数字号的字体大小通常是整数像素，而在网页渲染中，整数像素对齐可以提供更锐利和清晰的显示效果。当字号为奇数时，可能需要进行半像素渲染，这可能会导致字体显示模糊或模糊。
2. **比例和对称：** 使用偶数字号的字体可以更容易与其他设计元素形成比例和对称。网页设计通常依赖于一致的比例和对称性，而使用偶数字号的字体可以更好地与网页中的其他元素（如标题、段落、间距等）形成和谐的视觉关系。
3. **浏览器兼容性：** 一些浏览器对于奇数字号字体的渲染效果可能与偶数字号字体略有不同，可能会导致细微的差异。使用偶数字号字体可以减少在不同浏览器上的显示差异。

需要注意的是，这只是一些建议，并不意味着绝对规定。在实际设计中，根据具体情况和个人审美偏好，也可以使用奇数字号字体。最重要的是确保字体大小与整体设计风格和一致性相匹配。

## 16. （⭐阿里）如果需要手动写动画，你认为最小时间间隔是多久，为什么？

- 多数显示器默认频率是`60Hz`，即`1`秒刷新`60`次，所以理论上最小间隔为`1/60*1000ms ＝ 16.7ms`
- 如果需要手动编写动画，建议将最小时间间隔设置为 `16.7ms`，即每帧动画的时间间隔。这是因为大多数显示器的默认刷新频率是 `60Hz`，也就是每秒刷新 `60` 次。在这种情况下，将动画的时间间隔设置为 `16.7ms` 可以确保每帧动画都能够在显示器刷新之前完成。
- 如果时间间隔小于 `16.7ms`，则会导致某些帧在显示器刷新之后才能呈现，造成不连续的动画效果，也称为"跳帧"现象。因此，将时间间隔设置为 `16.7ms` 是一个相对较小的值，可以保证较平滑的动画效果，并且适应大多数显示器的刷新频率。

需要注意的是，由于设备和浏览器的差异，实际的刷新频率和性能可能会有所不同。因此，在编写动画时，还应该进行实际测试和优化，确保动画在各种设备和浏览器上都能够获得良好的表现。

## 17. CSS不同选择器的权重(CSS层叠的规则)

CSS选择器的权重规则可以总结如下：

1. `!important`规则：具有最高的优先级，优先级为最大。
2. 行内样式：通过 `style` 属性直接定义的样式具有较高的权重，优先级为 `1000`。
3. ID 选择器：每个 ID 选择器的权重为 `100`。
4. 类选择器、属性选择器和伪类选择器：每个类选择器、属性选择器或伪类选择器的权重为 `10`。
5. 元素选择器：每个元素选择器的权重为 `1`。

当应用多个选择器到同一个元素时，根据上述规则计算各个选择器的权重，具有较高权重的样式将被应用。如果存在权重相同的情况，则根据样式规则的先后顺序来决定哪个样式生效，后声明的样式会覆盖先声明的样式。

下面是一个权重计算的示例：

```css
/* 权重为 1 */
div {
}

/* 权重为 10 */
.class1 {
}

/* 权重为 100 */
#id1 {
}

/* 权重为 101 (100 + 1) */
#id1 div {
}

/* 权重为 11 (10 + 1) */
.class1 div {
}

/* 权重为 21 (10 + 10 + 1) */
.class1 .class2 div {
}
```

根据权重的计算规则，选择器的权重越高，其样式优先级越高，将更有可能应用到对应的元素上。

## 18. CSS在性能优化方面的实践

在性能优化方面，以下是一些CSS的实践方法：

1. 压缩和合并CSS：使用CSS压缩工具将CSS文件压缩，并将多个`CSS`文件合并为一个文件，减少网络请求次数和文件大小。
2. 使用`Gzip`压缩：配置服务器开启`Gzip`压缩，可以减小`CSS`文件的大小，加快文件传输速度。
3. 将CSS文件放在`<head>`标签中：将CSS文件的引用放在HTML文档的`<head>`标签中，以便在页面渲染前加载CSS样式。
4. 避免使用`@import`：避免在`CSS`中使用@import导入其他CSS文件，因为`@import`会增加额外的请求延迟，推荐使用`<link>`标签引入CSS文件。
5. 使用缩写属性：尽量使用`CSS`的缩写属性，如`margin`、`padding`、`font`等，可以减少`CSS`文件的大小。
6. 避免使用滤镜：某些`CSS`滤镜效果会导致性能下降，特别是在大型页面中使用，尽量避免滤镜的使用。
7. 合理使用选择器：选择器的复杂性会影响CSS选择器的匹配速度，尽量避免使用过于复杂的选择器，减少选择器的层级和嵌套。
8. 避免使用`CSS`表达式：`CSS`表达式会在每次页面重绘时重新计算，影响性能，尽量避免使用。
9. 使用缓存：通过设置适当的`HTTP`响应头，将`CSS`文件缓存到浏览器中，减少重复请求。
10. 使用媒体查询：针对不同设备和屏幕尺寸，使用媒体查询来加载不同的`CSS`样式，提高响应性能。

这些实践方法可以帮助优化CSS在网页加载和渲染过程中的性能，减少加载时间，提升用户体验。

## base64的原理及优缺点

Base64是一种将二进制数据编码为ASCII字符的方法，通过将二进制数据转换为由64个字符组成的可打印字符序列，实现二进制数据的传输和存储。

**Base64编码的原理如下：**

1. 将待编码的数据按照每3个字节一组进行分组。
2. 将每组3个字节转换为4个6位的Base64字符。
3. 如果最后一组不足3个字节，根据需要进行填充。
4. 将转换后的Base64字符拼接在一起，形成最终的Base64编码结果。

**优点：**

- 可以将二进制数据转换为文本数据，方便在文本环境中传输和存储。
- 减少了HTTP请求，可以将小的图片或其他资源直接嵌入到HTML、CSS或JavaScript代码中，减少了对服务器的请求次数。

**缺点：**

- Base64编码会使数据的大小增加，因为每3个字节的原始数据会转换为4个字节的Base64编码数据。
- Base64编码是一种可逆的编码方法，虽然可以加密数据，但并不提供真正的安全性。
- 编码和解码过程涉及到字符转换和处理，消耗了一定的CPU资源。

总的来说，Base64编码适用于在文本环境中传输和存储二进制数据，并且可以减少HTTP请求。但在需要考虑数据大小和性能的情况下，需要权衡使用Base64编码的优缺点。

## 19. postcss的作用

> - 可以直观的理解为：它就是一个平台。为什么说它是一个平台呢？因为我们直接用它，感觉不能干什么事情，但是如果让一些插件在它上面跑，那么将会很强大
> - `PostCSS` 提供了一个解析器，它能够将 `CSS` 解析成抽象语法树
> - 通过在 `PostCSS` 这个平台上，我们能够开发一些插件，来处理我们的`CSS`，比如热门的：`autoprefixer`
> - `postcss`可以对sass处理过后的`css`再处理 最常见的就是`autoprefixer`

`PostCSS` 是一个用于转换 `CSS` 的工具，它提供了一个插件化的架构，可以通过加载各种插件来处理 `CSS`。主要作用包括：

1. **转换 CSS**：`PostCSS` 可以将 `CSS` 解析成抽象语法树（AST），并允许开发者编写插件来修改和转换 `CSS`。这使得开发者可以自定义和扩展 `CSS` 的功能，从而提供更灵活的编写样式的能力。
2. **自动添加浏览器前缀**：`PostCSS` 的插件生态系统中最常用的插件之一是 `autoprefixer`。它可以根据配置和浏览器兼容性自动为样式属性添加浏览器前缀，以确保在不同浏览器中正确显示样式。
3. **代码优化和压缩**：`PostCSS` 的插件可以用于优化和压缩 `CSS` 代码，删除不必要的空格、注释、重复规则等，以减小文件大小并提高加载速度。
4. **使用未来的 CSS 语法**：`PostCSS` 可以支持使用未来的 `CSS` 语法和功能，例如使用 `CSS Variables`、`CSS Modules`、`CSS Grid` 等。通过一些插件，可以在现有浏览器中使用这些新特性，而无需等待浏览器的更新。

> 总之，`PostCSS` 提供了一个灵活的平台和插件生态系统，可以对 `CSS` 进行各种转换和优化，使开发者能够更好地编写和管理样式代码，并兼容不同的浏览器和未来的 `CSS` 标准。

## 20. 如何美化CheckBox？

- `<label>` 属性 `for` 和 `id`
- 隐藏原生的 `<input>`
- `:checked + <label>`

**要美化复选框（CheckBox），可以按照以下步骤进行操作：**

1. 使用 `<label>` 标签和关联的 `<input>` 元素：将复选框包裹在 `<label>` 标签中，并使用 `for` 属性与对应的 `<input>` 元素的 `id` 进行关联，确保点击标签时也可以触发复选框的选择状态。

```html
<label for="myCheckbox">Checkbox Label</label>
<input type="checkbox" id="myCheckbox" />
```

2. 隐藏原生的 `<input>` 元素：使用 CSS 样式将原生的 `<input>` 元素隐藏起来，使其不可见。

```css
input[type='checkbox'] {
  display: none;
}
```

3. 使用 CSS 样式美化复选框：利用 CSS 样式为复选框创建自定义的外观效果。

```css
input[type='checkbox'] + label {
  /* 定义复选框的样式 */
}

input[type='checkbox']:checked + label {
  /* 定义选中时复选框的样式 */
}
```

在上述样式中，`:checked` 选择器用于选中状态下的样式，`+` 选择器用于选择紧接在 `<input>` 元素后的兄弟 `<label>` 元素。

通过调整这些样式，您可以改变复选框的外观，如更改背景颜色、添加边框、改变图标等。可以使用 CSS 属性如 `background-color`、`border`、`color`、`content` 等来设置样式。

例如，以下示例将复选框的背景颜色设置为蓝色，并在选中时添加一个打勾的图标：

```css
input[type='checkbox'] + label {
  display: inline-block;
  padding-left: 25px;
  position: relative;
  cursor: pointer;
}

input[type='checkbox'] + label:before {
  content: '';
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #999;
  border-radius: 3px;
  margin-right: 10px;
  position: absolute;
  left: 0;
  top: 2px;
}

input[type='checkbox']:checked + label:before {
  background-color: blue;
  border-color: blue;
  content: '\2713';
  text-align: center;
  font-size: 14px;
  line-height: 16px;
  color: #fff;
}
```

通过使用类似上述的 CSS 样式，您可以根据需要定制复选框的外观和样式，以实现美化效果。

## 21. base64的使用场景

- 用于减少 `HTTP` 请求
- 适用于小图片
- `base64`的体积约为原图的`3/4`

`base64` 是一种将二进制数据编码为 ASCII 字符串的方法，它常被用于将小文件（如图片、字体文件等）嵌入到 `HTML`、`CSS` 或 `JavaScript` 中，从而减少对服务器的请求次数。

使用 `base64` 编码可以将二进制文件转换为文本字符串，这样可以直接将字符串嵌入到代码中，而无需单独请求文件。这样做的好处是可以减少 `HTTP` 请求的数量，提升页面加载速度，尤其适用于小图片或者一些图标字体等。

然而，使用 `base64` 编码也有一些注意事项。由于 `base64` 编码后的文本字符串比原始二进制数据体积大约增加了 1/3，因此对于大文件来说，使用 `base64` 会导致数据传输量增加，可能会影响网页的加载速度。此外，由于嵌入了文件内容，导致代码体积增大，也会对可维护性产生一定的影响。

因此，通常建议将 `base64` 使用在小文件上，如小图标、小图片等，而对于大文件，仍然应该以原始文件的形式进行请求和传输，以获得更好的性能和可维护性。

## 22. 请用CSS写一个简单的幻灯片效果页面

> 知道是要用CSS3。使用animation动画实现一个简单的幻灯片效果

```css
/**css**/
.ani {
  width: 480px;
  height: 320px;
  margin: 50px auto;
  overflow: hidden;
  box-shadow: 0 0 5px rgba(0, 0, 0, 1);
  background-size: cover;
  background-position: center;
  -webkit-animation-name: 'loops';
  -webkit-animation-duration: 20s;
  -webkit-animation-iteration-count: infinite;
}
@-webkit-keyframes "loops" {
  0% {
    background: url(http://d.hiphotos.baidu.com/image/w%3D400/sign=c01e6adca964034f0fcdc3069fc27980/e824b899a9014c08e5e38ca4087b02087af4f4d3.jpg)
      no-repeat;
  }
  25% {
    background: url(http://b.hiphotos.baidu.com/image/w%3D400/sign=edee1572e9f81a4c2632edc9e72b6029/30adcbef76094b364d72bceba1cc7cd98c109dd0.jpg)
      no-repeat;
  }
  50% {
    background: url(http://b.hiphotos.baidu.com/image/w%3D400/sign=937dace2552c11dfded1be2353266255/d8f9d72a6059252d258e7605369b033b5bb5b912.jpg)
      no-repeat;
  }
  75% {
    background: url(http://g.hiphotos.baidu.com/image/w%3D400/sign=7d37500b8544ebf86d71653fe9f9d736/0df431adcbef76095d61f0972cdda3cc7cd99e4b.jpg)
      no-repeat;
  }
  100% {
    background: url(http://c.hiphotos.baidu.com/image/w%3D400/sign=cfb239ceb0fb43161a1f7b7a10a54642/3b87e950352ac65ce2e73f76f9f2b21192138ad1.jpg)
      no-repeat;
  }
}
```

<!-- <Slide /> -->

## 23. px和em的区别

`px`和`em`是两种不同的长度单位，它们的区别如下：

- `px`（像素）是一个绝对单位，表示固定的像素大小。无论父元素的字体大小如何，`px`的值都不会改变，它是一个固定的长度单位。
- `em`（倍数）是一个相对单位，它相对于父元素的字体大小来确定自身的大小。如果没有设置字体大小，则`1em`等于浏览器默认的字体大小（通常是`16px`）。如果父元素的字体大小是`16px`，那么`1em`就等于`16px`，`2em`就等于`32px`，以此类推。

由于`em`是相对单位，它具有一定的灵活性和可扩展性。当需要调整整个页面的字体大小时，只需更改根元素的字体大小，其他使用`em`作为单位的元素会自动按比例调整大小，从而实现页面的整体缩放效果。

相对于px来说，em更适用于实现弹性布局、响应式设计以及根据用户偏好进行字体大小调整等场景。

**小结:**

- `px`和`em`都是长度单位，区别是，`px`的值是固定的，指定是多少就是多少，计算比较容易。`em`得值不是固定的，并且`em`会继承父级元素的字体大小。
- 浏览器的默认字体高都是`16px`。所以未经调整的浏览器都符合: `1em=16px`。那么`12px=0.75em`, `10px=0.625em`。

> [!WARNING]
>
> **px 相对于显示器屏幕分辨率，无法用浏览器字体放大功能**  
> **em 值并不是固定的，会继承父级的字体大小： em = 像素值 / 父级font-size**

## 24. 如何使用CSS实现硬件加速？

> [!NOTE]
> 硬件加速是指通过创建独立的复合图层，让GPU来渲染这个图层，从而提高性能。

一般触发硬件加速的`CSS`属性有`transform`、`opacity`、`filter`，为了避免2D动画在开始和结束的时候的`repaint`操作，一般使用`tranform:translateZ(0)`

**使用CSS实现硬件加速可以通过以下方法：**

1.  **使用3D变换**：通过应用3D变换，如`translateZ(0)`，来触发硬件加速。这会将元素视为3D空间中的一个对象，使浏览器使用GPU进行渲染。

```css
.element {
  transform: translateZ(0);
}
```

2.  **使用CSS动画**：使用CSS动画属性（如`transform`、`opacity`、`filter`）来触发硬件加速。这可以通过创建一个动画并将其应用于元素来实现。

```css
.element {
  animation: myAnimation 1s linear infinite;
}

@keyframes myAnimation {
  0% {
    transform: translateZ(0);
  }
  100% {
    transform: translateZ(0);
  }
}
```

3.  **使用CSS过渡**：通过使用CSS过渡属性（如`transform`、`opacity`、`filter`）来触发硬件加速。这可以通过设置过渡效果来实现。

```css
.element {
  transition: transform 0.3s ease;
}

.element:hover {
  transform: translateZ(0);
}
```

请注意，硬件加速并不是适用于所有情况的解决方案，它对于涉及大量动画或复杂渲染的元素特别有效。但是，在某些情况下，过多地使用硬件加速可能会导致性能问题，因此需要在实际使用时进行评估和测试。

## 25. 重绘和回流（重排）是什么，如何避免？

重绘（Repaint）和回流（Reflow）是浏览器在渲染页面时的两个关键过程。

- **重绘（Repaint）** 是指当元素的外观属性（如颜色、背景等）发生改变，但不影响布局时的重新绘制过程。重绘不会影响元素的几何尺寸和位置。
- **回流（Reflow）** 是指当元素的布局属性（如尺寸、位置、隐藏/显示等）发生改变，导致浏览器重新计算元素的几何属性，重新构建渲染树的过程。回流会导致其他相关元素的回流和重绘。
- 回流必将引起重绘，而重绘不一定会引起回流

避免重绘和回流对于提高页面性能和响应速度至关重要。以下是一些减少重绘和回流的方法：

- **使用 CSS3 动画**：使用 CSS3 的 `transform` 和 `opacity` 等属性来创建动画效果，因为它们会触发硬件加速，减少重绘和回流的影响。
- **批量修改样式**：避免频繁修改单个元素的样式，尽可能将修改合并为一次操作，可以使用 `class` 或修改 `style` 属性的方式。
- **使用文档片段**：当需要添加多个 DOM 元素到文档中时，可以先创建一个文档片段（`DocumentFragment`），将元素添加到片段中，然后再将片段一次性添加到文档中，减少回流次数。
- **使用离线 DOM**：将元素从文档中移除（`display: none`），进行复杂的操作（如修改样式、添加子元素等），完成后再将元素放回文档，以减少回流和重绘的影响。
- **缓存布局属性值**：如果需要多次访问某个元素的布局属性（如位置、尺寸等），可以将其值缓存起来，避免多次触发回流计算。
- **避免强制同步布局**：避免在 JavaScript 中获取布局属性（如使用 `offsetTop`、`clientWidth` 等），因为它会强制同步计算布局信息，触发回流。如果需要获取布局信息，最好将获取操作放在一起，或使用 `getBoundingClientRect()` 方法。

通过合理的设计和优化，可以最小化重绘和回流的次数，提高页面性能和用户体验。

参考：[渲染页面：浏览器的工作原理](https://developer.mozilla.org/zh-CN/docs/Web/Performance/How_browsers_work#%E6%B8%B2%E6%9F%93)

## 26. CSS有哪些继承属性？

CSS中有一些属性是可以继承的，这意味着父元素的某些样式属性会自动应用到子元素上。以下是一些常见的继承属性：

- 字体相关属性：
  - `font`
  - `font-family`
  - `font-size`
  - `font-weight`
  - `font-style`
- 文本排版属性：
  - `word-break`
  - `letter-spacing`
  - `text-align`
  - `text-rendering`
  - `word-spacing`
  - `white-space`
  - `text-indent`
  - `text-transform`
  - `text-shadow`
- 行高属性：
  - `line-height`
- 颜色相关属性：
  - `color`
- 可见性属性：
  - `visibility`
- 光标属性：
  - `cursor`

## 27. 请解释一下 CSS3 的 Flexbox（弹性盒布局模型）以及适用场景

`Flexbox` 是 CSS3 中引入的一种弹性盒布局模型，用于在容器内创建灵活的、自适应的布局。它提供了一种强大的方式来对齐、分布和调整容器中的项目。

`Flexbox` 的适用场景包括但不限于以下情况：

1. 等高布局：`Flexbox` 可以轻松实现容器内多个项目等高的布局，无论项目的内容多少。
2. 自适应布局：`Flexbox` 可以根据容器的可用空间自动调整项目的大小，以适应不同尺寸的屏幕或容器。
3. 项目排序：`Flexbox` 可以通过改变项目的顺序来实现在不同屏幕尺寸下的布局调整。
4. 对齐和分布：`Flexbox` 提供了多种对齐和分布项目的方式，如水平居中、垂直居中、平均分布等。
5. 响应式设计：`Flexbox` 可以与媒体查询结合使用，根据屏幕尺寸调整容器中项目的布局方式。

`Flexbox` 的特点包括：

- 父容器具有弹性，可以自动调整项目的大小和顺序。
- 子项目可以具有灵活的宽度、高度和顺序。
- 可以轻松实现响应式设计，适应不同的屏幕尺寸和设备。
- 提供了多种对齐和分布项目的属性和方法，使布局更加灵活和易于控制。

总而言之，`Flexbox` 提供了一种简单、直观且强大的布局方式，适用于构建各种自适应和灵活的布局，特别适合用于构建响应式设计和移动端布局。

参考：[Flex 布局教程：语法篇 - 阮一峰](https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

## 28. 浏览器是怎样解析CSS选择器的？

浏览器解析CSS选择器的过程是从右到左进行的。当浏览器遇到一个CSS规则时，它会从选择器的最右边开始解析，然后逐步向左匹配元素。

**具体的解析过程如下：**

1. 浏览器从右向左选择器的最右边开始解析，找到与该选择器匹配的元素。
2. 然后，浏览器向左继续解析选择器的下一个部分，检查该元素的父元素是否满足选择器的条件。
3. 如果满足选择器的条件，则继续向左解析选择器的下一个部分，继续检查父元素的父元素是否满足选择器的条件。
4. 浏览器重复这个过程，直到解析完整个选择器或者找不到与选择器匹配的元素。

这种从右到左的解析方式可以提高选择器的性能，特别是在面对复杂的选择器和大量元素的情况下。因为从右到左的解析可以尽早过滤掉不匹配的元素，减少了需要遍历的元素数量，提高了选择器的匹配速度。

需要注意的是，并非所有的CSS选择器都适用于从右到左的解析方式，例如属性选择器、伪类选择器等可能需要从左到右进行解析。浏览器在解析CSS选择器时会根据具体的情况选择最优的解析方式。

## 29. 在网页中的应该使用奇数还是偶数的字体？

在网页中，一般推荐使用偶数号的字体大小。以下是一些原因：

1. **比例关系**：偶数字号相对更容易与网页设计的其他部分形成比例关系，使整个页面看起来更加协调和平衡。
2. **对齐**：使用偶数字号字体可以使文本段落对齐更加方便。如果使用奇数字号字体，文本段落的对齐可能会受到影响，因为奇数字号字体的基线位置可能会导致对齐不准确。
3. **兼容性**：在某些情况下，奇数字号字体可能在不同浏览器和操作系统中显示不一致。使用偶数字号字体可以减少这种显示差异的可能性。

对于中文网页排版，常用的字体大小是`12`号和`14`号。这两个偶数字号字体大小在中文排版中使用较多，可以提供良好的可读性和视觉效果。

需要注意的是，具体选择何种字体大小还要根据设计需求、内容呈现和用户体验等因素进行综合考虑。

## 30. margin和padding分别适合什么场景使用？

`margin` 和 `padding` 在布局和样式设计中有不同的用途和适用场景。

**适合使用 margin 的场景：**

- 创建元素之间的空白间距，用于调整元素之间的间隔。
- 添加外部空白，使元素与周围的元素或容器之间产生间距。
- 用于调整元素的定位和对齐。
- 用于调整元素的外边距折叠效果（当相邻元素的外边距相遇时）。

**适合使用 padding 的场景：**

- 在元素的内部添加空白区域，用于调整元素内部内容与边框之间的距离。
- 用于创建元素的背景色或背景图的填充区域。
- 用于调整元素的内边距，影响元素内容与边框的距离。
- 用于控制元素的尺寸和布局。

需要根据具体的设计需求和布局目标来决定使用 `margin` 还是 `padding`。在一些情况下，它们可以互相替代使用，但在其他情况下，选择正确的属性可以更好地控制布局和样式效果。

## 31. 元素竖向的百分比设定是相对于容器的高度吗？

实际上，元素竖向的百分比设定是相对于包含它的父元素的高度，而不是宽度。当给一个元素设置竖向的百分比高度时，它会根据其父元素的高度进行计算。例如，如果一个元素的高度设置为`50%`，则表示该元素的高度将是其父元素高度的`50%`。

请注意，如果父元素没有明确设置高度，或者父元素的高度是由其内容决定的（如默认的`height: auto`），那么百分比高度可能无效，因为无法确定相对的基准高度。

需要注意的是，元素的宽度百分比设定是相对于包含它的父元素的宽度。因此，元素的百分比设定在竖向和横向方向上是不同的。

## 32. 什么是响应式设计？响应式设计的基本原理是什么？如何兼容低版本的IE？

- 响应式设计就是网站能够兼容多个终端，而不是为每个终端做一个特定的版本
- 基本原理是利用CSS3媒体查询，为不同尺寸的设备适配不同样式
- 对于低版本的IE，可采用JS获取屏幕宽度，然后通过`resize`方法来实现兼容

## 33. 什么是视差滚动效果，如何给每页做不同的动画？

视差滚动效果是一种在网页中使用的动画效果，通过在滚动页面时，不同层级的元素以不同的速度移动，形成立体的运动效果。这种效果可以给用户带来更加丰富、生动的视觉体验。

使用background-attachment可以实现视差滚动效果，通过设置background-attachment: fixed，可以让背景图片固定在视口中，当页面滚动时，背景图片不会随着滚动而移动，从而形成视差滚动效果。

**具体实现视差滚动效果的方法如下：**

```html
<div className="parallax" />
```

```css
.parallax {
  background-image: url('/images/girl.jpg');
  min-height: 300px;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}
```

<!-- <Parallax /> -->

## 34. a标签上四个伪类的执行顺序是怎么样的

伪类在`a`标签上的执行顺序是 `link`（未访问链接） -> `visited`（已访问链接） -> `hover`（鼠标悬停） -> `active`（激活状态）。

执行顺序可以用记忆口诀 `L-V-H-A`（Love Hate）来记忆，表示喜欢和讨厌的顺序。首先应用 `link` 样式，然后是 `visited` 样式，接着是 `hover` 样式，最后是 `active` 样式。这个顺序也是 CSS 解析和应用伪类样式的规定顺序。

需要注意的是，`visited` 伪类在某些浏览器中受到安全策略的限制，可能会导致无法应用样式。为了保证样式的一致性和可靠性，建议在编写样式时考虑到这一点。

## 35. 让页面里的字体变清晰，变细用CSS怎么做？（IOS手机浏览器字体齿轮设置）

通过设置 `-webkit-font-smoothing` 属性为 `antialiased` 可以在 iOS 手机浏览器中使字体显示更清晰、更细腻。**这个属性是针对 iOS Safari 浏览器的特定设置**。

```css
body {
  -webkit-font-smoothing: antialiased;
}
```

将上述代码应用于你的 CSS 文件中，或者将其添加到你想要应用字体设置的元素的样式中，可以改善字体在 iOS 手机浏览器中的显示效果。注意，该属性只在 iOS Safari 浏览器中生效，在其他浏览器中可能没有效果。

## 36. display:inline-block 什么时候会显示间隙？

`display: inline-block;` 可能会在元素之间产生间隙的情况包括：

1. 相邻的 `inline-block` 元素之间有换行或空格分隔时，会产生间隙。
2. 非 `inline-block` 的水平元素设置为 `inline-block` 时，会有默认的水平间距。
3. 默认情况下，`inline-block` 元素的默认对齐方式是基线对齐，而不是顶部对齐，因此可能会产生垂直间隙。可以通过设置 `vertical-align: top;` 将元素顶部对齐来消除垂直间隙。
4. 父元素的字体大小会影响 `inline-block` 元素的间隙。如果父元素设置了字体大小，可以将其设置为 `font-size: 0;`，然后在 `inline-block` 元素内部设置所需的字体大小，以消除垂直间隙。
5. 将多个 `li` 标签写在同一行，可以消除垂直间隙，但这会导致代码可读性差。

这些方法可以用来解决 `inline-block` 元素之间产生的间隙问题。

## 37. css 的渲染层合成是什么 浏览器如何创建新的渲染层？

> [!NOTE]
> 在 DOM 树中每个节点都会对应一个渲染对象（`RenderObject），当它们的渲染对象处于相同的坐标空间（z 轴空间）时，就会形成一个 RenderLayers，也就是渲染层。渲染层将保证页面元素以正确的顺序堆叠，这时候就会出现层合成（`composite\`），从而正确处理透明元素和重叠元素的显示。对于有位置重叠的元素的页面，这个过程尤其重要，因为一旦图层的合并顺序出错，将会导致元素显示异常

在 CSS 中，渲染层合成（Layer Composition）是浏览器中用于处理页面元素的显示和堆叠顺序的机制。它通过创建新的渲染层（Render Layer）来管理页面中的元素，并确保它们以正确的顺序进行渲染和呈现。

**浏览器创建新的渲染层的条件包括但不限于以下情况：**

1. **定位属性**：元素具有 `position: fixed`、`position: relative`、`position: sticky`、`position: absolute` 等定位属性时，会创建新的渲染层。
2. **透明度和混合模式**：元素的透明度设置小于 1（`opacity: 0.5`）或具有非 `normal` 的混合模式（`mix-blend-mode: multiply`）时，会创建新的渲染层。
3. **3D 变换**：元素具有 3D 变换（`transform: translateZ(0)`）时，会创建新的渲染层。
4. **滤镜效果**：元素应用了滤镜效果（`filter: blur(5px)`）时，会创建新的渲染层。
5. **遮罩效果**：元素应用了遮罩效果（`mask-image: url(mask.png)`）时，会创建新的渲染层。
6. **CSS 动画**：元素正在进行 CSS 动画（`animation`、`transition`）时，会创建新的渲染层。
7. **其他因素**：还有一些其他因素，如元素应用了 `backface-visibility: hidden`、`column-count` 不为 `auto` 等，也可能触发创建新的渲染层。

创建新的渲染层有助于确保页面元素以正确的顺序进行堆叠和渲染，并处理透明元素和重叠元素的显示。这对于具有位置重叠的页面元素尤为重要，因为合成层的顺序错误可能导致元素显示异常。通过创建新的渲染层，浏览器可以更好地管理元素的渲染和呈现，提高页面的性能和用户体验。
