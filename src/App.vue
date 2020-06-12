<template>
    <div id="app">
        <div class="avatar-warp">
            <img
            :src="avatarSrc"
            class="avatar-img"/>
            <span class="upload-btn">上传头像</span>
            <select-image
                quality="0.6"
                @select='getImageSource'
            />
            
        </div>
    </div>
</template>

<script>
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
</script>

<style scope>
.avatar-warp{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
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
</style>
