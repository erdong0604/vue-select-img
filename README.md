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
yarn add  vue-select-img
```

## 用法


``` html
<div id="app">
    <div class="avatar-warp">
        <img
        :src="avatarSrc"
        class="avatar-img"/>
        <span class="upload-btn">上传头像</span>
        <select-image
            @select='getImageSource'
        />
    </div>
</div>

```


``` css
<style>
.avatar-warp{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
}
.avatar-img{
    width: 100%;
    height: 100%;
    font-size: 100px;
}
.upload-btn{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    line-height: 30px;
    background: rgba(0, 0, 0, .4);
    font-size: 12px;
    color: #fff;
    text-align: center;
}
```


```javascript

import SelectImage from "./components/SelectImage";
export default {
    name: "App",
    components: {
        "select-image": SelectImage
    },
    data() {
        return {
            avatarSrc: require( "./assets/default_avatar.jpg" )
        };
    },
    methods: {
        getImageSource( source ) {
            this.avatarSrc = source;
        }
    }
};
```

## 参数

| Prop    | Type   | Description                 | Default |
|---------|--------|-----------------------------|---------|
| type    | String | 输出图片文件结果:base64,file        | base64  |
| accept  | String | 选择图片文件类型:多个值以逗号分隔"png,gif"。 | \*      |
| quality | Number | 输出图片质量,0 ~ 1。               | 不压缩质量   |



## 运行

```



```
