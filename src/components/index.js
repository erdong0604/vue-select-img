
import Exif from "exif-js";

class SelectImage{

    constructor( options ){
        const defaultOptions = {
            output: "base64"
        };
        this.fileName = "pic"; // 输出图片名称 
        this.options = {...defaultOptions,...options};
    } 


    async select(){
        const {output, file, quality } = this.options;
        if( output === "file"&&!quality ){
            return file;
        }
        return this.drawImage2Canvas();
    }

    /**
     * File对象转成base64
     */
    file2Base64() {

        const { file } = this.options;
        
        this.fileName = file.name.split( "." )[0];
        return new Promise( ( resolve, reject ) => {
            const reader = new FileReader();
            reader.readAsDataURL( file );
            reader.onload = res => {
                resolve( res.target.result );
                // !quality?resolve( res.target.result ):resolve( this.drawImage2Canvas() );
            };
            reader.onerror = () => {
                reject( new Error( "Not a file object" ) );
            };
        } );
    }

    async generateImage(){
        try{
            let data = await this.file2Base64();
            return new Promise( ( resolve, reject ) => {
                const img = new Image();
                img.src = data;
                img.onload = () => {
                    resolve( img );
                };
                img.onerror = err => {
                    reject( err );
                };
            } );
        }catch( e ){
            throw new Error( e );
        }
    }

    /**
     * 将image画到画布上
     */
    async drawImage2Canvas(  ){
        try{
            let img = await this.generateImage();
            const { output,file,quality } = this.options;
            /**
             * @realWidth 图片的真实宽
             * @realHeight 图片的真实高
             */
            const realWidth = img.naturalWidth;
            const realHeight = img.naturalHeight;

            const canvas = document.createElement( "canvas" );
            canvas.width = realWidth;
            canvas.height = realHeight;

            const context = canvas.getContext( "2d" );
            context.drawImage( img, 0, 0, realWidth, realHeight );
            /**
             * 获取图片的EXIF中的Orientation检测图片是否旋转
             * 
             */
            let orientation = await this.getImageOrientation( file );
            if( orientation&&orientation !== 1 ){
                //这里执行旋转
                this.rotateImg( img,orientation,canvas,context );
            
            }
            const dataURL = canvas.toDataURL( "image/jpeg", Number( quality ) );
            const result = this.data64ToFile( dataURL );
            return output === "file"?result:dataURL;
        }catch( e ){
            throw new Error( e );
        }
    }
    /**
     * 将base64转成File对象
     * @param {String} base64 
     */
    data64ToFile( base64 ) {
        const arr = base64.split( "," );
        const mime = arr[0].match( /:(.*?);/ )[1];
        const bstr = atob( arr[1] );
        let n = bstr.length;
        const u8arr = new Uint8Array( n );
        while ( n-- ) {
            u8arr[n] = bstr.charCodeAt( n );
        }
        return new File( [ u8arr ], this.fileName, { type: mime } );
    }

    /**
     * @param { File } file 选择的File对象
     */
    getImageOrientation( file ){
        return new Promise( resolve => {
            Exif.getData( file, function () {
                const orientation = Exif.getTag( this, "Orientation" );
                resolve( orientation );
            } );
        } );
    }
    /**
     * 
     * @param {Image} img 
     * @param {Number} orientation 
     * @param {Canvas} canvas 
     * @param {Canvas2d} ctx 
     */
    rotateImg( img, orientation, canvas, ctx ){
        switch( orientation ){
        case 3: // 这里需要将canvas逆时针旋转180°
            ctx.rotate( 180*Math.PI/180 );
            ctx.drawImage( img,-img.naturalWidth,-img.naturalHeight,img.naturalWidth,img.naturalHeight );
            break;
        case 6: // 这里需要将canvas逆时针旋转90°
            canvas.width = img.naturalHeight;
            canvas.height = img.naturalWidth;
            ctx.rotate( 90*Math.PI/180 );
            ctx.drawImage( img,0,-img.naturalHeight,img.naturalWidth,img.naturalHeight );
            break;
        case 8: // 这里需要将canvas顺时针旋转90°
            canvas.width = img.naturalHeight;
            canvas.height = img.naturalWidth;
            ctx.rotate( 270*Math.PI/180 );
            ctx.drawImage( img,-img.naturalWidth,0,img.naturalWidth,img.naturalHeight );
        }
    }


}



export default SelectImage;