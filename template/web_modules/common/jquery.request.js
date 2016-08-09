// extend jQuery
import common from 'web/common/common'
import appConfig from 'web/config'
import {Base64} from 'js-base64'

$.extend({
    defaultOptions: {
        type: 'get',
        third: false
    },

    autoLogining: false,

    mainRequest: function (url, data, options) {
        if (options.type === 'post') {
            data = { data: data }
            data = JSON.stringify(data)
        }

        return $.ajax({
            type: options.type,
            url: url,
            data: data,
            contentType: 'application/json',
            dataType: 'json'
        })
    },

    request: function (url, data, options) {
        data = data === undefined ? null : data
        options = typeof options === 'object' ? $.extend({}, $.defaultOptions, options)
            : $.defaultOptions
        url = appConfig.apiDomain + '/' + url

        let deferred = $.Deferred()

        $.when($.mainRequest(url, data, options)).done(function (result) {
            result = options.third ? { data: result } : result
            result = $.addFormRandom(result)

            if ((!$.requestOK(result) || options.type === 'get') && !options.third) {
                // appConfig.checkVersion(result.global.version)
            }

            $.setCsrf(result)

            deferred.resolve(result)
        }).fail(function (result) {
            if ($.autoLogining) {
                return
            }

            if ($.autoLogin(result, options)) {
                return
            }
            // appConfig.ajaxCheckVersion()

            deferred.reject(result.responseJSON)
        })

        return deferred.promise()
    },

    requestOK: function (result) {
        if (result !== null && typeof result === 'object' &&
                result.status !== null && typeof result.status === 'object') {
            return result.status.code === 0
        }
        return true
    },

    getRequestStatus: function (result) {
        if (result !== null && typeof result === 'object') {
            return result.status
        }
        return { message: '小二走神了...' }
    },

    upload: function (data, { filename } = {}) {
        return $.ajax({
            type: 'post',
            url: appConfig.apiDomain + '/api/v1/file/upload',
            data: $.getFormData(data, filename),
            cache: false,
            processData: false,
            contentType: false
        })
    },

    getFormData: function (data, filename) {
        var formData = new FormData()
        for (var key in data) {
            if (typeof filename === 'string' && key === 'file') {
                formData.append(key, data[key], filename)
            } else {
                formData.append(key, data[key])
            }
        }
        return formData
    },

    addFormRandom: function (result) {
        if (result.data != null && typeof result.data === 'object') {
            result.data.formRandom = common.getTimestamp()
        }
        return result
    },

    // 先做个封装，日后有什么扩展可以在这里写
    getRequest: function (url, data, options) {
        return $.request(url, data, options)
    },

    postRequest: function (url, data, options) {
        return $.request(url, data, $.extend({}, options, {type: 'post'}))
    },

    getThirdRequest: function (url, data, options) {
        return $.request(url, data, $.extend({}, options, {third: true}))
    },

    postThirdRequest: function (url, data, options) {
        return $.request(url, data, $.extend({}, options, {type: 'post', third: true}))
    },

    autoLogin (result, options) {
        if (result.status === 403) {
            $.autoLogining = true
            console.log(window.location.href)

            let locationHref = window.location.href
            if (locationHref.indexOf('nextScope=1') >= 0) {
                locationHref = locationHref.replace(/nextScope=1/, 'scope=1')
            }
            if (options.nextScope) {
                locationHref = locationHref.replace(/scope=1/, 'nextScope=1')
            }
            console.info(options.nextScope)

            let encodeUrl = Base64.encode(locationHref)
            let scope = locationHref.indexOf('scope=1') >= 0
            console.info(scope)
            if (scope) {
                window.location.href = `/site?url=${encodeUrl}&scope=1`
            } else {
                window.location.href = `/site?url=${encodeUrl}`
            }

            return true
        }
        return false
    },

    setCsrf (result) {
        if(result !== undefined && result.global !== undefined &&
                result.global.csrfParam !== undefined && result.global.csrfToken !== undefined) {
            $('meta[name=csrf-param]').attr('content', result.global.csrfParam)
            $('meta[name=csrf-token]').attr('content', result.global.csrfToken)
        }
    }
})

define("$api", [], function() {
    return $;
});
