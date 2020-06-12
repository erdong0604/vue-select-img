## vue-select-img

选择图片插件，使用用户自定义样式，直接插入`input`标签。
支持输出base64编码、压缩、图片旋转调整。

## 安装

通过`npm `安装

```
npm install vue-select-img
```

通过`yarn`安装

```
yarn add vue-select-img
```

## 用法


```javascript

// 引入

import SelectImage from "vue-select-img";
export default {
    components: {
        "select-image": SelectImage
    },
    methods: {
        getImageSource( source ) {
            //source 输出的结果
        }
    }
};
```

``` html
// 在的html中添加

<select-image
    quality="0.6"
    @select='getImageSource'
/>

```

## 示例

```html
<div class="avatar-warp">
    <select-image
        quality="0.6"
        @select='getImageSource'
    />
</div>

```



## 参数

| Prop    | Type   | Description                 | Default |
|---------|--------|-----------------------------|---------|
| output  | String | 输出图片文件类型:base64,file        | base64  |
| accept  | String | 选择图片文件类型:多个值以逗号分隔"png,gif"。 | \*      |
| quality | String | 输出图片质量:0 ~ 1。               | 不压缩质量   |




## 运行



#### 1

```
git clone https://github.com/erdong0604/vue-select-img.git
```

#### 2

```
yarn
```

#### 3

```
yarn serve
```


