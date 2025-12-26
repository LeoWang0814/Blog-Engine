
# Markdown 全功能测试文档
> This is the test blog for yolo deployment.  
> 这是一个 **Markdown 渲染测试文件**  
> 用于测试你的网页是否支持常见 Markdown 语法与扩展功能。

---

## 1. 文本与强调

普通文本一段，用来测试基础段落解析。

- **加粗文本**
- *斜体文本*
- ***加粗 + 斜体***
- ~~删除线文本~~
- `行内代码`

---

## 2. 标题层级测试

# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

---

## 3. 列表测试

### 无序列表
- 苹果
- 香蕉
  - 子项 A
  - 子项 B
    - 子子项

### 有序列表
1. 第一步
2. 第二步
3. 第三步

### 任务列表（GitHub Flavored）
- [x] 已完成任务
- [ ] 未完成任务
- [ ] 待办事项

---

## 4. 引用块嵌套

> 一级引用  
>> 二级引用  
>>> 三级引用

---

## 5. 代码块测试

### 普通代码块
```

This is a plain code block.
Line 2
Line 3

````

### 带语言高亮的代码块（Python）
```python
def hello(name):
    print(f"Hello, {name}!")

hello("Markdown")
````

### 带语言高亮的代码块（JavaScript）

```javascript
const greet = (name) => {
  console.log(`Hello, ${name}`);
};

greet("World");
```

---

## 6. 表格测试

| 名称       | 类型   | 状态 |
| -------- | ---- | -- |
| Markdown | 标记语言 | ✅  |
| HTML     | 标记语言 | ✅  |
| JSON     | 数据格式 | ⚠️ |

对齐测试：

| 左对齐 |  居中 | 右对齐 |
| :-- | :-: | --: |
| A   |  B  |   C |
| 1   |  2  |   3 |

---

## 7. 链接测试

* 普通链接：[https://example.com](https://example.com)
* Markdown 链接：[GitHub](https://github.com)
* 带标题链接：[OpenAI](https://openai.com "OpenAI 官网")

---

## 8. 图片测试（外部图床）

下面是一张从外部图床加载的图片，用于测试图片解析与 HTTPS 资源加载：

![Markdown Image Test](https://youke2.picui.cn/s1/2025/12/22/694936dca528e.jpg)

---

## 9. 分割线测试

---

---

---

---

## 10. 脚注测试（若支持）

这是一个带脚注的句子。[^1]

[^1]: 这是脚注内容，用于测试扩展 Markdown 语法。

---

## 11. HTML 混用测试（进阶）

<div style="padding: 12px; border: 1px solid #ccc; border-radius: 6px;">
  <strong>HTML 区块：</strong>
  <p>如果你的解析器支持 Markdown + HTML 混合渲染，这段应该正常显示。</p>
</div>

---

## 12. 转义字符测试

* 星号
_ 下划线
# 井号
> 大于号

---

## 13. 结尾说明

如果你能 **正确看到标题层级、代码高亮、表格对齐、图片显示、任务列表和 HTML 区块**，
那么你这套 Markdown 解析 **已经非常合格了** ✅