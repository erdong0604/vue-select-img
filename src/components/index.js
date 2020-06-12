/**
 * 选择图片
 * 
 * 包括File对象与dataURL互转方法,图片压缩。图片旋转
 * 
 * **/


class SelectImage {
    constructor( options ) {
        const defaultOptions = {
            type: "base64"
        };
        this.fileType = "image/jpg";
        this.fileName = "";
        this.options = { ...defaultOptions, ...options };
    }

    fileToDataURL() {
        const {type, file, quality } = this.options;
        
        this.fileName = file.name.split( "." )[0];
        return new Promise( ( resolve, reject ) => {
            if( !quality&&type === "file" ){
                resolve( file );
                return;
            }
            const reader = new FileReader();
            reader.readAsDataURL( file );
            reader.onload = res => {
                !quality ? resolve( res.target.result ) : resolve( this.compressImage( res.target.result ) );
            };
            reader.onerror = () => {
                reject( new Error( "Not a file object" ) );
            };
        } );
    }

    compressImage( data ) {
        const { type } = this.options;
        return new Promise( ( resolve, reject ) => {
        // new一个img对象
            const img = new Image();
            img.src = data;

            img.onload = () => {
                // 获取图片的原始宽高
                const dataURL = this.imageToCanvas( img );
                const compressFile = this.dataURLToFile( dataURL, `${this.fileName}.jpg` );
                resolve( type === "base64" ? dataURL : compressFile );
            };
            img.onerror = err => {
                reject( err );
            };
        } );
    }

    dataURLToFile( dataURL, fileName ) {
        const arr = dataURL.split( "," );
        const mime = arr[0].match( /:(.*?);/ )[1];
        const bstr = atob( arr[1] );
        let n = bstr.length;
        const u8arr = new Uint8Array( n );
        while ( n-- ) {
            u8arr[n] = bstr.charCodeAt( n );
        }
        return new File( [ u8arr ], fileName, { type: mime } );
    }

    imageToCanvas( img ) {
        const { quality } = this.options;
        const realWidth = img.naturalWidth;
        const realHeight = img.naturalHeight;
        // 创建一个canvas 将img画在canvas上
        const canvas = document.createElement( "canvas" );
        canvas.width = realWidth;
        canvas.height = realHeight;
        const context = canvas.getContext( "2d" );
        context.drawImage( img, 0, 0, realWidth, realHeight );
        const dataURL = canvas.toDataURL( "image/jpeg", quality );
        return dataURL;
    }
}

export default SelectImage;
