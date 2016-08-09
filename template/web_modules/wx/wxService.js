import config from 'web/config'
import wxApi from 'web/wx/wxApi'

export default {
    getWxCfg () {
        var data = {
            'url': window.location.href.replace(window.location.hash, '')
        }
        return $api.mainRequest(config.apiDomain + "/wechat/api/config", data,
            { isHostUrl: true  })
    },

    config () {
        wxApi.config()
    },

    upload (callback,
            { count = 9, sizeType = ['original', 'compressed'], sourceType = ['album', 'camera'] }) {
        console.log('choose image begin...')
        this.chooseImage(count, sizeType, sourceType).done(({ localIds }) => {
            // alert(localIds)
            console.log(localIds)
            this.syncUpload(localIds, callback)
        }).fail(result => {
            alert(JSON.stringify(result))
        })
    },

    chooseImage (count, sizeType, sourceType) {
        return wxApi.chooseImage(count, sizeType, sourceType)
    },

    syncUpload (localIds, callback) {
        let localId = localIds.shift()

        wxApi.uploadImage(localId).done(({ serverId }) => {
            console.log(serverId)
            // alert(serverId)
            this.download(serverId).done((result) => {
                console.log(result)
                // alert(result)
                callback(result)
                if (localIds.length > 0) {
                    this.syncUpload(localIds, callback)
                }
            })
        })
    },

    download (mediaId) {
        let deferred = $.Deferred()

        let data = {
            mediaIds: [mediaId]
        }

        $api.getRequest(apis.media.download, data, {type: 'post'}).done((result) => {
            deferred.resolve(result)
            // alert(result.data.urls[0])
        })

        return deferred.promise()
    }
}
