<template>
    <input
        class="select-image-input"
        type="file"
        :accept="acceptStr"
        @change="handleUploadImage"/>
</template>

<script>
import SelectImage from "./index";
export default {
    data() {
        return {
            acceptStr: ""
        };
    },
    props: {
        /**
         * 设置选择图片文件后输出的结果类型。
         * 
         * @type base64:dataURL数据  file:File对象
         * 
         * **/
        type: {
            type: String,
            default: "base64"
        },
        /**
         * 设置所需图片文件的类型,以逗号分隔
         * "png,jpg"
         * 
         * **/
        accept: {
            type: String,
            default: "*"
        },
        /**
         * 设置图片压缩,此字段为图片的质量
         * 0 ~ 1之间,越小图片质量越差,相应的图片size越小。
         * **/
        quality: {
            type: Number,
            default: 0.8
        }
    },
    watch: {
        /**
         * @accept 需要选择图片类型,过滤掉那些不需要选择的图片文件
         * 
         * 将传过来的图片文件类型转换成原生input中的accept属性
         * 
         * "png,gif,jpg" ==> "image/png,image/gif"
         * 
         * **/
        accept: {
            handler( val ){
                if( val === "*" || val.indexOf( "*" ) !== -1 ){
                    this.acceptStr = "image/*";
                }else{
                    this.acceptStr = val.split( "," ).map( v => `image/${v}` ).join( "," );
                }
            },
            immediate: true
        }
    },
    methods: {
        /**
         * 
         * 原生change事件,用于触发选择图片文件后的事件。
         * 
         * @e 选择图片文件后返回的数据
         * **/
        handleUploadImage( e ) {
            if ( e.target.files && e.target.files.length > 0 ) {
                const file = e.target.files[0];

                /**
                 * 实例化一个SelectImage类，用于执行压缩和数据转换
                 * **/
                const uploadImage = new SelectImage( {
                    file,
                    type: this.type,
                    quality: this.quality
                } );
                uploadImage.fileToDataURL().then( res => {
                    /**
                     * 传递给父组件选择后的结果
                     * 这个结果有可能压缩,有可能未压缩，取决于用户的设置
                     * **/
                    this.$emit( "select", res );
                } );
            }
        },
        /**
         * 设置上传图片按钮样式
         * 
         * 因为input标签是直接渲染在组件所在的位置
         * 并且通过定位来实现点击按钮就可以选择图片
         * 
         * 这里要设置input的父级为定位元素
         * **/
        setParentPosition(){
            
        }

    }
};
</script>
<style>
.select-image-input{
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;
    top: 0;
    left: 0;
    opacity: 0;
    outline:none;
}
</style>
