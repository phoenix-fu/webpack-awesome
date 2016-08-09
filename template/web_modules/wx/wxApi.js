// import wx from 'weixin-js-sdk'
import payService from 'web/wx/payService'
import wxService from 'web/wx/wxService'
import common from 'web/common/common'

export default {
    config: function(){
        wxService.getWxCfg().done(function(configObj){
            var myConfig = $.extend({}, configObj.data);
            wx.config(myConfig);
            wx.error(function(res){
                common.error(res);
            });
        }).fail(function(){
            common.info('get config error');
        });
    },

    ready: function(callback){
        wx.ready(callback);
    },

    checkJsApi: function(apis){
        if(typeof apis === 'string'){
            apis = [apis];
        }

        var deferred = $.Deferred();

        wx.checkJsApi({
            jsApiList: apis,
            success: function(res){
                deferred.resolve(res);
            },
            fail: function(){
                deferred.reject();
            }
        });

        return deferred.promise();
    },

    shareTimeline: function(title, link, imgUrl){
        var deferred = $.Deferred();
        wx.onMenuShareTimeline({
            title: title, // 分享标题
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
                common.info('success');
                deferred.resolve();
            },
            fail:function() {
                common.info('fail');
            },
            cancel: function () {
                deferred.reject();
            },

            complete: function(res) {

               common.info(res);
            }



        });

        return deferred.promise();
    },

    shareAppMessage: function(title, desc, link, imgUrl, type, dataUrl){
        type = type == undefined ? '' : type;
        dataUrl = dataUrl == undefined ? '' : dataUrl;

        var deferred = $.Deferred();

        wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            type: type, // 分享类型,music、video或link，不填默认为link
            dataUrl: dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                deferred.resolve();
            },
            fail: function() {
                deferred.reject();
            },

            cancel: function () {
                deferred.reject();
            }
        });

        return deferred.promise();
    },



    wxPay: function(config) {
        var deferred = $.Deferred();
        var options = {
            timestamp: config.timeStamp,
            nonceStr: config.nonceStr,
            package: config.package,
            signType: config.signType,
            paySign: config.paySign
        };
        wx.chooseWXPay($.extend({}, {
            success: function (res) {
                deferred.resolve(res);
            },
            fail: function () {
                deferred.reject();
            },
            cancel: function () {
                deferred.reject();
            },

            complete: function(res) {
                common.info('complete');
                common.info(res);
            }
        }, options));

        return deferred.promise();
    },

    scanQRCode: function(needResult, scanType) {

        var needResult = arguments[0] ? arguments[0] : 1;
        var scanType = arguments[1] ? arguments[1] : ["qrCode",]
        var deferred = $.Deferred();
        wx.scanQRCode({
            needResult: needResult,
            scanType: scanType,
            success: function (res) {
                deferred.resolve(res);
            },
            fail: function () {
                deferred.reject();
            },
            cancel: function () {
                deferred.reject();
            },
            complete: function(res) {
                common.info('complete');
                common.info(res);
            }
        });

        return deferred.promise();
    },

    /*
     * @param count 选择图片个数,默认为9
     * @param sizeType 可以指定是原图还是压缩图，默认二者都有
     * @param sourceType 可以指定来源是相册还是相机，默认二者都有
     * @function 拍照或从手机相册中选图接口
     */
    chooseImage (count=9, sizeType=['original', 'compressed'], sourceType=['album', 'camera']) {
        let deferred = $.Deferred()
        wx.chooseImage({
            count: count,
            sizeType: sizeType,
            sourceType: sourceType,
            success (res) {
                deferred.resolve(res)
            },
            fail (res) {
                deferred.reject(res)
            }
        })
        return deferred.promise()
    },
    /*
     * @param current 当前显示图片的http链接
     * @param urls 需要预览的url
     * @function 预览图片接口
     */
    previewImage (current = '', urls = []) {
        wx.previewImage({
            current: current, // 当前显示图片的http链接
            urls: urls // 需要预览的图片http链接列表
        })
    },

    /*
     * @param localId  需要上传的图片的本地ID，由chooseImage接口获得
     * @param isShowProgressTips 默认为1，显示进度提示
     * @function 上传图片接口
     */
    uploadImage (localId='', isShowProgressTips=1) {
        let deferred = $.Deferred()
        wx.uploadImage({
            localId: localId,
            isShowProgressTips: isShowProgressTips,
            success (res) {
                deferred.resolve(res)
            },
            fail () {
                deferred.reject()
            }
        })
        return deferred.promise()
    },
    /*
     * @param serverId  需要下载的图片的服务器端ID，由uploadImage接口获得
     * @param isShowProgressTips 默认为1，显示进度提示
     * @function 下载图片接口
     */
    downloadImage (serverId='', isShowProgressTips=1) {
        let deferred = $.Deferred()
        wx.downloadImage({
            serverId: serverId,
            isShowProgressTips: isShowProgressTips,
            success (res) {
                deferred.resolve(res)
            },
            fail () {
                deferred.reject()
            }
        })
        return deferred.promise()
    }

}
