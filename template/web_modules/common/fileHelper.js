import EXIF from 'web/lib/exif'

export default {
    getAdjustImg: function (file, callback, maxWidth = 1024) {
        if (!window.FileReader || !window.Blob) {
            callback(file)
            return
        }

        // debugger
        let self = this
        var orientation;
        //EXIF js 可以读取图片的元信息 https://github.com/exif-js/exif-js
        EXIF.getData(file,function(){
            orientation=EXIF.getTag(this,'Orientation');
        });
        var reader = new FileReader();
        reader.onload = function(e) {  
            self.getAdjustImgData(this.result, orientation, file.type, function(data){
                //这里可以使用校正后的图片data了
                callback(data)
            }, maxWidth); 
        }
        reader.readAsDataURL(file);
    },

    // @param {string} img 图片的base64
    // @param {int} dir exif获取的方向信息
    // @param {function} next 回调方法，返回校正方向后的base64
    getAdjustImgData: function (img, dir, imgType, next, maxWidth) {
        var image=new Image();
        image.onload=function(){
            var degree=0,drawWidth,drawHeight,width,height;
            drawWidth=this.naturalWidth;
            drawHeight=this.naturalHeight;
            //以下改变一下图片大小
            // var maxSide = Math.max(drawWidth, drawHeight);
            // if (maxSide > 1024) {
            //     var minSide = Math.min(drawWidth, drawHeight);
            //     minSide = minSide / maxSide * 1024;
            //     maxSide = 1024;
            //     if (drawWidth > drawHeight) {
            //         drawWidth = maxSide;
            //         drawHeight = minSide;
            //     } else {
            //         drawWidth = minSide;
            //         drawHeight = maxSide;
            //     }
            // }

            // 更改为如果宽度超出才做裁剪，因为现在的手机是很高的，有可能需要比较高的图片
            // let maxWidth = 1024
            if (drawWidth > maxWidth) {
                drawHeight = drawHeight / drawWidth * maxWidth
                drawWidth = maxWidth
            }

            var canvas=document.createElement('canvas');
            canvas.width=width=drawWidth;
            canvas.height=height=drawHeight; 
            var context=canvas.getContext('2d');
            //判断图片方向，重置canvas大小，确定旋转角度，iphone默认的是home键在右方的横屏拍摄方式
            switch(dir){
                //iphone横屏拍摄，此时home键在左侧
                case 3:
                    degree=180;
                    drawWidth=-width;
                    drawHeight=-height;
                    break;
                //iphone竖屏拍摄，此时home键在下方(正常拿手机的方向)
                case 6:
                    canvas.width=height;
                    canvas.height=width; 
                    degree=90;
                    drawWidth=width;
                    drawHeight=-height;
                    break;
                //iphone竖屏拍摄，此时home键在上方
                case 8:
                    canvas.width=height;
                    canvas.height=width; 
                    degree=270;
                    drawWidth=-width;
                    drawHeight=height;
                    break;
            }
            //使用canvas旋转校正
            context.rotate(degree*Math.PI/180);
            context.drawImage(this,0,0,drawWidth,drawHeight);
            //返回校正图片
            // next(canvas.toDataURL("image/jpeg",.8));

            let uri = canvas.toDataURL(imgType)
            let base64 = uri.split(',')[1] // uri.substr(uri.indexOf(',') + 1)
            let binary = atob(base64)

            var len = binary.length
            var buf = new Uint8Array(len)

            for (var i = 0; i < len; i++) {
                buf[i] = binary.charCodeAt(i)
            }

            var blob = new Blob([buf], {type: imgType});

            next(blob)
         }
         image.src=img;
    }
}
